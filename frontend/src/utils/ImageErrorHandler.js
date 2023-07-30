import errorImage from '../images/load-image-err.png';

function imageErrorHandler(evt) {
    //evt.srcElement.src = errorImage;
    evt.target.src = errorImage;
}

export default imageErrorHandler;