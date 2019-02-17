import React, { Component } from 'react';
import './App.css';
import Game from './Game/Game.js';
import drawdata from './2019_1_OMM2.json';


class App extends Component {
  constructor (props){
    super(props);
    console.log('[App.js] constructor');
    console.log(drawdata.rounds);
    // this.findRound(drawdata.rounds);
    this.state = {
      round: 1,
      firstRound: true,
      lastRound: false,
      games: drawdata.rounds[0].games
    } 
  }
  
  findRound(rounds) {
    // let i = 1;
    // let currentRound = 1;
    // do {
    //    currentRound = i;
      
    // }
    // while (rounds[i].roundNo !== 6) {
    //   i++;
    // }
    // return currentRound;
  }

  static getDerivedStateFromProps(props,state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')

  }

  nextRoundHandler = () => {  
    let newRound = this.state.round + 1
    this.setState({
      round: newRound,
      games: drawdata.rounds[newRound-1].games
    })
    if(newRound !== 1) {
      this.setState({
        firstRound: false
      })
    }
    if(newRound === drawdata.rounds.length) {
      this.setState({
        lastRound: true
      })
    }
  }


  previousRoundHandler = () => {  
    let newRound = this.state.round - 1
    this.setState({
      round: newRound,
      games: drawdata.rounds[newRound-1].games
    })
    if(newRound === 1) {
      this.setState({
        firstRound: true
      })
    }
    if(newRound !== drawdata.rounds.length) {
      this.setState({
        lastRound: false
      })
    }
  }
  
  render() {
    console.log('[App.js] render');

    let drawButtons = null;

    if (this.state.firstRound) {
      drawButtons = (
        <div>
          <button onClick={this.nextRoundHandler}>Next Round</button>
        </div>
      );
    } else if(this.state.lastRound) {
      drawButtons = (
        <div>
          <button onClick={this.previousRoundHandler}>Previous Round</button>
        </div>
      );
    } else {
      drawButtons = (
        <div>
          <button onClick={this.previousRoundHandler}>Previous Round</button>
          <button onClick={this.nextRoundHandler}>Next Round</button>
       </div>
      );
    }


    return (
      <div className="App">
        <div className="titleBar">
          <h2>Open Men • Monday • Division 2</h2>
          {drawButtons}
        </div>
       
        <div className="drawContainer">

          <div className="round">         
            <div className="roundDate">
              <h2>Round {this.state.round} of {drawdata.rounds.length}</h2>
            </div>
            
            <div className="gamesList">
              {this.state.games.map((game, index) => (
                  <Game 
                  homeTeam= {game.homeTeam}
                  awayTeam= {game.awayTeam}
                  time={game.time}
                  venue={game.venueAbbreviation}
                  dutyTeam={game.dutyTeam}
                  key={index} //change to game.id when set
                  />
               )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
