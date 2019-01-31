$(document).ready(function() {
    var clientesPendientes=getClientesPendientes();
    crearTablaPendientes(clientesPendientes);
    generarGrafico();
    toDataTable("#clientesPendientes");
    
});


function getClientesPendientes(){
    var clientesVisitados=JSON.parse(getLS("clientesVisitados"));
    var clientesDia=JSON.parse(getLS("Rutas"));
    
    for(var i=0;i<clientesVisitados.length;i++){
        var cv=clientesVisitados[i];
        var codigoCliente=cv.codigoCliente;
        for(var j=0;j<clientesDia.length;j++){
            var cd=clientesDia[j];
            if(cd.codigoCliente==codigoCliente){
                clientesDia.splice(j);
                j=clientesDia.length;
            }
        }
    }
    return clientesDia;
}

function crearTablaPendientes(clientesPendientes){
    $.each(clientesPendientes, function(i, item) {
     
            var tr = $('<tr>').append(
            $('<td>').html("<strong>"+item.cliente+"</strong>")
            );
            $(tr).append($('<td>').html('<button class="btn btn-success" onclick="nuevoPedido(\''+item.codigoCliente+'\')"><i class="fas fa-fw fa-cart-plus"></i> Pedido</button>'));
            $(tr).append($('<td>').html('<button class="btn btn-danger" onclick="noVenta(\''+item.codigoCliente+'\')" ><i class="fas fa-fw fa-ban"></i> No Venta</button>'));
            
         $("#clientesPendientes tbody").append(tr);
     
    });
}

function nuevoPedido(codigoCliente){
    alerta("PENDIENTE");
}
function noVenta(codigoCliente){
    setLS("cliente",codigoCliente);
    goto("noventa.html");
}

function generarGrafico(){
    var clientesDia=JSON.parse(getLS("Rutas"));
    var cntClientesPedido=0;
    var cntClientesNoVenta=0;
    var clientesPendientes=clientesDia.length;
    var clientesVisitados=JSON.parse(getLS("clientesVisitados"));
    
    if(clientesVisitados.length>0){
        for(var i=0;i<clientesVisitados.length;i++){
            var cv=clientesVisitados[i];
            if(cv.tipo=="PEDIDO"){
                cntClientesPedido++;
            }else{
                cntClientesNoVenta++;
            }
        }
        clientesPendientes=clientesPendientes-cntClientesPedido-cntClientesNoVenta;
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
          backgroundColor: ['#007bff',  '#28a745','#dc3545'],
        }],
      },
    });

}

