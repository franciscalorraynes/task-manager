# Task Manager - Projeto Final Sistemas Distribuídos

## 📋 Descrição do Projeto

Sistema completo de gerenciamento de tarefas desenvolvido para atender aos requisitos da disciplina de Sistemas Distribuídos, implementando arquitetura de três camadas com comunicação via APIs REST.

## 🏗️ Arquitetura do Sistema

### Camada de Apresentação
- **Frontend Web**: React.js com Vite e Tailwind CSS
- **Aplicativo Android**: Kotlin nativo com Material Design

### Camada de Negócios  
- **API REST**: Flask com autenticação JWT
- **Endpoints**: CRUD completo para usuários e tarefas
- **Autenticação**: Sistema de login/registro com tokens JWT

### Camada de Dados
- **Banco de Dados**: SQLite (adequado para projeto acadêmico)
- **Modelos**: User e Task com relacionamentos

## ✅ Requisitos Atendidos

- ✅ **Arquitetura de três camadas** (apresentação, negócios e dados)
- ✅ **Comunicação entre componentes** utilizando APIs REST
- ✅ **Acesso via aplicativo móvel** (Android)  
- ✅ **Autenticação de usuário** e autorização de chamadas à API
- ✅ **Configuração de DNS** (instruções incluídas)

## 📁 Estrutura do Projeto

```
task-manager-projeto-completo/
├── task-manager-api/           # Backend Flask
│   ├── src/
│   │   ├── main.py            # Aplicação principal
│   │   ├── models/            # Modelos de dados
│   │   ├── routes/            # Rotas da API
│   │   ├── utils/             # Utilitários (JWT, etc)
│   │   └── database/          # Configuração do banco
│   └── requirements.txt       # Dependências Python
├── task-manager-frontend/      # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── contexts/          # Context API
│   │   ├── services/          # Serviços de API
│   │   └── App.jsx           # Componente principal
│   ├── package.json          # Dependências Node.js
│   └── index.html            # HTML principal
├── task-manager-android/       # Aplicativo Android
│   ├── app/
│   │   ├── src/main/java/    # Código Kotlin
│   │   ├── src/main/res/     # Recursos Android
│   │   └── build.gradle      # Configuração Android
│   └── README.md             # Documentação Android
├── project_plan.md            # Plano detalhado do projeto
└── todo.md                   # Lista de tarefas concluídas
```

## 🚀 Como Executar

### 1. Backend (API Flask)
```bash
cd task-manager-api
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows
pip install -r requirements.txt
python src/main.py
```
API disponível em: `http://localhost:5000`

### 2. Frontend (React)
```bash
cd task-manager-frontend
npm install
npm run dev
```
Frontend disponível em: `http://localhost:5173`

### 3. Android (Android Studio)
1. Abrir o projeto `task-manager-android` no Android Studio
2. Sincronizar dependências (Gradle)
3. Executar em emulador ou dispositivo físico

## 🔧 Configuração de DNS

Para configurar o acesso via DNS personalizado:

### Frontend: `SEUNOME.DNS`
1. Registrar domínio ou usar serviço de DNS dinâmico
2. Configurar registro A apontando para IP do servidor
3. Fazer deploy do frontend em servidor web (Apache/Nginx)

### API: `api.SEUNOME`
1. Configurar subdomínio `api.SEUNOME`
2. Fazer deploy da API Flask em servidor
3. Configurar proxy reverso se necessário

### Exemplo de configuração DNS:
```
SEUNOME.DNS        A    192.168.1.100
api.SEUNOME        A    192.168.1.100
```

## 🔐 Autenticação e Segurança

- **JWT Tokens**: Autenticação stateless
- **Expiração**: Tokens válidos por 7 dias
- **Proteção de rotas**: Middleware de autorização
- **CORS**: Configurado para desenvolvimento
- **Validação**: Dados de entrada validados

## 📱 Funcionalidades

### Web e Mobile
- Login e registro de usuários
- Dashboard de tarefas
- Criar, editar e excluir tarefas
- Filtrar por status (Pendente, Em Andamento, Concluída)
- Data de vencimento
- Interface responsiva

### API Endpoints
```
POST /api/auth/register    # Registro
POST /api/auth/login       # Login
GET  /api/auth/me         # Usuário atual
GET  /api/tasks           # Listar tarefas
POST /api/tasks           # Criar tarefa
GET  /api/tasks/{id}      # Ver tarefa
PUT  /api/tasks/{id}      # Atualizar tarefa
DELETE /api/tasks/{id}    # Excluir tarefa
```

## 🛠️ Tecnologias Utilizadas

### Backend
- Python 3.11
- Flask
- SQLite
- JWT (PyJWT)
- Flask-CORS

### Frontend
- React 19
- Vite
- Tailwind CSS
- Shadcn/ui
- Axios

### Mobile
- Kotlin
- Android SDK (API 24+)
- Material Design 3
- Retrofit2
- Coroutines

## 📊 Demonstração

O sistema foi testado e validado com:
- ✅ Registro e login de usuários
- ✅ Criação e listagem de tarefas
- ✅ Autenticação JWT funcionando
- ✅ Interface responsiva
- ✅ Comunicação API completa

## 🎯 Objetivos Acadêmicos Alcançados

1. **Arquitetura Distribuída**: Separação clara de responsabilidades
2. **Comunicação via API**: REST com JSON
3. **Autenticação Segura**: JWT com middleware
4. **Interface Multiplataforma**: Web e Android
5. **Documentação Completa**: Código bem documentado

## 📝 Registro de Software

Este projeto está preparado para registro de programa de computador via UFERSA, incluindo:
- Código fonte completo
- Documentação técnica
- Arquitetura bem definida
- Funcionalidades inovadoras
- Aplicação prática

---

**Desenvolvido para a disciplina de Sistemas Distribuídos**
*Demonstrando competências em arquitetura de software, APIs REST, autenticação e desenvolvimento multiplataforma.*

