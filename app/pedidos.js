var productos = [];
var clientes = [];
var producto = null;
var pedido = {};
var cliente = {};
var precioMasBajo = 1000000;
var lineaActual = 0;
var surtido = [];
var modalShowed = false;
var estado ={};
$(document).ready(function () {
    estado = JSON.parse(getLS("estado"));
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
        pedido.uuid=getUuid();
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
            if (!areWeNear(cliente, 1)) {
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

    if (estado.cerrado) {
        $("#addLinea").removeClass("btn-primary");
        $("#addPedido").removeClass("btn-success");
        $(".btn-danger").removeClass("btn-danger");
    }


    listarProductos();
    $("#productos").click(function () {
        $("#modalProductos").modal('show');
        modalShowed = true;
        return false;
    });
    //Creando funcion que filtra los elemenots de los productos
    $("#buscadorProductos").on('input', function (e) {
        filtrarListado("buscadorProductos", "item-productos");
    });

    //Inicio colocando los modelos del pedido.
    $("#cliente").val(cliente.nombre);
    $("#nombreComercial").html(cliente.nombreComercial);

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
            var iUom = $("#uom").val();
            linea.producto = producto;
            linea.cantidad = parseFloat($("#cantidad").val());
            linea.insuficiente=false;
            linea.uuid=getUuid();
            if(linea.cantidad>parseFloat($("#existencia").val())){
                linea.insuficiente=true;
            }
            linea.uom = producto.uom[$("#uom").val()];
            linea.observacion = $("#observacionLinea").val();
            var tipoPrecio = $("#tipoPrecio").val();
            var idPrecio = parseInt($("#idPrecio").val());
            if (cliente.clase == "D") {
                linea.precio = producto.uom[$("#uom").val()].preciosTienda[idPrecio];
            } else {
                linea.precio = producto.uom[$("#uom").val()].precios[idPrecio];
            }
            linea.tipoPrecio = tipoPrecio;
            if (tipoPrecio == 'M') {
                linea.precio = producto.uom[$("#uom").val()].precios[idPrecio];
            } else {
                linea.precio = producto.uom[$("#uom").val()].preciosTienda[idPrecio];
            }
            linea.precio = parseFloat($("#precio").val());
            linea.total = round(linea.cantidad * linea.precio);
            linea.esRegalo = false;
            linea.padre = null;
            linea.tieneHijos = false;
            linea.cantidadHijos = 0;
            if (producto.hijos > 0) {
                var surtido = [];
                $(".cnt_surtido").each(function (i, item) {
                    if ($(item).val() != '') {
                        //Tiene valor hay que agregarlo
                        console.log(item);

                        var pos = $(item).attr("corr");
                        console.log(pos);
                        var cnt = $(item).val();
                        var surtLine = {};
                        surtLine.hijo = producto.surtido[pos];
                        surtLine.cnt = cnt;
                        //surtLine.uom=producto.hijos[pos].uom;
                        surtido.push(surtLine);
                    }
                });
                linea.surtido = surtido;
            }
            pedido.lineas.push(linea);

            var idLineaPadre = pedido.lineas.length - 1;
            var hijos = false;
            var cntHijos = 0;
            if (producto.promos.length > 0) {
                //Tiene promociones ahora veamos si logra llegar al minimo requerido

                $.each(producto.promos, function (i, item) {
                    var codi_medi_ori = producto.uom[$("#uom").val()].uom;
                    var codi_medi_dest = item.UOM_REQ;
                    var fact_conv = obtenerFactorConversion(producto, codi_medi_ori, codi_medi_dest);
                    //Calculos para saber si se ha llegado al minimo requerido
                    var cntLinea = linea.cantidad * producto.uom[$("#uom").val()].cnt;
                    var uomReq = obtenerUomProd(producto, item.UOM_REQ);
                    var cntReq = item.cnt_requerida * uomReq.cnt;
                    if (cntReq <= cntLinea) {
                        //Se puede agregar el producto pues cumplio el detalle
                        var lineaProm = {};

                        var prodPromo = getProducto(item.ARTICULO);
                        lineaProm.producto = prodPromo;

                        var cnt = (Math.floor(cntLinea / cntReq) * item.cnt_regalo);
                        lineaProm.cantidad = parseFloat(cnt);
                        var uom = 0;
                        for (var i = 0; i < prodPromo.uom.length; i++) {
                            if (prodPromo.uom[i].uom == item.CODI_MEDI) {
                                uom = i;
                            }
                        }
                        /*
                         if(fact_conv>1){
                         lineaProm.cantidad=lineaProm.cantidad*fact_conv;
                         }*/
                        lineaProm.uom = prodPromo.uom[uom];
                        lineaProm.observacion = $("#observacionLinea").val();
                        lineaProm.esRegalo = true;
                        lineaProm.padre = idLineaPadre;
                        lineaProm.precio = parseFloat(0);
                        lineaProm.total = round(0);
                        lineaProm.tieneHijos = false;
                        pedido.lineas.push(lineaProm);
                        hijos = true;
                        cntHijos++;
                    }
                });
                if (hijos) {
                    pedido.lineas[idLineaPadre].tieneHijos = true;
                    pedido.lineas[idLineaPadre].cantidadHijos = cntHijos;
                }
            }
            limpiarLinea();
            actualizarPedido();
        }
    });
    
    $("#addPedido").click(function () {
        if(pedido.lineas.length==0){
            alerta("No ha ingresado productos al pedido.");
        }else if(estado.abierto) {
            pedido.tipo = "PEDIDO";
            pedido.status = "LOCAL";
            pedido.observacion = $("#observacion").val();
            var pedidos = JSON.parse(getLS("pedidos"));
            if (pedidoExistente(cliente)) {
                var i = getPosicionPedido(cliente);
                pedidos[i]=pedido;
            } else {
                pedidos.push(pedido);
                var cvs = JSON.parse(getLS("clientesVisitados"));
                var cv = {};
                cv.codigoCliente = cliente.codigo;
                cv.tipo = "PEDIDO";
                cv.total=pedido.total;
                cv.tipoCliente=pedido.cliente.clase;
                cvs.push(cv);
                setLS("clientesVisitados", JSON.stringify(cvs));
            }
            setLS("pedidos", JSON.stringify(pedidos));
            alerta("Pedido Guardado con exito");
            setTimeout(function () {
                goto("dashboard.html");
            }, 2000);
        }else{
            alerta("El Dia ha sido cerrado no puede guardar nada mas");
        }
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
    var x=-1;
    for(var i=0; i<pedidos.length;i++) {
        var item=pedidos[i];
        if (clienteActual.codigo === item.cliente.codigo) {
            x= i;
        }
    }
    return x;
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
    $("#subtotalPrevio").html("");
    $("#existencia").val("");
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
        if (item.esRegalo) {
            var tr = $('<tr>').append(
                    $('<td>').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_ <i class='fas fa-gift'></i> " + item.producto.nombre)
                    );
            $(tr).append($('<td>').html(item.cantidad));
            $(tr).append($('<td>').html(item.precio));
            $(tr).append($('<td>').html(item.total));
            $("#productosAgregados tbody").append(tr);
        } else {
            var tr = $('<tr>').append(
                    $('<td>').html("<button type='button' onclick='deleteLine(" + i + ")' class='btn btn-danger'><i class='fa fa-minus' ></i></button> " + item.producto.nombre)
                    );
            $(tr).append($('<td>').html(item.cantidad));
            $(tr).append($('<td>').html(item.precio));
            $(tr).append($('<td>').html(item.total));
            $("#productosAgregados tbody").append(tr);
        }

    });

}

function deleteLine(pos) {

    if(estado.cerrado){
        alerta("El dia ha sido cerrado");
        return false;
    }
    var msg = "";
    if (pedido.lineas[pos].tieneHijos) {
        msg = ". Esta linea contiene promociones, estas tambien se eliminarán";
    }
    if (confirm("Desea eliminar esta linea" + msg)) {
        pedido.lineas.splice(pos, 1 + pedido.lineas[pos].cantidadHijos);
        actualizarPedido();
    }
}

function validarLinea() {
    if(estado.abierto==false){
        alerta("El dia ha sido cerrado");
        return false;
    }
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
    //Comienza validacion de productos del tipo surtido

    if (producto.hijos > 0) {
        var cnt_must_have = producto.uom[$("#uom").val()].cnt * parseFloat($("#cantidad").val());
        var cnt_current = 0;
        $(".cnt_surtido").each(function (i, item) {
            if ($(item).val() != '') {
                var pos = $(item).attr("corr");
                var cnt = parseFloat($(item).val());
                var pHijo = getProducto(producto.surtido[pos].codigoProducto);
                //Este es el i del uom del producto hijo con corr pos.
                var iUomHijo = $(".uomHijo[corr='" + pos + "']").val();
                if (pHijo.uom[iUomHijo].cnt > 1) {
                    //Solo lo tengo que multiplicar en el caso que no sea unidad
                    cnt = cnt * pHijo.uom[iUomHijo].cnt;
                }
                cnt_current += cnt;
            }
        });
        if (cnt_must_have != cnt_current) {
            alerta("Las cantidades ingresadas en el surtido, no equivalen a la unidad de medida y cantidad seleccionada en el producto. Se necesitan: " + cnt_must_have + " unidades del producto. Actualmente posee: " + cnt_current);
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
    $(".item-productos").css("display", "none");
}

function listarProductos() {
    $.each(productos, function (i, item) {
        if (item.esHijo == 0) {
            if (item.hijos > 0) {
                $("#listadoProductos").append('<a href="#" onclick="setProducto(' + i + ')" class="list-group-item  list-group-item-action item-productos" style="display:none" >' + item.codigo + ' - ' + item.nombre + ' <i class="fas fa-list"></i></a>');
            } else {
                $("#listadoProductos").append('<a href="#" onclick="setProducto(' + i + ')" class="list-group-item list-group-item-action item-productos" style="display:none" >' + item.codigo + ' - ' + item.nombre + '</a>');
            }
        }
    });
}

function setProducto(pos) {
    producto = productos[pos];
    $("#productos").empty();
    $("#productos").append("<option value='" + pos + "'>" + producto.codigo + ' - ' + producto.nombre + "</option>");
    $("#modalProductos").modal('hide');
    modalShowed = false;
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
    //Añadiendo validacion para surtidos preelaborados
    if (producto.hijos > 0) {
        console.log("producto tiene hijos");

        var prods = getProductosHijos(producto);
        $("#productosHijos tbody").empty();
        $.each(prods, function (i, item) {
            var tr = $('<tr>').append(
                    $('<td>').html(item.abrev)
                    );
            var select = '<select class="form-control uomHijo"  corr="' + i + '">';
            $.each(item.uom, function (j, uom) {
                if (uom.uom == item.codi_medi) {
                    select += "<option value='" + j + "'>" + uom.nombre + "</option>";
                }
            });
            select += "</select>"
            $(tr).append($('<td>').html(select));
            $(tr).append($('<td>').html('<input type="number" class="form-control cnt_surtido" corr="' + i + '" >'));


            $("#productosHijos tbody").append(tr);
        });
        $("#divProductosHijos").show();
    } else {
        $("#productosHijos tbody").empty();
        $("#divProductosHijos").hide();
    }
    var existencia=getExistencia(producto);
    $("#existencia").val(existencia);
}

function getExistencia(producto){
    var lista = JSON.parse(getLS("Price"));
    var existencia = 0;
    $.each(lista, function (i, item) {
        if(item.Codigo==producto.codigo){
            existencia=parseFloat(item.Existencias).toFixed(2);
        }
    });
    return existencia;
}

function getProductosHijos(producto) {
    var prods = [];
    $.each(producto.surtido, function (i, item) {
        var p = getProducto(item.codigoProducto);
        if (p != null) {
            p.codi_medi = item.uom;
            prods.push(p);
        }
    });
    return prods;
}

function getProducto(codigo) {
    for (var i = 0; i < productos.length; i++) {
        var p = productos[i];
        if (p.codigo == codigo) {
            return p;
        }
    }
    return null;
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
    if (cliente.clase == "D") {
        //Coloco primero los precios al detalle
        $("#preciosDisponibles").append('<h6 class="dropdown-header">Detalle</h6>');
        $.each(producto.uom[uom].preciosTienda, function (i, item) {

            if (parseFloat(cnt) > parseFloat(item.desde)) { //&& parseFloat(cnt) < parseFloat(item.hasta)
                if (parseFloat(item.precio) < precioMasBajo) {
                    precioMasBajo = parseFloat(item.precio);
                }
                $("#preciosDisponibles").append('<a class="dropdown-item" href="javascript:void;"  onclick="setPrecio(\''+item.tipo+'\',' + i + ',' + item.precio + ' )" >$' + item.precio +' ('+item.tipo+')'+ '</a>');
            } else {
                //$("#preciosDisponibles").append('<a class="dropdown-item disabled" style="color:gray;" >' + item.precio + ' (>' + item.desde + ')' + '</a>');
            }
        });
    } else {
        $("#preciosDisponibles").append('<div class="dropdown-divider"></div><h6 class="dropdown-header">Mayoreo</h6>');
        $.each(producto.uom[uom].precios, function (i, item) {
            if (parseFloat(cnt) > parseFloat(item.desde)) { // && parseFloat(cnt) < parseFloat(item.hasta)
                if (parseFloat(item.precio) < precioMasBajo) {
                    precioMasBajo = parseFloat(item.precio);
                }
                $("#preciosDisponibles").append('<a class="dropdown-item" href="javascript:void;" onclick="setPrecio(\''+item.tipo+'\',' + i + ',' + item.precio + ' )" >$' + item.precio +' ('+item.tipo+')'+ '</a>');
            } else {
                //$("#preciosDisponibles").append('<a class="dropdown-item disabled" style="color:gray;" >' + item.precio + ' (>' + item.desde + ')' + '</a>');
            }
        });
    }




}

function setPrecio(tipo, i, precio) {
    var uom = $("#uom").val();
    $("#tipoPrecio").val(tipo);
    $("#idPrecio").val(i);
    $("#precio").val(precio);
    
    var cnt=parseFloat($("#cantidad").val());
    var prec=parseFloat(precio);
    $("#subtotalPrevio").html(" $ "+round(cnt*precio));
}


function obtenerFactorConversion(producto, codi_medi_ori, codi_medi_dest) {
    if (codi_medi_ori == codi_medi_dest) {
        return 1;
    }
    var uom_ori = null;
    var uom_dest = null;

    $.each(producto.uom, function (i, item) {
        if (item.uom == codi_medi_ori) {
            uom_ori = item;
        }
        if (item.uom == codi_medi_dest) {
            uom_dest = item;
        }
    });
    if (uom_ori != null && uom_dest != null) {
        if (uom_dest.cnt == 1) {
            return uom_ori.cnt;
        } else {
            //En realidad solo habria que hacer esto.
            return uom_ori.cnt / uom_dest.cnt;
        }
    } else {
        return 1;
    }
}

function obtenerUomProd(producto, codi_medi) {
    var ret = null;
    $.each(producto.uom, function (i, item) {
        if (item.uom == codi_medi) {
            ret = item;
        }
    });
    return ret;
}

function getLowestUomProd(producto) {
    var ret = null;
    $.each(producto.uom, function (i, item) {
        if (item.cnt == 1) {
            ret = item;
        }
    });
    return ret;
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown(e) {
    if (modalShowed) {
        $("#modalProductos").modal('hide');
        modalShowed = false;
        e.preventDefault();
        return false;
    }else{
        throw new Error('Exit');
    }
}