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
        <ion-accordion-group
          :multiple="true"
          ref="accordionOpcao"
          :value="toogleAccordion"
        >
          <ion-accordion :toggle-icon="caretDown" value="opcao">
            <ion-item slot="header">
              <ion-text color="secondary">
                <h5>Tipo de Relatório:</h5>
              </ion-text>
            </ion-item>

            <ion-row class="ion-justify-content-start" slot="content">
              <ion-col size="12">
                <ion-radio-group
                  mode="md"
                  v-model="opcSelecionada"
                  @ionChange="configFiltros()"
                >
                  <ion-row class="ion-justify-content-between">
                    <ion-item lines="none" class="diferencaRadioBtn">
                      <ion-label class="lblOpcoes">QUANTIDADE</ion-label>
                      <ion-radio
                        slot="start"
                        value="opcQuantidade"
                        color="success"
                      ></ion-radio>
                    </ion-item>

                    <ion-item lines="none" class="diferencaRadioBtn">
                      <ion-label class="lblOpcoes">LISTAR</ion-label>
                      <ion-radio
                        slot="start"
                        value="opcListar"
                        color="success"
                      ></ion-radio>
                    </ion-item>

                    <ion-item lines="none" class="diferencaRadioBtn">
                      <ion-label class="lblOpcoes">ANIVERSARIANTES</ion-label>
                      <ion-radio
                        slot="start"
                        value="opcAniversariantes"
                        color="success"
                      ></ion-radio>
                    </ion-item>
                  </ion-row>
                </ion-radio-group>
              </ion-col>
            </ion-row>
          </ion-accordion>

          <ion-accordion :toggle-icon="caretDown" value="filtros">
            <ion-item slot="header">
              <ion-text color="secondary">
                <h5>Filtrar Por:</h5>
              </ion-text>
            </ion-item>

            <ion-row class="ion-justify-content-start" slot="content">
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
                          :disabled="ativarFiltros"
                          slot="start"
                          value="cargo"
                          color="secondary"
                        ></ion-radio>
                      </ion-item>

                      <ion-item lines="none" class="diferencaRadioBtn">
                        <ion-label>CARGO e<br />CONGREGAÇÃO</ion-label>
                        <ion-radio
                          :disabled="ativarFiltros"
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
                          :disabled="ativarFiltros"
                          slot="start"
                          value="congregacao"
                          color="secondary"
                        ></ion-radio>
                      </ion-item>

                      <ion-item
                        lines="none"
                        class="diferencaRadioBtn"
                        v-show="ativarFiltroTodos"
                      >
                        <ion-label>TODOS</ion-label>
                        <ion-radio
                          :disabled="ativarFiltros"
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
                        @ionChange="getQuantidade()"
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
          </ion-accordion>
        </ion-accordion-group>

        <ion-row
        v-show="showResultQtd"
          class="
            bgGradiente
            barraResultQtd
            ion-justify-content-center ion-align-items-center
          "
        >
          <ion-col size="6">
            <ion-icon
              class="iconBarraQtd"
              :icon="people"
            />
          </ion-col>
          <ion-col size="6" class="ion-text-end">
            <ion-text id="textResultQtd">---</ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { arrowBackCircle, people, caretDown } from "ionicons/icons";
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
  IonAccordionGroup,
  IonAccordion,
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
    IonAccordionGroup,
    IonAccordion,
  },
  data() {
    return {
      urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
      people,
      caretDown,
      listaGenerica: null,
      listaCongregacoes: null,
      lblSelectGenerico: "",
      ativarSelectGn: false,
      ativarSelectCgr: false,
      selectGnValor: "",
      selectCgrValor: "",
      ativarFiltros: true,
      ativarFiltroTodos: true,
      opcSelecionada: "",
      filtroSelecionado: "",
      toogleAccordion: ["opcao", "filtros"],
      showResultQtd: false
    };
  },
  methods: {
    getQuantidade(){
      if(this.filtroSelecionado == "cargo"){
        console.log(this.filtroSelecionado)
      }else if(this.filtroSelecionado =="congregacao"){
          console.log(this.filtroSelecionado )
      }else if(this.filtroSelecionado == "cargo_congregacao"){
        console.log(this.filtroSelecionado )
      }else{
        console.log(this.filtroSelecionado)
      }
    },
    //CONTROLAR AS ESCOLHAS DO ACCORDION PELO CLICK
    openAccordion() {
      if (this.$refs.accordionOpcao.value == "opcao") {
        this.toogleAccordion = "filtros";
      } else {
        this.toogleAccordion = "opcao";
      }
    },
    //FUNÇÃO PARA ATIVAR OS FILTROS APOS SELECIONAR A OPCAO DE RELATORIO e resetar campos select
    configFiltros() {
      this.lblSelectGenerico = "";
      this.selectGnValor = "";
      this.selectCgrValor = "";
      this.ativarSelectGn = false;
      this.ativarSelectCgr = false;
      this.ativarFiltros = false;
      this.ativarFiltroTodos = true;
      this.filtroSelecionado = "";
      if (this.opcSelecionada == "opcListar") {
        this.ativarFiltroTodos = false;
      }
  
    },

    //FAZ O DIRECIONAMENTO DAS ESCOLHAS DO USUARIO ATRAVES DAS OPCOES DE RELATORIO E FILTROS
    direcionarOpc() {
      if (this.opcSelecionada == "opcQuantidade") {
        if (this.filtroSelecionado == "cargo") {
          this.getCargos();
        } else if (this.filtroSelecionado == "congregacao") {
          this.getCongregacoes();
        } else if (this.filtroSelecionado == "cargo_congregacao") {
          this.getCargos();
          this.getCongregacoes();
        } else if (this.filtroSelecionado == "todos") {
          console.log("filtro Qtd todos");
        }
      } else if (this.opcSelecionada == "opcListar") {
        if (this.filtroSelecionado == "cargo") {
          this.getCargos();
        } else if (this.filtroSelecionado == "congregacao") {
          this.getCongregacoes();
        } else if (this.filtroSelecionado == "cargo_congregacao") {
          this.getCargos();
          this.getCongregacoes();
        }
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
          if (this.filtroSelecionado == "cargo_congregacao"){
            console.log("entro na opcao certa")
            this.listaCongregacoes = response.data;
            this.ativarSelectCgr = true;
          }else{
            this.listaGenerica = response.data;
            this.lblSelectGenerico = "CONGREGAÇÕES";
            this.ativarSelectGn = true;
          }
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
});
</script>
<style scoped>
.bgGradiente {
  background: linear-gradient(110deg, #3a6b8e 30%, #3289c7 45%);
}
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

.barraResultQtd {
  margin-top: 10px;
  border-radius: 10px;
}
#textResultQtd {
  margin-right: 10px;
  font-size: 44px;
  font-weight: bold;
  color: #ffffff;
}
.iconBarraQtd {
  margin-left: 10px;
  font-size: 38px;
  color: #dde4ff;
}
ion-radio {
  margin-left: 1px;
  margin-right: 3px;
}
</style>
