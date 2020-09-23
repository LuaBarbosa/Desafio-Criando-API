const { ESTALE } = require("constants");
const koa = require("koa");
const bodyparser = require('koa-bodyparser');
const { isRegExp } = require("util");
const server = new koa();

server.use(bodyparser());

const produto = {
    id: 01,
    nome: "canetas",
    quantidade: 20,
    valor: 1,
    deletado: false
};


const listaDeProdutos = [{
    id: 01,
    nome: "canetas",
    quantidade: 20,
    valor: 1,
    deletado: false
}];

const obterListaDeprodutos = () => {
    const listaSemDeletar = []
    listaDeProdutos.forEach(elemento => {
        if (elemento.deletado === false) {
            listaSemDeletar.push(elemento);
        }
    });
    return listaSemDeletar;
}

const adicionarProdutos = (produto) => {
    const novoProduto = {
        id: produto.id ? produto.id : 'Produto sem id',
        nome: produto.nome ? produto.nome : 'Produto sem nome',
        quantidade: produto.quantidade ? produto.quantidade : 'Produto sem quantidade',
        valor: produto.valor ? produto.valor : '',
        deletado: false
    };
    listaDeProdutos.push(novoProduto)
    return novoProduto;
}

const obterUmProduto = (index) => {
    const produto = listaDeProdutos[index];
    if (produto) {
        return produto
    } else {
        return null
    }
}

const deletarProduto = (index) => {
    const produto = obterUmProduto(index);
    if (produto) {
        listaDeProdutos.splice(index, 1);
        return true
    } else {
        return false
    }
};

const atualizarQuantidade = (index, qtd) => {
    if(qtd
         > 0){
        const produto = obterUmProduto(index);
                 
        if(produto){
            if(produto.quantidade > 0){
                const produtoAtualizado = {
                    id: produto.id, 
                    nome: produto.nome, 
                    quantidade: produto.quantidade - qtd, 
                    valor: produto.valor, 
            
                }
            listaDeProdutos.splice(index, 1, produtoAtualizado);
            return "Estoque atualizado!"
            } 
        } 
    } 
    return "Não Encontrado!"

}

const pedido = {
    id: "001",
    produtos: "canetas",
    valor: 1.50,
    status: "processando",
    deletado: false
}
const listaDePedidos = [{
    id: "001",
    produtos: "canetas",
    valor: 1.50,
    status: "processando",
    deletado: false,
}];

const obterListaDePedidos = () => {
    const pedidosSemDeletar = []
    listaDePedidos.forEach(elemento => {
        if (elemento.deletado === false) {
            pedidosSemDeletar.push(elemento);
        }
    });
    return pedidosSemDeletar;
};

const adicionarPedidos = (pedidos) => {
    const novoPedido = {
            id: "001",
            produtos: "canetas",
            valor: 1.50,
            status: "processando",
            deletado: false
        };
    listaDePedidos.push(novoPedido);
    return novoPedido;
};

const listarUmPedido = (index) => {
    const pedidoListado = listaDePedidos[index];
    if (pedido) {
        return pedidoListado
    } else {
        return null
    }
}

const deletarPedido = (index) => {
    const pedidos2 = listarUmPedido(index);
    if (pedidos2) {
        //listaDePedidos.splice(index, 1);
        return true
    } else {
        return false
    }
};

const atualizarPedido = (index, status) => {
    if(status === "cancelado"){
        const produto = obterUmProduto(index);
                 
        if(produto){
            if(produto.quantidade > 0){
                const produtoAtualizado = {
                    id: produto.id, 
                    nome: produto.nome, 
                    quantidade: produto.quantidade - qtd, 
                    valor: produto.valor, 
            
                }
            listaDeProdutos.splice(index, 1, produtoAtualizado);
            return "Estoque atualizado!"
            } 
        } 
    } 
    return "Não Encontrado!"

}


       


server.use((ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    if (path === '/produtos'){
        if(method === 'GET'){
         ctx.body = obterListaDeprodutos();
        } else if (method === 'POST'){
            const produto = adicionarProdutos(ctx.request.body);
            ctx.body = produto;
        }
    } else if (path.includes('/produtos/')) {
        const pathQuebrado = path.split('/');
        if(pathQuebrado[1] === 'produtos'){
            const index = pathQuebrado[2];
            if(method === 'GET'){
                if(index){
                    ctx.body = obterUmProduto(index);
                }
            } else if (method === "DELETE"){
                const resposta =  deletarProduto(index);
                if (resposta === true){
                    ctx.body = "Produto deletado!"
                } else {
                    ctx.body = "Produto não foi deletado!"
                }      
            }     
        }else if (method === 'PUT'){
            const qtd = ctx.request.body.qtd;
            if(index && qtd){
                const resposta = atualizarQuantidade(index, qtd);
                if(resposta){
                    ctx.body = resposta;
                }else {
                    ctx.status = 404;
                    ctx.body = "Não encontrado!"
                }
            }
        }
    } else if(path.includes('/pedidos')){
        if(method === 'GET'){
            const pathQuebrado2 = path.split('/');
            const index = pathQuebrado2[2];
            if(index){
                ctx.body = listarUmPedido(index);
            }else {
                ctx.body = obterListaDePedidos();
            }
        } else  if (method === 'POST'){
            const pedidos = adicionarPedidos(ctx.request.body);
            ctx.body = pedidos;               
        } else if(method === 'DELETE') {
            const pathQuebrado = path.split('/');
            const index = pathQuebrado[2];
            const resposta =  deletarPedido(index);
            if (resposta === true){
                ctx.body = "Produto deletado!"
            } else {
                ctx.body = "Produto não foi deletado!"
            }      
        }  if (method === 'PUT'){
            const qtd = ctx.request.body.qtd;
            if(index && qtd){
                const resposta = atualizarQuantidade(index, qtd);
                if(resposta){
                    ctx.body = resposta;
                }else {
                    ctx.status = 404;
                    ctx.body = "Não encontrado!"
                }
            }
        }      
    }else{
        ctx.status = 404;
        ctx.body = "Não encontrado!"
    }

}); 

server.listen(8081, () => console.log("Rodando na porta 8081!"));