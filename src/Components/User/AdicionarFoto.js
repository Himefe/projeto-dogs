import React from "react";

import styles from "./css/AdicionarPhoto.module.css";
import Input from "../Form/Input";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import useMedia from "../../Hooks/useMedia";
import useFetch from "../../Hooks/useFetch";

import { ReactComponent as Upload } from "../../Assets/upload.svg";
import { USER_PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const AdicionarFoto = () => {
  const nomeFoto = useForm("");
  const peso = useForm("");
  const idade = useForm("");

  const mobile = useMedia("(max-width: 767px)");
  const { request, error, data, loading } = useFetch();

  const [nomeArquivo, setNomeArquivo] = React.useState(
    "Selecione um arquivo..."
  );

  const navigate = useNavigate();

  const [img, setImg] = React.useState({});

  React.useEffect(() => {
    if (data) {
      navigate("/conta/minha-conta");
    }
  }, [data, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    nomeFoto.validate();
    peso.validate();
    idade.validate();

    const formData = new FormData();

    formData.append("img", img.raw);
    formData.append("nome", nomeFoto.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");

    const { url, options } = USER_PHOTO_POST(formData, token);

    if (nomeFoto.validate() && peso.validate() && idade.validate()) {
      request(url, options);
    }

    return;
  };

  // const changeNameFile = ({ target }) => {
  //   if (target.value !== "") {
  //     const splitedValue = target.files[0].name.split(".");
  //     const maxLength = 15;
  //     if (splitedValue[0].length >= maxLength) {
  //       nameFileRef.current.innerText = `${splitedValue[0].substr(0, 15)}...${
  //         splitedValue[1]
  //       }`;
  //     } else {
  //       nameFileRef.current.innerText = target.files[0].name;
  //     }
  //   } else {
  //     nameFileRef.current.innerText = "Selecione um arquivo...";
  //   }
  // };

  const changeNameFile = ({ target }) => {
    if (target.value !== "") {
      setNomeArquivo(target.files[0].name);
      setImg({
        raw: target.files[0],
        preview: URL.createObjectURL(target.files[0]),
      });
    } else {
      setNomeArquivo("Selecione um arquivo...");
      setImg({});
    }
  };

  return (
    <div className={`${styles.addArea} animeLeft`}>
      <Head
        title="Adicionar foto"
        description="Esta é a página de inserção de foto no feed do projeto dogs!"
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Título"
          type="text"
          name="nomeFoto"
          id="nomeFoto"
          {...nomeFoto}
        />
        <Input label="Peso" type="number" name="peso" id="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" id="idade" {...idade} />
        <div className={styles.fileArea}>
          <div title={nomeArquivo}>{nomeArquivo}</div>
          <label htmlFor="inputFile" className={styles.labelFile}>
            {!mobile ? "Carregar Arquivo" : <Upload />}
          </label>
          <input type="file" id="inputFile" onChange={changeNameFile} />
        </div>
        {loading ? (
          <Button nome="Enviando..." disabled />
        ) : (
          <Button nome="Enviar" />
        )}
      </form>
      <div>
        {img.preview ? (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        ) : null}
      </div>

      {error ? <p className="error">{error}</p> : null}
    </div>
  );
};

export default AdicionarFoto;
