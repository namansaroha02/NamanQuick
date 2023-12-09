import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation,faCircle,faUser,faCircleExclamation,faBolt,faAngleRight,faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import './Card.css';

const customStyle={
    color:""
}

function Card(props){
    if(props.priority===faCircleExclamation){
        customStyle.color="red";
    }
    else if(props.priority===faBolt){
        customStyle.color="green";
    }
    else if(props.priority===faAnglesRight){
        customStyle.color="orange";
    }
    else if(props.priority===faAngleRight){
        customStyle.color="blue";
    }
    else{
        customStyle.color='grey';
    }
    return <div className="cardFull">
        <p className="first">{props.name}</p>
        <FontAwesomeIcon className="human" icon={faUser} />
        <p className="content"><b>{props.title}</b></p>
        <p className="icn"><FontAwesomeIcon style={customStyle} icon={props.priority} /></p>
        <p className="what"><FontAwesomeIcon className="circle" icon={faCircle} />{props.tag}</p>
    </div>
}

export default Card;