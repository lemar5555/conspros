import React, { Component } from 'react';
import { ListGroup  } from 'reactstrap';
import { DropTarget } from 'react-dnd';
import DraggableEntryItem from './DraggableEntryItem';

const entryDropTarget = {
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
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

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

export default DropTarget('EntryDraggable', entryDropTarget, collect)(ConsProsCol);
