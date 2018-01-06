import React from 'react';

import PropTypes from 'prop-types';

const NameInputForm = (props) => {
  const {
    onSubmit,
  } = props;

  let inputRef = undefined;

  // Using ref in input element is a technique called 'uncontrolled component',
  // which is quick and dirty and is not recommended way.
  // https://reactjs.org/docs/forms.html
  // https://reactjs.org/docs/uncontrolled-components.html
  return (
    <div>
      Prefix: <input type="text" ref={ input => inputRef = input } />
      <button onClick={ () => onSubmit(inputRef.value) }>Give me names!</button>
    </div>
  );
};

NameInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NameInputForm;
