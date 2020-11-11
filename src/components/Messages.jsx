import React from 'react'
import PropTypes from 'prop-types';

const Messages = ({type, color, children}) => {
    return (
        <div className={`ui icon ${color} message`}>
            <i className={`icon ${type}`} ></i>
            <div className="content">
                <div className="header">{children}</div>
            </div>
        </div>
    )
}

Messages.defaultProps ={
    type: "info",
    color: "blue"
}
Messages.propTypes ={
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
}
export default Messages
