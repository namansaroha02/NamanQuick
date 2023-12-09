import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation,faCircle,faUser, faClock,faCircleExclamation,faBolt,faAngleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './Card1.css';

const customStyle={
    color:""
}

function Card1(props){
    if(props.mid===faCircleExclamation){
        customStyle.color="red";
    }
    else if(props.mid===faBolt || props.mid===faCircle){
        customStyle.color="green";
    }
    else if(props.mid===faClock){
        customStyle.color="orange";
    }
    else if(props.mid===faAngleRight){
        customStyle.color="blue";
    }
    else{
        customStyle.color='grey';
    }
    return <div className="cardFull">
        <p className="first">{props.name}</p>
        <FontAwesomeIcon className="human" icon={faUser} />
        <div className="mainForCard2">
        <FontAwesomeIcon style={customStyle} className="middleIcon" icon={props.mid} />
            <div>
                <p className="content"><b>{props.title}</b></p>
            </div>
        </div>
        <p className="what"><FontAwesomeIcon className="circle" icon={faCircle} />{props.tag}</p>
    </div>
}

export default Card1;