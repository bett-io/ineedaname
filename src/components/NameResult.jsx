import React from 'react';

import PropTypes from 'prop-types';

const listNames = names => names.map(name => (<li key={ name }>{ name }</li>));

const NameResult = (props) => {
  const {
    names,
  } = props;

  return (
    <div>
      <ul>
        { listNames(names) }
      </ul>
    </div>
  );
};

NameResult.propTypes = {
  names: PropTypes.array.isRequired,
};

export default NameResult;
