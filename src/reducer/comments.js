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

const defaultState = new ReducerState({
    entities: arrayToMap([], CommentModel),
    loading: false
})

export default (comments = defaultState, action) => {
    const { type, payload, response, error, generatedId } = action

    switch (type) {
          //здесь не достаточно повесить loading на весь comments, ведь ты для конкрентной статьи загружаешь
        case LOAD_ARTICLE_COMMENTS + START:
            return comments.set('loading', true)

        case LOAD_ARTICLE_COMMENTS + FAIL:
            return comments.set('loading', false)

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments
                .set('loading', false)
                .update('entities', ent => ent.merge(arrayToMap(response, CommentModel)))                

        case ADD_ARTICLE_COMMENT + START:
            //return comments.set('loading', true)
            return comments
            
        case ADD_ARTICLE_COMMENT + FAIL:
            //return comments.set('loading', false)
            return comments

        case ADD_ARTICLE_COMMENT + SUCCESS:        
            return comments
                .setIn(['entities', response.comment.id], new CommentModel(response.comment))
                //.set('loading', false)
    }

    return comments
}
