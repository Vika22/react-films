import React, { Component, createRef } from 'react'
import ImageLoader from 'components/ImageLoader'
import FormMessage from 'components/FormMessage'
import PropTypes from 'prop-types'

const initialData = {
    title: '',
    img: '',
    _id: null,
    director: '',
    duration: '',
    price: '',
    featured: false,
    description: ''
}

class FilmForm extends Component {
    state = {
        data: initialData,
        errors: {}
    }
    validate (data) {
        const errors = {};
        if (!data.title) errors.title = 'Not title';
        if (!data.img) errors.img = 'Not img';
        if (!data.director) errors.director = 'Not director';
        if (!data.duration) errors.duration = 'Not duration';
        if (!data.price) errors.price = 'Not price';
        if (!data.description) errors.description = 'Not description';
        if (parseInt(data.duration) < 0) errors.description = 'Not be negative'
        if (parseInt(data.price) < 0) errors.price = 'Not be negative'

        return errors
    }
    componentDidMount() {
        if(this.props.film._id){
            this.setState({ data: this.props.film})
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.film._id && this.props.film._id !== prevProps.film._id){
            this.setState({ data: this.props.film })
        } else if (!this.props.film._id && prevProps.film._id){
            this.setState({ data: initialData }) 
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.props.saveFilm(this.state.data)
            this.setState({data: initialData})
        }
    }
    photoRef = createRef();
    updatePhoto = ( ) =>{
        const file = this.photoRef.current.files && this.photoRef.current.files[0] ;
        if (file){
            const img = '/img/' + file.name;
            this.setState({
                data: {
                    ...this.state.data, img
                },
                errors: {
                    ...this.state.errors, img: ''
                }
            })
        }
        
    }
    handleNumberChange = e => {
        let value = parseFloat(e.target.value);
        value = isNaN(value) || value === 0 ? '' : Math.abs(value);
        this.setState({
            data: { ...this.state.data, [e.target.name]: value },
            errors: {
                ...this.state.errors, [e.target.name]: ''
            }
        })
    }
    handleCheckboxChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.checked }
        })
    }
    handleStringChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value },
            errors: {
                ...this.state.errors, [e.target.name]: ''
            }
        })
    }
    render() {
        const { data, errors} = this.state;
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="ui grid mb-3">
                    <div className="two column row">
                        <div className="ten wide column">
                            <div className={`field ${errors.title ? "error" : ""}`}>
                                <label htmlFor="title">Film title</label>
                                <input
                                    value={data.title}
                                    onChange={this.handleStringChange}
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="film title"
                                />
                                {errors.title && <FormMessage> {errors.title}</FormMessage> }
                            </div>
                            <div className={`field img-grid ${errors.img ? "error" : ""}`}>
                                <label htmlFor="img">Image</label>
                                <input name="img" value={data.img}
                                    onChange={this.handleStringChange} />
                                <div className="inp-file">
                                    <label htmlFor="photo">Photo</label>
                                    <input type="file" onChange={this.updatePhoto} ref={this.photoRef} id="photo" />
                                </div>
                                {errors.img && <FormMessage> {errors.img}</FormMessage>}
                            </div>
                        </div>
                        <div className="six wide column">
                            <ImageLoader src={data.img} alt={data.title} className="ui image imgfit" errorImg="http://via.placeholder.com/250x250" />
                        </div>
                    </div>
                    <div className={`column row field ${errors.description ? "error" : ""}`}>
                        <label htmlFor="description">Film description</label>
                        <textarea
                            value={data.description}
                            onChange={this.handleStringChange}
                            name="description"
                            id="description"
                            placeholder="film description"
                        ></textarea>
                        {errors.description && <FormMessage> {errors.description}</FormMessage>}
                    </div>
                    <div className="three column row">
                        <div className={`column field ${errors.director ? "error" : ""}`}>
                            <label htmlFor="director">Director</label>
                            <input
                                value={data.director}
                                onChange={this.handleStringChange}
                                type="text"
                                name="director"
                                id="director"
                                placeholder="film director"
                            />
                            {errors.director && <FormMessage> {errors.director}</FormMessage>}
                        </div>
                        <div className={`column field ${errors.duration ? "error" : ""}`}>
                            <label htmlFor="duration">Duration</label>
                            <input
                                value={data.duration}
                                onChange={this.handleNumberChange}
                                type="number"
                                name="duration"
                                id="duration"
                                placeholder="Duration"
                            />
                            {errors.duration && <FormMessage> {errors.duration}</FormMessage>}
                        </div>
                        <div className={`column field ${errors.price ? "error" : ""}`}>
                            <label htmlFor="price">Price</label>
                            <input
                                value={data.price}
                                onChange={this.handleNumberChange}
                                type="number"
                                name="price"
                                id="price"
                                placeholder="price"
                            />
                            {errors.price && <FormMessage> {errors.price}</FormMessage>}
                        </div>
                    </div>
                    <div className={`six wide column inline field ${errors.featured ? "error" : ""}`}>
                        <label htmlFor="featured">Featured</label>
                        <input type="checkbox" value={data.featured} onChange={this.handleCheckboxChange} name="featured" id="featured" />
                        {errors.featured && <FormMessage> {errors.featured}</FormMessage>}
                    </div>
                    <div className="ui fluid buttons">
                        <button className="ui button primary" type="submit">Save</button>
                        <div className="or"></div>
                        <button onClick={this.props.hideForm} className="ui button ">Hide form</button>
                    </div>
                </div>
            </form>
        )
    }
}
FilmForm.propTypes ={
    hideForm: PropTypes.func.isRequired,
    saveFilm: PropTypes.func.isRequired,
    film: PropTypes.object.isRequired
}

export default FilmForm
