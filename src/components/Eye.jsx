import React, { useContext } from "react";
import FilmContext from "contexts/FilmContext";

const Eye = ({ id, isActive }) => {
    const { toggleDescription } = useContext(FilmContext);
    return (
        <div className="content" onClick={() => toggleDescription(id)}>
            <i className={`icon eye link ${isActive ? "slash" : ""}`}></i>
        </div>
    );
};

export default Eye;
