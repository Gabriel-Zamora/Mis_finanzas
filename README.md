# Mis finanzas
Planilla para administrar finanzas personales; ingresos, gastos, ahorros, inversiones, deudas, cuentas bancarias y tarjetas de crédito (ver [aquí](https://docs.google.com/spreadsheets/d/1fo6H5vGq9u7z9ff32IJ3ngwQ49QcZZoDDEhW4KzCv-0/edit?usp=sharing)).

## Planilla

### Resumen
Panel que resume situación financiera a cierta fecha y permite ingresar nuevos registros a las hojas de flujos, tarjetas y rentabilidades mediante formularios destacados en color amarillo. Para ingresar nuevas transacciones a traves de formulario basta con seleccionar los botones verde, o en caso de teléfono móvil seleccionar una opción de la lista desplegable en la celda B2.

### Cuentas
Permite visualizar el estado de las distintas cuentas bancarias o de efectivo a cierta fecha, y hacer comparaciones con situación presupuestada. El botón distribuir permite hacer transferencias ente distintas cuentas ingresando la situación real en la columna I, siempre que el saldo total sea el mismo al especificado en la columna C.

### Flujos
En esta hoja, quedan registrados todos los movimientos que se pueden traducir en una entrada o salida de dinero, se guarda la fecha, glosa, monto, tipo, cuenta, estado y etiqueta de la transacción:
- Fecha: Fecha en que se espera que se materializa o se espera que se ejecute la transacción
- Glosa: Nombre asociado a la transacción
- Monto: Monto de la transacción
- Tipo: Tipo de transacción, puede ser una transacción que genere un ingreso  o un egreso. En la pestaña resumen son reconocidos; gasto, ingreso, ahorro, deuda, donación, distribución
- Cuenta: Cuenta en la que se generan los movimientos; la lista de cuentas se encuentra en la columna A de la hoja validaciones
- Estado: Estado de la transacción, puede ser ya realizada o pendiente (presupuestada)
- Etiqueta: Alguna etiqueta asociada a la transacción, util para luego hacer análisis de transacciones

### Tarjeta
En esta hoja quedan resgitrados todos los movimientos que se efectuan sobre una tarjeta de crédito separados en cuotas, quedando guardada la fecha de uso, fecha de pago, glosa, cuota, cargo, tarjeta, monto, estado y etiqueta de la transacción:
- Fecha: Fecha en que se usa o se presupuesta usar tarjeta de crédito
- Fecha de pago: Fecha en que se paga o se espera pagar la deuda asociada a una cuota
- Glosa: Nombre asociado al uso de la tarjeta
- Cuota: Número de cuota
- Cargo: Monto en pesos cargado a la tarjeta
- Tarjeta: Tarjeta de crédito a la que se asocia el movimiento, la lista de tarjetas se encuentra en la columna B de la hoja validaciones
- Monto: Monto de la deuda asociado al uso de la tarjeta de crédito en CLP o USD
- Estado: Estado del movimiento, realizado o pendiente (en espera de pago)
- Etiqueta: Alguna etiqueta asociada a la transacción, util para luego hacer análisis de transacciones

### Rentabilidades
En esta hoja quedan registrados los instrumentos de ahorro o inversión, guardando el nombre del instrumento, fecha de compra inicial, fecha de liquidación, tasa de rendimiento esperado, capital, rescate, ganancia, TIR, etiqueta y estado del instrumento.
- Intrumento: Nombre del instrumento de ahorro o inversión, ingresar en hoja instrumentos junto a tasa de retorno esperado
- Fecha de compra: Fecha de compra del instrumento financiero
- Fecha de venta: Fecha en que se liquida totalmente el instrumento financiero, por defecto hoy
- WACC: Tasa de retorno esperado, registrado en la hoja instrumentos
- Capital: Capital ahorrado o invertido, viene los movimientos de la hoja de flujos
- Rescate: Monto de rescate de la inversión, o valor neto de hoy en caso de no haber liquidado
- Ganancia: Ganancia del instrumento financiero
- TIR: Tasa interna de retorno de los flujos (registrados en la hoja de flujos) realizados o esperados del instrumento
- Etiqueta: Meta del instrumento
- Estado: Estado del instrumento, realizado (liquidado) o pendiente de liquidar

## Macros

### api.gs
Script que incluye todas las lógicas para agregar movimientos a las distintas hojas transaccionales, cada una de las funciones tienen como entrada un objeto de tipo json con cada uno de los campos que definen una transacción. Está diseñado de forma en que se puedan agregar transacciones desde una aplicación mediante un método post.

### sheet_api.gs
Script que transforma la información llenada en las celdas que funcionan como formularios de la hoja resumen en objetos con formato json que puedan ser llamados por las funciones contenidas en el archivo api.gs.

### macros
Macros que están asociadas a los distintos botones presentes en la planilla, permite separar la parte lógica de la planilla con la lectura de los formularios.

### tools.gs
Script que tiene funciones paramétricas que permiten relacionar cuentas bancarias, a tarjetas de crédito y sus periodos de facturación
