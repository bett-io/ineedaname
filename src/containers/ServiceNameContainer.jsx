import React from 'react';

import { connect } from 'react-redux';
import { namesUpdated } from '../actions';
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

const generateNames = prefix => {
  const names = ['aaa', 'abc', 'bbc'];
  return names;
};

const mapDispatchToProps = dispatch => {
  return {
    onServiceNamesRequest: prefix => {
      const names = generateNames(prefix);
      dispatch(namesUpdated(names));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceNameContainer);
