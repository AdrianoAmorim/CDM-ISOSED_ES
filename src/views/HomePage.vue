<!-- Pagina Responsavel por iniciar a aplicação contem:
a barra de Ferramentas e a lista de membros cadastrados -->
<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col size="7">
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

            <ion-col size="5">
              <ion-row class="ion-justify-content-between">
                <ion-button
                  @click="buscarMembros(resultBusca)"
                  :disabled="ativarBtnBuscar"
                  fill="clear"
                  size="small"
                  color="primary"
                  class="ion-align-self-start"
                >
                  <ion-icon
                    slot="icon-only"
                    class="iconToolbar"
                    :icon="searchCircle"
                /></ion-button>

                <ion-button
                  fill="clear"
                  color="success"
                  size="small"
                  @click="this.$router.replace('/cadastrar')"
                  class="ion-align-self-end"
                  ><ion-icon
                    slot="icon-only"
                    class="iconToolbar"
                    :icon="personAdd"
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
                        class="
                          ion-justify-content-between ion-align-items-center
                        "
                      >
                        <ion-col size="4">
                          <ion-avatar>
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
                            class="iconButton"
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
      <ion-progress-bar v-else type="indeterminate"></ion-progress-bar>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { searchCircle, personAdd, create } from "ionicons/icons";
import {
  IonImg,
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
      urlServer: "http://192.168.18.4:4041",
      ativarBtnBuscar: true,
      loader: true,
      searchCircle,
      personAdd,
      create,
      listaMembros: null,
      resultBusca: "",
    };
  },
  methods: {
    statusBtnBuscar() {
      if (this.resultBusca != "") {
        this.ativarBtnBuscar = false;
      } else {
        this.ativarBtnBuscar = true;
      }
    },
    async getMembros() {
      const response = await axios.get(`${this.urlServer}/membros`);
      this.listaMembros = response.data;
    },
    async buscarMembros(resultBusca) {
      this.loader = true;
      try {
        const response = await axios.get(`${this.urlServer}/buscar/${resultBusca}`);
       if(response.data.length > 0){
          this.loader = false;
          this.resultBusca = "";
          this.listaMembros = response.data
       }else if(response.data.length == 0){
          alert("Membro não Encontrado!");
          this.getMembros();
       }
         
      } catch (e) {
        alert("Erro Ao Buscar o Membro - " + e.message)
        console.log(e)
        this.getMembros();
      }
    },
  },
  watch: {
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
</style>