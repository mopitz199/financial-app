import React, {useState, useEffect} from 'react';
import './App.css';

import MediaQuery from 'react-responsive';

import clsx from 'clsx';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertChart from '@material-ui/icons/InsertChart';
import Home from '@material-ui/icons/Home';
import AttachMoney from '@material-ui/icons/AttachMoney';


import Indicators from './pages/indicators';
import MortgageSimulation from './pages/mortgage-simulator';
import ProfitabilitySimulation from './pages/profitability-simulator';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemIcon: {
    marginLeft: '8px'
  }
}));


const pages = [
  {'title': 'Graficos', 'icon': <InsertChart />},
  {'title': 'Credito hipotecario', 'icon': <Home />},
  {'title': 'Rentabilidad', 'icon': <AttachMoney />},
]

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = createMuiTheme({
    'palette': {
      green: {
        600: '#43a047',
        700: '#388e3c',
      },
    }
  });
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(pages[0]);

  const [irpdData, setIrpdData] = useState([])
  const [nationalOfferData, setNationalOfferData] = useState([])
  const [mortgageInterestRateData, setMortgageInterestRateData] = useState([])
  const [consumerCreditInterestRateData, setConsumerCreditInterestRateData] = useState([])
  const [commercialInterestRateData, setCommercialInterestRateData] = useState([])

  useEffect(() => {
    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/irpv-data')
      .then(data => data.json())
      .then((data) => setIrpdData(data));

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/national-offer')
      .then(data => data.json())
      .then((data) => setNationalOfferData(data));

    
    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/appartment-interest-rate')
      .then(data => data.json())
      .then((data) => setMortgageInterestRateData(data))
      .catch(error => setMortgageInterestRateData(null))

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/consumer-credit-interest-rate')
      .then(data => data.json())
      .then((data) => {
        setConsumerCreditInterestRateData(data)
      })
      .catch(error => setConsumerCreditInterestRateData(null))

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/commercial-interest-rate')
      .then(data => data.json())
      .then((data) => setCommercialInterestRateData(data))
      .catch(error => setCommercialInterestRateData(null))

  }, [])

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function renderCurrentPage(){
    if(currentPage.title==="Graficos"){
      return (
        <Indicators
          irpdData={irpdData}
          nationalOfferData={nationalOfferData}
          mortgageInterestRateData={mortgageInterestRateData}
          consumerCreditInterestRateData={consumerCreditInterestRateData}
          commercialInterestRateData={commercialInterestRateData}
        />
      )
    }else if(currentPage.title==="Credito hipotecario"){
      return (
        <MortgageSimulation
          irpdData={irpdData}
          mortgageInterestRateData={mortgageInterestRateData}
        />
      )
    }else if(currentPage.title==="Rentabilidad"){
      return (
        <ProfitabilitySimulation
          irpdData={irpdData}
        />
      )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Financial dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {pages.map((page, index) => (
              <ListItem button key={index} onClick={() => {setCurrentPage(page)}}>
                <MediaQuery minDeviceWidth={600}>
                  <ListItemIcon className={classes.listItemIcon}>{page.icon}</ListItemIcon>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={599}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                </MediaQuery>
                <ListItemText primary={page.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <MediaQuery query="(min-width: 600px)">
            <div style={{paddingTop: '64px', height: '100%', display: 'flex'}}>
              {renderCurrentPage()}
            </div>
          </MediaQuery>
          <MediaQuery query="(max-width: 599px)">
            <div style={{paddingTop: '56px', height: '100%', display: 'flex'}}>
              {renderCurrentPage()}
            </div>
          </MediaQuery>
        </main>
      </div>
    </ThemeProvider>
  );
}