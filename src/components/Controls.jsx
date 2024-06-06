import PropTypes from 'prop-types';

function Controls({ setStarted, onReset }) {
  function handleStart() {
    setStarted(started => !started);
  }

  return (
    <div className="controls">
      <i id="start_stop" className="fa fa-play fa-2x" onClick={handleStart}></i>
      <i id="reset" className="fa fa-refresh fa-2x" onClick={onReset}></i>
    </div>
  );
}

Controls.propTypes = {
  setStarted: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Controls;
