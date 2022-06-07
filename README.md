<p align="center">
  <img src="https://softdesign.com.br/wp-content/themes/bones/library/images/logotipo.svg" alt="Softdesign logo" />
</p>

### :wink: Antes de iniciar o projeto

Verifique se o NodeJS instalado em sua máquina está na versão 14 ou superior. Digite no terminal o seguinte comando:

`$ node -v`

Caso não tenha ou esteja desatualizado, navegue até o site do nodeJS e baixe a versão mais recente.

Mais informações: [site oficial](https://nodejs.org/en/).

### :fire: Iniciando o projeto

`$ yarn`

Quando concluir a instalação das dependências, abra o projeto no seu editor, crie um arquivo `.env` com as mesmas informações do `.env.example` para popular as suas variáveis locais.

Digite no seu terminal `$ yarn typeorm:run` para executar as migrations da API.

Digite no seu terminal `$ yarn seed:run` para popular sua tabela com o primeiro usuário administrador.

Após realizar essas alterações, digite no seu terminal `$ yarn dev` e aguarde o seu projeto iniciar :smile:

### :star: Configurações principais

- **Typescript:**
  Superset do javascript criado pela Microsoft para permitir a escrita de scripts com tipagem.

  Mais informações: [site oficial](https://www.typescriptlang.org/).

- **Express:**
  Framework para o desenvolvimento de aplicações JavaScript com o NodeJS.

  Mais informações: [site oficial](https://expressjs.com/).

- **Swagger:**
  O Swagger é um framework composto por diversas ferramentas que, independente da linguagem, auxilia na documentação, consumo e visualização de serviços de uma API REST.

  Mais informações: [site oficial](https://swagger.io/).

- **Jest:**
  Jest é um framework de teste unitário de código aberto em JavaScript criado pelo Facebook a partir do framework Jasmine.

  Mais informações: [site oficial](https://jestjs.io/pt-BR/).

- **Eslint + Airbnb JavaScript Style Guide:**
  Um dos style guide mais famosos do mundo referência para várias empresas.

  Mais informações: [site oficial](https://github.com/airbnb/javascript).

- **Prettier:**
  Formatador de código que tem suporte com a maioria dos editores.

  Mais informações: [site oficial](https://prettier.io/).

- **EditorConfig:**
  Ajuda a manter estilos de codificação consistentes para vários desenvolvedores trabalharem no mesmo projeto e em diferentes editores.

  Mais informações: [site oficial](https://editorconfig.org/).

- **Husky com hook pre-commit:**
  Previne commits fora do padrão realizando o comando de eslint, prettier e teste antes de commitar suas alterações para validar se está tudo ok.

  Mais informações: [site oficial](https://typicode.github.io/husky/#/).

- **TSConfig:**
  Especifica os arquivos raiz e as configurações de compilação necessárias para o projeto.
  **Observação**: Está na configuração padrão do [Create React App](https://github.com/facebook/create-react-app).

- **Axios:**
  Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quanto no Node.js ou qualquer serviço de API.

  Mais informações: [site oficial](https://axios-http.com/).

- **HTTP status codes:**
  Biblioteca com todos os status code definido.

  Mais informações: [site oficial](https://www.npmjs.com/package/http-status-codes).

### :chart_with_upwards_trend: Configurações de logs

- **Winston:**
  Configurações de logs no console em Dev e log em JSON em produção. O arrquivo de configuração se encontra em: `$ cd src/config/logger`.

  Mais informações: [site oficial](https://github.com/winstonjs/winston).

- **Morgan:**
  Pacote de logs para requisições HTTP. Em desenvolvimento ele já se encontra ativo por padrão.

  Mais informações: [site oficial](https://github.com/expressjs/morgan).

### :bank: Configurações de banco de dados

- **TypeORM:**
  Mapeamento objeto-relacional, é uma técnica para aproximar o paradigma de desenvolvimento de aplicações orientadas a objetos ao paradigma do banco de dados relacional.

  Mais informações: [site oficial](https://typeorm.io/#/).

- **Yup:**
  O Yup é um construtor de schema JavaScript para análise e validação de valor.

  Mais informações: [site oficial](https://github.com/jquense/yup).

- **Bcrypt:**
  Bcrypt é um método de criptografia do tipo hash para senhas baseado no Blowfish.

  Mais informações: [site oficial](https://www.npmjs.com/package/bcrypt).

### :computer: Configurações VSCode

- Atualmente existe uma pasta **.vscode** de configurações para o editor visual studio code, nela se encontram as configurações para debugar códigos nodeJS direto pela IDE e também um formatador de códigos ao salvar.

Instalar as extensões no seu **visual studio code**:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

- [ENV](https://marketplace.visualstudio.com/items?itemName=IronGeek.vscode-env).

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens).
