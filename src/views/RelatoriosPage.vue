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
                        color="secondary"
                      ></ion-radio>
                    </ion-item>

                    <ion-item lines="none" class="diferencaRadioBtn">
                      <ion-label class="lblOpcoes">LISTAR</ion-label>
                      <ion-radio
                        slot="start"
                        value="opcListar"
                        color="secondary"
                      ></ion-radio>
                    </ion-item>

                    <ion-item lines="none" class="diferencaRadioBtn">
                      <ion-label class="lblOpcoes">ANIVERSARIANTES</ion-label>
                      <ion-radio
                        slot="start"
                        value="opcAniversariantes"
                        color="secondary"
                      ></ion-radio>
                    </ion-item>
                  </ion-row>
                </ion-radio-group>
              </ion-col>
            </ion-row>
          </ion-accordion>

          <ion-accordion
            :toggle-icon="caretDown"
            value="filtros"
            v-show="opcSelecionada != 'opcAniversariantes'"
          >
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
                        v-show="ativarSemFiltro"
                      >
                        <ion-label>S/ FILTRO</ion-label>
                        <ion-radio
                          :disabled="ativarFiltros"
                          slot="start"
                          value="semFiltro"
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
                        @ionChange="direcionarRequisicoes()"
                        color="secondary"
                        placeholder="Selecione"
                        cancel-text="CANCELAR"
                        ok-text="OK"
                        :interface-options="optSlcAlert"
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
                        @ionChange="direcionarRequisicoes()"
                        v-model="selectCgrValor"
                        color="secondary"
                        placeholder="Selecione"
                        cancel-text="CANCELAR"
                        ok-text="OK"
                        :interface-options="optSlcAlert"
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
                  <ion-row class="ion-align-items-center">
                    <ion-col size="12" v-show="showAvisoError">
                      <ion-icon id="iconAvisoError" :icon="warning" />
                      <ion-text id="avisoError">{{ textAvisoError }} </ion-text>
                    </ion-col>
                  </ion-row>
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
            <ion-icon class="iconBarraQtd" :icon="people" />
          </ion-col>
          <ion-col size="6" class="ion-text-end">
            <ion-text id="textResultQtd">{{ resultQtd }}</ion-text>
          </ion-col>
        </ion-row>

        <ion-row
          class="ion-justify-content-center"
          v-show="showSlcMesAniversariantes"
        >
          <ion-col size="11" size-md="8" size-lg="5">
            <ion-select
              mode="md"
              placeholder="ESCOLHA O MÊS"
              id="slcMesAniversariante"
              v-model="slcMesValor"
              cancel-text="CANCELAR"
              ok-text="OK"
              :interface-options="optSlcMes"
              @ionChange="direcionarRequisicoes()"
            >
              <ion-select-option
                v-for="Mes in listaMes"
                :key="Mes.id"
                :value="Mes.id"
              >
                {{ Mes.nome }}</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div v-if="!loader">
        <RelatorioListarMembros
          :showList="showListar"
          :listaMembros="listaMembros"
          :tituloListar="tituloListar"
        />
      </div>
      <div v-else>
        <ion-progress-bar type="indeterminate"> </ion-progress-bar>
        <h3 class="tagAguardeLoader">Gerando PDF...</h3>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button
          color="success"
          @click="downloadPdf()"
          :disabled="desativarBtnPdf"
        >
          <ion-icon :icon="newspaper"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import html2pdf from "html2pdf.js";
import RelatorioListarMembros from "@/components/RelatorioListarMembros.vue";
import {
  arrowBackCircle,
  people,
  caretDown,
  warning,
  newspaper,
} from "ionicons/icons";
import {
  alertController,
  IonPage,
  IonFab,
  IonProgressBar,
  IonFabButton,
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
    RelatorioListarMembros,
    IonPage,
    IonHeader,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonButton,
    IonProgressBar,
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
      urlServer: "http://127.0.0.1:4041",
      arrowBackCircle,
      newspaper,
      people,
      caretDown,
      warning,
      listaGenerica: null,
      listaCongregacoes: null,
      listaMembros: null,
      lblSelectGenerico: null,
      ativarSelectGn: false,
      ativarSelectCgr: false,
      selectGnValor: "",
      selectCgrValor: "",
      ativarFiltros: true,
      ativarSemFiltro: true,
      opcSelecionada: "",
      filtroSelecionado: "",
      toogleAccordion: ["opcao", "filtros"],
      showResultQtd: false,
      resultQtd: 0,
      textAvisoError: null,
      showAvisoError: false,
      showListar: false,
      loader: false,
      tituloListar: "-",
      listaMes: [
        { id: 1, nome: "Janeiro" },
        { id: 2, nome: "Fevereiro" },
        { id: 3, nome: "Março" },
        { id: 4, nome: "Abril" },
        { id: 5, nome: "Maio" },
        { id: 6, nome: "Junho" },
        { id: 7, nome: "Julho" },
        { id: 8, nome: "Agosto" },
        { id: 9, nome: "Setembro" },
        { id: 10, nome: "Outubro" },
        { id: 11, nome: "Novembro" },
        { id: 12, nome: "Dezembro" },
      ],
      desativarBtnPdf: true,
      showSlcMesAniversariantes: false,
      slcMesValor: null,
      optSlcMes: {
        header: "Mês",
        cssClass: "alertSelects",
      },
      optSlcAlert: {
        cssClass: "alertSelects",
      },
    };
  },
  methods: {
    //pega a tabela gerada pelo relatorio de listar, e gera um pdf
    downloadPdf() {
      this.loader = true;
      this.desativarBtnPdf = true;
      var opt = {
        margin: 10,
      };
      html2pdf()
        .set({ opt, pagebreak: { mode: "avoid-all" } })
        .from(document.getElementById("gerarPdf").innerHTML)
        .save()
        .then(
          () => {
            this.alertInfoSistema("AVISO", "", "PDF Criado Com Sucesso!");
            this.loader = false;
          },
          (error) => {
            this.alertInfoSistema(
              "AVISO",
              "",
              "Erro Ao Salvar o PDF! " + error
            );
          }
        );
    },
    //CRIA UMA JANELA DE AVISO COM PARAMETROS ...
    async alertInfoSistema(header, subHeader, message) {
      const alert = await alertController.create({
        cssClass: "alert-info",
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ["OK"],
      });
      await alert.present();
    },
    //FAZ O DIRECIONAMENTO DAS REQUIZICOES AO SERVIDOR, DE ACORDO COM AS OPCOES E FILTROS SELECIONADOS
    direcionarRequisicoes() {
      if (this.filtroSelecionado == "semFiltro") {
        this.getQtdMembros();
      } else if (this.opcSelecionada == "opcAniversariantes") {
        this.getAniversariantes();
      } else if (this.selectGnValor == "" && this.selectCgrValor == "") {
        void 0;
      } else if (this.opcSelecionada == "opcQuantidade") {
        if (this.filtroSelecionado == "cargo") {
          this.getQtdMembrosCargo();
        } else if (this.filtroSelecionado == "congregacao") {
          this.getQtdMembrosCongregacao();
        } else if (this.filtroSelecionado == "cargo_congregacao") {
          if (this.selectGnValor == "" || this.selectCgrValor == "") {
            this.textAvisoError =
              "Selecione Cargo e Congregação para consultar!";
            this.showAvisoError = true;
          } else {
            this.getQtdMembrosCongregacaoCargo();
          }
        }
      } else if (this.opcSelecionada == "opcListar") {
        if (this.filtroSelecionado == "cargo") {
          this.getMembrosCargo();
        } else if (this.filtroSelecionado == "congregacao") {
          this.getMembrosCongregacao();
        } else if (this.filtroSelecionado == "cargo_congregacao") {
          if (this.selectGnValor == "" || this.selectCgrValor == "") {
            this.textAvisoError =
              "Selecione Cargo e Congregação para consultar!";
            this.showAvisoError = true;
          } else {
            this.getMembrosCargoCongregacao();
          }
        }
      }
    },

    //FUNÇÃO PARA ATIVAR OS FILTROS APOS SELECIONAR A OPCAO DE RELATORIO e reseta os campos select
    configFiltros() {
      this.toogleAccordion = "";
      this.lblSelectGenerico = null;
      this.selectGnValor = "";
      this.selectCgrValor = "";
      this.ativarSelectGn = false;
      this.ativarSelectCgr = false;
      this.ativarFiltros = false;
      this.ativarSemFiltro = true;
      this.filtroSelecionado = "";
      this.showResultQtd = false;
      this.showAvisoError = false;
      this.showListar = false;
      this.desativarBtnPdf = true;
      this.showSlcMesAniversariantes = false;
      this.slcMesValor = null;
      if (this.opcSelecionada == "opcAniversariantes") {
        this.toogleAccordion = "opcao";
        this.showSlcMesAniversariantes = true;
      } else if (this.opcSelecionada == "opcListar") {
        this.ativarSemFiltro = false;
        this.toogleAccordion = "filtros";
      } else {
        this.toogleAccordion = "filtros";
      }
    },

    /*FAZ O DIRECIONAMENTO DAS ESCOLHAS DO USUARIO ATRAVES dos FILTROS
          para carregar os selects de opcoes de cargo e congregacoes*/
    direcionarOpc() {
      this.showResultQtd = false;
      this.showAvisoError = false;
      this.showListar = false;
      this.toogleAccordion = "filtros";
      if (this.filtroSelecionado == "cargo") {
        this.getCargos();
      } else if (this.filtroSelecionado == "congregacao") {
        this.getCongregacoes();
      } else if (this.filtroSelecionado == "cargo_congregacao") {
        this.getCargos();
        this.getCongregacoes();
      } else if (this.filtroSelecionado == "semFiltro") {
        this.lblSelectGenerico = null;
        this.selectGnValor = "";
        this.selectCgrValor = "";
        this.ativarSelectGn = false;
        this.ativarSelectCgr = false;
        this.direcionarRequisicoes();
      }
    },

    //------------------------------------------------------------------------------------
    //METODOS DE REQUIZICÕES

    //BUSCA TODOS OS CARGOS CADASTRADOS
    async getCargos() {
      this.lblSelectGenerico = null;
      this.selectGnValor = "";
      this.selectCgrValor = "";
      this.ativarSelectGn = false;
      this.ativarSelectCgr = false;
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(`${this.urlServer}/cargos`, {
          headers: {
            Authorization: `token ${auth}`,
          },
        });
        if (response.data.length > 0) {
          this.listaGenerica = response.data;
          this.lblSelectGenerico = "CARGOS";
          this.ativarSelectGn = true;
        } else if (response.data.length == 0) {
          this.alertInfoSistema("AVISO", "", "Nenhum cargo Cadastrado!");
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
        }
      } catch (e) {
        this.alertInfoSistema("AVISO", "", e.message);
      }
    },

    //BUSCA TODAS AS CONGREGAÇÕES CADASTRADAS
    async getCongregacoes() {
      this.lblSelectGenerico = null;
      this.selectGnValor = "";
      this.selectCgrValor = "";
      this.ativarSelectGn = false;
      this.ativarSelectCgr = false;
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(`${this.urlServer}/congregacoes`, {
          headers: {
            Authorization: `token ${auth}`,
          },
        });
        if (response.data.length > 0) {
          if (this.filtroSelecionado == "cargo_congregacao") {
            this.listaCongregacoes = response.data;
            this.ativarSelectCgr = true;
          } else {
            this.listaGenerica = response.data;
            this.lblSelectGenerico = "CONGREGAÇÕES";
            this.ativarSelectGn = true;
          }
        } else if (response.data.length == 0) {
          this.alertInfoSistema("AVISO", "", "Nenhuma Congregação Cadastrado!");
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
        }
      } catch (e) {
        this.alertInfoSistema("AVISO", "", e.message);
      }
    },

    async getQtdMembros() {
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_qtdMembros`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );
        if (response.data._all > 0) {
          this.resultQtd = response.data._all;
          this.showResultQtd = true;
        } else if (response.data._all == 0) {
          this.resultQtd = 0;
          this.showResultQtd = false;
          this.alertInfoSistema("AVISO", "", "Nenhum Membro Cadastrado!");
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
          this.resultQtd = 0;
        }
      } catch (e) {
        this.alertInfoSistema("AVISO","", e.message);
      }
    },
    async getQtdMembrosCargo() {
      var idCargo = this.selectGnValor.toString();
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_qtdMembros_cargo?id=${idCargo}`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );

        if (response.data._all > 0) {
          this.resultQtd = response.data._all;
          this.showResultQtd = true;
        } else if (response.data._all == 0) {
          this.resultQtd = 0;
          this.showResultQtd = false;
          this.alertInfoSistema(
            "AVISO",
            "",
            "Nenhum Membro com Este Cargo Cadastrado!"
          );
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
          this.resultQtd = 0;
        }
      } catch (e) {
        this.alertInfoSistema("AVISO", "Error", "" + e);
      }
    },
    async getQtdMembrosCongregacao() {
      var idCongregacao = this.selectGnValor.toString();
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_qtdMembros_congregacao?id=${idCongregacao}`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );

        if (response.data._all > 0) {
          this.resultQtd = response.data._all;
          this.showResultQtd = true;
        } else if (response.data._all == 0) {
          this.resultQtd = 0;
          this.showResultQtd = false;
          this.alertInfoSistema(
            "AVISO",
            "",
            "Nenhum Membro com Esta Congregação Cadastrada!"
          );
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO","", response.data.msg);
          this.resultQtd = 0;
        }
      } catch (e) {
        this.alertInfoSistema("AVISO","",e.message);
      }
    },
    async getQtdMembrosCongregacaoCargo() {
      var idCargo = this.selectGnValor.toString();
      var idCongregacao = this.selectCgrValor.toString();
      const auth = sessionStorage.getItem("token");

      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_qtdMembros_cargo_congregacao?idCargo=${idCargo}&idCongregacao=${idCongregacao}`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );

        if (response.data._all > 0) {
          this.resultQtd = response.data._all;
          this.showAvisoError = false;
          this.showResultQtd = true;
        } else if (response.data._all == 0) {
          this.resultQtd = 0;
          this.showAvisoError = false;
          this.showResultQtd = false;
          this.alertInfoSistema("AVISO", "", "Nenhum Membro Cadastrada!");
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
          this.resultQtd = 0;
        }
      } catch (e) {
        this.alertInfoSistema("AVISO","", + e.message);
      }
    },

    async getMembrosCargo() {
      const idCargo = this.selectGnValor.toString();
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_membros_cargo?idCargo=${idCargo}`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );

        if (response.data.length > 0) {
          this.listaMembros = response.data;
          this.toogleAccordion = "";
          this.tituloListar = "por Cargo";
          this.showListar = true;
          this.desativarBtnPdf = false;
        } else if (response.data.length == 0) {
          this.desativarBtnPdf = true;
          this.showListar = false;
          this.toogleAccordion = "filtros";
          this.alertInfoSistema(
            "AVISO",
            "",
            "Nenhum membro cadastrado com este cargo!!"
          );
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
          this.resultQtd = 0;
          this.desativarBtnPdf = true;
        }
      } catch (e) {
        this.alertInfoSistema("AVISO","",e.message);
      }
    },

    async getMembrosCongregacao() {
      const idCongregacao = this.selectGnValor.toString();
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_membros_congregacao?idCongregacao=${idCongregacao}`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );

        if (response.data.length > 0) {
          this.listaMembros = response.data;
          this.toogleAccordion = "";
          this.tituloListar = "por Congregação";
          this.showListar = true;
          this.desativarBtnPdf = false;
        } else if (response.data.length == 0) {
          this.showListar = false;
          this.desativarBtnPdf = true;
          this.toogleAccordion = "filtros";
          this.alertInfoSistema(
            "AVISO",
            "",
            "Nenhum membro cadastrado Nesta Congregação!!"
          );
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
        }
      } catch (e) {
        this.alertInfoSistema("AVISO", "", e.message);
      }
    },

    async getMembrosCargoCongregacao() {
      const idCargo = this.selectGnValor.toString();
      const idCongregacao = this.selectCgrValor.toString();
      const auth = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${this.urlServer}/relatorio_membros_congregacao_cargo?idCargo=${idCargo}&idCongregacao=${idCongregacao}`,
          {
            headers: {
              Authorization: `token ${auth}`,
            },
          }
        );
        if (response.data.length > 0) {
          this.listaMembros = response.data;
          this.tituloListar = "por Cargo e Congregação";
          this.toogleAccordion = "";
          this.showAvisoError = false;
          this.showListar = true;
          this.desativarBtnPdf = false;
        } else if (response.data.length == 0) {
          this.toogleAccordion = "filtros";
          this.showAvisoError = false;
          this.showListar = false;

          this.desativarBtnPdf = true;
          this.alertInfoSistema(
            "AVISO",
            "",
            "Nenhum Membro Cadastrado com essas Informações!!"
          );
        } else if (response.data.error == true) {
          this.alertInfoSistema("AVISO", "", response.data.msg);
        }
      } catch (e) {
        this.alertInfoSistema("AVISO","", e.message);
      }
    },
    async getAniversariantes() {
      const auth = sessionStorage.getItem("token");
      if (this.slcMesValor == null) {
        void 0;
      } else {
        try {
          const response = await axios.get(
            `${this.urlServer}/aniversariantes?mes=${this.slcMesValor}`,
            {
              headers: {
                Authorization: `token ${auth}`,
              },
            }
          );
          if (response.data.length > 0) {
            this.listaMembros = response.data;
            this.tituloListar = "Aniversariantes";
            this.toogleAccordion = "";
            this.showListar = true;
            this.desativarBtnPdf = false;
          } else if (response.data.length == 0) {
            this.showListar = false;
            this.desativarBtnPdf = true;
            this.alertInfoSistema(
              "AVISO",
              "",
              "Nenhum Membro Faz Aniversário neste mês!!"
            );
          } else if (response.data.error == true) {
            this.alertInfoSistema("AVISO", "",response.data.msg);
          }
        } catch (e) {
           this.alertInfoSistema("ERROR", "",e.message);
        }
      }
    },
  },
});
</script>
<style scoped>
/*ESTILO DO SELECT DO MES DO ANIVERSARIO */
#slcMesAniversariante {
  background: linear-gradient(110deg, #3a6b8e 30%, #3289c7 45%);
  opacity: 0.8;
  text-align: center;
  border-radius: 20px;
  --padding-start: 0px;
}
#slcMesAniversariante::part(placeholder) {
  color: #fcf8f8;
  opacity: 1;
  font-size: 18px;
  font-weight: 700;
}
#slcMesAniversariante::part(text) {
  color: #fcf8f8;
  font-size: 18px;
  font-weight: 700;
}
#slcMesAniversariante::part(icon) {
  display: none;
}
/*--------------------------------------------------------- */
/*ESTILO DA BARRA DE RESULTADO DA QTD DE MEMBROS */
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
/* ----------------------------------------------- */
/*ESTILO DO AVISO PARA LEMBRAR DE SELECIONAR OS 2 VALORES NO FILTRO */
#avisoError {
  white-space: normal;
  color: #eb445a;
  font-weight: bold;
  font-size: 18px;
}
#iconAvisoError {
  font-size: 18px;
  color: #c8e00d;
  margin-right: 3px;
}
/*----------------------------------------------------- */
ion-radio {
  margin-left: 1px;
  margin-right: 3px;
}
ion-fab-button ion-icon {
  color: #fff;
}
.bgGradiente {
  background: linear-gradient(110deg, #3a6b8e 30%, #3289c7 45%);
  opacity: 0.8;
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
</style>
