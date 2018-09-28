import React, { Component } from 'react';
import bullet from '../assets/bullet.png'
import '../css/revolver.css'
import char1 from "../assets/char1.png";
import char2 from "../assets/char2.png";
import char3 from "../assets/char3.png";
import char4 from "../assets/char4.png";

const playersAssets = [
    char1,char2,char3,char4
]


class bet extends Component {

    state = { 
        bet : 0, 
        current : 100,
        bullet: 3,
        numberOfPlayers : 4
    }

    takeBet = () => { 

    }
    render() {
        return (
            <div>
                <div className="bulletContainer">
                    {[...Array(this.state.bullet)].map((e, i) => <img src={bullet} key={i} className="bullet"/>)}
                </div>
                <div className="playersContainer">
                     {[...Array(this.state.numberOfPlayers)].map((e, i) => <img src={playersAssets[i]} key={i} className="chars"/>)}
                </div>
                <div className="coinContainer">
                    <div className="coin gold"><p>{this.state.current}</p></div>
                    <div className="coin silver"><p>{this.state.bet}</p></div>
                </div> 
                <div className="revolverContainer">
                    <div class="loader">
                        <div class="inner">
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bet;