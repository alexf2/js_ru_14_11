import { DELETE_ARTICLE, LOAD_ALL_ARTICLES, LOAD_ARTICLE_COMMENTS, ADD_ARTICLE_COMMENT, LOAD_ARTICLE, SUCCESS, FAIL, START } from '../constants'
import { arrayToMap, ReducerState } from '../utils'
import { Record, Map } from 'immutable'

const ArticleModel = Record({
    id: null,
    title: null,
    comments: [],
    text: null,
    date: null,
    loading: false,
    commentsState: 0 //0 - not loaded, 1 - loading, 2 - successfully loaded
})

const defaultArticles= arrayToMap([], ArticleModel)

const defaultState = new ReducerState({
    entities: defaultArticles,
    loading: false
})

export default (articlesState = defaultState, action) => {
    const { type, payload, generatedId, response } = action

    switch (type) {
        case DELETE_ARTICLE:        
            return articlesState.deleteIn(['entities', payload.articleId])        

        case LOAD_ALL_ARTICLES + START:
            return articlesState.set('loading', true)

        case LOAD_ALL_ARTICLES + FAIL:
            return articlesState.set('loading', false)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articlesState
                .set('entities', arrayToMap(response, ArticleModel))
                .set('loading', false)

        case LOAD_ARTICLE + START:
            return articlesState.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE + SUCCESS:
            return articlesState.setIn(['entities', payload.id], new ArticleModel(payload.article))

        case ADD_ARTICLE_COMMENT + SUCCESS:
            return articlesState.updateIn(['entities', payload.articleId, 'comments'],  cmd => cmd.concat(response.comment.id))

        case LOAD_ARTICLE_COMMENTS + START:
            return articlesState.setIn(['entities', payload.articleId, 'commentsState'], 1)

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return articlesState.setIn(['entities', payload.articleId, 'commentsState'], 2)

        case LOAD_ARTICLE_COMMENTS + FAIL:
            return articlesState.setIn(['entities', payload.articleId, 'commentsState'], 0)
    }

    return articlesState
}