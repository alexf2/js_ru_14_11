import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadArticleComments, addArticleComment } from '../AC/comments'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import Loader from './Loader'

class CommentList extends Component {
    static propTypes = {
        //commentIds: PropTypes.array.isRequired,
        //from connect
        comments: PropTypes.array.isRequired,
        //from toggleOpen decorator
        isOpen: PropTypes.bool.isRequired,
        toggleOpen: PropTypes.func.isRequired
    }

    static defaultProps = {
        comments: []
    }


    componentWillReceiveProps() {
        //console.log('---', 'CL receiving props')
        //console.log('List: componentWillReceiveProps')
    }

    componentWillUpdate (nextProps, nextState) {
        if (nextProps.isOpen && !this.props.isOpen && nextProps.article.commentsState === 0)
            nextProps.loadArticleComments(nextProps.article.id)
    }

    componentDidMount() {        
    }

    render() {
        return (
            <div>
                {this.getButton()}
                {this.getBody()}
            </div>
        )
    }

    getButton() {
        const { article, isOpen, toggleOpen } = this.props
        if (article.comments.length === 0) 
            return <span>No comments yet</span>
        return <a href="#" onClick = {toggleOpen}>{isOpen ? 'hide' : 'show'} comments ({article.comments.length})</a>
    }

    addCommentHandler = (...rest) => {
        this.props.addArticleComment(...rest)
        if (!this.props.isOpen)
            this.props.toggleOpen()
    }

    getBody() {
        const { article, comments, isOpen, addComment, article: {commentsState} } = this.props
        const commentForm = <NewCommentForm articleId = {article.id} addComment = {this.addCommentHandler} />

        if (isOpen && commentsState < 2)
            return <Loader/>

        const commentItems = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)

        return <div>
            {isOpen && <ul>{commentItems}</ul>}
            {commentForm}
        </div>
    }
}

export default connect((state, props) => ({
    comments: props.article.comments.map(id => state.comments.get(id)).filter(comment => !!comment)    
}), { loadArticleComments, addArticleComment })(toggleOpen(CommentList))
