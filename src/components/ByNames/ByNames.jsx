import React, { useEffect, useState } from "react";
import "./ByNames.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleExclamation, faClock, faCircleCheck, faCircleXmark, faEllipsis, faAnglesRight, faAngleRight, faBolt } from '@fortawesome/free-solid-svg-icons';
import Board2 from "../Board2/Board2";

function createBoard(u,user,sortingType) {
    return (
        <div>
            <Board2 title={u.name} whatToShow={u.id} sorting={sortingType}/>
        </div>
    )
}

function ByNames(props) {
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

    const user = data.users || []; // Ensure user is defined or provide a default empty array

    return (
        <div className="app_outer">
            <div className="app_boards">
                {user && user
                .sort((a,b)=>a.id>b.id?1:-1)
                .map((u)=>createBoard(u,user,props.sorting))}
            </div>
        </div>
    )
}

export default ByNames
