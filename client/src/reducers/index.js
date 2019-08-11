import { combineReducers } from 'redux'
import { regionReducer } from './regionReducer'
import { previousSearchesReducer } from './previousSearchesReducer'

export default combineReducers({
  regionReducer,
  previousSearchesReducer
})