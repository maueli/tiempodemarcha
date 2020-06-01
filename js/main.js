$(document).ready(function(){
  var dias;
  var grupotipo;
  var pendiente;
  var tiempotramo1;
  var tramos;
  var resultado = new Array(100);
  for(i=0; i<=99;i++){
    resultado[i]= new Array(2);
  };
  var resultadograf;
  var contador=0;
  var resultadodo = new Array(100).fill("0");
  var resultadodo2 = new Array();

  $("#grupo-tipo").on("input",function(){
    var grupo = $("#grupo-tipo").val();
    if(grupo=="rapido"){
      grupotipo = [4,400];
    };
    if(grupo=="normal"){
      grupotipo = [3,300];
    };
    if(grupo=="lento"){
      grupotipo = [2,200];
    };
  });


  $("#btn-dias").click(function(){
    $(".tramos-afuera").show();
    dias = $("#dias").val();
    for(i=1; i<=10;i++){
      $("#dia"+i+" ").hide();
    };

/*    for (i=1; i<=dias;i++){
      $("<p>Día "+i+"</p> Cantidad de Tramos <input id='tramos' type='number' min='1' max='10' step='1'>").appendTo("#cuadro");
      $(".tramo1").appendTo("#holala");
    };
    */
    for(i=1; i<=dias;i++){
      $("#dia"+i+" ").show();
    };
  });


  $(".btn-tramos").click(function(){
    for(i=1; i<=20;i++){
      $(this).siblings().children().children().children(".tramo"+i+" ").hide();
    };
    tramos = $(".owl-item.active").children(".tramos-input").val();
    /* alert(tramos); */
    for(i=1; i<=tramos;i++){
      $(this).siblings().children().children().children(".tramo"+i+" ").show();
    };
  });


  $(".tramo").on("input",".pend",function(){
    pendiente = $(this).val();
    if(pendiente=="plano"){
      $(this).parents().siblings(".altitud").hide();
    }
    else{
      $(this).parents().siblings(".altitud").show();
    };
  });

  $(".tramo").ready(function(){

    $(".btn-velpers").click(function(){
      $(this).hide();
      $(this).siblings(".vel-dist2").show();
      $(this).siblings(".vel-alt2").show();
      $(this).parents(".velocidad").addClass("velocidad2");
    });
      $(".btn-tiempo").click(function(){
        var distancia = $(this).siblings(".distancia").children().children(".distancia-kms").val();
        var altitud;
        var tdist;
        var talt;
        if(pendiente=="plano"){
          altitud=0;
        }
        else{
          altitud = $(this).siblings(".altitud").children().children(".altitud-m").val();
        };

        tdist = distancia/grupotipo[0];
        talt = altitud/grupotipo[1];

        var grupotipopers=[0,0];

        if($(this).siblings(".velocidad").children(".vel-dist2").is(":visible")){
          grupotipopers[0]=$(this).siblings(".velocidad").children(".vel-dist2").children(".vel-dist").val();
          tdist = distancia/grupotipopers[0];
        }
        if($(this).siblings(".velocidad").children(".vel-alt2").is(":visible")){
          grupotipopers[1]=$(this).siblings(".velocidad").children(".vel-alt2").children(".vel-alt").val();
          talt = altitud/grupotipopers[1];
        }

        /* alert(distancia+" "+altitud +" "+grupotipo); */

        if (tdist > talt){
          tiempotramo1 = (tdist +talt/2).toFixed(2)
        }
        else{
          tiempotramo1 = (tdist/2 +talt).toFixed(2)
        };
        if(pendiente=="descenso"){
          tiempotramo1=(tiempotramo1/2).toFixed(2)
        };
        /*alert(pendiente);*/

        var tiempotramo2 = Math.floor(tiempotramo1);
        var tiempotramo3 = Math.round(( tiempotramo1 - Math.floor(tiempotramo1) )*60 ) ;

        if(tiempotramo3==0){
          tiempotramo3 = "00";
        };

        alert("En este tramo serán "+tiempotramo2+ ":"+tiempotramo3+"hs");
        $(this).siblings(".tiempo").text("En este tramo serán "+tiempotramo2+ ":"+tiempotramo3+"hs");



        var diabarra = $(this).parents().parents().parents().parents().parents(".dia").attr("data-panel");
        var tramobarra = $(this).parents(".tramo").attr("data-panel");
        $(".barra-dias"+diabarra+" ").children(".barra-tramoss"+diabarra+" ").children().children(".barra-tramtram"+tramobarra  +" ").text(tiempotramo2+ ":"+tiempotramo3+"hs");


        /* resultado[diabarra][tramobarra] = tiempotramo1; */

        resultadodo[contador]= tiempotramo1;

        contador = contador+1;


      });

  });

var diasbar;

/* BARRA - DIAS */
  $(document).on("input","#dias",function(){
    diasbar = $("#dias").val();
    var barraancho = 100/diasbar;
    $(".barra-dias").remove();
    for (i=1; i<=diasbar;i++){
      $("<div class='barra-dias'> <div class='barra-dias"+i+" '> Día "+i+" </div> </div>").appendTo("#barra");
    };
    $(".barra-dias").css("width",barraancho +"%");
  });

  $(".btn-tramos").click(function(){
    var tramosbar = $(this).siblings(".tramos-input").val();
    var barraanchotramos = 100/tramosbar;
    var numdia = $(this).parents(".dia").attr("data-panel");
    $(".barra-tramoss"+numdia+" ").remove();

    $("<div class='barra-tramoss"+numdia+" '> </div>").appendTo(".barra-dias"+numdia+" ");
      for (i=1; i<=tramosbar;i++){
        $("<div class='barra-tramos1'> Tramo "+i+"<div class='barra-tramtram"+i+" '> </div></div>").appendTo(".barra-tramoss"+numdia+" ");
      };
/* <div class='barra-tiempo"+j+i+"'></div> */

    $(".barra-dias"+numdia+" ").children().children(".barra-tramos1").css("width",barraanchotramos +"%");
  });


  $(".resumen").click(function(){
    $(".barra").addClass("barra-altura");
    $(".barra-esconder").show();
    $(".demo-container").show();
    $("#barra").hide();


    for (i=0; i<100;i++){
      if(resultadodo[i]!=0){
        resultadodo2[i]=resultadodo[i];
      };
    };

    for (i=1; i<=resultadodo2.length ;i++){
      resultado[i][0]=i;
      resultado[i][1]=resultadodo2[i-1];
    };
  });

  /* $(".barra").click(function(){
    $(".barra").removeClass("barra-altura");
    $(".barra-esconder").hide();
    $(".demo-container").hide();
    $("#barra").show();
  });
*/

  $(".barra-esconder").click(function(){
    $(".barra").removeClass("barra-altura");
    $(".barra-esconder").hide();
    $(".demo-container").hide();
    $("#barra").show();
  });






  $(".resumen").click(function(){
    $(function() {
      $.plot("#placeholder", [{
        data: resultado,
        yaxis: 1,
        xaxis:1,
        points: {show:true},
        lines: {show:true},
        label:"Tiempo de Marcha",
      }],{
        xaxes: [{
          show:true,
          position:"bottom",
          tickDecimals: 0,
          min:1
        }],
        yaxes: [{
          show:true,
          tickSize:0.5,
          min:0
        }]
        }
      );
    });
  });






});












$(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100 ) {
			$(".menu").addClass("fondo")  ;
        }
		else {$(".menu").removeClass("fondo")}
    });
});
