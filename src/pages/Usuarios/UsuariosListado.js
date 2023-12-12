import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_CONNECTION;

const UsuariosListado = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    const mapDate = (datt) => {
        let retorno = '';
        let date = new Date(datt);
        retorno += `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        return retorno;
    }
    const mapTipoUsuario = (tipou) => {
        let retorno = 'Administrador';
        if (tipou == 1) {
            retorno = 'Alumno'
        } else if (tipou == 2) {
            retorno = 'Profesor'
        }
        return retorno;
    }


    useEffect(() => {
        getUsuarios()
    }, []);

    const getUsuarios = () => {
        fetch(URL + 'api/Usuarios',)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                setUsuarios(data);
            })
            .catch((err) => {
                console.error('errror', err);
            })
            .finally(() => {
            });
    }

    const handleHabilitar = (e) => {
        console.log(e.target.id);

        let data = {
            legajo: e.target.id
        }
        fetch(URL + 'api/Usuarios/ModificarEstado', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                getUsuarios();
            })
            .catch(ex => console.log(ex))
    }

    return (
        <Container>
            <Row className='d-flex justify-content-between  m-2'>
                <Row>
                    <Col className='text-start'>
                        <h2 className='text-primary fw-bolder text-start'>Listado de usuarios</h2>
                    </Col>
                    <Col className='text-end'>
                        <Button variant='success' onClick={() => navigate('/usuarios-alta')} >Nuevo usuario</Button>
                    </Col>
                </Row>
            </Row>
            <Table striped bordered hover className='mt-4'>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dni</th>
                        <th>Tipo Usuario</th>
                        <th>Fecha ingreso</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => {
                        return (
                            <tr key={usuario.legajo}>
                                <td>{usuario.legajo}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.dni}</td>
                                <td>{mapTipoUsuario(usuario.tipoUsuario)}</td>
                                <td>{mapDate(usuario.fechaRegistro)}</td>
                                <td>{usuario.estado == 1 ? 'Activo' : 'Inactivo'}</td>
                                <td >
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Acciones
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => navigate('/usuarios-modificar/' + usuario.legajo)} id={usuario.legajo}  > Modificar </Dropdown.Item>
                                            {usuario.estado == 1 && <Dropdown.Item onClick={handleHabilitar} id={usuario.legajo}  > Deshabilitar </Dropdown.Item>}
                                            {usuario.estado == 0 && <Dropdown.Item onClick={handleHabilitar} id={usuario.legajo}  > Habilitar </Dropdown.Item>}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </Container>

    );
}

export default UsuariosListado;