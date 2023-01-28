import { useState, useEffect } from 'react'
import style from './styles/FileUpload.module.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

function FileUploader({ reciever }) {

   const [image, setImage] = useState(null)
   const [fileName, setFileName] = useState("Nenhuma imagem selecionada")

   useEffect(() => {
      reciever(image);
   }, [image])

   return (
      <section className={style.input}>


         <input accept='image/*' type="file" id="input" style={{ display: 'none' }}
            onChange={({ target: { files } }) => {
               files[0] && setFileName(files[0].name)
               if (files) {
                  setImage(URL.createObjectURL(files[0]))
               }
            }}

         />

         {!image ? <div> <label htmlFor="input" className={style.geral}>Faça upload da imagem <FileUploadIcon color='info' fontSize='large' /></label></div>
            :
            <div className={style.comImagem}><img src={image} height={270} width={202} alt={fileName} /></div>
         }

         <section className={style.uploadedRow}>
            <ImageIcon color='#1475cf' />
            <span className={style.uploadContent}>
               {fileName}
               <DeleteIcon style={{ cursor: 'pointer' }}
                  onClick={() => {
                     setFileName("No selected File")
                     setImage(null)
                  }}
               />
            </span>
         </section>
      </section>
   )
}

export default FileUploader
