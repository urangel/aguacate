import React, { Component } from 'react'
import Chart from "../components/Chart"
import API from "../util/API"
import About from "../components/About"
import { connect } from 'react-redux'
import { selectRegion } from "../actions/selectRegion"
import { addSearch } from '../actions/addSearch'
import { hydrateData } from '../actions/hydrateData'
import { selectDataFocus } from '../actions/selectDataFocus'
import { selectType } from '../actions/selectType'


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
  
  componentDidMount() {
    this.getUniqueRegions();
  }

  //State controlled input elements, now through redux
  //Switch routes to appropriate action dispatch based on the select element interacted with 
  handleChange = (e) => {
    switch(e.target.name){
      case 'region':
        this.props.addNewRegion(e.target.value);
        this.getData(e.target.value);
        break;
      case 'data_focus':
        this.props.selectDataFocus(e.target.value);
        break;
      case 'type':
        this.props.selectType(e.target.value);
        break;        
      default:
        console.log("How'd this happen?");
        break;
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
        this.props.hydrateData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addSearch = (searchObject) => {
    // this.setState({
    //   previousSearches: [...this.state.previousSearches, searchObject]
    // });
    this.props.addNewSearch(searchObject);
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

          <div id="select-div">

            <select id='region-select' name="region" value={this.props.region} onChange={this.handleChange}>
              <option> -- Choose a Region -- </option>
              {Object.values(this.state.regions).map(region => <option key={region}>{region}</option>)}
            </select>
            
            <select id='data-focus-select' name="data_focus" value={this.props.data_focus} onChange={this.handleChange}>
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


            <select id='type-select' name="type" value={this.props.type} onChange={this.handleChange}>
              <option>Conventional</option>
              <option>Organic</option>
            </select>

          </div>
        </div>
        
        <Chart 
          data={this.props.data} 
          region={this.props.region} 
          type={this.props.type.toLocaleLowerCase()} 
          data_focus={this.props.data_focus}
          addSearch={(searchObject) => this.addSearch(searchObject)}
        />
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    region: state.region[state.region.length-1],
    previousSearches: state.previousSearches,
    data: state.data[state.data.length-1],
    data_focus: state.data_focus[state.data_focus.length-1],
    type: state.type[state.type.length-1]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRegion: (region) => {
      dispatch(selectRegion(region))
    },
    addNewSearch: (region, data_focus, type) => {
      dispatch(addSearch((region, data_focus, type)))
    },
    hydrateData: data => {
      dispatch(hydrateData(data))
    },
    selectDataFocus: data_focus => {
      dispatch(selectDataFocus(data_focus))
    },
    selectType: type => {
      dispatch(selectType(type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldSelection);