const apikey = 'e47703bfbfc7d626e1afbff6e56e1201';
document.getElementById('getWeatherBtn').addEventListener('click', function(){
  const city = document.getElementById('cityInput').value;
  if(city){
  fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
  .then(function (response) {
    return response.json();  // Convert the response to JSON
  })
  .then(function(data){
    extract(data);
  })
  .catch(function (error) {
    console.error('Error:', error);  // Handle any errors
  });
  }else{
    alert('Enter city name!')
  }
  
});

function extract(data) {
  if (data.cod == 200) {
    const weatherdescription = data.weather[0].description
    const temperature = data.main.temp;
    const humidity = data.main.humidity;


    document.getElementById('weatherDisplay').innerHTML= 
    `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${weatherdescription}</p>
            <p>Humidity: ${humidity}%</p>
        `;
  }else{
    alert('City not found!');
}}


