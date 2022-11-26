import css from "./ClientForm.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ClientForm = () => {
    const [ errorMesenge, setErrorMesenge ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ clientConfirmPassword, setClientConfirmPassword ] = useState();

    const [ clientForm, setClientForm ] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    return(
        <>
        <section className={css.container_cadastro}>
            <div className={css.card_login}>
                <h1>Faça seu cadastro</h1>
                <div className={css.container_form}>
                    <div className={css.input_group}>
                        <input 
                            type="text"
                            id="nameclient"
                            placeholder="Nome"
                            onChange={e => setClientForm({...clientForm, name: e.target.value})}
                            value={clientForm.name}
                        />
                    </div>
                    <div className={css.input_group}>
                        <input 
                            type="email"
                            id="emailclient"
                            placeholder="E-mail"
                            onChange={e => setClientForm({...clientForm, email: e.target.value})}
                            value={clientForm.email}
                        />
                    </div>
                    <div className={css.input_group}>
                        <input
                            type="password"
                            id="passwordclient"
                            placeholder="Crie uma senha"
                            onChange={e => setClientForm({...clientForm, password: e.target.value})}
                            value={clientForm.password}
                        />
                    </div>
                    <div className={css.input_group}>
                        <input 
                            type="password"
                            id="confirmpasswordclient"
                            placeholder="Confirme a senha"
                            onChange={e => setClientConfirmPassword(e.target.value)}
                            value={clientConfirmPassword}
                        />
                    </div>
                </div>
                <Button variant="primary" className={css.button}>Cadastrar</Button>
            </div>
        </section>
            
        </>
    )
}

export default ClientForm;