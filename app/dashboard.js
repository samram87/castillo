$(document).ready(function () {
    var clientesPendientes = getClientesPendientes();
    crearTablaPendientes(clientesPendientes);
    generarGrafico();
    crearTablaPedidos();
    toDataTable("#clientesPendientes");
    toDataTable("#tablaPedidos");
    $("#sincronizar").click(function(){
        sincronizarPedidos();
    });
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
    $.each(clientesPendientes, function (i, item) {

        var tr = $('<tr>').append(
                $('<td>').html("<strong>" + item.cliente + "</strong>")
                );
        $(tr).append($('<td>').html('<button class="btn btn-success" onclick="nuevoPedido(\'' + item.codigoCliente + '\')"><i class="fas fa-fw fa-cart-plus"></i> Pedido</button>'));
        $(tr).append($('<td>').html('<button class="btn btn-danger" onclick="noVenta(\'' + item.codigoCliente + '\')" ><i class="fas fa-fw fa-ban"></i> No Venta</button>'));

        $("#clientesPendientes tbody").append(tr);

    });
}

function crearTablaPedidos() {
    var pedidos = JSON.parse(getLS("pedidos"));
    $.each(pedidos, function (i, item) {
        var tr = $('<tr>').append(
                $('<td>').html("<strong>" + item.cliente.nombre + "</strong>")
                );
        if (item.status == "LOCAL") {
            if (item.tipo == "PEDIDO") {
                $(tr).append($('<td>').html('<button class="btn btn-success" onclick="nuevoPedido(\'' + item.cliente.codigo + '\')"><i class="fas fa-fw fa-cart-plus"></i> Ver</button>'));
            } else {
                $(tr).append($('<td>').html('NO VENTA'));
            }
            if (item.status == "LOCAL") {

            } else {

            }
            $(tr).append($('<td>').html('<button class="btn btn-danger" onclick="deletePedido(\'' + i + '\')" ><i class="fas fa-fw fa-ban"></i> Eliminar</button>'));
        } else {
            $(tr).append($('<td >').html('Sincronizado'));
            $(tr).append($('<td >').html(''));
        }
        $("#tablaPedidos tbody").append(tr);

    });
}

function sincronizarPedidos() {
    if (confirm("Esta Seguro que desea sincronizar los pedidos. Ya no podra editarlos.")) {
        var pedidos = JSON.parse(getLS("pedidos"));
        $.each(pedidos, function (i, item) {
            if(item.status!="online"){
                var texto = $.ajax({
                type: "POST",
                url: APP.url+"dal/sincronizar.php",
                data: {pedido: JSON.stringify(item), idUsuario: getIdUsuario()},
                async: false}).responseText;
                if(texto=="SUCCESS"){
                    item.status="online";
                }else{
                    console.log(texto);
                    alerta(texto);
                }
            }
        });
        setLS("pedidos", JSON.stringify(pedidos));
        alerta("Pedidos Sincronizados");
        setTimeout(function(){goto("dashboard.html");},1000);
    }
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
    var cntClientesPedido = 0;
    var cntClientesNoVenta = 0;
    var clientesPendientes = clientesDia.length;
    var clientesVisitados = JSON.parse(getLS("clientesVisitados"));

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

