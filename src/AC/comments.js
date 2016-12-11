import { ADD_ARTICLE_COMMENT, LOAD_ARTICLE_COMMENTS } from '../constants'


//Using custom api.js middleware
export function loadArticleComments(articleId) {
    return {
        type: LOAD_ARTICLE_COMMENTS,
        callAPI: `/api/comment?article=${articleId}`
    }
}

export function addArticleComment(comment, articleId) {
    return {
        type: ADD_ARTICLE_COMMENT,
        payload: {
            articleId, 
            comment            
        },
        verb: 'post',
        callAPI: `/api/article/${articleId}/comment`
    }
}
