import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

const initialForm = {
    nombre: '',
    cargaHoraria: 0,
    correlativas: -1
}
const initModalData = { title: '', text: '' };
const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';
const AltaMateria = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(initModalData);

    const [form, setForm] = useState(initialForm)
    const { nombre, cargaHoraria, correlativas } = form;
    const [materias, setMaterias] = useState([]);


    useEffect(() => {
        getMaterias()
    }, []);

    const getMaterias = () => {
        console.log('Mateira')
        fetch(URL + 'Materias', {
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

    const handleSubmit = () => {
        if (correlativas < 0) {
            setModalData({ title: 'Error', text: 'Debe seleccionar si tiene o no correlativas.' });
            setShowModal(true);
            return;
        }
        console.log(form)
        fetch(URL + 'Materias', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setModalData({ title: 'Exito', text: 'La Materia se dio de alta con exito.' });
                setShowModal(true);
                setForm(initialForm);
            })
            .catch(ex => {
                setModalData({ title: 'Error', text: 'Ha ocurrido un error.' });
                setShowModal(true);
                console.log(ex)
            })
    };


    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };


    return (
        <Container className='myminHeight'>
            <Row>
                <Col>
                    <h2 className='text-primary fw-bolder text-start'>Alta de Materia</h2>
                </Col>
            </Row>

            <Form className='mt-3'>
                <Row>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='nombre' className='label'> Nombre de la materia </label>
                        <input
                            id='nombre'
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className='form-control '
                            value={nombre}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='cargaHoraria' className='label'> Carga Horaria </label>
                        <input
                            id='cargaHoraria'
                            type="number"
                            min={2}
                            max={12}
                            name="cargaHoraria"
                            className='form-control '
                            value={cargaHoraria}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='correlativas' className='label'> Materia Correlativa </label>
                        <select name='correlativas' value={correlativas} className='form-control' onChange={handleChange}>
                            <option className='form-control' value={-1}> Seleccione </option>
                            <option className='form-control' value={0}> Sin correlativas </option>
                            {
                                materias.length ? (
                                    materias.map((mat) => {
                                        return <option className='form-control' key={mat.id} value={mat.id}> {mat.nombre} </option>
                                    })
                                ) : (<></>)
                            }
                        </select>
                    </Col>

                </Row>
                <Row className='m-4'>
                    <Col>
                        <Button onClick={handleSubmit} className='w-75' variant='success'> Enviar </Button>
                    </Col>
                </Row>

            </Form>
            <Modal show={showModal} >
                <Modal.Header >
                    <Modal.Title>
                        {modalData.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalData.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-secondary' onClick={() => setShowModal(false)} >Aceptar</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    );
}

export default AltaMateria;