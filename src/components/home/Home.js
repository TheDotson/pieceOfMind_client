import React from 'react';
import { withRouter } from 'react-router-dom'
import { Jumbotron } from 'reactstrap';


class Home extends React.Component {
  render() {
    return (
      <div className="home text-center mt-3">
        <Jumbotron className="mt-3 ml-3 mr-3 aboutUs-container">
          <h1 className="headline">About Us</h1>
          <div><img className="homeImg" src="https://bit.ly/3vVy6JN" alt='disaster'/></div>
          <div className="homeDetail">
          <p>Having lived through the Middle Tennessee tornado event of March 2020, I can tell you that one of the last things you think about after having survived a disaster is <br/>"Where was that one thing, and how much was it? Was this really in the den, or was it in the living room?".
          <br/>One of the many tasks one must handle after the storm passes is conducting an assessment of what remains and what was lost; a task that can be emotionally draining in such a time.
          </p>
          <div><p className="homeEmphasis">That is where Piece of Mind comes in.</p></div>
          <p>
          <br/>Though simple in design, this App can serve as an offsite backup of a user maintained catalog of what property they had before a disaster event.
          <br/>This is information that is needed for insurance claims post-disaster that many aren't in the right frame of mind to recall in the immediate time frame that is needed.
          <br/>My hope is that with one less thing to burded you post disaster, you'll be that much closer to achieving Piece of Mind.
          </p>
          </div>
          </Jumbotron>
      </div>
    );
  }
}

export default withRouter(Home);
