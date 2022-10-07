const listaVagas = document.getElementById('lista-vagas')
const listaVagasSelecionadas = document.getElementById('lista-vagas-selecionadas')
let modalidades = []
let vagasSelecionadas = []
let botoesCandidatar = []
let verificador = false

if (localStorage.getItem("vagasSelecion") != null) {
    vagasSelecionadas = JSON.parse(localStorage.getItem("vagasSelecion"))
    atualizarVagasSelecionadas()
    botoesCandidatar = [...document.getElementsByClassName('botao-candidatar')]
}

function carregarVagas() {
    listaVagas.innerHTML = ''
    vagas.map((vaga, index) => {
        verificador = false
        listaVagas.insertAdjacentHTML('beforeend', `
        <li class="vaga" id="vaga-${vaga.id}">
            <h4 class="vaga-titulo">${vaga.title}</h4>
            <div>
                <h6 class="vaga-empresa">${vaga.enterprise}</h6>
                <h6 class="vaga-sede">${vaga.location}</h6>
            </div>
                <p class="vaga-desc">${vaga.descrition}</p>
                <span id='modalidades-${vaga.id}' class='vaga-locais'></span>
        </li>
        `
        )
        vagasSelecionadas.map((elemento, idx) => {
            if (elemento.id == vaga.id) {
                verificador = true
            }
        })
        if (verificador) {
            document.getElementById(`modalidades-${vaga.id}`).insertAdjacentHTML('afterend', `
            <button class="remover-vaga" id="removeressavaga-${vaga.id}">Remover candidatura</button>
            `)
        } else {
            document.getElementById(`modalidades-${vaga.id}`).insertAdjacentHTML('afterend', `
            <button class="botao-candidatar" id="candidatar-vaga-${vaga.id}">Candidatar</button>
            `)
        }
        modalidades = document.getElementById(`modalidades-${vaga.id}`)
        vaga.modalities.map((modalidade) => {
            modalidades.insertAdjacentHTML('beforeend', `
            <h5 class="vaga-local">${modalidade}</h5>
            `)
        })
    })
    candidatar()
}
carregarVagas()

function atualizarVagasSelecionadas() {
    listaVagasSelecionadas.innerHTML = ''
    if (vagasSelecionadas.length == 0) {
        listaVagasSelecionadas.insertAdjacentHTML('beforeend', `
    <li class="vaga-selecionada">                                                   
        <div class="parte-inferior">
            <h6 class="msg-sem-candidatura">Você ainda não aplicou para nenhuma vaga</h6>
        </div>
    </li>
    `
        )

    }
    vagasSelecionadas.map((vaga, index) => {
        listaVagasSelecionadas.insertAdjacentHTML('beforeend', `
        <li class="vaga-selecionada">
            <div class="parte-superior">
                <h4 class="selecionada-titulo">${vaga.title}</h4>
                <button class="remover-vaga" id="removeressavaga-${vaga.id}"><img src="../../assets/img/trash.svg" alt=""></button>
        </div>                                                        
            <div class="parte-inferior">
                <h6 class="vaga-empresa">${vaga.enterprise}</h6>
                <h6 class="vaga-sede">${vaga.location}</h6>
            </div>
        </li>
        `
        )
    })
}
atualizarVagasSelecionadas()

function candidatar() {
    botoesCandidatar = [...document.getElementsByClassName('botao-candidatar')]
    botoesCandidatar.map((botao, index) => {
        botao.addEventListener('click', () => {
            if (vagasSelecionadas.includes(vagas[botao.id.slice(16)])) {
                return
            } else {
                vagasSelecionadas.push(vagas[botao.id.slice(16)])
                vagasSelecionadas.sort((a, b) => { return a.id * 100 - b.id * 100 })
                localStorage.setItem("vagasSelecion", JSON.stringify(vagasSelecionadas))
                atualizarVagasSelecionadas()
                carregarVagas()
                removerCandidatura()
            }
        })
    })
}
candidatar()

let indexParaRemover = 0
let botaoParaAlterar = []

function removerCandidatura() {
    botoesRemover = [...document.getElementsByClassName('remover-vaga')]
    botoesRemover.map((botao, index) => {
        botao.addEventListener('click', () => {
            indexParaRemover = vagasSelecionadas.indexOf(vagas[botao.id.slice(16)])
            vagasSelecionadas.splice(indexParaRemover, 1)
            localStorage.setItem("vagasSelecion", JSON.stringify(vagasSelecionadas))
            candidatar()
            atualizarVagasSelecionadas()
            carregarVagas()
            removerCandidatura()
        })
    })
}
removerCandidatura()
