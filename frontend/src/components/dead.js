import React, { Component } from 'react';
import "../css/blink.css"

class dead extends Component {
    render() {
        return (
            <div className="deadContainer">
                <div class="blink"><span>You are dead</span></div>
            </div>
        );
    }
}

export default dead;