import React, { Component} from 'react'
import { connect } from 'react-redux'

class CommentsPaginatorRoot extends Component {
    
    render() {
        return (
            <div data-page = {this.props.params.page}>
                {this.props.children}
            </div>
        )
    }
}

/*export default connect((state, props) => ({
    page: state.commentsPaginator.pageNumber
}))(CommentsPaginatorRoot)*/

export default CommentsPaginatorRoot

