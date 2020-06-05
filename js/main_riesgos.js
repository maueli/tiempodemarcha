$(document).ready(function(){

  probabilidad = new Array();
  tiempo = new Array();
  daño = new Array();
  texto = new Array();
  var contador=0;
  colorete = new Array();
  tamaño = new Array();

  $("#nuevo").click(function(){
    contador=contador+1;
    $("#riesgo").val("");
    $("#probabilidad").val("0");
    $("#tiempo").val("0");
    $("#daño").val("0");
  });



  $("#boton").click(function(){

    texto[contador] = $("#riesgo").val();
    probabilidad[contador] = $("#probabilidad").val();
    tiempo[contador] = $("#tiempo").val();
    daño[contador] = $("#daño").val();
    var colores = Math.pow(probabilidad[contador],2)+Math.pow(daño[contador],2)+Math.pow(tiempo[contador],2);


    if (colores <= 30){
      colorete[contador] = 0;
      tamaño[contador] = 10;
    }
    else if (colores <= 60){
      colorete[contador] = 1;
      tamaño[contador] = 20;
    }
    else if (colores <= 90){
      colorete[contador] = 2;
      tamaño[contador] = 30;
    }
    else if (colores <= 120){
      colorete[contador] = 3;
      tamaño[contador] = 40;
    }
    else if (colores <= 150){
      colorete[contador] = 4;
      tamaño[contador] = 50;
    }
    else if (colores <= 180){
      colorete[contador] = 7;
      tamaño[contador] = 60;
    }
    else if (colores <= 210){
      colorete[contador] = 8;
      tamaño[contador] = 70;
    }
    else if (colores <= 240){
      colorete[contador] = 9;
      tamaño[contador] = 80;
    }
    else if (colores <= 270){
      colorete[contador] = 10;
      tamaño[contador] = 90;
    }
    else{
      colorete[contador] = 10;
      tamaño[contador] = 100;
    };


    Plotly.d3.csv('',
    function(){
        var trace = {
            x:probabilidad,
            y:tiempo,
            z:daño,
            text: texto,
            hoverinfo: 'text',
          	mode: 'markers+text',
            surfacecolor:"#7CFC00",
          	marker: {
          		symbol: 'circle',
          		opacity: 0.8,
              showscale:true,
              size:tamaño,
              /*
              size: [10, 100, 15, 17, 19, 17, 26, 21, 21, 27, 21, 16, 27, 14, 29,
                22, 16, 28, 27, 25],*/
              cmax: 10,
              cmin: 0,
              color: colorete,
              colorbar:{
                  x:0,
                  thickness:50,
                  tickmode:"auto",
                  ntick:20
                },
                  colorscale:[ ['0.0', '#00FF09'],
                  ['0.111111111111', '9AFF00'],
                  ['0.222222222222', 'DEFF00'],
                  ['0.333333333333', 'EFFF00'],
                  ['0.444444444444', 'FFF700'],
                  ['0.555555555556', 'FFDE00'],
                  ['0.666666666667', 'FFCD00'],
                  ['0.777777777778', 'FF9A00'],
                  ['0.888888888889', 'FF6F00'],
                  ['1.0', 'FF0000']
                ],
              },
          	type: 'scatter3d'
          };


          var data = [trace];
          var layout = {
            margin: {
          	l: 0,
          	r: 0,
          	b: 0,
          	t: 0
          },
          scene:{
          	 aspectmode: "manual",
             aspectratio: {
               x: 1, y: 1, z: 1,
              },
             xaxis: {
              nticks: 20,
              range: [0, 10],
              title: "Probabilidad",
              titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: 'red'
              },
              backgroundcolor: "rgb(200, 200, 230)",
           	  gridcolor: "rgb(255, 255, 255)",
           	  showbackground: true,
           	  zerolinecolor: "rgb(0, 0, 0)",
              zerolinewidth:10
            },
             yaxis: {
               nticks: 20,
               range: [0, 10],
               title: "Tiempo de exposición",
               titlefont: {
                 family: 'Arial, sans-serif',
                 size: 18,
                 color: 'red'
               },
               backgroundcolor: "rgb(230, 200,230)",
               gridcolor: "rgb(255, 255, 255)",
               showbackground: true,
               zerolinecolor: "rgb(0, 0, 0)",
               zerolinewidth:10
            },
             zaxis: {
               nticks: 20,
               range: [0, 10],
               title: "Daño Posible",
               titlefont: {
                 family: 'Arial, sans-serif',
                 size: 18,
                 color: 'red'
               },
               backgroundcolor: "rgb(230, 230,200)",
               gridcolor: "rgb(255, 255, 255)",
               showbackground: true,
               zerolinecolor: "rgb(0, 0, 0)",
               zerolinewidth:10
            }},
          };
          Plotly.newPlot('tester', data, layout);
        });
  });
});
