import css from "./styled.module.css";
import { useState } from "react";
import Loading from "../../components/Loading";
import ClientForm from "./ClientForm/ClientForm";
import StoreForm from "./StoreForm/StoreForm";

const Cadastro = () => {
    const [ typeCadastro, setTypeCadastro ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    return(
        <>
            {loading && <Loading />}
            <main className={css.container_cadastro}>
                {typeCadastro === null ? (
                    <section className={css.container_login}>
                        <div className={css.container_select_type}>
                            <h1>Faça seu cadastro</h1>
                            <p>Escolha o tipo da sua conta:</p>
                            <div>
                                <button onClick={() => setTypeCadastro("Client")}>Cliente</button>
                                <button onClick={() => setTypeCadastro("Store")}>Loja</button>
                            </div>
                        </div>
                    </section>
                ) : 
                <section className={css.container_login}>
                    <div className={css.card_login}>
                        <h1>Faça seu cadastro</h1>
                        {typeCadastro === "Client" && (
                            <ClientForm />
                        )}
                        {typeCadastro === "Store" && (
                            <StoreForm />
                        )}
                    </div>
                </section>
                }
            </main>
        </>
    )
}

export default Cadastro;