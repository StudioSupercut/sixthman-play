import React, { Component } from 'react';
import './App.css';
import Game from './Game/Game.js';
import drawdata from './2019_1_OMM2.json';


class App extends Component {
  constructor (props){
    super(props);
    console.log('[App.js] constructor');
    console.log(drawdata.rounds);
    let currentRoundIndex = this.findRound(drawdata.rounds);
    let currentRound = this.findRound(drawdata.rounds) + 1;

    let isFirstRound = this.firstRoundCheck(currentRound);
    let isLastRound = this.lastRoundCheck(currentRound);

    this.state = {
      round: currentRound,
      firstRound: isFirstRound,
      lastRound: isLastRound,
      games: drawdata.rounds[this.findRound(drawdata.rounds)].games
    } 
    
    //this.allRounds = drawdata.rounds;
  }
  
  findRound(allRounds) {
   return allRounds.findIndex(this.isToday);
  }

  isToday = (element) => {
    let today = new Date();
    let roundDate = new Date(element.date);

    return roundDate >= today;
  }


  firstRoundCheck = (currentRound) => {
    if(currentRound === 1) {
      return true;
    } else {
      return false;
    }
  }

  lastRoundCheck = (currentRound) => {
    if(currentRound === drawdata.rounds.length) {
      return true;
    } else {
      return false;
    }
  }
  static getDerivedStateFromProps(props,state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')

  }

openDraw = () => {
    console.log('Open Draw');
    document.getElementById("ladderSlide").style.left = "400px";
    document.getElementById("drawSlide").style.left = "0px";
    document.getElementById("ladderButton").style.background = "#031F34";
    document.getElementById("drawButton").style.background = "#8E2245";
}

openLadder = () => {
    console.log('Open Ladder');
    document.getElementById("drawSlide").style.left = "-400px";
    document.getElementById("ladderSlide").style.left = "0";
    document.getElementById("ladderButton").style.background = "#8E2245";
    document.getElementById("drawButton").style.background = "#031F34";

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
        // <div>
        //   <button onClick={this.nextRoundHandler} className="button next">&raquo;</button>
        // </div>
        <div className="roundNav">
        <div className="roundNavButton prev"></div>
        <div className="roundNavDate"><h2>Round {this.state.round} of {drawdata.rounds.length}</h2></div>
        <div className="roundNavButton next"><button onClick={this.nextRoundHandler} className="circular ">&raquo;</button></div>
      </div>
      );
    } else if(this.state.lastRound) {
      drawButtons = (
        // <div>
        //   <button onClick={this.previousRoundHandler} className="button prev">&laquo;</button>
        // </div>
        <div className="roundNav">
        <div className="roundNavButton prev"><button onClick={this.previousRoundHandler} className="circular">&laquo;</button></div>
        <div className="roundNavDate"><h2>Round {this.state.round} of {drawdata.rounds.length}</h2></div>
        <div className="roundNavButton next"></div>
        </div>
      );
    } else {
      drawButtons = (
      //   <div>
      //     <button onClick={this.previousRoundHandler} className="button prev">&laquo;</button>
      //     <button onClick={this.nextRoundHandler} className="button next">&raquo;</button>
      //  </div>
        <div className="roundNav">
          <div className="roundNavButton prev"><button onClick={this.previousRoundHandler} className="circular">&laquo;</button></div>
          <div className="roundNavDate"><h2>Round {this.state.round} of {drawdata.rounds.length}</h2></div>
          <div className="roundNavButton next"><button onClick={this.nextRoundHandler} className="circular ">&raquo;</button></div>
        </div>
      );
    }


    return (
      <div className="App">
        <div className="titleBar">
          <h2>Open Men • Monday • Division 2</h2>
        </div>
        <div className="nav">
          <div className="navItem"><a href="#slide-1" onClick={this.openDraw} id="drawButton">DRAW</a></div>
          <div className="navItem"><a href="#slide-2" onClick={this.openLadder} id="ladderButton">LADDER</a></div>
        </div>    
        <div className="slide-wrap">
          <div className="compSlider">
            <div className="slide" id="drawSlide">
            <div className="drawContainer">
              
                <div className="round">         
                {drawButtons}
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
            <div className="slide" id="ladderSlide">Ladder</div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
