import React, { Component } from 'react'
import Chart from "./Chart"
import API from "../util/API"

export class FieldSelection extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      regions: {},
      region: "",
      type: "",
      data: {}
    }
    this.getUniqueRegions = this.getUniqueRegions.bind(this);
    this.getData = this.getData.bind(this);


  }

  getUniqueRegions = () => {
    API.getRegions()
      .then( res =>{
        this.setState({
          regions: res.data
        })
      })
      .catch("whoops");
  }

  getData = (region, type) => {
    let queryType = '_' + type;
    API.getData(region, queryType)
      .then( res => {
        this.setState({
          data: res.data
        })
        console.log(res.data)
      })
  }

  componentDidMount() {
    this.getUniqueRegions();
  }

  componentDidUpdate(){
    // if(Object.keys(this.state.data).length < 1 ){
    //   this.getData(this.state.region, this.state.type);
    // }
    // this.getData(this.state.region, this.state.type);
  }

  // componentWillReceiveProps() {
  //   console.log("new props received!");
  // }

  handleChange = (e) => {
    let {name, value} = e.target;
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }

  render() {
    return (
      <div>
        <select name="region" value={this.state.region} onChange={this.handleChange}>
          <option> -- Choose a Region -- </option>
          {Object.values(this.state.regions).map(region => <option key={region}>{region}</option>)}
        </select>
        
        <select name="type" value={this.state.type} onChange={this.handleChange}>
          <option> -- Choose a Type -- </option>
          <option>4046</option>
          <option>4225</option>
          <option>4770</option>

        </select>

        <button onClick = {() => this.getData(this.state.region, this.state.type)}>Button</button>
        
        {/* <select>
          <option>Default</option>

        </select> */}
        <Chart data={this.state.data}/>
        
      </div>
    )
  }
}

export default FieldSelection
