import React from 'react'
import PageLink from './PageLink'

const PageLinks = (props) =>  {    
    return (<div>
        <b><PageLink type={0} title='First' {...props} />&nbsp;&nbsp;
        <PageLink type={1} title='Prev' {...props}/>&nbsp;&nbsp;{props.page} of {props.totalPages}&nbsp;&nbsp;
        <PageLink type={2} title='Next' {...props}/>&nbsp;&nbsp;
        <PageLink type={3} title='Last' {...props}/></b>
    </div>)
}

export default PageLinks
