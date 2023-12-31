import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/Detalle.css';
import { Row, Col, Button, Breadcrumb, Card, Spinner, Form, Container, Modal, } from 'react-bootstrap';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, ErrorMessage } from "formik";
import moment from "moment";


const initModalData = {
    title: '',
    text: ''
}
const NovedadForm = (props) => {
    const URL = process.env.REACT_APP_BACKEND_CONNECTION;
    const navigate = useNavigate();
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(initModalData);

    const [novedad, setNovedad] = useState({ IdNovedad: '', Titulo: '', Texto: '', FechaPublicacion: '', Carrucel: false, Foto: '' });
    const [cargando, setCargando] = useState(false);
    const [nombreArchivoCargar, setNombreArchivoCargar] = useState("");
    const [mostrarErrorFoto, setMostrarErrorFoto] = useState(false);
    const [archivos, setArchivos] = useState(null);
    const inputFile = useRef(null)

    //botones del formulario
    const [botonProcesar, setBotonProcesar] = useState("Crear");
    const [botonVolver, setBotonVolver] = useState("Cancelar");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const formSchema = Yup.object().shape({
        Titulo: Yup.string().required("Campo requerido"),
        Copete: Yup.string().required("Campo requerido"),
        Texto: Yup.string().required("Campo requerido"),
    });

    useEffect(() => {
        setCargando(true);
        switch (props.tipo) {
            case "crear":
                setBotonProcesar("Crear");
                setBotonVolver("Cancelar");
                break;
            case "editar":
                setBotonProcesar("Guardar");
                setBotonVolver("Cancelar");
                break;
            case "verDetalle":
                setBotonVolver("Volver");
                break;
        }

        if (props.tipo == "editar" || props.tipo == "verDetalle") {
            fetch(URL + 'api/Publico/novedad/' + id)
                .then((res) => res.ok ? res.json() : Promise.reject(res))
                .then((data) => {
                    console.log(data);
                    setNovedad(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        setCargando(false);
    }, []);


    // TODO : Probar endpoint
    const Guardar = async (data) => {
        console.log("hola")
        console.log(data);
        setButtonDisabled(true);

        let urlEndpoint = '';
        let accion = '';
        let mensajeConfirmacion;
        if (id) {
            urlEndpoint = 'api/Novedades/EditarNovedad/' + id;
            accion = "PUT";
            mensajeConfirmacion = "Novedad modificada correctamente";
        }
        else {
            urlEndpoint = 'api/Novedades';
            accion = "POST";
            mensajeConfirmacion = "Novedad creada correctamente";
        }

        var formData = new FormData();

        for (let index = 0; index < archivos.length; index++) {
            formData.append("file", archivos[index]);
            console.log(archivos[index])
        }
        formData.append('titulo', data.Titulo);
        formData.append('copete', data.Copete);
        formData.append('texto', data.Texto);
        formData.append('snMostrar', data.Carrucel);


        fetch(URL + urlEndpoint, {
            method: accion,
            body: formData
        })
            .then(async res => {
                if (res.ok)
                    return res.json()
                let errmsg = await res.text();
                console.log(errmsg)
                throw new Error(errmsg)
            })
            .then((data) => {
                console.log(data);
                let titulo = data.status == 200 ? 'Exito' : 'Error';
                setModalData({ title: titulo, text: data.message });
                setShowModal(true);
                window.location.assign("/novedades");
            })
            .catch(err => {
                setModalData({ title: 'Error', text: 'Ocurrio un error' });
                setShowModal(true);
            })
            .finally(() => {
            })

        setButtonDisabled(false);
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

    return (
        <Container className='mt-2'>
            {cargando ?
                (<Spinner />)
                :
                <div className='row'>
                    <ToastContainer
                        position="top-center"
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {cargando ? (<Spinner />)
                        : <>
                            <Formik
                                initialValues={novedad}
                                validationSchema={formSchema}
                                onSubmit={Guardar}
                            >{({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched }) => (
                                <>
                                    <Card style={{ padding: 20, marginTop: 0 }}>
                                        <Row>
                                            <Col xs="12" lg="12" style={{ marginBottom: 5 }}>
                                                <Breadcrumb>
                                                    <Breadcrumb.Item onClick={() => navigate('/novedades')}>Listado de novedades</Breadcrumb.Item>
                                                    <Breadcrumb.Item active>{(props.tipo == "editar") ? "Editar novedad" : (props.tipo == "verDetalle") ? "Detalle de novedad" : "Nueva novedad"}</Breadcrumb.Item>
                                                </Breadcrumb>
                                            </Col>
                                        </Row>
                                        {props.tipo == 'verDetalle' ?
                                            <Card >
                                                <Card.Body>
                                                    <Card.Title>{novedad.titulo}</Card.Title>
                                                    <Card.Subtitle style={{ marginTop: 5 }} className="mb-2">{novedad.copete}</Card.Subtitle>
                                                    <Card.Img src={"data:image/jpeg;base64," + novedad.imagen} alt={novedad.titulo} />
                                                    <Card.Text>
                                                        {novedad.texto}
                                                    </Card.Text>
                                                    <Card.Text> {moment(novedad.fechaPublicacion).utc().format('DD/MM/YYYY')}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            :
                                            <Card >
                                                <Card.Body>
                                                    <Card.Title style={{ textAlign: "left" }}>{(props.tipo == 'crear') ? 'Nueva novedad' : 'Editar novedad'}</Card.Title>
                                                    <Col xs lg="12" style={{ marginTop: 5 }}>
                                                        <Form.Group controlId="Titulo">
                                                            <Form.Label><span style={{ color: "red" }}>*</span> Título:</Form.Label>
                                                            <Form.Control

                                                                name="Titulo"
                                                                placeholder=""
                                                                value={values.Titulo || ""}
                                                                onChange={handleChange}
                                                                maxLength={50}
                                                            />
                                                            <ErrorMessage
                                                                name="Titulo"
                                                                component="div"
                                                                className="field-error text-danger"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs lg="12" style={{ marginTop: 5 }}>
                                                        <Form.Group controlId="Copete">
                                                            <Form.Label><span style={{ color: "red" }}>*</span> Copete:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="Copete"
                                                                placeholder=""
                                                                value={values.Copete || ""}
                                                                onChange={handleChange}
                                                                autoComplete="off"
                                                                maxLength={100}
                                                            />
                                                            <ErrorMessage
                                                                name="Copete"
                                                                component="div"
                                                                className="field-error text-danger"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs lg="12" style={{ marginTop: 5 }}>
                                                        <Form.Group controlId="Texto">
                                                            <Form.Label><span style={{ color: "red" }}>*</span> Texto:</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                maxLength="2000"
                                                                name="Texto"
                                                                placeholder=""
                                                                value={values.Texto || ""}
                                                                onChange={handleChange}
                                                                autoComplete="off"
                                                            />
                                                            <ErrorMessage
                                                                name="Texto"
                                                                component="div"
                                                                className="field-error text-danger"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Row>
                                                        <Col xs lg="4" style={{ marginTop: 15 }}>
                                                            <Form.Label>Foto:</Form.Label><br></br>
                                                            <Form.Group controlId="Foto" className="mb-3">
                                                                {
                                                                    nombreArchivoCargar != "" &&
                                                                    <p>
                                                                        {nombreArchivoCargar}
                                                                    </p>
                                                                }

                                                                <Button onClick={() => { inputFile.current.click(); }} variant='outline-primary' className='w-100' >
                                                                    Cargar archivo
                                                                </Button>
                                                                <div style={{ display: "none" }}>

                                                                    <Form.Label>Seleccione el archivo <span style={{ color: "red" }}>*</span></Form.Label><br></br>

                                                                    <Form.Control
                                                                        ref={inputFile}
                                                                        type="file"
                                                                        name="Foto"
                                                                        onChange={(e) => subirArchivos(e.target.files)}
                                                                    />
                                                                    <ErrorMessage
                                                                        name='Foto'
                                                                        component='div'
                                                                        className='field-error text-danger'
                                                                    />
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs lg="4" style={{ marginTop: 15 }}>
                                                            <Form.Label>Mostrar novedad en carrusel:</Form.Label>
                                                            <Form.Group controlId="Carrucel">
                                                                <Form.Check
                                                                    name="Carrucel"
                                                                    checked={values.Carrucel}
                                                                    onChange={handleChange}
                                                                    label="Mostrar"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        }
                                        <Row style={{ marginTop: 10, justifyContent: "center" }}>
                                            <Col xs="2" lg="2">
                                                <Button
                                                    onClick={() => navigate('/novedades')}
                                                    type="button"
                                                    variant='outline-primary'
                                                    className='w-100'
                                                >
                                                    {botonVolver}
                                                </Button>
                                            </Col>
                                            {props.tipo != 'verDetalle' &&
                                                <Col xs="2" lg="2">
                                                    <Button
                                                        className='w-100'
                                                        variant="primary"
                                                        onClick={handleSubmit}
                                                        disabled={buttonDisabled}
                                                    >
                                                        {buttonDisabled ? (<>
                                                            <Spinner animation="border" size="sm" />
                                                            {' '} Procesando
                                                        </>) : botonProcesar
                                                        }
                                                    </Button>
                                                </Col>}
                                        </Row>
                                    </Card>
                                </>)}
                            </Formik>
                        </>}
                </div>
            }
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

export default NovedadForm;