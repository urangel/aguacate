import React, { Component } from 'react'
import API from "../util/API"
import { connect } from 'react-redux'
import { selectRegion } from "../actions/selectRegion"
// import { addSearch } from '../actions/addSearch'
import { hydrateRegions } from '../actions/hydrateRegions'
import { hydrateData } from '../actions/hydrateData'
import { store } from '../index'

export class RegionSelect extends Component {
  constructor(props){
    super(props);

    this.state = {
      regions: {}
    }
  }

  componentDidMount() {
    this.getUniqueRegions();
  }

  //State controlled input elements 
  handleChange = (e) => {
    //here instead do it with redux
    this.props.addNewRegion(e.target.value);
    // this.setState({
    //   [e.target.name]: e.target.value
    // }) 
    this.getData(e.target.value);
    console.log(store.getState());
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
        // this.setState({
        //   data: res.data
        // })
        this.props.hydrateData(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <select name="region" value={this.props.region[this.props.region.length-1]} onChange={this.handleChange}>
            <option> -- Choose a Region -- </option>
            {Object.values(this.state.regions).map(region => <option key={region}>{region}</option>)}
          </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    regions: state.regions,
    region: state.region,
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRegion: region => {
      dispatch(selectRegion(region))
    },
    // addNewSearch: (region, data_focus, type) => {
    //   dispatch(addSearch((region, data_focus, type)))
    // },
    hydrateRegions: regions => {
      dispatch(hydrateRegions(regions))
    },
    hydrateData: data => {
      dispatch(hydrateData(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionSelect);