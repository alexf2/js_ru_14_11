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
    }

    componentWillUpdate (nextProps, nextState) {
        //при такой логике лучше сделать comments.length <= article.comments.length, вдруг они гдето еще могут появиться
        if (nextProps.isOpen && !this.props.isOpen && nextProps.comments.length === 0 && (nextProps.article.comments || []).length > 0)  
            this.props.loadArticleComments(this.props.article.id)

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
        return <a href="#" onClick = {toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
    }

    getBody() {
        const { article, comments, isOpen, addComment, loading } = this.props
        const commentForm = <NewCommentForm articleId = {article.id} addComment = {this.props.addArticleComment} />

        if (loading) 
            return <Loader/>

        if (!isOpen || !comments.length) 
            return <div>{commentForm}</div>

        const commentItems = comments
            .map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)

        return <div><ul>{commentItems}</ul>{commentForm}</div>
    }
}

export default connect((state, props) => ({
    comments: props.article.comments.map(id => state.comments.entities.get(id)).filter(comment => !!comment),
    loading: state.comments.loading
}), { loadArticleComments, addArticleComment })(toggleOpen(CommentList))
