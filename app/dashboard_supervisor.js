var estado = {};
var cntClientesPedido = 0;
var cntClientesNoVenta = 0;
var ventasDetalle = 0;
var ventasMayoreo = 0;
var ventaInsuficiente = 0;
var lesstime = 9999999999999;
var maxtime = 0;
var total_a = 0;
var inex_a = 0;
var total_b = 0;
var inex_b = 0;
var total_c = 0;
var inex_c = 0;

$(document).ready(function () {
    estado = JSON.parse(getLS("estado"));
    var clientesPendientes = getClientesPendientes();
    crearTablaPendientes(clientesPendientes);
    toDataTable("#clientesPendientes");

    $("#nuevoCliente").click(function () {
        goto("ponercoordenadas_nuevo.html");
    });

    $("#sincronizar").click(function () {
        //if (estado.abierto) {
        sincronizarClientes();
        //}
    });
    if (estado.cerrado) {
        $("#cerrarDia").removeClass("btn-primary");
        //$("#sincronizar").removeClass("btn-success");
    }
    generarResumen();

    //Si es hora del cierre y hay internet
    cierreAutomatico();

});


function cierreAutomatico() {
    if (esHora() && checkInternet()) {
        try {
            navigator.notification.alert("Se procedera a hacer el cierre automatico", function () {});
        } catch (e) {

        } finally {
            doSincronize(function () {
                alerta("Clientes Sincronizados");
                setTimeout(function () {
                    goto("dashboardsupervisor.html");
                }, 1500);
            }, function () {
                alerta("No pudieron ser sincronizadas las transacciones por favor intente en un lugar con mejor señal de internet");
                setTimeout(function () {
                    //goto("dashboard.html");
                }, 10000);
            });
        }

    } else {
        setTimeout(function () {
            cierreAutomatico();
        }, 300000);
    }
}

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
    var clientesDia = JSON.parse(getLS("clientes"));

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
        if (item.codigoCliente != "214919") {
            //var trOriginal=$('<tr>').append($);
            var table = "<td>" +
                    "<div class='row'>" +
                    "<div class='col-sm-6'><strong>" + item.codigo + "</strong></div><div class='col-sm-6'><strong>" + item.cliente + "</strong></div>" +
                    "</div>" +
                    "<div class='row'>" +
                    "<div class='col-sm-12'>" + item.nombreComercial + "</div></div><div class='row'>" +
                    "<div class='col-sm-12'>(" + item.municipio + ")</div></div><div class='row'>";
            if (item.latitud == "") {
                table += "<div class='col-sm-12'>(Sin Coordenadas)</div></div><div class='row'>";
            } else {
                table += "<div class='col-sm-12'>" + item.latitud + ";" + item.longitud + "</div></div><div class='row'>";
            }

            if (estado.abierto) {
                table += '<div class="col-sm-12"><button class="btn btn-success" onclick="setCoordenadas(\'' + item.codigoCliente + '\')"><i class="fas fa-fw fa-flag"></i> Poner Coordenadas</button>' +
                        '<button class="btn btn-danger" onclick="noVenta(\'' + item.codigoCliente + '\')" ><i class="fas fa-fw fa-flag"></i> Inexsitente</button></div>';
            } else {
                table += '<div class="col-sm-6"><button class="btn " onclick="cerrado(\'\')"><i class="fas fa-fw fa-cart-plus"></i> Poner Coordenadas</button></div>' +
                        '<div class="col-sm-6"><button class="btn " onclick="cerrado(\'\')" ><i class="fas fa-fw fa-ban"></i> Inexsitente</button></div>';
            }
            table += "</div></td>"

            var tr = $('<tr>').html(table);
            $("#clientesPendientes tbody").append(tr);
        }
    });
}

function cerrado() {
    alerta("El dia ha sido cerrado, ud no puede agregar mas pedidos ni registrar no ventas");
}

function crearTablaPedidos() {
    var pedidos = JSON.parse(getLS("pedidos"));
    $.each(pedidos, function (i, item) {
        var tr = $('<tr>').append(
                $('<td>').html(item.cliente.codigo == "214919" ? "<strong>" + item.cliente.nombre + "</strong><br><span style='font-size:0.7em'>" + item.observacion + "</span>" : "<strong>" + item.cliente.nombre + "</strong>")

                );
        //if (item.status == "LOCAL") {
        if (item.tipo == "PEDIDO") {
            $(tr).append($('<td>').html('<button class="btn btn-success" onclick="editarPedido(' + i + ',\'' + item.cliente.codigo + '\')"><i class="fas fa-fw fa-cart-plus"></i> Ver</button>'));
        } else {
            $(tr).append($('<td>').html('NO VENTA'));
        }
        if (item.status == "LOCAL") {

        } else {

        }
        if (item.tipo != "PEDIDO") {
            $(tr).append($('<td>').html('<button class="btn btn-danger" onclick="deletePedido(\'' + i + '\')" ><i class="fas fa-fw fa-ban"></i> Eliminar</button>'));
        } else {
            if (item.status == "LOCAL") {
                $(tr).append($('<td>').html('<button class="btn btn-danger" onclick="deletePedido(\'' + i + '\')" ><i class="fas fa-fw fa-ban"></i> Eliminar</button>'));
            } else {
                $(tr).append($('<td>').html(''));
            }

        }
        /*} else {
         $(tr).append($('<td >').html('Sincronizado'));
         $(tr).append($('<td >').html(''));
         }*/
        $("#tablaPedidos tbody").append(tr);

    });
}

function sincronizarClientes() {
    if (confirm("Esta Seguro que desea sincronizar los clientes.")) {
        doSincronize(function () {
            alerta("Clientes Sincronizados");
            setTimeout(function () {
                goto("dashboardsupervisor.html");
            }, 1500);
        }, function () {
            alerta("No pudieron ser sincronizadas las transacciones por favor intente en un lugar con mejor señal de internet");
            setTimeout(function () {
                //goto("dashboard.html");
            }, 10000);
        });


    }
}

function doSincronize(callback, failCallback) {
    var clientes = JSON.parse(getLS("clientesVisitados"));
    var pedToSend = [];
    for (var i = 0; i < clientes.length; i++) {
        var item = clientes[i];
        if (item.status != "online") {
            pedToSend.push(item);
        }
    }
    $.ajax({
        type: "POST",
        url: APP.url + "dal/sincronizar_clientes.php",
        data: {clientes: JSON.stringify(pedToSend), idUsuario: getIdUsuario(), ruta: getLS("ruta")},
        async: false,
        success: function (data) {
            console.log(data);
            if (data.correctos.length == pedToSend.length) {
                for (var i = 0; i < clientes.length; i++) {
                    var item = clientes[i];
                    if (item.status != "online") {
                        item.status = "online";
                    }
                }
                callback(data);
            } else {
                failCallback(data);
            }
        }, error: failCallback
    }).fail(function () {
        failCallback();
    });
    setLS("clientesVisitados", JSON.stringify(clientes));
}


function nuevoPedido(codigoCliente) {
    setLS("posicionPedido", -1);
    setLS("cliente", codigoCliente);
    goto("pedidos.html");
}

function editarPedido(posicion, codigoCliente) {
    setLS("posicionPedido", posicion);
    setLS("cliente", codigoCliente);
    goto("pedidos.html");
}

function setCoordenadas(codigoCliente) {
    setLS("cliente", codigoCliente);
    goto("ponercoordenadas.html");
}

function deletePedido(pos) {
    if (confirm("Esta seguro que desea eliminar este pedido")) {
        var pedidos = JSON.parse(getLS("pedidos"));
        if (pedidos[pos].status == "LOCAL") {
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
        } else {
            alerta("El pedido ya fue sincronizado no puede eliminarlo.");
        }

    }
}

function generarResumen() {

    var clientesVisitados = JSON.parse(getLS("clientesVisitados"));
    var user = JSON.parse(getLS("usuario"));
    $("#vendedor").html(user.nombre);
    $("#clientesVisitados").html((clientesVisitados.length));
    $("#fechaVenta").html(new Date().toLocaleDateString('es-SV'));

}

function cantidadSinIva(number) {
    var net = number / 1.13;
    return getMoneyValue(net);
}


function getMoneyValue(number) {
    var value = '';
    var round = Math.round(number * 100) / 100;
    if (Number.isInteger(round)) {
        value = round + '.00';
    } else {
        if (Number.isInteger(round * 10)) {
            value = round + '0';
        } else {
            value = round;
        }
    }
    return '$ ' + value;
}

function getTimeStamp(timestamp) {
    var d = new Date(timestamp);
    var hour = d.getHours();
    if (d.getHours() < 10) {
        hour = '0' + d.getHours();
    }
    var minute = d.getMinutes();
    if (d.getMinutes() < 10) {
        minute = '0' + d.getMinutes();
    }
    var second = d.getSeconds();
    if (d.getSeconds() < 10) {
        clientesVisitados
        second = '0' + d.getSeconds();
    }
    return hour + ':' + minute + ':' + second;
}
