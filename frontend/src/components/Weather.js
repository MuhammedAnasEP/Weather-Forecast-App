import React from 'react';
import { useState, useEffect } from 'react';
import axios from "../Axios"
import { weather, searchList } from '../constants/Constants';
import Swal from "sweetalert2";



const Weather = () => {

  const [search, setSearch] = useState("");
  const [newWeather, setNewweather] = useState();
  const [weatherList, setWeatherList] = useState()
  const [weatherAllList, setWeatherAllList] = useState()

  useEffect(()=>{
    getWeatherList()
    getWeatherAllInfo()
},[])

const getWeatherAllInfo = () => {
  const storedWeather = localStorage.getItem("weatherData") || "[]";
  const parsedWeather = JSON.parse(storedWeather);
  setWeatherAllList(parsedWeather);
};

function getWeatherList() {
    axios.get(searchList).then((response) => {
        setWeatherList(response.data)
        console.log(response.data)
    })
   
}


  const AddWeather = (e) => {
    e.preventDefault()

    const headers = {
      "Content-Type": "application/json" 
    }

    const body = JSON.stringify({
      name: search
    });

    axios.post(weather, body, {headers: headers})
      .then((response)=>{
        setSearch("")
        if (response.status === 200){
          const storedWeather = localStorage.getItem("weatherData") || "[]";
          const parsedWeather = JSON.parse(storedWeather);
          parsedWeather.push(response.data);
          localStorage.setItem("weatherData", JSON.stringify(parsedWeather));
            setNewweather(response.data)
            getWeatherList()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "The city is added",
              showConfirmButton: false,
              timer: 2000,
          });
        }
      }).catch((error)=>{
        if (error){
          console.log(error)
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })

  }

  const updateWeather = ( names ) =>{
    const headers = {
      "Content-Type": "application/json" 
    }

    const body = JSON.stringify({
      name: names
    });
    axios.post(weather, body, {headers: headers})
      .then((response)=>{
        if (response.status === 200){
            setNewweather(response.data)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "The city is added",
              showConfirmButton: false,
              timer: 2000,
          });
          console.log(response.data)
        }
      }).catch((error)=>{
        if (error){
          console.log(error)
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })

  }

  return (<div>

    <header className="header">
      <h1>Weather Forecast</h1>
      <form onSubmit={AddWeather}>
        <input onChange={(e) => { setSearch(e.target.value); }} values={search} type="text" placeholder="Search city..." required />
        <button className="add-city-button">Add More +</button>
      </form>
      <div className='List'>
        <h3 className='city-head'>Stored Citys</h3>
        <ul className="city-list">
          {weatherList?.map((city)=>(

          <li onClick={() => updateWeather(city.name)} className="city">{city.name}</li>
          ))}
        </ul>
      </div>
    </header>




    {newWeather ? <section className="forecast-section">
      <h2>Forecast</h2>
      <div className="forecast-cards">
      <div className="forecast-card" >
        <h3>{newWeather.name}</h3>
        <p className="temperature">{newWeather.temperature}°C</p>
      </div>

      </div>
    </section> : <></>}

    <section className='forecast-section'>
      <h2> Old Search </h2>
      {
        weatherAllList?.map((info)=>(
          <div className="forecast-cards" >
          <div className="forecast-card" >
            <h3>{info.name}</h3>
            <p className="temperature">{info.temperature}°C</p>
          </div>

      </div>
        ))
      }
    </section>
  </div>


  );
};

export default Weather;