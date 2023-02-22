
let perguntasFeitas = [];

// Perguntas do jogo

const perguntas = [
  //Pergunta 0
  {pergunta: "Qual é o maior animal do mundo ?",
   respostas: ["Leão","Girafa","Baleia-Azul","Golfinho"],
   correta: "resp2"
  },
  //Pergunta 1
  {pergunta: "Quem compôs a canção Imagine ?",
   respostas: ["John Lennon, Paul MacArtney, George Harrison e Ringo Starr.","Paul MacArtney","Ringo Starr","John Lennon"],
   correta: "resp1"
  },
  //Pergunta 2
   {pergunta: "Em que lugar vivem mais cangurus do que pessoas ?",
   respostas: ["Nova Zelândia","África do Sul","Papua-Nova Guiné","Austrália"],
   correta: "resp3"
   },
   //Pergunta 3
   {pergunta: "Quanto tempo o vidro demora para se decompor ?",
   respostas: ["1000 anos","500 anos","1 milhão de anos","Tempo indeterminado"],
   correta: "resp3"
   },
   //Pergunta 4
   {pergunta: "Qual dessas aves não voa ?",
   respostas: ["Pinguim","Galinha","Pato","Ganso"],
   correta: "resp0"
   },
   //Pergunta 5
   {pergunta: "Qual a capital da Holanda?",
   respostas: ["Istambul","Amsterdã","Tóquio","Bolívia"],
   correta: "resp1"
   },
   //Pergunta 6
   {pergunta: "Qual fruto é conhecido no Norte e Nordeste como 'jerimum' ?",
   respostas: ["Mandioca","Chuchu","Cajú","Abóbora"],
   correta: "resp3"
   },
   //Pergunta 7
   {pergunta: "Qual dessas não é uma das sete maravilhas do mundo?",
   respostas: ["Cristo Redentor","Torre Eiffel","Taj Mahal","Muralhas da china"],
   correta: "resp1"
   },
   //Pergunta 8
   {pergunta: "Qual o plural de xadrez ?",
   respostas: ["Xdreis","Xadrezis","Xadrezes","Xadressis"],
   correta: "resp2"
   },
  ];
  
  var qtdPerguntas = perguntas.length - 1;
  gerarPergunta(qtdPerguntas);
  function gerarPergunta(maxPerguntas){
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);
    if(!perguntasFeitas.includes(aleatorio)){
      perguntasFeitas.push(aleatorio);
      
      var p_select = perguntas[aleatorio].pergunta;
    
    
    $('#pergunta').html(p_select);
    $('#pergunta').attr('data-indice', aleatorio);
    for (var i = 0; i < 5; i++) {
      $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
    }
      var pai = $("#respostas");
      var btns = pai.children();
      
      for(var i = 0; i < btns.length; i++){
        pai.append(btns.eq(Math.floor(Math.random() * btns.length)));
      }
    }else{
      if(perguntasFeitas.length < qtdPerguntas + 1){
        return gerarPergunta(maxPerguntas);
      }else{
        console.log('acabaram as perguntas.');
         $('#quiz').addClass('oculto');
         $('#msg').html('Parabéns !<br> você venceu, <br><br>acertou todas as perguntas!<br><br> 🏅   🏅   🏅');
         $('.status').removeClass('oculto');
      }
    }
  }
  
  $('.resposta').click(function(){
    if($('#quiz').attr('data-status') !== 'travado'){
      
   resetaBotoes();
    $(this).addClass('selecionada');
    }
  });
  $('#confirma').click(function(){
    var indice = $('#pergunta').attr('data-indice');
    
    var respCerta = perguntas[indice].correta;
    
    $('.resposta').each(function(){
      if($(this).hasClass('selecionada')){
        var respostaEscolhida = $(this).attr('id');
        
        if(respCerta == respostaEscolhida){
          proximaPergunta();
        }else{
          $('#quiz').attr('data-status', 'travado');
          $('#confirma').addClass('oculto');
          $('#' + respCerta).addClass('correta');
          $('#' + respostaEscolhida).removeClass('selecionada');
          $('#' + respostaEscolhida).addClass('errada');
          setTimeout(function(){
            gameOver();
          },3000);
        }
      }
    });
  });
 function newGame(){
   $('#confirma').removeClass('oculto');
   $('#quiz').attr('data-status', 'ok');
   perguntasFeitas = [];
   resetaBotoes();
   gerarPergunta(qtdPerguntas);
   $('#quiz').removeClass('oculto');
    $('.status').addClass('oculto');
 }
  
  function proximaPergunta(){
 
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
  }
  function resetaBotoes(){
    $('.resposta').each(function(){
      if($(this).hasClass('selecionada')){
        $(this).removeClass('selecionada');
      }
      if($(this).hasClass('correta')){
        $(this).removeClass('correta');
      }
      if ($(this).hasClass('errada')) {
        $(this).removeClass('errada');
      }
    });
  }
  function gameOver(){
    $('#quiz').addClass('oculto');
    $('#msg').html('Game Over <br><br>✴️   ✴️   ✴️');
    $('.status').removeClass('oculto');
  }
  $('#novojogo').click(function(){
    newGame();
  });