import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Item from '../items/Item'

class SingleCollection extends React.Component {
  state = {
    collection: {},
  }

  componentDidMount() {
    this.getCollectionById()
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

  deleteCollection = () => {
    const { collectionId } = this.props.match.params;
    return fetch(`http://localhost:8000/collections/${collectionId}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
    }).then(() => {
      this.props.history.push('/collections')
    })
  }

  deleteCollectionEvent = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>Are you sure you want to proceed?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h4>No</h4></button>
            <button className="dialog-btn"
              onClick={() => {
                this.deleteCollection();
                onClose();}}>
                  <h4>Yes, Delete this collection</h4>
            </button>
          </div>
        );
      }
    });
  };

  render() {
    const { collection } = this.state;
    const newItem = `/newItem`
    const item = collection && collection.items ? collection.items.map ((item) => <Item key={item.id} item={item} collection={collection}  />): ''
    return (
      <>
      <div className="container d-flex">
        <div className="collection d-flex flex-column col-10">
          <div className="collection-header">
            <h2 className="name text-center">{collection.name}</h2>
          </div>
          <div className="collection-options d-flex justify-content-between">
            <span><i className="fas fa-trash-alt mr-3" onClick={this.deleteCollectionEvent}></i>
            <Link to={newItem}><i className="fas fa-plus-square"></i> Add Item</Link>        
            </span>
          </div>
          <div className="collection">
            {item}
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default withRouter(SingleCollection);
