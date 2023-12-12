import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const initialForm = {
    nombre: '',
    apellido: '',
    correo: '',
    dni: '',
    tipoUsuario: -1,
    fechaNacimiento: '',
    sexo: -1,
    carrera: -1,
    provincia: '',
    localidad: '',
    codigoPostal: 0,
    calle: '',
    altura: 0,
    piso: 0,
    departamento: "-"
}
const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const AltaUsuario = (props) => {

    const [form, setForm] = useState(initialForm)
    const [carreras, setCarreras] = useState([]);
    const { nombre, apellido, correo, dni, tipoUsuario, fechaNacimiento, carrera, sexo, provincia, localidad, codigoPostal, calle, altura, piso, departamento } = form;

    const { legajo } = useParams();

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };
    const handleReset = () => {
        setForm(initialForm);
    };
    const handleSubmit = () => {
        console.log(form);
        let user = {
            nombre, apellido, correo, dni, tipoUsuario, fechaNacimiento, idCarrera: carrera, sexo
        }
        let domicilio = {
            provincia, localidad, codigoPostal, calle, altura, piso, departamento
        }
        let usuario = {
            user,
            domicilio
        }


        let urlEndpoint = '';
        let accion = '';
        let mensajeConfirmacion = '';
        if (legajo) {
            //urlEndpoint = 'api/Usuarios/EditarNovedad/' + id;
            usuario.user.legajo = legajo;
            usuario.domicilio.id = form.idDomicilio;
            accion = "PUT";
            mensajeConfirmacion = "Usuario modificado correctamente";
        }
        else {
            //urlEndpoint = 'api/Usuarios/CrearUsuario';
            accion = "POST";
            mensajeConfirmacion = "Usuario creado correctamente";
        }


        console.log(usuario);
        fetch(URL + 'Usuarios', {
            method: accion,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                console.log('', mensajeConfirmacion)
                handleReset();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });
    }

    const getUsuario = () => {
        fetch(URL + 'Usuarios/' + legajo)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                let usuario = data.user;
                let domicilio = data.domicilio;
                let nuevoForm = { ...usuario, ...domicilio }

                nuevoForm.fechaNacimiento = moment(usuario.fechaNacimiento).utc().format('yyyy-MM-DD');
                console.log(nuevoForm);

                setForm(nuevoForm)
            })
            .catch((err) => {
                console.error(err);
            });

    }

    useEffect(() => {
        getCarreras()
        if (props.tipo == 'modificar') {
            getUsuario();
        }
    }, []);


    const getCarreras = () => {
        fetch(URL + 'Carreras', {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCarreras(data);
            })
            .catch(ex => console.log(ex))

    }


    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='text-primary fw-bolder text-start'>Alta de Usuario</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 className='text-secondary text-start'>Datos Personales</h3>
                </Col>
            </Row>
            {/* <Card.Title style={{ textAlign: "left" }}>{(props.tipo == 'crear') ? 'Nuevo usuario' : 'Editar usuario'}</Card.Title> */}
            {/* <Card.Title style={{ textAlign: "left", fontSize: 18 }}>Datos personales</Card.Title> */}

            <Form>
                <Row>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='nombre' className='label'> Nombre </label>
                        <input
                            id='nombre'
                            type="text"
                            disabled={props.tipo != 'crear'}
                            name="nombre"
                            placeholder="Ingrese Nombre..."
                            className='form-control '
                            value={nombre}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='apellido' className='label'> Apellido </label>
                        <input
                            id='apellido'
                            disabled={props.tipo != 'crear'}
                            type="text"
                            name="apellido"
                            placeholder="Ingrese apellido..."
                            className='form-control '
                            value={apellido}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='true' lg='4' >
                        <label htmlFor='correo' className='label'> Correo Electronico </label>
                        <input
                            id='correo'
                            type="email"
                            name="correo"
                            placeholder="Ingrese correo..."
                            className='form-control '
                            value={correo}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='dni' className='label'> DNI </label>
                        <input
                            id='dni'
                            disabled={props.tipo != 'crear'}
                            type="number"
                            name="dni"
                            placeholder="Ingrese dni..."
                            className='form-control '
                            value={dni}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='tipoUsuario' className='label'> Tipo de Usuario </label>
                        <select name="tipoUsuario" id='tipoUsuario' className='form-control' disabled={props.tipo != 'crear'} value={tipoUsuario} onChange={handleChange} >
                            <option value={-1}> Seleccione </option>
                            <option value={1}> Alumno </option>
                            <option value={2}> Profesor </option>
                            <option value={3}> Administrador </option>
                        </select>
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='fechaNacimiento' className='label'> Fecha de Nacimiento </label>
                        <input
                            id='fechaNacimiento'
                            type="date"
                            disabled={props.tipo != 'crear'}
                            name="fechaNacimiento"
                            className='form-control '
                            value={fechaNacimiento}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='sexo' className='label'> Sexo </label>
                        <select disabled={props.tipo != 'crear'} name="sexo" id='sexo' className='form-control' value={sexo} onChange={handleChange} >
                            <option value={-1}> Seleccione </option>
                            <option value={1}> Masculino </option>
                            <option value={2}> Femenino </option>
                            <option value={3}> Otros </option>
                        </select>
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='carrera' className='label'> Carrera </label>
                        <select disabled={props.tipo != 'crear'} name='carrera' value={carrera} className='form-control' onChange={handleChange}>
                            <option className='form-control' value={-1}> Seleccione </option>
                            {
                                carreras.length ? (
                                    carreras.map((facultad) => {
                                        return (
                                            facultad.carreras.map((carrera) => {
                                                return <option className='form-control' key={carrera.id} value={carrera.id}  >{carrera.nombre}</option>
                                            })
                                        )
                                    })
                                ) : (<></>)
                            }
                        </select>

                    </Col>

                </Row>

                <Row className='mt-4'>
                    <hr></hr>
                </Row>

                <Row>
                    <Col>
                        <h3 className='text-secondary text-start'>Datos del domicilio</h3>
                    </Col>
                </Row>


                <Row>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='provincia' className='label'> Provincia </label>
                        <input
                            id='provincia'
                            type="text"
                            name="provincia"
                            placeholder="Ingrese provincia..."
                            className='form-control '
                            value={provincia}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='localidad' className='label'> Localidad </label>
                        <input
                            id='localidad'
                            type="text"
                            name="localidad"
                            placeholder="Ingrese localidad..."
                            className='form-control '
                            value={localidad}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='true' lg='4' >
                        <label htmlFor='codigoPostal' className='label'> Codigo Postal </label>
                        <input
                            id='codigoPostal'
                            type="number"
                            name="codigoPostal"
                            placeholder="Ingrese codigoPostal..."
                            className='form-control '
                            value={codigoPostal}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='calle' className='label'> Calle </label>
                        <input
                            id='calle'
                            type="text"
                            name="calle"
                            placeholder="Ingrese calle..."
                            className='form-control '
                            value={calle}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='altura' className='label'> Altura </label>
                        <input
                            id='altura'
                            type="number"
                            name="altura"
                            placeholder="Ingrese altura..."
                            className='form-control '
                            value={altura}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='piso' className='label'> Piso </label>
                        <input
                            id='piso'
                            type="number"
                            name="piso"
                            placeholder="Ingrese piso..."
                            className='form-control '
                            value={piso}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='departamento' className='label'> Departamento </label>
                        <input
                            id='departamento'
                            type="text"
                            name="departamento"
                            placeholder="Ingrese departamento..."
                            className='form-control '
                            value={departamento}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row className='m-4'>
                    <Col>
                        <Button onClick={handleReset} className='w-75' variant='warning' >Borrar todo</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleSubmit} className='w-75' variant='success'>Enviar</Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}

export default AltaUsuario;