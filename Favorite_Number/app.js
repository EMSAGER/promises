//Part One Using then/ chaining promises

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('numberForm');
//     const numberInput = document.getElementById('number');
//     const resultDiv = document.getElementById('factResult');

//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//         const number = numberInput.value;
//         if (number) {
//             fetchNumberFacts(number, 4)
//                 .then(facts => {
//                     //displays the fact
//                     resultDiv.innerHTML = facts.map(fact => `<p>${fact.text}</p>`).join(''); 
//                 })
//                 .catch(error => {
//                     //displays the error message
//                     resultDiv.textContent = 'Error: ' + error.msg; 
//                 });
//         } else {
//             resultDiv.textContent = 'Please enter a number!';
//         }
//     });
// });

// function fetchNumberFacts(number, count) {
//     const url = `http://numbersapi.com/${number}?json`;
//     let numberFacts = [];
//     for (let i = 0; i < count; i++){
//         numberFacts.push(
//             axios.get(url, {
//                 params: {
//                     json: true
//                 }
//         })
//         .then(response => {
//             if (response.status >= 200 && response.status < 300) {
//                 return response.data;
//             } else {
//                 throw new Error('Server responded with a status: ' + response.status);
//             }
//         })
//         .catch(error => {
//             throw {
//                 msg: error.message || 'Network Error',
//                 status: error.response ? error.response.status : 'Network Error'
//             };
//         })
//         )};
//         return Promise.all(numberFacts)
//     }

    

//part two: using async & await

document.addEventListener('DOMContentLoaded', function () {
const form = document.getElementById('numberForm');
const numberInput = document.getElementById('number');
const resultDiv = document.getElementById('factResult');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const number = numberInput.value;
    if (number) {
        try {
            //displays the fact
            const facts = await fetchNumberFacts(number, 4);
            resultDiv.innerHTML = facts.map(fact => `<p>${fact.text}</p>`).join('');
        } catch (e) {
            //displays the error message
            resultDiv.textContent = 'Error: ' + error.msg; 
        }
        } else {
          resultDiv.textContent = 'Please enter a number!';
        }
    });
});

async function fetchNumberFacts(number, count) {
const url = `http://numbersapi.com/${number}?json`;
let numberFacts = [];
for (let i = 0; i < count; i++){
    //insert the try here. When the loop occurs you want each iteration to try to push the facts through
    try {
        const res = await axios.get(url, {
            params: {
                json: true
            }
        });
        if (res.status >= 200 && res.status < 300) {
            numberFacts.push(res.data);
        } else {
            throw new Error('Server responded with a status: ' + res.status);
        }
    } catch (e) {
        throw {
            msg: error.message || 'Network Error',
            status: error.response ? error.response.status : 'Network Error'
        };
    }
}
return numberFacts;
}



