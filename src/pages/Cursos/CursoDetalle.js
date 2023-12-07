import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/Detalle.css';
import Spinner from '../../components/Spinner';
import { Form, Row, Col, Button, Breadcrumb, Card, } from 'react-bootstrap';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, ErrorMessage } from "formik";


const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CursoDetalle = (props) => {
    const navigate = useNavigate();
    const formikRef = useRef();

    const [curso, setCurso] = useState({ idCurso: '', materia: '', texto: '', carrucel: false });
    const [solapa, setSolapa] = useState("Materiales");
    const [alumnos, setAlumnos] = useState([]);
    const [materiales, setMateriales] = useState([]);

    //botones del formulario
    const [botonProcesar, setBotonProcesar] = useState("Crear");
    const [botonVolver, setBotonVolver] = useState("Cancelar");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const formSchema = Yup.object().shape({
        // BusquedaCuitNombre: Yup.string().when("Accion", {
        //   is: "crear",
        //   then: Yup.string().required("Campo requerido"),
        // }),
        // Sucursal: Yup.string().when("Accion", {
        //   is: "crear",
        //   then: Yup.string().required("Campo requerido"),
        // }),
        // TipoDenuncia: Yup.string().required("Campo requerido"),
        // Materia: Yup.string().required("Campo requerido"),
        // FechaRecibida: Yup.date()
        //   .required("Campo requerido")
        //   .max(new Date(), "No puede ser mayor que la fecha actual"),
    });



    useEffect(() => {
        console.log(props)
        console.log(curso)
        if (props.tipo == "editar" || props.tipo == "verDetalle") {
            if (localStorage.getItem('curso')) {
                setCurso(JSON.parse(localStorage.getItem('curso')));
            }
        }

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



    }, []);

    const Guardar = async (data) => {
        setButtonDisabled(true);
        setButtonDisabled(false);
    }

    const BuscarAlumnos = () => {
        fetch(URL + 'Cursos/Alumnos/' + 1, {
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
        fetch(URL + 'Cursos/Material/' + 1, {
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
                <Formik
                    innerRef={formikRef}
                    enableReinitialize={true}
                    initialValues={curso}
                    validationSchema={formSchema}
                    onSubmit={Guardar}

                >{({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched }) => (
                    <>
                        <Card style={{ padding: 20, marginTop: 0 }}>
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
                                            <Col xs="12" lg="12">
                                                <h1 style={{ color: "white" }}><span style={{ color: "black" }}>{curso.materia}</span></h1>
                                            </Col>
                                        </Row>
                                        <div className='row bg-primary'>
                                            <div className='col' >
                                                <button className='btn btn-secondary' onClick={() => { setSolapa("Materiales"); BuscarMateriales() }} >Materiales</button>
                                            </div>
                                            <div className='col' >
                                                <button className='btn btn-secondary' onClick={() => { setSolapa("Alumnos"); BuscarAlumnos() }}  >Alumnos</button>
                                            </div>
                                        </div>
                                        {
                                            solapa == 'Materiales' ?
                                                <Row  >
                                                    {materiales.length > 0 ?
                                                        <Row className='row-materiales' >
                                                            {
                                                                materiales.map(mat => {
                                                                    return <Card className='card-material' >
                                                                        <Card.Title>
                                                                            {mat.titulo}
                                                                        </Card.Title>
                                                                        <Card.Body>
                                                                            {mat.texto}
                                                                        </Card.Body>
                                                                    </Card>
                                                                })
                                                            }

                                                        </Row>
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
                                                                    return <Row>
                                                                        <Col>{al.nombre} {al.apellido}</Col>
                                                                    </Row>
                                                                })}
                                                            </>
                                                            :
                                                            <>No hay alumnos en el curso</>
                                                    }
                                                    <Col>
                                                    </Col>
                                                </Row>

                                        }

                                    </>
                                    :
                                    <>
                                    </>
                            }
                            {/* <Row>
                                <Col xs="2" lg="2">
                                    <Button
                                        onClick={() => navigate('/cursos')}
                                        type="button"
                                        style={{ width: "100%", background: "#F2F2F2", borderColor: "#009AAE", color: "#009AAE" }}
                                    >
                                        {botonVolver}
                                    </Button>
                                </Col>
                                {props.tipo != 'verDetalle' &&
                                    <Col xs lg="3">
                                        <Button
                                            variant="primary"
                                            onClick={handleSubmit}
                                            style={{ width: "100%", background: "#009AAE", borderColor: "#009AAE", color: "#FFFFFF" }}
                                            disabled={buttonDisabled}
                                        >
                                            {buttonDisabled ? (<>
                                                <Spinner animation="border" size="sm" />
                                                {' '} Procesando
                                            </>) : botonProcesar
                                            }
                                        </Button>
                                    </Col>}
                            </Row> */}
                        </Card>
                    </>)}
                </Formik>
            </div>
        </>
    );
}

export default CursoDetalle;