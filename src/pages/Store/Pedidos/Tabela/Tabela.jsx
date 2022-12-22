import css from "./Tabela.module.css";
import * as React from "react";
import NavBarTop from "../../../../components/NavBarLoja/NavBarTop";
import NavBarLeft from "../../../../components/NavBarLoja/NavBarLeft/NavBarLeft";
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

const Tabela = ({orders}) => {

  return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Número do pedido</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Valor Total</StyledTableCell>
                        <StyledTableCell align="center">Quantidade de itens</StyledTableCell>
                        <StyledTableCell align="center">Data do pedido</StyledTableCell>
                        <StyledTableCell align="center">Gerenciar</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {orders?.length > 0 ?
                    orders.map((order) => (
                    <StyledTableRow key={order.id}>
                        <StyledTableCell align="center">{order.id}</StyledTableCell>
                        <StyledTableCell align="center">{order.status}</StyledTableCell>
                        <StyledTableCell align="center">{order.totalValue}</StyledTableCell>
                        <StyledTableCell align="center">{order.itens}</StyledTableCell>
                        <StyledTableCell align="center">{order.date}</StyledTableCell>
                        <StyledTableCell align="center">X</StyledTableCell>
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