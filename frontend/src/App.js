import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Modal({ isOpen, onClose, onConfirm, maxQuantidade }) {
  const [quantidadeExcluir, setQuantidadeExcluir] = useState(1);

  useEffect(() => {
    if (isOpen) setQuantidadeExcluir(1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Excluir Produto</h3>
        <p>Quantidade disponível: {maxQuantidade}</p>
        <label>
          Quantidade a excluir:
          <input
            type="number"
            min="1"
            max={maxQuantidade}
            value={quantidadeExcluir}
            onChange={(e) => setQuantidadeExcluir(Number(e.target.value))}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(quantidadeExcluir)}
            className="btn-confirmar"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const buscarProdutos = async () => {
    try {
      const resposta = await axios.get(`${API_URL}/produtos`);
      setProdutos(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const adicionarProduto = async () => {
    if (!nome || !quantidade || !precoUnitario) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      await axios.post(`${API_URL}/produtos`, {
        nome,
        quantidade: parseInt(quantidade),
        preco_unitario: parseFloat(precoUnitario),
      });
      setNome("");
      setQuantidade("");
      setPrecoUnitario("");
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const abrirModalExcluir = (produto) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  const confirmarExclusao = async (quantidadeExcluir) => {
    if (
      quantidadeExcluir < 1 ||
      quantidadeExcluir > produtoSelecionado.quantidade
    ) {
      alert("Quantidade inválida para exclusão");
      return;
    }
    try {
      await axios.delete(
        `${API_URL}/produtos/${produtoSelecionado.id}?quantidade=${quantidadeExcluir}`
      );
      setIsModalOpen(false);
      setProdutoSelecionado(null);
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="App">
      <h1>Controle de Estoque</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço Unitário"
          value={precoUnitario}
          step="0.01"
          onChange={(e) => setPrecoUnitario(e.target.value)}
        />
        <button onClick={adicionarProduto}>Adicionar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
              <td>R$ {produto.preco_unitario.toFixed(2)}</td>
              <td>R$ {produto.preco_total.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => abrirModalExcluir(produto)}
                  className="btn-excluir"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmarExclusao}
        maxQuantidade={produtoSelecionado ? produtoSelecionado.quantidade : 0}
      />
    </div>
  );
}

export default App;
