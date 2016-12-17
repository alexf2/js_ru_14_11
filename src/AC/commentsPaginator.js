import { NAVIGATE_TO_COMMENTS_PAGE, SUCCESS} from '../constants'

export function navigateToCommentsPage (pageNumber, pageSize) {
    return (dispatch, getState) => {

        const pageData = getState().commentsPaginator.pages.get(pageNumber)        

        if (!pageData)
            dispatch({
                type: NAVIGATE_TO_COMMENTS_PAGE,
                payload: { pageNumber },
                callAPI: `/api/comment?limit=${pageSize}&offset=${pageSize * (pageNumber - 1)}`
            })
        else
            dispatch({
                type: NAVIGATE_TO_COMMENTS_PAGE + SUCCESS,
                payload: { pageNumber },
                response: {
                    total: getState().commentsPaginator.total,
                    records: pageData
                }
            })
    }
}
