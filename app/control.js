/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function cargarUsuario(){
    if($("#password").val()=="" || $("#user").val()=="" ){
        alerta('Por favor ingrese su usuario y contraseña');
    }else{
        var hash = CryptoJS.MD5($("#password").val());
        var usuarios=JSON.parse(window.localStorage.getItem("usuarios"));
        var encontrado=false;
        $.each(usuarios, function(i, item) {
            if(item.usuario===$("#user").val()){
                if(item.password==hash){
                    window.localStorage.setItem("usuario",JSON.stringify(item));
                    encontrado=true;
                }
            }
        });
        if(encontrado){
            var usuario=JSON.parse(window.localStorage.getItem("usuario"));
            cargarInfoUser();
            $("#login").hide(500,function(){
                $("#main").show(500);
            });
        }else{
             alert('El usuario o la contraseña son incorrectos.');
        }
    }   
}

