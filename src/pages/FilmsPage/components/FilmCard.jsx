import React, { memo } from "react";
import FilmCardButton from 'pages/FilmsPage/components/FilmCardButton'
import Featured from "components/Featured";
import Eye from "components/Eye";

const FilmCard = ({ film, isActive  }) => {
	return (
		<div className="ui card" key={film._id}>
			{!isActive ? (
				<>
					<Featured featured={film.featured} id={film._id} />
					<div className="image">
						<span className="ui green label ribbon">$ {film.price} </span>
						<img src={film.img} alt="{film.title}" />
					</div>
					<div className="content">
						<span className="header">{film.title}</span>
						<div className="meta">
							<i className="icon users"></i> {film.director}
							<span className="right floated">
								<i className="icon wait right"></i> {film.duration} min
              			</span>
						</div>
						<Eye id={film._id} isActive={isActive}/>
					</div>
					<FilmCardButton film={film} />
				</>
			) : (
					<>
						<div className="content">
							<p>{film.description}</p>
						</div>
						<div className="content">
							<span className="header">{film.title}</span>
							<div className="meta">
								<i className="icon users"></i> {film.director}
								<span className="right floated">
									<i className="icon wait right"></i> {film.duration} min
              				</span>
							</div>
							<Eye id={film._id} isActive={isActive} />
						</div>
					</>
				)}
		</div>
	);
};

export default memo(FilmCard);
