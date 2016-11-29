import { combineReducers } from 'redux'
import articleReducer from './articles'
import counterReducer from './counter'
import {titleFilterReducer, dateFilterReducer} from './filters'

export default combineReducers({
    articles: articleReducer,
    count: counterReducer,

    titles: titleFilterReducer,
    dateFilter: dateFilterReducer    
})