import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Collection from './Collection';

class Collections extends React.Component {
  state = {
    collections: [],
  }

  getAllCollections = () => {
    return fetch("http://localhost:8000/collections", {   
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`}
    }
      )
    .then(res => res.json())
    .then(res => {
      this.setState({ collections: res.results })
    })
  }

  componentDidMount() {
    this.getAllCollections();
  }

  render() {
    const { collections } = this.state;
    const newCollection = `/newCollection`
    const collection = collections.map((collection) => <Collection key={collection.id} collection={collection} getAllCollections={this.getAllCollections} />);
    return (
      <div>
        <h1>My Collections</h1>
        <div className="card-columns">
          <Link to={newCollection}><i className="fas fa-plus-square"></i> New Collection</Link>
          {collection}
        </div>
      </div>
    );
  }
}

export default withRouter(Collections);
