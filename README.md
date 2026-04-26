# 🚀 Testes de Performance com k6

Projeto de testes de performance e carga utilizando o k6, com execução automatizada via GitHub Actions.

---

## 📁 Estrutura do Projeto

```
TESTE DE K6/
├── .github/
│   └── workflows/
│       └── performance.yml   ← pipeline CI/CD
├── config/
│   └── options.js            ← configurações reutilizáveis
├── reports/                  ← relatórios gerados
├── tests/
│   ├── Activities/
│   │   ├── get-activities.js ← teste GET de atividades
│   │   └── post-activities.js← teste POST de atividades
│   └── ReqRes/
│       └── Users.js          ← teste GET de usuários
└── README.md
```

---

## 🛠️ Pré-requisitos

- [k6](https://k6.io/docs/getting-started/installation/) instalado na máquina

---

## ▶️ Como executar os testes

### Executar um teste específico

```bash
# Teste GET de Activities
k6 run tests/Activities/get-activities.js

# Teste POST de Activities
k6 run tests/Activities/post-activities.js

# Teste GET de Usuários (ReqRes)
k6 run tests/ReqRes/Users.js
```

### Executar todos os testes

```bash
find tests/ -name "*.js" | while read file; do
  echo "▶️ Rodando: $file"
  k6 run "$file"
done
```

---

## ⚙️ Configurações disponíveis

Definidas em `config/options.js`:

| Config | VUs | Duração |
|--------|-----|---------|
| `optionsLight` | 5 | 10s |
| `optionsMedio` | 10 | 1min |
| `optionsHeavy` | 50 | 2min |

---

## 🌐 APIs utilizadas

| API | URL | Autenticação |
|-----|-----|-------------|
| FakeRestAPI | `https://fakerestapi.azurewebsites.net` | Não |
| ReqRes | `https://reqres.in/api` | x-api-key |

---

## 🤖 CI/CD

Os testes rodam automaticamente via **GitHub Actions** a cada push na branch `master`.

Para ver os resultados:
1. Acesse a aba **Actions** no repositório
2. Clique no workflow mais recente
3. Veja o resultado de cada teste ✅ ou ❌

---

## 📊 Entendendo o resultado

```
checks_succeeded: 100% ← todas as verificações passaram
http_req_duration p(95): 320ms ← 95% das requisições abaixo de 320ms
http_req_failed: 0% ← zero erros
```

---
## 📊 Relatórios HTML

Os testes geram relatórios visuais automaticamente na pasta `reports/`.

### Como gerar

```bash
# Rodar o teste
k6 run tests/Activities/get-activities.js

# Abrir o relatório no navegador (Windows)
start reports/get-activities.html
```

### O relatório mostra:
- ✅ Checks aprovados e reprovados
- ⏱️ Tempo de resposta médio, mínimo e máximo
- 📈 Gráfico de requisições por segundo
- ❌ Taxa de erros

