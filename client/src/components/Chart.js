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

    let len = Object.values(this.props.data).length;
    let average_price = Object.values(this.props.data).map( obj => obj.average_price);
    let date =  Object.values(this.props.data).map( obj => obj.date);
    let tuples = [];
    
    //IIFE changes my data to be plotted into format [[x1,y1],[x2,y2],[x3,y3],...[xn,yn]]
    (() => {
      for (let i = 0; i < len; i++){
        let pair = [date[i], average_price[i]];
        tuples.push(pair);
      }
    })();

    const parseDate = d3.timeFormat("%x");
    console.log(Date.parse(date[0]));
    console.log(new Date(2000, 0, 1));
    console.log(date[0]);
    console.log(parseDate(date[0]));

    const xScale = d3.scaleLinear()
                    .domain([0, len])
                    .range([padding, w - padding]);
    

    // const xScale = d3.scaleTime()
    //                   .domain(d3.extent(date, d => d))
    //                   .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([d3.min(average_price), d3.max(average_price)])
                    .range([h - padding, padding]);

    const line = d3.line()
                    .x((d,i) => xScale(i))
                    .y(d => yScale(d[1]));

    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
    
    svg.append("rect")
        .attr("width", w - padding - padding)
        .attr("height", h - padding - padding)
        .attr("fill", "#eee")
        .attr("transform", "translate(50, 50)");

    svg.selectAll("circle")
        .data(tuples)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d[1]))
        .attr("r", 3)
        .attr("class", "point")
        .append("title")
        .text(d => d[0] + ", " + d[1])
        .attr("class", "tooltip")
        .style("opacity", 0)
        .append("path")
        .attr("class", "line")
        .datum(tuples)
        .attr("d", line);

    const xAxis = d3.axisBottom(xScale).ticks(0);
    const yAxis = d3.axisLeft(yScale);
   

    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .attr("class", "axis")
       .call(xAxis);

    svg.append("g")
       .attr("transform", "translate(50, 0)")
       .attr("class", "axis")
       .call(yAxis);
    
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
        <button onClick={this.drawPlot}>Plot</button>
      </div>
    )
  }
}

export default Chart
