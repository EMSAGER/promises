//part one: chaining promises

// let deckId = null;

// const HANDSIZE = 52;
// let remainingCards = HANDSIZE;

// document.addEventListener('DOMContentLoaded', function() {
//     const button = document.getElementById('button');
//     const resultDiv = document.getElementById('cardResult');
//     const pile = document.getElementById('cardPile');

//     //Shuffle the deck when the page loads
//     shuffleCards();

//     button.addEventListener('click', function(e){
//         e.preventDefault();
//         if (remainingCards > 0) {
//             drawSingleCard();
//         } else {
//             returnCardsToDeck();
//         }
//     });

//     function shuffleCards(){
//         // URL to shuffle a new deck
//         const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
//         axios.get(shuffleUrl)
//             .then(shuffleRes => {
//                 if (!shuffleRes.data.success) {
//                     throw new Error('Failed to shuffle cards!');
//                 }
//                 //get the deck_id of the shuffled deck
//                 deckId = shuffleRes.data.deck_id;
//                 remainingCards = HANDSIZE;
//                 //going through the document & getting class images & turn into an array to be fr
//                 Array.from(document.getElementsByClassName("card-source")).forEach(x => x.remove());
//             })
//             .catch(error => {
//                 console.log ('Error during shuffle', error);
//             });
//     }

//     function returnCardsToDeck() {
      
//         shuffleCards();
//         button.innerText = "Draw Card!";
//     }

//     function drawSingleCard() {
//         if (!deckId) {
//             console.error('Deck Id is not set.');
//             return;
//         }
//         const drawUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
//         axios.get(drawUrl)
//             .then(drawRes => {
//                 if (!drawRes.data.success) {
//                     console.log("no more cards!");
//                     returnCardsToDeck();
//                 }
//                const card = drawRes.data.cards[0];
//                const cardText = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`;
//             //    console.log(cardText);
               
//                const cardImage = card.image;

//                pile.innerHTML += `
               
//                    <img src="${cardImage}" alt="Card Image" class="card-source" style="transform: rotate(${Math.random() * 20 - 10}deg);">
               
//            `;
//                 //adding the card to the discard pile
//                 addToPile(card.code);

//                //if cards are remaining, draw the next card
//                remainingCards --;
//                if (remainingCards === 0){
//                 button.innerText = "Reshuffle";
//                }
//             }) 
//             .catch(error => {
//                 console.error('Error during draw:', error);
//             });
//     }

//     function addToPile(cardCode) {
//         const pileUrl = `https://deckofcardsapi.com/api/deck/${deckId}/pile/discard/add/?cards=${cardCode}`;
//         axios.get(pileUrl)
//             .then(pileRes => {
//                 if (!pileRes.data.success) {
//                     throw new Error('Failed to add card to pile!');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error adding card to pile:', error);
//             });
//     }

    
// });



//part two: async & await
let deckId = null;

const HANDSIZE = 52;
let remainingCards = HANDSIZE;

document.addEventListener('DOMContentLoaded', async function() {
    const button = document.getElementById('button');
    const resultDiv = document.getElementById('cardResult');
    const pile = document.getElementById('cardPile');

    //Shuffle the deck when the page loads
    await shuffleCards();

    button.addEventListener('click', async function(e){
        e.preventDefault();
        if (remainingCards > 0) {
            await drawSingleCard();
        } else {
            await returnCardsToDeck();
        }
    });

    async function shuffleCards(){
        // URL to shuffle a new deck
        const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
        //insert try here
        try {
            const shuffleRes = await axios.get(shuffleUrl);
            if (!shuffleRes.data.success) {
                throw new Error('Failed to shuffle cards!');
            }
            deckId = shuffleRes.data.deck_id;
            remainingCards = HANDSIZE;
            //going through the document & getting class images & turn into an array to be fr
            Array.from(document.getElementsByClassName("card-source")).forEach(x => x.remove());
        } catch (e) {
            console.log ('Error during shuffle', error);
        }
    }    

    async function returnCardsToDeck() {
      
        await shuffleCards();
        button.innerText = "Draw Card!";
    }

    async function drawSingleCard() {
        if (!deckId) {
            console.error('Deck Id is not set.');
            return;
        }
        const drawUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
        try {
            const drawRes = await axios.get(drawUrl);
            if (!drawRes.data.success) {
                console.log("no more cards!");
                await returnCardsToDeck();
                return;
            }
            const card = drawRes.data.cards[0];
            const cardImage = card.image;
            pile.innerHTML += `
                <img src="${cardImage}" alt="Card Image" class="card-source" style="transform: rotate(${Math.random() * 20 - 10}deg);">
        `;
            //adding the card to the discard pile
            await addToPile(card.code);

            //if cards are remaining, draw the next card
            remainingCards --;
            if (remainingCards === 0){
             button.innerText = "Reshuffle";
            }
        } catch (e) {
            console.error('Error during draw:', error);
        }
    }

    async function addToPile(cardCode) {
        const pileUrl = `https://deckofcardsapi.com/api/deck/${deckId}/pile/discard/add/?cards=${cardCode}`;
        try{
            const pileRes = await axios.get(pileUrl);
            if (!pileRes.data.success) {
                throw new Error('Failed to add card to pile!');
            }
        } catch (e){
            console.error('Error adding card to pile:', error);
        }
    }

    
});