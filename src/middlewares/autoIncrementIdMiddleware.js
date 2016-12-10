import { ADD_ARTICLE_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'

export default store => next => action => {
      
    if (!action.generateId)
        return next(action)

    next({
        ...action, generateId: {newId: action.generateId.currentMaxId + 1} 
    })
}
