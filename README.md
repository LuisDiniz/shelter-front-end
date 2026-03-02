# Shelter UI

## Pré-requisitos

Node versão 18+. Testado com Node versão 23.11.0

- Se estiver usando **nvm** para gerenciar instalações do Node, é recomendado que use a versão 23.11.0

> nvm use 23.11.0

## Iniciar o projeto

1. Navegue até a pasta do projeto:
> cd shelter-front-end

2. Instale as dependências:
> npm install

3. Atualize a variável de ambiente FORMSPREE_ENDPOINT no ficheiro .env para adicionar um form id de teste para enviar os emails dos formulários:

```
FORM_ENDPOINT_ADOPTION=https://formspree.io/f/your-form-id
```

3. Inicie a applicação:
> vercel dev

4. Acesse o seguinte endereço no navegador:

```
http://localhost:3000/
```
