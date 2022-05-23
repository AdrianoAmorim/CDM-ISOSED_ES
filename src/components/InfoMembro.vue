<template>
  <ion-header mode="ios">
    <ion-toolbar mode="ios">
      <ion-button
        v-if="page == 'editar'"
        fill="clear"
        router-direction="top"
        slot="end"
        size="small"
        color="danger"
        @click="confirmDelete()"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="closeCircle"
      /></ion-button>

      <ion-button
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="primary"
        router-link="/"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="arrowBackCircle"
      /></ion-button>

      <ion-button
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="success"
        @click="setMembro(this.membro, this.logradouro)"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="save"
      /></ion-button>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid v-if="loader">
      <ion-row
        v-model="statusInfoSistema"
        v-if="statusInfoSistema"
        class="ion-justify-content-start"
      >
        <ion-col size="12" class="infoSistema">
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <span>{{ msgSistema }}</span>
            <ion-icon :icon="checkmarkCircle" />
          </ion-row>
        </ion-col>
      </ion-row>

      <ion-row class="ion-justify-content-between ion-align-items-center">
        <ion-col size="9">
          <ion-header class="headerPg" mode="ios">
            <ion-title class="titlePg">{{ titlePage }}</ion-title>
          </ion-header>
        </ion-col>

        <ion-col size="3">
          <ion-row class="ion-justify-content-end">
            <ion-thumbnail>
              <ion-img :src="avatarCadastro" alt="Imagem Ilustrativa" />
            </ion-thumbnail>
          </ion-row>
        </ion-col>
      </ion-row>

      <form>
        <ion-row>
          <ion-col>
            <ion-item mode="md">
              <ion-label position="floating">Nome: </ion-label>
              <ion-input v-model="membro.nome" color="secondary"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="8">
            <ion-item mode="md">
              <ion-label position="floating">Endereço: </ion-label>
              <ion-input
                v-model="logradouro.endereco"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="4">
            <ion-item mode="md">
              <ion-label position="floating">Nº: </ion-label>
              <ion-input
                v-model="logradouro.numero"
                type="number"
                inputmode="numeric"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6">
            <ion-item mode="md">
              <ion-label position="floating">Bairro: </ion-label>
              <ion-input
                v-model="logradouro.bairro"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="6">
            <ion-item mode="md">
              <ion-label position="floating">Cidade: </ion-label>
              <ion-input
                v-model="logradouro.cidade"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item mode="md">
              <ion-label position="floating">Telefone: </ion-label>
              <ion-input
                v-model="membro.telefone"
                type="number"
                inputmode="numeric"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>

          <ion-col>
            <ion-item mode="md">
              <ion-label position="stacked">Cargo: </ion-label>
              <ion-select
                v-model="membro.id_cargo"
                color="secondary"
                placeholder="Selecione o Cargo"
                cancel-text="CANCELAR"
                ok-text="OK"
              >
                <ion-select-option
                  v-for="Cargo in cargos"
                  :key="Cargo.id"
                  :value="Cargo.id"
                  >{{ Cargo.nome }}</ion-select-option
                >
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item mode="md">
              <ion-label position="floating">Pai: </ion-label>
              <ion-input v-model="membro.pai" color="secondary"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item mode="md">
              <ion-label position="floating">Mãe: </ion-label>
              <ion-input v-model="membro.mae" color="secondary"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6">
            <ion-item mode="md">
              <ion-label style="overflow: visible" position="stacked"
                >Data de Nascimento:
              </ion-label>
              <ion-input
                v-model="membro.dtNascimento"
                type="date"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="6">
            <ion-item mode="md">
              <ion-label position="stacked">Data de Batismo: </ion-label>
              <ion-input
                v-model="membro.dtBatismo"
                type="date"
                color="secondary"
              ></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-list>
              <ion-radio-group v-model="membro.estCivil" mode="md">
                <ion-row class="ion-justify-content-start">
                  <ion-label
                    style="margin-right: 3px"
                    class="ion-align-self-center"
                    >Est. Civil:</ion-label
                  >

                  <ion-item class="diferencaRadioBtn">
                    <ion-label>Casado</ion-label>
                    <ion-radio
                      color="secondary"
                      slot="start"
                      value="Casado"
                    ></ion-radio>
                  </ion-item>

                  <ion-item class="diferencaRadioBtn">
                    <ion-label>Solteiro</ion-label>
                    <ion-radio
                      color="secondary"
                      slot="start"
                      value="Solteiro"
                    ></ion-radio>
                  </ion-item>

                  <ion-item class="diferencaRadioBtn">
                    <ion-label>Viúvo(a)</ion-label>
                    <ion-radio
                      color="secondary"
                      slot="start"
                      value="Viúvo(a)"
                    ></ion-radio>
                  </ion-item>
                </ion-row>
              </ion-radio-group>
            </ion-list>
          </ion-col>
        </ion-row>
      </form>
    </ion-grid>
    <p class="loader" v-else>{{textLoader}}</p>
  </ion-content>
</template>

<script>
import axios from "axios";
import { defineComponent } from "@vue/runtime-core";
import {
  save,
  closeCircle,
  arrowBackCircle,
  checkmarkCircle,
} from "ionicons/icons";
import {
  alertController,
  IonIcon,
  IonButton,
  IonContent,
  IonHeader,
  IonThumbnail,
  IonList,
  IonImg,
  IonRadio,
  IonToolbar,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonTitle,
  IonLabel,
} from "@ionic/vue";

export default defineComponent({
  name: "InfoMembro",
  components: {
    IonHeader,
    IonIcon,
    IonButton,
    IonContent,
    IonThumbnail,
    IonGrid,
    IonImg,
    IonRow,
    IonCol,
    IonToolbar,
    IonItem,
    IonTitle,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonList,
    IonRadio,
    IonRadioGroup,
  },
  data() {
    return {
      textLoader: "Carregando",
      loader: false,
      msgSistema: "",
      statusInfoSistema: false,
      membroEdit: null,
      cargos: null,
      membro: {
        dtBatismo: "",
        dtNascimento: "",
        nome: "",
        pai: "",
        mae: "",
        estCivil: "",
        telefone: 0,
        id_cargo: 0,
      },
      logradouro: {
        endereco: "",
        numero: 0,
        bairro: "",
        cidade: "",
      },
      avatarCadastro: "/img/avatarCadMembro.png",
      save,
      closeCircle,
      arrowBackCircle,
      checkmarkCircle,
    };
  },
  props: {
    idMembro: String,
    page: String,
    titlePage: String,
  },
  methods: {
    limparCampos() {
      this.membro.nome = "";
      this.membro.telefone = 0;
      this.membro.dtBatismo = "";
      this.membro.dtNascimento = "";
      this.membro.pai = "";
      this.membro.mae = "";
      this.membro.estCivil = "";
      this.membro.id_cargo = 0;
      this.logradouro.endereco = "";
      this.logradouro.numero = 0;
      this.logradouro.bairro = "";
      this.logradouro.cidade = "";
    },
    async confirmDelete() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "DELETAR MEMBRO",
        message: "Deseja Deletar este Membro?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
            handler: () => {},
          },
          {
            text: "OK",
            id: "confirm-button",
            handler: () => {
              this.deleteMembro(this.idMembro);
            },
          },
        ],
      });
      return alert.present();
    },
    validarCampos() {
      if (
        (this.membro.nome == "") |
        (this.membro.telefone == 0) |
        (this.membro.dtBatismo == "") |
        (this.membro.dtNascimento == "") |
        (this.membro.pai == "") |
        (this.membro.mae == "") |
        (this.membro.estCivil == "") |
        (this.membro.id_cargo == 0) |
        (this.logradouro.endereco == "") |
        (this.logradouro.numero == 0) |
        (this.logradouro.bairro == "") |
        (this.logradouro.cidade == "")
      ) {
        return false;
      } else {
        return true;
      }
    },

    setDadosInp(membroEdit) {
      this.membro.nome = membroEdit[0].nome;
      this.membro.pai = membroEdit[0].pai;
      this.membro.mae = membroEdit[0].mae;
      this.membro.telefone = membroEdit[0].telefone;
      this.membro.dtNascimento = membroEdit[0].dtNascimento;
      this.membro.dtBatismo = membroEdit[0].dtBatismo;
      this.membro.estCivil = membroEdit[0].estCivil;
      this.membro.id_cargo = membroEdit[0].cargo_membro.id;
      this.logradouro.endereco = membroEdit[0].logradouro_membro.endereco;
      this.logradouro.bairro = membroEdit[0].logradouro_membro.bairro;
      this.logradouro.cidade = membroEdit[0].logradouro_membro.cidade;
      this.logradouro.numero = membroEdit[0].logradouro_membro.numero;
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

    async setMembro(membro, logradouro) {
      const validar = this.validarCampos();
      if (validar) {
        const response = await axios.post(
          "https://cdm-isosed.hasura.app/v1/graphql",
          {
            query: `mutation setMembro{
              insert_membros_one(object:{
                nome: "${membro.nome}",
                telefone: ${membro.telefone},
                id_cargo: ${membro.id_cargo},
                pai: "${membro.pai}",
                mae: "${membro.mae}",
                dtNascimento: "${membro.dtNascimento}",
                dtBatismo: "${membro.dtBatismo}",
                estCivil: "${membro.estCivil}",
                logradouro_membro:{
                  data:{
                    endereco: "${logradouro.endereco}",
                    numero: ${logradouro.numero},
                    bairro: "${logradouro.bairro}",
                    cidade: "${logradouro.cidade}"
                  }
                }
            }){id}}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-hasura-admin-secret":
                "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
            },
          }
        );
        if (response.data.data.insert_membros_one.id > 0) {
          this.msgSistema = "Pedido Realizado com Sucesso!!";
          this.statusInfoSistema = true;
          this.limparCampos();
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.push("/home");
          }, 3000);
        } else {
          this.msgSistema = "Erro ao Cadastrar novo Usuário";
          this.statusInfoSistema = true;
        }
      } else {
        alert("Favor Preencher todas as Informações do Membro!");
      }
    },

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
      this.membroEdit = response.data.data.membros;
      this.setDadosInp(this.membroEdit);
    },

    async deleteMembro(id) {
      const response = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: `mutation MyMutation {
                delete_membros(where: {id: {_eq: ${id}}}) {
                  affected_rows
                  returning {
                    logradouro_membro {
                      id
                    }
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
      const idLogradouro =
        response.data.data.delete_membros.returning[0].logradouro_membro.id;
      const response2 = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: `mutation MyMutation {
                  delete_logradouro(where: {id: {_eq: ${idLogradouro}}}) {
                    affected_rows
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

      if (
        response.data.data.delete_membros.affected_rows &&
        response2.data.data.delete_logradouro.affected_rows > 0
      ) {
        this.$router.push("/");
      } else {
        alert("Ouve um erro ao Deletar o Membro");
      }
    },
  },
  watch: {
    cargos() {
      if (this.page == "cadastro") {
        if (this.cargos != null) {
          this.loader = true;
        }
      } else if (this.page == "editar") {
        this.getMembro(this.idMembro);
        if (this.cargos != null) {
          this.loader = true;
        }
      }
    },
  },
  beforeMount() {
    this.getCargos();
  },
});
</script>

<style scoped>
.diferencaRadioBtn {
  --padding-start: 2px;
  --inner-padding-end: 2px;
}
ion-label {
  overflow: visible;
  font-weight: bold;
}
ion-radio {
  margin-left: 2px;
  margin-right: 1px;
}
ion-select-option {
  color: #427aa1;
}
ion-col.infoSistema {
  opacity: 0.8;
  border-radius: 15px;
  padding: 15px;
  background-color: #21c05e;
  color: white;
  font-style: italic;
  font-size: 16px;
  font-weight: bold;
}
ion-col.infoSistema icon {
  font-size: 26px;
  object-fit: fill;
}
</style>