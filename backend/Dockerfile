FROM golang:latest
LABEL authors="skapskap"

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copie o código-fonte do seu projeto para o diretório de trabalho
COPY . .

# Compile a aplicação
RUN go build ./cmd/api

# Exponha a porta em que a aplicação irá rodar
EXPOSE 8080

# Comando para executar a aplicação quando o container for iniciado
CMD ["./api"]