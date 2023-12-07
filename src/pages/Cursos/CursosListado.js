import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import campus from '../../assets/images/campus.png';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import {Edit as EditIcon, Tune as TuneIcon, Check as CheckIcon, Storage as StorageIcon, MoreVert as MoreVertIcon, Search as SearchIcon, Remove as RemoveIcon, Download as DownloadIcon, UploadFile as UploadFileIcon, FileUpload as FileUploadIcon, Campaign as CampaignIcon, Place as PlaceIcon } from '@mui/icons-material';
import Cursos from "../../storage/Cursos";
import DataTable from 'react-data-table-component';
import dataTableStyles from '../../styles/dataTableStyles';

const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CursosListado = (props) => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [cursos, setCursos] = useState([]);

    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        console.log("CURSOS");

        if (props.tipo === "todos") {
            fetch(URL + 'Cursos/ParaInscribir', {
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
        } else {

            fetch(URL + 'Cursos/' + usuario.legajo, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('MisCursos', data);
                    setCursos(data);
                })
                .catch(ex => console.log(ex))
        }

    }, []);

    const handleInscribir = (e) => {
        console.log('USUARIO', usuario)
        console.log("INSCRIBIR", e.target.id);

        fetch(URL + 'Cursos/Inscribir/' + usuario.legajo + '/' + e.target.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('MisCursos', data);
                setCursos(data);
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
                <div id={row.id} onClick={handleInscribir} >
                    Inscribirme
                </div>
            ),
            // allowOverflow: true,
            // button: true,
            // minWidth: "80px",
            // maxWidth: "80px",
        },
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
            <Row style={{ paddingTop: 10, paddingLeft: 20 }}>
                <h1 className='titulos'>{(props.tipo === "todos") ? "Listado de cursos" : "Listado de Mis cursos"}</h1>
            </Row>
            {props.tipo === "todos" && cursos.length > 0 ?
                <Row>
                    <DataTable
                        columns={columns}
                        data={cursos}
                        customStyles={dataTableStyles}
                        pagination
                        paginationRowsPerPageOptions={[10, 20, 30, 50]}
                        paginationComponentOptions={dataTableStyles.paginationComponentOptions}
                        noDataComponent="No hay cursos para mostrar"
                    />
                </Row>
                :
                <Row>
                    {
                        cursos.map((curso) => {
                            return <Col xs={12} md={4} key={curso.id}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            {curso.materia}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {curso.dia} - {curso.turno} - {curso.profesor}
                                        </Card.Text>
                                        <Card.Footer >
                                            <Button onClick={() => { localStorage.setItem('curso', JSON.stringify(curso)); navigate('/curso-detalle') }}>
                                                Ver curso
                                            </Button>
                                            <Button onClick={() => { localStorage.setItem('curso', JSON.stringify(curso)); navigate('/curso-detalle') }}>
                                                Darme de baja
                                            </Button>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>;
                        })
                    }
                </Row>
            }
        </div>
    );
}

export default CursosListado;