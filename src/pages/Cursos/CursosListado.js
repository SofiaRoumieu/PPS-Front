import React, { useState, useEffect } from 'react';
import {Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import campus from '../../assets/images/campus.png';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import {Edit as EditIcon, Tune as TuneIcon, Check as CheckIcon, Storage as StorageIcon, MoreVert as MoreVertIcon, Search as SearchIcon, Remove as RemoveIcon, Download as DownloadIcon, UploadFile as UploadFileIcon, FileUpload as FileUploadIcon, Campaign as CampaignIcon, Place as PlaceIcon } from '@mui/icons-material';
import Cursos from "../../storage/Cursos";
import DataTable from 'react-data-table-component';
import dataTableStyles from '../../styles/dataTableStyles';

const CursosListado = (props) => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [cursos, setCursos] = useState(usuario.misCursos);

    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if(props.tipo==="todos"){
            setCursos(Cursos);
        }
    }, []);

    const columns = [
        {
            name: 'Materia',
            selector: row =>  row?.materia,
            sortable: true,
            center: true,
        },
        
        {
            name: 'Profesor',
            selector: row =>  row?.profesor,
            sortable: true,
            center: true,
        },
        {
            name: 'Turno',
            selector: row =>  row?.turno,
            sortable: true,
            center: true,
        },
        {
            name: 'Horarios',
            selector: row =>  row?.agenda[0].dia + " - " + row?.agenda[0].horario,
            sortable: true,
            center: true,
        },
        {
            name: "Acciones",
            cell: (row) => (
              <>
                
              </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: "80px",
            maxWidth: "80px",
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
            <Row style={{paddingTop:10, paddingLeft:20}}>
                <h1 className='titulos'>{(props.tipo === "todos")? "Listado de cursos"  : "Listado de Mis cursos"}</h1>
            </Row>
            {props.tipo==="todos"? 
            <Row> 
                <DataTable
                    columns={columns}
                    data={cursos}
                    customStyles={dataTableStyles}
                    pagination
                    paginationRowsPerPageOptions={[10, 20, 30, 50]}
                    paginationComponentOptions={dataTableStyles.paginationComponentOptions}
                    noDataComponent = "No hay cursos para mostrar"
                />
            </Row> 
            :
            <Row>
                { cursos.map((curso) => {
                    return <Col xs="3" lg="3" key={curso.id}>
                        <Card>
                            <div style={{margin:10, height:50}}>
                                <label>{curso.materia}</label>
                                <br></br>
                                <label>{curso.profesor}</label>
                            </div>
                            <Button 
                                style={{width: "100%", background: "#009AAE", borderColor: "#009AAE", color: "#FFFFFF"}}
                                onClick={()=>{localStorage.setItem('curso',  JSON.stringify(curso)); navigate('/curso-detalle')}} 
                            >
                                Ver curso
                            </Button>

                            <Button 
                                style={{width: "100%", background: "#009AAE", borderColor: "#009AAE", color: "#FFFFFF"}}
                                onClick={()=>{localStorage.setItem('curso',  JSON.stringify(curso)); navigate('/curso-detalle')}} 
                            >
                                Darme de baja
                            </Button>
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