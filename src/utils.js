export function simpleInterest(initialValue,  years, interestRate){
  return initialValue*(1+(years*interestRate))
}

export function compoundInterest(initialValue,  years, interestRate){
  return Math.pow((1+interestRate), years)*initialValue
}

export function compoundInterestByAdding(initialValue,  years, interestRate, extra){
  var total = initialValue
  for(let i=1; i<=years; i++){
      total = compoundInterest(total, 1, interestRate)
      total += extra
  }
  return total
}

export function whenIsProfitable(initialPayment, profitability, estateValue, rentValue, mortgageValue, debtYears){
  var mes = 1
  var earnings = estateValue
  var debt = (mortgageValue*debtYears*12) + initialPayment
  while(earnings <= debt){
      let years = mes/12
      earnings = simpleInterest(estateValue, years, profitability)
      debt -= rentValue
      mes += 1
  }
  return mes-1
}

export function toMoney(number){
  number = parseInt(number)
  return `$${number.toLocaleString("es")}`
}

export function earningsAfterYears(initialPayment, profitability, estateValue, rentValue, mortgageValue, debtYears, yearOfCalculation){
  var active = estateValue
  var debt = (mortgageValue*debtYears*12) + initialPayment
  for(let year=1; year<=yearOfCalculation; year++){
      active = simpleInterest(estateValue, year, profitability)
      debt -= (rentValue*12)
  }
  return {
    'active': Number(active.toFixed(2)),
    'debt': Number(debt.toFixed(2)),
    'earning': Number((active-debt).toFixed(2))
  }
}

export function getAppreciationRate(irpdData){
  let resp = {
    'dpto_santiago_centro': 0,
    'dpto_nor_poniente': 0,
    'dpto_nor_oriente': 0,
    'dpto_sur': 0,
    'casa_nor_poniente': 0,
    'casa_nor_oriente': 0,
    'casa_sur': 0
  }
  let total_elements = 0
  irpdData.map((e, index) => {
    total_elements+=1
    resp['casa_nor_poniente'] += e.data[10]
    resp['casa_nor_oriente'] += e.data[11]
    resp['casa_sur'] += e.data[12]
    resp['dpto_santiago_centro'] += e.data[13]
    resp['dpto_nor_poniente'] += e.data[14]
    resp['dpto_nor_oriente'] += e.data[15]
    resp['dpto_sur'] += e.data[16]
  })

  for(let attrName in resp){
    if(resp.hasOwnProperty(attrName)){
      if(total_elements!==0){
        resp[attrName] = resp[attrName] / total_elements
      }else{
        resp[attrName] = '???'
      }
    }
  }

  if(total_elements!==0){
    resp['casa_general'] = (resp['casa_nor_poniente'] + resp['casa_nor_oriente'] + resp['casa_sur']) / 3
    resp['dpto_general'] = (resp['dpto_santiago_centro'] + resp['dpto_nor_oriente'] + resp['dpto_nor_oriente'] + resp['dpto_sur']) / 4
  }else{
    resp['casa_general'] = '???'
    resp['dpto_general'] = '???'
  }

  return resp
}

export function getCurrentMortgageRate(mortgageInterestRateData){
  let lastIndex = mortgageInterestRateData.length-1
  return Number(mortgageInterestRateData[lastIndex]['value'])
}

export function calculatePartialMortgage(interestRate, yearPeriod, mortgageCreditValue){
  var monthlyInterestRate = Math.pow((1+interestRate), (1/12))-1
  var monthPeriod = yearPeriod*12
  return mortgageCreditValue*monthlyInterestRate*(Math.pow((monthlyInterestRate+1),monthPeriod)/(Math.pow((monthlyInterestRate+1),monthPeriod)-1))
}

export function calculateFinalMortgage(interestRate, yearPeriod, mortgageCreditValue, estateValue){
  var monthPeriod = yearPeriod*12
  let partialMortgageValue = calculatePartialMortgage(interestRate, yearPeriod, mortgageCreditValue)
  let reliefInsurance = getReliefInsurance(partialMortgageValue, monthPeriod, estateValue)
  let fireEarthquakeInsurance = getFireEarthquakeInsurance(partialMortgageValue, monthPeriod, estateValue)
  let operationalCosts = 100
  return partialMortgageValue + (reliefInsurance/monthPeriod) + (fireEarthquakeInsurance/monthPeriod) + (operationalCosts/monthPeriod)
}

export function getReliefInsurance(partialMortgageValue, periods, estateValue){
  var debt = estateValue
  var total = 0
  for(var j=1; j<=periods; j++){
    debt -= partialMortgageValue
    total += (debt*0.00015)
  }
  return total
}

export function getFireEarthquakeInsurance(partialMortgageValue, periods, estateValue){
  var debt = estateValue
  var total = 0
  for(var j=1; j<=periods; j++){
    debt -= partialMortgageValue
    total += (debt*0.0003)
  }
  return total
}