import React from 'react';
import { connect } from 'react-redux';
import ConsProsCol from '../components/ConsProsCol';
import { changeEntry, removeEntry, addEntry, addEmptyEntry, changeEntryType } from '../actions';

const ConsProsColContainer = props =>  <ConsProsCol {...props} />;

export default connect(null, {
  changeEntry,
  removeEntry,
  addEntry,
  addEmptyEntry,
  changeEntryType
})(ConsProsColContainer);
