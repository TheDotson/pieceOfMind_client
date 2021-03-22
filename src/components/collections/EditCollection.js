import React from 'react';
import { withRouter } from 'react-router-dom';

class EditCollection extends React.Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.getCollectionById();
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
      this.setState({ name: res.name })
    })
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  editCollection = (e) => {
    e.preventDefault();
    const { name } = this.state
    const { collectionId } = this.props.match.params;

    const edited_collection = {
      name: name,
    }

    fetch(`http://localhost:8000/collections/${collectionId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        edited_collection
      )
    })
      .then(res => {
        this.props.history.push(`/collections`)
      })
  }

  render() {
    const { name } = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Edit Collection</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Collection Name Change</label>
          <input type="text" className="form-control" id="name" value={name} onChange={this.changeNameEvent} />
        </div>
      <br/><button className="btn-warning" onClick={this.editCollection}>Save</button>
    </form>
  </div>
    )
  }
}

export default withRouter(EditCollection);
