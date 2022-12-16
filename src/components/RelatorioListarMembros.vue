<template>
  <div id="gerarPdf" v-show="showList">
    <div id="tituloLista">
      <h3>Listagem {{ tituloListar }}</h3>
    </div>
    <div id="boxTabela">
      <table>
        <thead class="diminuirFonte">
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Congregação</th>
            <th>{{tituloListar == "Aniversariantes" ? "Dt Nasc." : "Telefone"}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="Membro in listaMembros" :key="Membro.id">
            <td class="diminuirFonte">{{ Membro.nome }}</td>
            <td class="diminuirFonte">{{ Membro.cargo.nome }}</td>
            <td class="diminuirFonte">{{ Membro.congregacao.nome }}</td>
            <td class="diminuirFonte">{{ tituloListar == "Aniversariantes" ? formatarData(Membro.dtNascimento) : Membro.telefone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import moment from "moment";
export default defineComponent({
  name: "RelatorioListarMembros",
  components: {},
  props: {
    showList: Boolean,
    listaMembros: Array,
    tituloListar: String,
  },
  methods:{
    formatarData(data){
     return moment(data).format("DD/MM/YYYY")
    }
  }
});
</script>

<style scoped>

#tituloLista {
  background: linear-gradient(110deg, #3a6b8e 30%, #3289c7 45%);
  text-align: center;
  margin-bottom: 5px;
  opacity:0.8;
}
#tituloLista h3 {
  color: #ffffff;
  letter-spacing: 1px;
  margin: 0;
  padding: 6px 0;
}

#boxTabela {
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

table {
  width: 99%;
}
thead {
  background: #5d93b9;
  color: #fff;
  opacity:0.8;
}
td {
  border-bottom: 1px solid #96c5e7;
  font-size: 16px;
}
th {
  font-size: 18px;
  font-weight: 300;
}
th,
td {
  text-align: center;
  padding: 5px 2px;
}
@media screen and (max-width: 768px) {
  .diminuirFonte {
    font-size: 12px;
  }
}
</style>
