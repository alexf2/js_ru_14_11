// @flow

import React, { Component } from 'react'
import type {CommentItem, NormArticleItem, ArticleItem } from '../dataTypes'
import Comments from './Comments'

type State = {
    isOpen: bool
}
type Props = {
    comments?: Array<CommentItem>
}

class CommentLink extends Component {
    count: number
    state: State
    props: Props

    constructor(props: Props) {
        super(props)

        this.state = { isOpen: false }
        this.updateCount(props);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.updateCount(nextProps);
    }

    updateCount(props: Props) {
        this.count = (props.comments || []).length
    }

     clickHandler = (ev: SyntheticEvent) => { 
        this.setState( (privState:State, props:Props) => Object.assign({}, privState, {isOpen: !privState.isOpen}) )        
    }

    render() { 
        if (!this.count)
            return null            

        let [text, sign] = this.state.isOpen ? ['Hide comments', '-'] : ['Show comments', '+']

        return (<div>
                <a key='0' href='#' onClick={this.clickHandler}>{text}&nbsp;({this.count}&nbsp;{sign})</a>
                {this.state.isOpen && <Comments key='1' comments={this.props.comments} />}
            </div>)
    } 

}

export default CommentLink;
