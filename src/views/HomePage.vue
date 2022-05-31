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
                  color="light"
                  show-cancel-button="never"
                  placeholder="Buscar Membro"
                  style="margin: 0; padding: 0"
                />
              </ion-row>
            </ion-col>

            <ion-col size="5">
              <ion-row class="ion-justify-content-end">
                <ion-button
                disabled
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

    <ion-content >
      <ion-grid  v-if="loader">

        <ion-row class="ion-justify-content-center" >
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
                        class="ion-justify-content-between ion-align-items-center">
                        <ion-col size="4">
                          <ion-avatar>
                            <ion-img :src="`${Membro.url_foto}`" alt="Avatar do Membro" />
                          </ion-avatar>
                        </ion-col>

                        <ion-col size="8">
                          <ion-label class="ion-text-wrap" style="overflow: visible">
                            {{ Membro.nome }}
                          </ion-label>
                          <ion-label color="danger"
                            ><b>{{ Membro.cargo_membro.nome }}</b></ion-label
                          >
                        </ion-col>
                      </ion-row>
                    </ion-col>

                    <ion-col size="3">
                      <ion-row class="ion-justify-content-end">
                        <ion-button
                          @click="this.$router.push('/editar/'+`${Membro.id}`)"
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
  IonProgressBar
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
    IonAvatar
  },
  data() {
    return {
      loader: false,
      searchCircle,
      personAdd,
      create,
      listaMembros: null,
     
    };
  },
  methods: {

    async getMembros() {
      const response = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: "query getMembros{membros (order_by: {nome: asc})  {id,nome,url_foto cargo_membro {nome}}}",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
          },
        }
      );
      this.listaMembros = response.data.data.membros;
    },
    
  },
  watch:{
    listaMembros(){
      if(this.listaMembros != null){
        
        this.loader = true;
      }
    }
  },
 
ionViewWillEnter() {
  console.log(process.env.VUE_APP_SENHA);
      this.getMembros();
  },
ionViewDidLeave(){
    this.loader = false;
  }
});
</script>

<style scoped>
</style>