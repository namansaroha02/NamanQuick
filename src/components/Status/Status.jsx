import React,{useEffect,useState} from "react";
import "./Status.css";
import Board from "../Board/Board";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faCircleExclamation,faClock,faCircleCheck,faCircleXmark} from '@fortawesome/free-solid-svg-icons'

function Status(props){
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
                <Board title="Backlog" icn={faCircleExclamation} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                <Board title="Todo" icn={faCircle} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                <Board title="In progress" icn={faClock} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                <Board title="Done" icn={faCircleCheck} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
                <div>
                <Board title="Cancelled" icn={faCircleXmark} whatToShow={tickets} sortingType={props.sorting}/>
                </div>
            </div>
        </div>
    )
}   

export default Status;