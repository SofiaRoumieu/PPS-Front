const carreras= [{
    "idFacultad": 1,
    "nombreFacultad": "Tecnicaturas Universitarias",
    "carreras":[
        {
            "idCarrera": 1,
            "nombreCarrera": "Tecnicatura Universitaria en Programación",
            "cantidadMaterias": 21,
            "cantidadcuatrimestres": 4,
            "materias": [
                {
                    "idMateria": 1,
                    "cuatrimestre": 1,
                    "nombreMateria": "Matemática",
                    "cargaHorariaSemanal": 9,
                    "correlativas": []
                },
                {
                    "idMateria": 2,
                    "cuatrimestre": 1,
                    "nombreMateria": "Inglés I",
                    "cargaHorariaSemanal": 3,
                    "correlativas": []
                },
                {
                    "idMateria": 3,
                    "cuatrimestre": 1,
                    "nombreMateria": "Sistema de Procesamiento de Datos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 4,
                    "cuatrimestre": 1,
                    "nombreMateria": "Laboratirio I",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 5,
                    "cuatrimestre": 1,
                    "nombreMateria": "Programación I",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 6,
                    "cuatrimestre": 2,
                    "nombreMateria": "Estadística",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1] 
                },
                {
                    "idMateria": 7,
                    "cuatrimestre": 2,
                    "nombreMateria": "Inglés II",
                    "cargaHorariaSemanal": 3,
                    "correlativas": [2]
                },
                {
                    "idMateria": 8,
                    "cuatrimestre": 2,
                    "nombreMateria": "Arquitectura y Sistemas Operativos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [3]
                },
                {
                    "idMateria": 9,
                    "cuatrimestre": 2,
                    "nombreMateria": "Laboratirio II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5] 
                },
                {
                    "idMateria": 10,
                    "cuatrimestre": 2,
                    "nombreMateria": "Programación II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4, 5] 
                },
                {
                    "idMateria": 11,
                    "cuatrimestre": 2,
                    "nombreMateria": "Metodología de la investigación",
                    "cargaHorariaSemanal": 3,
                    "correlativas": [] 
                },
                {
                    "idMateria": 12,
                    "cuatrimestre": 3,
                    "nombreMateria": "Organización contable de la empresa",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1,6]
                },
                {
                    "idMateria": 13,
                    "cuatrimestre": 3,
                    "nombreMateria": "Organización empresarial",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 14,
                    "cuatrimestre": 3,
                    "nombreMateria": "Elementos de investigación operativa",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1,6]
                },
                {
                    "idMateria": 15,
                    "cuatrimestre": 3,
                    "nombreMateria": "Laboratorio III",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10] 
                },
                {
                    "idMateria": 16,
                    "cuatrimestre": 3,
                    "nombreMateria": "Pogramación III",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10]
                },
                {
                    "idMateria": 17,
                    "cuatrimestre": 4,
                    "nombreMateria": "Metodología de sistemas I",
                    "cargaHorariaSemanal": 12,
                    "correlativas": []
                },
                {
                    "idMateria": 18,
                    "cuatrimestre": 4,
                    "nombreMateria": "Diseño y administración de base de datos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 19,
                    "cuatrimestre": 4,
                    "nombreMateria": "Legislación",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 20,
                    "cuatrimestre": 4,
                    "nombreMateria": "Laboratorio IV",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 21,
                    "cuatrimestre": 4,
                    "nombreMateria": "Practica profesional supervisada",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10,15,16]
                }
            ]
        },
        {
            "idCarrera": 2,
            "nombreCarrera": "Tecnicatura Universitaria en Sistemas Informáticos",
            "cantidadMaterias": 35,
            "cantidadcuatrimestres": 2,
            "materias": [
                {
                    "idMateria": 1,
                    "cuatrimestre": 1,
                    "nombreMateria": "Matemática",
                    "cargaHorariaSemanal": 9,
                    "correlativas": []
                },
                {
                    "idMateria": 2,
                    "cuatrimestre": 1,
                    "nombreMateria": "Inglés I",
                    "cargaHorariaSemanal": 3,
                    "correlativas": []
                },
                {
                    "idMateria": 3,
                    "cuatrimestre": 1,
                    "nombreMateria": "Sistema de Procesamiento de Datos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 4,
                    "cuatrimestre": 1,
                    "nombreMateria": "Laboratirio I",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 5,
                    "cuatrimestre": 1,
                    "nombreMateria": "Programación I",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 6,
                    "cuatrimestre": 2,
                    "nombreMateria": "Estadística",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1]
                },
                {
                    "idMateria": 7,
                    "cuatrimestre": 2,
                    "nombreMateria": "Inglés II",
                    "cargaHorariaSemanal": 3,
                    "correlativas": [2]
                },
                {
                    "idMateria": 8,
                    "cuatrimestre": 2,
                    "nombreMateria": "Arquitectura y Sistemas Operativos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [3]
                },
                {
                    "idMateria": 9,
                    "cuatrimestre": 2,
                    "nombreMateria": "Laboratirio II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5]
                },
                {
                    "idMateria": 10,
                    "cuatrimestre": 2,
                    "nombreMateria": "Programación II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4, 5]
                },
                {
                    "idMateria": 11,
                    "cuatrimestre": 2,
                    "nombreMateria": "Metodología de la investigación",
                    "cargaHorariaSemanal": 3,
                    "correlativas": []
                },
                {
                    "idMateria": 12,
                    "cuatrimestre": 3,
                    "nombreMateria": "Organización contable de la empresa",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1,6]
                },
                {
                    "idMateria": 13,
                    "cuatrimestre": 3,
                    "nombreMateria": "Organización empresarial",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 14,
                    "cuatrimestre": 3,
                    "nombreMateria": "Elementos de investigación operativa",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1,6]
                },
                {
                    "idMateria": 15,
                    "cuatrimestre": 3,
                    "nombreMateria": "Laboratorio III",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10]
                },
                {
                    "idMateria": 16,
                    "cuatrimestre": 3,
                    "nombreMateria": "Pogramación III",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10]
                },
                {
                    "idMateria": 17,
                    "cuatrimestre": 4,
                    "nombreMateria": "Metodología de sistemas I",
                    "cargaHorariaSemanal": 12,
                    "correlativas": []
                },
                {
                    "idMateria": 18,
                    "cuatrimestre": 4,
                    "nombreMateria": "Diseño y administración de base de datos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 19,
                    "cuatrimestre": 4,
                    "nombreMateria": "Legislación",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 20,
                    "cuatrimestre": 4,
                    "nombreMateria": "Laboratorio IV",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 21,
                    "cuatrimestre": 4,
                    "nombreMateria": "Practica profesional supervisada",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10,15,16]
                },
                {
                    "idMateria": 22,
                    "cuatrimestre": 5,
                    "nombreMateria": "Matemática II",
                    "cargaHorariaSemanal": 3,
                    "correlativas": [1, 6]
                },
                {
                    "idMateria": 23,
                    "cuatrimestre": 5,
                    "nombreMateria": "Ingles técnico avanzado I",
                    "cargaHorariaSemanal": 3,
                    "correlativas": [2, 7]
                },
                {
                    "idMateria": 24,
                    "cuatrimestre": 5,
                    "nombreMateria": "Metodología de sistemas II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 25,
                    "cuatrimestre": 5,
                    "nombreMateria": "Bases de datos II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 26,
                    "cuatrimestre": 5,
                    "nombreMateria": "Redes",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 27,
                    "cuatrimestre": 5,
                    "nombreMateria": "Programación avanzada I",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10]
                },
                {
                    "idMateria": 28,
                    "cuatrimestre": 5,
                    "nombreMateria": "Laboratorio V",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10]
                },
                {
                    "idMateria": 29,
                    "cuatrimestre": 6,
                    "nombreMateria": "Matemática III",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [1, 6, 22]
                },
                {
                    "idMateria": 30,
                    "cuatrimestre": 6,
                    "nombreMateria": "Ingles técnico avanzado II",
                    "cargaHorariaSemanal": 3,
                    "correlativas": [2, 7, 23]
                },
                {
                    "idMateria": 31,
                    "cuatrimestre": 6,
                    "nombreMateria": "Investigación operativa II",
                    "cargaHorariaSemanal": 3,
                    "correlativas": []
                },
                {
                    "idMateria": 32,
                    "cuatrimestre": 2,
                    "nombreMateria": "Programación avanzada II",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [4,5,9,10, 27,28]
                },
                {
                    "idMateria": 33,
                    "cuatrimestre": 2,
                    "nombreMateria": "Metodología de sistemas III",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [24]
                },
                {
                    "idMateria": 34,
                    "cuatrimestre": 2,
                    "nombreMateria": "Administración y dirección de proyectos",
                    "cargaHorariaSemanal": 6,
                    "correlativas": []
                },
                {
                    "idMateria": 35,
                    "cuatrimestre": 2,
                    "nombreMateria": "Seminario",
                    "cargaHorariaSemanal": 6,
                    "correlativas": [24]
                }
            ]
        },
        {
            "idCarrera": 3,
            "nombreCarrera": "Tecnicatura Universitaria en Ciudades inteligentes",
            "cantidadMaterias": 20,
            "cantidadcuatrimestres": 4,
            "materias": []
        },
        {
            "idCarrera": 4,
            "nombreCarrera": "Tecnicatura Universitaria en Tecnologías de la información",
            "cantidadMaterias": 20,
            "cantidadcuatrimestres": 4,
            "materias": []
        }
    ]
},
{
    "idFacultad": 2,
    "nombreFacultad": "Ingenierías",
    "carreras":[
        {
            "idCarrera": 5,
            "nombreCarrera": "Ingeniería civil",
            "cantidadMaterias": 20,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 6,
            "nombreCarrera": "Ingeniería eléctrica",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 7,
            "nombreCarrera": "Ingeniería electrónica",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 8,
            "nombreCarrera": "Ingeniería industrial",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 7,
            "nombreCarrera": "Ingeniería mecánica",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        }
    ]
},
{
    "idFacultad": 3,
    "nombreFacultad": "Licenciaturas",
    "carreras":[
        {
            "idCarrera": 10,
            "nombreCarrera": "Licenciatura en la enseñanza de la física",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 11,
            "nombreCarrera": "Licenciatura en la enseñanza de la matemática",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 12,
            "nombreCarrera": "Licenciatura en la enseñanza de la química",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        },
        {
            "idCarrera": 13,
            "nombreCarrera": "Licenciatura en la enseñanza de la lengua inglesa",
            "cantidadMaterias": 40,
            "cantidadcuatrimestres": 10,
            "materias": []
        }
    ]
}
];


export default carreras;