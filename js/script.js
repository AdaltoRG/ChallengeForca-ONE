let start = document.getElementById("start");
let newWord = document.getElementById("new-word");
let saveStart = document.getElementById("save-start-button");
let cancel = document.getElementById("cancel-button");
let newGame = document.getElementById("new-game");
let quit = document.getElementById("quit");
let tela1 = document.getElementById("screen-one");
let tela2 = document.getElementById("screen-two");
let tela3 = document.getElementById("screen-three");
let mario = (document.getElementById("mario").src = "img/mario.png");
let telavitoria = document.getElementById("tela-vitoria");
let teladerrota = document.getElementById("tela-derrota");

let palavras = [
  "MARIO",
  "YOSHI",
  "LUIGI",
  "TOAD",
  "BOWSER",
  "PEACH",
  "DAISY",
  "GOOMBA",
  "WARIO",
  "COGUMELO",
  "FASE",
  "WALUIGI",
  "PLANTA",
  "REX"
];
var palavraSecreta = "";
var letras = [];
var palavraCorreta = "";
var erros = 8;
let letrasIncorretas = [];
let acertos = 0;
let letrasCorretas = [];

start.onclick = () => {
  startGame();
};
newWord.onclick = () => {
  tela1.style.display = "none";
  tela2.style.display = "flex";
};
saveStart.onclick = () => {
  saveWord();
};
newGame.onclick = () => {
  location.reload();
};
quit.onclick = () => {
  location.reload();
};

cancel.onclick = () => {
  location.reload();
};

function mostrarAvisoRepetida() {
  alert("Você já usou esta letra");
}

function mostrarLetrasErradas() {
  const areaErradas = document.querySelector("#letrasErradas");
  areaErradas.innerHTML = "<h3>Letras Erradas: </h3>";
  letrasIncorretas.forEach((letra) => {
    areaErradas.innerHTML += `<span>${letra}</span>`;
  });
}

function mudaVidas() {
  document.getElementById("vidas").src = `img/${erros}.png`;
}

function verificaSePerdeu() {
  if (erros == 0) {
    tela3.style.display = "none";
    teladerrota.style.display = "flex";
  }
}

function verificaSeGanhou() {
  const areaSecreta = document.querySelector("#areaSecreta");
  if (palavraSecreta === areaSecreta.innerText) {
    tela3.style.display = "none";
    telavitoria.style.display = "flex";
  }
}

function mostrarLetrasCertas() {
  const areaSecreta = document.querySelector("#areaSecreta");
  palavraSecreta.split("").forEach((letra) => {
    if (letrasCorretas.includes(letra)) {
      areaSecreta.innerHTML += `<span>${letra}</span>`;
    } else {
      areaSecreta.innerHTML += `<span>_</span>`;
    }
  });
}

function escolherPalavraSecreta() {
  let palavra = palavras[Math.floor(Math.random() * palavras.length)];
  palavraSecreta = palavra;
  return palavra;
}

function mostrarLetrasCertas() {
  const divPalavraSecreta = document.querySelector("#areaSecreta");
  divPalavraSecreta.innerHTML = "";
  palavraSecreta.split("").forEach((letra) => {
    if (letrasCorretas.includes(letra)) {
      divPalavraSecreta.innerHTML += `<span>${letra}</span>`;
    } else {
      divPalavraSecreta.innerHTML += `<span>_</span>`;
    }
  });
}

function saveWord() {
  let palavraNova = document.getElementById("palavra-nova").value;
  if (palavraNova !== "") {
    palavras.push(palavraNova.toUpperCase());
    alert("A palavra digitada foi salva");
    tela2.style.display = "none";
    tela3.style.display = "flex";
    startGame(palavraNova);
  } else {
    alert("Nenhuma palavra foi digitada");
  }
}

function startGame() {
  tela1.style.display = "none";
  tela3.style.display = "flex";
  escolherPalavraSecreta();
  mostrarLetrasCertas();
  document.onkeydown = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      let letra = e.key.toUpperCase();
      if (letrasIncorretas.includes(letra)) {
        mostrarAvisoRepetida();
      } else {
        if (palavraSecreta.includes(letra)) {
          letrasCorretas.push(letra);
          acertos++;
        } else {
          letrasIncorretas.push(letra);
          erros -= 1;
        }
      }
      atualizarJogo();
    }
  };
}

function atualizarJogo() {
  mostrarLetrasErradas();
  mostrarLetrasCertas();
  mudaVidas();
  verificaSeGanhou();
  verificaSePerdeu();
}
