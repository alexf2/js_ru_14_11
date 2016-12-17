import { NAVIGATE_TO_COMMENTS_PAGE, SUCCESS, FAIL, START } from '../constants'
import { Record, Map } from 'immutable'

export const CommentModel = Record({
    id: null,
    text: null,
    user: null
})
export const PaginatorModel = Record({
    pageNumber: 1,
    pages: new Map(),
    total: -1,
    loadStatus: 0 /* 0 - not loaded, 1 - loading, 2 - loaded */
})

export default (paginatorState = new PaginatorModel(), action) => {
    const { type, payload } = action

    switch (type) {
        case NAVIGATE_TO_COMMENTS_PAGE + START:
            return paginatorState.set('loadStatus', 1)

        case NAVIGATE_TO_COMMENTS_PAGE + FAIL:
            return paginatorState.set('loadStatus', 0)

        case NAVIGATE_TO_COMMENTS_PAGE + SUCCESS:            
            let res = paginatorState.set('loadStatus', 2)
                .set('total', action.response.total)

            if (paginatorState.total !== action.response.total)
                res = res.updateIn(['pages'], p => p.clear())

            if (action.payload.pageNumber <= action.response.total)
                res = res.set('pageNumber', action.payload.pageNumber)
                    .updateIn(['pages'], val => val.set(action.payload.pageNumber, action.response.records))

            return res
    }
    return paginatorState
}
