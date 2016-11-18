// @flow

import React, { Component } from 'react'
import CommentLink from './CommentLink'

class Article extends Component {

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

    handleClick = ev => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default Article