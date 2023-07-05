import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRequiredRoutes from "./services/auth/auth";
import {
  ClientLazy,
  StoreLazy,
  OthersLazy,
} from "./utils/lazyRoutes/LazyRoutes";
import { Suspense } from "react";

const users = {
  client: "client",
  administrador: "admin",
  store: "store",
};

const RouterList = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<OthersLazy.Login />} />
          <Route path="/cadastro" element={<OthersLazy.Register />} />
          <Route
            path="/cadastro/cliente"
            element={<OthersLazy.RegisterClient />}
          />
          <Route path="/cadastro/loja" element={<OthersLazy.RegisterStore />} />
          <Route
            path="/sem-autorizacao"
            element={<OthersLazy.NotAuthAcess />}
          />

          {/* client private routes */}
          <Route element={<AuthRequiredRoutes required={users.client} />}>
            <Route path="/" element={<ClientLazy.Home />} />
            <Route path="/home" element={<ClientLazy.Home />} />
            <Route path="/perfil" element={<ClientLazy.PerfilClient />} />
            <Route
              path="/perfil/enderecos"
              element={<ClientLazy.PerfilClient />}
            />
            <Route
              path="/perfil/pedidos"
              element={<ClientLazy.OrdersClient />}
            />
            <Route
              path="/perfil/alterar-senha"
              element={<ClientLazy.ChangePasswordClient />}
            />
            <Route path="/lojas" element={<ClientLazy.Home />} />
            <Route path="/lojas/:store" element={<ClientLazy.PerfilStore />} />
            <Route
              path="/descobrir/:category"
              element={<ClientLazy.CategoryClient />}
            />
          </Route>

          {/* store private routes */}
          <Route element={<AuthRequiredRoutes required={users.store} />}>
            <Route path="/gerenciar" element={<StoreLazy.Gerenciar />} />
            <Route
              path="/gerenciar/produtos"
              element={<StoreLazy.Products />}
            />
            <Route
              path="/gerenciar/pedidos"
              element={<StoreLazy.OrdersStore />}
            />
            <Route
              path="/gerenciar/endereco"
              element={<StoreLazy.Gerenciar />}
            />
            <Route
              path="/gerenciar/alterar-senha"
              element={<StoreLazy.ChangePasswordStore />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterList;
