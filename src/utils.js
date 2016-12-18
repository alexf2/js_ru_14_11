import { Map, Record, fromJS } from 'immutable'

export function arrayToMap(arr, Model) {
    return arr.reduce((acc, el) => {
        const immutableElement = Model ? new Model(el) : fromJS(el)
        return acc.set(el.id, immutableElement)
    }, new Map({}))
}

export const ReducerState = Record({
    entities: new Map({}),
    loading: false
})

export class LocalizeHelper {
    constructor(stringMap, langCode) {
        this.stringMap = stringMap
        this.langCode = langCode
    }

    localize = str => {                
        if (this.langCode === 'en')
            return str            

        return this.stringMap && this.stringMap.get(str) || str
    }
}