// import React from 'react'
import { connect } from 'react-redux'
import { selectRegion } from "../actions/selectRegion"
import FieldSelection from "../components/FieldSelection"

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRegion: (region) => {
      dispatch(selectRegion(region))
    }
  }
}

export const Container =  connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldSelection);