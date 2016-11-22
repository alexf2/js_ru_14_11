import React, { Component, PropTypes }  from 'react'
import Article from './Article'
import AccordionDecorator from '../decorators/accordionDecorator'

class ArticleList extends Component {
    /*state = {
        openArticleId: null
    }*/

    constructor() {
        super()
    }

    render() {
        const { articles, openItemCallback, openItemId } = this.props

        const articleItems = articles.map(article => (
            <li key = {article.id}>
                <Article
                    article = {article}
                    isOpen = {article.id === openItemId}
                    toggleOpen = {openItemCallback(article.id)}
                />
            </li>
        ))

        return (
            <ul>
                {articleItems}
            </ul>
        )
    }

    /*openArticle = id => ev => {
        this.setState( (prevState) => 
            ({...prevState, 
                openArticleId: prevState.openArticleId === id ? null:id}) 
        )
    }*/
}

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,

        comments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,

                title: PropTypes.string,
                user: PropTypes.string.isRequired,
                text: PropTypes.isRequired
            })
        ),

        text: PropTypes.string
    })),

    openItemId: PropTypes.string.isRequired,
    openItemCallback: PropTypes.func.isRequired
}

export default AccordionDecorator(ArticleList)