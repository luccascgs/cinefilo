import React, { useState, useEffect, useCallback } from "react";
import { Container } from "./style";
import { api } from "../../lib/api";
import { setAccessToken } from "../../helper/storageHelper";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    const payload = {
      email,
      password,
    };

    const response = await api.post("/sign-in", payload);

    setAccessToken(response.data.accessToken);
    navigate("/admin");
  }, [navigate, email, password]);

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 50);
  }, []);

  useEffect(() => {
    document.title = "Cinéfilo: Admin";

    window.addEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Container style={{ height: height }}>
      <h2>Email:</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <h2>Senha:</h2>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleSubmit}>LogIn</button>
    </Container>
  );
}
