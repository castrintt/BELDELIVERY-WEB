import * as React from "react";
import css from "./ModalAddProduto.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { db } from "../../../../services/api/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "../../../../components/Loading";
import { getCurrentUser } from "../../../../utilites/helpers/helpers";
import firebase from "firebase/app";
import "firebase/storage";

export default function ModalAddProduto({openModalAdd, setOpenModalAdd, getAllProducts}) {
    const [fileImg, setFileImg] = React.useState(null);
    const [dataForm, setDataForm] = React.useState({
        name: null,
        description: null,
        value: null,
    });
    const [loading, setLoading] = React.useState(false);

    const currentUser = getCurrentUser();
    const storageRef = firebase.storage().ref();

    const handleClose = () => {
        setOpenModalAdd(false);
    };
    
    const addProduct = () => {
        setLoading(true);

        db.collection("products").add({
            idStore: currentUser.id,
            createdDate: new Date(),
            description: dataForm.description,
            name: dataForm.name,
            value: dataForm.value,
        })
        .then((res) => {
            setLoading(false);
            handleImg(res.id)
            toast.success("Produto cadastrado com sucesso!");
            setTimeout(() => {
                cleanDataForm();
            }, 50);
            setOpenModalAdd(false);
            getAllProducts();
        })
        .catch((error) => {
            setLoading(false);
            console.log(error)
        });
    };

    const checkDataForm = () => {
        
        if(!dataForm.name || dataForm?.name.length <= 1){
            toast.error("O nome precisa conter mais de 1 caractere");
            return;
        }
        if(!dataForm.value || dataForm?.value.length <= 1){
            toast.error("Digite um valor para o produto");
            return;
        }
        if(!dataForm.description || dataForm?.description.length <= 1){
            toast.error("Digite uma descrição para o produto");
            return;
        }
        if(!fileImg){
            toast.error("Insira uma imagem para o produto");
            return;
        }

        addProduct();
    };

    const cleanDataForm = () => {
        setDataForm({
            name: null,
            description: null,
            value: null,
        });
        setFileImg(null);
    };

    const handleImg = (product) => {
        if(!fileImg) return;

        const uploadTask =  storageRef.child("products/" + product).put(fileImg, fileImg.type);

        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

  return (
    <div>
        {loading && <Loading />}
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            draggable
            theme="dark"
        />
      <Dialog open={openModalAdd} onClose={handleClose}>
        <DialogTitle>Adicionar Produto</DialogTitle>
        <DialogContent className={css.modal}>
            <TextField
                margin="dense"
                label="Nome do produto*"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(e) => setDataForm({...dataForm, name: e.target.value})}
            />

            <FormControl
                variant="standard"
                margin="dense" 
                style={{width: '100%'}}
            >
                <InputLabel htmlFor="input-with-icon-adornment">
                    Valor do produto*
                </InputLabel>
                <Input
                    startAdornment={
                        <InputAdornment position="start">
                        R$
                        </InputAdornment>
                    }
                    onChange={(e) => setDataForm({...dataForm, value: e.target.value})}
                />
            </FormControl>
            {/* <TextField
                margin="dense"
                placeholder="Unidades*"
                type="text"
                fullWidth
                variant="standard"
                size="normal"
                onChange={(e) => setDataForm({...dataForm, units: e.target})}
            /> */}
            <TextField
                margin="dense"
                label="Descrição do produto*"
                multiline
                rows={4}
                size="small"
                className={css.text_area}
                onChange={(e) => setDataForm({...dataForm, description: e.target.value})}
            />
            <div className={css.form_control_custom}>
                <TextField
                    style={{width: '80%'}}
                    type="text"
                    fullWidth
                    size="small"
                    disabled
                    value={fileImg?.name}
                    placeholder="Selecione uma imagem"
                />
                <label htmlFor="file">
                    <AddCircleIcon />
                </label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFileImg(e.target.files[0])}
                />
            </div>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>CANCELAR</Button>
          <Button variant="contained" onClick={() => checkDataForm()}>SALVAR</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}