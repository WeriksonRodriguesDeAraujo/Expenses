# expenses

Projeto didático.

# Tecnologias principais
- Vue.js 
- Vue Router 
- Firebase 
- Bootstrap 

### Rodando o projeto local

- Clone o projeto na sua máquina;
- Instale as dependências usando `npm i`
- Renomeie o arquivo `.env.local.example` para `.env.local`;
- Crie uma conta no [Firebase](https://firebase.google.com/) (basta ter uma conta do Google);
- No console, adicione um novo projeto e dê o nome que preferir;
- Copie as credenciais do projeto para o ambiente Web e coloque-as em seus devidos locais dentro do arquivo `.env.local`;
- Ative o realtime database dentro do console do Firebase;
- Crie um usuário em Authentication no [Firebase](https://firebase.google.com/) coloque seu email e senha no `.env.local`
- Execute `npm run serve` para subir um servidor local para desenvolvimento com hot reload ativado.

### Fazer o deploy para o firebase

Para usar o serviço de hosting do firebase basta executar os seguintes passos:

- Crie uma pasta deploy na raiz do projeto;
- Com o [firebase-tools](https://github.com/firebase/firebase-tools) instalado na máquina execute `firebase init` dentro da pasta deploy recém criada;

Se estiver no Linux ou MacOS basta executar 
```
npm run deploy
```

No windows é preciso fazer o procedimento na mão:

- Execute `npm run build`;
- Copie o conteúdo de dentro da pasta /dist para dentro da pasta /deploy/public;
- Execute `firebase deploy` dentro da pasta /deploy;
