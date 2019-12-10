var productos = [];
var clientes = [];
var producto = null;
var pedido = {};
var cliente = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
$(document).ready(function () {
    
    clientes = JSON.parse(getLS("Clientes"));
    cliente = getClienteActual();
    pedido.cliente=cliente;
    if(cliente.LATITUD==""){
        $("#alertaGPS").show();
        setTimeout(function(){
            pedido.cliente.LATITUD=APP.latitud;
            pedido.cliente.LONGITUD=APP.longitud;
            pedido.latitud=APP.latitud;
            pedido.longitud=APP.longitud;
        },2000);
    }else{
        setTimeout(function(){
            //Guardamos en el pedido la lat,long desde donde se guardo
            pedido.latitud=APP.latitud;
            pedido.longitud=APP.longitud;
        },2000);
    }


    
    //Inicio colocando los modelos del pedido.
    $("#cliente").val(cliente.nombre);
    
    $("#addPedido").click(function(){
        pedido.tipo="NOVENTA";
        pedido.status="LOCAL";
        pedido.uuid=getUuid();
        pedido.observacion=$("#observacion").val();
        pedido.timestamp= (new Date().getTime());
        if(pedido.observacion==""){
            alerta("Por Favor Indique la razon de la 'No Venta'");
            return;
        }
        var pedidos=JSON.parse(getLS("pedidos"));
        pedidos.push(pedido);
        var cvs=JSON.parse(getLS("clientesVisitados"));
        var cv={};
        cv.codigoCliente=cliente.codigo;
        cv.tipo="NOVENTA";
        cvs.push(cv);
        setLS("clientesVisitados",JSON.stringify(cvs));
        setLS("pedidos",JSON.stringify(pedidos));
        alerta("Registro Guardado con exito");
        setTimeout(function(){goto("dashboard.html");},1500);
    });

});


function getClienteActual() {
    var codigoCliente = getLS("cliente");
    var cliente = null;
    var clientes = JSON.parse(getLS("Clientes"));

    $.each(clientes, function (i, item) {
        if (item.codigo == codigoCliente) {
            cliente = item;
        }
    });
    return cliente;
}

