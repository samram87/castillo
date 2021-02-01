var productos = [];
var clientes = [];
var producto = null;
var pedido = {};
var cliente = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
$(document).ready(function () {
    
    cliente = {};
    cliente.codigo="N_"+Math.floor(Math.random() * 100000000);
    cliente.codigoCliente=cliente.codigo;
    cliente.tipo="";
    cliente.telefono="";
    cliente.celular="";
    cliente.email="";
    cliente.clase="";
    cliente.nombreComercial="";
    
    setTimeout(function(){
        updateCoordenadas();
    },1000);
   
    
    $("#departamento").change(function(){
        setMunicipios($("#departamento").val(),"#municipio");
    });
    
    $("#municipio").change(function(){
        setCantones($("#municipio").val(),"#canton");
    });

    $("#ponerCoordenadas").click(function(){
        if($("#cliente").val()==""){
             alerta("Por favor ingrese el nombre del cliente");
            return;
        }
        if($("#nombreComercial").val()==""){
             alerta("Por favor ingrese el nombre comercial del cliente");
            return;
        }
        if($("#departamento").val()==""){
             alerta("Por favor ingrese el departamento del cliente");
            return;
        }
        if($("#municipio").val()==""){
             alerta("Por favor ingrese el municipio del cliente");
            return;
        }
        if($("#direccion").val()==""){
             alerta("Por favor ingrese la direccion del cliente");
            return;
        }
    
        cliente.cliente=$("#cliente").val();
        cliente.nombre=$("#cliente").val();
        cliente.direccion=$("#direccion").val();
        cliente.CODI_MUNI=$("#municipio").val();
        cliente.CODI_CANT=$("#canton").val();
        cliente.nombreComercial=$("#nombreComercial").val();
        cliente.municipio=$( "#municipio option:selected" ).text();
        cliente.departamento=$( "#departamento option:selected" ).text();
        if(APP.latitud!=""){
            cliente.latitud=APP.latitud;
            cliente.longitud=APP.longitud;
        }
        cliente.nuevo=true;
        cliente.status="offline";
        addClienteVisitado(cliente);
        goto("dashboardsupervisor.html");;
    });

});

function addClienteVisitado(cliente){
    var cv=JSON.parse(getLS("clientesVisitados"));
    cv.push(cliente);
    
    setLS("clientesVisitados",JSON.stringify(cv));
}

function updateCoordenadas(){
    if(APP.latitud==null){
        setTimeout(updateCoordenadas,1000);
        return;
    }
    cliente.latitud=APP.latitud;
    cliente.longitud=APP.longitud;    
    $("#lat_long").html(APP.latitud+' ; '+APP.longitud);
    $("#ponerCoordenadas").show();
    $("#progressbar").hide();
}

function getClienteActual() {
    var codigoCliente = getLS("cliente");
    var cliente = null;
    var clientes = JSON.parse(getLS("clientes"));

    $.each(clientes, function (i, item) {
        if (item.codigo == codigoCliente) {
            cliente = item;
        }
    });
    return cliente;
}

