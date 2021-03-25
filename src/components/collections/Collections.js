import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Collection from './Collection';

class Collections extends React.Component {
  state = {
    collections: [],
  }

  getCollectionByUser = () => {
    const user = localStorage.getItem('user_id')
    return fetch(`http://localhost:8000/collections?user=${user}`, {   
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
    this.getCollectionByUser();
  }

  render() {
    const { collections } = this.state;
    const newCollection = `/newCollection`
    const collection = collections.map((collection) => <Collection key={collection.id} collection={collection} getCollectionByUser={this.getCollectionByUser} />);
    return (
      <div className="text-center">
        <h1 className="text-center mt-3 headline">My Collections</h1>
        <Link to={newCollection}><i className="fas fa-plus-square mb-3"></i> New Collection</Link>
        <div className="collection-container">
          {collection}
        </div>
      </div>
    );
  }
}

export default withRouter(Collections);
