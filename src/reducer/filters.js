import {APPLY_ARTDATE_FILTER, APPLY_ARTTITLE_FILTER} from '../constants'

//я бы делал одним редюсером, нет смысла их сильно дробить
let dateFilterReducer = (filterState = {}, action) => {
    const { type, payload } = action

    switch(type) {
        case APPLY_ARTDATE_FILTER:         
            return {from: payload.from, to: payload.to}
    }

    return filterState
}

let titleFilterReducer = (filterState = [], action) => {
    const { type, payload } = action
    
    switch(type) {                
        case APPLY_ARTTITLE_FILTER: 
            return payload.titles.slice(0)
    }

    return filterState
}

export {titleFilterReducer, dateFilterReducer}
