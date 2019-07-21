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
    let values;
    let filtered_data = this.props.data.filter(obj => obj.type == this.props.type);

    switch (this.props.data_focus){
      case "Average Price": 
        values = Object.values(filtered_data).map( obj => obj.average_price);
        break;
      case "4046 - Total SM Sold":
        values = Object.values(filtered_data).map( obj => obj._4046);
        break;
      case "4046 - Total SM Bags Sold":
          values = Object.values(filtered_data).map( obj => obj.small_bags);
          break;
      case "4225 - Total LG Sold":
        values = Object.values(filtered_data).map( obj => obj._4225);
        break;
      case "4225 - Total LG Bags Sold":
        values = Object.values(filtered_data).map( obj => obj.large_bags);
        break;
      case "4770 - Total XL Sold":
        values = Object.values(filtered_data).map( obj => obj._4770);
        break;
      case "4770 - Total XL Bags Sold":
        values = Object.values(filtered_data).map( obj => obj._4770);
        break;
      case "Total Sold":
        values = Object.values(filtered_data).map( obj => obj.total_volume);
        break;
      case "Total Bags Sold":
        values = Object.values(filtered_data).map( obj => obj.total_bags);
        break;
      default: 
        values = Object.values(filtered_data).map( obj => obj.average_price);
        break;

      };



    let date =  Object.values(filtered_data).map( obj => new Date(obj.date));
    let tuples = [];
    
    //IIFE changes my data to be plotted into format [[x1,y1],[x2,y2],[x3,y3],...[xn,yn]]
    (() => {
      for (let i = 0; i < len; i++){
        let pair = [date[i], values[i]];
        tuples.push(pair);
      }
    })();

  let make_grid = (scale, axis) => {
    if (axis === "x"){
      return d3.axisBottom(scale);
    } else {
      return d3.axisLeft(scale)
      .ticks(50)
    }
  }

    // const parseDate = d3.timeFormat("%x");
    // console.log(Date.parse(date[0]));
    // console.log(new Date(date[0]));
    console.log(date[0]);
    // console.log(parseDate(date[0]));

    // const xScale = d3.scaleLinear()
    //                 .domain([0, len])
    //                 .range([padding, w - padding]);
    

    const xScale = d3.scaleTime()
                      .domain(d3.extent(date, d => d))
                      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([d3.min(values), d3.max(values)])
                    .range([h - padding, padding]);

    // const line = d3.line()
    //                 .x((d,i) => xScale(i))
    //                 .y(d => yScale(d[1]));

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
        .attr("cx", (d, i) => xScale(d[0]))
        .attr("cy", d => yScale(d[1]))
        .attr("r", 4)
        .attr("class", "point")
        .append("title")
        .attr("class", "tooltip")
        .text(d => d[0] + ", " + parseInt(d[1]));
        // .append("path")
        // .attr("class", "line")
        // .datum(tuples)
        // .attr("d", line);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
   

    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .attr("class", "axis")
       .call(xAxis);

    svg.append("g")
       .attr("transform", "translate(50, 0)")
       .attr("class", "axis")
       .call(yAxis);
    

    svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(make_grid(xScale, "x")
          .tickSize(-(h-(2*padding)))
          .tickFormat("")
      )

      svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(50, 0)")
      .call(make_grid(yScale, "y")
          .tickSize(-(w-(2*padding)))
          .tickFormat("")
      )
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
