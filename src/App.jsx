import React, { Component } from "react";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import FilmList from "pages/FilmsPage/components/FilmList";
// import FilmInput from "pages/FilmsPage/components/FilmInput";
import { films } from "data";
import { prop, sortWith, descend, ascend } from "ramda";
import FilmContext from "contexts/FilmContext";
import TopNavigation from 'components/TopNavigation'
import { generate as id } from "shortid"

class App extends Component {
	componentDidMount() {
		this.setState({ films: this.sortFilms(films) });
	}
	sortFilms = films =>
		sortWith([descend(prop("featured")), ascend(prop("title"))], films);

	toggleFeatured = id =>
		this.setState(({ films }) => ({
			films: this.sortFilms(
				films.map(film =>
					film._id === id ? { ...film, featured: !film.featured } : film,
				),
			),
		}));
	toggleDescription = id =>
		this.setState(({ activeId }) => ({
			activeId: id === activeId ? null : id,
		}));
	showForm = () => this.setState({
		showAddForm: true,
		selectedFilm: {} 
	})
	hideForm = () => this.setState({
		showAddForm: false,
		selectedFilm: {} 
	})

	addFilm = film => this.setState( ({films, showAddForm, selectedFilm})=>({
		films: this.sortFilms([...films, {...film, _id: id()} ]) ,
		showAddForm: false,
		selectedFilm: {}
	}))

	updateFilm = film => this.setState(({ films, showAddForm, selectedFilm }) => ({
		films: this.sortFilms(films.map(f=> f._id ===film._id ? film : f)),
		showAddForm: false,
		selectedFilm: {}
	}))

	saveFilm = film  => film._id ? this.updateFilm(film) : this.addFilm(film)
	
	selectedFilmForEdit = selectedFilm =>{
		this.setState({
			selectedFilm,
			showAddForm: true
		})
	}
	deleteFilm = film => 
		this.setState(({ films, showAddForm, selectedFilm }) => ({
		films: this.sortFilms(films.filter(f => f._id !== film._id)),
		showAddForm: false,
		selectedFilm: {}
	}))
 	state = {
		films: [],
		activeId: null,
		toggleFeatured: this.toggleFeatured,
		toggleDescription: this.toggleDescription,
		showAddForm: false,
		selectedFilm : {},
		selectedFilmForEdit: this.selectedFilmForEdit,
		deleteFilm: this.deleteFilm
	};
	
	render() {
		const { films, showAddForm, selectedFilm, activeId } = this.state;
		const col = showAddForm ? "ten" : "sixteen";
		return (
			<FilmContext.Provider value={this.state}>
				<div className="ui container">
					<TopNavigation showForm={this.showForm} />
					<div className="ui stackable grid">
						{showAddForm && <div className="six wide column">
							<FilmForm film={selectedFilm} saveFilm={this.saveFilm} hideForm={this.hideForm}/>
						</div>}
						<div className={`${col} wide column`}>
							<FilmList deleteFilm={this.deleteFilm} activeId={activeId}  films={films}/>
						</div>
					</div>
				</div>
			</FilmContext.Provider>
		);
	}
}

export default App;
