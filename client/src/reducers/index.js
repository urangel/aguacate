import { combineReducers } from 'redux'
import { regionReducer } from './regionReducer'
import { previousSearchesReducer } from './previousSearchesReducer'
import { dataFocusReducer } from './dataFocusReducer'
import { hydrateRegionsReducer } from './hydrateRegionsReducer'
import { hydrateDataReducer } from './hydrateDataReducer'
import { typeReducer } from './typeReducer'

export default combineReducers({
  region: regionReducer,
  previousSearches: previousSearchesReducer,
  data_focus: dataFocusReducer,
  regions: hydrateRegionsReducer,
  data: hydrateDataReducer,
  type: typeReducer
})