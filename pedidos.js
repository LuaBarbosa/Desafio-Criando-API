const koa = require("koa");
const bodyparser = require('koa-bodyparser');
const server = new koa();

server.use(bodyparser());

const pedidos = {
    id: "001",
    produtos: [],
    status: "processando",
    deletado: false,
}

const listaDePedidos = {

}

server.use((ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    if(path === '/pedidos'){

    }
});

server.listen(9000, () => console.log("Rodando na porta 8081!"));
