import { db } from "../../../config/api/firebaseConfig";
import {
  passwordRegisterValidate,
  getCurrentUser,
  callToast,
} from "../../../utils/helpers/helpers";
import { useState } from "react";

const UseChangePasswordController = () => {
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [customError, setCustomError] = useState({
    oldPassword: "",
    newPassword: null,
  });
  const currentUser = getCurrentUser();

  const updateUserPassword = async () => {
    setLoading(true);
    await db
      .collection("client")
      .doc(currentUser.id)
      .update({
        password: dataForm.newPassword,
      })
      .then(() => {
        callToast("Senha alterada com sucesso!", "success");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const checkOldPassword = async () => {
    setLoading(true);
    await db
      .collection("client")
      .where("password", "==", dataForm.oldPassword)
      .where("name", "==", currentUser.name)
      .get()
      .then((res) => {
        if (res.size > 0) {
          updateUserPassword();
        } else {
          setCustomError({
            oldPassword: "Senha incorreta",
            newPassword: null,
          });
          cleanDataForm();
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const cleanDataForm = () => {
    setDataForm({
      oldPassword: "",
      newPassword: "",
    });
  };

  const checkDataForm = () => {
    const password = passwordRegisterValidate(dataForm.newPassword);
    setCustomError({
      oldPassword: "",
      newPassword: password,
    });
    if (!password.status) {
      checkOldPassword();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  return {
    Actions: {
      onCheckData: checkDataForm,
      onChange: handleChange,
    },
    States: {
      loading,
      dataForm,
      customError,
    },
  };
};

export default UseChangePasswordController;
