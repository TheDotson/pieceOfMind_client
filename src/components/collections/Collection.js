import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'

class Collection extends React.Component {
  
  deleteCollection = () => {
    const { collection, getCollectionByUser } =this.props
    return fetch(`http://localhost:8000/collections/${collection.id}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
    }).then(() => {
      this.props.history.push('/collections')
      getCollectionByUser()
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
    const { collection } = this.props;
    const collectionDetails = `/viewCollection/${collection.id}`
    const editCollection = `/editCollection/${collection.id}`
    return (
      <div className="card text-center collection-card">
        <div className="card-header"><h5>{collection.name}</h5></div>
        <div className="card-body">
          <div className="card-footer">
            <Link to={collectionDetails}><button className="btn btn-primary"><i className="far fa-eye"></i></button></Link>
            <Link to={editCollection}><button className="btn btn-warning"><i className="far fa-edit"></i></button></Link>
            <button className="btn btn-danger" onClick={this.deleteCollectionEvent}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    );
}
}

export default withRouter(Collection);
