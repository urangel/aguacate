import React, { Component } from 'react'
// import API from "./util/API"
import FieldSelection from "./components/FieldSelection"
import "./App.css"

export class App extends Component {
  constructor(props){
    super(props);
  }

  

  render() {
    return (
      <div>
        <FieldSelection/>
      </div>
    )
  }
}

export default App
