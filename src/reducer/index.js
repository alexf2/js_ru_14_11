import { combineReducers } from 'redux'
import articleReducer from './articles'
import counterReducer from './counter'
import {titleFilterReducer, dateFilterFromReducer, dateFilterToReducer} from './filters'

export default combineReducers({
    articles: articleReducer,
    count: counterReducer,

    titles: titleFilterReducer,
    from: dateFilterFromReducer,
    to: dateFilterToReducer
})