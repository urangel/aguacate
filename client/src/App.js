import React, { Component } from 'react'
// import API from "./util/API"
import FieldSelection from "./components/FieldSelection"
import "./App.css"

export class App extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   regions: {},
    //   region: "",
    //   type: ""
    // }
    // this.getUniqueRegions = this.getUniqueRegions.bind(this);
  }

  

  render() {
    return (
      <div>
        {/* <FieldSelection regions={this.state.regions}/> */}
        <FieldSelection/>
      </div>
    )
  }
}

export default App
