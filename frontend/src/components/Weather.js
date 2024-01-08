import React from 'react';
import { useState } from 'react';
import axios from "../Axios"
import { weather } from '../constants/Constants';
import Swal from "sweetalert2";



const Weather = () => {

  const [search, setSearch] = useState("");

  const AddWeather = (e) => {
    e.preventDefault()

    const headers = {
      "Content-Type": "application/json" 
    }

    const body = JSON.stringify({
      username,
      email,
      password,
      firstname,
      lastname
    });

    axios.post(weather, body, {headers: headers})
      .then((response)=>{
        if (response.status == 200){
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
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.response.data,
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
        <input onChange={(e) => { setSearch(e.target.value); }} type="text" placeholder="Search city..." required />
        <button className="add-city-button">Add More +</button>
      </form>
      <ul className="city-list">
        <li className="city">citys</li>
      </ul>
    </header>



    <section className="forecast-section">
      <h2>Citys</h2>
      <div className="forecast-cards">
        <div className="forecast-card">
          <h3>Citys</h3>
        </div>
      </div>
    </section>



    <section className="forecast-section">
      <h2>Forecast</h2>
      <div className="forecast-cards">
        <div className="forecast-card">
          <h3>date</h3>
          <div className="weather-icon">

          </div>
          <p className="temperature">temperature°C</p>
        </div>
      </div>
    </section>

  </div>
  );
};

export default Weather;