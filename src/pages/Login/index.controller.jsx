import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../../config/api/firebaseConfig";
import {
  callToast,
  emailValidate,
  passwordLoginValidate,
} from "../../utils/helpers/helpers";
import { toast } from "react-toastify";

const UseLoginController = () => {
  const [loginType, setLoginType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState({
    email: false,
    password: false,
  });
  const [errorStatus, setErrorStatus] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setLocalStorageItems = (response) => {
    const pathValue =
      response.docs[0]._delegate._document.data.value.mapValue.fields;
    localStorage.setItem("id", response.docs[0].id);
    localStorage.setItem("name", pathValue.name.stringValue);
    localStorage.setItem("userType", "store");
  };

  const DataVerify = (e) => {
    e.preventDefault();
    const emailIsValid = emailValidate(formData.email);
    const passwordIsValid = passwordLoginValidate(formData.password);
    setCustomError({
      email: emailIsValid.status,
      password: passwordIsValid.status,
    });
    if (!emailIsValid.status && !passwordIsValid.errorStatus) {
      setErrorStatus(false);
      newAuthUser();
    } else {
      if (emailIsValid.status === true) {
        callToast(emailIsValid.messenge, "error");
      }
      if (passwordIsValid.status === true) {
        callToast(passwordIsValid.messenge, "error");
      }
    }
  };

  const getDataClient = async () => {
    setLoading(true);
    await db
      .collection("client")
      .where("email", "==", formData.email)
      .get()
      .then((response) => {
        if (response.size > 0) {
          setLocalStorageItems(response);
          callToast("Logado com sucesso", "success");
          navigate("/home");
        } else {
          setErrorStatus(true);
          callToast("Usuário não encontrado", "warning");
        }
      })
      .catch(() => {
        setErrorStatus(true);
      })
      .finally(() => setLoading(false));
  };

  const getDataStore = async () => {
    setLoading(true);
    await db
      .collection("store")
      .where("email", "==", formData.email)
      .get()
      .then((response) => {
        if (response.size > 0) {
          setLocalStorageItems(response);
          callToast("Logado com sucesso", "success");
          navigate("/gerenciar");
        } else {
          setErrorStatus(true);
          callToast("Loja não encontrado", "error");
        }
      })
      .catch(() => {
        setErrorStatus(true);
      })
      .finally(() => setLoading(false));
  };

  const newAuthUser = async () => {
    await auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        if (loginType === 1) {
          return getDataClient();
        }
        return getDataStore();
      })
      .catch((error) => {
        toast.error("Usuário não encontrado");
      });
  };

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClickSelectLoginType = () => {
    if (loginType === 1) {
      setLoginType(2);
    } else {
      setLoginType(1);
    }
  };

  return {
    Actions: {
      onVerifyData: DataVerify,
      retrieveClientData: getDataClient,
      retrieveStoreData: getDataStore,
      onNavigate: navigate,
      onChange: handleChangeInputs,
      onChangeLoginType: onClickSelectLoginType,
    },
    States: {
      loginType,
      loading,
      error: {
        customError,
        errorStatus,
      },
      formData,
    },
  };
};

export default UseLoginController;
