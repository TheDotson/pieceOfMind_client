import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class Item extends React.Component {

  deleteItem = () => {
    const { item, collection } = this.props;
    return fetch(`http://localhost:8000/items/${item.id}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
    }).then(() => {
      this.props.history.go(`/viewCollection/${collection.id}`)
    })
  }
  
  deleteItemEvent = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>Are you sure you want to proceed?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h4>No</h4></button>
            <button className="dialog-btn"
              onClick={() => {
                this.deleteItem();
                onClose();}}>
                  <h4>Yes, Delete this item</h4>
            </button>
          </div>
        );
      }
    });
  };

  render() {
    const { item } = this.props;
    const editItem = `/editItem/${item.id}`
    return (
      <div className="card">
        <img className="card-img-top" src={item.image} alt={item.name} />
        <h5 className="card-title">{item.name}</h5>
        <div className="card-footer">
          <Link to={editItem}><button className="btn btn-warning">Edit Item</button></Link>
          <button className="btn btn-danger" onClick={this.deleteItemEvent}>Delete Item</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Item)
