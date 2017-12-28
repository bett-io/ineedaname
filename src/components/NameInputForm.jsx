import React from 'react';

import PropTypes from 'prop-types';

const NameInputForm = props => {
  const {
    onSubmit,
  } = props;

  return (
    <div>
      Prefix: <input type="text" />
      <button onClick={ onSubmit }>Give me names!</button>
    </div>
  );
};

NameInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NameInputForm;
