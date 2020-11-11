import React from 'react'

const TopNavigation = ({showForm}) => {
    return (
        <div className="ui secondary pointing menu">
            <a href="/" className="item">Home</a>
            <span onClick={showForm} className="item">
                <i  className="icon plus"></i>
                Add new film
            </span>
        </div>
    )
}

export default TopNavigation
