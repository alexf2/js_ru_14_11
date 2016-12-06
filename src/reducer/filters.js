import {APPLY_ARTDATE_FILTER, APPLY_ARTTITLE_FILTER} from '../constants'

//я бы делал одним редюсером, нет смысла их сильно дробить
//Ok: объединяю
const filterReducer = (filterState = {titleIds: [], dateFilter:{}}, action) => {
    const { type, payload } = action

    switch(type) {
        case APPLY_ARTDATE_FILTER:         
            return {from: payload.from, to: payload.to}

        case APPLY_ARTTITLE_FILTER: 
            return {titleIds: payload.titleIds.slice(0)}
    }

    return filterState
}

export {filterReducer}
