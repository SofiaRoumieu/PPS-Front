import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const initialForm = {
    idMateria: -1,
    anio: 2023,
    cuatrimestre: -1,
    dia: -1,
    turno: -1
}
const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CrearCurso = () => {

    const [form, setForm] = useState(initialForm);
    const [materias, setMaterias] = useState([]);
    const { idMateria, anio, cuatrimestre, dia, turno } = form;

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };
    const handleReset = () => {
        setForm(initialForm);
    };
    const handleSubmit = () => {
        console.log(form)
        fetch(URL + 'Cursos', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                // setMaterias(data);
            })
            .catch(ex => console.log(ex))

    };


    useEffect(() => {
        getMaterias()
    }, []);

    const getMaterias = () => {
        fetch(URL + 'Publico/Materias', {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMaterias(data);
            })
            .catch(ex => console.log(ex))
    }




    return (
        <Container>
            <Form>

                <Row>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='idMateria' className='label'> Materia </label>
                        <select name='idMateria' value={idMateria} className='form-control' onChange={handleChange}>
                            <option className='form-control' value={-1}> Seleccione </option>
                            {
                                materias.length ? (
                                    materias.map((mat) => {
                                        return <option className='form-control' key={mat.id} value={mat.id}> {mat.nombre} </option>
                                    })
                                ) : (<></>)
                            }
                        </select>
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='anio' className='label'> Anio </label>
                        <select name="anio" id='anio' className='form-control' value={anio} onChange={handleChange} >
                            <option value={-1}> Seleccione </option>
                            <option value={2023}> 2023 </option>
                            <option value={2024}> 2024 </option>
                            <option value={2025}> 2025 </option>
                        </select>
                    </Col>

                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='cuatrimestre' className='label'> Cuatrimestre </label>
                        <select name="cuatrimestre" id='cuatrimestre' className='form-control' value={cuatrimestre} onChange={handleChange} >
                            <option value={-1}> Seleccione </option>
                            <option value={1}> Primer </option>
                            <option value={2}> Segundo </option>
                        </select>
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='dia' className='label'> Dias </label>
                        <select name="dia" id='dia' className='form-control' value={dia} onChange={handleChange} >
                            <option value={-1}> Seleccione </option>
                            <option value={1}> Lunes </option>
                            <option value={2}> Martes </option>
                            <option value={3}> Miercoles </option>
                            <option value={4}> Jueves </option>
                            <option value={5}> Viernes </option>
                        </select>
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='turno' className='label'> Turno </label>
                        <select name="turno" id='turno' className='form-control' value={turno} onChange={handleChange} >
                            <option value={-1}> Seleccione </option>
                            <option value={1}> Manana </option>
                            <option value={2}> Tarde </option>
                            <option value={3}> Noche </option>
                        </select>
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

export default CrearCurso;