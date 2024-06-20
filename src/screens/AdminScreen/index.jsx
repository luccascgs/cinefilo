import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Edit, Search, X } from "react-feather";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
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
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const accessToken = getAccessToken();

  const loadMovies = useCallback(async () => {
    const response = await api.get("/movies");
    setMovies(response.data);
    setFilteredMovies(response.data);
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

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 50);
  }, []);

  const search = useMemo(
    () =>
      debounce(() => {
        const filtered = movies.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredMovies(filtered);
      }, 100),
    [filter, movies]
  );

  const handleSearch = useCallback(() => {
    search();
  }, [search]);

  useEffect(() => {
    loadMovies();

    document.title = "Cinéfilo: Admin";
  }, [loadMovies]);

  useEffect(() => {
    handleSearch();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, handleSearch]);

  return (
    <Container style={{ height: height }}>
      <QuerryForm>
        <QuerryInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Digite o nome de um filme"
        />
        <Search />
      </QuerryForm>
      <Table>
        {filteredMovies?.map((movie, index) => (
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
