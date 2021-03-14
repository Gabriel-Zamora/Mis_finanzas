function agregar_api(json) {
  
  if(json.Monto == '') {
  
    return null;
  
  }
  
  var headers = ['Fecha','Glosa','Monto','Tipo','Cuenta','Estado','Etiqueta']; 
  var jflujo = flujos_headers_get();
 
  var libro = SpreadsheetApp.getActive();
  var hflujos = libro.getSheetByName('Flujos');
  var fdata = hflujos.getDataRange();
  var ultimafila = fdata.getLastRow();
  
  hflujos.insertRowAfter(ultimafila);
  
  for(i = 0; i < headers.length; i++){
    
    hflujos.getRange(ultimafila+1,jflujo[headers[i]]+1).setValue(json[headers[i]]);
    
  }
  
  hflujos.getRange("A1").getFilter().sort(1, true); 
  
}


function cambiar_api(json) {
  
  if(json.Antes.Fecha == '') {
  
    return null;
  
  }
  
  var headers = ['Fecha','Glosa','Monto','Tipo','Cuenta','Estado']; 
  var jflujo = flujos_headers_get();
  
  var libro = SpreadsheetApp.getActive();
  var hflujos = libro.getSheetByName('Flujos');  
  
  hflujos.getRange("A1").getFilter().sort(jflujo.Fecha+1, true);
  hflujos.getRange("A1").getFilter().sort(jflujo.Estado+1, true);

  var fdata = hflujos.getDataRange().getValues();  
  var prueba = true;
  var pos = 0;
  
  while ( prueba & pos < fdata.length-1 ){    
    
    pos = pos + 1;
    
    if(fdata[pos][jflujo.Estado] == "Pendiente"){
      
    prueba = false;
    
    }
    
  }


  for(i = 0; i < 10 ;i++){
  
    var flag = json.Antes.Fecha.getTime() == fdata[pos+i][jflujo.Fecha].getTime();

    for(j = 1; j < headers.length-1; j++){
      
      flag = flag & (json.Antes[headers[j]] == fdata[pos+i][jflujo[headers[j]]]);
      
    }  

    if(flag){
    
      for(j = 0; j < headers.length; j++){
      
        hflujos.getRange(pos+i+1,jflujo[headers[j]]+1).setValue(json.Ahora[headers[j]]);
      
      }  
  
    }
    
  }
  
  hflujos.getRange("A1").getFilter().sort(jflujo.Fecha+1, true); 
  
}




function agregarcuotas_api(json) {
  
  if(json.Monto == '') {
  
    return null;
  
  }
  
  var headers = ['Fecha', 'Glosa', 'Monto', 'Tarjeta', 'Estado', 'Etiqueta'];
  var jtarjeta = tarjetas_headers_get(); 
  json.Estado = 'Pendiente'
  
  
  var libro = SpreadsheetApp.getActive();
  var htarjeta = libro.getSheetByName('Tarjeta');
  var ultimafila = htarjeta.getDataRange().getLastRow();
  
  if (json.Cuotas == 1) {
  
    htarjeta.insertRowAfter(ultimafila);
    htarjeta.getRange(ultimafila+1,jtarjeta['Fecha de pago']+1).setValue(new Date(json.año,json.mes,1));
    htarjeta.getRange(ultimafila,jtarjeta['Cargo']+1).copyTo(htarjeta.getRange(ultimafila+1,jtarjeta['Cargo']+1));
    
    for(j = 0; j < headers.length; j++){
    
      htarjeta.getRange(ultimafila+1,jtarjeta[headers[j]]+1).setValue(json[headers[j]]);
    
    }
  
  }
  
  else {
  
    for(i = 1; i <= json.Cuotas ;i++){
      
      htarjeta.insertRowAfter(ultimafila+i-1);
      htarjeta.getRange(ultimafila+i,jtarjeta['Fecha de pago']+1).setValue(new Date(json.año,json.mes+i-1,1));
      htarjeta.getRange(ultimafila,jtarjeta['Cargo']+1).copyTo(htarjeta.getRange(ultimafila+i,jtarjeta['Cargo']+1));
      
      for(j = 0; j < headers.length; j++){
      
        htarjeta.getRange(ultimafila+i,jtarjeta[headers[j]]+1).setValue(json[headers[j]]);
      
      }
      
     }
  
  }

  htarjeta.getRange("A1").getFilter().sort(jtarjeta['Fecha de pago']+1, true); 

}



function pagar_api(json) {
  
  if(json.Monto == '') {
  
    return null;
  
  }
  
  var jctas =  par_pag();
  var jtarjeta = tarjetas_headers_get();

  json.Tipo = 'Gasto'
  json.Cuenta = jctas[json.Tarjeta]
  json.Estado = 'Realizado'
  json.Etiqueta = 'Deudas'
  
  var libro = SpreadsheetApp.getActive();
  var htarjeta = libro.getSheetByName('Tarjeta');

  agregar_api(json);

  if(json.Modo == "Total"){  
      
    var date = new Date(json.Plazo);

    htarjeta.getRange("A1").getFilter().sort(jtarjeta['Fecha de pago']+1, true);
    htarjeta.getRange("A1").getFilter().sort(jtarjeta.Estado+1, false);
    var tdata = htarjeta.getDataRange().getValues();
    
    for(i = 1; i < 5 ;i++){

      if( (new Date(tdata[i][jtarjeta['Fecha de pago']]) <= date)&(tdata[i][jtarjeta.Estado] == "Pendiente")&(tdata[i][jtarjeta.Tarjeta] == json.Tarjeta)){

        htarjeta.getRange(i+1,jtarjeta.Estado+1).setValue("Pagado");
        htarjeta.getRange(i+1,jtarjeta['Fecha de pago']+1).setValue(json.Fecha);
        
      }
      
    }
   
  htarjeta.getRange("A1").getFilter().sort(jtarjeta['Fecha de pago']+1, true);

  } 

}



function crear_inversion_api(json) {
  
  if((json.Monto == '')|(json.Etiqueta == '')|(json.Instrumento == '')) {
  
    return null;
  
  }
  
  var jrenta = rentabilidades_headers_get();
  
  var libro = SpreadsheetApp.getActive();
  var hrenta = libro.getSheetByName('Rentabilidades');
  
  hrenta.getRange("A1").getFilter().sort(jrenta.Estado+1, true);
  
  var rdata = hrenta.getDataRange().getValues();
  
  var prueba = true;
  var flag = true;
  var pos = 0;
  
  while ( flag & prueba & pos < rdata.length-1){       
    
    var pos = pos + 1;
    
    if(rdata[pos+1][jrenta.Estado] == 'Realizado') {
    
      flag = false;}
    
    if((rdata[pos][jrenta.Etiqueta] == json.Etiqueta)&(rdata[pos][jrenta.Instrumento] == json.Instrumento)){
      
    prueba = false;}
    
  }

hrenta.getRange("A1").getFilter().sort(jrenta['Fecha de compra']+1, true);

if (prueba) {
  
  var rdata = hrenta.getDataRange();
  var ultimafila = rdata.getLastRow();
  hrenta.insertRowAfter(ultimafila);
  
  hrenta.getRange(ultimafila+1,jrenta.Instrumento+1).setValue(json.Instrumento);
  hrenta.getRange(ultimafila+1,jrenta['Fecha de compra']+1).setValue(json.Fecha);
  hrenta.getRange(ultimafila+1,jrenta['Fecha de venta']+1).setValue('=TODAY()');
  
  hrenta.getRange(ultimafila,jrenta.Wacc+1).copyTo(hrenta.getRange(ultimafila+1,jrenta.Wacc+1));
  hrenta.getRange(ultimafila,jrenta.Capital+1).copyTo(hrenta.getRange(ultimafila+1,jrenta.Capital+1));
  hrenta.getRange(5,jrenta.Rescate+1).copyTo(hrenta.getRange(ultimafila+1,jrenta.Rescate+1));
  hrenta.getRange(ultimafila,jrenta.Ganancia+1).copyTo(hrenta.getRange(ultimafila+1,jrenta.Ganancia+1));
  hrenta.getRange(ultimafila,jrenta.TIR+1).copyTo(hrenta.getRange(ultimafila+1,jrenta.TIR+1));
  
  hrenta.getRange(ultimafila+1,jrenta.Etiqueta+1).setValue(json.Etiqueta);
  hrenta.getRange(ultimafila+1,jrenta.Estado+1).setValue('Pendiente');
  
  json.Glosa = json.Instrumento;
  json.Tipo = 'Ahorro';
  json.Cuenta = 'Efectivo';
  json.Estado = 'Realizado';
  
  agregar_api(json);

}

}

function liquidar_inversion_api(json) {
  
  if((json.Monto == '')|(json.Etiqueta == '')|(json.Instrumento == '')) {
  
    return null;
  
  }
  
  var jrenta = rentabilidades_headers_get();
  
  var libro = SpreadsheetApp.getActive();
  var hrenta = libro.getSheetByName('Rentabilidades');
  
  hrenta.getRange("A1").getFilter().sort(jrenta.Estado+1, true);
  
  var rdata = hrenta.getDataRange().getValues();
  
  var prueba = true;
  var flag = true;
  var pos = 0;
  
  while ( flag & prueba & pos < rdata.length-1){       
    
    var pos = pos + 1;
    
    if(rdata[pos+1][jrenta.Estado] == 'Realizado') {
    
      flag = false;}
    
    if((rdata[pos][jrenta.Etiqueta] == json.Etiqueta)&(rdata[pos][jrenta.Instrumento] == json.Instrumento)){
      
    prueba = false;}
    
  }

if ( !prueba) {

  hrenta.getRange(pos+1,jrenta.Rescate+1).setValue(json.Monto);
  hrenta.getRange(pos+1,jrenta['Fecha de venta']+1).setValue(json.Fecha);
  
  json.Glosa = json.Instrumento;
  json.Tipo = 'Ahorro';
  json.Cuenta = 'Efectivo';
  json.Estado = 'Realizado';
  json.Monto = -hrenta.getRange(pos+1,jrenta.Capital+1).getValue();
  
  agregar_api(json);

  json.Tipo = 'Ingreso';
  json.Etiqueta = 'Ganancia'
  json.Monto = hrenta.getRange(pos+1,jrenta.Ganancia+1).getValue();
  
  agregar_api(json);

  hrenta.getRange(pos+1,jrenta.Estado+1).setValue('Realizado');

}

hrenta.getRange("A1").getFilter().sort(jrenta['Fecha de compra']+1, true);

}



function distribucion_api(json) {
  
  var json_keys = Object.keys(json);
  
  if((json.Total == 0)&(json.fecha.getTime() == json.hoy.getTime())) {
    
    var jagregar = {};
    
    jagregar.Fecha = json.fecha;
    jagregar.Glosa = 'Transferencia';
    jagregar.Tipo = 'Distribución';
    jagregar.Estado = json.Estado;
    jagregar.Etiqueta = '';
 
    Logger.log(json_keys.length);
 
    for(j = 0; j < json_keys.length ;j++){
      
      if((json[json_keys[j]] > 0 | json[json_keys[j]] < 0) & (json_keys[j] != 'fecha') & (json_keys[j] != 'hoy')) { 
      
        jagregar.Cuenta = json_keys[j];
        jagregar.Monto = json[json_keys[j]];     
        
        agregar_api(jagregar);
      
      }
      
    }
  
  }
  
}
