import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Detalle.css';
import { Form, Row, Col, Button, Breadcrumb, Card, Container, } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';


const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const initialForm = {
    tipo: 0,
    titulo: '',
    texto: '',
    filePath: ''
};


const CursoDetalle = (props) => {
    const navigate = useNavigate();
    const formikRef = useRef();

    const [form, setForm] = useState(initialForm)
    const { tipo, titulo, texto, filePath } = form;

    const [curso, setCurso] = useState(JSON.parse(localStorage.getItem('curso')));
    const [solapa, setSolapa] = useState("Materiales");
    const [alumnos, setAlumnos] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };
    const handleReset = () => {
        setForm(initialForm);
        setShowModal(false)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.tipo <= 0) {
            console.log("debe elegir un tipo");
            return;
        }
        form.idCursada = curso.id;
        console.log("Enviando...", form);

        fetch(URL + 'Cursos/Material', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });

        handleReset();
    }

    useEffect(() => {
        console.log(props)
        console.log(curso)

        if (props.tipo == "editar" || props.tipo == "verDetalle") {
            if (localStorage.getItem('curso')) {
                setCurso(JSON.parse(localStorage.getItem('curso')));
            }
        }
        BuscarMateriales();

    }, []);

    const BuscarAlumnos = () => {
        fetch(URL + 'Cursos/Alumnos/' + curso.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                setAlumnos(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });
    }

    const BuscarMateriales = () => {
        fetch(URL + 'Cursos/Material/' + curso.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                setMateriales(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });
    }


    return (
        <>

            <Container fluid  >
                <Row>
                    <Col xs="12" lg="12" style={{ marginBottom: 5 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={() => navigate('/cursos')}>Listado de cursos</Breadcrumb.Item>
                            <Breadcrumb.Item active>{(props.tipo == "editar") ? "Editar curso" : (props.tipo == "verDetalle") ? "Detalle de curso" : "Nueva curso"}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                {
                    props.tipo == 'verDetalle' ?
                        <>
                            <Row>
                                <Col >
                                    <h1 style={{ color: "white" }}><span style={{ color: "black" }}>{curso.materia}</span></h1>
                                </Col>
                            </Row>
                            <Row className='bg-secondary'>
                                <Col>
                                    <button className='btn btn-secondary' onClick={() => { setSolapa("Materiales"); BuscarMateriales() }} >Materiales</button>
                                </Col>
                                <Col >
                                    <button className='btn btn-secondary' onClick={() => { setSolapa("Alumnos"); BuscarAlumnos() }}  >Alumnos</button>
                                </Col>
                                {
                                    JSON.parse(localStorage.getItem('usuario')).tipoUsuario == 1 ?
                                        <>
                                            <Col >
                                                <button className='btn btn-secondary' onClick={() => { setSolapa("Alumnos"); BuscarAlumnos() }}  > Cargar Asistencias </button>
                                            </Col>
                                            <Col >
                                                <button className='btn btn-secondary' onClick={() => { navigate('/carga-notas') }}  > Cargar Notas </button>
                                            </Col>
                                            <Col >
                                                <button className='btn btn-secondary' onClick={() => {
                                                    setShowModal(true);
                                                }}  > Subir Material </button>
                                            </Col>
                                        </> : <></>
                                }

                                <Modal show={showModal} >
                                    <Modal.Header >
                                        <Modal.Title>
                                            AGREGAR MATERIAL
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <form>
                                            <label htmlFor='tipo' className='label'> Tipo de material </label>
                                            <select name="tipo" id='tipo' className='form-control' value={tipo} onChange={handleChange} >
                                                <option value={1}> Noticia </option>
                                                <option value={2} > Examen </option>
                                                <option value={3}> Trabajo Practico </option>
                                            </select>

                                            <label htmlFor='titulo' className='label'> Titulo </label>
                                            <input
                                                id='titulo'
                                                type="text"
                                                name="titulo"
                                                placeholder="Ingrese titulo..."
                                                className='form-control '
                                                value={titulo}
                                                onChange={handleChange}
                                            />

                                            <label htmlFor='texto' className='label'> Descripcion </label>
                                            <input
                                                id='texto'
                                                type="text"
                                                name="texto"
                                                placeholder="Ingrese descripcion..."
                                                className='form-control '
                                                value={texto}
                                                onChange={handleChange}
                                            />

                                            <label htmlFor='filePath' className='label'> Subir archivo </label>
                                            <input type='file' className='form-control' id='filePath' name='filePath' onChange={handleChange} ></input>


                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className='btn-secondary' onClick={handleReset} >Cancelar</Button>
                                        <Button onClick={handleSubmit}  >Crear</Button>
                                    </Modal.Footer>
                                </Modal>


                            </Row>
                            {
                                solapa == 'Materiales' ?
                                    <Row >
                                        {materiales.length > 0 ?
                                            < >
                                                {
                                                    materiales.map(mat => {
                                                        return <Col md='12' >
                                                            <Card key={mat.idMaterial} className='card-material' >
                                                                <Card.Title>
                                                                    {mat.titulo}
                                                                </Card.Title>
                                                                <Card.Body>
                                                                    {mat.texto}
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    })
                                                }

                                            </>
                                            :
                                            <Row>NO HAY MATERIALES</Row>
                                        }

                                    </Row>
                                    :
                                    <Row>
                                        {
                                            alumnos.length > 0 ?
                                                <>
                                                    {alumnos.map((al) => {
                                                        return <Col md='6' className='p-3' key={al.legajo}>
                                                            <h5>
                                                                {al.nombre} {al.apellido}
                                                            </h5>
                                                        </Col>
                                                    })}
                                                </>
                                                :
                                                <>No hay alumnos en el curso</>
                                        }

                                    </Row>

                            }

                        </>
                        :
                        <>
                        </>
                }
            </Container>
        </>
    );
}

export default CursoDetalle;