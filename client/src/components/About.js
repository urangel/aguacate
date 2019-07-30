import React from 'react'

function About() {
  return (
    <div>
      <h2>About</h2>
      <p id="about-text">
        Ever wondered how much love there is for avocados in different places? Wonder no more!
        <br></br>
        Aguacate allows you to visualize retail volume and price data for avocados from different regions over time.
        <br></br>
        Data is sourced from <a href="https://kaggle.com/neuromusic/avocado-prices" target="__blank">Kaggle</a> and visualization is done with <a href="https://d3js.org/" target="__blank">D3.js</a>.
      </p>
    </div>
  )
}

export default About
