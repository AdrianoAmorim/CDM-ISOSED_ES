<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-label class="tituloPagina">Relatórios</ion-label>
        <ion-button
          fill="clear"
          router-direction="back"
          slot="end"
          size="small"
          color="primary"
          router-link="/"
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
        <ion-row class="ion-justify-content-start">
          <ion-col size="12">
            <ion-text color="secondary">
              <h5>Selecione o Tipo de Relatório Desejado:</h5>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-start borderModalView">
          <ion-col size="12">
            <ion-radio-group mode="md" v-model="opcSelecionada">
              <ion-row class="ion-justify-content-between">
                <ion-item lines="none" class="diferencaRadioBtn">
                  <ion-label class="lblOpcoes">QUANTIDADE</ion-label>
                  <ion-radio
                    @click="ativarFiltros()"
                    slot="start"
                    value="opcQuantidade"
                    color="success"
                  ></ion-radio>
                </ion-item>

                <ion-item lines="none" class="diferencaRadioBtn">
                  <ion-label class="lblOpcoes">LISTAR</ion-label>
                  <ion-radio
                    @click="ativarFiltros()"
                    slot="start"
                    value="opcListar"
                    color="success"
                  ></ion-radio>
                </ion-item>

                <ion-item lines="none" class="diferencaRadioBtn">
                  <ion-label class="lblOpcoes">ANIVERSARIANTES</ion-label>
                  <ion-radio
                    @click="ativarFiltros()"
                    slot="start"
                    value="opcAniversariantes"
                    color="success"
                  ></ion-radio>
                </ion-item>
              </ion-row>
            </ion-radio-group>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-start">
          <ion-col size="12">
            <ion-text color="secondary">
              <h5>Filtrar Por:</h5>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-start borderModalView">
          <ion-col size="12">
            <ion-radio-group
              mode="md"
              v-model="filtroSelecionado"
              @ionChange="direcionarOpc()"
            >
              <ion-row class="ion-justify-content-center">
                <ion-col size="6" class="ion-align-items-center">
                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CARGO</ion-label>
                    <ion-radio
                      :disabled="ativarFiltro"
                      slot="start"
                      value="cargo"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>

                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CARGO e<br />CONGREGAÇÃO</ion-label>
                    <ion-radio
                      :disabled="ativarFiltro"
                      slot="start"
                      value="cargo_congregacao"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>
                </ion-col>

                <ion-col size="6" class="ion-align-items-center">
                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CONGREGAÇÃO</ion-label>
                    <ion-radio
                      :disabled="ativarFiltro"
                      slot="start"
                      value="congregacao"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>

                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>TODOS</ion-label>
                    <ion-radio
                      :disabled="ativarFiltro"
                      slot="start"
                      value="todos"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-radio-group>
          </ion-col>

          <ion-col size="12">
            <ion-row class="ion-justify-content-start">
              <ion-col size="6">
                <ion-item mode="md" v-show="ativarSelectGn">
                  <ion-label position="stacked"
                    >{{ lblSelectGenerico }}
                  </ion-label>
                  <ion-select
                    v-model="selectGnValor"
                    color="secondary"
                    placeholder="Selecione"
                    cancel-text="CANCELAR"
                    ok-text="OK"
                  >
                    <ion-select-option
                      v-for="Item in listaGenerica"
                      :key="Item.id"
                      :value="Item.id"
                      >{{ Item.nome }}</ion-select-option
                    >
                  </ion-select>
                </ion-item>
              </ion-col>

              <ion-col size="6">
                <ion-item mode="md" v-show="ativarSelectCgr">
                  <ion-label position="stacked">CONGREGAÇÕES</ion-label>
                  <ion-select
                    v-model="selectCgrValor"
                    color="secondary"
                    placeholder="Selecione"
                    cancel-text="CANCELAR"
                    ok-text="OK"
                  >
                    <ion-select-option
                      v-for="Item in listaCongregacoes"
                      :key="Item.id"
                      :value="Item.id"
                      >{{ Item.nome }}</ion-select-option
                    >
                  </ion-select>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <ion-col size="12">
            <ion-text color="success">
              <h5>
                Total de
                <ion-text id="textResultQtd" color="danger">00</ion-text>
                Membros Cadastrados
              </h5>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { arrowBackCircle } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/vue";
export default defineComponent({
  name: "relatoriosPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonRadioGroup,
    IonRadio,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
  },
  data() {
    return {
      urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
      listaGenerica: null,
      listaCongregacoes: null,
      lblSelectGenerico: "",
      ativarSelectGn: false,
      selectGnValor: "",
      selectCgrValor: "",
      ativarSelectCgr: false,
      ativarFiltro: true,
      opcSelecionada: "",
      filtroSelecionado: "",
    };
  },
  methods: {
    //FUNÇÃO PARA ATIVAR OS FILTROS APOS SELECIONAR A OPCAO DE RELATORIO
    ativarFiltros() {
      this.ativarFiltro = false;
    },

    //FAZ O DIRECIONAMENTO DAS ESCOLHAS DO USUARIO ATRAVES DAS OPCOES DE RELATORIO E FILTROS
    direcionarOpc() {
      if (this.opcSelecionada == "opcQuantidade") {
        if (this.filtroSelecionado == "cargo") {
          console.log("filtro Qtd cargo");
          this.getCargos();
        } else if (this.filtroSelecionado == "congregacao") {
          console.log("filtro Qtd congregacao");
          this.getCongregacoes();
        }else if (this.filtroSelecionado == "cargo_congregacao") {
          console.log("filtro Qtd cargo_congregacao");
        }else if (this.filtroSelecionado == "todos") {
          console.log("filtro Qtd todos");
        }
      } else if (this.opcSelecionada == "congregacao") {
        console.log("dentro da Opc Congregacao");
      } else if (this.opcSelecionadaQtd == "cargo_congregacaoQtd") {
        this.getCargos();
      }
    },

    //BUSCA TODOS OS CARGOS CADASTRADOS 
    async getCargos() {
      this.lblSelectGenerico = "";
      this.selectGnValor = "";
      this.selectCgrValor = "";
      this.ativarSelectGn = false;
      this.ativarSelectCgr = false;
      try {
        const response = await axios.get(`${this.urlServer}/cargos`);
        if (response.data.length > 0) {
          this.listaGenerica = response.data;
          this.lblSelectGenerico = "CARGOS";
          this.ativarSelectGn = true;
        } else if (response.data.length == 0) {
          this.alertInfoSistema("AVISO", "", "Nenhum cargo Cadastrado!");
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "Error", "" + response.data.msg);
        }
      } catch (e) {
        this.alertInfoSistema("AVISO", "Error", "" + e.message);
      }
    },

    //BUSCA TODAS AS CONGREGAÇÕES CADASTRADAS
    async getCongregacoes() {
      this.lblSelectGenerico = "";
      this.selectGnValor = "";
      this.selectCgrValor = "";
      this.ativarSelectGn = false;
      this.ativarSelectCgr = false;
      try {
        const response = await axios.get(`${this.urlServer}/congregacoes`);
        if (response.data.length > 0) {
          this.listaGenerica = response.data;
          this.lblSelectGenerico = "CONGREGAÇÕES";
          this.ativarSelectGn = true;
        } else if (response.data.length == 0) {
          this.alertInfoSistema("AVISO", "", "Nenhuma Congregação Cadastrado!");
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "Error", "" + response.data.msg);
        }
      } catch (e) {
        this.alertInfoSistema("AVISO", "Error", "" + e.message);
      }
    },
  },
  watch: {},
});
</script>
<style scoped>
.lblOpcoes {
  font-size: 17px;
}
ion-label {
  overflow: visible !important;
  font-weight: bold;
}
h5 {
  overflow: visible;
  font-weight: bold;
  font-size: 17px;
}
#textResultQtd {
  font-size: 24px;
}
ion-radio {
  margin-left: 1px;
  margin-right: 3px;
}
</style>
