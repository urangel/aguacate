import React, { Component } from 'react'
import Chart from "../components/Chart"
import API from "../util/API"
import About from "../components/About"
import { connect } from 'react-redux'
import { selectRegion } from "../actions/selectRegion"
import { addSearch } from '../actions/addSearch'
import RegionSelect from '../components/RegionSelect'

export class FieldSelection extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      regions: {},
      type: "",
      data_focus: "",
      data: {},
      previousSearches: []
    }

  }
  
  // componentDidMount() {
  //   this.getUniqueRegions();
  // }

  //State controlled input elements 
  handleChange = (e) => {
    //here instead do it with redux
    this.props.addNewRegion(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    }) 
    if (e.target.name === "region"){
      //upon region selection, the data is retreived from the DB
      //Here would be an easy way to dispatch
      //
      this.getData(e.target.value);
    }
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

  addSearch = (searchObject) => {
    this.setState({
      previousSearches: [...this.state.previousSearches, searchObject]
    });
    this.props.addNewSearch(searchObject.region, searchObject.data_focus, searchObject.type);
  }


  render() {
    return (
      <div>
        <div id="top-content">
        {/* <h1>Aguacate</h1> */}
          <div id="grid">
            <svg id="title-svg" viewBox="0 0 75 25">
              <text x="0" y="15">Aguacate</text>
            </svg>
            {/* Only display the About section on larger width screens as it takes up too much space otherwise */}
            {window.screen.width > 640 ? <About/> : <div></div>}
            <div id="previous-searches">
              {/* {this.state.previousSearches.map(each => {
                return <button>{`${each.region} ${each.data_focus} ${each.type}`}</button>
              })} */}
            </div>
          </div>
          
          {/* <Avocado/> */}
          <div id="select-div">
            {/* <select name="region" value={this.props.region} onChange={this.handleChange}>
              <option> -- Choose a Region -- </option>
              {Object.values(this.state.regions).map(region => <option key={region}>{region}</option>)}
            </select> */}
            <RegionSelect/>
            
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
        </div>
        
        <Chart 
          data={this.props.data} 
          region={this.props.region} 
          type={this.state.type.toLocaleLowerCase()} 
          data_focus={this.state.data_focus}
          addSearch={(searchObject) => this.addSearch(searchObject)}
        />
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    region: state.region,
    previousSearches: state.previousSearches,
    data: state.data[state.data.length-1]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRegion: (region) => {
      dispatch(selectRegion(region))
    },
    addNewSearch: (region, data_focus, type) => {
      dispatch(addSearch((region, data_focus, type)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldSelection);