import React from 'react'
import { withRouter } from 'react-router-dom'
import { Jumbotron, Button } from 'reactstrap';

class UserDetails extends React.Component {
  
  state = {
    pieceUser: {},
    collections: {}
  }

  componentDidMount() {
    this.getPieceUser()
    this.getCollectionByUser()
  }
  
  getPieceUser = () => {
    const { userId } = this.props.match.params;
    return fetch(`http://localhost:8000/pieceUsers/${userId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`}
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ pieceUser: res })
    })
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

 
  render() {
    const { pieceUser } = this.state;
    const { user } = this.state.pieceUser
    return (
      <div>
        <Jumbotron className="mt-3 ml-3 mr-3 bio-container">
          {/* <div className="profileImgDiv"><img className="profileImg" src={profile_image_url} /></div> */}
          <h3 >{user && user.first_name} {user && user.last_name} </h3>
          <hr className="my-2" />
          <p >Bio: {pieceUser && pieceUser.bio}</p>
          <p>Email: {user && user.email}</p>
          <p className="lead">
          <Button color="btn btn-primary">Download Collection Info</Button>
          </p>
        </Jumbotron>
      </div>
    )
  }
}

export default withRouter(UserDetails)
