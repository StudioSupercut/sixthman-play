import React from 'react';
import './Game.css';

const game = (props) => {
    console.log('[Person.js] rendering...');
    return (
        <div className="game">
            <div className="gameDetails">
                    <div className="time"><p>{props.time}</p></div>
                    <div className="venue"><p>{props.venue}</p></div>
            </div>
            <div className="gameSection">
                <div className="teamName">{props.homeTeam}</div>
            </div>
            <div className="gameSection">
                <div className="teamName">{props.awayTeam}</div>
            </div>               
            <div className="gameSection">
                <div className="dutyTeam">Duty: {props.dutyTeam}</div>
            </div>
        </div>
    )
}

export default game;