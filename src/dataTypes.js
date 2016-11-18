// @flow

export type CommentItem = {
    id: number;
    user: string;
    text: string
}

export type NormArticleItem = {
    id: string;
    date: string;
    title: string;
    text: string;
    comments?: Array<number>
}

export type ArticleItem = {
    id: string;
    date: string;
    title: string;
    text: string;
    comments?: Array<CommentItem>
}
