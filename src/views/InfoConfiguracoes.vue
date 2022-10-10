<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-button
          fill="clear"
          router-direction="back"
          slot="end"
          size="small"
          color="primary"
          router-link="/configuracoes"
        >
          <ion-icon
            slot="icon-only"
            class="iconToolbar"
            :icon="arrowBackCircle"
        /></ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" class="ion-align-items-center">
            <ion-row class="ion-justify-content-center">
              <ion-col size="10">
                <ion-item mode="md">
                  <ion-label class="lblInput" position="floating"
                    >Adicionar {{ lblInput }}
                  </ion-label>
                  <ion-input color="secondary" v-model="item.nome"></ion-input>
                </ion-item>
              </ion-col>

              <ion-col size="2" class="ion-align-self-center">
                <ion-button
                  color="success"
                  fill="clear"
                  @click="direcionarCadastroItem(item)"
                >
                  <ion-icon
                    slot="icon-only"
                    :icon="addCircle"
                    class="iconToolbar"
                  />
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <ion-col size="12" class="ion-align-items-center">
            <ion-searchbar
              @ionChange="buscarItem(resultBusca)"
              v-model="resultBusca"
              mode="ios"
              :debounce="1000"
              animated="true"
              show-cancel-button="never"
              placeholder="Buscar"
            />
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <ion-col size="6">
            <ion-row class="ion-justify-content-start">
              <ion-label id="titleConfig">Editar:</ion-label>
            </ion-row>
          </ion-col>
          <ion-col size="6" class="ion-align-self-center">
            <ion-row class="ion-justify-content-end">
              <ion-label id="infoTituloEditar">Salvar - Excluir</ion-label>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center" v-if="!loader">
          <ion-col size="12">
            <ion-list lines="none">
              <ion-item v-for="Obj in listaItens" :key="Obj.id" mode="ios">
                <ion-input
                  color="secondary"
                  placeholder="Carregando"
                  v-model="Obj.nome"
                ></ion-input>

                <ion-button
                  size="small"
                  fill="clear"
                  slot="end"
                  @click="direcionarPgAtualizar(Obj)"
                >
                  <ion-icon
                    color="success"
                    slot="icon-only"
                    class="iconToolbar"
                    :icon="save"
                  />
                </ion-button>

                <ion-button
                  size="small"
                  fill="clear"
                  slot="end"
                  @click="direcionarPgDelete(Obj.id)"
                >
                  <ion-icon
                    color="danger"
                    slot="icon-only"
                    class="iconToolbar"
                    :icon="closeCircle"
                  />
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <div v-else>
          <ion-progress-bar type="indeterminate"> </ion-progress-bar>
          <h3 class="tagAguardeLoader">Aguarde...</h3>
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { arrowBackCircle, addCircle, save, closeCircle } from "ionicons/icons";
import {
  IonPage,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonProgressBar,
} from "@ionic/vue";
export default defineComponent({
  name: "InfoConfiguracoes",
  components: {
    IonPage,
    IonItem,
    IonList,
    IonLabel,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonProgressBar,
  },
  data() {
    return {
      urlServer: "https://isosed-server.herokuapp.com",
      //urlServer: "http://192.168.18.103:4041",
      arrowBackCircle,
      addCircle,
      save,
      closeCircle,
      lblInput: "",
      loader: false,
      listaItens: null,
      item: {
        nome: "",
      },
      resultBusca: "",
    };
  },
  methods: {
    //METODOS DE DIRECIONAMENTO DE REQUIZIÇÃO
    direcionarCadastroItem(nomeItem) {
      if (nomeItem.nome != "") {
        if (this.nomePg == "congregacoes") {
          this.cadItemCongregacao(nomeItem);
        } else {
          this.cadItemCargo(nomeItem);
        }
      } else {
        alert("Campo vazio!!");
      }
    },
    direcionarPgAtualizar(Obj) {
      if (this.nomePg == "congregacoes") {
        this.atualizarCongregacao(Obj);
      } else {
        this.atualizarCargo(Obj);
      }
    },
    direcionarPgDelete(id) {
      if (this.nomePg == "congregacoes") {
        this.deletarCongregacao(id);
      } else {
        this.deletarCargo(id);
      }
    },
    //FAZ UMA BUSCA NO ITEM(CARGO OU CONGREGACAO)
    async buscarItem(resultBusca) {
      this.loader = true;
      if (this.nomePg == "congregacoes") {
        const response = await axios.get(
          `${this.urlServer}/buscarCongregacoes?nome=${resultBusca}`
        );
        if (response.data.length > 0) {
          this.listaItens = response.data;
          this.loader = false;
        } else {
          alert("Congregação não encontrada!!");
          this.listaItens = null;
          this.loader = false;
        }
        console.log(response);
      } else {
        const response = await axios.get(
          `${this.urlServer}/buscarCargos?nome=${resultBusca}`
        );
        if (response.data.length > 0) {
          this.listaItens = response.data;
          this.loader = false;
        } else {
          alert("Cargo não Encontrado!!");
          this.listaItens = null;
          this.loader = false;
        }
        console.log(response);
      }
    },
    async atualizarCargo(obj) {
      this.loader = true;
      try {
        const response = await axios.put(
          `${this.urlServer}/atualizarCargo`,
          obj
        );
        if (response.data.id > 0) {
          this.getCargos();
          this.loader = false;
        } else {
          alert("Error: " + response.data.msg);
          this.getCargos();
          this.loader = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async atualizarCongregacao(obj) {
      this.loader = true;
      try {
        const response = await axios.put(
          `${this.urlServer}/atualizarCongregacao`,
          obj
        );
        if (response.data.id > 0) {
          this.getCongregacoes();
          this.loader = false;
        } else {
          alert("Error: " + response.data.msg);
          this.getCongregacoes();
          this.loader = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deletarCargo(id_cargo) {
      var id = {
        id_cargo: id_cargo,
      };
      this.loader = true;
      try {
        const response = await axios.delete(`${this.urlServer}/deletarCargo`, {
          data: id,
        });
        if (response.data.id > 0) {
          this.getCargos();
          this.loader = false;
        } else {
          alert("Error: " + response.data.msg);
          this.getCargos();
          this.loader = false;
        }
      } catch (e) {
        alert("Error: " + e.message);
        console.log(e);
        this.getCargos();
        this.loader = false;
      }
    },
    async deletarCongregacao(id_congregacao) {
      var id = {
        id_congregacao: id_congregacao,
      };
      this.loader = true;
      try {
        const response = await axios.delete(
          `${this.urlServer}/deletarCongregacao`,
          {
            data: id,
          }
        );
        if (response.data.id > 0) {
          this.getCongregacoes();
          this.loader = false;
        } else {
          alert("Error: " + response.data.msg);
          this.getCongregacoes();
          this.loader = false;
        }
      } catch (e) {
        alert("Error: " + e.message);
        console.log(e);
        this.getCongregacoes();
        this.loader = false;
      }
    },
    async cadItemCongregacao(nomeItem) {
      try {
        const response = await axios.post(
          `${this.urlServer}/cadCongregacao`,
          nomeItem
        );
        if (response.data.id > 0) {
          nomeItem.nome = "";
          this.getCongregacoes();
          alert("Cadastro realizado com Sucesso!!");
        } else {
          alert("Houve Algum erro estamos tratando!!");
        }
      } catch (e) {
        alert(e);
      }
    },
    async cadItemCargo(nomeItem) {
      this.loader = true;
      try {
        const response = await axios.post(
          `${this.urlServer}/cadCargo`,
          nomeItem
        );
        if (response.data.id > 0) {
          nomeItem.nome = "";
          alert("Cadastro realizado com Sucesso!!");
          this.getCargos();
          this.loader = false;
        } else {
          alert("Houve Algum erro estamos tratando!!");
          this.getCargos();
          this.loader = false;
        }
      } catch (e) {
        alert(e);
        this.getCargos();
        this.loader = false;
      }
    },
    async getCongregacoes() {
      this.loader = true;
      try {
        const response = await axios.get(`${this.urlServer}/congregacoes`);
        if (response.data.length > 0) {
          this.listaItens = response.data;
          this.loader = false;
        } else if (response.data.length == 0) {
          alert("Nenhum Cargo Cadastrado!");
        } else if (response.data.error == true) {
          alert("Erro Interno no Servidor: " + response.data.msg);
        }
      } catch (e) {
        alert("Houve Um erro ao Carrega os Cargos!! " + e.message);
      }
    },
    async getCargos() {
      this.loader = true;
      try {
        const response = await axios.get(`${this.urlServer}/cargos`);
        if (response.data.length > 0) {
          this.listaItens = response.data;
          this.loader = false;
        } else if (response.data.length == 0) {
          alert("Nenhum Cargo Cadastrado!");
        } else if (response.data.error == true) {
          alert("Erro Interno no Servidor: " + response.data.msg);
        }
      } catch (e) {
        alert("Houve Um erro ao Carrega os Cargos!! " + e.message);
      }
    },
  },
  props: {
    nomePg: String,
  },
  beforeMount() {
    if (this.nomePg == "congregacoes") {
      this.lblInput = "Congregação";
      this.getCongregacoes();
    } else {
      this.lblInput = "Cargo";
      this.getCargos();
    }
  },
});
</script>

<style scoped>
.lblInput {
  font-weight: bold !important;
  font-size: 18px !important;
}
ion-item {
  --padding-start: 0px !important;
  --inner-padding-end: 0px !important;
}
ion-list ion-input {
  color: black !important;
  background-color: #e7edf3 !important;
  font-size: 18px !important;
  padding-inline-start: 5px !important;
}
#infoTituloEditar {
  font-size: 18px !important;
  color: darkslategrey;
}
#titleConfig {
  color: darkslategray;
  font-size: 20px !important;
  font-weight: bold;
}
ion-icon {
  font-size: 30px;
}
.sc-ion-searchbar-ios-h {
  --background: #e7edf3 !important;
}
</style>