class MemoryGame {
  constructor(cards){
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }
  shuffleCards() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this.cards[currentIndex];
    this.cards[currentIndex] = this.cards[randomIndex];
    this.cards[randomIndex] = temporaryValue;
  }
  }

  cardClicked (card) {
    console.log('Card clicked: ', card);

    if (this.pickedCards.length < 2) {
      this.pickedCards.push(card);
      this.flipCard(card);
      }
    
    if (this.pickedCards.length == 2) {
      if (this.checkIfPair()) this.isFinished();
      else this.resetPickedCards();
    }
  }

  resetPickedCards() {
    setTimeout( () => {
    this.pickedCards.forEach(card => this.flipCard(card));
    this.pickedCards = [];
    }, 1000)
  }

  flipCard(card) {
    card.childNodes.forEach( child => {
    child.classList.toggle("back");
    console.log('Card flipped: ', child);
  })
  }

  checkIfPair() {
    if (this.pickedCards.length < 2) return;
    this.pairsClicked += 1;
    const card1 = this.pickedCards[0].getAttribute("name");
    const card2 = this.pickedCards[1].getAttribute("name");
    if (card1 === card2) {
      this.pairsGuessed += 1;
      this.pickedCards = [];
      return true
    } else {
      return false;
    }
  }
  isFinished() {
    if (this.pairsGuessed == this.cards.length/2) return true;
    else return false
  }
}