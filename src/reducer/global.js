import { CHANGE_LANGUAGE, LOAD_LANGUAGE, START, SUCCESS, FAIL } from '../constants'
import { Record, Map } from 'immutable'
import history from '../history'

const LocalizationStateModel = Record({
    languageCode: 'en',
    langTranslations: new Map(),
    loadStatus: 0, /*0 - not loaded, 1 - loading, 2 - loaded */
    error: null
})

const defaultLocalization = new LocalizationStateModel()

export const localizationReducer = (localization = defaultLocalization, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_LANGUAGE + START:
            return localization.set('loadStatus', 1).set('error', null)

        case LOAD_LANGUAGE + SUCCESS:
        
            return localization
                .set('loadStatus', 2)
                .set('languageCode', payload.langCode)
                .set('langTranslations', new Map(JSON.parse(action.response)))            

        case LOAD_LANGUAGE + FAIL:        
            history.replace(`/error?message=${encodeURIComponent(action.error.responseJSON.error)}`)
            return localization
                .set('loadStatus', 0)
                .set('langTranslations', new Map())
                .set('error', action.error.responseJSON.error)
    }

    return localization
}


