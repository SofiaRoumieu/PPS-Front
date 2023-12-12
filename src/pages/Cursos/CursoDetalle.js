import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Detalle.css';
import { Form, Row, Col, Button, Breadcrumb, Card, Container, } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';


const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const initialForm = {
    tipo: -1,
    titulo: '',
    texto: '',
    filePath: ''
};
const initModalData = { title: '', text: '' };


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

    const inputFile = useRef(null);
    const [mostrarErrorFoto, setMostrarErrorFoto] = useState(false);
    const [archivos, setArchivos] = useState(null);
    const [nombreArchivoCargar, setNombreArchivoCargar] = useState("");

    const [showModalMensaje, setShowModalMensaje] = useState(false);
    const [modalData, setModalData] = useState(initModalData);

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
            setModalData({ title: 'Error', text: 'Debe seleccionar un tipo de material.' });
            setShowModalMensaje(true);
            return;
        }
        if (form.titulo == '') {
            console.log("debe elegir un tipo");
            setModalData({ title: 'Error', text: 'Debe ingresar un título.' });
            setShowModalMensaje(true);
            return;
        }
        if (form.texto == '') {
            console.log("debe elegir un tipo");
            setModalData({ title: 'Error', text: 'Debe ingresar una descripción.' });
            setShowModalMensaje(true);
            return;
        }
        form.idCursada = curso.id;
        console.log("Enviando...", form);

        var formData = new FormData();

        for (let index = 0; index < archivos.length; index++) {
            formData.append("file", archivos[index]);
            console.log(archivos[index])
        }
        formData.append('idCursada', curso.id);
        formData.append('tipo', form.tipo);
        formData.append('titulo', form.titulo);
        formData.append('texto', form.texto);

        fetch(URL + 'Cursos/Material', {
            method: "POST",
            body: formData
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                setModalData({ title: 'Exito', text: 'El material fue creado exitosamente.' });
                setShowModalMensaje(true);
            })
            .catch((err) => {
                console.error(err);
                setModalData({ title: 'Error', text: 'Se produjo un error al crear el material.' });
                setShowModalMensaje(true);
            })
            .finally(() => {
                BuscarMateriales();
            });

        handleReset();
    }
    const subirArchivos = archivos => {
        setMostrarErrorFoto([]);
        let errors = [];

        setArchivos(archivos);
        if (archivos) {
            if (archivos.length > 0) {
                setNombreArchivoCargar(archivos[0].name);

                let tamanoKB = archivos[0].size / 1000;
                if (tamanoKB > 5000)
                    errors.push('El tamaño del archivo debe ser menor a 5 MB');

                if (archivos[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    errors.push('El tipo del archivo debe ser xlsx');
            }
        }
        else
            errors.push('El archivo es requerido');

        setMostrarErrorFoto(errors);
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

    function descargarArchivo(e, item) {
        e.preventDefault();
        console.log("descargarArchivo");
        console.log(item);
        let ext = '';

        var a = document.createElement("a");
        a.href = "data:image/jpeg;base64, " + item.filePath;

        ext = '.pdf'

        a.download = item.titulo + ext;
        a.click();
    }
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
                {
                    props.tipo == 'verDetalle' ?
                        <>
                            <Row className='m-2'>
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
                                    JSON.parse(localStorage.getItem('usuario')).tipoUsuario == 2 ?
                                        <>
                                            <Col >
                                                <button className='btn btn-secondary' onClick={() => { navigate('/carga-asistencias') }}  > Cargar Asistencias </button>
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
                                                <option value={-1}> Seleccione </option>
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
                                            <input type='file' ref={inputFile} accept='application/pdf' className='form-control' id='filePath' name='Archivo' onChange={(e) => subirArchivos(e.target.files)} ></input>

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
                                    <Container>
                                        <Row >
                                            {materiales.length > 0 ?
                                                < >
                                                    {
                                                        materiales.map(mat => {
                                                            return <Col md='12' >
                                                                <Card key={mat.idMaterial} className='card-material' >
                                                                    <Card.Title>
                                                                        {mat.titulo} - {moment(mat.fechaPublicacion).utc().format('DD/MM/YYYY')}
                                                                    </Card.Title>
                                                                    <Card.Body>
                                                                        <Row>
                                                                            <Col>
                                                                                <label>Tipo de material:  </label>
                                                                                {(mat.tipo == 1) ? " Noticia" : (mat.tipo == 2) ? " Examen" : " Trabajo Practico"}
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col>
                                                                                <label>Descripción:  </label>
                                                                                {" " + mat.texto}
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='justify-content-center' >
                                                                            {mat.filePath != null &&
                                                                                <Button className='w-75' onClick={(e) => descargarArchivo(e, mat)}>Descargar archivo adjunto</Button>}
                                                                        </Row>
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
                                    </Container>
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
                <Modal show={showModalMensaje} >
                    <Modal.Header >
                        <Modal.Title>
                            {modalData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalData.text}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn-secondary' onClick={() => setShowModalMensaje(false)} >Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default CursoDetalle;