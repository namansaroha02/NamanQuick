import React from "react";
import "./Board1.css";
import Card1 from "../Card1/Card1";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis, faCircle, faCircleExclamation, faClock, faCircleCheck, faCircleXmark, faAngleRight, faAnglesRight, faBolt, faExclamation } from '@fortawesome/free-solid-svg-icons';

// let count0=0,count1=0,count2=0,count3=0,count4=0;

function createCard(ticket, boardPriority) {
    // console.log(ticket.title);
    var temp = "";
    if (boardPriority == "No Priority") {
        temp = 0;
    }
    else if (boardPriority == "Urgent") {
        temp = 4;
    }
    else if (boardPriority == "High") {
        temp = 3;
    }
    else if (boardPriority == "Medium") {
        temp = 2;
    }
    else {
        temp = 1;
    }
    var statusSymbol = null;
    if (ticket.status == "Todo") {
        statusSymbol = faCircle;
    }
    else if (ticket.status == "In progress") {
        statusSymbol = faClock;
    }
    else if (ticket.status == "Backlog") {
        statusSymbol = faCircleExclamation;
    }
    else if (ticket.status == "Done") {
        statusSymbol = faCircleCheck;
    }
    else {
        statusSymbol = faCircleXmark;
    }
    if (ticket.priority === temp) {
        return <Card1
            name={ticket.id}
            title={ticket.title}
            tag={ticket.tag[0]}
            mid={statusSymbol}
        />
    }
}

const customStyle={
    color:""
}



function Board1(props) {
    // console.log(props.whatToShow);
    var tickets = props.whatToShow;
    // console.log(tickets);

    if(props.icn===faCircleExclamation){
        customStyle.color="red";
    }
    else if(props.icn===faBolt){
        customStyle.color="green";
    }
    else if(props.icn===faAnglesRight){
        customStyle.color="orange";
    }
    else if(props.icn===faAngleRight){
        customStyle.color="blue";
    }
    else{
        customStyle.color='grey';
    }

        
    let priority0 = 0;
    let priority1 = 0;
    let priority2 = 0;
    let priority3 = 0;
    let priority4 = 0;

    if (tickets && Array.isArray(tickets)) {
        tickets.forEach(ticket => {
        const status = ticket.priority; 

        switch (status) {
            case 0:
            priority0++;
            break;
            case 1:
            priority1++;
            break;
            case 2:
            priority2++;
            break;
            case 3:
            priority3++;
            break;
            case 4:
            priority4++;
            break;
        }
        });
    }

    var num=null;
    if(props.title=='No Priority'){
        num=priority0;
    }
    else if(props.title=='Low'){
        num=priority1;
    }
    else if(props.title=='Medium'){
        num=priority2;
    }
    else if(props.title=='High'){
        num=priority3;
    }
    else{
        num=priority4;
    }



    console.log(props.title);
    return (
        <div className="board">
            <div className="title">
                <p ><FontAwesomeIcon style={customStyle} className="board-icn" icon={props.icn} />{props.title+"  "+" "+num}</p>
                <div className="icons">
                    <p className="addIcons"><FontAwesomeIcon className="board-third-icn" icon={faEllipsis} /></p>
                    <p className="addIcons"><FontAwesomeIcon className="board-second-icn" icon={faPlus} /></p>
                </div>
            </div>
            {props.sortingType === 'PriorityWise' && tickets && tickets
                .sort((a, b) => {
                    if (a.priority === b.priority) {
                        // If priorities are equal, sort by title
                        return a.title.localeCompare(b.title);
                    }
                    // Otherwise, sort by priority
                    return a.priority > b.priority ? 1 : -1;
                })
                .map((ticket) => createCard(ticket, props.title))
            }
            {props.sortingType === 'TitleWise' && tickets && tickets
                .sort((a, b) => {
                    if (a.title === b.title) {
                        // If titles are equal, sort by priority
                        return a.priority > b.priority ? 1 : -1;
                    }
                    // Otherwise, sort by title
                    return a.title.localeCompare(b.title);
                })
                .map((ticket) => createCard(ticket, props.title))
            }
        </div>
    )
}

export default Board1;