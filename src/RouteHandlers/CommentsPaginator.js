import React, {Component} from 'react'
import { connect } from 'react-redux'

import { navigateToCommentsPage } from '../AC/commentsPaginator'
import PageLinks from '../components/PageLinks'

class CommentsPaginator extends Component {
    
    static defaultProps = {        
        pageSize: 5,
        totalPages: -1        
    }    

    componentDidMount () {        
        this.props.navigateToCommentsPage(this.props.params.page || 1, this.props.pageSize)
    }

    componentWillReceiveProps (nextProps) {
        const nextPage = nextProps.params.page || 1

        if (this.props.loadStatus !== 1 && nextPage !== (this.props.params.page || 1))
            this.props.navigateToCommentsPage(nextPage, nextProps.pageSize)
    }

    render() {       
        const {totalPages, pageNumber, route: {path}} = this.props        

        const hdrStyle = {textAlign: 'center'}                        

        return (
            <div>
                <h2 style={hdrStyle}>Page {pageNumber} of {totalPages}</h2>
                {this.props.children}
                <div style={hdrStyle}><PageLinks base={path} totalPages={totalPages} page={pageNumber} /></div>
            </div>            
        )
    }
}

function mapStateToProps  (state, props)  {

    const {total, pageNumber} = state.commentsPaginator
    const pagesCount = total / (props.pageSize || CommentsPaginator.defaultProps.pageSize)
    
    return {        
        pageNumber,
        totalPages: ~~pagesCount + (~~pagesCount === pagesCount ? 0:1)                
    }
}

export default connect(mapStateToProps, { navigateToCommentsPage })(CommentsPaginator)


