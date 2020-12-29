import React from 'react';
import './App.css';
import beepSound from './audio/Beep.mp3'

let timer = '';

function stringify(x) {
  let string = '';
  if(x < 10) {
    string = ['0', x.toString()].join('');
    return string;
  } else {
    string = x.toString();
    return string;
  }
}

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: beepSound,
      breakTime: 5,
      sessionTime: 25,
      currentSessionTime: 25,
      minFormat:'25',
      secLeft:0,
      secFormat:'00',
      countStatus:'Paused',
      sessionStatus:'Session'
    };
    this.resetTimer = this.resetTimer.bind(this);
    this.startAndStop = this.startAndStop.bind(this);
    this.biggerBreak = this.biggerBreak.bind(this);
    this.smallerBreak = this.smallerBreak.bind(this);
    this.biggerSession = this.biggerSession.bind(this);
    this.smallerSession = this.smallerSession.bind(this);
  }

  startAndStop() {
    if(this.state.countStatus === 'Paused') {
      timer = setInterval(function myTimer() {
        if(this.state.sessionStatus === 'Session') {
          if(this.state.currentSessionTime > 0 && this.state.secLeft == 0) {
            let min = this.state.currentSessionTime - 1;
            let sec = 59;
            this.setState({
              currentSessionTime: min,
              secLeft: sec,
              minFormat: stringify(min),
              secFormat: stringify(sec)
            });
          } else if(this.state.secLeft > 0) {
            let sec = this.state.secLeft - 1;
            this.setState({
              secLeft: sec,
              secFormat: stringify(sec)
            });
          } else {
            let min = this.state.breakTime;
            let playSound = document.getElementById('beep');
            playSound.play();
            this.setState({
              currentSessionTime: min,
              minFormat: stringify(min),
              sessionStatus: 'Break'
            });
          }
        } else if(this.state.sessionStatus === 'Break') {
          if(this.state.currentSessionTime > 0 && this.state.secLeft == 0) {
            let min = this.state.currentSessionTime - 1;
            let sec = 59;
            this.setState({
              currentSessionTime: min,
              secLeft: sec,
              minFormat: stringify(min),
              secFormat: stringify(sec)
            });
          } else if(this.state.secLeft > 0) {
            let sec = this.state.secLeft - 1;
            this.setState({
              secLeft: sec,
              secFormat: stringify(sec)
            });
          } else {
            let min = this.state.sessionTime;
            let playSound = document.getElementById('beep');
            playSound.play();
            this.setState({
              currentSessionTime: min,
              minFormat: stringify(min),
              sessionStatus: 'Session'
            });
          }
        }
      }.bind(this), 1000);
      this.setState({
        countStatus: 'Play'
      });
    } else if(this.state.countStatus === 'Play') {
      clearInterval(timer);
      this.setState({
        countStatus: 'Paused'
      });
    }
  }

  resetTimer() {
    clearInterval(timer);
    let playSound = document.getElementById('beep');
    playSound.pause();
    playSound.currentTime = 0;
    this.setState({
      breakTime:5,
      sessionTime:25,
      currentSessionTime: 25,
      minFormat:'25',
      secLeft:0,
      secFormat:'00',
      countStatus:'Paused',
      sessionStatus:'Session'
    });
  }

  biggerBreak() {
    clearInterval(timer);
    if(this.state.breakTime < 60) {
      let min = this.state.breakTime + 1;
      if(this.state.sessionStatus === 'Break') {
        this.setState({
          breakTime: min,
          currentSessionTime: min,
          secLeft: 0,
          minFormat: stringify(min),
          secFormat: '00',
          countStatus: 'Paused'
        });
      } else {
        this.setState({
          breakTime: min,
          countStatus: 'Paused'
        });
      }
    } else {
      this.setState({
        currentSessionTime: 60,
        secLeft: 0,
        minFormat: '60',
        secFormat: '00',
        countStatus: 'Paused'
      });
    }
  }

  smallerBreak() {
    clearInterval(timer);
    if(this.state.breakTime > 1) {
      let min = this.state.breakTime - 1;
      if(this.state.sessionStatus === 'Break') {
        this.setState({
          breakTime: min,
          currentSessionTime: min,
          secLeft: 0,
          minFormat: stringify(min),
          secFormat: '00',
          countStatus: 'Paused'
        });
      } else {
        this.setState({
          breakTime: min,
          countStatus: 'Paused'
        });
      }
    } else {
      this.setState({
        countStatus: 'Paused'
      });
    }
  }

  biggerSession() {
    clearInterval(timer);
    if(this.state.sessionTime < 60) {
      let min = this.state.sessionTime + 1;
      if(this.state.sessionStatus === 'Session') {
        this.setState({
          sessionTime: min,
          currentSessionTime: min,
          secLeft: 0,
          minFormat: stringify(min),
          secFormat: '00',
          countStatus: 'Paused'
        });
      } else {
        this.setState({
          sessionTime: min,
          countStatus: 'Paused'
        });
      }
    } else {
      this.setState({
        currentSessionTime: 60,
        secLeft: 0,
        minFormat: '60',
        secFormat: '00',
        countStatus: 'Paused'
      });
    }
  }

  smallerSession() {
    clearInterval(timer);
    if(this.state.sessionTime > 1) {
      let min = this.state.sessionTime - 1;
      if(this.state.sessionStatus === 'Session') {
        this.setState({
          sessionTime: min,
          currentSessionTime: min,
          secLeft: 0,
          minFormat: stringify(min),
          secFormat: '00',
          countStatus: 'Paused'
        });
      } else {
        this.setState({
          sessionTime: min,
          countStatus: 'Paused'
        });
      }
    } else {
      this.setState({
        countStatus: 'Paused'
      });
    }
  }

  render() {
    return (
      <div>
        <p id="break-label">Break length (min)
        </p>

        <p id="session-label">Session length (min)
        </p>

        <p id="break-length">{this.state.breakTime}
        </p>

        <p id="session-length">{this.state.sessionTime}
        </p>

        <button id="break-increment" onClick={this.biggerBreak}>B
        </button>

        <button id="break-decrement" onClick={this.smallerBreak}>b
        </button>

        <button id="session-increment" onClick={this.biggerSession}>S
        </button>

        <button id="session-decrement" onClick={this.smallerSession}>s
        </button>

        <p id="timer-label">{this.state.sessionStatus}
        </p>

        <p id="time-left">{this.state.minFormat}:{this.state.secFormat}
        </p>

        <audio src={this.state.source} id='beep' />

        <button id="start_stop" onClick={this.startAndStop}>||
        </button>

        <button id="reset" onClick={this.resetTimer}>X
        </button>

        <p>{this.state.countStatus}
        </p>
      </div>
    );
  }
}
export default Setting;
