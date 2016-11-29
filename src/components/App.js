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

        const {dateFilter: {from, to}, titles} = this.props

        return (             
            <div>
                <Counter />
                <Chart />
                <DateRange onRangeChanged={this.handleRangeChanged} />
                <ArticleList  from={from} to={to} titles={titles} />
                <Select options = {options} value = {titles} onChange = {this.handleChange} multi = {true} />
            </div>
        )
    }

    handleChange = selected => {        
        this.props.applyArtTitleFilter(selected)
    }
    handleRangeChanged = (from, to) => {        
        this.props.applyArtDateFilter(from, to)
    }
}

export default connect(
    //props to state
    state => ({articles: state.articles, titles: state.titles, dateFilter: state.dateFilter}),
    //actions bindings 
    {applyArtDateFilter, applyArtTitleFilter})(App)
