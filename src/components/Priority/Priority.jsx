import React,{useEffect,useState} from "react";
import "./Priority.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faCircleExclamation,faClock,faCircleCheck,faCircleXmark, faEllipsis, faAnglesRight,faAngleRight,faBolt} from '@fortawesome/free-solid-svg-icons';
import Board1 from "../Board1/Board1";

function Priority(props){
    const [data,setData]=useState([])
    useEffect(() => {
      fetch("https://api.quicksell.co/v1/internal/frontend-assignment").then((result)=>{
        result.json().then((resp)=>{
            // console.warn("result",resp)
            setData(resp)
        })
      })
    }, [])
    const tickets=data.tickets;

    return(
        <div className="app_outer">
            <div className="app_boards">
                <div>
                    <Board1 title="No Priority" icn={faEllipsis} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                    <Board1 title="Urgent" icn={faCircleExclamation} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                    <Board1 title="High" icn={faBolt} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                    <Board1 title="Medium" icn={faAnglesRight} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                    <Board1 title="Low" icn={faAngleRight} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
            </div>
        </div>
    )
}   

export default Priority;