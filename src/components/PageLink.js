import React from 'react'
import { Link } from 'react-router'

const PageLink = ({type, totalPages, page, title, base}) => {
    let enabled = true
    let to = `${base}/`
    let face = ''    

    if (type <= 1 && (totalPages < 1 || page <= 1))
        enabled = false

    if (type > 1 && (totalPages < 1 || page >= totalPages))
        enabled = false    

    switch (type) {
        case 0:
            to += '1'
            face = '<<'
            break
        case 1:
            to += parseInt(page) - 1
            face = '<'
            break
        case 2:
            to += parseInt(page) + 1
            face = '>'
            break
        case 3:
            to += totalPages
            face = '>>'
            break
    }

    return enabled ? (<Link to={to} title={title}>{face}</Link>):(<span title={title}>{face}</span>)
}

export default PageLink
