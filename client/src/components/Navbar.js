import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('login')

    return (
        <>
            <Navbar style={{ fontFamily: 'Impact', color: 'white', backgroundColor: 'crimson'}} expand='lg'>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        Cinema Stash
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar'>
                        <Nav className='ml-auto'>
                            <Nav.Link as={Link} to='/'>
                                Search Movies
                            </Nav.Link>
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to='/saved'>
                                        Saved Movies
                                    </Nav.Link>
                                    <Nav.Link onClick={Auth.logout} style={{ color: 'black' }}>
                                        Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={() => setShowModal(true)} style={{ color: 'black' }}>
                                    Login/Sign Up
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal size='lg' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='signup-modal'>
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                            <Nav variant='pills'>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey='login'
                                        style={{
                                            backgroundColor: activeTab === 'login' ? 'red' : 'white',
                                            color: activeTab === 'login' ? 'white' : 'red',
                                        }}
                                        onSelect={() => setActiveTab('login')}
                                    >
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey='signup'
                                        style={{
                                            backgroundColor: activeTab === 'signup' ? 'red' : 'white',
                                            color: activeTab === 'signup' ? 'white' : 'red',
                                        }}
                                        onSelect={() => setActiveTab('signup')}
                                    >
                                        Sign Up
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <LoginForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUpForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    );
};

export default AppNavbar;
