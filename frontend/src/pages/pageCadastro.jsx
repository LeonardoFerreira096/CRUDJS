/**
 * Nome do arquivo: pageCadastro
 * Data de criação: 18/08/25
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição: Página feita para pegar dados de clientes
 *
 * Funcionalidades: Dados gerados vão para o banco de dados, para ficar alocado.
 */

import { useState } from "react"
import axios from "axios"

const Cadastro = () => {
  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")

  async function handleCadastro(e) {
    e.preventDefault()
    try {
      const resposta = await axios.post("http://localhost:3000/v1/user/register", {
        nome,
        endereco,
        telefone,
        email,
      })

      setMensagem(`Cliente ${resposta.data.nome} cadastrado com sucesso!`)

      setNome("")
      setEndereco("")
      setTelefone("")
      setEmail("")
    } catch (erro) {
      setMensagem(erro.response?.data?.erro || "Erro ao cadastrar cliente")
    }
  }

  return (
    <>
      <h1 className="font-bold text-center p-3 text-2xl">Cadastro de Cliente</h1>
      <form
        onSubmit={handleCadastro}
        className="flex flex-col gap-4 mx-auto w-full sm:w-[50%] md:w-[40%] lg:w-[30%] p-4"
      >
        <input
          onChange={(e) => setNome(e.target.value)}
          type="text"
          placeholder="Nome"
          required
          value={nome}
          name="nome"
          className="border p-2 rounded"
        />
        <input
          onChange={(e) => setEndereco(e.target.value)}
          type="text"
          placeholder="Endereço"
          required
          value={endereco}
          name="endereco"
          className="border p-2 rounded"
        />
        <input
          onChange={(e) => setTelefone(e.target.value)}
          type="tel"
          placeholder="Telefone"
          required
          value={telefone}
          name="telefone"
          className="border p-2 rounded"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
          value={email}
          name="email"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded hover:bg-blue-700/80"
        >
          Cadastrar
        </button>
      </form>
      {mensagem && <p className="text-center mt-4">{mensagem}</p>}
    </>
  )
}

export default Cadastro
