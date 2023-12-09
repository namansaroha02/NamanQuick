import React from "react";
import "./Board.css";
import Card from "../card/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPlus, faEllipsis, faCircleExclamation, faAngleRight, faAnglesRight, faBolt, faCircle,faClock } from '@fortawesome/free-solid-svg-icons';

function createCard(ticket, boardTitle) {
    var prioritySymbol = "";
    if (ticket.priority === 0) {
        prioritySymbol = faEllipsis;
    }
    else if (ticket.priority === 1) {
        prioritySymbol = faAngleRight;
    }
    else if (ticket.priority === 2) {
        prioritySymbol = faAnglesRight;
    }
    else if (ticket.priority === 3) {
        prioritySymbol = faBolt;
    }
    else {
        prioritySymbol = faCircleExclamation
    }
    if (ticket.status === boardTitle) {
        return <Card
            name={ticket.id}
            title={ticket.title}
            tag={ticket.tag[0]}
            priority={prioritySymbol}
        />
    }
}

const customStyle={
    color:""
}

function Board(props) {
    var tickets = props.whatToShow;

    if(props.icn===faCircleExclamation){
        customStyle.color="red";
    }
    else if(props.icn===faCircle){
        customStyle.color="green";
    }
    else if(props.icn===faClock){
        customStyle.color="orange";
    }
    else if(props.icn===faCircleCheck){
        customStyle.color="blue";
    }
    else{
        customStyle.color='grey';
    }
        
    let backlogCount = 0;
    let inProgressCount = 0;
    let todoCount = 0;
    let doneCount = 0;
    let cancelledCount = 0;

    if (tickets && Array.isArray(tickets)) {
        tickets.forEach(ticket => {
        const status = ticket.status.toLowerCase(); 

        switch (status) {
            case "backlog":
            backlogCount++;
            break;
            case "in progress":
            inProgressCount++;
            break;
            case "todo":
            todoCount++;
            break;
            case "done":
            doneCount++;
            break;
            case "cancelled":
            cancelledCount++;
            break;
        }
        });
    }

    var num=null;
    if(props.title=='Backlog'){
        num=backlogCount;
    }
    else if(props.title=='In progress'){
        num=inProgressCount;
    }
    else if(props.title=='Todo'){
        num=todoCount;
    }
    else if(props.title=='Done'){
        num=doneCount;
    }
    else{
        num=cancelledCount;
    }


    return (
        <div className="board">
            <div className="title">
                <p ><FontAwesomeIcon style={customStyle} className="board-icn" icon={props.icn} />{props.title +"  "+" "+ num}</p>
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
                    return a.priority < b.priority ? 1 : -1;
                })
                .map((ticket) => createCard(ticket, props.title))}

            {props.sortingType === 'TitleWise' && tickets && tickets
                .sort((a, b) => {
                    if (a.title === b.title) {
                        // If titles are equal, sort by priority
                        return a.priority < b.priority ? 1 : -1;
                    }
                    // Otherwise, sort by title
                    return a.title.localeCompare(b.title);
                })
                .map((ticket) => createCard(ticket, props.title))}

        </div>
    )
}

export default Board;