import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import PerfilCliente from "./pages/PerfilCliente";
import PerfilLoja from "./pages/PerfilLoja";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroLoja from "./pages/CadastroLoja";
import OrdersClient from "./pages/OrdersClient";
import Login1 from "./pages/Login";

function RouterList(){
    return(
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/login' element={<Login1 />}/>
          <Route path='/cadastro' element={<Cadastro />}/>
          <Route path='/perfil' element={<PerfilCliente />}/>
          <Route path='/perfil/enderecos' element={<PerfilCliente />}/>
          <Route path='/perfil/pedidos' element={<OrdersClient />}/>
          <Route path='/perfil/alterar-senha' element={<PerfilCliente />}/>
          <Route path='/lojas' element={<PerfilLoja />}/>
          <Route path='/lojas/:store' element={<PerfilLoja />}/>
          <Route path='/lojas/:store/gerenciar-pedidos' element={<PerfilLoja />}/>
          <Route path='/delivery/descobrir/:categoria' element={<HomePage />}/>
        </Routes>
      </Router>
    )
}

export default RouterList;