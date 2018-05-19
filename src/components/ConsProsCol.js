import React, { Component } from 'react';
import { ListGroup, ListGroupItem  } from 'reactstrap';

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
    const { item } = this.props;
    const colId = item.id;

    return (
      <div className="cons-pros-col">
        <h4 className="m-0 text-center p-2">{item.title}</h4>
        <ListGroup>
          {item.list.map((entry, index) => (
            <ListGroupItem key={index}>
              <span className="font-weight-bold mr-3">{index + 1}</span>
              <input
                onChange={(e) => {
                  this.handleChange({
                    entryType: colId,
                    title: e.target.value,
                    entry: entry
                  });
                }}
                value={entry.title}
                type="text"
                className="border-0"
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ConsProsCol;
