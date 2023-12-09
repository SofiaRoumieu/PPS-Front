import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/Detalle.css';
import Spinner from '../../components/Spinner';
import { Row, Col, Button, Breadcrumb, Card } from 'react-bootstrap';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, ErrorMessage } from "formik";
import campus from '../../assets/images/campus.png';


const NovedadForm = (props) => {
    const URL = process.env.REACT_APP_BACKEND_CONNECTION;
    const navigate = useNavigate();
    const formikRef = useRef();
    const { id } = useParams();

    // const [initialValues, setInitialValues] = useState({idNovedad:'',titulo:'', texto:'', carrucel:false});
    const [novedad, setNovedad] = useState({ idNovedad: '', titulo: '', texto: '', carrucel: false });
    const [cargando, setCargando] = useState(true);

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
        if (props.tipo == "editar" || props.tipo == "verDetalle") {
            fetch(URL + 'api/Publico/novedad/' + id)
                .then((res) => res.ok ? res.json() : Promise.reject(res))
                .then((data) => {
                    console.log(data);
                    setNovedad(data);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setCargando(false);
                });
        }
        setCargando(false);

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
                {cargando ? (<Spinner />)
                    : <>
                        <Formik
                            innerRef={formikRef}
                            enableReinitialize={true}
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
                                        <Row>
                                            <Col>
                                                <Card >
                                                    <Card.Body>
                                                        <Card.Title>{novedad.titulo}</Card.Title>

                                                        <Card.Img src={campus} alt={novedad.titulo} />
                                                        <Card.Subtitle className="mb-2 text-muted">{novedad.copete}</Card.Subtitle>
                                                        <Card.Text>
                                                            {novedad.texto}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        {novedad.fechaPublicacion}
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        </Row>
                                        : <>
                                        </>}
                                    <Row>
                                        <Col xs="2" lg="2">
                                            <Button
                                                onClick={() => navigate('/novedades')}
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
                                    </Row>
                                </Card>
                            </>)}
                        </Formik>
                    </>}
            </div>
        </>
    );
}

export default NovedadForm;