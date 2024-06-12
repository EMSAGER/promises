let deckId = null;
let remainingCards = 52;

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('button');
    const resultDiv = document.getElementById('cardResult');
    const pile = document.getElementById('cardPile');

    //Shuffle the deck when the page loads
    shuffleCards();

    button.addEventListener('click', function(e){
        e.preventDefault();
        if (remainingCards > 0) {
            drawSingleCard();
        } else {
            resultDiv.textContent = "No more cards left to draw!";
            button.disabled = true;
        }
    });

    function shuffleCards(){
        // URL to shuffle a new deck
        const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
        axios.get(shuffleUrl)
            .then(shuffleRes => {
                if (!shuffleRes.data.success) {
                    throw new Error('Failed to shuffle cards!');
                }
                //get the deck_id of the shuffled deck
                deckId = shuffleRes.data.deck_id;
                remainingCards = shuffleRes.data.remaining;
            })
            .catch(error => {
                console.log ('Error during shuffle', error);
            });
    }

    function drawSingleCard() {
        if (!deckId) {
            console.error('Deck Id is not set.');
            return;
        }
        const drawUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
        axios.get(drawUrl)
            .then(drawRes => {
                if (!drawRes.data.success) {
                    throw new Error('Failed to draw a card!');
                }
               const card = drawRes.data.cards[0];
               const cardText = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`;
            //    console.log(cardText);
               
               const cardImage = card.image;

               pile.innerHTML += `
               
                   <img src="${cardImage}" alt="Card Image" style="transform: rotate(${Math.random() * 20 - 10}deg);">
               
           `;
                //adding the card to the discard pile
                addToPile(card.code);

               //if cards are remaining, draw the next card
               remainingCards = drawRes.data.remaining;
               if (remainingCards === 0){
                button.disabled = true;
                //newshuffle();
               }
            }) 
            .catch(error => {
                console.error('Error during draw:', error);
            });
    }

    function addToPile(cardCode){
        const pileUrl = `https://deckofcardsapi.com/api/deck/${deckId}/pile/discard/add/?cards=${cardCode}`;

        axios.get(pileUrl)
        .then(pileRes => {
            if(!pileRes.data.success){
                throw new Error('Failed to add card to pile!');
            }
            // console.log(`Card added to pile: ${cardCode}`);
        })
        .catch(error => {
            console.error('Error adding card to pile:', error);
        });
        
    // function newShuffle(){
    //     // URL to shuffle a new deck
    //     const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/';
    //     axios.get(shuffleUrl)
    //         .then(shuffleRes => {
    //             if (!shuffleRes.data.success) {
    //                 throw new Error('Failed to shuffle cards!');
    //             }
    //             //get the deck_id of the shuffled deck
    //             deckId = shuffleRes.data.deck_id;
    //             remainingCards = shuffleRes.data.remaining;
    //         })
    //         .catch(error => {
    //             console.log ('Error during shuffle', error);
    //         });
    // }
}})