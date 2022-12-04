import { useNavigate } from "react-router-dom";
import { db } from "../../services/api/firebaseConfig";

export const verifyExitentClient = (email) => {
    let response = true;

    db.collection('client')
    .where('email', '==', email)
    .get()
    .then((res) => {
      switch (res.size){
        case 0:
            response = false;
            break
        default:
            response = true;
            break
      }
    })
    
    return response;
};

export const nameValidate = (name) => {
    let errorStatus = {
        status: false,
        messenge: ""
    } 

    if(name.length > 2){
        errorStatus.status = false;
    } else {
        errorStatus.status = true;
        errorStatus.messenge = "O nome deve conter pelo menos 2 caracteres";
    };

    return errorStatus
};

export const emailValidate = (email) => {
    let errorStatus = {
        status: false,
        messenge: ""
    } 

    let regex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    
    if(regex.test(email)){
        errorStatus.status = false;
    } else {
        errorStatus.status = true;
        errorStatus.messenge = "Digite um email válido";
    };

    return errorStatus
};

export const passwordRegisterValidate = (password) => {
    let errorStatus = {
        status: false,
        messenge: ""
    }

    if(password.length >= 6){
        errorStatus.status = false;
    } else {
        errorStatus.status = true;
        errorStatus.messenge = "A senha deve ter pelo menos 6 caracteres";
    };

    return errorStatus
};

export const passwordRegisterConfirmate = (password, clientConfirmPassword) => {
    let errorStatus = {
        status: false,
        messenge: ""
    };

    if(password === clientConfirmPassword){
        errorStatus.status = false;
    } else {
        errorStatus.status = true;
        errorStatus.messenge = "As senhas não conferem";
    };

    return errorStatus
};

export const passwordLoginValidate = (password) => {
    let errorStatus = {
        status: false,
        messenge: ""
    };

    if(password.length >= 6){
        errorStatus.status = false;
    } else {
        errorStatus.status = true;
        errorStatus.messenge = "A senha deve ter pelo menos 6 caracteres";
    };

    return errorStatus
};

export const documentValidate = (document) => {
    let errorStatus = {
        status: false,
        messenge: ""
    }

    if(document >= 11){
        errorStatus.status = false;
    } else {
        errorStatus.status = true;
        errorStatus.messenge = "O documento deve ter pelo menos 11 caracteres";
    };

    return errorStatus
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
