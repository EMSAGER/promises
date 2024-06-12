
// let fiveNumberFacts = [];

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('numberForm');
    const numberInput = document.getElementById('number');
    const resultDiv = document.getElementById('factResult');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const number = numberInput.value;
        if (number) {
            fetchNumberFact(number).then(data => {
                resultDiv.textContent = data.text; // Display the fact
            }).catch(error => {
                resultDiv.textContent = 'Error: ' + error.msg; // Display the error message
            });
        } else {
            resultDiv.textContent = 'Please enter a number!';
        }
    });
});

function fetchNumberFact(number) {
    const url = `http://numbersapi.com/${number}?json`;
    return axios.get(url)
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
        });
}
