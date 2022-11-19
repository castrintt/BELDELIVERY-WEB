import { useNavigate } from "react-router-dom";
import css from "./styled.module.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

const Cadastro = () => {
    const [ typeCadastro, setTypeCadastro ] = useState(null);
    const [ errorMesenge, setErrorMesenge ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ clientConfirmPassword, setClientConfirmPassword ] = useState();

    const [ clientForm, setClientForm ] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [ storeForm, setStoreForm ] = useState({
        name: "",
        email: "",
        password: "",
        document: "",
        urlName: "",
        typeStore: "",
    });

    const navigate = useNavigate();

    const typeCadastroOption = [
        "Client",
        "Store"
    ];

    const postFormClient = () => {
        let name = validateName(clientForm.name);
        let email = validateEmail(clientForm.email);
        let password = validatePassword(clientForm.password);

        if(name === true){
            if(email === true){
                if(password === true){
                    createClient();
                    setErrorMesenge(null);
                } else {setErrorMesenge(password);;};
            } else {setErrorMesenge(email); ;};
        } else {setErrorMesenge(name); };
    };
    
    const postFormStore = () => {
        let name = validateName(storeForm.name);
        let email = validateEmail(storeForm.email);
        let password = validatePassword(storeForm.password);
        let document = validateDocument(storeForm.document);
        urlStore(storeForm.name);

        if(name === true){
            if(email === true){
                if(password === true){
                    if(document === true){
                       if(storeForm.typeStore.length > 0){
                            createStore();
                            setErrorMesenge(null);
                       } else setErrorMesenge("Selecione uma categoria");
                    } else setErrorMesenge(document);
                } else setErrorMesenge(password);
            } else setErrorMesenge(email);
        } else setErrorMesenge(name);
    };

    const validateName = (name) => {
        if(name.length > 2){
            return true;
        } else return "O nome deve ter mais de 2 caracteres";
    };

    const validateEmail = (email) => {
        let regex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
        
        if(regex.test(email)){
            return true;
        } else return "Digite um e-mail válido"
    };

    const validatePassword = (password) => {
        if(password.length >= 6){
            if(password === clientConfirmPassword){
                return true
            } return "As senhas devem ser iguais";
        } else return "A senha deve ter pelo menos 6 caracteres";
    };
    
    const validateDocument = (document) => {
        if(document > 10){
            return true
        } else return "O documento deve ter pelo menos 11 caracteres";
    };

    const urlStore = (name) => {
        let url = name.replace(/ /g, "-")
        setStoreForm({...storeForm, urlName: url.toLowerCase()})
    };

    const createClient = () => {
        axios.post("https://localhost:7221/api/Client/create", clientForm)
        .then((res) => {
            setClientForm({...clientForm,
                name: "",
                email: "",
                password: ""
            })
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate("/login")
            }, "1000");
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    const createStore = () => {
        axios.post("https://localhost:7221/api/Store/create", storeForm)
        .then((res) => {
            setClientForm({...storeForm,
                name: "",
                email: "",
                password: "",
                document: ""
            })
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate("/login")
            }, "1000");
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return(
        <>
            {loading && <Loading />}
            {typeCadastro == null ? (
                <section className={css.container_login}>
                    <div className={css.container_select_type}>
                        <h1>Faça seu cadastro</h1>
                        <p>Escolha o tipo da sua conta:</p>
                        <div>
                            <button onClick={() => setTypeCadastro(typeCadastroOption[0])}>Cliente</button>
                            <button onClick={() => setTypeCadastro(typeCadastroOption[1])}>Loja</button>
                        </div>
                    </div>
                </section>
            ) : (
            <section className={css.container_login}>
                <div className={css.card_login}>
                    <h1>Faça seu cadastro</h1>
                    {typeCadastro === "Client" && (
                        <div className={css.container_form}>
                            <div>
                                <label htmlFor="nameclient">Nome:</label>
                                <input 
                                    type="text"
                                    id="nameclient"
                                    onChange={e => setClientForm({...clientForm, name: e.target.value})}
                                    value={clientForm.name}
                                />
                            </div>

                            <div>
                                <label htmlFor="emailclient">Email:</label>
                                <input 
                                    type="email"
                                    id="emailclient"
                                    onChange={e => setClientForm({...clientForm, email: e.target.value})}
                                    value={clientForm.email}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="passwordclient">Senha:</label>
                                <input
                                    type="password"
                                    id="passwordclient"
                                    onChange={e => setClientForm({...clientForm, password: e.target.value})}
                                    value={clientForm.password}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmpasswordclient">Confirme a senha:</label>
                                <input 
                                    type="password"
                                    id="confirmpasswordclient"
                                    onChange={e => setClientConfirmPassword(e.target.value)}
                                    value={clientConfirmPassword}
                                />
                            </div>
                        </div>
                    )}

                    {typeCadastro === "Store" && (
                        <div className={css.container_form}>
                            <div>
                                <label htmlFor="name">Nome da loja:</label>
                                <input 
                                    type="text"
                                    id="name"
                                    onChange={e => setStoreForm({...storeForm, name: e.target.value})}
                                    value={storeForm.name}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="text"
                                    id="email"
                                    onChange={e => setStoreForm({...storeForm, email: e.target.value})}
                                    value={storeForm.email}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password">Senha:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={e => setStoreForm({...storeForm, password: e.target.value})}
                                    value={storeForm.password}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm-password">Confirme a senha:</label>
                                <input 
                                    type="password"
                                    id="confirm-password"
                                    onChange={e => setClientConfirmPassword(e.target.value)}
                                    value={clientConfirmPassword}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="document">CPF/CNPJ:</label>
                                <input 
                                    type="text"
                                    id="document"
                                    onChange={e => setStoreForm({...storeForm, document: e.target.value})}
                                    value={storeForm.document}
                                />
                            </div>

                            <div>
                                <label htmlFor="document">Categoria da loja:</label>
                                <select
                                    name="document"
                                    id="document"
                                    className={css.select_input}
                                    onChange={e => setStoreForm({...storeForm, typeStore: e.target.value})}
                                >
                                    <option value="" selected disabled>Selecione</option>
                                    <option value="Lanchonete">Lanchonete</option>
                                    <option value="Hamburgueria">Hamburgueria</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Sorveteria">Sorveteria</option>
                                </select>
                            </div>
                        </div>
                    )}

                   {errorMesenge !== null && (
                    <div className={css.error_mesenge_form}>
                        <span>{errorMesenge}</span>
                    </div>
                   )}
                    <div>
                        <Button onClick={() => typeCadastro === "Client" ? postFormClient() : postFormStore()} variant="primary">Cadastrar</Button>
                    </div>
                </div>
            </section>
        )}
        </>
    )
}

export default Cadastro;