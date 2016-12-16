import { NAVIGATE_TO_COMMENTS_PAGE } from '../constants'

export function navigateToCommentsPage(pageNumber) {
    return {
        type: NAVIGATE_TO_COMMENTS_PAGE,
        payload: {
            pageNumber
        }
    }
}
