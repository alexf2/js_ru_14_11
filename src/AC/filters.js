import {APPLY_ARTDATE_FILTER, APPLY_ARTTITLE_FILTER} from '../constants'

export function applyArtDateFilter(from, to) {
    return {
        type: APPLY_ARTDATE_FILTER,
        payload: {
            from, to
        }
    }
}

export function applyArtTitleFilter(titleIds) {
    //лучше ids
    return {
        type: APPLY_ARTTITLE_FILTER,
        payload: {
            titleIds
        }
    }
}
