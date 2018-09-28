import React, { Component } from 'react';
import "../css/lightbulb.css"

class lightbulb extends Component {
    state = {
        lightbulb: "on"
    }

    switchLightbulb = () => {
        this.setState({lightbulb : "off"})
    }

    attempShoot = () => {
        console.log("shooooooot")
    }

    render() {
        return (
            <div>
            <div id="lampadario">
                <input type="radio" name="switch" value={this.state.lightbulb} />
                <input type="radio" name="switch" value={this.state.lightbulb} checked="checked"/>
                <label for="switch"></label>
                <div id="filo"></div>
                <div id="lampadina">             
                <div id="sorpresa"></div>
            </div>
        </div>
     <div style={{marginTop: 400}}>
        <a onClick={this.switchLightbulb} href="#" className="myButton">Ready</a>
    </div>
    {this.state.lightbulb === "off" && (
    <div style={{marginTop: 50}}>
        <a onClick={this.attempShoot} href="#" className="shootButton">Shoot</a>
    </div>)
    }
    </div>

        );
    }
}

export default lightbulb;