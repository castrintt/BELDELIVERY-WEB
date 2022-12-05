import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarTop";
import css from "./styled.module.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import { db } from "../../../services/api/firebaseConfig";
import FormPerfilNotEdit from "./FormPerfilNotEdit/FormPerfilNotEdit";
import FormPerfilEdit from "./FormPerfilEdit/FormPerfilEdit";
import Loading from "../../../components/Loading";

const PerfilCliente = () => {
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [userData, setUserData] = useState({});

    const currentUser = getCurrentUser();

    const getUserData = () => {
        setLoading(true);
        db.collection(currentUser.type)
        .doc(currentUser.id)
        .get()
        .then((res) => {
            let dataWay = res._delegate._document.data.value.mapValue.fields;
            setUserData({
                id: res.id,
                name: dataWay.name.stringValue,
                cpf: dataWay.cpf.stringValue,
                email: dataWay.email.stringValue,
                createdDate: dataWay.createdDate.timestampValue,
                orders: dataWay.orders.integerValue,
                cellPhone: dataWay.cellPhone?.stringValue,
            });
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <main className={css.container}>
                {editForm ?
                    <FormPerfilEdit userData={userData} setUserData={setUserData} setEditForm={setEditForm} /> :
                    <FormPerfilNotEdit userData={userData} setEditForm={setEditForm} />
                }
            </main>
        </>
    );
}

export default PerfilCliente;