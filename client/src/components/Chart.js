import React, { Component } from 'react'
import * as d3 from "d3"

export class Chart extends Component {
  constructor(props){
    super(props);
    this.state ={
      data : {}
    }
  }

  componentDidMount() {
    
  }
  //accomodate 50 data points
  drawPlot = () => {
    const h = window.innerHeight;
    const w = window.innerWidth;

    const xScale = d3.scaleLinear()
                    .domain([0, d3.max(this.state.data, )])

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
