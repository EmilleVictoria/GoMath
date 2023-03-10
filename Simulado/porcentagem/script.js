//so iniciando
const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

//importando as questoes do simulado2
var questions = []; //this should be empty by default as all
                    //the questions will be added to this object from database
var questions_temp = {
    enunciado: "",
    correta: "",
    alt1: "",
    alt2: "",
    alt3: "",
    alt4: "",
};
var embaralhadas = [];
var erradas = [];
var certas = [];




  function getQuestions() {
    //Gets all the questions from firebase and save them in questions object
    firebase
    .database()
      .ref("porcentagem")
      .once("value", function (data) {
        //once means,run  questions function only once. value refers to => Run  questions function when the value is updated. data=>received data from database
        var data = data.val();
        let qNum = 0;
        for (var property in data) {
          //run   questions loop as long as the data has some property
          if (data.hasOwnProperty(property)) {
            //check if  questions is its own proeprty
            questions[qNum] =
              //create objects inside new question
              {
                enunciado: "",
                correta: "",
                alt1: "",
                alt2: "",
                alt3: "",
                alt4: "",
              };
            
            questions[qNum].correta = data[property].correta;
            questions[qNum].enunciado = data[property].enunciado;
            questions[qNum].alt1 = data[property].alt1;
            questions[qNum].alt2 = data[property].alt2;
            questions[qNum].alt3 = data[property].alt3;
            questions[qNum].alt4 = data[property].alt4;
            
  
            qNum++;
          }
        }console.log(questions[0].alt1);
        questions = embaralhar(questions);
        questions = questions.slice(-10)
        console.log(questions[0].alt1);
        document.getElementById("loaderDiv").style.display = "none";
        
      })}

      function startTimer (duration, display){

        var timer = duration, minutes, seconds;
        setInterval(function(){

//converte para o modelo de relogio que a gente conhece
//seria timer dividido por 60 na base 10            
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10)

          minutes = minutes < 10 ? "0" + minutes: minutes;

          seconds = seconds < 10 ? "0" + seconds: seconds;

          display.textContent = minutes +  ":" + seconds;

          if( -- timer < 0){
            timer = duration;

          }
        }, 1000)

      }

      function contando (){
        var duration = 60 * 30
        var display = document.querySelector("#timer")

        startTimer(duration, display)
      }

function embaralhar (questions){
  //just inicializando
  var i = questions.length
  var j = 0;
  var temp;
//vai decrementando in each loo???
 while (--i > 0){
    j = Math.floor(Math.random() * (i+1));
    //salva para depois depois usar
    temp =  questions[j];
      questions[j] =   questions[i];
      questions[i] = temp;
    //agora, ele trocou a posicao i com a j e vai seguindo
  }
  //returns the suffled array
  return  questions;
}




//ainda a trabalhar

//indice da questao atual
let currentIndex = 0;

// qntd de acertos
let questionsCorrect = 0;

btnRestart.onclick = () => {
  contando()
  content.style.display = "flex";
  contentFinish.style.display = "none";

  //volta para a primeira questao
  currentIndex = 0;
  //zera o numero de acertos
  questionsCorrect = 0;
  //chama funcao para que as questoes aparecam
  loadQuestion();
};

function nextQuestion(e) {
    //verifica se a questao est?? certa

     if (e.target.getAttribute("data-correct") === "true") {
    //incrementa o numero de respostas certas
    questionsCorrect++;
    certas.push(questions[currentIndex])
    console.log(certas)
    //firebase.database().ref('users/' + firebase.auth().currentUser.uid+"/certas").set(questions[currentIndex])  
  }
    
    else{
    console.log(questions[currentIndex])
      erradas.push(questions[currentIndex])
      console.log(erradas)
    //firebase.database().ref('users/' + firebase.auth().currentUser.uid+"/erradas").set(questions[currentIndex])
  

    }
    

  //passa para a proxima questao de fato
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    //precisa chamar a questao com o proximo indice
    loadQuestion();
  } else {
    //ja que nao tem mais questoes, mostrar resultado
    finish();
  }
}

//texto que sai no final, dps de responder tudo
function finish() {
  textFinish.innerHTML = `voc?? acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
  firebase.database().ref('users/' + firebase.auth().currentUser.uid+"/erradas").set(erradas)
  firebase.database().ref('users/' + firebase.auth().currentUser.uid+"/certas").set(certas)
}


function iscorrect (alt, correta){
  if (alt == correta){
    return true;
  }else{
    return false;
  }
}


function loadQuestion() {
  
    //Ele vai mostrar tipo "3/4" 
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  //item pega a questao do indice atual
  const item = questions[currentIndex];
  console.log(item.correta);
  answers.innerHTML = "";
  //joga ele para a tela
  question.innerHTML = item.enunciado;
  

  //para cada alternativa
  //cria uma div com o enunciado dela

    
    const div = document.createElement("div");
    //ao clicar na div, a questao e respondida
    //analisar depois se e preciso mudar
    div.innerHTML = `
    <button class="answer" data-correct="${iscorrect(item.alt1, item.correta)}">
      ${item.alt1}
    </button>
    <button class="answer" data-correct="${iscorrect(item.alt2, item.correta)}}">
      ${item.alt2}
    </button>
    <button class="answer" data-correct="${iscorrect(item.alt3, item.correta)}">
      ${item.alt3}
    </button>
    <button class="answer" data-correct="${iscorrect(item.alt4, item.correta)}">
      ${item.alt4}
    </button>
    `;
    //para esclarecer, option e o textinho
    //correct e o boolean usado para verificar se a alternativa e certa ou nao

    //atribui dentro da div essas informacoes (enunciado, correta)
    //correta - certa ou nao
    answers.appendChild(div);


  

  //sempre que clicar na div da questao faz todo o processo
  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

//logo ao abrir o documento, ja vai estar mostrando a primeira questao
getQuestions();
loadQuestion()
