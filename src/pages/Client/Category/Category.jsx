import { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import css from "./Category.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import Loading from "../../../components/Loading";
import { db } from "../../../services/api/firebaseConfig";
import StoreCard from "./components/storeCard";

const Category = () => {
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const location = useLocation();
    const {category} = useParams();
    
    const getStore = () => {
        let allStoresByCategory = [];

        db.collection("store")
        .where("category", "==", category)
        .get()
        .then((res) => {
            res.docs.forEach(doc => {
                let dataWay = doc._delegate._document.data.value.mapValue.fields;
                allStoresByCategory.push({
                    id: doc.id,
                    name: dataWay.name.stringValue,
                    category: dataWay.category.stringValue,
                    url: dataWay.urlName.stringValue,
                    img: dataWay.img?.stringValue,
                });
            });
            setStores(allStoresByCategory);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getStore();
    }, [location]);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <NavBarLeft />
            <div className={css.container}>
            <div className={css.tittle}>
                    <h2>{category}</h2>
                </div>
                <article className={css.container_content}>
                    <div className={css.container_products}>
                        {stores?.length > 0 ?
                            stores.map(store =>
                                <StoreCard key={store.id} store={store}/>
                            )
                        : "Nenhuma loja encontrada"}
                    </div>
                </article>
            </div>
        </>
    );
};

export default Category;