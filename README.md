
# Localiza Ativo - Backend

API destinada para comunicação com as aplicações Localizasoft.




## Arquitetura

O software foi construído seguindo a arquitetura SOLID (https://pt.wikipedia.org/wiki/SOLID), garantindo sua qualidade, consistência, segurança e mantenabilidade.

Os arquivos estão dividos com base nas seguintes pastas:

- **controllers**:
Responsáveis por receber a request do client e iniciar a estrutura inicial adequada para tal.
- **entities**: 
Classes que representam alguma tabela do banco de dados ou algum DTO de leitura e escrita de alguam tabela.
- **lib**:
Bibliotecas criadas para funcionalidade do sistema.
- **middlewares**:
Responsáveis por interceptar o processo request - execução estrutural, para realizar alguma validação ou injeção.
- **providers**: 
Funções de validação, criptografia, etc. Garantem a funcionalidade do sistema.
- **repository**
Responsáveis por utilizar o prisma para lidar com o banco de dados.
- **routes**:
Rotas de acesso para o client.
- **useCases**:
Inicializadores do processo estrutural após a request captada pelo controller.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`SMTP_EMAIL`

`PORT_EMAIL`

`FROM_EMAIL`

`PASSWORD_EMAIL`

`CREATE_USER_ACCESS_TOKEN_SECRET`

`RESET_PASSWORD_ACCESS_TOKEN_SECRET`

`ACCESS_TOKEN_SECRET`

`AWS_BUCKET_NAME`

`AWS_DEFAULT_REGION`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`ADMIN_USER_EMAIL`

`ADMIN_USER_PASSWORD`

`AWS_DEFAULT_REGION`

`ADMIN_EMPRESA`


## Instalação

Para rodar o projeto localmente, serão necessários alguns passos:

- Baixar e instalar o [AWS CLI](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/getting-started-install.html)
- Configuração do AWS CLI, link [aqui](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-configure-quickstart.html)
- Baixar e instalar [PostgreSQL](https://aws.amazon.com/pt/free/database/?trk=0b1bd6f8-4817-4278-b071-814940dc174f&sc_channel=ps&sc_campaign=acquisition&sc_medium=ACQ-P|PS-GO|Non-Brand|Desktop|SU|Database|RDSOpenSource|BR|PT|Text&s_kwcid=AL!4422!3!589951432052!e!!g!!postgresql&ef_id=CjwKCAjwo_KXBhAaEiwA2RZ8hNb8Wrf7s-83fQEYH7FQSmDmo6elkGSV1Qvdt64T3YL2o4dNW6R7oBoCQjwQAvD_BwE:G:s&s_kwcid=AL!4422!3!589951432052!e!!g!!postgresql)
- Baixar e instalar [NodeJS](https://nodejs.org/en/)
- Clonar este repositório
- Navegar até a pasta do projeto e rodar os seguintes comandos na ordem em que aparecem:

```
npm install

npx prisma db push

npm run dev
```
## Documentação da API

## Rotas de usuários

#### Retorna o token de navegação com regra de negócio já aplicada.

```http
  POST /api/user/login'
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email`     | `string`   | **Obrigatório**. Email de acesso |
| `password`  | `string`   | **Obrigatório**. Senha de acesso

----

#### Retorna status de sucesso ou erro e envia um código para o email enviado.

```http
  POST /api/user/initResetPassword
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email cadastrado |

---

#### Verifica o código e retorna o token necessário para efetuar a mudança.

```http
  POST /api/user/verifyResetCode
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `code`      | `string` | **Obrigatório**. Código enviado para o email. |
| `email`      | `string` | **Obrigatório**. Email que recebeu o código |

---

#### Efetua a mudança de senha

```http
  POST /api/user/changePassword
```

**Essa rota necessita de um token jwt no cabeçalho, o qual é obtido por meio da rota "/api/user/verifyResetCode"**

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`                | `string` | **Obrigatório**. Email que recebeu o código  |
| `new_password`         | `string` | **Obrigatório**. Nova senha |
| `confirm_new_password` | `string` | **Obrigatório**. Confirmação de nova senha|

---

#### Inicia o cadastro de um novo usuário e envia um código para o email informado

```http
  POST /api/user/startRegister
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`                | `string` | **Obrigatório**. Email à ser cadastrado  |

---

### Verifica o código enviado para o email e gera um token necessário para prosseguir com o registro.

```http
  POST /api/user/registerCodeVerify
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `code`      | `string` | **Obrigatório**. Código enviado para o email. |
| `email`      | `string` | **Obrigatório**. Email que recebeu o código |

---

### Efetua o registro de um novo usuário

```http
  POST /api/user/registerCodeVerify
```

**Essa rota necessita de um token jwt no cabeçalho, o qual é obtido por meio da rota "/api/user/registerCodeVerify"**

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`                | `string` | **Obrigatório**. Email que recebeu o código  |
| `password`         | `string` | **Obrigatório**. Senha |
| `confirmPassword` | `string` | **Obrigatório**. Confirmação de senha|

---

### Lista todos os usuários (necessita ser admin)

```http
  GET /api/user/getall
```

Exemplo de resposta
```
{
    "error": false,
    "data": [
        {
            "id": "24eff52f-4a75-46b0-9a0c-8b1c7dca9f08",
            "email": "paulo.h.mendes25@gmail.com",
            "created_at": "2022-07-12T04:55:08.704Z",
            "empresa": {
                "id": "179ccff1-3a73-45f4-92be-68fe6aef6bb8",
                "name": "Localiza Software"
            },
            "empresa_id": "179ccff1-3a73-45f4-92be-68fe6aef6bb8"
        },
        {
            "id": "44e4f7c1-4443-4458-ba74-82f8cddab9a6",
            "email": "luisantonio@localizasoft.com.br",
            "created_at": "2022-07-16T00:12:08.466Z",
            "empresa_id": null
        },
    ]
}
```

---

### Deleta um usuário (necessita ser admin)

```http
  DELETE /api/user/delete/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `query` | **Obrigatório**. Id do usuário a ser deletado. |

---

### Vincular usuário - empresa (necessita ser admin)

```http
  PUT /api/user/vinculate/:id
```

| Parâmetro          | Tipo       | Descrição                                       |
| :----------        | :--------- | :------------------------------------------     |
| `id`               | `query`    | **Obrigatório**. Id do usuário a ser vinculado. |
| `idEmpresa`        | `string`   | **Obrigatório**. Id da empresa a ser vinculada. |

---

## Rotas de Empresas

### Lista todas as Empresas (necessita ser admin)

```http
  GET /api/empresa/getall
```

Exemplo de resposta

```
{
    "error": false,
    "data": [
        {
            "id": "179ccff1-3a73-45f4-92be-68fe6aef6bb8",
            "name": "Localiza Software"
        }
    ],
    "message": "Empresas buscadas com sucesso."
}
```

---

### Adiciona uma empresa (necessita ser admin)

```http
  POST /api/empresa/post
```

| Parâmetro          | Tipo       | Descrição                                       |
| :----------        | :--------- | :------------------------------------------     |
| `name`             | `string`   | **Obrigatório**. Nome da empresa a ser criada.  |

---

### Deleta uma empresa (necessita ser admin)

```http
  DELETE /api/empresa/delete/:id
```

| Parâmetro          | Tipo       | Descrição                                       |
| :----------        | :--------- | :------------------------------------------     |
| `id`               | `query`   | **Obrigatório**. ID da empresa a ser deletada.   |

---

### Altera uma empresa (necessita ser admin)

```http
  PUT /api/empresa/put/:id
```

| Parâmetro          | Tipo       | Descrição                                       |
| :----------        | :--------- | :------------------------------------------     |
| `id`               | `query`   | **Obrigatório**. ID da empresa a ser atualizada. |
| `name`             | `string`   | **Obrigatório**. Novo nome da empresa.          |

---

## Rotas de itens

### Lista todos os itens

```http
  GET /api/item/getall
```

Exemplo de resposta:

```
{
    "error": false,
    "data": [
        {
            "id": "13d3bd81-084d-456d-96aa-745a0bb1ad79",
            "plaqueta": "Data04",
            "sequencial_localiza": "Data04",
            "andar": "Data04",
            "localizacao": "Data04",
            "descricao": "Data04",
            "lido": "Data04",
            "data_inclusao": "2022-08-04T22:46:06.246Z",
            "tipo": "Data04",
            "foto_url": null,
            "dono": "Data04",
            "codigo_de_barras": "Data04",
            "empresa_id": "179ccff1-3a73-45f4-92be-68fe6aef6bb8"
        },
        {
            "id": "162bae94-e612-46c3-927d-9094ac5608bb",
            "plaqueta": "Data04",
            "sequencial_localiza": "Data04",
            "andar": "Data04",
            "localizacao": "Data04",
            "descricao": "Data04",
            "lido": "Data04",
            "data_inclusao": "2022-08-06T01:19:08.650Z",
            "tipo": "Data04",
            "foto_url": null,
            "dono": "Data04",
            "codigo_de_barras": "Data04",
            "empresa_id": "179ccff1-3a73-45f4-92be-68fe6aef6bb8"
        }
    ],
    "message": "Listas buscadas com sucesso."
```

---

### Busca item por id

```http
  GET /api/item/getById/:id
```

| Parâmetro          | Tipo       | Descrição                                       |
| :----------        | :--------- | :------------------------------------------     |
| `id`               | `query`   | **Obrigatório**. ID do item a ser buscado.       |

Exemplo de resposta:

```
{
    "error": false,
    "data": {
        "id": "f39619e7-a023-40ba-813c-55907487de2a",
        "plaqueta": "Data04",
        "sequencial_localiza": "Data04",
        "andar": "Data04",
        "localizacao": "Data04",
        "descricao": "Data04",
        "lido": "Data04",
        "data_inclusao": "2022-08-16T21:24:27.066Z",
        "tipo": "Data04",
        "foto_url": null,
        "dono": "Data04",
        "codigo_de_barras": "Data04",
        "empresa_id": "179ccff1-3a73-45f4-92be-68fe6aef6bb8"
    },
    "message": "Item buscado com sucesso."
}
```

---

### Deleta item

```http
  DELETE /api/item/delete/:id
```

| Parâmetro          | Tipo       | Descrição                                        |
| :----------        | :--------- | :------------------------------------------      |
| `id`               | `query`   | **Obrigatório**. ID do item a ser deletado.       |

---

### Adiciona item

```http
  POST /api/item/post
```

| Parâmetro              | Tipo       |
| :----------            | :--------- |
| `andar`                | `string`   |
| `codigo_de_barras`     | `string`   |
| `descricao`            | `string`   |
| `dono`                 | `string`   |
| `lido`                 | `string`   |
| `localizacao`          | `string`   |
| `plaqueta `            | `string`   |
| `sequencial_localiza`  | `string`   |
| `tipo`                 | `string`   |

---

### Atualiza um item

```http
  PUT /api/item/put/:id
```

| Parâmetro              | Tipo       |
| :----------            | :--------- |
| `id`                   | `query`    |
| `andar`                | `string`   |
| `codigo_de_barras`     | `string`   |
| `descricao`            | `string`   |
| `dono`                 | `string`   |
| `lido`                 | `string`   |
| `localizacao`          | `string`   |
| `plaqueta `            | `string`   |
| `sequencial_localiza`  | `string`   |
| `tipo`                 | `string`   |

### Adicionar foto ao item

```http
  PUT /api/item/addPhoto/:id
```

| Parâmetro              | Tipo       |
| :----------            | :--------- |
| `id`                   | `query`    |
| `foto_url`             | `string`   |

---

### Carga ao banco de dados via planilha excel

```http
  PUT /api/upload/charge
```

Payload deve ser um FormData

| Parâmetro              | Tipo       | Descrição                            |
| :----------            | :--------- | :---------                           |
| `excel`                | `binary`   | Planilha a ser salva como colunas    |

---

## Rotas do S3

### Upload de foto

```http
  PUT /api/item/uploadPhoto/:id
```

Payload deve ser um FormData

| Parâmetro              | Tipo          | Descrição                            |
| :----------            | :---------    | :---------                           |
| `id`                   | `query (URL)` | Irá ser o nome do arquivo no S3      |
| `image`                | `binary`      | Imagem a ser salva                   |

---

### Deletar foto do S3

```http
  PUT /api/item/deletePhoto/:id
```

| Parâmetro              | Tipo          | Descrição                            |
| :----------            | :---------    | :---------                           |
| `id`                   | `query (URL)` | Nome do arquivo no S3                |

### Buscar foto do S3

```http
  PUT /api/item/downloadPhoto/:id
```

| Parâmetro              | Tipo          | Descrição                            |
| :----------            | :---------    | :---------                           |
| `id`                   | `query (URL)` | Nome do arquivo no S3                |

