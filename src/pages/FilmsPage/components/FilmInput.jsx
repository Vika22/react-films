import React, { Component } from "react";
import { genres, tags as tagsList } from "data";

class FilmForm extends Component {
	state = {
		tags: [],
		genre: "",
		sel: "",
		multipleSelect: [],
	};

	handleTagsChange = tag => { 
		this.setState(({tags}) =>({
			tags: tags.includes(tag._id) ? tags.filter(id=> tag._id !== id) : [...tags, tag._id]
		}))
	};

	handleGenreChange = genre => this.setState({genre});

	handleSelectChange = ({target}) => this.setState({sel:target.value});

	handleMultiSelect = ({ target }) =>{
		const multipleSelect = Array.from(target.selectedOptions).map(o=> o.value)
		this.setState({ multipleSelect});
	} 
	render() {
		const { tags, genre, sel, multipleSelect } = this.state;
		return (
			<form className="ui form">
				<div className="ui grid">
					<div className="four wide column">
						<select value={multipleSelect} onChange={this.handleMultiSelect} multiple size={genres.length}>
							{genres.map(gen =>
								<option key={gen._id} value={gen._id}>{gen.title}</option>
							)}
						</select>
					</div>

					<div className="four wide column">
						<select value={sel} onChange={this.handleSelectChange} class="ui dropdown">
							{genres.map(gen=>
								<option key={gen._id} value={gen._id}>{gen.title}</option>								
							)}
						</select>
					</div>

					<div className="four wide column">
						<div class="grouped fields">
							<label>Genres</label>
							{genres.map(gen=> (
							<div key={gen._id} class="field">
								<div class="ui radio checkbox">
								<input onChange={()=>this.handleGenreChange(gen._id)} id={`gen-${gen._id}`} type="radio" name="example2" checked={genre===gen._id} />
								<label htmlFor={`gen-${gen._id}`}>{gen.title}</label>
								</div>
							</div>
							))}
						</div>   
					</div>
					<div className="four wide column">
						<label>Tags</label>
						{tagsList.map(tag =>(
							<div key={tag._id} className="field">
								<div className="ui checkbox">
									<input type="checkbox" id={`tag-${tag._id}`} checked={tags.includes(tag._id)} onChange={()=>this.handleTagsChange(tag)} name={tag.title} />
									<label htmlFor={`tag-${tag._id}`}>{tag.title}</label>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* ====================================================== */}
			</form>
		);
	}
}

export default FilmForm;
