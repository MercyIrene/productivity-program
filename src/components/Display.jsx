import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import accurateInterval from '../utils/accurateInterval';

function Display({ started, reset, activeClock, setActiveClock, sessionLength, breakLength }) {
  const audioRef = useRef();
  const [timer, setTimer] = useState((activeClock === 'S' ? sessionLength : breakLength) * 60);

  const countDown = useCallback(() => {
    setTimer(prevTimer => {
      if (prevTimer > 0) {
        return prevTimer - 1;
      } else if (prevTimer === 0) {
        setActiveClock(ac => ac === 'S' ? 'B' : 'S');
        const audioEl = audioRef.current;
        audioEl.play();
        return (activeClock === 'S' ? breakLength : sessionLength) * 60;
      } else {
        throw Error(`Timer ${prevTimer} should not happen`);
      }
    });
  }, [activeClock, breakLength, sessionLength, setActiveClock]);

  useEffect(() => {
    if (started) {
      const interval = accurateInterval(countDown, 1000);
      return () => interval.cancel();
    }
  }, [started, countDown]);

  useEffect(() => {
    setTimer(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    setTimer((activeClock === 'S' ? sessionLength : breakLength) * 60);
  }, [activeClock, sessionLength, breakLength]);

  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.pause();
    audioEl.currentTime = 0;
  }, [reset]);

  function clockify() {
    const SECONDS_IN_MINUTES = 60;
    let minutes = Math.floor(timer / SECONDS_IN_MINUTES);
    let seconds = timer - minutes * SECONDS_IN_MINUTES;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    return minutes + ':' + seconds;
  }

  return (
    <div className={classnames('display', { imminent: timer < 60 })}>
      <div id="timer-label">{activeClock === 'S' ? 'Session' : 'Break'}</div>
      <div id="time-left" className="time-left">{clockify()}</div>
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

Display.propTypes = {
  started: PropTypes.bool.isRequired,
  reset: PropTypes.number.isRequired,
  activeClock: PropTypes.string.isRequired,
  setActiveClock: PropTypes.func.isRequired,
  sessionLength: PropTypes.number.isRequired,
  breakLength: PropTypes.number.isRequired,
};

export default Display;
