# Desafio Frontend Cidade Alta

## Descrição

O **Desafio Frontend Cidade Alta** é um Minigame dinâmico onde o jogador precisa seguir uma sequência de caracteres gerados aleatoriamente o mais rápido possível. O jogo desafia a rapidez e precisão do jogador, e qualquer erro ou o fim do tempo resulta em falha.

## Tecnologias Utilizadas

- **React**
- **TypeScript**
- **Styled Components**

## Features

- **Níveis de Dificuldade**: O jogo possui três níveis de dificuldade (Fácil, Médio e Difícil), que determinam a rapidez com que os jogadores precisam responder.
- **Controles de Teclado**:
  - **Espaço**: Inicia ou reinicia o jogo.
  - **Esc**: Retorna à tela inicial e encerra o jogo atual.
- **Ranking Local**: Mantém um ranking dos jogos anteriores, ordenando-os por tempo e mostrando a tentativa e a sequência realizada.
- **Efeitos Sonoros**: Interatividade aprimorada com sons para acertos, erros, mudanças de dificuldade e outros eventos do jogo.
- **Animações**:
  - Animação do modal do Minigame.
  - Animação de confete ao concluir com sucesso o desafio.

## Features Futuras Pré-Implementadas

- **Seleção de Idioma**: Estrutura preparada para internacionalização, permitindo a seleção de idioma da interface. Os arquivos de tradução já estão implementados usando o Context API do React.

## Instalação e Execução

Para rodar o **Desafio Frontend Cidade Alta**, siga os passos abaixo:

```bash
# Clone este repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto no terminal/cmd
cd desafio-frontend-cidade-alta

# Instale as dependências
pnpm i

# Execute a aplicação em modo de desenvolvimento
pnpm start

# Buildar a aplicação para prod
pnpm build

# O servidor inciará na porta:5173 - acesse <http://localhost:5173>
