import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel, Button, Card, Dropdown, Modal, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import {Edit as EditIcon, Tune as TuneIcon, Check as CheckIcon, Storage as StorageIcon, MoreVert as MoreVertIcon, Search as SearchIcon, Remove as RemoveIcon, Download as DownloadIcon, UploadFile as UploadFileIcon, FileUpload as FileUploadIcon, Campaign as CampaignIcon, Place as PlaceIcon } from '@mui/icons-material';
import DataTable from 'react-data-table-component';
import dataTableStyles from '../../styles/dataTableStyles';

const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CursosListado = (props) => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [cursos, setCursos] = useState([]);

    const [postulaciones, setPostulaciones] = useState([]);
    const [profesorSeleccionado, setprofesorSeleccionado] = useState(0);
    const [cursoSeleccionado, setcursoSeleccionado] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('ss');


    useEffect(() => {
        console.log("CURSOS");

        if (props.tipo === "todos") {
            getCursadasParaInscribir();
        } else if (props.tipo === "misCursos") {
            getCursadasAlumno();
        } else if (props.tipo === 'misCursosProfesor') {
            getCursadasProfesor();
        }
        else if (props.tipo === 'vacantes') {
            getCursadasVacantes();
        } else {
            getTodasLasCursadas();
        }

    }, []);

    const asignarProfesor = () => {
        console.log(profesorSeleccionado);
        console.log(cursoSeleccionado);
        if (profesorSeleccionado <= 0) {
            setErrorMessage('Debe seleccionar un profesor')
            setShowModal(false);
            setShowModalError(true)
            return;
        }
        let data = {
            "idCursada": cursoSeleccionado,
            "legajoProfesor": profesorSeleccionado,
        }
        fetch(URL + 'Cursos/AsignarProfesor', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('ASIGNADO', data);
                setShowModal(false);
                getTodasLasCursadas();
            })
            .catch(ex => console.log(ex))
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setprofesorSeleccionado(e.target.value)
    }
    const handlePostularme = (e) => {
        console.log(e.target.id)
        console.log(usuario.legajo)

        let data = {
            idCursada: e.target.id,
            legajoProfesor: usuario.legajo
        }
        fetch(URL + 'Cursos/Postulacion', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok)
                    return res.json()
                let errmsg = await res.text();
                console.log(errmsg)
                throw new Error(errmsg)
            })
            .then((data) => {
                console.log('Se postulo con exito', data);
                setErrorMessage("Se postulo con exito")
                setShowModalError(true)
            })
            .catch(ex => {
                setErrorMessage(ex.message)
                setShowModalError(true)
            })
    }


    const getPostulaciones = (id) => {
        fetch(URL + 'Cursos/postulaciones/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Postulaciones', data);
                setPostulaciones(data);
            })
            .catch(ex => console.log(ex))
    }
    const getCursadasVacantes = () => {
        fetch(URL + 'Cursos/vacantes', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Cursos vacantes', data);
                setCursos(data);
            })
            .catch(ex => console.log(ex))
    }
    const getTodasLasCursadas = () => {
        fetch(URL + 'Cursos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Todos los Cursos', data);
                setCursos(data);
            })
            .catch(ex => console.log(ex))
    }
    const getCursadasParaInscribir = () => {
        fetch(URL + 'Cursos/ParaInscribir/' + usuario.idCarrera, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('CursosParaInscribir', data);
                setCursos(data);
            })
            .catch(ex => console.log(ex))
    }
    const getCursadasAlumno = () => {
        fetch(URL + 'Cursos/' + usuario.legajo, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('MisCursosAlumno', data);
                setCursos(data);
            })
            .catch(ex => console.log(ex))
    }
    const getCursadasProfesor = () => {
        fetch(URL + 'Cursos/profesor/' + usuario.legajo, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('MisCursosProfesor', data);
                setCursos(data);
            })
            .catch(ex => console.log(ex))

    }

    const handleAsignar = (e) => {
        setcursoSeleccionado(e.target.id)
        let id = e.target.id;
        getPostulaciones(id);
        setShowModal(true);
    }

    const handleInscribir = (e) => {
        console.log('USUARIO', usuario)
        console.log("INSCRIBIR", e.target.id);

        fetch(URL + 'Cursos/Inscribir/' + usuario.legajo + '/' + e.target.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok)
                    return res.json()
                let errmsg = await res.text();
                console.log(errmsg)
                throw new Error(errmsg)
            })
            .then((data) => {
                console.log('Inscrito', data);
            })
            .catch(ex => {
                setErrorMessage(ex.message)
                setShowModalError(true)
            })
    }
    const handleDarDeBaja = (e) => {
        console.log('USUARIO', usuario)
        console.log("DAR DE BAJA", e.target.value);

        fetch(URL + 'Cursos/Baja/' + usuario.legajo + '/' + e.target.value, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok)
                    return res.json()
                let errmsg = await res.text();
                console.log(errmsg)
                throw new Error(errmsg)
            })
            .then((data) => {
                console.log('Se dio de baja', data);
                getCursadasAlumno()
            })
            .catch(ex => {
                setErrorMessage(ex.message)
                setShowModalError(true)
            })
    }

    const handleEstablecerActiva = (e) => {
        let data = {
            idCursada: e.target.id,
            estado: 2
        };
        console.log(data)
        fetch(URL + 'Cursos/ModificarEstado/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Se activo la cursada");
                getTodasLasCursadas();
            })
            .catch(ex => console.log(ex.message))
    }

    const handleEstablecerFinalizada = (e) => {
        let data = {
            idCursada: e.target.id,
            estado: 3
        };
        console.log(data)
        fetch(URL + 'Cursos/ModificarEstado/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Se finalizo la cursada");
                getTodasLasCursadas();
            })
            .catch(ex => console.log(ex.message))
    }


    const columns = [
        {
            name: 'Materia',
            selector: row => row?.materia,
            sortable: true,
            center: true
        },
        {
            name: 'Profesor',
            selector: row => row?.profesor,
            sortable: true,
            center: true
        },
        {
            name: 'Dia',
            selector: row => row?.dia,
            sortable: true,
            center: true
        },
        {
            name: 'Turno',
            selector: row => row?.turno,
            sortable: true,
            center: true
        },
        {
            name: "Acciones",
            cell: (row) => (
                <Button variant='secondary' className='btn-sm' id={row.id} onClick={handleInscribir} >
                    Inscribirme
                </Button>
            ),
        }
    ];

    const columnsVacantes = [
        {
            name: 'Materia',
            selector: row => row?.materia,
            sortable: 0,
            center: 1
        },
        {
            name: 'Dia',
            selector: row => row?.dia,
            sortable: true,
            center: true
        },
        {
            name: 'Turno',
            selector: row => row?.turno,
            sortable: true,
            center: true
        },
        {
            name: "Acciones",
            cell: (row) => (
                <Button variant='secondary' className='btn-sm' key={row.id} id={row.id} onClick={handlePostularme} >
                    Postularme
                </Button>
            ),
        }
    ];


    const columnsAdmin = [
        {
            name: 'Id',
            selector: row => row?.id,
            sortable: true,
            center: true
        },
        {
            name: 'Materia',
            selector: row => row?.materia,
            sortable: true,
            center: true
        },
        {
            name: 'Profesor',
            selector: row => row?.profesor,
            sortable: true,
            center: true
        },
        {
            name: 'Dia',
            selector: row => row?.dia,
            sortable: true,
            center: true
        },
        {
            name: 'Turno',
            selector: row => row?.turno,
            sortable: true,
            center: true
        },
        {
            name: 'Estado',
            selector: row => row?.estado,
            sortable: true,
            center: true
        },
        {
            name: "Acciones",
            cell: (row) => (
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Acciones
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {row.estado == 'SinAsignar' && <Dropdown.Item onClick={handleAsignar} id={row.id}  > Asignar </Dropdown.Item>}
                        {row.estado == 'Asignada' && <Dropdown.Item onClick={handleEstablecerActiva} id={row.id}  > Establecer Activa </Dropdown.Item>}
                        {row.estado == 'Activa' && <Dropdown.Item onClick={handleEstablecerFinalizada} id={row.id}  > Establecer Finalizada </Dropdown.Item>}
                        <Dropdown.Item onClick={() => { localStorage.setItem('curso', JSON.stringify(row)); navigate('/curso-detalle') }} > Ir al curso </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            ),
        }
    ];


    return (
        <div>
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
            <Row className='d-flex justify-content-between  m-2 mb-4'>
                <Row>
                    <Col className='text-start'>
                        <h2 className='text-primary fw-bolder text-start'>{(props.tipo === "misCursos") ? "Listado de Mis cursos" : "Listado de cursos"}</h2>
                    </Col>
                    {
                        usuario.tipoUsuario == 3 &&
                        <Col className='text-end'>
                            <Button variant='success' onClick={() => navigate('/cursos-crear')}  >Nuevo Curso</Button>
                        </Col>
                    }

                </Row>
            </Row>

            <Modal show={showModalError} >
                <Modal.Header >
                    <Modal.Title>
                        Error
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-secondary' onClick={() => { setShowModalError(false) }} > Aceptar </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} >
                <Modal.Header >
                    <Modal.Title>
                        Asignar Profesor
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor='profesor' className='label'> Profesores Postulados: </label>
                    <select name='profesor' className='form-control' onChange={handleChange} >
                        <option className='form-control' value={-1}> Seleccione </option>
                        {
                            postulaciones.length ? (
                                postulaciones.map((postulacion) => {
                                    return (
                                        <option className='form-control' key={postulacion.legajoProfesor} value={postulacion.legajoProfesor} > {postulacion.profesor}</option>
                                    )
                                })
                            ) : (<></>)
                        }
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-secondary' onClick={() => { setShowModal(false) }} > Cancelar </Button>
                    <Button onClick={asignarProfesor}  > Asignar </Button>
                </Modal.Footer>
            </Modal>

            {props.tipo === "admin" && cursos.length > 0 ?
                <Row>
                    <DataTable
                        columns={columnsAdmin}
                        data={cursos}
                        customStyles={dataTableStyles}
                        pagination
                        paginationRowsPerPageOptions={[10, 20, 30, 50]}
                        paginationComponentOptions={dataTableStyles.paginationComponentOptions}
                        noDataComponent="No hay cursos para mostrar"
                    />
                </Row>

                : props.tipo === 'todos' ?
                    <Container>
                        <DataTable
                            columns={columns}
                            data={cursos}
                            customStyles={dataTableStyles}
                            pagination
                            paginationRowsPerPageOptions={[10, 20, 30, 50]}
                            paginationComponentOptions={dataTableStyles.paginationComponentOptions}
                            noDataComponent="No hay cursos para mostrar"
                        />
                    </Container>
                    :
                    props.tipo === 'vacantes' ?
                        <Container>
                            <DataTable
                                columns={columnsVacantes}
                                data={cursos}
                                customStyles={dataTableStyles}
                                pagination
                                paginationRowsPerPageOptions={[10, 20, 30, 50]}
                                paginationComponentOptions={dataTableStyles.paginationComponentOptions}
                                noDataComponent="No hay cursos para mostrar"
                            />
                        </Container>
                        :
                        <Container>
                            <Row >
                                {
                                    cursos.map((curso) => {
                                        return <Col xs={12} md={4} key={curso.id}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title>
                                                        {curso.materia}
                                                    </Card.Title>
                                                    {curso.estado == 'Finalizada' &&
                                                        <Card.Subtitle style={{ color: '#FF0000' }} >
                                                            Finalizada
                                                        </Card.Subtitle>
                                                    }
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {curso.dia} - {curso.turno} - {curso.profesor}
                                                    </Card.Text>
                                                    <Card.Footer >
                                                        <Button onClick={() => { localStorage.setItem('curso', JSON.stringify(curso)); navigate('/curso-detalle') }}>
                                                            Ver curso
                                                        </Button>
                                                        {
                                                            usuario.tipoUsuario == 1 && curso.estado != 'Finalizada' ?
                                                                <Button value={curso.id} onClick={handleDarDeBaja}>
                                                                    Darme de baja
                                                                </Button>
                                                                : <></>
                                                        }

                                                    </Card.Footer>
                                                </Card.Body>
                                            </Card>
                                        </Col>;
                                    })
                                }
                            </Row>
                        </Container>
            }
        </div >
    );
}

export default CursosListado;