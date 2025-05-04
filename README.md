# FURICO chatbot
![dark mode](/frontend/src/assets/black_theme.png "dark mode")


## Descrição
Este é o FURICO, o chatbot para quem é FURIOSO de coração! Aqui, você vai trocar ideia com uma IA que encarna o espírito do nosso mascote: cheio de energia, competitivo até o último round e com aquele jeitão descontraído que só a FURIA tem. Seja pra falar de CS2, relembrar jogadas épicas ou só bater um papo, o FURICO tá pronto pra te responder como se estivesse no palco de um Major. Bora interagir e sentir a adrenalina? #DIADEFURIA

## Índice
- [FURICO chatbot](#furico-chatbot)
  - [Descrição](#descrição)
  - [Índice](#índice)
  - [Utilização](#utilização)
  - [Instalação para uso local](#instalação-para-uso-local)
  - [Utilização local](#utilização-local)
  - [Contribuição](#contribuição)
  - [Licença](#licença)

## Utilização
Acesse o site da aplicação: [FURICO chatbot](https://furia-chatbot-rust.vercel.app)

## Instalação para uso local
1. Clone o repositório:
  ```bash
  git clone https://github.com/kaiomendes15/Furia_Chatbot.git
  ```
2. Navegue até o diretório do projeto:
  ```bash
  cd projeto-nome
  ```
3. Instale as dependências:
  ```bash
  npm install
  ```

## Utilização local
Instruções para executar o projeto:
- Vá no site google API Studio e gere uma chave de acesso à API do Gemini
- Crie um arquivo `.env` no backend e cole as variáveis de ambiente:
  ```javascript
  PORT=3000
  GEMINI_API_KEY=sua chave de acesso
  ```
- Acesse `frontend/src/components/Chat/index.tsx` e faça a seguinte alteração:
  ```javascript
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}`)
  // altere para:
  await axios.post(`http://localhost:3000`)
  ```
- Execute o programa
  ```javascript
  npm run dev
  // faça isso tanto nos arquivos do backend quanto no frontend
  ```

## Contribuição
1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
  ```bash
  git checkout -b minha-feature
  ```
3. Commit suas alterações:
  ```bash
  git commit -m "Adiciona minha feature"
  ```
4. Envie para o repositório remoto:
  ```bash
  git push origin minha-feature
  ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).
