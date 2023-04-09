import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import style from "../pages/tests/TabelaTeste.module.css"
import { Dialog, DialogTitle } from "@mui/material";
import { Button, Stack } from "rsuite";
import Compressor from "compressorjs";

function SimpleDialog(props, parametro) {

  const [crop, setCrop] = useState();

  const handleCropChange = (newCrop) => {
    console.log(newCrop)
    setCrop(newCrop);
  };

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <div style={{ padding: '15px' }}>
        <DialogTitle style={{ textAlign: 'center' }}>Cortar imagem:</DialogTitle>
        <section >
        </section>

        <ReactCrop crop={crop} onChange={handleCropChange}  >
          <img src={props.imagem} alt="teste" />
        </ReactCrop>

        <Stack direction='row' spacing={5}>
          <Button variant="contained" color="success" onClick={() => {
            props.getCoordenadas(crop)
            handleClose();
          }}>Confirmar</Button>
          <Button variant="contained" color="error" onClick={handleClose}>Cancelar</Button>
        </Stack>

      </div>
    </Dialog>
  );
}

function FileUplader2({reciever}) {

  const [open, setOpen] = useState(false);

  const [imagem, setImagem] = useState(null);
  const [cortado, setCortado] = useState(null);
  const [coordenadas, setCoordenadas] = useState(null);

  const handleEscolherImagem = (event) => {
    const file = event.target.files[0];

    new Compressor(file, {
      quality: 0.8, // Define a qualidade da imagem comprimida (0 a 1)
      maxWidth: 620, // Define a largura máxima da imagem
      maxHeight: 620, // Define a altura máxima da imagem
      success: (compressedImage) => {
        setImagem(URL.createObjectURL(compressedImage));
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
 };

 const handleClose = (value) => {
    setOpen(false);
 };

  useEffect(() => {
    if (imagem) {
      setOpen(true);
    }
  }, [imagem]);

  const handleCropCompleto = (crop) => {
    const imagemCortada = document.createElement("canvas");
    const imagemOriginal = new Image();
    imagemOriginal.src = imagem;
    imagemCortada.width = crop.width;
    imagemCortada.height = crop.height;
    const contexto = imagemCortada.getContext("2d");
    contexto.drawImage(
      imagemOriginal,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
    imagemCortada.toBlob((blob) => {
      const arquivoCortado = new File([blob], "cortado.png", {
        type: "image/png",
        lastModified: Date.now(),
      });

      setCortado(URL.createObjectURL(arquivoCortado));
      reciever(arquivoCortado);
    }, "image/png");
  };

  useEffect(() => {
    if (coordenadas) {
      handleCropCompleto(coordenadas);
    }
  }, [coordenadas]);

  return (
    <>
      <div>
        <label className={style.label}>
          <input type="file" accept="image/*" onChange={handleEscolherImagem} id={style.input} />
          Escolher Imagem
        {cortado && <img src={cortado}  alt="xd" id={style.imagem}/> }
        </label>
      </div>

      <SimpleDialog open={open} imagem={imagem} getCoordenadas={setCoordenadas} onClose={handleClose}></SimpleDialog>
    </>
  );
}

export default FileUplader2;