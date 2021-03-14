function par_tarjetas() {
  
  return {'ACN': 'A','ACI': 'A',
          'BCN': 'B','BCI': 'B'};
          
}

function par_fac() {
  
  var fec = {'A': 21,'B': 17};
  var fec_keys = Object.keys(fec);
  
  var jtarjetas = par_tarjetas();
  var jtarjetas_keys = Object.keys(jtarjetas);
  
  var jfac = {};
  
  for(i = 0; i < jtarjetas_keys.length; i++){
      
      jfac[jtarjetas_keys[i]] = fec[jtarjetas[jtarjetas_keys[i]]];
  
  }

  return jfac;
  
}

function par_pag() {
  
  var ctas = {'A CC': 'A','B CC': 'B'};
  var ctas_keys = Object.keys(ctas);
  
  var jtarjetas = par_tarjetas();
  var jtarjetas_keys = Object.keys(jtarjetas);
  
  var jpag = {};
  
  for(i = 0; i < jtarjetas_keys.length; i++){
      
      for(j = 0; j < ctas_keys.length; j++){
      
        if (jtarjetas[jtarjetas_keys[i]] == ctas[ctas_keys[j]]) {
      
          jpag[jtarjetas_keys[i]] = ctas_keys[j];
      
        }
      
      }
  
  }
  
  return jpag;
  
}
