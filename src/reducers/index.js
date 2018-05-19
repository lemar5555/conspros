import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import idGenerator from '../utils/id-generator';

const entries = (entries = [], action) => {
  switch (action.type) {
    case types.ADD_EMPTY_ENTRY:
      return [...entries, {
        id: false,
        title: '',
        type: action.entryType
      }];
    case types.ADD_ENTRY:
      return entries.map(entry => {
        if (!entry.id && action.entryType === entry.type) {
          return {
            id: idGenerator.next().value,
            title: action.title,
            type: action.entryType
          };
        }
        return entry;
      });
    case types.CHANGE_ENTRY:
      return entries.map(entry => {
        if (entry.id === action.entryId) {
          return {
            ...entry,
            title: action.title
          };
        }
        return entry;
      });
    case types.REMOVE_ENTRY:
      const entry = entries.find(entry => {
        return entry.id === action.entryId;
      });
      const entryIndex = entries.indexOf(entry);
      entries.splice(entryIndex, 1);
      return [...entries];
    default:
      return entries;
  }
};

export default combineReducers({
  entries
});
