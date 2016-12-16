import { combineReducers } from 'redux'
import articleReducer from './articles'
import comments from './comments'
import counterReducer from './counter'
import filters from './filters'
import commentsPaginator from './commentsPaginator'

export default combineReducers({
    articles: articleReducer,
    count: counterReducer,
    filters, comments, commentsPaginator
})