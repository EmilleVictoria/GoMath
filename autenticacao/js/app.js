var botaoentrar = document.querySelector("#entrar");
var botaocadastrar = document.querySelector("#cadastrar");

var body = document.querySelector("body");


botaoentrar.addEventListener("click", function () {
   body.className = "entrar-js"; 
});

botaocadastrar.addEventListener("click", function () {
    body.className = "cadastrar-js";
})
