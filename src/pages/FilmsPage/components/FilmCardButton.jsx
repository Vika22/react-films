import React, { useContext, useState} from 'react'
import FilmContext from "contexts/FilmContext";

const EditButton = ({ film }) => {
    const { selectedFilmForEdit } = useContext(FilmContext);
    return (
        <span onClick={() => (selectedFilmForEdit(film))} className="ui green basic button">
            <i className="ui icon edit"></i>
        </span>
    )
}
const DeleteButton = ({film}) => {
    const { deleteFilm } = useContext(FilmContext);
    return (
        <span onClick={() => (deleteFilm(film))} className="ui red basic button">
            <i className="ui icon check">YES</i>
        </span>
    )
}

const FilmCardButton = ({ film }) => {
    const [show, setShow ] = useState(false);
    const showButtons = () => setShow(true);
    const hideButtons = () => setShow(false);
    return (
        <div className="extra content">
            {show ? (
            <div className="ui two buttons">
                <span onClick={hideButtons} className="ui grey basic button">
                    <i className="ui icon close" /> NO
                </span>
                < DeleteButton film={film} />
            </div>
            ) : (
            <div className="ui two buttons">  
               <EditButton film={film}/>
                <span onClick={showButtons} class="ui red basic button">
                    <i class="ui icon trash" />
                </span>
            </div>
            )} 
        </div>
    )
}

export default FilmCardButton
