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
                  <ion-label position="floating"
                    >Adicionar {{lblInput}}
                  </ion-label>
                  <ion-input color="secondary" v-model="item.nome"></ion-input>
                </ion-item>
              </ion-col>

              <ion-col size="2" class="ion-align-self-center">
                <ion-button
                  color="success"
                  fill="clear"
                  @click="validarCadastroItem(item)"
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
              mode="ios"
              :debounce="1000"
              animated="true"
              show-cancel-button="never"
              placeholder="Buscar"
              class="searchBarConfig"
            />
          </ion-col>

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

          <ion-col size="12">
            <ion-list lines="none">
              <ion-item
                v-for="Obj in listaItens"
                :key="Obj.id"
                mode="ios"
              >
                <ion-input
                  color="secondary"
                  placeholder="Carregando"
                  :value="Obj.nome"
                ></ion-input>

                <ion-button size="small" fill="clear" slot="end">
                  <ion-icon
                    color="success"
                    slot="icon-only"
                    class="iconToolbar"
                    :icon="save"
                  />
                </ion-button>

                <ion-button size="small" fill="clear" slot="end">
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
  },
  data() {
    return {
      urlServer: "https://isosed-server.herokuapp.com",
      //urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
      addCircle,
      save,
      closeCircle,
      lblInput: "",
      listaItens:null,
      item: {
        nome: "",
      },
    };
  },
  methods: {

    validarCadastroItem(nomeItem){
      if(nomeItem.nome != ""){
        if(this.nomePg == "congregacoes"){
          this.cadItemCongregacao(nomeItem);
        }else{
          this.cadItemCargo(nomeItem)
        }
      }else{
        alert("Campo vazio!!")
      }
    },


    async cadItemCongregacao(nomeItem) {
      try{
      const response = await axios.post(`${this.urlServer}/cadCongregacao`,nomeItem);
      if(response.data.id > 0 ){
        nomeItem.nome = ""
        this.getCongregacoes()
        alert("Cadastro realizado com Sucesso!!")
      }else{
        alert("Houve Algum erro estamos tratando!!")
      }
      }catch(e){
        alert(e)
      }
    },

    async cadItemCargos(nomeItem) {
      try{
      const response = await axios.post(`${this.urlServer}/cadCargo`,nomeItem);
      if(response.data.id > 0 ){
       nomeItem.nome = ""
        this.getCargos()
        alert("Cadastro realizado com Sucesso!!")
      }else{
        alert("Houve Algum erro estamos tratando!!")
      }
      }catch(e){
        alert(e)
      }
    },
    async getCongregacoes() {
      try {
        const response = await axios.get(`${this.urlServer}/congregacoes`);
        if (response.data.length > 0) {
          this.listaItens = response.data
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
      try {
        const response = await axios.get(`${this.urlServer}/cargos`);
        if (response.data.length > 0) {
          this.listaItens = response.data
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
  beforeMount(){
    if(this.nomePg == "congregacoes"){
      this.lblInput = "Congregação"
      console.log("congregacoes")
      this.getCongregacoes();
    }else{
      console.log("cargos")
      this.lblInput = "Cargo"
      this.getCargos();
    }
  }

});
</script>

<style scoped>
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
</style>