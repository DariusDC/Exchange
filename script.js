const rate = document.getElementById("rate");
const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const swapButton = document.getElementById("swap");


async function calculate1() {
    await fetch("https://api.exchangeratesapi.io/latest?base=" + currencyOne.value)
        .then(res => res.json())
        .then(data => {
            const rateValue = data.rates[currencyTwo.value];

            rate.innerHTML = "1 " + currencyOne.value + " = " + rateValue + " " + currencyTwo.value;

            amountTwo.value = (amountOne.value * rateValue).toFixed(2);
        });
};

async function calculate2() {
    await fetch("https://api.exchangeratesapi.io/latest?base=" + currencyTwo.value)
        .then(res => res.json())
        .then(data => {
            const rateValue = data.rates[currencyOne.value];

            rate.innerHTML = "1 " + currencyTwo.value + " = " + rateValue + " " + currencyOne.value;

            amountOne.value = (amountTwo.value * rateValue).toFixed(2);
        });
};

calculate1();

//Event listeners
amountOne.addEventListener("input", calculate1);
amountTwo.addEventListener("input", calculate2);
currencyOne.addEventListener("change", calculate1);
currencyTwo.addEventListener("change", calculate2);

swapButton.addEventListener("click", () => {
    let aux = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = aux;
    calculate1();
    calculate2();
})