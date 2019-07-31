import React from 'react'
import * as d3 from "d3"

export const Chart = (props) => {
  
  const update = () => {
    document.getElementById("tooltip").remove();
    const plot_svg = document.getElementById("plot-svg");
    const rect = plot_svg.getBoundingClientRect();
    const h = rect.height;
    const w = document.getElementById("chart").offsetWidth;
    const padding = 75;

    let searchObject = {
      region: props.region,
      data_focus: props.data_focus,
      type: props.type === "" ? "conventional" : props.type
    }

    props.addSearch(searchObject);

    let values;
    let filtered_data = props.data.filter(obj => {
      if(props.type === ""){
        return obj.type === "conventional";
      } else {
        return obj.type === props.type;
      }
    });
    let len = filtered_data.length;

    switch (props.data_focus){
      case "Average Price": 
        values = Object.values(filtered_data).map( obj => obj.average_price);
        break;
      case "4046 - Total SM Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4046));
        break;
      case "4046 - Total SM Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.small_bags));
        break;
      case "4225 - Total LG Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4225));
        break;
      case "4225 - Total LG Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.large_bags));
        break;
      case "4770 - Total XL Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4770));
        break;
      case "4770 - Total XL Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4770));
        break;
      case "Total Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.total_volume));
        break;
      case "Total Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.total_bags));
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

    const make_grid = (scale, axis) => {
      if (axis === "x"){
        return d3.axisBottom(scale);
      } else {
        return d3.axisLeft(scale)
        .ticks(50)
      }
    }
    
    const formatTime = d3.timeFormat("%B %d, %Y");

    const valuesExtent = d3.extent(values, d => d);

    const dateExtent = d3.extent(date, d => d);

    const plotAdjuster = (valuesExtent[1] -  valuesExtent[0]) / 10;

    const xScale = d3.scaleTime()
                      .domain([
                        new Date(Date.parse(dateExtent[0]) - 2628000000), 
                        new Date(Date.parse(dateExtent[1]) + 2628000000)
                      ])
                      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([d3.min(values) - plotAdjuster, 
                            d3.max(values) + plotAdjuster])
                    .range([h - padding, padding]);

    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select("#plot-svg");

    const tooltip = d3.select("body")
                      .append("div")
                      .attr("class", "tooltip")
                      .attr("id", "tooltip")
                      .style("opacity", 0)
                      .style("display", "none");

    svg.selectAll("circle")
        .data(tuples)
        .transition()
        .duration(750)
        .attr("cx", (d, i) => xScale(d[0]))
        .attr("cy", d => yScale(d[1]));

    svg.selectAll("circle").on("mouseover", d => {
      tooltip.transition()
            .duration(300)
            .style("display", "block")
            .style("opacity", 0.9);
            
      tooltip.html(formatTime(d[0]) + " - " + d[1])
            .style("left", (d3.event.pageX + 25) + "px")
            .style("top", (d3.event.pageY - 25) + "px");
    })
    .on("mouseout", d =>{
      tooltip.transition()
            .duration(600)
            .style("opacity", 0)
            .style("display", "none");
    });

    svg.select(".y.axis")
      .transition()
      .duration(750)
      .attr("transform", "translate(75, 0)")
      .call(yAxis);

    svg.select(".y.grid")			
      .transition()
      .duration(750)
      .attr("transform", "translate(75, 0)")
      .call(make_grid(yScale, "y")
      .tickSize(-(w-(2*padding)))
      .tickFormat("")
      )
  }

  const drawPlot = () => {
    const h = document.getElementById("chart").offsetHeight - 75;
    const w = document.getElementById("chart").offsetWidth;
    const padding = 75;
    let searchObject = {
      region: props.region,
      data_focus: props.data_focus,
      type: props.type === "" ? "conventional" : props.type
    }

    props.addSearch(searchObject);

    
    let values;
    let filtered_data = props.data.filter(obj => {
      if(props.type === ""){
        return obj.type === "conventional";
      } else {
        return obj.type === props.type;
      }
    });
    let len = filtered_data.length;

    switch (props.data_focus){
      case "Average Price": 
        values = Object.values(filtered_data).map( obj => obj.average_price);
        break;
      case "4046 - Total SM Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4046));
        break;
      case "4046 - Total SM Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.small_bags));
        break;
      case "4225 - Total LG Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4225));
        break;
      case "4225 - Total LG Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.large_bags));
        break;
      case "4770 - Total XL Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4770));
        break;
      case "4770 - Total XL Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj._4770));
        break;
      case "Total Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.total_volume));
        break;
      case "Total Bags Sold":
        values = Object.values(filtered_data).map( obj => parseInt(obj.total_bags));
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

    const make_grid = (scale, axis) => {
      if (axis === "x"){
        return d3.axisBottom(scale);
      } else {
        return d3.axisLeft(scale)
        .ticks(50)
      }
    }
    
    const formatTime = d3.timeFormat("%B %d, %Y");

    const valuesExtent = d3.extent(values, d => d);

    const dateExtent = d3.extent(date, d => d);

    const plotAdjuster = (valuesExtent[1] -  valuesExtent[0]) / 10;

    const xScale = d3.scaleTime()
                      .domain([
                        new Date(Date.parse(dateExtent[0]) - 2628000000), 
                        new Date(Date.parse(dateExtent[1]) + 2628000000)
                      ])
                      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([d3.min(values) - plotAdjuster, 
                            d3.max(values) + plotAdjuster])
                    .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .attr("id", "plot-svg");

    const tooltip = d3.select("body")
                      .append("div")
                      .attr("class", "tooltip")
                      .attr("id", "tooltip")
                      .style("opacity", 0)
                      .style("display", "none");
                      
    svg.append("rect")
        .attr("width", w - padding - padding)
        .attr("height", h - padding - padding)
        .attr("fill", "#eee")
        .attr("transform", "translate(75, 75)")
        .attr("id", "plot-background");

    const point = svg.selectAll("circle")
        .data(tuples)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(d[0]))
        .attr("cy", d => yScale(d[1]))
        .attr("r", window.screen.width > 768 ? 4 : 2)
        .attr("class", "point");

    point.on("mouseover", d => {
      tooltip.transition()
            .duration(300)
            .style("display", "block")
            .style("opacity", 0.9);
            
      tooltip.html(formatTime(d[0]) + " - " + d[1])
            .style("left", (d3.event.pageX + 25) + "px")
            .style("top", (d3.event.pageY - 25) + "px");
    })
    .on("mouseout", d =>{
      tooltip.transition()
            .duration(600)
            .style("opacity", 0)
            .style("display", "none");
    });

    if(window.screen.width > 768){
      svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .attr("class", "x axis")
      .call(xAxis);
    } else {
      svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .attr("class", "x axis")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
    }

    svg.append("g")
       .attr("transform", "translate(75, 0)")
       .attr("class", "y axis")
       .call(yAxis);
    

    svg.append("g")			
      .attr("class", "x grid")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(make_grid(xScale, "x")
          .tickSize(-(h-(2*padding)))
          .tickFormat("")
      )

    svg.append("g")			
      .attr("class", "y grid")
      .attr("transform", "translate(75, 0)")
      .call(make_grid(yScale, "y")
          .tickSize(-(w-(2*padding)))
          .tickFormat("")
      )
    
    document.getElementById("plot-button").style.display = "none";
    document.getElementById("update-button").style.display = "block";

  }

  

    return (
      <div id="chart">
        <button id="plot-button" onClick={drawPlot}>Plot</button>
        <button id="update-button" onClick={update}>Update</button>
        <h3>
          {props.type.length > 1 ? 
          props.type.charAt(0).toUpperCase() + props.type.slice(1) + " ": 
          "Conventional "} 
          {props.data_focus.length > 1 ? 
            (props.data_focus.charAt(0) === "4" ? 
            props.data_focus.slice(7, props.data_focus.length) :
            props.data_focus) :
          "Average Price"}  in
          {" " + props.region + " "} 
          Over Time
        </h3>
      </div>
    )
  }


export default Chart