import React from 'react';
import { withRouter } from 'react-router-dom';
import Item from '../items/Item';

class ItemsByRoom extends React.Component {
  state = {
    items: [],
    rooms: []
  }

  componentDidMount() {
    this.getRoom();
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

  getRoom = () => {
    const { roomId } = this.props.match.params;
    console.log(roomId)
    return fetch(`http://localhost:8000/rooms/${roomId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(res => {
        this.setState({ rooms: res.results })
    })
}


  render() {
    const { items, rooms } = this.state;
    const item = items.map((item) => <Item key={item.id} item={item} />)
    return (
      <div className="text-center">
        <h1 className="text-center mt-3 headline">Items By Room</h1>
        <div className="collection-container">
          {item}
        </div>
      </div>
    )
  }
}

export default withRouter(ItemsByRoom);
