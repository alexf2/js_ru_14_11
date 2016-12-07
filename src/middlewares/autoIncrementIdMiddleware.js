import { ADD_ARTICLE_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'

let commentCounter = normalizedComments.reduce( (a, b) => (a.id > b.id ? a:b)).id + 1

export default store => next => action => {    
    if (action.type === ADD_ARTICLE_COMMENT)
        action.payload.commentId = commentCounter++

    next(action)        
}