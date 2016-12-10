import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_ARTICLE_COMMENT } from '../constants'
import immutable, {Map} from 'immutable'


const provisionArticles = normalizedArticles.reduce( (accum, art) => accum.set(art.id, immutable.fromJS(art)), new Map() )

const arcticleReducer = (articlesState = provisionArticles, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            //return articlesState.filter(article => article.id != payload.articleId)
            return articlesState.delete(payload.articleId)

        case ADD_ARTICLE_COMMENT: {
            /*let art = articlesState.get(payload.articleId)
            let lst = art.get('comments').push(payload.generateId.newId)
            art = art.set('comments', lst)

            return articlesState.set(payload.articleId, art)*/            

            return articlesState.updateIn([payload.articleId, 'comments'], comments => comments.push(action.generateId.newId))
        }
    }

    return articlesState
}

export default arcticleReducer
