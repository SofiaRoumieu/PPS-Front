import React,  { useState, useEffect, useContext } from 'react';
import '../styles/Header.css';
import { Button, Nav, Row, Col, Form, Card } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Usuarios from "../storage/Usuarios";

const formSchema = Yup.object().shape({
    nombreUsuario: Yup.string()
      .required("Campo requerido"),  
    pass: Yup.string()
    .required("Campo requerido"),
  });

const Header = () => {
    const usuarioAux = localStorage.getItem('usuario');
    const [usuario, setUsuario] = useState({legajo:'',nombreUsuario:'', rol:'', pass: ''});
    const [mostrarLogin, setMostrarLogin] = useState(false);

    const [usuarios, setUsuarios] = useState(Usuarios);
    const [initialValues, setInitialValues] = useState({nombreUsuario: '', pass: ''});


    useEffect(() => {
        if(localStorage.getItem("usuario"))    
            setUsuario(JSON.parse(localStorage.getItem("usuario")))
    }, []);

    // useEffect(() => {
    //     if(localStorage.getItem('usuario')){
    //         setUsuario(JSON.parse(localStorage.getItem('usuario')));
    //     }
    //     else setUsuario({legajo:'',nombreUsuario:'', rol:'', pass: ''});
    // },[usuarioLogueado]);

    function cerrarSesion(){
        localStorage.clear();
        setUsuario({legajo:'',nombreUsuario:'', rol:'', pass: ''});
        window.location.assign("/");
    }

    const Ingresar = (values) => {
        let usuarioAux = usuarios.find(element => element.nombreUsuario === values.nombreUsuario && element.pass === values.pass );
        if(usuarioAux!= undefined){
            localStorage.setItem("usuario",  JSON.stringify(usuarioAux));
            window.location.assign("/");
        }
        else{
            window.location.assign("/");
        }
    };

    return (
        <>
            <Row>   
                <Col lg="10"></Col>
                <Col lg="2">
                    {usuario.legajo == '' ?
                    <Button  onClick={()=>{setMostrarLogin(true);}}> Iniciar sesión</Button>
                    :
                    <>
                        <Button onClick={cerrarSesion}> Cerrar sesión</Button>
                        <label>{usuario.nombreUsuario} - {usuario.rol}</label>
                    </>
                    }
                </Col></Row>
            <Row>
                <Col>
                    <Nav style={{paddingLeft:10}} className='header' variant="underline" defaultActiveKey="/home">
                        <Nav.Item >
                            <Nav.Link href="/">Inicio</Nav.Link>
                        </Nav.Item>
                            
                        {(usuario.legajo !== '' && (usuario.rol === "Alumno" || usuario.rol === "Profesor")) &&
                            <Nav.Item>
                                <Nav.Link href="/mis-cursos">Mis cursos</Nav.Link>
                            </Nav.Item>
                        }
                        {(usuario.legajo !== '' && usuario.rol === "Alumno") &&
                            <Nav.Item>
                                <Nav.Link href="/cursos">Materias del plan</Nav.Link>
                            </Nav.Item>
                        }
                        {(usuario.legajo !== '' && usuario.rol === "Profesor" ) &&
                            <Nav.Item>
                                <Nav.Link href="/carreras">Vacantes</Nav.Link>
                            </Nav.Item>
                        }
                        {(usuario.legajo !== '' && (usuario.rol === "Alumno" || usuario.rol === "Profesor")) &&
                            <Nav.Item>
                                <Nav.Link href="/carreras">Mis novedades</Nav.Link>
                            </Nav.Item>
                        }
                        {(usuario.legajo !== '' && usuario.rol === "Administrativo" ) &&
                            <Nav.Item>
                                <Nav.Link href="/carreras">Novedades</Nav.Link>
                            </Nav.Item>
                        }
                        {(usuario.legajo !== '' && usuario.rol === "Administrativo" ) &&
                            <Nav.Item>
                                <Nav.Link href="/carreras">Usuarios</Nav.Link>
                            </Nav.Item>
                        }
                        {(usuario.legajo !== '' && usuario.rol === "Administrativo" ) &&
                            <Nav.Item>
                                <Nav.Link href="/carreras">Cursos</Nav.Link>
                            </Nav.Item>
                        }
                        <Nav.Item>
                            <Nav.Link href="/institucional">Institucional</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/carreras">Carreras</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/novedades">Novedades</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>

            {mostrarLogin &&
            <Row style={{height:800}} className="justify-content-center">
                <Col lg="8">
                    <Card style={{padding:10, color: "black"}} >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={formSchema} 
                        onSubmit={Ingresar}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                        <Row>
                            <Col xs lg="12">
                            <img  style={{height:"75px"}} alt="Logo PPSII Académico"/>
                            </Col>                             
                        </Row>
                        <Row >
                            <Col xs lg="12">
                            <Form.Group controlId="nombreUsuario">
                                <Form.Label style={{ ...{color: "black"}}}>Usuario: </Form.Label>
                                <Form.Control
                                type="text"
                                name="nombreUsuario"
                                autoComplete='off'
                                onChange={handleChange}
                                value={values.nombreUsuario}
                                />
                            </Form.Group>
                            <ErrorMessage
                                    name='nombreUsuario'
                                    component='div'
                                    className='field-error text-danger'
                                /> 
                            </Col>                             
                        </Row>
                        <Row >
                            <Col xs lg="12">
                            <Form.Group controlId="pass">
                                <Form.Label style={{ ...{color: "black"}}}>Contraseña: </Form.Label>
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
                            <Col xs lg="5">
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                style={{width: "100%", background: "#FFFFFF", borderColor: "#009AAE", color: "#009AAE"}}
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