import React, { useContext } from 'react';
import FilmContext from 'contexts/FilmContext'

const Featured = ({ featured, id }) => {
    const { toggleFeatured } = useContext(FilmContext)
    const cls = featured ? 'yellow' : 'empty';
    return (
        <span onClick={() => toggleFeatured(id)} className="ui right corner label">
            <i className={`star icon ${cls}`} ></i>
        </span>
    )
}

export default Featured
