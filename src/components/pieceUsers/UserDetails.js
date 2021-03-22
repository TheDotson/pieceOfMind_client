import React from 'react'
import {withRouter, Link} from 'react-router-dom'

class UserDetails extends React.Component {
  
  state = {
    pieceUser: {},
  }

  componentDidMount() {
    this.getPieceUser()
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
 
  render() {
    const { pieceUser } = this.state;
    const { user } = this.state.pieceUser
    return (
      <div className="d-flex row">
        <div className="ml-auto">
        {/* <div className="profileImgDiv"><img className="profileImg" src={profile_image_url} /></div> */}
        <div className="profileName">
          <h3>Name: {user && user.first_name} {user && user.last_name} </h3></div>
        </div>
        <div className="profileText m-5">
        <div className="profileEmail"><h3>Email: {user && user.email}</h3></div>
        <div className="profileBio"><h3>Bio: {pieceUser && pieceUser.bio}</h3></div>        {/* <Link to={userItems}><div classname="itemCount"><h3>Number of Items: {items.count}</h3></div></Link> */}
        </div>
      </div>
    )
  }
}

export default withRouter(UserDetails)
