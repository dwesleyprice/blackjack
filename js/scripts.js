// 1. When user clicks deal, deal!
var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;
var theBank = 500;
var theBet = 0;
var tipsy = 0;
var newGame = true;
var newHand = true;

// localStorage.setItem(key, value);
//localStorage.setItem("theBank", "500");
// localStorage.getItem(key);

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
		// var playerTotal = calculateTotal(playersHand, 'player');
		// if (playerTotal >= 21){
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
		
		checkBust();
		// }
	});

	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal != 21 && dealerTotal < 17) {
			if(dealersHand.length == 2){
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

	$('.doOver-button').click(function(){
		location.reload();
	});

$('.redChip').click(function(){
				youBet(25);
			// youBet();
		$('.message-here').text("$25 Wagered");
		$('.bets').text(theBank);
	});

	$('.blackChip').click(function(){
				youBet(50);
			// youBet();
		$('.message-here').text("$50 Wagered");
		$('.bets').text(theBank);
	});

	$('.whiskey').click(function(){
		//haveOne();
		// tipsy += .5
		$('body').css("-webkit-filter", "blur(1px)");
		// var howTipsy = '"-webkit-filter", "blur('+tipsy+'px)"';
		// $('body').css(howTipsy);
		// console.log(howTipsy);
		
	});

});
function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;

		//UPDATE LOGIC to account for face cards!
		console.log(cardToPlace);

	$(classSelector).html("<img src='images/"+cardToPlace+".png'>");
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
	var hasAce = false;
	var total = 0;
	var cardValue = 0;
	for (var i = 0; i < hand.length; i++) {
		cardValue = Number(hand[i].slice(0,-1));
		if(cardValue > 10){
			cardValue = 10;	
		} else if (cardValue == 1 && total >= 10){
			cardValue = 1;
			hasAce = true;
		} else if (cardValue == 1) {
			cardValue = 11;
		}else if (hasAce == true){
			total -= (10);
		}
		total += cardValue;
	}

	var elementToUpdate = '.'+whosTurn+'-total-number';

	$(elementToUpdate).text(total);

	return total;
}

function checkBust(){
	var playersTotal = calculateTotal(playersHand, 'player');
	if (playersTotal > 21){
		$('.message-here').text("You Busted! Dealer Wins!!");
		// alert("You Busted! Dealer Wins!!!")
	}
}

function checkWin(){
	var playersTotal = calculateTotal(playersHand, 'player');
	var dealerTotal = calculateTotal(dealersHand, 'dealer');
	if (dealerTotal == 21 || playersTotal == 21) {
		$('.message-here').text("BLACKJACK!");
	}

	if (dealerTotal > 21){
		$('.message-here').text("Dealer Busted! You WIN!!!");
		youWin();
		// alert("Dealer Busted! You WIN!!!");
	}else if (playersTotal > dealerTotal) {
		$('.message-here').text("Booyah! Way to Win.");
		youWin();
		// alert("Booyah, Booyah, Booyah!!!");
	} else if (dealerTotal >= playersTotal) {
		$('.message-here').text("You lose, punk!");
		// alert("You lose, punk!")
	}

}

	function youBet(wager){
		theBet = theBet + wager;
		theBank -= theBet;

		console.log(theBank);
		console.log(theBet);
	}

	function youWin(){
		theBank += theBet * 2;
		$('.bets').text(theBank);
		console.log(theBank);
		console.log(theBet);
	}

	function haveOne(){
		tipsy += .5
		// $('body').css("-webkit-filter", "blur(.5px)");
		// var howTipsy = 'style="-webkit-filter:blur('+tipsy+'px)"'
		// document.getElementsByTagName("body").innerHTML=howTipsy;
		var howTipsy = '"-webkit-filter", "blur('+tipsy+'px)"';
		$('body').css(howTipsy);
		console.log(howTipsy);
	}