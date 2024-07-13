# MedCloud

MedCloud é um projeto que inclui um aplicativo web para gerenciar dados de pacientes. O projeto é dividido em duas partes principais: o frontend e o backend.

## Configuração e Execução

### 1. Configurar o Backend

1. Navegue até o diretório do backend:

    ```bash
    cd backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Execute as migrações do Prisma para configurar o banco de dados SQLite provisório:

    ```bash
    npx prisma migrate dev
    ```

### 2. Configurar o Frontend

1. Navegue até o diretório do frontend:

    ```bash
    cd ../frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

Agora, você deve ter o backend e o frontend configurados e funcionando em seus respectivos terminais.
