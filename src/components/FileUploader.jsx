import { useState, useEffect } from 'react'
import style from './styles/FileUpload.module.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

function FileUploader({ reciever }) {

   const [image, setImage] = useState(null)
   const [fileName, setFileName] = useState("Nenhuma imagem selecionada")
   const [imagemPreview, setImagemPreview] = useState(null)

   useEffect(() => {
      reciever(image);
   }, [image])

   return (
      <section className={style.input}>


         <input accept='image/*' type="file" id="input" style={{ display: 'none' }}
            onChange={({ target: { files } }) => {
               files[0] && setFileName(files[0].name)
               if (files) {
                  const file = new Blob([files[0]], { type: files[0].type });
                  setImagemPreview(URL.createObjectURL(files[0]))
                  setImage(file);

               }
            }}

         />

         {!image ? <div> <label htmlFor="input" className={style.geral}> <FileUploadIcon color='#797979' fontSize='large' />Faça upload da imagem</label></div>
            :
            <div className={style.comImagem}><img src={imagemPreview}  alt={fileName} id={style.imagem}/></div>
         }

         <section className={style.uploadedRow}>
            <ImageIcon color='#797979' />
            <span className={style.uploadContent}>
               {fileName}
            </span>
            <DeleteIcon style={{ cursor: 'pointer' }}
               onClick={() => {
                  setFileName("No selected File")
                  setImage(null)
               }}
            />

         </section>
      </section>
   )
}

export default FileUploader
