import React, { Component } from 'react';
import { ListGroup, ListGroupItem  } from 'reactstrap';
import { DragSource, DropTarget } from 'react-dnd';
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

const DraggableEntryItem = DragSource('EntryDraggable', entrySource, collect)(EntryItem);

class ConsProsCol extends Component {

  componentDidMount() {
    this.props.addEmptyEntry({ entryType: this.props.item.id });
  }

  handleChange = ({ entryType, title, entry }) => {
    if (!entry.id) {
      this.props.addEntry({
        title,
        entryType
      });
    } else if (title.length === 0 && entry.id) {
      this.props.removeEntry({
        entryId: entry.id,
        entryType
      });
    } else {
      this.props.changeEntry({
        title,
        entryId: entry.id,
        entryType
      });
    }
  }

  render() {
    const { item, connectDropTarget, changeEntryType } = this.props;

    return connectDropTarget(
      <div className="cons-pros-col">
        <h4 className="m-0 text-center p-2">{item.title}</h4>
        <ListGroup>
          {item.list.map((entry, index) => (
            <DraggableEntryItem
              key={index}
              index={index}
              value={entry.title}
              entryId={entry.id}
              entryType={entry.type}
              cahngeEntryType={changeEntryType}
              onChange={(e) => {
                this.handleChange({
                  entryType: entry.type,
                  title: e.target.value,
                  entry: entry
                });
              }}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default DropTarget('EntryDraggable', {
  drop({ item: { id } }) {
    return {
      target: id
    }
  },
  canDrop({ item }, monitor) {
    const { entryType } = monitor.getItem();
    const targetType = item.id;

    return entryType !== targetType;
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(ConsProsCol);
