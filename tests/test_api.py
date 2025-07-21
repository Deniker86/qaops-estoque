import requests

BASE_URL = "http://backend-qaops:5000"

def test_listar_produtos():
    resposta = requests.get(f"{BASE_URL}/produtos")
    assert resposta.status_code == 200
    assert isinstance(resposta.json(), list)

def test_adicionar_produto():
    novo = {"nome": "Monitor", "quantidade": 2, "preco_unitario": 500.00}
    resposta = requests.post(f"{BASE_URL}/produtos", json=novo)
    assert resposta.status_code == 201
    dados = resposta.json()
    assert dados["nome"] == "Monitor"
    assert dados["quantidade"] == 2
    assert dados["preco_unitario"] == 500.00
    assert dados["preco_total"] == 1000.00

def test_adicionar_produto_incompleto():
    novo = {"nome": "Teclado"}  # falta quantidade e preco_unitario
    resposta = requests.post(f"{BASE_URL}/produtos", json=novo)
    assert resposta.status_code == 400
    assert "Dados incompletos" in resposta.json()["mensagem"]

def test_deletar_produto():
    # Primeiro, adiciona um produto para garantir que tem algo para deletar
    novo = {"nome": "HD", "quantidade": 3, "preco_unitario": 200.0}
    add = requests.post(f"{BASE_URL}/produtos", json=novo)
    id_produto = add.json()["id"]

    # Agora deleta tudo
    deletar = requests.delete(f"{BASE_URL}/produtos/{id_produto}")
    assert deletar.status_code == 200
    assert "atualizado" in deletar.json()["mensagem"] or "removido" in deletar.json()["mensagem"]

def test_deletar_produto_inexistente():
    deletar = requests.delete(f"{BASE_URL}/produtos/999999")
    assert deletar.status_code == 404
    assert deletar.json()["mensagem"] == "Produto não encontrado"

def test_deletar_parcial_produto():
    # Adiciona produto com quantidade 5
    novo = {"nome": "Cabo USB", "quantidade": 5, "preco_unitario": 10.0}
    add = requests.post(f"{BASE_URL}/produtos", json=novo)
    id_produto = add.json()["id"]

    # Deleta 3 unidades
    deletar_parcial = requests.delete(f"{BASE_URL}/produtos/{id_produto}?quantidade=3")
    assert deletar_parcial.status_code == 200

    # Busca o produto e verifica se a quantidade diminuiu para 2
    resposta = requests.get(f"{BASE_URL}/produtos")
    produtos = resposta.json()
    produto = next((p for p in produtos if p["id"] == id_produto), None)
    assert produto is not None
    assert produto["quantidade"] == 2

    # Limpa (deleta o restante)
    requests.delete(f"{BASE_URL}/produtos/{id_produto}")

def test_deletar_parcial_quantidade_maior():
    # Adiciona produto com quantidade 2
    novo = {"nome": "Pen Drive", "quantidade": 2, "preco_unitario": 25.0}
    add = requests.post(f"{BASE_URL}/produtos", json=novo)
    id_produto = add.json()["id"]

    # Tenta deletar 5 unidades (mais do que tem), o backend deve deletar tudo
    deletar_parcial = requests.delete(f"{BASE_URL}/produtos/{id_produto}?quantidade=5")
    assert deletar_parcial.status_code == 200

    # Verifica se produto foi removido
    resposta = requests.get(f"{BASE_URL}/produtos")
    produtos = resposta.json()
    produto = next((p for p in produtos if p["id"] == id_produto), None)
    assert produto is None

def test_lista_apos_adicionar():
    novo = {"nome": "Webcam", "quantidade": 1, "preco_unitario": 150.0}
    resposta_add = requests.post(f"{BASE_URL}/produtos", json=novo)
    assert resposta_add.status_code == 201
    dados_add = resposta_add.json()

    resposta_lista = requests.get(f"{BASE_URL}/produtos")
    produtos = resposta_lista.json()
    produto_encontrado = next((p for p in produtos if p["id"] == dados_add["id"]), None)
    assert produto_encontrado is not None
    assert produto_encontrado["nome"] == "Webcam"