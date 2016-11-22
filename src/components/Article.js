import React, {Component, PropTypes} from 'react'
import CommentList from './CommentList'

function Article(props) {
    const { article, toggleOpen } = props

    const getBody = () => {
        const { isOpen } = props
        
        return isOpen && (
            <div>
                <p>{article.text}</p>
                <CommentList comments = {article.comments} />
            </div>
        )
    }

    return (
        <section>
            <h3 onClick = {toggleOpen}>{article.title}</h3>
            {getBody()}
        </section>
    )
}

Article.propTypes = {
    article: PropTypes.shape({
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
    }).isRequired
}


export default Article
