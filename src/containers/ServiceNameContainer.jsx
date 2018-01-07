import React from 'react';

import { connect } from 'react-redux';
import { mergeTwoTables } from '../libs/probTableMerger';
import { namesUpdated } from '../actions';
import { generateNames } from '../libs/nameGenerator';
import defProbTable1 from '../data/probTable1';
import defProbTable2 from '../data/probTable2';
import NameInputForm from '../components/NameInputForm';
import NameResult from '../components/NameResult';
import PropTypes from 'prop-types';

const ServiceNameContainer = (props) => {
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

const mapStateToProps = state => ({ names: state.names });

const generateNamesAndUpdateStore = prefix =>
  (dispatch, getState) => {
    const countOfNames = 10;
    const goodNameWeight = 100;
    const terminalWeightTable = {
      '7': 3, // x2 the probability to end word. Thus, lower the posibility of word which is longer than 7.
      '9': 10,
      '11': 100,
    };

    const goodServiceNameProbs = getState().goodServiceNameProbs;

    dispatch(namesUpdated(generateNames(prefix, countOfNames, {
      probTable1: mergeTwoTables(defProbTable1, goodServiceNameProbs['1'], 1, goodNameWeight),
      probTable2: mergeTwoTables(defProbTable2, goodServiceNameProbs['2'], 1, goodNameWeight),
      terminalWeightTable,
    })));
  };

const mapDispatchToProps = dispatch => ({
  onServiceNamesRequest: prefix => dispatch(generateNamesAndUpdateStore(prefix)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceNameContainer);
