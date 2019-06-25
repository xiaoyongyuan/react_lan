import React, { Component } from 'react';
import "./index.less";

class Index extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return(
            <div className="homePage">
                <div className="equNum">
                    <div className="equ">1</div>
                    <div className="equ">2</div>
                    <div className="equ">3</div>
                    <div className="equ">4</div>
                    <div className="equ">5</div>
                    <div className="equ">6</div>
                </div>
                <div className="equContext">222222222222222222</div>
            </div>
        );
    }
}

export default Index;
