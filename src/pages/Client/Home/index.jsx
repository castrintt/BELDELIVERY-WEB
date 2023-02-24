import css from "./styled.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop/index";
import Loading from "../../../components/Loading";
import StoreCard from "./components/storeCard";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../services/api/firebaseConfig";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [storeList, setStoreList] = useState([]);

    const getStores = () => {
        setLoading(true);

        db.collection("/store")
        .get()
        .then((res) => {
            if(res.size > 0){
                setStoreList([]);
                res.docs.map(doc => {
                    let way = doc._delegate._document.data.value.mapValue.fields;
                    console.log(way)
                    let store = {
                        id: doc.id,
                        name: way.name.stringValue,
                        category: way.category.stringValue,
                        url: way.urlName.stringValue,
                        img: way.img?.stringValue,
                    };

                    setStoreList(prevStore => [...prevStore, store]);
                });
            };
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        })
    };

    useEffect(() => {
        getStores();
    }, []);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <NavBarLeft />
            <div className={css.container}>
                <div className={css.tittle}>
                    <h2>Lojas</h2>
                </div>
                <article className={css.container_content}>
                    <div className={css.container_products}>
                        {storeList?.length > 0 &&
                            storeList.map(store =>
                                <StoreCard key={store.id} store={store}/>
                            )}
                    </div>
                </article>
            </div>
        </>
    )
}

export default HomePage;