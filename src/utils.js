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