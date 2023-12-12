import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { Button, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_CONNECTION;
const userVacio = { legajo: '', correo: '', rol: '', pass: '' };
const Header = () => {
    const usuarioAux = localStorage.getItem('usuario');
    const [usuario, setUsuario] = useState(userVacio);

    useEffect(() => {
        if (localStorage.getItem("usuario"))
            setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }, []);


    function cerrarSesion() {
        localStorage.clear();
        setUsuario(userVacio);
        window.location.assign("/");
    }

    return (
        <>
            <Navbar collapseOnSelect expand="md" variant='dark' bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img className='imgg' src='https://www.designevo.com/res/templates/thumb_small/banner-and-educational-supplies-shield.webp'></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='me-auto d-flex justify-content-between align-items-center'>
                            <Nav.Link href="/institucional">Institucional</Nav.Link>
                            <Nav.Link href="/carreras">Carreras</Nav.Link>
                            <Nav.Link href="/novedades">Novedades</Nav.Link>

                            {(usuario && usuario.tipoUsuario === 1) &&
                                <Nav.Link href="/mis-cursos">Mis cursos</Nav.Link>
                            }
                            {(usuario && usuario.tipoUsuario === 2) &&
                                <Nav.Link href="/mis-cursos-profesor">Mis cursos</Nav.Link>
                            }

                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 1) &&
                                <Nav.Link href="/cursos">Inscripciones</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 2) &&
                                <Nav.Link href="/cursos-vacantes">Vacantes</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && (usuario.tipoUsuario === 1)) &&
                                <Nav.Link href="/notas">Mis Notas</Nav.Link>
                            }
                            {(usuario && usuario.tipoUsuario === 1) &&
                                <Nav.Link href="/mis-asistencias">Mis asistencias</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 3) &&
                                <NavDropdown title="Administracion" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/usuarios-listado"> Usuarios </NavDropdown.Item>
                                    <NavDropdown.Item href="/administrar-cursos"> Cursos </NavDropdown.Item>
                                    <NavDropdown.Item href="/carrera-alta"> Alta de carrera </NavDropdown.Item>
                                    <NavDropdown.Item href="/materia-alta"> Alta de Materia </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                        <Nav className='d-flex justify-content-between align-items-center '>
                            {
                                usuario.correo ?
                                    <div>
                                        <Button variant='secondary' onClick={cerrarSesion}> Cerrar sesión</Button>
                                        <label className='p-1' style={{ color: '#FAFAFA' }} >{usuario.correo} </label>
                                    </div>
                                    :
                                    <Button >
                                        <Nav.Link style={{ color: 'white' }} href="/login">Iniciar sesion</Nav.Link>
                                    </Button>
                            }
                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>


        </>
    );
}

export default Header;