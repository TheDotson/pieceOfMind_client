import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap"

export const NavBar = props => {
    const user_id = localStorage.getItem("user_id")

    return (
        <Navbar  className="Navbar" expand="lg">
            <Navbar.Brand className="navbar-brand" href="/">Piece of Mind</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                        <Nav.Link className="center-link nav-link" href="/collections">Collections</Nav.Link>
                        <Nav.Link className="center-link nav-link" href="/rooms">Rooms</Nav.Link>
                        <Nav.Link className="center-link nav-link" href={`/pieceUsers/${user_id}`}>My Profile</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    { (localStorage.getItem("token") !== null) 
                    ?
                        <Nav.Link className="ml-auto nav-link"
                        onClick={() => {
                            localStorage.removeItem("token")
                            localStorage.removeItem("user_id")
                            props.history.push({ pathname: "/login"})
                        }}>Logout</Nav.Link>
                    :
                        <Nav.Link href="/login">Login / Register</Nav.Link>
                    }  
                </Nav> 
            </Navbar.Collapse>
        </Navbar>
    )
}
