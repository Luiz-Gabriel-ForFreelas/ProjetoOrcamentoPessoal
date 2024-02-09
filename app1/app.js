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
        return despesas
    }
}

let bd = new Bd

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor =document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if (despesa.validarDados()) {
        bd.gravarDespesa(despesa)
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
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
    let despesas = bd.recuperarTodosRegistros()
    let listaDespesas = document.getElementById('listaDespesas')
    /*Base
    <tr>
        <td>15/03/2018</td>
        <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>R$200,00</td>
    </tr>*/

    despesas.forEach(function(valor, indice, lista) {
        console.log(valor)
        //criando o TR
        let linha = listaDespesas.insertRow()

        //criar o TD
        linha.insertCell(0).innerHTML = `${valor.dia}/${valor.mes}/${valor.ano}`

        //Ajustar o tipo
        switch(valor.tipo) {
            case '1': valor.tipo = 'Alimentação'
                break
            case '2': valor.tipo = 'Educação'
                break
            case '3': valor.tipo = 'Lazer'
                break
            case '4': valor.tipo = 'Saúde'
                break
            case '5': valor.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = valor.tipo
        linha.insertCell(2).innerHTML = valor.descricao
        linha.insertCell(3).innerHTML = valor.valor
        linha.insertCell(4)
    })
}