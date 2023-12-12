import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Inicio from '../pages/Inicio';
import Login from '../pages/Login/Login';

import CarrerasListado from '../pages/Carreras/CarrerasListado';
import CarrerasMateria from '../pages/Carreras/CarrerasMateria';
import CursosListado from '../pages/Cursos/CursosListado';
import CursoDetalle from '../pages/Cursos/CursoDetalle';
import Institucional from '../pages/Institucional/Institucional';
import NovedadesListado from '../pages/Novedades/NovedadesListado';
import NovedadesForm from '../pages/Novedades/NovedadesForm';
import NotasListado from "../pages/Notas/NotasListado";
import CargaNotas from "../pages/Cursos/CargaNotas";
import UsuariosListado from "../pages/Usuarios/UsuariosListado";
import AltaUsuario from "../pages/Usuarios/AltaUsuario";
import CrearCurso from "../pages/Cursos/CrearCurso";
import CargarAsistencia from "../pages/Asistencias/CargarAsistencias";
import AltaCarrera from "../pages/Carreras/AltaCarrera";
import AltaMateria from "../pages/Materias/MateriasForm";
import CambiarClave from "../pages/Usuarios/CambiarClave";
import ListadoAsistencias from "../pages/Asistencias/ListadoAsistencias";



const Ruteador = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />

                <Route path="/carreras" element={<CarrerasListado />} />
                <Route path="/carrera-materias" element={<CarrerasMateria />} />
                <Route path="/carrera-alta" element={<AltaCarrera />} />
                <Route path="/materia-alta" element={<AltaMateria />} />

                <Route path="/cursos" element={<CursosListado tipo="todos" />} />
                <Route path="/mis-cursos" element={<CursosListado tipo="misCursos" />} />
                <Route path="/mis-cursos-profesor" element={<CursosListado tipo="misCursosProfesor" />} />
                <Route path="/cursos-vacantes" element={<CursosListado tipo="vacantes" />} />
                <Route path="/cursos-crear" element={<CrearCurso />} />
                <Route path="/administrar-cursos" element={<CursosListado tipo="admin" />} />
                <Route path="/curso-detalle" element={<CursoDetalle tipo="verDetalle" />} />
                <Route path="/curso-detalle/:id" element={<CursoDetalle tipo="editar" />} />
                <Route path="/curso-detalle" element={<CursoDetalle tipo="crear" />} />

                <Route path="/notas" element={<NotasListado />} />
                <Route path="/carga-notas" element={<CargaNotas />} />
                <Route path="/carga-asistencias" element={<CargarAsistencia />} />

                <Route path="/institucional" element={<Institucional />} />

                <Route path="/novedades" element={<NovedadesListado />} />
                <Route path="/novedades-detalle/:id" element={<NovedadesForm tipo="verDetalle" />} />
                <Route path="/novedades-alta" element={<NovedadesForm tipo="crear" />} />
                <Route path="/novedades-editar/:id" element={<NovedadesForm tipo="editar" />} />
                <Route path="/novedades-editar" element={<NovedadesForm tipo="crear" />} />

                <Route path="/usuarios-listado" element={<UsuariosListado />} />
                <Route path="/mis-asistencias" element={<ListadoAsistencias />} />
                <Route path="/cambiar-clave" element={<CambiarClave />} />
                <Route path="/usuarios-alta" element={<AltaUsuario tipo='crear' />} />
                <Route path="/usuarios-modificar/:legajo" element={<AltaUsuario tipo='modificar' />} />


                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default Ruteador