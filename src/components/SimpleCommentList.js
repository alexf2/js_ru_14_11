import React, { Component} from 'react'
import Comment from './Comment'

class SimpleCommentList extends Component {
    
    static defaultProps = {
        comments: []
    }

    componentDidMount () {
        loadCommentsPage(this.props.pageNumber)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.pageNumber !== this.props.pageNumber) 
            loadCommentsPage(nextProps.pageNumber)
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)}
                </ul>
            </div>
        )
    }
}

export default SimpleCommentList

