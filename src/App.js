import React from 'react';
import './App.css';
//Audio file imported
import beepSound from './audio/Beep.mp3';

let timer = '';
//The stringify function turn numbers under 10 into strings but with an extra 0 in front.
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
    /*breakTime holds the duration of the break in minutes.
    sessionTime holds the duration of the session in minutes.
    currentSessionTime holds the integer corresponding to the current number of minutes left.
    minFormat contains a formatted string (Ex. 9 -> '09') displaying how many minutes are left.
    secLeft holds the integer corresponding to the current number of seconds left.
    secFormat contains a formatted string (Ex. 52 -> '52') displaying how many seconds are left.
    countStatus denotes if the timer is paused or playing.
    sessionStatus describes which mode the timer is in. (Session mode or break mode)*/
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
  /*When you click on the Play/Pause button, if countStatus is set to 'Paused',
  the timer variable is assigned to the myTimer function which executes every second (1000ms) and the countStatus is set to 'Play'.
  If countStatus is set to 'Play' when clicking on the Play/Pause button, the myTimer function is stopped and the interval cleared.
  countStatus will then be set to 'Paused'.*/
  startAndStop() {
    if(this.state.countStatus === 'Paused') {
      timer = setInterval(function myTimer() {
        //The myTimer function first checks which mode the timer is in (Session mode or break mode).
        if(this.state.sessionStatus === 'Session') {
          /*When secLeft is equal to 0 but there is still at least a minute left,
          secLeft will be set to 59 and the currentSessionTime counter will be reduced by 1.
          (Respectively, secFormat and minFormat will both be set to the stringified values of secLeft and currentSessionTime)*/
          if(this.state.currentSessionTime > 0 && this.state.secLeft == 0) {
            let min = this.state.currentSessionTime - 1;

            let sec = 59;

            this.setState({
              currentSessionTime: min,
              secLeft: sec,
              minFormat: stringify(min),
              secFormat: stringify(sec)
            });
          //When secLeft will be higher than 0, secLeft will be reduced by 1.
          } else if(this.state.secLeft > 0) {
            let sec = this.state.secLeft - 1;

            this.setState({
              secLeft: sec,
              secFormat: stringify(sec)
            });
          /*Finally, when both secLeft and currentSessionTime is equal to 0,
          currentSessionTime will now be set to the value in breakTime if sessionStatus is in session mode and vice-versa.
          Also, the audio element will play a beeping sound.*/
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
  /*When the reset button is clicked, myTimer function is stopped and cleared, any alarm sound is stopped and reinitialized and finally,
  all states are reset to their default values*/
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
  /*When the break-increment button is clicked, the breakTime value is increased by 1 until it reaches 60*/
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
  /*When the break-decrement button is clicked, the breakTime value is decreased by 1 until it reaches 1*/
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
  /*When the session-increment button is clicked, the sessionTime value is increased by 1 until it reaches 60*/
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
  /*When the session-decrement button is clicked, the sessionTime value is decreased by 1 until it reaches 1*/
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
