//getList();
//shuffle(listCards);
//getDomCards(listCards);

$(document).ready(function() {
  /* for (let i = 0; i < 17; i++) {
      $('.card').addClass('open show')
    }*/
  getList();
  shuffle(listCards);
  getDomCards(listCards);
})

// * Create a list that holds all of your cards
let listCards = [];


//Event Listener for 'card' click
$('.card').on('click', function() {
  openCard(this);
})


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

// *  - display the card's symbol (put this functionality in another function that you call from this one)*/
function openCard(card) {
  card.classList.add('match');
}

function openCard(card) {
  $(card).addClass('open show');
}