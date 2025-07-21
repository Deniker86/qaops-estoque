# Imagem base do Python
FROM python:3.11

# Diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos para o container
COPY . .

# Instalar as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expor a porta da API
EXPOSE 5000

# Comando para iniciar o Flask
CMD ["python", "app.py"]