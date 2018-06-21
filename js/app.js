/*
 * Create a list that holds all of your cards
 */

let arrayCards = [];
let openCards = [];
addToArray();

function addToArray() {
  const cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    arrayCards.push(cards[i]);
  }
  return arrayCards;
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below


 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(arrayCards) {
  var currentIndex = arrayCards.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arrayCards[currentIndex];
    arrayCards[currentIndex] = arrayCards[randomIndex];
    arrayCards[randomIndex] = temporaryValue;
  }

  return arrayCards;
}

// loop through each card and create its HTML
// add each card's HTML to the page
function resetCards(arrayCards) {
  for (let i = 0; i < arrayCards.length; i++) {
    if (arrayCards[i].classList.contains('show')) {
      arrayCards[i].classList.remove('show')
    }
    if (arrayCards[i].classList.contains('open')) {
      arrayCards[i].classList.remove('open')
    }
    if (arrayCards[i].classList.contains('match')) {
      arrayCards[i].classList.remove('match')
    }
  }

  for (let i = 0; i < arrayCards.length; i++) {
    let currentClass = document.getElementsByClassName('card');
    let currentArray = arrayCards;
    currentClass[i].innerHTML = currentArray[i].innerHTML;
  }
  return arrayCards;
}

/*set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)*/
$('.card').on('click', function() {
  $(this).addClass('open show');
  //openedCards(arrayCards);
  //isMatch(openCards);
})

/*- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
/*function openedCards(arrayCards) {
	console.log(arrayCards);
	for(let i = 0; i < arrayCards.length; i++){
	if(arrayCards[i].classList.contains('open')){
		openCards.push(arrayCards[i]);
}
}
return openCards;
}

//- if the list already has another card, check to see if the two cards match
function isMatch(openCards) {
	let match = openCards[openCards.length - 1];
	let matchFC =
	openCards.forEach(function(card){
		if($(openCards:first-child).classList === $(match:first-child).classList){
			$(this).addClass('match');
			$(match).addClass('match');
	}

	})
}



 /*


 */
/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */