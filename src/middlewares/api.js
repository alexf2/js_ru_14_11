import jquery from 'jquery'
import { START, SUCCESS, FAIL } from '../constants'

export default store => next => action => {
    const { callAPI, callAPIForward, type, verb, ...rest } = action    
    if (!callAPI && !callAPIForward)
        return next(action)

    let url = callAPIForward || callAPI 
    
    if (callAPIForward)
        next({...rest, verb,  type})

    next({...rest, verb, type: type + START})

    const {payload} = action

    //NOT FOR PROD! just to simulate long call    
    let requestMethod = verb || 'get'

    setTimeout(() => {
        jquery.ajax({
            method: requestMethod,
            url,
            data: JSON.stringify(payload),
            contentType: "application/json",
            dataType: 'json'            
        })
            .done(response => {
                next({...rest, response, type: type + SUCCESS})
            })
            .fail(error => {                
                next({...rest, error, type: type + FAIL})
            })
    }, 500)
}