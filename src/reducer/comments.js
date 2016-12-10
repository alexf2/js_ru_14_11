import {  } from '../constants'
import { normalizedComments } from '../fixtures'
import { Map } from 'immutable'
import { ADD_ARTICLE_COMMENT } from '../constants'

const defaultComments = normalizedComments.reduce((acc, comment) => {
    return acc.set(comment.id, comment)
}, new Map())

export default (comments = defaultComments, action) => {
    const { type, payload, response, error } = action

    switch (type) {
        case ADD_ARTICLE_COMMENT:
        
            return comments.set(action.generateId.newId, {id: action.generateId.newId, user: payload.user, text: payload.comment}) 
    }

    return comments
}