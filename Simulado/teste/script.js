//so iniciando
//const question = document.querySelector(".question");
//const answers = document.querySelector(".answers");
//const spnQtd = document.querySelector(".spnQtd");
//const textFinish = document.querySelector(".finish span");
//const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

//importando as questoes do simulado1
//import questions from "./questions.js";
//const dbRef = firebase.database().ref();
//const questoes = dbRef.child("Quetoes").child().get();
//import questions from 'https://ppo-gomath-default-rtdb.firebaseio.com';
var questions; 

function importar (questions){
  
  const dbRef = firebase.database().ref();
  
  dbRef.child("users").child(userId).get().then((snapshot) => {
    if (snapshot.exists()) {
      questions.push(snapshot.val());
  
  
    } else {
      console.log("No data available");
  
    }
  
  }).catch((error) => {
    console.error(error);
  
  });
        ref.get('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var enunciado = childSnapshot.enunciado.val();
            var alt1 = hildSnapshot.alt1.val();
            var alt2 = hildSnapshot.alt2.val();
            var alt3 = hildSnapshot.alt3.val();
            var alt4 = hildSnapshot.alt4.val();
            var correta = hildSnapshot.correta.val();
          });
        })

        
        };

//indice da questao atual
let currentIndex = 0;

// qntd de acertos
let questionsCorrect = 0;

btnRestart.onclick = () => {
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
    //verifica se a questao está certa
  if (e.target.getAttribute("data-correct") === "true") {
    //incrementa o numero de respostas certas
    questionsCorrect++;
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
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  //Ele vai mostrar tipo "3/4" 
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  //item pega a questao do indice atual
  const item = questions[currentIndex];
  answers.innerHTML = "";
  //joga ele para a tela
  question.innerHTML = item.question;

  //para cada alternativa
  //cria uma div com o enunciado dela
  item.answers.forEach((answer) => {
    const div = document.createElement("div");
    //ao clicar na div, a questao e respondida
    //analisar depois se e preciso mudar
    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;
    //para esclarecer, option e o textinho
    //correct e o boolean usado para verificar se a alternativa e certa ou nao

    //atribui dentro da div essas informacoes (enunciado, correta)
    //correta - certa ou nao
    answers.appendChild(div);
  });

  //sempre que clicar na div da questao faz todo o processo
  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

//logo ao abrir o documento, ja vai estar mostrando a primeira questao
loadQuestion();