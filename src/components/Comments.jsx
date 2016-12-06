// @flow

import React, {Component} from 'react'
import type {CommentItem, NormArticleItem, ArticleItem} from '../dataTypes'
import Comment from './Comment'

type Props = {
    comments?: Array<CommentItem>
}

const Comments = (props:Props) => {

    const {comments} = props

    if (!comments || comments.length === 0)
        return (<div>&nbsp;</div>)
    //не понял зачем тебе isFirst, а так все отлично
    //думал добавить специальный формат для первого коммента, но удалил
    return (
        <ul>
            {comments.map( (comment, i) => <Comment key={comment.id} comment={comment}  /> )}
        </ul>
    );
}

export default Comments