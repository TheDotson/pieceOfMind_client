import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Item from '../items/Item';

class ItemsByRoom extends React.Component {
  state = {
    items: [],
  }

  componentDidMount() {
    this.getItemsByRoom();
  }

  getItemsByRoom = () => {
    const { roomId } = this.props.match.params;
    return fetch(`http://localhost:8000/items?location=${roomId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      })
    .then(res => res.json())
    .then(res => {
      this.setState({ items: res.results })
    })
  }

  render() {
    const { items } = this.state;
    const item = items.map((item) => <Item key={item.id} item={item} />)
    return (
      <div>
        <h1 className="text-center mt-3">Items By Room</h1>
        <div className="collection">
          {item}
        </div>
      </div>
    )
  }
}

export default withRouter(ItemsByRoom);
