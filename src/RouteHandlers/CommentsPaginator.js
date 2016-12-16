import React, {Component} from 'react'
import { connect } from 'react-redux'

import { loadCommentsPage } from '../AC/commentsPaginator'
import Loader from '../components/Loader'
import CommentList from '../components/SimpleCommentList'

class CommentsPaginator extends Component {

    static defaultProps = {
        comments: [],
        pageNumber: 1,
        pageSize: 5,
        totalPages: -1,
        loadStatus: 0 /* 0 - not loaded, 1 - loading, 2 - loaded */
    }    

    componentDidMount () {
        loadCommentsPage(this.props.pageNumber)
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.loadStatus !== 1 && nextProps.pageNumber !== this.props.pageNumber) 
            loadCommentsPage(nextProps.pageNumber)
    }

    render () {
        const {comments, loadStatus} = this.props

        if (loadStatus === 0)
            return <div>Comments are not loaded</div>

        if (loadStatus === 1)
            return <Loader />

        return (
            <CommentList comments={comments} />
        )
    }
}


export default connect((state, props) => ({
    comments: (props.article.comments || []).map(id => state.comments.getIn(['entities', id]))
}), { addComment, checkAndLoadComments })(toggleOpen(CommentsPaginator))
