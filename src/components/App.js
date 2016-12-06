import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList'
import Select from 'react-select'
import Chart from './Chart'
import DateRange from './DateRange'
import Counter from './Counter'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import {applyArtDateFilter, applyArtTitleFilter} from '../AC/filters'

class App extends Component {
    
    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))        

        const {filters: {titleIds, from, to}} = this.props

        return (             
            <div>
                <Counter />
                <Chart />
                <DateRange onRangeChanged={this.handleRangeChanged} />
                <ArticleList />
                <Select options = {options} value = {titleIds} onChange = {this.handleChange} multi = {true} />
            </div>
        )
    }

    handleChange = selected => {        
        this.props.applyArtTitleFilter( (selected || []).map((item) => item.value) )
    }
    handleRangeChanged = (from, to) => {        
        this.props.applyArtDateFilter(from, to)
    }
}

export default connect(
    //props to state
    state => ({articles: state.articles, filters: {titleIds: state.filters.titleIds, from: state.filters.from, to: state.filters.to} }),
    //actions bindings 
    {applyArtDateFilter, applyArtTitleFilter})(App)
