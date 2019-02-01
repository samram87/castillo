var productos = [];
var clientes = [];
var producto = null;
var pedido = {};
var cliente = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
var surtido=[];
$(document).ready(function () {
    productos = JSON.parse(getLS("Productos"));
    clientes = JSON.parse(getLS("Clientes"));
    cliente = getClienteActual();
    if (pedidoExistente(cliente)) {
        pedido = getPedido(cliente);
        actualizarPedido();
        $("#observacion").val(pedido.observacion);
    } else {
        pedido.cliente = cliente;
        pedido.lineas = [];
        pedido.total = 0;
        pedido.items = 0;
        pedido.totalLineas = 0;
        pedido.observacion = "";
    }
    if (cliente.LATITUD == "") {
        $("#alertaGPS").show();
        setTimeout(function () {
            pedido.cliente.LATITUD = APP.latitud;
            pedido.cliente.LONGITUD = APP.longitud;
            pedido.latitud = APP.latitud;
            pedido.longitud = APP.longitud;
        }, 2000);
    } else {
        setTimeout(function () {
            if (!areWeNear(cliente, 0.5)) {
                alerta("Se encuentra muy alejado de la ubicación del cliente. Por favor acerquese más.");
                setTimeout(function () {
                    goto("dashboard.html");
                }, 2000);
            } else {
                //Guardamos en el pedido la lat,long desde donde se guardo
                pedido.latitud = APP.latitud;
                pedido.longitud = APP.longitud;
            }
        }, 2000);
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
        $("#precio").val("");
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
            linea.uom = producto.uom[$("#uom").val()];
            linea.observacion = $("#observacionLinea").val();
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

    $("#addPedido").click(function () {
        pedido.tipo = "PEDIDO";
        pedido.status = "LOCAL";
        pedido.observacion = $("#observacion").val();
        var pedidos = JSON.parse(getLS("pedidos"));
        if (pedidoExistente(cliente)) {
            var i = getPosicionPedido(cliente);
            pedidos.splice(i, 1, pedido);
        } else {
            pedidos.push(pedido);
            var cvs = JSON.parse(getLS("clientesVisitados"));
            var cv = {};
            cv.codigoCliente = cliente.codigo;
            cv.tipo = "PEDIDO";
            cvs.push(cv);
            setLS("clientesVisitados", JSON.stringify(cvs));
        }
        setLS("pedidos", JSON.stringify(pedidos));
        alerta("Pedido Guardado con exito");
        setTimeout(function () {
            goto("dashboard.html");
        }, 2000);
    });

});

function pedidoExistente(clienteActual) {
    var pedidos = JSON.parse(getLS("pedidos"));
    var found = false;
    $.each(pedidos, function (i, item) {
        if (clienteActual.codigo == item.cliente.codigo) {
            found = true;
        }
    });
    return found;
}

function getPedido(clienteActual) {
    var pedidos = JSON.parse(getLS("pedidos"));
    var p = null;
    $.each(pedidos, function (i, item) {
        if (clienteActual.codigo == item.cliente.codigo) {
            p = item;
        }
    });
    return p;
}

function getPosicionPedido(clienteActual) {
    var pedidos = JSON.parse(getLS("pedidos"));
    $.each(pedidos, function (i, item) {
        if (clienteActual.codigo == item.cliente.codigo) {
            return i;
        }
    });
    return -1;
}

function limpiarLinea() {
    $("#tipoPrecio").val("");
    $("#observacionLinea").val("");
    $("#idPrecio").val("");
    $("#precio").val("");
    $("#cantidad").val("");
    $("#uom").empty();
    $("#productos").empty();
    $("#productosHijos tbody").empty();
    $("#divProductosHijos").hide();
    producto = null;
    updatePrecio();
    precioMasBajo = 1000000;
}


function actualizarPedido() {
    pedido.total = 0;
    pedido.items = 0;
    pedido.totalLineas = pedido.lineas.length;
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
        pedido.lineas.splice(pos, 1);
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
        if(item.hijos>0){
            $("#listadoProductos").append('<a href="#" onclick="setProducto(' + i + ')" class="list-group-item  list-group-item-action item-productos" >' + item.codigo + ' - ' + item.nombre + ' <i class="fas fa-list"></i></a>');
        }else{
            $("#listadoProductos").append('<a href="#" onclick="setProducto(' + i + ')" class="list-group-item list-group-item-action item-productos" >' + item.codigo + ' - ' + item.nombre + '</a>');
        }
        
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
    if (producto.hijos > 0) {
        console.log("producto tiene hijos");

        var prods = getProductosHijos(producto.codigo);
        $("#productosHijos tbody").empty();
        $.each(prods, function (i, item) {
            var tr = $('<tr>').append(
                    $('<td>').html(item.nombre)
                    );
            var select='<select class="form-control" id="uom" corr="'+i+'">';
            $.each(item.uom, function (j, uom) {
                select+="<option value='" + j + "'>" + uom.nombre + "</option>";
            });
            select +="</select>"
            $(tr).append($('<td>').html(select));
            $(tr).append($('<td>').html('<input type="number" class="form-control cnt_surtido" corr="'+i+'" >'));


            $("#productosHijos tbody").append(tr);
        });
        $("#divProductosHijos").show();
    }else{
        $("#productosHijos tbody").empty();
        $("#divProductosHijos").hide();
    }
}

function getProductosHijos(codigo_padre) {
    var prods = [];
    $.each(productos, function (i, item) {
        if (item.padre == codigo_padre) {
            prods.push(item);
        }
    });
    return prods;
}

function updatePrecio() {
    precioMasBajo = 1000000;
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