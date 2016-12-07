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
            //просто articleState.updateIn([payload.articleId, 'comments'], comments => comments.push(payload.commentId))
            let art = articlesState.get(payload.articleId)
            let lst = art.get('comments').push(payload.commentId)
            art = art.set('comments', lst)

            return articlesState.set(payload.articleId, art)
        }
    }

    return articlesState
}

export default arcticleReducer
