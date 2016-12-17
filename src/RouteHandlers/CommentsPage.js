import React, {Component} from 'react'
import { connect } from 'react-redux'

import Loader from '../components/Loader'
import Comment from '../components/Comment'


class CommentsPage extends Component {

    static defaultProps = {
        comments: [],                
        pageNumber: 1,
        loadStatus: 0 /* 0 - not loaded, 1 - loading, 2 - loaded */        
    }    
    
    render () {
        const {comments, loadStatus, pageNumber} = this.props        
        
        if (loadStatus === 0)
            return <div>Comments are not loaded</div>

        if (loadStatus === 1)
            return <Loader />
        
        return (
            <div key={pageNumber}>
                <ul>
                    {comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)}
                </ul>
            </div>
        )
    }
}


function mapStateToProps  (state, props)  {

    const {total, loadStatus, pages, pageNumber} = state.commentsPaginator    
    
    return {
        loadStatus,
        pageNumber,
        comments: pages.get(pageNumber)
    }
}

export default connect(mapStateToProps)(CommentsPage)



