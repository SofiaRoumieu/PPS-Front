const dataTableStyles = {
    rows: {
        style: {
            padding: "0px"
        },
    },
    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: 13,
            textAlign: "center",
            whiteSpace: "initial !important",
            margin:"0px",
            padding:"0px"
        },
    },
    head: {
        style: {
            position:"sticky",
            top:"0px",
            backgroundColor:"white",
            zIndex:"1"
        }
    },
    cells: {
        style: {
            margin:"0px",
            padding:"0px",
            textAlign: "center",
        },
    },
    table: {
		style: {
            minHeight:"300px",
            maxHeight:"450px",
            overflow:"auto"
		},
	},
	tableWrapper: {
		style: {
			display: 'table',
		},
	},
    paginationComponentOptions : {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
      }
};


export default dataTableStyles;