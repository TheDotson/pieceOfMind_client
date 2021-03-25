import React from 'react';
import { withRouter } from 'react-router-dom';

class NewItem extends React.Component {
  fileInput = React.createRef();
    state = {
        name: '',
        location: '',
        price: '',
        image: '',
        rooms: [],
        collections: []
    }

    componentDidMount() {
      this.getRoomByUser();
    }

    getRoomByUser = () => {
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
  
    createNameEvent = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }
  
    createLocationEvent = (e) => {
      e.preventDefault();
      this.setState({ location: Number(e.target.value) });
    }
  
    createPriceEvent = (e) => {
      e.preventDefault();
      this.setState({ price: e.target.value });
    }
  
    createItem = (e) => {
        e.preventDefault();
        const { name, price, location } = this.state
        const { collectionId } = this.props.match.params

        const formdata = new FormData();
        formdata.append("image_file", this.fileInput.current.files[0]);

        var requestOptions = {
          method: 'POST',
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
        },
          body: formdata,
          redirect: 'follow'
        };
        return fetch("http://127.0.0.1:8000/images", requestOptions
        ).then(res => res.json())
        .then( res => {
          const newItem = {
            name: name,
            price: price,
            location: location,
            image: res.image_file,
            collectionId: collectionId
          }
          fetch("http://127.0.0.1:8000/items", {
              method: "POST",
              headers: {
                  "Authorization": `Token ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(
                  newItem
              )
          })
          .then(res => res.json())
          .then(res => {
              this.props.history.push(`/viewCollection/${collectionId}`)
          })
        })
    }

    render() {
      const { rooms } = this.state
        return(
            <div className="newItemForm">
              <h2 className="text-center mt-3">Create New Item</h2>
                <form className="col-4 realForm form-style" autoComplete="off">
                  <div className="form-group">
                    <label className="mt-3" htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Item Name" onChange={this.createNameEvent} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" className="form-control" id="image" name="image" ref={this.fileInput} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" className="form-control" id="price" placeholder="Item Price" onChange={this.createPriceEvent} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <br/><select onChange={this.createLocationEvent}>              
                      {rooms.map(room => <option key={room.id} value={room.id} >{room.name}</option>)}
                    </select>
                  </div>
                  <button className="btn btn-success submit" onClick={this.createItem}>Create Item</button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewItem);
