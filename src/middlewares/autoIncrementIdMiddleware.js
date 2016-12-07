import { ADD_ARTICLE_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'

let commentCounter = normalizedComments.reduce( (a, b) => (a.id > b.id ? a:b)).id + 1

export default store => next => action => {    
  //лучше придумать более общий способ; через мидлвару будут проходить все экшины, их стоит делать максимально реюзабельными
    if (action.type === ADD_ARTICLE_COMMENT)
        //лучше не мутировать объект
        action.payload.commentId = commentCounter++

    next(action)        
}
