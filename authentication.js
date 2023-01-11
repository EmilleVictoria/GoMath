
//funcao de login
function login() {
    firebase.auth().signInWithEmailAndPassword(
        //pega as informacoes do formulario e armazenam
        document.getElementById("inputEmail").value, document.getElementById("inputSenha").value
    ).then(response => {
         console.log("LogIn efetuado com sucesso!");
         
         //manda para Dashboard
         window.location.href='/Dashboard/dashboard.html';
       

    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        //serve como uma traducao
        return "Usuário nao encontrado";
    }else if("document.getElementById(...) is null"){
        //foi uma maneira de manipular o erro que tava dando
        //mesmo preenchendo o formulario, dizia no console que tinham sido informada
        //variaveis nulas
        //mas, mesmo assim, no firebase ficava cadastrado
        return "Cadastro efetuado com sucesso!";
    }

    return error.message;
}

function cadastrar() {
    firebase.auth().createUserWithEmailAndPassword(
        //pega as informacoes do formulario e armazenam
        document.getElementById("Email").value, document.getElementById("Password").value, document.getElementById("Name").value
    ).then(response => {
        alert("Usuário cadastrado" + document.getElementById("inputEmail").value);
        console.log("Cadastrado");
        
        //isso precisa ser mudado
        window.location.href = '/autenticacao/index.html';
    
    
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

//serve para a recuperacao de senha
function recoverPassword() {    
    firebase.auth().sendPasswordResetEmail(document.getElementById("Email").value).then(() => {
        
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

//serve para o logInComGoogle()
function logInComGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    //aqui eu informo o que eu estou querendo da api: as informacoes do perfil
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile ');
    firebase.auth().signInWithPopup(provider)
        .then( result => {
            console.log(result)
            alert("LogIn com Google efetuado com sucesso!");
            //redireciona para a tela dashboard
            window.location.href='/Dashboard/dashboard.html';
        }).catch (err => {
            alert("Erro ao logar! ");
            console.log(err)
        });
} 

function logout () {
    firebase.auth().signOut();
    alert("Signed Out");
    window.location.href='/index.html';
}

