import React, { useState, useEffect, useCallback } from "react";
import { Edit, Search, X } from "react-feather";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  QuerryInput,
  QuerryForm,
  Row,
  DeleteButton,
} from "./style";
import { api } from "../../lib/api";
import { LinkButton } from "../../components/LinkButton";
import { getAccessToken } from "../../helper/storageHelper";

export default function AdminScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [movies, setMovies] = useState([]);
  const accessToken = getAccessToken();

  const loadMovies = useCallback(async () => {
    const response = await api.get("/movies");
    setMovies(response.data);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      await api.delete(`/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      loadMovies();
    },
    [accessToken, loadMovies]
  );

  const handleConfirmDelete = useCallback(
    (movie) => {
      const confirmed = window.confirm(
        `Tem certeza de que deseja remover ${movie.name}?`
      );
      if (confirmed) {
        handleDelete(movie.id);
      }
    },
    [handleDelete]
  );

  function handleSubmit(event) {
    event.preventDefault();
  }

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 50);
  }, []);

  useEffect(() => {
    loadMovies();
    document.title = "Cinéfilo: Admin";

    window.addEventListener("resize", handleResize);
  }, [loadMovies, handleResize]);

  return (
    <Container style={{ height: height }}>
      <QuerryForm onSubmit={handleSubmit}>
        <QuerryInput placeholder="Digite o nome de um filme" />
        <Search />
      </QuerryForm>
      <Table>
        {movies?.map((movie, index) => (
          <Row key={index}>
            <span>{movie.name}</span>
            <div>
              <Link to={`/admin/form/${movie.id}`}>
                <Edit />
              </Link>
              <DeleteButton onClick={() => handleConfirmDelete(movie)}>
                <X />
              </DeleteButton>
            </div>
          </Row>
        ))}
      </Table>
      <LinkButton to="/admin/form">Criar Filme</LinkButton>
    </Container>
  );
}
