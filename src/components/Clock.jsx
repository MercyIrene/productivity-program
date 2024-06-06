import { useState } from 'react';
import LengthSetter from './LengthSetter';
import Display from './Display';
import Controls from './Controls';

const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;

function Clock() {
  const [started, setStarted] = useState(false);
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_LENGTH);
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH);
  const [activeClock, setActiveClock] = useState("S");
  const [reset, setReset] = useState(0);

  function handleReset() {
    setBreakLength(DEFAULT_BREAK_LENGTH);
    setSessionLength(DEFAULT_SESSION_LENGTH);
    setActiveClock('S');
    setReset(reset + 1);
    setStarted(false);

    const audioEl = document.getElementById("beep");
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  }

  return (
    <div className="clock">
      <div className="title">25 + 5 Clock</div>
      <div className="length-setters">
        <LengthSetter 
          type="break"
          disabled={started}
          label="Break Length"
          length={breakLength}
          setter={setBreakLength}
        />
        <LengthSetter
          type="session"
          disabled={started}
          label="Session Length"
          length={sessionLength}
          setter={setSessionLength}
        />
      </div>
      <Display
        started={started}
        reset={reset}
        activeClock={activeClock}
        setActiveClock={setActiveClock}
        sessionLength={sessionLength}
        breakLength={breakLength}
      />
      <Controls setStarted={setStarted} onReset={handleReset} />
      <div>Coded by Mercy Irene</div>
    </div>
  );
}

export default Clock;
