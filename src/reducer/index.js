import { combineReducers } from 'redux'
import articleReducer from './articles'
import comments from './comments'
import counterReducer from './counter'
import filters from './filters'
import {localizationReducer} from './global'

export default combineReducers({
    articles: articleReducer,
    count: counterReducer,
    filters, comments,
    localization: localizationReducer
})