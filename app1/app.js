class Despesa {
    constructor(ano,mes,dia,tipo,descricao,valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id', 0) 
        }
    }
    
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId))+1
    }
    
    gravarDespesa(despesa) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let despesas = Array()
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        console.log(despesas)
    }
}

let bd = new Bd

function cadastrarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor =document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    if (despesa.validarDados()) {
        bd.gravarDespesa(despesa)
        ajustarModal(true)
        $('#modalRegistroDespesa').modal('show')
    } else {
        ajustarModal(false)
        $('#modalRegistroDespesa').modal('show')
    }
}

function ajustarModal(sucesso) {
    document.getElementById('modal_titulo').innerHTML = (sucesso===true?'Registro realizado com sucesso':'Erro ao registrar')
    document.getElementById('modal_header').className = (sucesso===true?'modal-header text-success':'modal-header text-danger')
    document.getElementById('modal_body').innerHTML = (sucesso===true?'Despeza cadastrada com sucesso.':'Preencha todos os campos *')
    document.getElementById('modal_btn').innerHTML = (sucesso===true?'Voltar':'Cancelar')
    document.getElementById('modal_btn').className = (sucesso===true?'btn btn-success':'btn btn-danger')
}

function carregaListaDespesas() {
    bd.recuperarTodosRegistros()
}