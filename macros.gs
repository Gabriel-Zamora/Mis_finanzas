function Agregar() {
  
  var ajson = agregar_put();
  agregar_api(ajson);
  agregar_vaciar();
  
}


function Realizar() {
  
 var json = cambiar_put();
 json.Ahora['Estado'] = 'Realizado'
 
 cambiar_api(json);
 cambiar_vaciar();
  
}


function Cambiar() {
  
 var json = cambiar_put();
 json.Ahora['Estado'] = 'Pendiente'
 
 cambiar_api(json);
 cambiar_vaciar();
  
}


function Agregarcuotas() {

 var json = agregarcuotas_put();
 agregarcuotas_api(json);
 agregarcuotas_vaciar();

}


function Pagar() {
  
  var json = pagar_put();
  pagar_api(json); 
  pagar_vaciar();
   
}


function Distribuir() {
 
 var json = distribucion_put();
 distribucion_api(json);
  
}


function liquidar_inversion() {
  
  var ijson = inversion_put();
  liquidar_inversion_api(ijson);
  inversion_vaciar();
}


function crear_inversion() {
  
  var ijson = inversion_put();
  crear_inversion_api(ijson);
  inversion_vaciar();
}


function onEdit(e) {
  
  if (e.range.getA1Notation() == 'B2') {
    
    if (/^\w+$/.test(e.value)) { 
      
      eval(e.value)();
      e.range.clear();
      
    }
    
  }
  
}
