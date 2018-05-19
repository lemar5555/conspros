import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

const entrySource = {
  beginDrag({ entryId, entryType }) {
    return {
      entryId,
      entryType
    };
  },
  canDrag({ entryId }) {
    return entryId;
  },
  endDrag({ entryId, cahngeEntryType }, monitor) {
    const result = monitor.getDropResult();
    if (!result) {
      return false;
    }
    cahngeEntryType({entryType: result.target, entryId});
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

const EntryItem = ({ index,  onChange, value, connectDragSource }) => {
  return connectDragSource(
    <div>
      <ListGroupItem>
        <span className="font-weight-bold mr-3">{index + 1}</span>
        <input
          onChange={onChange}
          value={value}
          type="text"
          className="border-0"
        />
      </ListGroupItem>
    </div>
  )
};

EntryItem.propTypes = propTypes;

export default DragSource('EntryDraggable', entrySource, collect)(EntryItem);
