import css from "./StoreForm.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { ToastContainer, toast } from 'react-toastify';

const StoreForm = () => {
    const [ errorMesenge, setErrorMesenge ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ clientConfirmPassword, setClientConfirmPassword ] = useState();
    const [ storeForm, setStoreForm ] = useState({
        name: "",
        email: "",
        password: "",
        document: "",
        urlName: "",
        typeStore: "",
    });
    
    const urlStore = (name) => {
        let url = name.replace(/ /g, "-")
        setStoreForm({...storeForm, urlName: url.toLowerCase()})
    };

    return(
        <>
            {loading && <Loading />}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                theme="dark"
            />
            <main className={css.container_cadastro}>
                <div className={css.card_login}>
                    <h1>Faça seu cadastro</h1>
                    <div className={css.container_form}>
                        <div>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nome da loja"
                                onChange={e => setStoreForm({...storeForm, name: e.target.value})}
                                value={storeForm.name}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="email"
                                placeholder="E-mail"
                                onChange={e => setStoreForm({...storeForm, email: e.target.value})}
                                value={storeForm.email}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Senha"
                                onChange={e => setStoreForm({...storeForm, password: e.target.value})}
                                value={storeForm.password}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirme a senha"
                                onChange={e => setClientConfirmPassword(e.target.value)}
                                value={clientConfirmPassword}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="document"
                                placeholder="CPF/CNPJ"
                                onChange={e => setStoreForm({...storeForm, document: e.target.value})}
                                value={storeForm.document}
                            />
                        </div>
                        <Form.Select size="sm">
                            <option value="" selected disabled>Selecione uma categoria</option>
                            <option value="Lanchonete">Lanchonete</option>
                            <option value="Hamburgueria">Hamburgueria</option>
                            <option value="Bar">Bar</option>
                            <option value="Sorveteria">Sorveteria</option>
                        </Form.Select>
                        </div>
                    <Button variant="primary" className={css.button_container}>
                        Cadastrar
                    </Button>
                </div>
            </main>
        </>
        
    );
};

export default StoreForm;