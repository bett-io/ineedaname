import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { namesUpdated } from '../actions';
import { generateName } from '../libs/nameGenerator';
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

const onServiceNamesRequest = prefix => {
  const countOfNames = 10;
  let names = [];

  do {
    names.push(generateName(prefix));
  } while(names.length < countOfNames);

  return namesUpdated(names);
};

const mapDispatchToProps = dispatch => {
  return {
    onServiceNamesRequest: bindActionCreators(onServiceNamesRequest, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceNameContainer);
