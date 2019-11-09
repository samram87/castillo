var productos = [];
var lista = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
var modalShowed = false;
$(document).ready(function() {

    lista = JSON.parse(getLS("Price"));

    $("#buscarPrecio").click(function() {
        var filter = $("#producto").val().trim();
        if (filter.length <= 3) {
            alerta("Por favor ingrese mas caracteres para buscar el producto");
        } else {
            buscarProducto(filter);
        }
    });
    $("#refrescar").click(function() {
       alerta("Actualizando Existencias y Precios...");
        $.get(APP.url + "dal/getListaPrecios.php", function(data) {
            setLS("Price", data);
            lista = JSON.parse(getLS("Price"));
            alerta("Actualizacion Exitosa");
        });
    });
});


function toNumero(text, round) {
    return redondear(parseFloat(text), round);
}

function redondear(num, round) {
    return Math.round(parseFloat(num) * Math.pow(10, round)) / Math.pow(10, round);
}

function buscarProducto(filter) {
    $("#resultadoProductos tbody").empty();
    productos = getProductos(filter);

    $.each(productos, function(i, item) {

        var tr = $('<tr>').append(
            $('<td>').html("<strong>Codigo: </strong>" + item.Codigo + "<br>" +
                "<strong>Producto: </strong>" + item.Producto + "<br>" +
                "<strong>Marca: </strong>" + item.Marca + "<br>" +
                "<strong>Existencias: </strong>" + toNumero(item.Existencias, 2) + "<br>" +
                '<button class="btn btn-success" onclick="mostrarListaPrecios(\'' + item.Codigo + '\')"><i class="fas fa-fw fa-list"></i> Escala Precios</button>')
            /*
                "<strong>Proveedor: </strong>" + item.Proveedor + "<br>" +
                "<strong>Precio " + item.UnidadMediMenor + ": </strong>" + toNumero(item.PrecioUnidad, 4) + "<br>" +
                "<strong>Precio " + item.UnidadMediMayor + ": </strong>" + toNumero(item.PrecioMayoreo, 4) + "<br>" +
            
            */

        );

        $("#resultadoProductos tbody").append(tr);

    });
}

function getProductos(filter) {
    var productos = [];
    var val = filter.toUpperCase();
    val = ".*" + val.replace(" ", ".*") + ".*";
    var re = new RegExp(val, "g");
    $.each(lista, function(i, item) {
        if (item.Codigo.toUpperCase().match(re) || item.Producto.toUpperCase().match(re) || item.Marca.toUpperCase().match(re)) {
            productos.push(item);
        }
    });

    return productos;
}

function mostrarListaPrecios(codigo) {
    var prod = getProducto(codigo);
    $("#productName").html(prod.codigo + " / " + prod.nombre);
    $("#listaPreciosTienda tbody").empty();
    $("#listaPreciosMayoreo tbody").empty();
    $.each(prod.uom, function(i, item) {
        var tr = $('<tr>').append($('<td colspan="3">').html("<strong>" + item.nombre + "</strong>"));
        $("#listaPreciosTienda tbody").append(tr);
        var tr2 = $('<tr>').append($('<td colspan="3">').html("<strong>" + item.nombre + "</strong>"));
        $("#listaPreciosMayoreo tbody").append(tr2);
        $.each(item.preciosTienda, function(i, precio) {
            var tr = $('<tr>').append($('<td >').html(toNumero(precio.desde, 0)));
            $(tr).append($("<td>").html(toNumero(precio.hasta, 0)));
            $(tr).append($("<td>").html(toNumero(precio.precio, 4)));
            $("#listaPreciosTienda tbody").append(tr);
        });
        $.each(item.precios, function(i, precio) {
            var tr = $('<tr>').append($('<td >').html(toNumero(precio.desde, 0)));
            $(tr).append($("<td>").html(toNumero(precio.hasta, 0)));
            $(tr).append($("<td>").html(toNumero(precio.precio, 4)));
            $("#listaPreciosMayoreo tbody").append(tr);
        });
    });
    modalShowed = true;
    $("#modalPrecios").modal('show');
    
}


function getProducto(codigo) {
    var prods = JSON.parse(getLS("Productos"));

    for (var i = 0; i < prods.length; i++) {
        var p = prods[i];
        if (p.codigo == codigo) {
            return p;
        }
    }
    return null;
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(e) {
    if (modalShowed) {
        $("#modalPrecios").modal('hide');
        modalShowed = false;
        e.preventDefault();
        return false;
    } else {
        throw new Error('Exit');
    }
}