import css from "./styles.module.css";
import { Spinner } from "react-bootstrap";

const Loading = () => {

    return (
        <div className={css.container_loading_component}>
            <Spinner animation="border" variant="info">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading;