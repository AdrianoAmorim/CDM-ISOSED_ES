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
app.get("/Membros", async (req, resp) => {
    const membros = await prisma.membros.findMany({
        select:{
            id: true,
            nome: true
            //url_foto: true,
        },
        orderBy: {
            nome: "asc"
          }
    })
    resp.json(membros)
})
app.listen(4041, () => console.log("Servidor rodando com express"))