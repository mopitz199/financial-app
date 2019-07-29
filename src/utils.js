export function interesSimple(initial_value,  years, interest_rate){
  return initial_value*(1+(years*interest_rate))
}

export function interesCompuesto(initial_value,  years, interest_rate){
  return Math.pow((1+interest_rate), years)*initial_value
}

export function interesCompuestoAgregando(initial_value,  years, interest_rate, extra){
  var total = initial_value
  for(let i=1; i<=years; i++){
      total = interesCompuesto(total, 1, interest_rate)
      total += extra
  }
  return total
}

export function cuandoPuedoVender(pie, rentabilidad, valor_departamento, valor_arriendo, dividendo, anios){
  var mes = 1
  var ganancia = valor_departamento
  var deuda = (dividendo*anios*12) + pie
  while(ganancia <= deuda){
      let years = mes/12
      ganancia = interesSimple(valor_departamento, years, rentabilidad)
      deuda -= valor_arriendo
      mes += 1
  }
  return mes-1
}

export function cuandoPuedoVender2(pie, rentabilidad, valor_departamento, valor_arriendo, dividendo, anios, anios2){
  var ganancia = valor_departamento
  var deuda = (dividendo*anios*12) + pie
  for(let year=1; year<=anios2; year++){
      ganancia = interesSimple(valor_departamento, year, rentabilidad)
      deuda -= (valor_arriendo*12)
  }
  return ganancia-deuda
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