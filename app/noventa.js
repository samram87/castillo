var productos = [];
var clientes = [];
var producto = null;
var pedido = {};
var cliente = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
$(document).ready(function () {
    productos = JSON.parse(getLS("Productos"));
    clientes = JSON.parse(getLS("Clientes"));
    cliente = getClienteActual();
    pedido.cliente = cliente;
    pedido.lineas = [];
    pedido.total = 0;
    pedido.items = 0;
    pedido.totalLineas = 0;

    if(cliente.LATITUD==""){
        $("#alertaGPS").show();
    }else{
        
    }


    listarProductos();
    $("#productos").click(function () {
        $("#modalProductos").modal('show');
        return false;
    });
    //Creando funcion que filtra los elemenots de los productos
    $("#buscadorProductos").on('input', function (e) {
        filtrarListado("buscadorProductos", "item-productos");
    });

    //Inicio colocando los modelos del pedido.
    $("#cliente").val(cliente.nombre);

    $("#cantidad").on('input', function (e) {
        updatePrecio()
    });
    $("#uom").change(function () {
        updatePrecio();
    });
    $("#cantidad").change(function () {
        updatePrecio();
    });
    $("#addLinea").click(function () {
        if (validarLinea()) {
            var linea = {};
            linea.producto = producto;
            linea.cantidad = parseFloat($("#cantidad").val());
            linea.oum = producto.uom[$("#uom").val()];
            linea.observacion=$("#observacion").val();
            var tipoPrecio = $("#tipoPrecio").val();
            var idPrecio = parseInt($("#idPrecio").val());
            linea.tipoPrecio = tipoPrecio;
            if (tipoPrecio == 'M') {
                linea.precio = producto.uom[$("#uom").val()].precios[idPrecio];
            } else {
                linea.precio = producto.uom[$("#uom").val()].preciosTienda[idPrecio];
            }
            linea.precio = parseFloat($("#precio").val());
            linea.total = round(linea.cantidad * linea.precio);
            pedido.lineas.push(linea);
            limpiarLinea();
            actualizarPedido();
        }
    });

});


function limpiarLinea(){
    $("#tipoPrecio").val("");
    $("#observacion").val("");
    $("#idPrecio").val("");
    $("#precio").val("");
    $("#cantidad").val("");
    $("#uom").empty();
    $("#productos").empty();
    
    producto=null;
    updatePrecio();
    precioMasBajo = 1000000;
}


function actualizarPedido() {
    pedido.total = 0;
    pedido.items = 0;
    pedido.totalLineas = pedido.lineas.length + 1;
    $.each(pedido.lineas, function (i, item) {
        pedido.total += item.total;
        pedido.items += item.cantidad;
    });
    $("#totalProductos").html(pedido.totalLineas + " Items");
    $("#totalCantidad").html(pedido.items);
    $("#totalPedido").html("Total: " + pedido.total);
    $("#productosAgregados tbody").empty();
    $.each(pedido.lineas, function (i, item) {
        var tr = $('<tr>').append(
                $('<td>').html("<button type='button' onclick='deleteLine(" + i + ")' class='btn btn-danger'><i class='fa fa-minus' ></i></button> " + item.producto.nombre)
                );
        $(tr).append($('<td>').html(item.cantidad));
        $(tr).append($('<td>').html(item.precio));
        $(tr).append($('<td>').html(item.total));

        $("#productosAgregados tbody").append(tr);
    });

}

function deleteLine(pos) {
    if (confirm("Desea eliminar esta linea")) {
        pedido.lineas.splice(pos,1);
        actualizarPedido();
    }
}

function validarLinea() {
    if (producto == null) {
        alerta("Seleccione un producto a agregar.");
        return false;
    }

    if ($("#cantidad").val() == "" || parseFloat($("#cantidad").val()) == 0) {
        alerta("Digite la cantidad");
        return false;
    }

    if ($("#precio").val() == "" || parseFloat($("#precio").val()) == 0) {
        alerta("Ingrese o seleccione el precio de venta");
        return false;
    } else {
        if (parseFloat($("#precio").val()) < precioMasBajo) {
            alerta("El precio ingresado es menor al precio mas bajo posible");
            return false;
        }
    }
    return true;
}

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


function clearSearchProd() {
    $("#buscadorProductos").val("");
    $(".item-productos").css("display", "block");
}

function listarProductos() {
    $.each(productos, function (i, item) {
        $("#listadoProductos").append('<a href="#" onclick="setProducto(' + i + ')" class="list-group-item list-group-item-action item-productos" >' + item.codigo + ' - ' + item.nombre + '</a>');
    });
}

function setProducto(pos) {
    producto = productos[pos];
    $("#productos").empty();
    $("#productos").append("<option value='" + pos + "'>" + producto.codigo + ' - ' + producto.nombre + "</option>");
    $("#modalProductos").modal('hide');
    clearSearchProd();
    $("#cantidad").val("");
    $("#precio").val("");
    precioMasBajo = 100000000;
    //Ahora lleno el uom
    $("#uom").empty();
    $.each(producto.uom, function (i, item) {
        $("#uom").append("<option value='" + i + "'>" + item.nombre + "</option>");
    });


    updatePrecio();

}

function updatePrecio() {
    var cnt = $("#cantidad").val();
    var uom = $("#uom").val();

    $("#preciosDisponibles").empty();
    if (producto == null) {
        $("#preciosDisponibles").append('<h6 class="dropdown-header">Seleccione un producto</h6>');
        $("#precio").prop('disabled', true);
        return;
    }
    if (cnt == "" || cnt == 0) {
        $("#preciosDisponibles").append('<h6 class="dropdown-header">Digite la cantidad</h6>');
        $("#precio").prop('disabled', true);
        return;
    }
    $("#precio").prop('disabled', false);

    //Coloco primero los precios al detalle
    $("#preciosDisponibles").append('<h6 class="dropdown-header">Detalle</h6>');
    $.each(producto.uom[uom].preciosTienda, function (i, item) {

        if (parseFloat(cnt) > parseFloat(item.desde)) {
            if (parseFloat(item.precio) < precioMasBajo) {
                precioMasBajo = parseFloat(item.precio);
            }
            $("#preciosDisponibles").append('<a class="dropdown-item" href="javascript:void;"  onclick="setPrecio(\'D\',' + i + ',' + item.precio + ' )" >' + item.precio + ' (>' + item.desde + ')' + '</a>');
        } else {
            $("#preciosDisponibles").append('<a class="dropdown-item disabled" style="color:gray;" >' + item.precio + ' (>' + item.desde + ')' + '</a>');
        }
    });
    if (cliente.clase == "M") {

        $("#preciosDisponibles").append('<div class="dropdown-divider"></div><h6 class="dropdown-header">Mayoreo</h6>');
        $.each(producto.uom[uom].precios, function (i, item) {
            if (parseFloat(cnt) > parseFloat(item.desde)) {
                if (parseFloat(item.precio) < precioMasBajo) {
                    precioMasBajo = parseFloat(item.precio);
                }
                $("#preciosDisponibles").append('<a class="dropdown-item" href="javascript:void;" onclick="setPrecio(\'M\',' + i + ',' + item.precio + ' )" >' + item.precio + ' (>' + item.desde + ')' + '</a>');
            } else {
                $("#preciosDisponibles").append('<a class="dropdown-item disabled" style="color:gray;" >' + item.precio + ' (>' + item.desde + ')' + '</a>');
            }
        });
    }
}

function setPrecio(tipo, i, precio) {
    var uom = $("#uom").val();
    $("#tipoPrecio").val(tipo);
    $("#idPrecio").val(i);
    $("#precio").val(precio);
}




function nuevoPedido(codigoCliente) {
    alerta("PENDIENTE");
}
function noVenta(codigoCliente) {

    goto("noventa.html");
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

