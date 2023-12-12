import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';


const initialForm = {
    nombreFacultad: '',
    nombre: '',
    materias: []
}
const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const initModalData = { title: '', text: '' }

const AltaCarrera = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(initModalData);

    const [form, setForm] = useState(initialForm)
    const [todasMaterias, setTodasMaterias] = useState([]);
    const [materiasCarrera, setmateriasCarrera] = useState([]);
    const { nombre, nombreFacultad, materias } = form;

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };
    const handleChangeMateria = (e) => {
        let index = materiasCarrera.findIndex(x => x.id == e.target.id);

        if (index == -1) {
            materiasCarrera.push(todasMaterias.find(x => x.id == e.target.id))
            console.log(e.target.id);
            document.getElementsByName(e.target.id)[0].disabled = false;
        } else {
            materiasCarrera.splice(index, 1);
            document.getElementsByName(e.target.id)[0].disabled = true;

        }
        console.log(materiasCarrera)
    }
    const handleChangeCuatrimestre = (e) => {
        let index = materiasCarrera.findIndex(x => x.id == e.target.name);
        console.log("index", index)
        if (index == -1) {
            materiasCarrera[index].cuatrimestre = e.target.value;
            //            materiasCarrera.push(todasMaterias.find(x => x.id == e.target.id))
        } else {
            materiasCarrera[index].cuatrimestre = e.target.value;
        }
        console.log(materiasCarrera)
    }

    const handleReset = () => {
        setForm(initialForm);
    };
    const handleSubmit = () => {

        form.materias = materiasCarrera
        form.materias.forEach(element => {
            element.idMateria = element.id
        });

        console.log(materiasCarrera)
        console.log(form)
        postCarrera();

    };

    useEffect(() => {
        getMaterias();
    }, []);

    const getMaterias = () => {
        fetch(URL + 'Materias', {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTodasMaterias(data);
            })
            .catch(ex => console.log(ex))
    }

    const postCarrera = () => {
        let error = false;
        if (form.materias.length < 5) {
            setShowModal(true);
            setModalData({ title: 'Error', text: 'La carrera debe tener al menos 5 materias' });
            console.log("pedro")
            error = true;
        }
        form.materias.forEach(element => {
            if (element.cuatrimestre == -1) {
                setShowModal(true);
                setModalData({ title: 'Error', text: 'Todas las materias deben pertenecer a un cuatrimestre.' });
                error = true;
            }
        });

        if (error)
            return;

        let data = {
            facultad: nombreFacultad,
            nombre: form.nombre,
            materias: form.materias
        }
        console.log(data)
        fetch(URL + 'Carreras', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                setShowModal(true);
                setModalData({ title: 'Exito', text: 'La carrera se dio de alta con exito.' });
                console.log('carreraNueva', data);
            })
            .catch((err) => {
                setModalData({ title: 'Error', text: 'Ha ocurrido un error.' });
                console.error(err);
            })
            .finally(() => {
            });

    }




    return (
        <Container>
            {/* <Row className='d-flex justify-content-between  m-2'>
                <Row>
                    <Col className='text-start'>
                        <h3 className='text-primary'>Listado de usuarios</h3>
                    </Col>
                    <Col className='text-end'>
                        <Button variant='success' onClick={() => navigate('/usuarios-alta')} >Nuevo usuario</Button>
                    </Col>
                </Row>
            </Row> */}
            <Row className='m-2'>
                <Col>
                    <h2 className='text-primary fw-bolder text-start'>Alta de Carrera</h2>
                </Col>
            </Row>
            <Form>
                <Row className='m-2'>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='nombre' className='label'> Nombre </label>
                        <input
                            id='nombre'
                            type="text"
                            name="nombre"
                            placeholder="Contador Publico"
                            className='form-control '
                            value={nombre}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='12' sm='6' lg='4' >
                        <label htmlFor='nombreFacultad' className='label'> Facultad </label>
                        <input
                            id='nombreFacultad'
                            type="text"
                            name="nombreFacultad"
                            placeholder="Economia"
                            className='form-control '
                            value={nombreFacultad}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <h3 className='text-primary'>Seleccion de materias</h3>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Row>
                            <Col xs='3'> <b>Id Materia</b></Col>
                            <Col xs='4'> <b>Materia</b></Col>
                            <Col xs='2'> <b>Check</b></Col>
                            <Col xs='3'> <b>Cuatrimestre</b></Col>
                        </Row>
                        {todasMaterias.map(mat => {
                            return (
                                <Row key={mat.id}>
                                    <Col xs='3'>{mat.id}</Col>
                                    <Col xs='4'>{mat.nombre}</Col>
                                    <Col xs='2'>
                                        <input type='checkbox'
                                            id={mat.id}
                                            onChange={handleChangeMateria}
                                        />
                                    </Col>
                                    <Col xs='3'>
                                        <select disabled='true' name={mat.id} className='form-control-sm' onChange={handleChangeCuatrimestre} >
                                            <option value={-1}> Seleccione </option>
                                            <option value={1}> 1  </option>
                                            <option value={2}> 2 </option>
                                            <option value={3}> 3 </option>
                                            <option value={4}> 4 </option>
                                            <option value={5}> 5 </option>
                                            <option value={6}> 6 </option>
                                            <option value={7}> 7 </option>
                                            <option value={8}> 8 </option>
                                            <option value={9}> 9 </option>
                                            <option value={10}> 10 </option>
                                        </select>
                                    </Col>
                                </Row>
                            )
                        })
                        }


                    </Col>
                </Row>

                <Row className='justify-content-center m-2'>
                    <Col sm='6'>
                        <Button className='w-75' variant='success' onClick={handleSubmit} > Crear </Button>
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

        </Container >
    );
}

export default AltaCarrera;