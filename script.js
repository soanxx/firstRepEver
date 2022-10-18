'use strict';

//Selecionando elementos e guardando em variáveis
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0'); // score total de um player individual
const score1Element = document.getElementById('score--1'); // melhor forma de pegar um elemento pela id
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const csElement0 = document.getElementById('current--0'); // o score antes do player apertar hold
const csElement1 = document.getElementById('current--1');
let totalScore = [0, 0]; //cada elemento da array vai receber os valores dos scores qdo player 0 ou 1 apertar hold
let currentScore = 0;
let activePlayer = 0; //player1 = 0 ; player 2 = 1 -> pq o score de cada player vai ser guardado numa array [i] i = 0 ou 1

//Starting Conditions - função iniciar

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  csElement0.textContent = currentScore;
  csElement1.textContent = currentScore;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  btnRoll.disabled = false;
};

const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Iniciando o jogo: chamando a função init

init();

//Rolling the dice

btnRoll.addEventListener('click', function () {
  let diceRoll = Math.trunc(Math.random() * 6 + 1);
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${diceRoll}.png`;
  if (diceRoll !== 1) {
    currentScore += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore; //current--0 ou 1. Recebe o núm da variável acivePlayer
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore + ' PERDEU PLAYBOY';
    switchPlayer();
    // activePlayer = activePlayer === 0 ? 1 : 0;
    // player0Element.classList.toggle('player--active'); //Não precisa do ponto na classList. Se colocar ponto, o que já tem player active vai ter 2x
    // player1Element.classList.toggle('player--active'); //o player 0 vai ter 2 active pq o toggle vai agir como "add" e não substituir
  }
  console.log(activePlayer);
});

//Bttn hold

btnHold.addEventListener('click', function () {
  let i = activePlayer; // Não é necessário clonar "activePlayer" na variável "i". Os dois guardam exatatmente o mesmo valor
  totalScore[i] += currentScore;
  if (totalScore[i] >= 100) {
    document.querySelector(`.player--${i}`).classList.add('player--winner');
    document.querySelector(`.player--${i}`).classList.remove('player--active');
    diceElement.classList.add('hidden');
    btnRoll.disabled = true;
  } else {
    document.getElementById(`score--${i}`).textContent = totalScore[i];
    switchPlayer();
  }
});

//New Game

btnNew.addEventListener('click', function () {
  init();
});
