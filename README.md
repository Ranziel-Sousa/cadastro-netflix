# cadastro-netflix
Tela de perfis estilo Netflix feita em JavaScript puro com localStorage (projeto de estudo Full Stack)
# Perfis estilo Netflix com JavaScript e localStorage

Projeto de estudo do meu curso de Full Stack. É uma versão simples da tela "Quem está assistindo?" da Netflix: existe uma página de cadastro, onde eu crio um perfil, e uma tela inicial, que mostra um card para cada perfil salvo.

Foi feito com HTML, CSS e JavaScript puro, sem frameworks. Os dados ficam guardados no `localStorage` do navegador, então não precisa de servidor nem de banco de dados.


![Tela Inicial](<img width="1920" height="1032" alt="tela-index" src="https://github.com/user-attachments/assets/a9b8acbc-7804-4225-9326-a343bccb616d" />)
![Tela de Cadastro](<img width="1920" height="1032" alt="tela-cadastro" src="https://github.com/user-attachments/assets/846545a9-f361-45f5-850d-27d4ee92f035" />)
    

[Video de Demonstração](https://github.com/user-attachments/assets/7ac2a8f6-cc30-4cc7-9613-516e342747d6)





## Como funciona

1. A tela inicial (`index.html`) mostra o título **"Quem está assistindo ?"** e o botão de adicionar (`+`), que leva para o cadastro.
2. Na página de cadastro (`cadastro.html`) eu preencho **nome, email e idade** e clico em **Cadastrar**.
3. O JavaScript guarda o perfil no `localStorage` e me manda de volta para a tela inicial.
4. A tela inicial lê o que está salvo e cria um card com ícone e nome para cada perfil, ao lado do botão de adicionar.

Os perfis continuam aparecendo mesmo depois de fechar e abrir o navegador, porque ficam salvos no `localStorage`.

## O JavaScript

São dois arquivos, um para cada página.

### `cadastro.js`: salva o perfil

```javascript
const formInfo = document.querySelector("#data-form")
const cadastro = JSON.parse(localStorage.getItem("users")) || []
formInfo.addEventListener("submit", e => {
    e.preventDefault()
    const dataForm = new FormData(formInfo)
    const cadNovo = {
        nome:dataForm.get("nome").trim(),
        email:dataForm.get("email").trim(),
        idade:dataForm.get("idade").trim()
    }
    if (cadNovo.nome === "" && cadNovo.idade === "") {
        alert(`Preencha o campo`)
    }else{
        cadastro.push(cadNovo)
        localStorage.setItem("users", JSON.stringify(cadastro))
        window.location.href = "index.html"
    }
})
```

O que cada parte faz:

- `document.querySelector("#data-form")` pega o formulário da página pelo `id`.
- `JSON.parse(localStorage.getItem("users")) || []` busca a lista de perfis que já foi salva. O `localStorage` guarda só texto, então o `JSON.parse` converte esse texto de volta em array. Se ainda não existir nada salvo, o valor é `null` e o `|| []` faz a lista começar vazia.
- `addEventListener("submit", ...)` roda a função quando o formulário é enviado, e o `e.preventDefault()` impede a página de recarregar sozinha.
- `new FormData(formInfo)` lê os campos do formulário, e o `dataForm.get("nome")` pega o valor do input que tem `name="nome"`. O `.trim()` tira os espaços do começo e do fim.
- Com esses valores eu monto o objeto `cadNovo`, que representa o perfil.
- O `if` confere se **nome e idade estão os dois vazios**. Se estiverem, mostra o alerta "Preencha o campo" e não salva nada.
- Caso contrário, o `cadastro.push(cadNovo)` adiciona o perfil na lista, o `JSON.stringify` transforma a lista inteira em texto e o `localStorage.setItem("users", ...)` grava tudo.
- Por último, o `window.location.href = "index.html"` leva de volta para a tela inicial. Ele vem depois do `setItem` de propósito, para os dados serem salvos antes de a página mudar.

### `script.js`: mostra os perfis na tela

```javascript
const contas = document.querySelector("#contas")
const getInfo = JSON.parse(localStorage.getItem("users")) || []
getInfo.forEach(info => {
    const divCard = document.createElement("div")
    const divIcone = document.createElement("div")
    const texto = document.createElement("p")
    
    divCard.classList.add("card")
    divIcone.classList.add("icone")
    texto.classList.add("txt")
    
    texto.textContent = info.nome

    divCard.appendChild(divIcone)
    divCard.appendChild(texto)
    contas.appendChild(divCard)
})
```

O que cada parte faz:

- Pega a `section` com `id="contas"`, que é onde os cards vão entrar, e lê a lista salva do mesmo jeito do cadastro.
- O `forEach` repete o bloco **uma vez para cada perfil** da lista.
- Dentro dele, o `document.createElement` cria três elementos: o card (`div`), o ícone (`div`) e o texto (`p`).
- O `classList.add` coloca as classes `card`, `icone` e `txt`, que é onde o CSS estiliza cada parte.
- O `texto.textContent = info.nome` escreve o nome do perfil dentro do `p`.
- O `appendChild` monta tudo: o ícone e o texto entram dentro do card, e o card entra dentro da `#contas`.

### Como as duas páginas se comunicam

Cada página tem o seu próprio arquivo JS, e quem faz a ligação é o `localStorage`. Ele é compartilhado entre as páginas do mesmo site: o `cadastro.js` grava na chave `"users"` e o `script.js` lê a mesma chave. Por isso o nome da chave precisa ser exatamente igual nos dois arquivos.

## CSS

**`style.css` (tela inicial)**
- Variáveis em `:root` para as cores: vermelho `#e50914`, fundo `#141414`, branco e cinza.
- Fundo escuro com um brilho vermelho suave no topo, feito com `radial-gradient`.
- `.contas` usa **Flexbox** com `flex-wrap`, então os cards ficam lado a lado e quebram de linha quando faltar espaço.
- O ícone e o botão de adicionar são quadrados com `aspect-ratio: 1`.
- O tamanho do título, dos cards e do nome usa `clamp()`, para se ajustar à largura da tela.
- Nomes muito longos são cortados com reticências (`text-overflow: ellipsis`).
- Efeito de **hover**: o ícone ganha borda branca, o nome muda de cinza para branco e o botão de adicionar fica mais claro (`filter: brightness`).
- O botão de adicionar tem um contorno visível ao navegar pelo teclado (`:focus-visible`).
- Uma media query para telas de até 520px diminui os cards e os espaçamentos.

**`cadastro.css` (cadastro)**
- Mesma paleta de cores, com o formulário dentro de um cartão preto translúcido no centro da tela.
- Cada campo é um `fieldset` com o ícone posicionado dentro do input (`position: absolute` no `label`).
- Os campos são cinza escuro e, ao receber foco, ganham uma linha vermelha embaixo.
- O botão é vermelho e escurece no hover.
- Os ícones vêm do **Font Awesome**, carregado por CDN.
- Uma media query para telas de até 520px deixa o formulário em tela cheia e remove o fundo do cartão.

## Estrutura do projeto

```
├── index.html        # tela "Quem está assistindo ?"
├── style.css         # estilos da tela inicial
├── script.js         # lê os perfis e cria os cards
├── cadastro.html     # formulário de cadastro
├── cadastro.css      # estilos do cadastro
├── cadastro.js       # salva o perfil no localStorage
└── img/
    ├── icone azul.jpg   # ícone dos perfis
    └── add-img.png      # botão de adicionar
```

## Como rodar

1. Baixe ou clone o repositório.
2. Abra a pasta no VS Code.
3. Abra o `index.html` com a extensão **Live Server** (ou direto no navegador).

## O que praticei neste projeto

- Pegar elementos com `querySelector` e criar elementos novos com `createElement`.
- Adicionar classes com `classList.add` e escrever texto com `textContent`.
- Montar a estrutura da página com `appendChild`.
- Escutar eventos com `addEventListener` e controlar o envio do formulário com `preventDefault`.
- Ler os campos de um formulário com `FormData` e limpar espaços com `trim`.
- Salvar e ler dados com `localStorage`, convertendo com `JSON.stringify` e `JSON.parse`.
- Percorrer uma lista com `forEach` e adicionar itens com `push`.
- Usar `||` para definir um valor padrão e evitar erro quando não há nada salvo.
- Redirecionar o usuário com `window.location.href`.

## Limitações

Por ser um projeto de estudo, algumas coisas ainda são simples:

- Os dados ficam só no `localStorage`, ou seja, existem apenas no navegador onde o perfil foi criado.
- Todos os perfis usam o mesmo ícone azul.
- Na tela inicial aparece só o **nome**. O email e a idade são salvos, mas ainda não são mostrados em lugar nenhum.
- A checagem do cadastro só impede salvar quando **nome e idade estão os dois vazios**.
- Não existe edição nem exclusão de perfis.

## Próximos passos

- [ ] Permitir editar e excluir perfis
- [ ] Melhorar a validação dos campos do formulário
- [ ] Escolher entre vários ícones de perfil
- [ ] Guardar os dados em um banco de dados quando eu chegar nessa parte do curso

---

Feito por **[seu nome]** durante o curso de Full Stack.
