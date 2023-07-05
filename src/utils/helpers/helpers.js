import { db } from "../../config/api/firebaseConfig";
import { toast } from "react-toastify";

export const verifyExistentClient = (email) => {
  let response = true;

  db.collection("client")
    .where("email", "==", email)
    .get()
    .then((res) => {
      switch (res.size) {
        case 0:
          response = false;
          break;
        default:
          response = true;
          break;
      }
    });

  return response;
};

export const nameValidate = (name) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };

  if (name.length > 2) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "O nome deve conter pelo menos 2 caracteres";
  }

  return errorStatus;
};

export const emailValidate = (email) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };
  let emailRegex =
    /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
  if (emailRegex.test(email)) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "Digite um email válido";
  }
  return errorStatus;
};

export const passwordRegisterValidate = (password) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };

  if (password.length >= 6) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "A senha deve ter pelo menos 6 caracteres";
  }

  return errorStatus;
};

export const passwordRegisterConfirmation = (
  password,
  clientConfirmPassword
) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };

  if (password === clientConfirmPassword) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "As senhas não conferem";
  }

  return errorStatus;
};

export const passwordLoginValidate = (password) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };

  if (password.length >= 6) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "A senha deve ter pelo menos 6 caracteres";
  }

  return errorStatus;
};

export const documentValidate = (document) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };

  if (document >= 11) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "O documento deve ter pelo menos 11 caracteres";
  }

  return errorStatus;
};

export const cellValidate = (cell) => {
  let errorStatus = {
    status: false,
    messenge: "",
  };

  if (cell >= 9) {
    errorStatus.status = false;
  } else {
    errorStatus.status = true;
    errorStatus.messenge = "O número deve ter pelo menos 9 caracteres";
  }

  return errorStatus;
};

export const getCurrentUser = () => {
  const user = {
    type: localStorage.getItem("userType"),
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
  };

  return user;
};

export const Logout = () => {
  localStorage.clear("name");
  localStorage.clear("id");
  localStorage.clear("userType");

  window.location.replace("/login");
};

export const callToast = (message, status) => {
  return toast[status](message);
};

export const icons = {
  openNavBar: "https://img.icons8.com/ios-filled/000000/menu--v1.png",
  home: "https://img.icons8.com/material-rounded/35/null/home-page.png",
  perfil: "https://img.icons8.com/small/35/000000/user-male-circle.png",
  order: "https://img.icons8.com/sf-ultralight/35/null/mobile-order.png",
  address: "https://img.icons8.com/ios/35/null/order-delivered.png",
  changePassword: "https://img.icons8.com/ios/30/null/private-lock.png",
  logout: "https://img.icons8.com/windows/40/null/exit.png",
};
