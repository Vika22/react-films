import React from 'react'

const ImageLoader = ( {src, alt, errorImg, ...rest}) => {
    const onError = ({target})=> target.src = errorImg;
    return <img src={src} alt={alt} onError={onError} {...rest} />
}

export default ImageLoader
