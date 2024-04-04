import React, { useState, useEffect, useCallback } from "react";
import { Container, FormRow, Emojis } from "./style";
import { splitEmojis } from "../../helper/emojiHelper";
import { getAccessToken } from "../../helper/storageHelper";
import { api } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { LinkButton } from "../../components/LinkButton";
import { X } from "react-feather";

export default function FormScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [name, setName] = useState("");
  const [emojis, setEmojis] = useState("");
  const [acceptableNames, setAcceptableNames] = useState([{ id: 0, name: "" }]);
  const [genre, setGenre] = useState(4);
  const accessToken = getAccessToken();

  const loadMovie = useCallback(async () => {
    if (id) {
      const response = await api.get(`/movies/${id}`);
      setName(response.data?.name);
      setGenre(response.data?.genre);
      setEmojis(response.data?.emojis?.join(""));
      setAcceptableNames(
        response.data?.acceptableNames.map((item, index) => ({
          id: index,
          name: item,
        }))
      );
    }
  }, [id]);

  const handleSubmit = useCallback(async () => {
    try {
      const payLoad = {
        name: name?.trim(),
        emojis: splitEmojis(emojis),
        acceptableNames: acceptableNames.map((item) => item.name?.trim()),
        genre: Number(genre),
      };

      if (id) {
        await api.put(`/movies/${id}`, payLoad, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        await api.post("/movies", payLoad, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  }, [navigate, name, acceptableNames, emojis, genre, accessToken, id]);

  function handleChangeAcceptableName(event, id) {
    const index = acceptableNames.findIndex((item) => item.id === id);
    const updatedAcceptableNames = [...acceptableNames];

    updatedAcceptableNames[index].name = event.target.value;
    setAcceptableNames(updatedAcceptableNames);
  }

  function handleAddAcceptableName(id) {
    const newAcceptableNames = [
      ...acceptableNames,
      { id: acceptableNames.length, name: "" },
    ];
    setAcceptableNames(newAcceptableNames);
  }

  function handleRemoveAcceptableName(id) {
    let index = 0;
    const updatedAcceptableNames = [];

    for (const acceptableName of acceptableNames) {
      if (acceptableName.id !== id) {
        updatedAcceptableNames.push({ id: index, name: acceptableName.name });
        index++;
      }
    }

    setAcceptableNames(updatedAcceptableNames);
  }

  useEffect(() => {
    loadMovie();
    document.title = "Cinéfilo: Formulário";

    const handleResize = () => {
      setHeight(window.innerHeight - 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loadMovie]);

  return (
    <Container style={{ height: height }}>
      <FormRow>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="4">Ação</option>
          <option value="3">Adam</option>
          <option value="7">Animação</option>
          <option value="5">Comédia</option>
          <option value="8">Drama</option>
          <option value="6">Ficção</option>
          <option value="2">Série</option>
          <option value="1">Terror</option>
        </select>
      </FormRow>
      <FormRow>
        <Emojis
          value={emojis}
          onChange={(e) => setEmojis(e.target.value)}
          placeholder="Emojis"
        />
      </FormRow>
      {acceptableNames.map((acceptableName) => (
        <FormRow key={acceptableName.id}>
          <div>
            <input
              value={acceptableName.name}
              onChange={(e) => handleChangeAcceptableName(e, acceptableName.id)}
              placeholder="Nomes permitido"
            />
            <button
              type="button"
              onClick={() => handleRemoveAcceptableName(acceptableName.id)}
            >
              <X />
            </button>
          </div>
        </FormRow>
      ))}
      <FormRow>
        <button type="button" onClick={handleAddAcceptableName}>
          Adicionar Nome
        </button>
      </FormRow>
      <FormRow>
        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
      </FormRow>
      <LinkButton to="/admin">Voltar</LinkButton>
    </Container>
  );
}
