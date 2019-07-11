import React, { Component } from 'react'
import * as d3 from "d3"

export class Chart extends Component {
  constructor(props){
    super(props);
    this.drawPlot = this.drawPlot.bind(this);
  }

  // componentDidMount() {
    
  // }

  // componentDidUpdate(prevProps){
  //   if( typeof prevProps.data[0].average_price !== undefined && 
  //       prevProps.data[0].average_price !== this.props.data[0].average_price){
  //   }
  // }
  drawPlot = () => {
    const h = document.getElementById("chart").offsetHeight;
    const w = document.getElementById("chart").offsetWidth;
    const padding = 50;

    console.log(h + " " + w);

    let len = Object.values(this.props.data).length;
    let average_price = Object.values(this.props.data).map( obj => obj.average_price);
    let date =  Object.values(this.props.data).map( obj => obj.date);
    let tuples = [];

    let dataset = () => {
      for (let i = 0; i < len; i++){
        let pair = [date[i], average_price[i]];
        tuples.push(pair);
      }
    }

    dataset();

    const xScale = d3.scaleLinear()
                    .domain([0, len])
                    .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([d3.min(average_price), d3.max(average_price)])
                    .range([h - padding, padding]);



    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("circle")
        .data(tuples)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d[1]))
        .attr("r", 2)
        .attr("class", "point")
        .append("title")
        .text(d => d[0] + ", " + d[1]);

    // svg.selectAll("text")
    //     .data(tuples)
    //     .enter()
    //     .append("text")
    //     .text( d => d[1])
    //     .attr("x", (d, i) => xScale(i) + 10)
    //     .attr("y", d => yScale(d[1]));
  }

  render() {

    return (
      <div id="chart">
        <h3>Chart</h3>
        <button onClick={this.drawPlot}>Log Data</button>
      </div>
    )
  }
}

export default Chart
