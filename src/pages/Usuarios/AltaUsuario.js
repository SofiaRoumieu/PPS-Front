import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';


const initialForm = {
    nombre: '',
    apellido: '',
    correo: '',
    dni: '',
    tipoUsuario: 0,
    fechaNacimiento: '',
    sexo: 0,
    provincia: '',
    ciudad: '',
    codigoPostal: 0,
    calle: '',
    altura: 0,
    piso: 0,
    depto: 0
}
const AltaUsuario = () => {

    const [form, setForm] = useState(initialForm)
    const { nombre, apellido, correo, dni, tipoUsuario, fechaNacimiento, sexo, provincia, ciudad, codigoPostal, calle, altura, piso, depto } = form;


    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };
    const handleReset = () => {
        setForm(initialForm);
    };
    const handleSubmit = () => {
        console.log(form);
    }


    return (
        <Container>
            <Form>
                <Row>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='nombre' className='label'> Nombre </label>
                        <input
                            id='nombre'
                            type="text"
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
                        <select name="tipoUsuario" id='tipoUsuario' className='form-control' value={tipoUsuario} onChange={handleChange} >
                            <option value={0}> Seleccione </option>
                            <option value={1}> Alumno </option>
                            <option value={2}> Profesor </option>
                            <option value={3}> Administrador </option>
                        </select>
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='fechaNacimiento' className='label'> Fehca de Nacimiento </label>
                        <input
                            id='fechaNacimiento'
                            type="date"
                            name="fechaNacimiento"
                            placeholder="Ingrese fechaNacimiento..."
                            className='form-control '
                            value={fechaNacimiento}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='3' >
                        <label htmlFor='sexo' className='label'> Sexo </label>
                        <select name="sexo" id='sexo' className='form-control' value={sexo} onChange={handleChange} >
                            <option value={0}> Seleccione </option>
                            <option value={1}> Masculino </option>
                            <option value={2}> Femenino </option>
                            <option value={3}> Otros </option>
                        </select>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <hr></hr>
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
                        <label htmlFor='ciudad' className='label'> Ciudad </label>
                        <input
                            id='ciudad'
                            type="text"
                            name="ciudad"
                            placeholder="Ingrese ciudad..."
                            className='form-control '
                            value={ciudad}
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
                        <label htmlFor='depto' className='label'> Depto </label>
                        <input
                            id='depto'
                            type="text"
                            name="depto"
                            placeholder="Ingrese depto..."
                            className='form-control '
                            value={depto}
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