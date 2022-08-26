<template>
  <ion-app>
    <ion-header>
      <NavBar />
    </ion-header>

    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp, IonHeader, IonContent, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    NavBar,
    IonHeader,
    IonContent,
  },
});
</script>

<style>
ion-modal.modalViewMembro::part(content){
 --height: 85%;
    position: absolute; 
    top: 10%;
    --width: 95%;
    display: block;
}
.modalViewMembro .borderModalViewMembro{
    border: 2px solid #427aa1;
    border-radius: 10px;
}
.modalViewMembro span{
  color: #427aa1 !important;
  overflow: visible;
  font-weight: bold;
  font-size: 14px !important;
}
.modalViewMembro ion-label{
   overflow: visible !important;
   font-size: 18px !important;
}
.modalViewMembro #lblNome{
  font-weight: bold;
}
.modalViewMembro #lblTel{
  font-size: 16px !important;
  font-weight: bold;
}
.modalViewMembro #lblCargo{
  font-weight:bold;
  color: #eb445a;
  font-size: 16px !important; 
}
/* ESTILIZANDO ALERTS DE AVISOS DE INFORMAÇÃO E SUCESSOS*/
 .alert-info .alert-wrapper{
  border-radius: 18px;
}
.alert-info .alert-title {
  color: #ffffff;
}
.alert-info .alert-head {
  background: #21c05e;
}
.alert-info .alert-message{
  padding-top: 20px !important; 
  font-size: 18px;
  color: black;
}
  .alert-info .alert-button-group span{
     color:#21c05e;
     font-size: 18px;
     font-weight: bold;
  }
/* ESTILIZANDO ALERTS DE AVISOS DE ERROS E CUIDADOS */
.alert-delete .alert-wrapper{
  border-radius: 18px;
}
.alert-delete .alert-title {
  color: #ffffff;
}
.alert-delete .alert-head {
  background: #cf3c4f;
}
.alert-delete .alert-message{
  padding-top: 20px !important; 
  font-size: 18px;
  color: black;
}
.alert-delete .btn-delete {
  color: #eb445a !important;
  font-size: 18px;
  font-weight: bold;
}
.alert-delete .btn-confirm {
  color: #21c05e !important;
  font-size: 18px;
  font-weight: bold;
}
/*FIM DAS ESTILIZACOES DE ALERTS DO SISTEMA */
/*------------------------------------ */
.avatarFoto {
  border: 2px solid #427aa1;
  width: 100px;
  height: 100px;
}
.avatarViewMembro{
  width: 80px;
  height: 80px;
}
.fotoMembro {
  border-radius: 0px;
  display: block;
  margin: 14px auto;
  object-fit: contain;
  height: 70%;
  width: 70%;
}

.iconToolbar {
  font-size: 30px;
  object-fit: fill;
}
</style>