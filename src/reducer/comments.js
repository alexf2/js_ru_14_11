import { LOAD_ARTICLE_COMMENTS, ADD_ARTICLE_COMMENT, SUCCESS, FAIL, START } from '../constants'
import { normalizedComments } from '../fixtures'
import { arrayToMap, ReducerState} from '../utils'
import { Record, Map } from 'immutable'

const CommentModel = Record({
    id: null,
    user: null,    
    text: null,
    date: null    
})

const defaultState = arrayToMap([], CommentModel)

export default (comments = defaultState, action) => {
    const { type, payload, response, error, generatedId } = action

    switch (type) {
        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments.merge(arrayToMap(response, CommentModel))

        case ADD_ARTICLE_COMMENT + START:
            return comments
            
        case ADD_ARTICLE_COMMENT + FAIL:            
            return comments

        case ADD_ARTICLE_COMMENT + SUCCESS:        
            return comments.set(response.comment.id, new CommentModel(response.comment))                
    }

    return comments
}
