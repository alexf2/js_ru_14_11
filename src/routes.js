import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Root from './RouteHandlers/Root'
import ArticleRoot from './RouteHandlers/ArticleRoot'
import Filters from './RouteHandlers/Filters'
import Counter from './RouteHandlers/Counter'
import ArticlePage from './RouteHandlers/ArticlePage'
import NotFound from './RouteHandlers/NotFound'
import CommentsPaginator from './RouteHandlers/CommentsPaginator'
import CommentsPaginatorRoot from './RouteHandlers/CommentsPaginatorRoot'

export default (
    <Router history={browserHistory}>
        <Route path = "/" component={Root}>
            <Route path = "/counter" component={Counter} />
            <Route path = "/articles" component={ArticleRoot}>
                <Route path = ":id" component={ArticlePage} />
            </Route>
            <Route path = "/filters" component={Filters} />
            <Route path = "/comments" component = {CommentsPaginatorRoot}>
                <Route path = ":page" component={CommentsPaginator} />
            </Route>
            <Route path = "*" component={NotFound} />
        </Route>
    </Router>
)