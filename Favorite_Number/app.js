
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('numberForm');
    const numberInput = document.getElementById('number');
    const resultDiv = document.getElementById('factResult');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const number = numberInput.value;
        if (number) {
            fetchNumberFacts(number, 4)
                .then(facts => {
                    //displays the fact
                    resultDiv.innerHTML = facts.map(fact => `<p>${fact.text}</p>`).join(''); 
                })
                .catch(error => {
                    //displays the error message
                    resultDiv.textContent = 'Error: ' + error.msg; 
                });
        } else {
            resultDiv.textContent = 'Please enter a number!';
        }
    });
});

function fetchNumberFacts(number, count) {
    const url = `http://numbersapi.com/${number}?json`;
    let numberFacts = [];
    for (let i = 0; i < count; i++){
        numberFacts.push(
            axios.get(url, {
                params: {
                    json: true
                }
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('Server responded with a status: ' + response.status);
            }
        })
        .catch(error => {
            throw {
                msg: error.message || 'Network Error',
                status: error.response ? error.response.status : 'Network Error'
            };
        })
        )};
        return Promise.all(numberFacts);
    }