import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faCircleExclamation,faBolt,faClock,faAngleRight,faAnglesRight, faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import './Card2.css';

const customStyle={
    color:""
}

const customStyle2={
    color:""
}

function Card2(props){
    if(props.priority===faCircleExclamation){
        customStyle.color="red";
    }
    else if(props.priority===faBolt ){
        customStyle.color="green";
    }
    else if(props.priority===faAngleRight){
        customStyle.color="blue";
    }
    else if(props.priority===faAnglesRight){
        customStyle.color="yellow";
    }
    else{
        customStyle.color='grey';
    }

    if(props.mid===faClock){
        customStyle2.color="orange";
    }
    else if(props.mid===faCircleExclamation ){
        customStyle2.color="red";
    }
    else if(props.mid===faCircle){
        customStyle2.color="green";
    }
    else if(props.mid===faCircleCheck){
        customStyle2.color="blue";
    }
    else{
        customStyle2.color='grey';
    }

    return <div className="cardFull">
        <p className="first">{props.name}</p>
        <div className="mainForCard2">
            <FontAwesomeIcon style={customStyle2} className="middleIcon" icon={props.mid} />
            <div>
                <p className="content"><b>{props.title}</b></p>
            </div>
        </div>
        <p className="icn"><FontAwesomeIcon style={customStyle} icon={props.priority} /></p>
        <p className="what"><FontAwesomeIcon className="circle" icon={faCircle} />{props.tag}</p>
    </div>
}

export default Card2;