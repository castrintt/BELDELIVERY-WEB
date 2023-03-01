import css from "./Tabela.module.css";
import moment from "moment";

const Tabela = ({products}) => {
    const viewIcon = "https://img.icons8.com/color/20/null/search--v1.png";
    const deletIcon = "https://img.icons8.com/office/20/null/delete-sign.png";

    const shortNameForView = (name) => {
        if(name.length > 25){
            return name.slice(0, 25) + "...";
        } else return name;
    };

    // const ValueFormated = (value) => {
    //     if(value.length > 5){
    //         return value.slice(0, 3) + "," + value.slice(3, 5);
    //     } else if(value.length === 4){
    //         return value.slice(0, 2) + "," + value.slice(2, 4)
    //     } else if(value.length === 3){
    //         return value.slice(0, 2) + "," + value.slice(2, 3)
    //     } else if(value.length === 4){
    //         return value.slice(0, 2) + "," + value.slice(2, 4)
    //     };
    // };

    return (
        <>
            <div className={css.container_table}>
                <div className={css.card_title_table}>
                    <p>sfafasfasf</p>
                    <p>sfafasfasf</p>
                    <p>sfafasfasf</p>
                    <p>sfafasfasf</p>
                    <p>Ações</p>
                </div>
                <div className={css.card_content_table}>
                    {!!products ?
                        products.map(product => (
                            <div key={product.id}>
                                <p>{shortNameForView(product.name)}</p>
                                <p>{product.value}</p>
                                <p>{shortNameForView(product.description)}</p>
                                <p>{moment(product.createdDate).format('DD/MM/YYYY')}</p>
                                <p>X</p>
                            </div>
                        ))
                            : <div className={css.not_found}>Nenhum produto cadastrado</div>
                        }
                </div>
            </div>
        </>
    );
};

export default Tabela;