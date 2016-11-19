// @flow

import React, {Component} from 'react'
import type {CommentItem, NormArticleItem, ArticleItem} from '../dataTypes'
import '../main.less'

type Props = {
    comment: CommentItem;
    isFirst: boolean
}

const Comment = (props:Props) => {

    const {comment:{user, text}} = props
    
    return (
        <li>
            <div className='author'><b>{user}</b></div>
            <div>{text}</div>
        </li>
    );
}

export default Comment