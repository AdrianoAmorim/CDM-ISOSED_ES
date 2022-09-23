<!-- Pagina Responsavel por iniciar a aplicação contem:
a barra de Ferramentas e a lista de TODOS OS membros cadastrados -->
<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col size="10">
              <ion-row class="ion-justify-content-center">
                <ion-searchbar
                  @ionChange="statusBtnBuscar()"
                  color="light"
                  show-cancel-button="never"
                  placeholder="Buscar Membro"
                  style="margin: 0; padding: 0"
                  v-model="resultBusca"
                />
              </ion-row>
            </ion-col>

            <ion-col size="2">
              <ion-row class="ion-justify-content-end">
                <ion-button
                  @click="buscarMembros(resultBusca)"
                  :disabled="ativarBtnBuscar"
                  fill="clear"
                  size="small"
                  color="primary"
                >
                  <ion-icon
                    slot="icon-only"
                    class="iconToolbar"
                    :icon="searchCircle"
                /></ion-button>
              </ion-row>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="ion-align-items-center" size="12">
              <ion-row class="ion-justify-content-end">
              <ion-button
                fill="clear"
                color="success"
                size="small"
                router-direction="forward"
                @click="this.$router.replace('/cadastrar')"
                ><ion-icon
                  slot="icon-only"
                  class="iconToolbar"
                  :icon="personAdd"
              /></ion-button>

                 <ion-button
                 disabled="true"
                fill="clear"
                color="secondary"
                size="small"
                ><ion-icon
                  slot="icon-only"
                  class="iconToolbar"
                  :icon="newspaper"
              /></ion-button>

                 <ion-button
                fill="clear"
                color="secondary"
                size="small"
                @click="this.$router.replace('/configuracoes')"
                ><ion-icon
                  slot="icon-only"
                  class="iconToolbar"
                  :icon="construct"
              /></ion-button>

              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid v-if="!loader">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12">
            <ion-list>
              <ion-row
                class="ion-justify-content-evenly"
                v-for="Membro in listaMembros"
                :key="Membro.id"
              >
                <ion-col size="12">
                  <ion-item>
                    <ion-col size="9">
                      <ion-row
                        class="ion-justify-content-between ion-align-items-center ">
                        <ion-col size="4">
                          <ion-avatar @click="openModal(Membro.id)">
                            <ion-img
                              :class="Membro.url_foto ? '' : 'fotoMembro'"
                              :src="
                                Membro.url_foto
                                  ? Membro.url_foto
                                  : '/img/camera.png'
                              "
                              alt="Avatar do Membro"
                            />
                          </ion-avatar>
                        </ion-col>

                        <ion-col size="8">
                          <ion-label
                            class="ion-text-wrap"
                            style="overflow: visible"
                          >
                            {{ Membro.nome }}
                          </ion-label>
                          <ion-label color="danger"
                            ><b>{{ Membro.cargo.nome }}</b></ion-label
                          >
                        </ion-col>
                      </ion-row>
                    </ion-col>

                    <ion-col size="3">
                      <ion-row class="ion-justify-content-end">
                        <ion-button
                          @click="
                            this.$router.push('/editar/' + `${Membro.id}`)
                          "
                          color="secondary"
                          fill="clear"
                          size="large"
                        >
                          <ion-icon
                            slot="icon-only"
                            class="iconButtonEdit"
                            :icon="create"
                          />
                        </ion-button>
                      </ion-row>
                    </ion-col>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div v-else>
        <ion-progress-bar type="indeterminate"> </ion-progress-bar>
        <h3 id="tagAguardeLoader">Aguarde...</h3>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import moment from "moment";
import ModalViewMembro from "@/components/ModalViewMembro.vue";
import axios from "axios";
import { searchCircle, personAdd, create,construct,newspaper} from "ionicons/icons";
import {
  IonImg,
  alertController,
  IonHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonIcon,
  IonPage,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonProgressBar,
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonProgressBar,
    IonIcon,
    IonPage,
    IonToolbar,
    IonHeader,
    IonContent,
    IonSearchbar,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
  },
  data() {
    return {
      urlServer: "https://isosed-server.herokuapp.com",
      //urlServer: "http://192.168.18.4:4041",
      ativarBtnBuscar: true,
      loader: true,
      searchCircle,
      personAdd,
      create,
      construct,
      newspaper,
      listaMembros: null,
      resultBusca: "",
      statusModal: false,
      idMembro: null,
    };
  },
  methods: {
    //ABRIR O MODAL.. PARA EXIBIR OS DADOS DO MEMBRO SELECIONADO
    async openModal(id) {
      this.loader = true;
      const returnMembro = await this.getMembroSelecionado(id);
      if (returnMembro.id > 0) {
        var dtNascimento = moment(returnMembro.dtNascimento).format(
          "DD/MM/YYYY"
        );
        var dtBatismo = moment(returnMembro.dtBatismo).format("DD/MM/YYYY");
        returnMembro.dtNascimento = dtNascimento;
        returnMembro.dtBatismo = dtBatismo;

        const modal = await modalController.create({
          component: ModalViewMembro,
          componentProps: { idMembro: id, membro: returnMembro },
          cssClass: "modalViewMembro",
        });
        modal.present();
        const { role } = await modal.onWillDismiss();
        if (role === "confirm") {
          this.loader = false;
        }
      } else if (returnMembro.id == 0) {
        this.alertInfoSistema(
          "AVISO",
          "",
          "Não Foi Possível encontrar o Membro Selecionado!!"
        );
      } else if (returnMembro.error == true) {
        this.alertInfoSistema(
          "AVISO",
          "",
          "Houve um Erro ao buscar o Membro para Visualização: " +
            returnMembro.msg
        );
      }
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
    //PARA DEFINIR A ATIVACAO DO BOTAO BUSCAR QUANDO NAO HOUVER NADA DIGITADO NO CAMPO DE BUSCA
    statusBtnBuscar() {
      if (this.resultBusca != "") {
        this.ativarBtnBuscar = false;
      } else {
        this.ativarBtnBuscar = true;
      }
    },
    //BUSCAR O MEMBRO SELECIONADO PRA EXIBIR AS INFORMAÇÕES NO MODAL
    async getMembroSelecionado(id) {
      try {
        const response = await axios.get(`${this.urlServer}/membro/${id}`);
        return response.data;
      } catch (e) {
        alert(
          "Houve Um erro Ao Buscar o Membro selecionado para Edição!! " +
            e.message
        );
      }
    },
    //BUSCA TODOS OS MEMBROS CADASTRADO, CASO NÃO HOUVER NENHUM REDIRECIONA PARA O CADASTRO
    async getMembros() {
      try {
        const response = await axios.get(`${this.urlServer}/membros`);
        if (response.data.length > 0) {
          this.listaMembros = response.data;
        } else if (response.data.length == 0) {
          alert("Nenhum Membro Cadastrado!! Favor Cadastrar um novo Membro!");
          this.$router.replace("/cadastrar");
        } else if (response.data.error == true) {
          alert("Error no Servidor: " + response.data.msg);
        }
      } catch (e) {
        alert("Erro ao Listar Todos os Membros: " + e.message);
        this.getMembros();
      }
    },
    /*EFETUA UMA BUSCA AO MEMBRO DIGITADO NO CAMPO DE BUSCA, CASO NAO ACHE RECARREGA A LISTA COM TODOS
    MEMBROS*/
    async buscarMembros(resultBusca) {
      this.loader = true;
      try {
        const response = await axios.get(
          `${this.urlServer}/buscar?nome=${resultBusca}`
        );

        if (response.data.length > 0) {
          this.loader = false;
          this.resultBusca = "";
          this.listaMembros = response.data;
        } else if (response.data.length == 0) {
          this.alertInfoSistema("AVISO!!", "", "Membro não Encontrado!!");
          this.getMembros();
        } else if (response.data.error == true) {
          this.alertInfoSistema(
            "ERROR!!",
            "Error no Servidor: ",
            response.data.msg
          );
          this.getMembros();
        }
      } catch (e) {
        alert("Erro Ao Buscar o Membro - " + e.message);
        this.getMembros();
      }
    },
  },
  watch: {
    //OBSERVA SE A VARIAVEL NAO ESTIVER VAZIA DESABILITA O LOADER
    listaMembros() {
      if (this.listaMembros != null) {
        this.loader = false;
      }
    },
  },

  ionViewWillEnter() {
    this.getMembros();
  },
  ionViewDidLeave() {
    this.loader = true;
  },
});
</script>

<style scoped>
#tagAguardeLoader {
  color: #427aa1;
  margin: 15px;
}
.iconButtonEdit {
  font-size: 36px;
  object-fit: fill;
}
</style>