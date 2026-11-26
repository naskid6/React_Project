import { useState } from "react";
import "./App.css"
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const api_key = 'ff7c16732c05359e7475d0a3ac8b8243';

function Weather() {
  const [city, setCity] = useState('')
  const [temp, setTemp] = useState('--°C')
  const [weather, setWeather] = useState('--')
  const [wind, setWind] = useState('--')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [barData, setBarData] = useState(null)
  const [pieData, setPieData] = useState(null)

  function getWeather(city) {
    setLoading(true)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},NG&appid=${api_key}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        if (Number(data.cod) !== 200) {
          alert("fetching not successful")
          return
        }
        setTemp(data.main.temp + '°C')
        setWeather(data.weather[0].main)
        setWind(data.wind.speed + 'm/s')
        setSearch(city)
      }).catch(() => {
        setLoading(false)
        alert("internet error")
      })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},NG&appid=${api_key}&units=metric`)
      .then(response => response.json())
      .then(data => {

        let days = [];
        let temps = [];
        let weatherCount = { Clear: 0, Clouds: 0, Rain: 0, Others: 0 };

        for (let i = 0; i < data.list.length; i += 8) {
          const result = data.list[i];
          const date = new Date(result.dt * 1000);

          days.push(date.toLocaleDateString('en-NG', { weekday: 'short' }));
          temps.push(result.main.temp);

          let condition = result.weather[0].main;
          if (weatherCount[condition] !== undefined) {
            weatherCount[condition]++;
          } else {
            weatherCount.Others++;
          }
        }

        // Bar chart data
        setBarData({
          labels: days,
          datasets: [{
            label: 'Temp °C',
            data: temps,
            backgroundColor: '#007bff'
          }]
        });

        // Pie chart data
        setPieData({
          labels: ['Clear', 'Clouds', 'Rain', 'Others'],
          datasets: [{
            data: [
              weatherCount.Clear,
              weatherCount.Clouds,
              weatherCount.Rain,
              weatherCount.Others
            ],
            backgroundColor: ['#FFC107', '#6c757d', '#007bff', '#28a745']
          }]
        });

      });
  }

  function handleSearch() {
    if (city.trim() !== "") {
      getWeather(city)
      setCity("")
    } else {
      alert("please Enter A state or city")
    }
  }

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="type state or city "
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
        />
        <button onClick={handleSearch}>
          {loading ? "Searching..." : "search"}
        </button>
      </div>

      {search && <h3>Weather in {search}</h3>}

      <div className="cards">
        <div className="card">
          <h3>Temperature</h3>
          <p>{temp}</p>
        </div>

        <div className="card">
          <h3>Weather</h3>
          <p>{weather}</p>
        </div>

        <div className="card">
          <h3>Wind</h3>
          <p>{wind}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>Temperature in 5 days</h3>
          {barData && <Bar data={barData} />}
        </div>
        <div className="chart-box">
          <h3>Weather Type</h3>
          {pieData && <Pie data={pieData} />}
        </div>
      </div>

    </div>
  )
}

export default Weather