import React from 'react';
import './Ladder.css';
import ladderData from './2019_1_OMM2_ladder.json';
import LadderRung from './LadderRung.js';


const ladder = (props) => {
    
    // const teams = ladderData.teams;

    return (
        <div className="slide" id="ladderSlide">
            <h3>Ladder</h3>
            { ladderData.teams.map(team => (
                        <LadderRung 
                        position= {team.position}
                        teamName= {team.teamName}
                        points= {team.points}
                        />
                    ))}
        </div>
    )
}

export default ladder;