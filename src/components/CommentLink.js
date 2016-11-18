// @flow

import React, {Component} from 'react'
import type {CommentItem, NormArticleItem, ArticleItem} from '../dataTypes'

type LinkState = {
    isOpen: bool
}
type LinkProps = {
    comments: Array<CommentItem>
}

class CommentLink extends Component {
    count: number
    state: LinkState

    constructor(props:LinkProps) {
        super(props)

        this.count = (props.comments || []).length
        this.state = {isOpen: false}                
    } 

    render() {        
        if (!this.count)
            return null

        let [text, sign] = this.state.isOpen ? ['Close comments', '-']:['Show comments', '+']

        return (
            <a href='#'>{text}({this.count}&nbsp;{sign})</a>
        ); 
    }

}

export default CommentLink;
