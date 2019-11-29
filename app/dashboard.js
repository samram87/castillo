var estado = {};
var cntClientesPedido = 0;
var cntClientesNoVenta = 0;
var ventasDetalle = 0;
var ventasMayoreo = 0;
var ventaInsuficiente=0;
var lesstime=9999999999999;
var maxtime=0;

$(document).ready(function() {
    estado = JSON.parse(getLS("estado"));
    var clientesPendientes = getClientesPendientes();
    crearTablaPendientes(clientesPendientes);
    generarGrafico();
    crearTablaPedidos();
    toDataTable("#clientesPendientes");
    toDataTable("#tablaPedidos");
    $("#listaPrecios").click(function() {
        goto("listaprecios.html");
    });

    $("#sincronizar").click(function() {
        if (estado.abierto) {
            sincronizarPedidos();
        }
    });
    $("#cerrarDia").click(function() {
        if(checkInternet()){       
            if (estado.cerrado) {
                cerrado();
            } else {
                if (confirm("Esta a punto de cerar el dia. Ya no podra agregar mas pedidos ni registrar No Ventas. ¿Desea Continuar?")) {
                    //alerta("Sincronizando Pedidos Pendientes y Recargando");
                    doSincronize(function(){$.ajax({
                        type: "POST",
                        url: APP.url + "dal/cerrarDia.php",
                        data: { idUsuario: getIdUsuario(),
                             pedidos: cntClientesPedido, 
                             noventas: cntClientesNoVenta, 
                             totaldetalle: ventasDetalle,
                             totalmayoreo: ventasMayoreo,
                             ventaInsuficiente:ventaInsuficiente,
                             primerPedido:lesstime,
                             ultimoPedido:maxtime },
                        success:function(data){
                            alerta("Cierre exitoso");
                            estado.abierto = false;
                            estado.cerrado = true;
                            setLS("estado", JSON.stringify(estado));
                            setTimeout(function(){window.location.reload();},1500);
                        }
                    }).fail(function() {
                        alerta("Ocurrio un error. Verifique si hay internet");
                    });},function(){
                        alerta("No se pudo sincronizar con el servidor por favor intente en un lugar con mejor señal de internet");
                        setTimeout(function() {
                            //goto("dashboard.html");
                        }, 10000);
                    });
                }
            }
        }else{
            alerta("No hay conexión a internet en estos momentos, por favor intentelo mas tarde");
        }
    });
    if (estado.cerrado) {
        $("#cerrarDia").removeClass("btn-primary");
        $("#sincronizar").removeClass("btn-success");
    }

});

function activeTab(pos) {
    $(".tab-sam").removeClass("active");
    $(".div-sam").hide();
    if (pos == 0) {
        //Es tab de clientes pendientes
        $("#tabClientes").addClass("active");
        $("#divClientes").show();
    } else {
        //Es tab de Pedidos
        $("#tabPedidos").addClass("active");
        $("#divPedidos").show();
    }
}


function getClientesPendientes() {
    var clientesVisitados = JSON.parse(getLS("clientesVisitados"));
    var clientesDia = JSON.parse(getLS("Rutas"));

    for (var i = 0; i < clientesVisitados.length; i++) {
        var cv = clientesVisitados[i];
        var codigoCliente = cv.codigoCliente;
        for (var j = 0; j < clientesDia.length; j++) {
            var cd = clientesDia[j];
            if (cd.codigoCliente == codigoCliente) {
                clientesDia.splice(j, 1);
                j = clientesDia.length;
            }
        }
    }
    return clientesDia;
}

function crearTablaPendientes(clientesPendientes) {

    $.each(clientesPendientes, function(i, item) {
        
        //var trOriginal=$('<tr>').append($);
        var table="<td>"+
        "<div class='row'>"+
        "<div class='col-sm-6'><strong>"+item.codigoCliente + "</strong></div><div class='col-sm-6'><strong>"+ item.cliente+"</strong></div>"+
        "</div>"+
        "<div class='row'>"+
        "<div class='col-sm-12'>"+item.nombreComercial+"</div></div><div class='row'>";

        if (estado.abierto) {
            table+='<div class="col-sm-12"><button class="btn btn-success" onclick="nuevoPedido(\'' + item.codigoCliente + '\')"><i class="fas fa-fw fa-cart-plus"></i> Pedido</button>'+
            '<button class="btn btn-danger" onclick="noVenta(\'' + item.codigoCliente + '\')" ><i class="fas fa-fw fa-ban"></i> No Venta</button></div>';
        } else {
            table+='<div class="col-sm-6"><button class="btn " onclick="cerrado(\'\')"><i class="fas fa-fw fa-cart-plus"></i> Pedido</button></div>'+
            '<div class="col-sm-6"><button class="btn " onclick="cerrado(\'\')" ><i class="fas fa-fw fa-ban"></i> No Venta</button></div>';
        }
        table+="</div></td>"

        var tr = $('<tr>').html(table);
        $("#clientesPendientes tbody").append(tr);

    });
}

function cerrado() {
    alerta("El dia ha sido cerrado, ud no puede agregar mas pedidos ni registrar no ventas");
}

function crearTablaPedidos() {
    var pedidos = JSON.parse(getLS("pedidos"));
    $.each(pedidos, function(i, item) {
        var tr = $('<tr>').append(
            $('<td>').html("<strong>" + item.cliente.nombre + "</strong>")
        );
        //if (item.status == "LOCAL") {
            if (item.tipo == "PEDIDO") {
                $(tr).append($('<td>').html('<button class="btn btn-success" onclick="nuevoPedido(\'' + item.cliente.codigo + '\')"><i class="fas fa-fw fa-cart-plus"></i> Ver</button>'));
            } else {
                $(tr).append($('<td>').html('NO VENTA'));
            }
            if (item.status == "LOCAL") {

            } else {

            }
            if (item.tipo != "PEDIDO") {
                $(tr).append($('<td>').html('<button class="btn btn-danger" onclick="deletePedido(\'' + i + '\')" ><i class="fas fa-fw fa-ban"></i> Eliminar</button>'));
            }else{
                $(tr).append($('<td>').html(''));
            }
        /*} else {
            $(tr).append($('<td >').html('Sincronizado'));
            $(tr).append($('<td >').html(''));
        }*/
        $("#tablaPedidos tbody").append(tr);

    });
}

function sincronizarPedidos() {
    if (confirm("Esta Seguro que desea sincronizar los pedidos.")) {
        doSincronize(function(){
            alerta("Pedidos Sincronizados");
            setTimeout(function() {
                goto("dashboard.html");
            }, 1500);
        },function(){
            alerta("No pudieron ser sincronizadas las transacciones por favor intente en un lugar con mejor señal de internet");
            setTimeout(function() {
                //goto("dashboard.html");
            }, 10000);
        });

        
    }
}

function doSincronize(callback,failCallback) {
    var pedidos = JSON.parse(getLS("pedidos"));
    var pedToSend=[];
    for(var i=0;i<pedidos.length;i++){
        var item=pedidos[i];
        //if (item.status != "online") {
        pedToSend.push(item);
        //}
    }
    $.ajax({
        type: "POST",
        url: APP.url + "dal/sincronizar.php",
        data: { pedidos: JSON.stringify(pedToSend), idUsuario: getIdUsuario() },
        async: false,
        success:function(data){
            console.log(data);
            if (data == pedToSend.length) {
                for(var i=0;i<pedidos.length;i++){
                    var item=pedidos[i];
                    if (item.status != "online") {
                        item.status = "online";
                    }
                }
                callback();
                             
            } else {
                failCallback();
            }
        },error:failCallback
    }).fail(function(){
        failCallback();
    });
    setLS("pedidos", JSON.stringify(pedidos));
}


function nuevoPedido(codigoCliente) {
    setLS("cliente", codigoCliente);
    goto("pedidos.html");
}

function noVenta(codigoCliente) {
    setLS("cliente", codigoCliente);
    goto("noventa.html");
}

function deletePedido(pos) {
    if (confirm("Esta seguro que desea eliminar este pedido")) {
        var pedidos = JSON.parse(getLS("pedidos"));
        var cCliente = pedidos[pos].cliente.codigo;
        var clientesVisitados = JSON.parse(getLS("clientesVisitados"));
        var posCv = -1;
        if (clientesVisitados.length > 0) {
            for (var i = 0; i < clientesVisitados.length; i++) {
                var cv = clientesVisitados[i];
                if (cv.codigoCliente == cCliente) {
                    posCv = i;
                }
            }
            if (posCv > -1) {
                clientesVisitados.splice(posCv, 1);
                setLS("clientesVisitados", JSON.stringify(clientesVisitados));
            }
        }
        pedidos.splice(pos, 1);
        setLS("pedidos", JSON.stringify(pedidos));
        goto("dashboard.html");
    }
}

function generarGrafico() {
    var clientesDia = JSON.parse(getLS("Rutas"));

    var clientesPendientes = clientesDia.length;
    var clientesVisitados = JSON.parse(getLS("pedidos"));

    if (clientesVisitados.length > 0) {

        for (var i = 0; i < clientesVisitados.length; i++) {
            var cv = clientesVisitados[i];
            if (cv.tipo == "PEDIDO") {
                cntClientesPedido++;
            } else {
                cntClientesNoVenta++;
            }
        }
        clientesPendientes = clientesPendientes - cntClientesPedido - cntClientesNoVenta;
    }
    
    var pedidos = JSON.parse(getLS("pedidos"));
               //1575012017620

    for (var i = 0; i < pedidos.length; i++) {
        var p = pedidos[i];
        if (p.tipo == "PEDIDO") {
            for(var j=0;j<p.lineas.length;j++){
                if(p.lineas[j].tipoPrecio=="C"){
                    ventasMayoreo+=p.lineas[j].total;
                }else{
                    ventasDetalle+=p.lineas[j].total;
                }
                if(p.lineas[j].insuficiente){
                    ventaInsuficiente++;
                }
            }
        }
        if(p.timestamp<lesstime){
            lesstime=p.timestamp;
        }
        if(p.timestamp>maxtime){
            maxtime=p.timestamp;
        }
    }

    var totalVentas = ventasDetalle + ventasMayoreo;

    var user= JSON.parse(getLS("usuario"));
    $("#vendedor").html(user.nombre);
    $("#clientesVisitados").html(clientesVisitados.length);
    $("#pedidosRealizados").html(cntClientesPedido);
    $("#noVentas").html(cntClientesNoVenta);
    $("#ventasDetalle").html(ventasDetalle);
    $("#ventasMayoreo").html(ventasMayoreo);
    $("#totalVentas").html(totalVentas);
    $("#ventaInsuficiente").html(ventaInsuficiente);
    if(pedidos.length>0){
        $("#primerPedido").html(getTimeStamp(lesstime));
        $("#ultimoPedido").html(getTimeStamp(maxtime));

    }
    
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Pendientes", "Pedidos", "No Venta"],
            datasets: [{
                data: [clientesPendientes, cntClientesPedido, cntClientesNoVenta],
                backgroundColor: ['#007bff', '#28a745', '#dc3545'],
            }],
        },
    });

}

function getTimeStamp(timestamp){
    var d=new Date(timestamp);
    return d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
}