import React, { Component } from 'react'
import API from "../util/API"

export class FieldSelection extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      region: ""
    }
    this.getUniqueRegions = this.getUniqueRegions.bind(this);
  }

  getUniqueRegions = () => {
    API.getRegions()
      .then( res =>{
        console.log(res);
      })
      .catch("whoops");
  }

  componentDidMount() {
    this.getUniqueRegions();
  }

  render() {
    return (
      <div>
        <select>
          <option> -- Choose a Region -- </option>

        </select>
        
        <select>
          <option> -- Choose a Type -- </option>
          <option>4046</option>
          <option>4225</option>
          <option>4770</option>

        </select>
        
        {/* <select>
          <option>Default</option>

        </select> */}
        
      </div>
    )
  }
}

export default FieldSelection
