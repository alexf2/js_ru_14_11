import { NAVIGATE_TO_COMMENTS_PAGE } from '../constants'
import { Record, List } from 'immutable'

const CommentModel = Record({
    id: null,
    text: null,
    user: null
})
const PaginatorModel = Record({
    pageNumber: 1,
    comments: [],
    totalPages: -1,
    loadStatus: 0 /* 0 - not loaded, 1 - loading, 2 - loaded */
})

export default (paginatorState = new PaginatorModel(), action) => {
    const { type, payload } = action

    switch (type) {
        case NAVIGATE_TO_COMMENTS_PAGE:
            return {...paginatorState, pageNumber: payload.pageNumber}
    }
    return paginatorState
}
