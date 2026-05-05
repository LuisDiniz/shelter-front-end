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

3. Atualize as variável de ambientes com o endpoint do FORMSPREE no ficheiro .env para adicionar um form id de teste para enviar os emails dos formulários:

```
FORM_ENDPOINT_ADOPTION=https://formspree.io/f/your-form-id
FORM_ENDPOINT_VOLUNTEER=https://formspree.io/f/your-form-id
```

3. Inicie a applicação:

```
vercel dev
? Set up and develop “shelter-front-end”? 
yes
? Which scope should contain your project? 
voluntarios-seixal
Would you like to pull environment variables now? 
yes
```

4. Acesse o seguinte endereço no navegador:

```
http://localhost:3000/
```
