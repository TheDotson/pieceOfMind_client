import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Item from '../items/Item'

class SingleCollection extends React.Component {
  state = {
    collection: {},
    rooms: []
  }

  componentDidMount() {
    this.getCollectionById()
    this.getRoomsByUser();
  }

  getCollectionById = () => {
    const { collectionId } = this.props.match.params;
    return fetch(`http://localhost:8000/collections/${collectionId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ collection: res })
    })
  }

  getRoomsByUser = () => {
    const user = localStorage.getItem('user_id')
    return fetch(`http://localhost:8000/rooms?user=${user}`, {
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
    const { collection, rooms } = this.state;
    const newItem = `/newItem/${collection.id}`
    const newRoom = `/newRoom`
    const item = collection && collection.items ? collection.items.map ((item) => <Item key={item.id} item={item} collection={collection}  />): ''
    return (
      <div className="text-center">
          <h1 className="name text-center mt-3 headline">{collection.name}</h1>
            {
                rooms.length > 0 ? (
                  <Link to={newItem}><i className="fas fa-plus-square mb-3"></i> Add Item</Link>        
                ) : (
                  <Link to={newRoom}><i className="fas fa-plus-square mb-3"></i> New Room</Link>
                )
              }
          <div className="collection-container">
            {item}
          </div>
      </div>
    )
  }
}

export default withRouter(SingleCollection);
