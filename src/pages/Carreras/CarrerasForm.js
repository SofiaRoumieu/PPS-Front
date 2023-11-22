import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Detalle.css';
import Spinner from '../../components/Spinner';
import {Row, Col, Button, Breadcrumb, Card } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import dataTableStyles from '../../styles/dataTableStyles';


const NovedadForm = (props) => {
    const navigate = useNavigate();

    const [carrera, setCarrera] = useState({idCarrera:'',nombreCarrera:'', cantidadMaterias:'', cantidadcuatrimestres:'', materias:[]});
    const [cargando, setCargando] = useState(true);

    //botones del formulario
    const [botonVolver, setBotonVolver] = useState("Cancelar");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('carrera')){
            setCarrera(JSON.parse(localStorage.getItem('carrera')));
        }
        
        setCargando(false);
        setBotonVolver("Volver");
    }, []);

    const columns = [
        {
            name: 'Id',
            selector: row =>  row?.idMateria,
            sortable: true,
            center: true,
        },
        
        {
            name: 'Nombre',
            selector: row =>  row?.nombreMateria,
            sortable: true,
            center: true,
        },
        {
            name: 'Cuatrimestre',
            selector: row =>  row?.cuatrimestre,
            sortable: true,
            center: true,
        },
        {
            name: 'Carga horaria semanal',
            selector: row =>  row?.cargaHorariaSemanal,
            sortable: true,
            center: true,
        },
        {
            name: 'Correlativas',
            selector: row =>  row?.correlativas,
            sortable: true,
            center: true,
        },
    ];

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
            {cargando ? (<Spinner/>)
            : <>
            <Card style={{padding: 20, marginTop: 0}}>
                <Row>
                    <Col xs="12" lg="12"style={{marginBottom: 5}}>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => navigate('/carreras')}>Listado de carreras</Breadcrumb.Item>
                        <Breadcrumb.Item active> Detalle de carrera</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                </Row> 
                
                <Row> 
                    <Col xs="12" lg="12">
                        <h1 style={{color:"white"}}><span style={{color:"red"}}>{carrera.nombreCarrera}</span></h1> 
                    </Col>
                </Row>
                <Row>
              <DataTable
                columns={columns}
                data={carrera.materias}
                customStyles={dataTableStyles}
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 50]}
                paginationComponentOptions={dataTableStyles.paginationComponentOptions}
                noDataComponent = "No hay materias para mostrar"
              />
            </Row>
                <Row>
                    <Col xs="2" lg="2">
                        <Button
                            onClick={() => navigate('/carreras')}
                            type="button"
                            style={{width: "100%", background: "#F2F2F2", borderColor: "#009AAE", color: "#009AAE"}}
                        >
                            {botonVolver}
                        </Button>
                    </Col>          
                </Row>
            </Card>
                 
            </>}
        </div>
        </>
    );
}

export default NovedadForm;