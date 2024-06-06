import PropTypes from 'prop-types';

function LengthSetter({ type, label, length, setter, disabled }) {
  const labelId = type + '-label';
  const decrementId = type + '-decrement';
  const incrementId = type + '-increment';
  const lengthId = type + '-length';

  return (
    <div className="length-setter">
      <div className="label" id={labelId}>{label}</div>
      <i className="fa fa-arrow-up" id={incrementId} onClick={increment}></i>
      <div id={lengthId}>{length}</div>
      <i className="fa fa-arrow-down" id={decrementId} onClick={decrement}></i>
    </div>
  );

  function decrement() {
    if (disabled) {
      return;
    }
    if (length > 1) {
      setter(length - 1);
    }
  }

  function increment() {
    if (disabled) {
      return;
    }
    if (length < 60) {
      setter(length + 1);
    }
  }
}

LengthSetter.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  setter: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LengthSetter;
