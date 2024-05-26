//NOTE - starting off with player class first, i made it  ti initialize the
// players name as well an an empty hand as the card class hasn't been made just yet
// but i'm starting off with the methods of addCard and playCard to start off with.
class Player {
  constructor(player1, player2) {
    (this.name = player1), player2;
    this.hand = [];
    this.score = 0;
  }
  //NOTE - i wanted to do 'addHalfDeck' as it would show back
  // to the card game, but i put in addCard because it would add
  // any number of cards wether it's half deck, a full deck or
  // one card, it would make it clearer and more flexible.

  addCard(card) {
    this.hand.push(card);
  }
  //NOTE - this will play a card from a players hand.
  flipCard() {
    if (this.hand.length > 0) {
      return this.hand.shift(); //NOTE - removing and returning the
      // first card
      // from a players hand
    } else {
      return null; //NOTE - this will return null if the hand is empty
    }
  }
  //TODO - add methods as needed to play out game...
  //NOTE - wanted to make sure that if the same card of ranks is
  //  played, both cards are discarded and the game continues.
  discardCard(deck) {
    if (this.hand.length > 0) {
      let sameRankCards = this.hand.filter((card, self) => {
        return (
          self.findIndex(
            (c) => c.rank === card.rank && c.suit !== card.suit
          ) !== -1
        );
      });

      if (sameRankCards.length > 0) {
        let discardedCards = [];
        for (let i = 0; i < sameRankCards.length; i++) {
          let index = this.hand.findIndex(
            (card) =>
              card.rank === sameRankCards[i].rank // &&
              // card.suit !== sameRankCards[i].suit
          );
          discardedCards.push(this.hand.splice(index, 1)[0]);
        }
        deck.discardCard(discardedCards); //NOTE -  addind discarded cards to the discard pile.
      } else {
        //NOTE - if no cards with the same rank from different, discard a single card.
        return this.hand.pop();
      }
    } else {
      return null;
    }
  }
}
//NOTE - Card class for cards played
//TODO - create methods of how cards are played.
class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }

  displayCard() {
    return `${this.rank} ${this.suit}`;
  }
}
//FIXME - I can use either symbols or words for suits
class Deck {
  constructor() {
    this.cards = [];
    this.discardPile = [];
    this.initializeDeck();
    this.shuffleDeck();
  }

  initializeDeck() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];
    let deck = [];

    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < ranks.length; x++) {
        let card = new Card(suits[i], ranks[x], x);
        deck.push(card);
      }
    }
    this.deck = deck;
    //console.log("where is my deck for players", deck);
  }
  shuffleDeck() {
    this.deck.sort(() => Math.random() - 0.5);
  }

  dealCards(playerName) {
    console.log("dealing the cards for", playerName);
    let cards = this.deck.splice(0, 26);
    // console.log("spliced cards:", cards);
    return cards;
  }
  discardCard(cards) {
    console.log("Discard:", cards)
    this.discardPile.push(cards);
  }
}
let playerDeck = new Deck();
 playerDeck.shuffleDeck();
console.log(playerDeck.deck[0].displayCard());

let player1Points = 0;
let player2points = 0;
let pointWinner = " ";

//NOTE -  Lets start the game of WAR! in this variation,
//  we are playing 13 rounds, in the 13 rounds,
// who ever has the most points wins the game! However if there is a tie at the end of
// 13 rounds then one round of rock, paper, scissors is
//  played and whoever wins is called Champion of War.

//NOTE - made a new class to specifically play the game.

class Game {
  constructor(playerA, playerB) {
    this.deck = new Deck();
    this.player1 = new Player(playerA);
    this.player2 = new Player(playerB);
    this.dealCards();
  }

  dealCards() {
    this.player1.hand = this.deck.dealCards(this.player1.name);
    // console.log("Player 1's hand:", this.player1.hand);

    this.player2.hand = this.deck.dealCards(this.player2.name);
  }
  //NOTE - setting up a loop for each round to have the two players play their cards
  playRound() {
    for (let round = 0; round < 26; round++) {
      let card1 = this.player1.flipCard();
      let card2 = this.player2.flipCard();

      //console.log(" \n Player 1 :", card1,"\n Player 2:", card2);

      if (card1 && card2) {
        
        console.log(`
        Round ${round + 1}: ${this.player1.score} to ${this.player2.score}
        ${this.player1.name} plays ${card1.displayCard()}
        ${this.player2.name} plays ${card2.displayCard()}
        `);

        if (card1.value > card2.value) {
          this.player1.score++;
          //this.deck.discardCard(card2)
        } else if (card2.value > card1.value) {
          this.player2.score++;
          //this.deck.discardCard(card1)
        } else if(card1.value === card2.value){
            
            this.deck.discardCard(card1);
            this.deck.discardCard(card2);
        }
      }
    }
  }

  displayScore() {
    console.log(`${this.player1.name}'s score: ${this.player1.score}.`);
    console.log(`${this.player2.name}'s score: ${this.player2.score}`);
  }
//NOTE - I had to add a boolean to make sure that the tiebreaker didn't just show up at every refresh;
// adding a truthy and a falsey helps with determining how to get the tiebreak to be called back onto. 
 determineWinner() {
    if (this.player1.score < this.player2.score) {
     this.isTie = false;
  console.log(`${this.player1.name} wins! You are Champion of War!`);
} else if (this.player1.score < this.player2.score) {
     this.isTie = false;
  console.log(`${this.player2.name} wins! You are Champion of War!`);
} else if (this.player1.score === this.player2.score){ 
     this.isTie = true;
  console.log("It's a tie! Time for a tie breaker!");}
    }
  //NOTE -  instead of cards creating a tie which will result in a discard, if the total score is tied by the
  // end of the game, a single round of rock, paper, scissors, will be played. Whoever comes out on top,
  // will be declared champion of war.
  playingTieBreaker() {
    //NOTE - simple game for the tiebreaker if there is another tie, everyone loses.
    const choices = ["Rock", "Paper", "Scissors"];
    const player1Choice = choices[Math.floor(Math.random() * choices.length)];
    const player2Choice = choices[Math.floor(Math.random() * choices.length)];

    console.log(
      `Tiebreaker: ${this.player1.name} chose ${player1Choice}, ${this.player2.name} chose ${player2Choice}.`
    );

    if (player1Choice === player2Choice) {
      console.log("Its still a tie, everyone loses.");
    } else if (
      (player1Choice === "Rock" && player2Choice=== "Scissors") ||
      (player1Choice === "Paper" && player2Choice=== "Rock") ||
      (player1Choice === "Scissors" && player2Choice == "Paper")
    ) {
      console.log(
        `
        ${this.player1.name} wins the Tiebreaker and is CHAMPION OF WAR!
        `
      );
    } else {
      console.log(
        `
        ${this.player2.name} wins the tiebreaker and is CHAMPION OF WAR!
        `
      );
    }
  }
  //NOTE - Last class and methods to tie everything together
  startGame() {
    console.log("Game has started...");
    this.playRound();
    this.displayScore(this.player1.name, this.player2.name);
    console.log("Shows Game", game)
    console.log("Discard Pile:", this.deck.discardPile)
    this.determineWinner();
    if(this.isTie){
        this.playingTieBreaker();
    }
  }
}

//NOTE - time to finally start and create the game! Wish me luck!
console.log("Starting the game of war!!");
let game = new Game("Ben", "Lacy");
console.log("Creating class game for war:", game);
game.startGame();
