import React, { Component, PropTypes }  from 'react'
import Article from './Article'
import accordion from '../decorators/accordion'
import { connect } from 'react-redux'
import { DateUtils } from 'react-day-picker'

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        //from accordion decorator
        isOpen: PropTypes.func.isRequired,
        toggleOpenItem: PropTypes.func.isRequired
    }

    componentWillMount() {
        console.log('---', 'mounting')
    }

    componentDidMount() {
        console.log('---', 'mounted', this.containerRef)
        console.log('---', this.refs)
    }

    componentWillReceiveProps(nexProps) {
        //console.log('isEqual', Object.keys(nexProps).every(key => nexProps[key] == this.props[key]))
        //console.log('---', 'AL receiving props')
    }

    componentWillUpdate() {
        //console.log('---', 'AL will update')
    }

    getContainerRef = ref => {
        this.containerRef = ref
    }

    filterArt = articles => {
        if (!articles)
            return articles;

        const {from, to, titles} = this.props

        from && from.setHours(0,0,0,0)
        to && to.setHours(0,0,0,0)

        return articles.filter( (art) => {
            if (titles && titles.length > 0 && !titles.find((item) => item.value === art.id)) 
                return false                        

            const dt = new Date(art.date)
            dt.setHours(0,0,0,0)             

            if (from && !to) 
                return dt >= from
            
            else if (to && !from) 
                return dt <= to
            
            else if (from) 
                return dt >= from && dt <= to
                        
            return true
        })
    }


    render() {
        const { articles, isOpen, toggleOpenItem } = this.props        

        const articleItems = this.filterArt(articles).map(article => (
            <li key = {article.id}>
                <Article
                    article = {article}
                    isOpen = {isOpen(article.id)}
                    toggleOpen = {toggleOpenItem(article.id)}
                />
            </li>
        ))

        return (
            <ul ref = {this.getContainerRef}>
                {articleItems}
            </ul>
        )
    }
}

export default connect(state => ({
    articles: state.articles
}))(accordion(ArticleList))