import css from "./Tabela.module.css";
import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ff6c3e",
        color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
    }));

const Tabela = ({products}) => {

    const viewIcon = "https://img.icons8.com/color/20/null/search--v1.png";
    const deletIcon = "https://img.icons8.com/office/20/null/delete-sign.png";

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Número do pedido</StyledTableCell>
                            <StyledTableCell align="center">Valor Total</StyledTableCell>
                            <StyledTableCell align="center">desc</StyledTableCell>
                            <StyledTableCell align="center">Data do pedido</StyledTableCell>
                            <StyledTableCell align="center">Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {products?.length > 0 ?
                        products.map((product) => (
                        <StyledTableRow key={product.id}>
                            <StyledTableCell align="center">{product.name}</StyledTableCell>
                            <StyledTableCell align="center">{product.value}</StyledTableCell>
                            <StyledTableCell align="center">{product.description}</StyledTableCell>
                            <StyledTableCell align="center">{product.createdDate}</StyledTableCell>
                            <StyledTableCell align="center">
                                <img src={viewIcon} alt="visualizar-pedido" />
                            </StyledTableCell>
                        </StyledTableRow>
                    )) :
                        <StyledTableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="left">
                            <h4>Nenhum pedido encontrado</h4></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Tabela;