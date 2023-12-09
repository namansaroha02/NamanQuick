import React, { useState, useEffect } from "react";
import "./Board2.css";
import Card2 from "../Card2/Card2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis, faCircle, faCircleExclamation, faClock, faCircleCheck, faCircleXmark, faAngleRight, faAnglesRight, faBolt, faExclamation, faUser } from '@fortawesome/free-solid-svg-icons';

function createCard(ticket, numberId) {
    // console.log(numberId);
    var prioritySymbol = "";
    if (ticket.priority == 0) {
        prioritySymbol = faEllipsis;
    }
    else if (ticket.priority == 4) {
        prioritySymbol = faExclamation;
    }
    else if (ticket.priority == 3) {
        prioritySymbol = faBolt;
    }
    else if (ticket.priority == 2) {
        prioritySymbol = faAnglesRight;
    }
    else {
        prioritySymbol = faAngleRight;
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
    // console.log(numberId);

    if (ticket.userId === numberId) {
        return <Card2
            name={ticket.id}
            title={ticket.title}
            tag={ticket.tag[0]}
            mid={statusSymbol}
            priority={prioritySymbol}
        />
    }
}

function Board2(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then((result) => result.json())
            .then((resp) => {
                setData(resp);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    if (!data || !data.tickets || !data.users) {
        // Data is still loading or not available
        return null; // You can render a loading state or return nothing
    }

    const tickets = data.tickets || [];
    const numberId = props.whatToShow;

    const userTaskCounts = {};
    data.users.forEach(user => {
        userTaskCounts[user.id] = 0;
    });

    data.tickets.forEach(ticket => {
        const userId = ticket.userId;
        if (userId && userTaskCounts.hasOwnProperty(userId)) {
            userTaskCounts[userId]++;
        } else {
            console.error(`Invalid userId (${userId}) in ticket: ${ticket.id}`);
        }
    });

    const numberOfTasks = userTaskCounts[numberId] || 0; // Corrected to use numberId as the key
    return (
        <div className="board">
            <div className="title">
                <p ><FontAwesomeIcon className="board-icn" icon={faUser} />{props.title + " "+" "+numberOfTasks}</p>
                <div className="icons">
                    <p className="addIcons"><FontAwesomeIcon className="board-third-icn" icon={faEllipsis} /></p>
                    <p className="addIcons"><FontAwesomeIcon className="board-second-icn" icon={faPlus} /></p>
                </div>
            </div>
            {props.sorting === 'PriorityWise' && tickets && tickets
                .sort((a, b) => {
                    if (a.priority === b.priority) {
                        // If priorities are equal, sort by title
                        return a.title.localeCompare(b.title);
                    }
                    // Otherwise, sort by priority
                    return a.priority < b.priority ? 1 : -1;
                })
                .map((ticket) => createCard(ticket, numberId))}

            {props.sorting === 'TitleWise' && tickets && tickets
                .sort((a, b) => {
                    if (a.title === b.title) {
                        // If titles are equal, sort by priority
                        return a.priority < b.priority ? 1 : -1;
                    }
                    // Otherwise, sort by title
                    return a.title.localeCompare(b.title);
                })
                .map((ticket) => createCard(ticket, numberId))}
        </div>
    )
}

export default Board2;