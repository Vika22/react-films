import React, {memo} from 'react';
import FilmCard from 'pages/FilmsPage/components/FilmCard';
import Messages from "components/Messages";
import PropTypes from 'prop-types'

const FilmList = ({ films, activeId}) => {
    return (
        <div className="ui four cards">
            {films.length === 0 ?
                <Messages >No films</Messages> :
                films.map(film => <FilmCard isActive={activeId === film._id} key={film._id} film={film} />)}
        </div>
    )
}
FilmList.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object)
}
FilmList.defaultProps = {
    films : []
}
export default memo(FilmList)
