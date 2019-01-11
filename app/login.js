$(function(){
    //Validando si existe informacion de usuario
    if(isJsonString(getLS("usuario"))){
        //Existe algo en el valor del usuario asi que nos saltamos a pedidos
        goto("dashboard.html");
    }
    $("#btnIngresar").click(function(){
       cargarUsuario();
    });
    
});

function cargarUsuario(){
    if($("#password").val()=="" || $("#user").val()=="" ){
        alerta('Por favor ingrese su usuario y contraseña');
    }else{
        var hash = CryptoJS.MD5($("#password").val());
        var user = $("#user").val().toLowerCase();
        $.get( APP.url+"login.php?user="+user+"&pass="+hash, function( data ) {
            var usuario=data;
            if(usuario.length>0){
                window.localStorage.setItem("usuario",JSON.stringify(usuario[0]));
                goto("dashboard.html");
            }else{
             alerta('El usuario o la contraseña son incorrectos.');
            }
          });
    }   
}