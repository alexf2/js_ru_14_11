import { DELETE_ARTICLE, LOAD_ALL_ARTICLES, ADD_ARTICLE_COMMENT, LOAD_ARTICLE, SUCCESS, FAIL, START } from '../constants'
import { arrayToMap, ReducerState } from '../utils'
import { Record, Map } from 'immutable'

const ArticleModel = Record({
    id: null,
    title: null,
    comments: [],
    text: null,
    date: null,
    loading: false
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
    }

    return articlesState
}