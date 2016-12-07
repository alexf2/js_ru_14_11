import { DELETE_ARTICLE, ADD_ARTICLE_COMMENT } from '../constants'

export function deleteArticle( articleId) {
    return {
        type: DELETE_ARTICLE,
        payload: {
            articleId
        }
    }
}

export function addComment(articleId, user, comment) {
    return {
        type: ADD_ARTICLE_COMMENT,
        payload: {
            articleId,
            user,
            comment
        }
    }
}