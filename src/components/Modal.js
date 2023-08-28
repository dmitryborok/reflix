import { useEffect, useState } from "react";
import { urlGiphy } from "../config/constants";

function Modal({show, movieTitle, hideModal}) {
    const [giphyUrl, setGiphyUrl] = useState("");

    const getGiphy = async function(movieTitle){
        const response = await fetch(urlGiphy(movieTitle));
        const dataArray = await response.json();
        if (dataArray.data.length == 0) {
            setGiphyUrl("");  
        } else {
             setGiphyUrl(dataArray.data[0].embed_url);  
        }
    }

    useEffect(() => {getGiphy(movieTitle)}, []);

   
    return (<div className={show? "modal" : "invisible"}>
                <h4>Rented <i>{movieTitle}</i> Successfully!</h4>
                {giphyUrl === "" ? 
                    <div className="giphy-placeholder"><h5>Loading...</h5></div>
                    : <div><iframe width="600px" height = "450px" src={giphyUrl} title={"GIPHY found for '" + movieTitle + "'"}></iframe></div>}
                <button className="hide-modal-btn" onClick={hideModal}>OK</button>
            </div>);
}

export default Modal;