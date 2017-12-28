import React from 'react';

import PropTypes from 'prop-types';

const listNames = names => names.map(name => (<p>{ name }</p>));

const NameResult = props => {
  const {
    names,
  } = props;

  return (
    <div>
      { listNames(names) }
    </div>
  );
};

NameResult.propTypes = {
  names: PropTypes.array.isRequired,
};

export default NameResult;
