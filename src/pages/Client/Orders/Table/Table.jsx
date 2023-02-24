import css from "./Table.module.css";
import moment from "moment";import {useState, useEffect} from "react";
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
        backgroundColor: "#BD0117",
        color: theme.palette.common.white,
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

const TableDesktop = ({orders}) => {
    const viewIcon = "https://img.icons8.com/color/20/null/search--v1.png";
    const deletIcon = "https://img.icons8.com/office/20/null/delete-sign.png";

    return (
        <>
            <TableContainer component={Paper} className={css.container_table}>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Loja</StyledTableCell>
                            <StyledTableCell align="center">Valor Total</StyledTableCell>
                            <StyledTableCell align="center">Quantidade de itens</StyledTableCell>
                            <StyledTableCell align="center">Data do pedido</StyledTableCell>
                            <StyledTableCell align="center">Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders?.length > 0 ?
                        orders.map((order) => (
                        <StyledTableRow key={order.id}>
                            <StyledTableCell align="center">{order.status}</StyledTableCell>
                            <StyledTableCell align="center">{order.storeName}</StyledTableCell>
                            <StyledTableCell align="center">{order.totalValue}</StyledTableCell>
                            <StyledTableCell align="center">{order.itemLength}</StyledTableCell>
                            <StyledTableCell align="center">{moment(order.createDate).format("DD/MM/YYYY")}</StyledTableCell>
                            <StyledTableCell align="center">
                                <img src={viewIcon} alt="visualizar-pedido" />
                                <img src={deletIcon} alt="visualizar-pedido" />
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

export default TableDesktop;