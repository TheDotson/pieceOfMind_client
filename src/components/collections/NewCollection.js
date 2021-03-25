import React from 'react';
import { withRouter } from 'react-router-dom';

class NewCollection extends React.Component {
    state = {
        name: '',
        user: '',
        items: [],
    }

    changeNameEvent = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    createCollection = (e) => {
        e.preventDefault();
        const { name, items } = this.state
        const user = localStorage.getItem('user_id')

        const newCollection = {
            name: name,
            user: user,
            items: items
        }
        fetch("http://127.0.0.1:8000/collections", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                newCollection
            )
        })
        .then(res => res.json())
        .then(res => {
            this.props.history.push('/collections')
        })
    }

    render() {
        return(
            <div className="newCollectionForm">
                <h2 className="text-center mt-3">Create New Collection</h2>
                    <form className="col-4 realForm form-style" autoComplete="off">
                        <div className="form-group">
                            <label className="mt-3" htmlFor="name">Collection Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Input Collection Name"
                                onChange={this.changeNameEvent}
                            />
                        </div>
                        <button className="btn btn-success submit" onClick={this.createCollection}>Create Collection</button>
                    </form>
            </div>
        )
    }
}

export default withRouter(NewCollection);
