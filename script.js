// "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
const apiKey = "d9bdabdfcb7f83c7c16e013a63857b68";
const countryInput = document.getElementById("countryInput");
const form = document.getElementById("form");
const icon = document.getElementById("icon");
const tempature = document.getElementById("tempature");
const details = document.getElementById("details");

form.weatherButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather();
});

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryInput.value}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  try {
    const iconData = data.weather[0].icon;
    const tempData = Math.floor(data.main.temp);
    const detailsData = [
      `
  <div>Hissedilen: ${Math.floor(data.main.feels_like)}</div>
  <div>Nem: ${data.main.humidity}%</div>
  <div>Rüzgar: ${data.wind.speed} m/s</div>
  `,
    ];
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconData}@2x.png" alt="icon_img">`;
    tempature.innerHTML = tempData + "°C";
    detailsData.map((item) => {
      details.innerHTML = item;
    });

    // console.log(data);
    // console.log(tempData);
    // console.log(detailsData);
    // console.log(iconData);
  } catch (error) {
    icon.innerHTML = "";
    tempature.innerHTML = "<p>Girilen Şehir/Ülke Hatalı.</p>";
    details.innerHTML = "";
  }
}
