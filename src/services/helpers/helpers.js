import { db } from "../api/firebaseConfig";

export const verifyExitentClient = (email) => {
    db.collection("client")
    .where("name", "===", email)
    .get()
    .then((res) => {
        if(res.size > 0){
            return true;
        } else {
            return false;
        };
    });
};

export const nameValidate = (name) => {
    if(name.length > 2){
        return true;
    } else return "O nome deve ter mais de 2 caracteres";
};

export const emailValidate = (email) => {
    let regex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    
    if(regex.test(email)){
        return true;
    } else return "Digite um e-mail válido";
};

export const passwordRegisterValidate = (password, clientConfirmPassword) => {
    if(password.length >= 6){
        if(password === clientConfirmPassword){
            return true
        } else return "As senhas devem ser iguais";
    } else return "A senha deve ter pelo menos 6 caracteres";
};

export const passwordLoginValidate = (password) => {
    if(password.length >= 6){
        return true
    } else return "A senha deve ter pelo menos 6 caracteres";
};

export const documentValidate = (document) => {
    if(document > 10){
        return true
    } else return "O documento deve ter pelo menos 11 caracteres";
};

export const logout = () => {
    let permission = localStorage.clear("userType");

    switch (permission){
        case 1:
            localStorage.clear("clientId");
            localStorage.clear("clientName");
            localStorage.clear("userType");
            break
        case 2:
            localStorage.clear("storeId");
            localStorage.clear("storeName");
            localStorage.clear("userType");
            break
        case 3:
            localStorage.clear("clientId");
            localStorage.clear("clientName");
            localStorage.clear("userType");
            break
    }
};
