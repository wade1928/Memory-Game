//getList();
//shuffle(listCards);
//getDomCards(listCards);
// * Create a list that holds all of your cards
let listCards = [];
let openedCards = [];
let clickCounter = 0;
let moveCounter = 0;
let matches = 0;
let modal = document.getElementById('myModal');
let seconds = 0;
let minutes = 0;
let score = 100;
let count = 5;
let arrayOfStars = Array.from(document.getElementById('starsCount').children);

$(document).ready(function() {
  /*for (let i = 0; i < 17; i++) {
    $('.card').addClass('open show');
  };*/

  shuffleDeck();
  reset();
  startTimer();
});

//Event Listener for 'card' click
$('.card').on('click', function() {
  addMoves();
  showCard(this);


});

$('.restart').on('click', function() {
  $('.card').removeClass('open');
  $('.card').removeClass('show');
  $('.card').removeClass('match');
  stopTimer();
  shuffleDeck();
  reset();
  startTimer();
});

/*function getList() {
  let cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    listCards.push(cards[i]);
    console.log(listCards);
  };
  //shuffle(listCards);
};*/

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
/*function getDomCards(array) {
  domCards = document.querySelectorAll('i');
  let classListCards = ;
  for (let i = 0; i < domCards.length; i++) {
    domCards[i].classList = array[i].firstElementChild.classList;
  }
}*/
//-----------------------//

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
  if (clickCounter % 2 === 0) {
    console.log(card.id);
    for (let i = 0; i < openedCards.length - 1; i++) {
      let classL1 = openedCards[openedCards.length - 2].firstElementChild.classList[1];
      let classL2 = card.firstElementChild.classList[1];
      console.log(openedCards[openedCards.length - 2].id);
      console.log(card.id);
      if (openedCards[openedCards.length - 2].id === card.id) {
        $('body').css('pointer-events', 'none');
        openedCards[openedCards.length - 1].classList.add('noMatch');
        openedCards[openedCards.length - 2].classList.add('noMatch');

        let timeoutID;
        let timeoutID2;

        function delayedFunction() {
          timeoutID = window.setTimeout(notAMatch, 600, card, openedCards);
          timeoutID = window.setTimeout(enableClicks, 700);
        };
        delayedFunction();
      }
      //if the cards do match, lock the cards in the open position
      else if (classL1 === classL2) {
        card.classList.add('match');
        card.classList.remove('open');
        card.classList.remove('show');
        openedCards[i].classList.add('match');
        openedCards[i].classList.remove('open');
        openedCards[i].classList.remove('show');
        openCards = openedCards.splice(openedCards.length - 2, 2);
        matches++;
        checkWin();

      } else {
        $('body').css('pointer-events', 'none');
        openedCards[openedCards.length - 1].classList.add('noMatch');
        openedCards[openedCards.length - 2].classList.add('noMatch');

        let timeoutID;
        let timeoutID2;

        function delayedFunction() {
          timeoutID = window.setTimeout(notAMatch, 600, card, openedCards);
          timeoutID = window.setTimeout(enableClicks, 700);
        };
        delayedFunction();
        //notAMatch(card, openedCards[i]);
      }
    }
  }
};

//if the cards do not match, remove the cards from the list and hide the card's symbol

function notAMatch(card1, card2) {

  $(card1).removeClass('open');
  $(card1).removeClass('show');
  $(card2).removeClass('open');
  $(card2).removeClass('show');
  $(card1).removeClass('noMatch');
  $(card2).removeClass('noMatch');
  openCards = openedCards.splice(openedCards.length - 2, 2);
};

function enableClicks() {
  $('body').css('pointer-events', 'auto');
}
//*    + increment the move counter and display it on the page
function addMoves() {
  clickCounter++;
  if (clickCounter % 2 === 0) {
    moveCounter++;
    checkStars();
  }

  if (moveCounter === 1) {
    document.getElementById('moves').textContent = 'Move';
  } else {
    document.getElementById('moves').textContent = 'Moves';
  }

  $('.moves').text(moveCounter);
};

function checkWin() {
  if (matches === 8) {
    stopTimer();
    getScore();
    displayModal();
  }
};

const deck = document.querySelector('.deck');


function shuffleDeck() {
  console.log(deck);
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  console.log(cardsToShuffle);
  shuffledCards = shuffle(cardsToShuffle);
  console.log(shuffledCards);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
};

function reset() {
  listCards = [];
  openedCards = [];
  clickCounter = 0;
  moveCounter = 0;
  $('.moves').text(0);
  matches = 0;
  score = 100;
};

function startTimer() {
  seconds = 0;
  minutes = 0;
  timer = setInterval(function() {
    seconds++;
    if (seconds < 10) {
      document.getElementById("seconds").innerText = ':0' + seconds % 60;
    } else {
      document.getElementById("seconds").innerText = ':' + seconds % 60;
    }
    document.getElementById("minutes").innerText = parseInt(seconds / 60);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
};

function displayModal() {
  getStars();
  modal.style.display = "block";
  $('#time').text(minutes + ':' + seconds);
  $('#score').text(score);
  $('#stars').text(count);

}

$('#yes').on('click', function() {
  modal.style.display = "none";
  $('.card').removeClass('open');
  $('.card').removeClass('show');
  $('.card').removeClass('match');
  stopTimer();
  resetStars();
  reset();
  shuffleDeck();
  startTimer();
})

$('#no').on('click', function() {
  modal.style.display = "none";
});

function checkStars() {
  if (moveCounter === 14) {
    $('#star1').css('display', 'none');
    score -= 10;
  } else if (moveCounter === 16) {
    $('#star2').css('display', 'none');
    score -= 10;
  } else if (moveCounter === 18) {
    $('#star3').css('display', 'none');
    score -= 10;
  } else if (moveCounter === 20) {
    $('#star4').css('display', 'none');
    score -= 10;
  }
}

function getScore() {
  if (seconds > 45) {
    score -= 10;
  } else if (seconds === 40) {
    score -= 10;
  } else if (seconds === 35) {
    score -= 10;
  } else if (seconds === 30) {
    score -= 10;
  }
}

function getStars() {
  for (let i = 0; i < arrayOfStars.length; i++) {
    if (arrayOfStars[i].style.display === 'none') {
      count--;
    }
    console.log(count);
  }
}

function resetStars() {
  for (let i = 0; i < arrayOfStars.length; i++) {
    if (arrayOfStars[i].style.display === 'none') {
      arrayOfStars[i].style.display = 'inline-block';
    }
  }
  count = 5;
}








//   *    + if all cards have matched, display a message with the final score