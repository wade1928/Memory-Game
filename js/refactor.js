//getList();
//shuffle(listCards);
//getDomCards(listCards);

$(document).ready(function() {
  /* for (let i = 0; i < 17; i++) {
      $('.card').addClass('open show')
    }*/
  getList();

  //shuffle(listCards);
  getDomCards(listCards);
});

// * Create a list that holds all of your cards
let listCards = [];
let openedCards = [];
let clickCounter = 0;
let moveCounter = 0;

//Event Listener for 'card' click
$('.card').on('click', function() {
  addMoves();
  showCard(this);
});

function getList() {
  let cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    listCards.push(cards[i]);
  }

  return listCards;
};

//* shuffle the list of cards using the provided "shuffle" method below
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  moveCounter = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//* Display the cards on the page
function getDomCards(array) {
  let domCards = document.getElementsByClassName('card');
  for (let i = 0; i < array.length; i++) {
    domCards[i].firstElementChild.innerHTML = listCards[i].firstElementChild.innerHTML;
  }
}

// *  - display the card's symbol
function showCard(card) {
  $(card).addClass('open show');
  addOpen(openedCards, card);
}

/*-add the card to a *list* of "open" cards (put this functionality in another
function that you call from this one)*/
function addOpen(array, card) {
  openedCards.push(card);
  checkForMatch(openedCards, card);
}

//- if the list already has another card, check to see if the two cards match
function checkForMatch(array, card) {
  console.log(newCard);
  console.log(openedCards);
}

function addMoves() {
  clickCounter++;
  if (clickCounter % 2 === 0) {
    moveCounter++;
  }

  $('.moves').text(moveCounter);
};

/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */