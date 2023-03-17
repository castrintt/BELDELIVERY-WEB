import { lazy } from "react";
//Client
const Home = lazy(() => import("../../pages/Client/Home"));
const PerfilClient = lazy(() => import("../../pages/Client/Perfil"));
const PerfilStore = lazy(() => import("../../pages/Client/PerfilLoja"));
const OrdersClient = lazy(() => import("../../pages/Client/Orders"));
const CategoryClient = lazy(() => import("../../pages/Client/Category/Category"));
const ChangePasswordClient = lazy(() => import("../../pages/Client/ChangePassword/ChangePassword"));
//Others
const Register = lazy(() => import("../../pages/Cadastro"));
const RegisterClient = lazy(() => import("../../pages/Cadastro/ClientForm"));
const RegisterStore = lazy(() => import("../../pages/Cadastro/StoreForm"));
const NotAuthAcess = lazy(() => import("../../pages/NotAuthAcess/NotAuthAcess"));
const Login = lazy(() => import("../../pages/Login"));
//Store
const Gerenciar = lazy(() => import("../../pages/Store/Gerenciar/Gerenciar"));
const ChangePasswordStore = lazy(() => import("../../pages/Store/AlterarSenha/AlterarSenha"));
const OrdersStore = lazy(() => import("../../pages/Store/Pedidos/Pedidos"));
const Products = lazy(() => import("../../pages/Store/Produtos/Produtos"));

export const OthersLazy = {
    Register,
    RegisterClient,
    RegisterStore,
    NotAuthAcess,
    Login
};
export const ClientLazy = {
    Home,
    PerfilClient,
    PerfilStore,
    OrdersClient,
    ChangePasswordClient,
    CategoryClient
};
export const StoreLazy = {
    Gerenciar,
    ChangePasswordStore,
    OrdersStore,
    Products
};