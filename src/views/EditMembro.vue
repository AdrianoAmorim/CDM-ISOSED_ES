<template>
  <ion-page>
    <InfoMembro :page="nomePg" :cargosLs="this.cargos" :membroEd="this.membro" />
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "EditMembro",
  components: {
    IonPage,
    InfoMembro,
  },
  data() {
    return {
      nomePg: "editar",
      membro: null,
      cargos: null
    };
  },
  props: {
    id: String,
  },
  methods:{
    async getMembro(idMembro) {
      const response = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: `query getMembro {
            membros(where: {id: {_eq: ${idMembro}}}) {
                   id
                   dtBatismo
                  dtNascimento
                  estCivil
                  id_logradouro
                  url_foto
                  mae
                  nome
                  pai
                  telefone
                  logradouro_membro {
                      bairro
                      cidade
                      endereco
                      numero
                    }
                    cargo_membro {
                      id
                    }
                  }
                }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
          },
        }
      );
      this.membro = response.data.data.membros;
      console.log("Valor da Variavel dentro do getMembro "+ this.membro);
    },
        async getCargos() {
      const response = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: "query getCargos {cargo {id,nome}}",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
          },
        }
      );
      this.cargos = response.data.data.cargo;
    },
  },
  beforeMount(){
    console.log("dentro do beforeMounted do EditMembro");
    this.getMembro(this.id);
    this.getCargos();
  }
});
</script>

<style>
</style>