$(function() {
    //Validando si existe informacion de usuario
    if (isJsonString(getLS("usuario"))) {
        //Existe algo en el valor del usuario asi que nos saltamos a pedidos
        goto("dashboard.html");
    }
    $("#btnIngresar").click(function() {
        cargarUsuario();
    });

});

function cargarUsuario() {
    if ($("#password").val() == "" || $("#user").val() == "") {
        alerta('Por favor ingrese su usuario y contraseña');
    } else {
        var hash = CryptoJS.MD5($("#password").val());
        var user = $("#user").val().toLowerCase();
        $.get(APP.url + "login.php?user=" + user + "&pass=" + hash+"&version=1.0", function(data) {
            var usuario = data;
            if (usuario.length > 0) {
                window.localStorage.setItem("usuario", JSON.stringify(usuario[0]));
                sincronizarDatos(usuario[0].idUsuario);
            } else {
                alerta('El usuario o la contraseña son incorrectos. (Verifique que posee la ultima version de la aplicacion)');
            }
        });
    }
}
var allDataSync = false;
var priceListSync = false;

function sincronizarDatos() {
    var idUser = getIdUsuario();
    var fecha = getFecha();
    $.get(APP.url + "dal/getListaPrecios.php", function(data) {
        setLS("Price", data);
        priceListSync = true;
    });
    $("#modalLoadingText").html("Cargando Productos...");
    $("#loadingModal").modal('show');
    $.get(APP.url + "dal/getProductos.php", function(data) {
        setLS("Productos", data);
        $("#modalLoadingText").html("Cargando Clientes...");
        $.get(APP.url + "dal/getClientes.php?idUser=" + idUser, function(data) {
            setLS("Clientes", data);
            $("#modalLoadingText").html("Cargando Rutas del día...");
            $.get(APP.url + "dal/getRutas.php?idUser=" + idUser, function(data) {
                setLS("Rutas", data);
                $("#modalLoadingText").html("Cargando Precios y Existencias...");
                setInterval(function() {
                    if (priceListSync) {
                        var estado = {};
                        estado.abierto = true;
                        estado.cerrado = false;
                        var d=getLS("last_date");
                        if(d==null){
                            setLS("pedidos", JSON.stringify([]));
                            setLS("last_date",getToday());
                        }else{

                            if(d!=getToday()){
                                setLS("pedidos", JSON.stringify([]));
                                setLS("last_date",getToday());
                            }
                        }
                        setLS("estado", JSON.stringify(estado));
                        setLS("clientesVisitados", JSON.stringify([]));
                        setLS("fechaActualizacion", fecha);
                        goto("dashboard.html");
                    }
                }, 500);
            });
        });
    });
}

function getToday(){
    var d=new Date();
    return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
}