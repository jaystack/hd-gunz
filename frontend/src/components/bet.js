import React, { Component } from 'react';
import bullet from '../assets/bullet.png'
import '../css/revolver.css'
import '../css/button.css'
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
        numberOfPlayers : 4,
        betReady: false
    }

    takeBet = () => { 
        this.setState({betReady : !this.state.betReady})
    }

    attempBet = () => {
        if(this.state.betReady) return;
        this.setState({bet : 10 , current : this.state.current - 10})
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
                    <div onClick={this.attempBet} className="coin silver"><p>{this.state.bet}</p></div>
                </div> 
                {!this.state.betReady && (
                    <div className="buttonContainer">
                        <a onClick={this.takeBet} href="#" class="myButton">Bet</a>
                    </div>
                )
                }
                    {this.state.betReady && (
                    <div className="revolverContainer">
                        <div class="loader">
                            <div class="inner">
                        </div>
                        </div>
                    </div>
                    )
                }
            </div>
        );
    }
}

export default bet;