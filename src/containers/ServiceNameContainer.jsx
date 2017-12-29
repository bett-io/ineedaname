import React from 'react';

import { connect } from 'react-redux';
import { namesUpdated } from '../actions';
import { generateNames } from '../libs/nameGenerator';
import NameInputForm from '../components/NameInputForm';
import NameResult from '../components/NameResult';
import PropTypes from 'prop-types';

const ServiceNameContainer = props => {
  const {
    names,
    onServiceNamesRequest,
  } = props;

  return (
    <div>
      <NameInputForm onSubmit={ onServiceNamesRequest }/>
      <NameResult names={ names }/>
    </div>
  );
};

ServiceNameContainer.propTypes = {
  names: PropTypes.array.isRequired,
  onServiceNamesRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return { names: state.names };
};

const mapDispatchToProps = dispatch => {
  return {
    onServiceNamesRequest: prefix => {
      const countOfNames = 10;
      const terminalWeightTable = {
        '7': 3, // x2 the probability to end word. Thus, lower the posibility of word which is longer than 7.
        '9': 10,
        '11': 100,
      };

      dispatch(namesUpdated(generateNames(prefix, countOfNames, { terminalWeightTable })));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceNameContainer);
