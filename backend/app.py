from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///produtos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco_unitario = db.Column(db.Float, nullable=False)

    @property
    def preco_total(self):
        return round(self.preco_unitario * self.quantidade, 2)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "quantidade": self.quantidade,
            "preco_unitario": round(self.preco_unitario, 2),
            "preco_total": self.preco_total
        }

with app.app_context():
    db.create_all()

@app.route("/", methods=["GET"])
def home():
    return "API QAOps rodando com sucesso!"

@app.route("/health")
def health_check():
    return "OK", 200

@app.route("/produtos", methods=["GET"])
def listar_produtos():
    produtos = Produto.query.all()
    return jsonify([p.to_dict() for p in produtos])

@app.route("/produtos", methods=["POST"])
def adicionar_produto():
    dados = request.json
    if not all(k in dados for k in ("nome", "quantidade", "preco_unitario")):
        return jsonify({"mensagem": "Dados incompletos"}), 400

    try:
        nome = dados["nome"]
        quantidade = int(dados["quantidade"])
        preco_unitario = float(dados["preco_unitario"])

        produto = Produto(nome=nome, quantidade=quantidade, preco_unitario=preco_unitario)
        db.session.add(produto)
        db.session.commit()

        return jsonify(produto.to_dict()), 201
    except Exception as e:
        return jsonify({"mensagem": "Erro ao adicionar produto", "erro": str(e)}), 500

# Rota DELETE adaptada para exclusão parcial
@app.route("/produtos/<int:id>", methods=["DELETE"])
def remover_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"mensagem": "Produto não encontrado"}), 404

    # Obter a quantidade a excluir da query string, se não vier exclui tudo
    quantidade_excluir = request.args.get('quantidade', type=int)

    if quantidade_excluir is None or quantidade_excluir >= produto.quantidade:
        # Excluir produto todo
        db.session.delete(produto)
    else:
        # Diminuir a quantidade
        produto.quantidade -= quantidade_excluir

    db.session.commit()
    return jsonify({"mensagem": "Produto atualizado ou removido"}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')