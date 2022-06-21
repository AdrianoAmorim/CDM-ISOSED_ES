const express = require("express");

const app = express();

/*
* POST  - INSERIR DADOS
* GET -  BUSCAR DADOS
* PUT -  ALTERAR DADOS
* DELETE - DELETAR DADOS
*/

app.get("/Membros",(req,resp)=>{
    return resp.json({
        data: "Listar os Membros Tela Home"
    })
})
app.listen(4041,()=> console.log("Servidor rodando com express"))