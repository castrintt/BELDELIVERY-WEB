import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRequiredRoutes from "./services/auth/auth";

import HomePage from "./pages/Client/Home";
import PerfilCliente from "./pages/Client/Perfil";
import PerfilLoja from "./pages/Client/PerfilLoja";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import CadastroCliente from "./pages/Cadastro/ClientForm/ClientForm";
import CadastroLoja from "./pages/Cadastro/StoreForm/StoreForm";
import OrdersClient from "./pages/Client/Orders";
import NotAuthAcess from "./pages/NotAuthAcess/NotAuthAcess";
import ChangePassword from "./pages/Client/ChangePassword/ChangePassword";
import Gerenciar from "./pages/Store/Gerenciar/Gerenciar";
import AlterarSenha from "./pages/Store/AlterarSenha/AlterarSenha";
import Pedidos from "./pages/Store/Pedidos/Pedidos";
import Produtos from "./pages/Store/Produtos/Produtos";
import Category from "./pages/Client/Category/Category";

const users = {
  client: "client",
  administrador: "admin",
  store: "store"
};

const RouterList = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/cadastro/cliente' element={<CadastroCliente />}/>
        <Route path='/cadastro/loja' element={<CadastroLoja />}/>
        <Route path='/sem-autorizacao' element={<NotAuthAcess />}/>

        {/* client private routes */}
        <Route element={<AuthRequiredRoutes required={users.client} />}>
          <Route path='/' element={<HomePage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/perfil' element={<PerfilCliente />}/>
          <Route path='/perfil/enderecos' element={<PerfilCliente />}/>
          <Route path='/perfil/pedidos' element={<OrdersClient />}/>
          <Route path='/perfil/alterar-senha' element={<ChangePassword />}/>
          <Route path='/lojas' element={<PerfilLoja />}/>
          <Route path='/lojas/:store' element={<PerfilLoja />}/>
          <Route path='/descobrir/:category' element={<Category />}/>
        </Route>

        {/* store private routes */}
        <Route element={<AuthRequiredRoutes required={users.store} />}>
          <Route path='/gerenciar' element={<Gerenciar />}/>
          <Route path='/gerenciar/produtos' element={<Produtos />}/>
          <Route path='/gerenciar/pedidos' element={<Pedidos />}/>
          <Route path='/gerenciar/endereco' element={<Gerenciar />}/>
          <Route path='/gerenciar/alterar-senha' element={<AlterarSenha />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterList;