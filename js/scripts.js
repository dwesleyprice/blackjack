// 1. When user clicks deal, deal!
var theDeck = [];
var han, guido = 0; 
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of cards: 1a-13C
		shuffleDeck(); //Shuffle the deck so the game is not stupid.

		playersHand.push(theDeck[0]); //push on the playersHand array a new card.

		placeCard('player', 'one', theDeck[0]);

		dealersHand.push(theDeck[1]);

		placeCard('dealer', 'one', theDeck[1]);

		playersHand.push(theDeck[2]);

		placeCard('player', 'two', theDeck[2]);

		dealersHand.push(theDeck[3]);
		
		placeCard('dealer', 'two', theDeck[3]);

							// guido = (parseInt(theDeck[1])) + (parseInt(theDeck[3]));

							// $('.dealer-total-number').text(guido);

							// han = (parseInt(theDeck[0])) + (parseInt(theDeck[2]));

							// $('.player-total-number').text(han);
		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');

	});

	$('.hit-button').click(function(){
		
		var slotForNewCard = '';
		if (playersHand.length == 2) {
			slotForNewCard = "three";
		} else if(playersHand.length == 3) {
			slotForNewCard = "four";
		} else if(playersHand.length ==4) {
			slotForNewCard = "five";
		}else if(playersHand.length == 5) {
			slotForNewCard = "six";
		}

		placeCard('player', slotForNewCard, theDeck[topOfTheDeck]);
		playersHand.push(theDeck[topOfTheDeck]);
		calculateTotal(playersHand, 'player');
		topOfTheDeck++;
		
	});

	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17) {
			if(dealersHand.length ==2){
				slotForNewCard = "three";
			}else if (dealersHand.length ==3){
				slotForNewCard = "four";
		}else if(dealersHand.length ==4){
				slotForNewCard = "five";
			}else if (dealersHand.length ==2){
				slotForNewCard = "six";
			}
			placeCard('dealer', slotForNewCard, theDeck[topOfTheDeck]);
			dealersHand.push(theDeck[topOfTheDeck]);
			dealerTotal = calculateTotal(dealersHand, 'dealer');
			topOfTheDeck++;
		}

		checkWin();

	});

	

});

function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;

		//UPDATE LOGIC to account for face cards!

	$(classSelector).html(cardToPlace);
}

function createDeck(){
	// Fill the deck with 52 cards,
	// 4 suits: hearts, spades, diamonds, clubs
	var suits = ['h', 's', 'd', 'c'];
	for (var s = 0; s < suits.length; s++) {
		for (var c = 1; c <=13; c++) {
			theDeck.push(c+suits[s]);
		}
	}

}

function shuffleDeck(){
	for (var i = 1; i < 1000; i++) {
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
}

function calculateTotal(hand, whosTurn){
	var total = 0;
	var cardValue = 0;
	for (var i = 0; i < hand.length; i++) {
		cardValue = Number(hand[i].slice(0,-1));
		if(cardValue > 10){
			cardValue = 10;	
		}
		total += cardValue;
	}

	var elementToUpdate = '.'+whosTurn+'-total-number';

	$(elementToUpdate).text(total);

	return total;
}