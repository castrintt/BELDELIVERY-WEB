import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import css from "./styled.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../services/api/firebaseConfig";
import Loading from "../../../components/Loading";
import Card from "./components/Card/Card";

const PerfilLoja = () => {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState({});
    const [products, setProducts] = useState([]);
    const {store} = useParams();

    const getStore = () => {
        setLoading(true);

        db.collection("store")
        .where("urlName", "==", store)
        .get()
        .then((res) => {
            let dataWay = res.docs[0]._delegate._document.data.value.mapValue.fields;
            setStoreData({
                id: res.docs[0].id,
                name: dataWay.name.stringValue,
                img: dataWay.img.stringValue,
                category: dataWay.category.stringValue,
                cellPhone: dataWay.cellPhone.stringValue,
            });
            getProducts(res.docs[0].id);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    const getProducts = (id) => {
        setLoading(true);

        let allProducts = [];

        db.collection("products")
        .where("idStore", "==", id)
        .get()
        .then((res) => {
            res.docs.forEach(doc => {
                let dataWay = doc._delegate._document.data.value.mapValue.fields;
                allProducts.push({
                    id: doc.id,
                    name: dataWay.name.stringValue,
                    img: dataWay.img.stringValue,
                    value: dataWay.value.stringValue,
                    description: dataWay.description.stringValue,
                    createdDate: dataWay.createdDate.timestampValue
                });
            });
            setProducts(allProducts);
            setLoading(false);
        })
        .catch(error => {
            // console.log(error);
            setLoading(false);
        })
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
                        <img src={storeData.img} alt="imagem loja" />
                    </span>
                    <div>
                        <h2>{storeData.name}</h2>
                        <p>{storeData.category}</p>
                        <p>{storeData.cellPhone}</p>
                    </div>
                </div>
                <article className={css.container_content}>
                    <div className={css.sub_tittle}>
                        <h3>Produtos</h3>
                    </div>
                    <div className={css.container_products}>
                        {products?.length ? 
                        products?.map(product => (
                            <Card key={product.id} product={product}/>
                        )) : 
                        "Sem produtos"}
                    </div>
                </article>
            </div>
        </>
    )
};

export default PerfilLoja;