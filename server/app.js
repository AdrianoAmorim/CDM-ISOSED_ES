const express = require("express");
var cors = require('cors');
const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient()

const app = express();
app.use(cors())

/*
 * POST  - INSERIR DADOS
 * GET -  BUSCAR DADOS
 * PUT -  ALTERAR DADOS
 * DELETE - DELETAR DADOS
 */
/*
 * Body >> sempre que quizer enviar dados para minha aplicação
 * Params >> /Produtos/9234244asd/ (para parametros de rotas q serao obrigatorios)
 * Query >> /produtos?id=24234234&tipo=23424  (se quiser passar mais de um coloca &)
 */
async function getMembros() {
    const membros = await prisma.membros.findMany()
    return membros
}
app.get("/Membros", (req, resp) => {
const objMembros = getMembros();
    return resp.json({result: objMembros})
})
app.listen(4041, () => console.log("Servidor rodando com express"))