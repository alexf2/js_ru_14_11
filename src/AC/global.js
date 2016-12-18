import { CHANGE_LANGUAGE, LOAD_LANGUAGE, START, SUCCESS, FAIL } from '../constants'
import jquery from 'jquery'
import { Map } from 'immutable'


export function changeLanguage(langCode) {
    return (dispatch, getState) => {
        const {languageCode, loadStatus} = getState().localization

        if (loadStatus === 1 || loadStatus === 2 && languageCode === langCode)
            return null

        if (langCode === 'en')
            dispatch({type: LOAD_LANGUAGE + SUCCESS, payload: {langCode}, response: "{}"})
        else
            dispatch({type: LOAD_LANGUAGE, payload: {langCode}, callAPI: `/api/static?file=translations_${langCode}.json`})
    }    
}

