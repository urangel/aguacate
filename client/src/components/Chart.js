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
    const h = document.getElementById("#chart").offsetHeight;
    const w = document.getElementById("#chart").offsetWidth;

    const xScale = d3.scaleLinear()
                    .domain([0, d3.max( Object.values(this.props.data).map( obj => obj.average_price) )])



    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("circle")
        .data(this.props.values)
  }

  render() {

    return (
      <div id="chart">
        <h3>Chart</h3>
      </div>
    )
  }
}

export default Chart
