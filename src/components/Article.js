// @flow

import React, { Component } from 'react'
import CommentLink from './CommentLink'
import type {ArticleItem} from '../dataTypes'

type State = {
    isOpen: boolean;
    obj: {foo: string}
}

type Props = {
    article: ArticleItem   
}

class Article extends Component {
    state: State
    props: Props

    constructor() {
        super()
        this.state = {
            isOpen: false,
            obj: { foo: 'bar' }
        }
    }

    render() {
        const { article } = this.props
        const body = this.state.isOpen ? <span><p>{article.text}</p><CommentLink comments = {article.comments} /></span> : null
        return (
            <section>
                <h3 onClick = {this.handleClick}>{article.title}</h3>
                {body}<hr/>
            </section>
        )
    }

    handleClick = (ev: SyntheticEvent) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default Article