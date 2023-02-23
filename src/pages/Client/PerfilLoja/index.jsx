import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import css from "./styled.module.css";
import { useState, useEffect } from "react";
import { db } from "../../../services/api/firebaseConfig";
import Loading from "../../../components/Loading";
import Card from "./components/Card/Card";

const PerfilLoja = () => {
    const [loading, setLoading] = useState(false);
    const [store, setStore] = useState({});

    const getStore = () => {
        const pathSegments = window.location.pathname.split("/");
        const storeName = pathSegments[pathSegments.length - 1];

        db.collection("store")
        .where("urlName", "==", storeName)
        .get()
        .then((res) => {
            let dataWay = res.docs[0]._delegate._document.data.value.mapValue.fields;
            setStore({
                id: res.docs[0].id,
                name: dataWay.name.stringValue,
                img: dataWay.img.stringValue,
                category: dataWay.category.stringValue,
                cellPhone: dataWay.cellPhone.stringValue,
            });
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getStore();
    }, []);

    return(
        <>
            <NavBarTop />
            <NavBarLeft />
            {loading && <Loading />}
            <div className={css.container}>
                <div className={css.tittle}>
                    <span className={css.image_container}>
                        <img src={store.img} alt="imagem loja" />
                    </span>
                    <div>
                        <h2>{store.name}</h2>
                        <p>{store.category}</p>
                        <p>{store.cellPhone}</p>
                    </div>
                </div>
                <article className={css.container_content}>
                    <div className={css.sub_tittle}>
                        <h3>Produtos</h3>
                    </div>
                    <div className={css.container_products}>
                        <Card />
                    </div>
                </article>
            </div>
        </>
    )
};

export default PerfilLoja;