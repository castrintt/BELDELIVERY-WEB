import css from "./Produtos.module.css";
import NavBarTop from "../../../components/NavBarLoja/NavBarTop";
import NavBarLeft from "../../../components/NavBarLoja/NavBarLeft/NavBarLeft";
import Tabela from "./Tabela/Tabela";
import { useState } from "react";
import ModalAddProduto from "./ModalAddProduto/ModalAddProduto";
import { getCurrentUser } from "../../../utils/helpers/helpers";
import { db } from "../../../config/api/firebaseConfig";
import { useEffect } from "react";
import Loading from "../../../components/Loading";

const Produtos = () => {
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const currentUser = getCurrentUser();

    const getAllProducts = () => {
        setLoading(true);
        let allProducts = [];
        
        db.collection("products")
        .where("idStore", "==" , currentUser.id)
        .get()
        .then((res) => {
            if(res.size > 0){
                res.docs.map(doc => {
                    let way = doc._delegate._document.data.value.mapValue.fields;
                    console.log(res)
                    allProducts.push({
                        id: doc.id,
                        name: way.name.stringValue,
                        value: way.value.stringValue,
                        idStore: way.idStore.stringValue,
                        description: way.description.stringValue,
                        createdDate: way.createdDate.timestampValue,
                    });
                });
            };
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        })
        .finally(() => {
            setProducts(allProducts);
        })
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return(
        <>
            <NavBarTop />
            <NavBarLeft />
            {loading && <Loading />}
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Meus Produtos</h2>
                </div>
                <div className={css.button_container}>
                    <button onClick={() => setOpenModalAdd(true)}>
                        ADICIONAR PRODUTO
                    </button>
                </div>
                <article className={css.container_form}>
                    <Tabela products={products}/>
                </article>
            </main>

            <ModalAddProduto
                openModalAdd={openModalAdd}
                setOpenModalAdd={setOpenModalAdd}
                getAllProducts={getAllProducts}
            />
        </>
    );
};

export default Produtos;