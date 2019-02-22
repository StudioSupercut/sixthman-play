import React from 'react';
import './Ladder.css';
import ladderData from './2019_1_OMM2_ladder.json';
import LadderRung from './LadderRung.js';


const ladder = (props) => {
    
    let teams = ladderData.teams;

    return (
        <div className="slide" id="ladderSlide">
            <h3>Ladder</h3>
            { teams.map((team, index) => (
                        <LadderRung 
                        position= {team.position}
                        teamName= {team.teamName}
                        points= {team.points}
                        key= {index}
                        />
                    ))}
        </div>
    )
}

export default ladder;