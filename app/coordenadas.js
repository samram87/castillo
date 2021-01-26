var productos = [];
var clientes = [];
var producto = null;
var pedido = {};
var cliente = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
$(document).ready(function () {
    
    clientes = JSON.parse(getLS("clientes"));
    cliente = getClienteActual();
    setTimeout(function(){
        updateCoordenadas();
    },1000);

    
    //Inicio colocando los modelos del pedido.
    $("#cliente").val(cliente.cliente);
    var muni=getMunicipio(cliente.CODI_MUNI);
    $("#departamento").val(muni.CODI_DEPA);
    setMunicipios(muni.CODI_DEPA,"#municipio",cliente.CODI_MUNI);
    $("#direccion").val(cliente.direccion);
    $("#lat_long").val(APP.latitud+' ; '+APP.longitud);
    
    
    $("#departamento").change(function(){
        setMunicipios($("#departamento").val(),"#municipio");
    });

    $("#ponerCoordenadas").click(function(){
        if($("#cliente").val()==""){
             alerta("Por favor ingrese el nombre del cliente");
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
        cliente.municipio=$( "#municipio option:selected" ).text();
        cliente.departamento=$( "#departamento option:selected" ).text();
        if(APP.latitud!=""){
            cliente.latitud=APP.latitud;
            cliente.longitud=APP.longitud;
        }
        cliente.nuevo=false;
        cliente.status="offline";
        addClienteVisitado(cliente);
        goto("dashboardsupervisor.html");;
    });

});

function addClienteVisitado(cliente){
    var cv=JSON.parse(getLS("clientesVisitados"));
    var found=false;
    for(var i=0;i>cv.length;i++){
        if(cv[i].codigo==cliente.codigo){
            cv[i]=cliente;
            found=true;
        }
    }
    if(!found){
        cv.push(cliente);
    }
    setLS("clientesVisitados",JSON.stringify(cv));
    //Ahora al principal
    var clientes = JSON.parse(getLS("clientes"));
    for(var i=0;i>clientes.length;i++){
        if(clientes[i].codigo==cliente.codigo){
            clientes[i]=cliente;
        }
    }
    setLS("clientes",JSON.stringify(clientes));
    setLS("cliente","");
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

