import * as types from '../constants/ActionTypes';

export const addEntry = ({ title, entryType }) => dispatch => {
  dispatch({
    type: types.ADD_ENTRY,
    title,
    entryType
  });

  dispatch(addEmptyEntry({ entryType }));
};

export const addEmptyEntry = ({ entryType }) => ({
  type: types.ADD_EMPTY_ENTRY,
  entryType
});

export const changeEntry = ({ title, entryType, entryId }) => ({
  type: types.CHANGE_ENTRY,
  title,
  entryType,
  entryId
});

export const removeEntry = ({ entryType, entryId }) => ({
  type: types.REMOVE_ENTRY,
  entryType,
  entryId
});

export const changeEntryType = ({ entryType, entryId }) => ({
  type: types.CHANGE_ENTRY_TYPE,
  entryId,
  entryType
});

