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

        return (
            <div>
                <Counter />
                <Chart />
                <DateRange onRangeChanged={this.handleRangeChanged} />
                <ArticleList  from={this.props.from} to={this.props.to} titles={this.props.titles} />
                <Select options = {options} value = {this.props.titles} onChange = {this.handleChange} multi = {true} />
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
    state => ({articles: state.articles, titles: state.titles, from: state.from, to: state.to}), 
    {applyArtDateFilter, applyArtTitleFilter})(App)
