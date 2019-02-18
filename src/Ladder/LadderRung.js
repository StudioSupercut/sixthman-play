import React from 'react';


const ladderrung = (props) => {

    return (
        <div className="ladderRung">
            <div className="ladderPosition">{props.position}</div>
            <div className="ladderTeamName">{props.teamName}</div>
            <div className="ladderPoints">{props.points}</div>
        </div>
    )
}

export default ladderrung;