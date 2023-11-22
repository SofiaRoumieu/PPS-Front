import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Inicio from '../pages/Inicio';
import Login from '../pages/Login/Login';

import CarrerasListado from '../pages/Carreras/CarrerasListado';
import CarrerasForm from '../pages/Carreras/CarrerasForm';
import CursosListado from '../pages/Cursos/CursosListado';
import CursoForm from '../pages/Cursos/CursoForm';
import Institucional from '../pages/Institucional/Institucional';
import NovedadesListado from '../pages/Novedades/NovedadesListado';
import NovedadesForm from '../pages/Novedades/NovedadesForm';



const Ruteador = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio  />} />
                <Route path="/login" element={<Login />} />
                <Route path="/carreras" element={<CarrerasListado />} />
                <Route path="/carrera-detalle" element={<CarrerasForm />} />
                <Route path="/mis-cursos" element={<CursosListado tipo="misCursos" />} />
                <Route path="/cursos" element={<CursosListado tipo="todos"/>} />
                <Route path="/curso-detalle" element={<CursoForm tipo="verDetalle"/>} />
                <Route path="/curso-detalle/:id" element={<CursoForm tipo="editar"/>} />
                <Route path="/curso-detalle" element={<CursoForm tipo="crear"/>} />
                <Route path="/institucional" element={<Institucional />} />
                <Route path="/novedades" element={<NovedadesListado />} />
                <Route path="/novedades-detalle" element={<NovedadesForm tipo="verDetalle"/>} />
                <Route path="/novedades-editar/:id" element={<NovedadesForm  tipo="editar"/>} />
                <Route path="/novedades-editar" element={<NovedadesForm  tipo="crear"/>} />
               
                

                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default Ruteador