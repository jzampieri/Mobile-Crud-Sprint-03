# Mobile Development and IoT — CRUD React Native

Aplicativo desenvolvido em **React Native (Expo)** com CRUD completo consumindo dados de uma **API REST** criada no [MockAPI](https://mockapi.io).

---

## 👨‍💻 Integrantes do grupo

* Júlio César Zampieri RM98772
* Gustavo Melo RM98809
* Carlos Augusto Campos Ganzerli RM99840
* Lucas Carlos Bandeira Teixeira RM98640
* João Gabriel Dias RM99092

(Adicione todos os integrantes aqui)

---

## 📱 Funcionalidades

* Criar, listar, detalhar, atualizar e excluir itens
* Marcar item como concluído ou em aberto
* Validação de formulário (campos obrigatórios)
* Tratamento de erros de rede/servidor
* Navegação entre telas (Listagem, Detalhes, Formulário)
* Feedback visual de **loading** e **erros**
* Estrutura de pastas organizada

---

## 🛠️ Tecnologias utilizadas

* [Expo](https://expo.dev/) / React Native
* [React Navigation](https://reactnavigation.org/)
* [Axios](https://axios-http.com/) (consumo de API)
* [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (validação)
* [MockAPI](https://mockapi.io/) (backend fake)

---

## ⚙️ Configuração do projeto

### 1. Clonar repositório

```bash
git clone https://github.com/jzampieri/Mobile-Crud-Sprint-03
cd mobile-crud
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o app

```bash
npx expo start
```

* Pressione **`a`** para abrir em emulador Android
* Pressione **`i`** para abrir em emulador iOS
* Ou escaneie o QR code no **Expo Go** (Android/iOS)

---

## 🚀 Endpoints disponíveis

Base URL: `https://68d0a8a2e6c0cbeb39a22038.mockapi.io`

* **GET** `/items` → Lista todos os itens
* **POST** `/items` → Cria novo item
* **GET** `/items/:id` → Retorna um item específico
* **PUT** `/items/:id` → Atualiza um item existente
* **DELETE** `/items/:id` → Exclui um item

---

## 📂 Estrutura de pastas

```
mobile-crud/
  src/
    api/          # Conexão com a API (MockAPI)
    components/   # Componentes reutilizáveis (Loading, ErrorView, etc)
    hooks/        # Hook useItems com CRUD
    navigation/   # Navegação com React Navigation
    screens/      # Telas (List, Form, Detail)
    types/        # Definição de tipos (Item)
  App.tsx         # Entrada principal
```

---

##  Como testar falhas de conexão

* Desative a internet no dispositivo
* Puxe para atualizar a lista → app exibe mensagem de erro
* Ative a internet novamente e puxe → dados recarregam normalmente

---

