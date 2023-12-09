import React, { useState, useEffect, useContext } from 'react';
import '../styles/Header.css';
import { Button, Nav, Row, Col, Form, Card, Navbar, Container } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    correo: Yup.string()
        .required("Campo requerido"),
    pass: Yup.string()
        .required("Campo requerido"),
});

const URL = process.env.REACT_APP_BACKEND_CONNECTION;
const userVacio = { legajo: '', correo: '', rol: '', pass: '' };
const Header = () => {
    const usuarioAux = localStorage.getItem('usuario');
    const [usuario, setUsuario] = useState(userVacio);
    const [mostrarLogin, setMostrarLogin] = useState(false);

    const [initialValues, setInitialValues] = useState({ correo: '', pass: '' });


    useEffect(() => {
        if (localStorage.getItem("usuario"))
            setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }, []);

    // useEffect(() => {
    //     if(localStorage.getItem('usuario')){
    //         setUsuario(JSON.parse(localStorage.getItem('usuario')));
    //     }
    //     else setUsuario({legajo:'',nombreUsuario:'', rol:'', pass: ''});
    // },[usuarioLogueado]);

    function cerrarSesion() {
        localStorage.clear();
        setUsuario(userVacio);
        window.location.assign("/");
    }

    const Ingresar = (values) => {
        const usuarioAux = {
            correo: values.correo,
            clave: values.pass,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioAux),
        };

        console.log("Ingresar");
        fetch(URL + 'api/Usuarios/Login', options)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                setUsuario(
                    {
                        legajo: data.id,
                        correo: data.titulo,
                        rol: (data.tipoUsuario == 1) ? "Alumno" : (data.tipoUsuario == 2) ? "Profesor" : "Administrativo"
                    });

                localStorage.setItem("usuario", JSON.stringify(data));
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                window.location.assign("/");
            });
        //let usuarioAux = usuarios.find(element => element.nombreUsuario === values.nombreUsuario && element.pass === values.pass );
        // if(usuarioAux!= undefined){
        //     localStorage.setItem("usuario",  JSON.stringify(usuarioAux));
        //     window.location.assign("/");
        // }
        // else{
        //     window.location.assign("/");
        // }
    };

    return (
        <>
            <Navbar collapseOnSelect expand="md" variant='dark' bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='me-auto d-flex justify-content-between align-items-center'>
                            <Nav.Link href="/institucional">Institucional</Nav.Link>
                            <Nav.Link href="/carreras">Carreras</Nav.Link>
                            <Nav.Link href="/novedades">Novedades</Nav.Link>

                            {(usuario && usuario.tipoUsuario === 1 || usuario.tipoUsuario === 2) &&
                                <Nav.Link href="/mis-cursos">Mis cursos</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 1) &&
                                <Nav.Link href="/cursos">Inscripciones</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 2) &&
                                <Nav.Link href="/carreras">Vacantes</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && (usuario.tipoUsuario === 1 || usuario.tipoUsuario === 2)) &&
                                <Nav.Link href="/notas">Mis Notas</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 3) &&
                                <Nav.Link href="/carreras">Novedades</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 3) &&
                                <Nav.Link href="/carreras">Usuarios</Nav.Link>
                            }
                            {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 3) &&
                                <Nav.Link href="/carreras">Cursos</Nav.Link>
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
                                    <Button onClick={() => { setMostrarLogin(true); }}> Iniciar sesión</Button>
                            }
                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>

            {mostrarLogin &&
                <Row className="justify-content-center">
                    <Col>
                        <Card style={{ padding: 10, color: "black" }} >
                            <Formik
                                initialValues={initialValues}
                                validationSchema={formSchema}
                                onSubmit={Ingresar}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        <Row>
                                            <Col>
                                                <img style={{ height: "75px" }} alt="Logo PPSII Académico" />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col >
                                                <Form.Group controlId="correo">
                                                    <Form.Label style={{ ...{ color: "black" } }}>E-mail: </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="correo"
                                                        autoComplete='off'
                                                        onChange={handleChange}
                                                        value={values.correo}
                                                    />
                                                </Form.Group>
                                                <ErrorMessage
                                                    name='correo'
                                                    component='div'
                                                    className='field-error text-danger'
                                                />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col >
                                                <Form.Group controlId="pass">
                                                    <Form.Label style={{ ...{ color: "black" } }}>Contraseña: </Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="pass"
                                                        autoComplete='off'
                                                        onChange={handleChange}
                                                        value={values.pass}
                                                    />
                                                </Form.Group>
                                                <ErrorMessage
                                                    name='pass'
                                                    component='div'
                                                    className='field-error text-danger'
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="justify-content-center">
                                            <Col >
                                                <Button
                                                    variant="primary"
                                                    onClick={handleSubmit}
                                                    style={{ width: "100%", background: "#FFFFFF", borderColor: "#009AAE", color: "#009AAE" }}
                                                >
                                                    Ingresar
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center" >
                                            <p>Si olvidaste tu usuario o contraseña cominucate con el área de admisitración.</p>
                                        </Row>
                                    </>
                                )}
                            </Formik>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    );
}

export default Header;