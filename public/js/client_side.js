let formElement = document.querySelector('form');
let userValue = document.querySelector('input');
let messageOne = document.querySelector('#message-one');
let messageTwo = document.querySelector('#message-two');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading ...(wait dude not a super H00MAN!!!)';
    messageTwo.textContent = ''

    fetch('/weather?address=' + userValue.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }
            console.log(data.Forecast);


            let forecastText = 'The current temp is ' + data.Forecast.temp + ' and the feels like temperature is ' + data.Forecast.feelslike + ' and the forecast is ' + data.Forecast.forecast
            messageOne.textContent = forecastText;
            messageTwo.textContent = data.Location;




        })
    })



})