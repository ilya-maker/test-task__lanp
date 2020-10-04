// Core
import React, { useState } from "react";

// Styles
import './Dropzone.scss';

// Images
import Rectangle from '../../assets/Icon.svg';

const Dropzone = () => {
    const [uploaedeImg, setUploadedImg] = useState();
    const [loadPropgress, setLoadPropgress] = useState(0);
    const [activeDragArea, setActiveDragArea] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const onImageChange = event => {
        console.log(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            if (!event.target.files[0].type.includes('image')) {
                setErrorMessage(true);
                return;
            }
            setActiveDragArea(false)
            let progress = 0;
            const circumference = 65;
            const loadingStep = 0.1
            const loadingSpreed = 5;

            const file = event.target.files[0];
            const myInterval = setInterval(() => {
                progress+= loadingStep;
                if(progress > circumference) {
                    clearInterval(myInterval);
                }
                setLoadPropgress(progress * 4);
            }, loadingSpreed)

            setTimeout(() => {
                setUploadedImg(URL.createObjectURL(file));
                setLoadPropgress(0);
            }, loadingSpreed * circumference * 10);
        }
    };

    return (
        <section className="Dropzone">
            <div className="container">
                <div className="Dropzone__text">
                    <h1>Company Logo</h1>
                    <p>Logo should be square, 100px size and in png, jpeg file format.</p>
                </div>
            </div>
            <hr className="Dropzone__underLine"/>
            <div className="container">
                <div className="Dropzone__container">
                    <input
                        type="file"
                        className={`Dropzone__area ${activeDragArea ? 'Dropzone__area--active' : ''}`}
                        onDragLeave={() => setActiveDragArea(false)}
                        onDragEnter={() => setActiveDragArea(true)}
                        onClick={(e) => {e.preventDefault()}}
                        onChange={onImageChange}
                    />
                    <div className="Dropzone__image">
                        <div className="Dropzone__cont--image">
                            <img src={uploaedeImg ? uploaedeImg : Rectangle} alt=""/>
                            <svg><circle transform="rotate(-90)" strokeDasharray={`${loadPropgress}px 408px`} r="40.5" /></svg>
                        </div>
                        <div className="Dropzone__cont--text">
                            {errorMessage 
                            ? <p className="Dropzone__error">Please select a jpeg or png file</p>
                            : <p className="Dropzone__message">Drag &amp; drop here</p>
                            }
                            <span>- or -</span>
                            <label htmlFor="select__file">
                                Select file to upload
                            </label>
                            <input id="select__file"  type="file" onChange={onImageChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Dropzone;