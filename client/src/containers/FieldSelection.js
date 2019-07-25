import React, { Component } from 'react'
import Chart from "../components/Chart"
import API from "../util/API"

export class FieldSelection extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      regions: {},
      region: "",
      type: "",
      data_focus: "",
      data: {}
    }

    this.getUniqueRegions = this.getUniqueRegions.bind(this);
    this.getData = this.getData.bind(this);

  }

  getUniqueRegions = () => {
    API.getRegions()
      .then( res => {
        this.setState({
          regions: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData = (region) => {
    API.getData(region)
      .then( res => {
        this.setState({
          data: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
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
    if (e.target.name === "region"){
      this.getData(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <h1>Aguacate</h1>
        <div id="select-div">
          <select name="region" value={this.state.region} onChange={this.handleChange}>
            <option> -- Choose a Region -- </option>
            {Object.values(this.state.regions).map(region => <option key={region}>{region}</option>)}
          </select>
          
          <select name="data_focus" value={this.state.data_focus} onChange={this.handleChange}>
            <option> -- Choose Data of Interest -- </option>
            <option>4046 - Total SM Sold</option>
            <option>4046 - Total SM Bags Sold</option>
            <option>4225 - Total LG Sold</option>
            <option>4225 - Total LG Bags Sold</option>
            <option>4770 - Total XL Sold</option>
            <option>4770 - Total XL Bags Sold</option>
            <option>Total Sold</option>
            <option>Total Bags Sold</option>
            <option>Average Price</option>
          </select>


          <select name="type" value={this.state.type} onChange={this.handleChange}>
            <option> -- Choose Type -- </option>
            <option>Conventional</option>
            <option>Organic</option>
          </select>
        </div>
        
        {/* <button onClick = { () => this.getData(this.state.region)}>Button</button> */}
        
        {/* <select>
          <option>Default</option>

        </select> */}
        <Chart data={this.state.data} region={this.state.region} type={this.state.type.toLocaleLowerCase()} data_focus={this.state.data_focus}/>
        
      </div>
    )
  }
}

export default FieldSelection
