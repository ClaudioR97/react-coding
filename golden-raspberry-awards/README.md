## 🏆 Golden Raspberry Awards (Frontend)

Este projeto é uma aplicação **React + Vite + Material UI (MUI)** que consome uma API REST dos indicados e vencedores do **Golden Raspberry Awards**, permitindo listar filmes, filtrar por ano e vencedor, e exibir estatísticas como os produtores com maiores e menores intervalos de vitórias.

---

### 🚀 Tecnologias Utilizadas

| Categoria                   | Stack                                                  |
| --------------------------- | ------------------------------------------------------ |
| **Framework**               | React 18 + Vite                                        |
| **UI**                      | Material UI (MUI v5)                                   |
| **Linguagem**               | JavaScript (ES2020+)                                   |
| **Testes**                  | Jest + React Testing Library                           |
| **Roteamento**              | React Router DOM v6                                    |
| **Gerenciamento de Estado** | Hooks nativos (`useState`, `useEffect`, `useCallback`) |
| **Lint/Format**             | ESLint + Prettier                                      |

---

### 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── CardComponent/           # Wrapper genérico com título e Paper do MUI
│   ├── GenericTable/            # Tabela genérica reutilizável
│   ├── CustomPagination/        # Paginação customizada com MUI Icons
│   └── SearchByYear/            # Filtro de busca por ano
│
├── features/
│   └── movies/
│       ├── hooks/               # Hooks de API (useFilmesApi)
│       └── services/            # Funções auxiliares da camada de dados
│
├── pages/
│   ├── Dashboard/
│   │   ├── Top3List.jsx         # Top 3 estúdios com mais vitórias
│   │   ├── ProducersList.jsx    # Produtores com maiores/menores intervalos
│   │   ├── WinnerByYearList.jsx # Vencedores agrupados por ano
│   │   └── YearsList.jsx        # Lista simples de anos com vencedores
│   │
│   ├── MovieList/
│   │   └── MovieList.jsx        # Página principal com filtros e tabela de filmes
│   │
│   └── Sidebar/
│       └── Sidebar.jsx          # Menu lateral com navegação (Dashboard / Movies)
│
├── hooks/
│   └── useDebounce.js           # Hook genérico para debounce
│
└── tests/                       # (opcional) diretório agrupando specs
```

---

### ⚙️ Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/golden-raspberry-awards.git
cd golden-raspberry-awards

# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Rodar os testes
npm run test
```

> A aplicação será iniciada em:
> 👉 **[http://localhost:5173](http://localhost:5173)**

---

### 🧠 Principais Componentes

#### **`GenericTable`**

* Reaproveitável para qualquer conjunto de colunas e dados.
* Usa `<Table>` do MUI com paginação e ordenação customizável.
* Suporte a `noDataMessage` (“No data available”).

#### **`CardComponent`**

* Envolve conteúdos dentro de um `<Card>` MUI com título e padding padrão.
* Utilizado em todas as seções do dashboard.

#### **`SearchByYear`**

* Campo de busca com debounce e ícone de lupa.
* Evita múltiplas requisições simultâneas ao digitar.

#### **`CustomPagination`**

* Paginação feita manualmente com ícones MUI (`FirstPageIcon`, `LastPageIcon`, etc.).
* Controla estados de página e total de elementos.

---

### 📊 Páginas

#### **Dashboard**

Contém cards com estatísticas derivadas da API:

* **Top3List** → exibe os 3 estúdios com mais vitórias.
* **ProducersList** → mostra produtores com maiores e menores intervalos de vitórias.
* **WinnerByYearList** → lista vencedores agrupados por ano.
* **YearsList** → lista simples de anos com vencedores.

#### **MovieList**

Tabela interativa com filtros:

* Campo para filtrar por **ano**.
* Select para filtrar por **vencedor (Yes/No)**.
* Integração com paginação e debounce.

#### **Sidebar**

Menu lateral com duas opções:

* **Dashboard** (`/`)
* **List Movies** (`/movies`)

Usa `useNavigate` e `useLocation` do React Router DOM.

---

### 🧪 Testes Unitários

Os testes cobrem componentes e páginas com **React Testing Library** e **Jest**.

#### ✅ Principais testes:

| Arquivo                     | O que valida                               |
| --------------------------- | ------------------------------------------ |
| `MovieList.test.jsx`        | Renderização, filtros e chamadas de API    |
| `WinnerByYearList.test.jsx` | Tratamento de erro da API                  |
| `ProducersList.test.jsx`    | Renderização e uso do hook de produtores   |
| `Top3List.test.jsx`         | Exibição dos 3 primeiros estúdios          |
| `Sidebar.test.jsx`          | Navegação e renderização dos itens do menu |
| `GenericTable.test.jsx`     | Exibição de dados e mensagem de vazio      |
| `useFilmesApi.test.js`      | Mock e retorno correto da API              |

#### 🧰 Rodando testes:

```bash
npm run test
```

> O projeto atinge **100% de sucesso nos testes** (`11 passed, 0 failed`)
> Warnings do React Router são apenas avisos sobre futuras versões (v7).

---

### 🧱 Boas Práticas Adotadas

* Separação clara de **camada de UI** e **camada de API (hooks)**.
* Uso consistente de **hooks com `useCallback`** para evitar re-renderizações desnecessárias.
* **Testes unitários isolados**, sem dependência de rede real.
* **Debounce global** reutilizável para filtros.
* Uso de **MUI SX** para personalização leve, mantendo consistência visual.

---

### 🧩 Próximas Melhorias

* Adicionar **testes de integração e snapshots**.
* Configurar **CI/CD (GitHub Actions)** para rodar testes automaticamente.
* Adicionar **modo dark/light theme** global.
* Documentar **endpoint base da API** no `.env`.

---

### 👨‍💻 Autor

**Claudio Ramos**
💼 Frontend Engineer
📧 [LinkedIn](https://linkedin.com/in/claudio-da-silva-ramos)

---

### 📝 Licença

Distribuído sob a licença **MIT**.
Sinta-se livre para usar, estudar e adaptar.
