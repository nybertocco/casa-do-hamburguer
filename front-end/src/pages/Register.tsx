import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

import { API_URL } from "../config";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!name || !email || !password || !cep) {
        setError("Todas as informações são obrigatórias");
        return;
      }

      if (password !== confirmPassword) {
        setError("Senhas não conferem");
        return;
      }

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cep }),
      });

      switch (response.status) {
        case 409:
          setError("E-mail já cadastrado");
          break;
        case 400:
          setError("Todas as informações são obrigatórias");
          break;
        case 201:
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCep("");
          break;
        case 500:
          setError("Tente novamente mais tarde");
          break;
        default:
          setError("");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      return;
    }

    //console.log({ name, email, password, confirmPassword, cep });
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="./logo.png" alt="" className="mx-auto mb-4" />
        </Link>

        <Input
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          placeholder="Confirme sua Senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Input
          placeholder="CEP"
          type="text"
          onChange={(e) => setCep(e.target.value)}
          value={cep}
        />
        <p className="font-bold text-red-500">{error}</p>

        <div className="mt-3 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />

          <Link to="/login" className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
