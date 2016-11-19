// @flow

import React  from 'react'
import Article from './Article'
import type {ArticleItem} from '../dataTypes'

type Props = {
    articles: Array<ArticleItem>
}

function ArticleList(props: Props) {
    const  {articles} = props

    const articleItems = articles.map(article => <li key = {article.id}><Article article = {article} /></li>)

    return (
        <ul>
            {articleItems}
        </ul>
    )
}

export default ArticleList