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
  data(){
    return{

    }
  },

});
</script>

<style>
/*IMPORTANDO AS FONTES DO APP */
@font-face {
  font-family: CrispyFood;
  src: local(CrispyFood), url(../public/fonts/CrispyFood.ttf);
}
@font-face {
  font-family: WorkSans;
  src: local(WorkSans), url(../public/fonts/WorkSans.ttf);
}
/*----------------------------------------- */
/*SETANDO A FONTE NO APP */
ion-content,ion-input{
  font-family: WorkSans;
}
/*--------------------------------- */
/*ESTILOS DAS TELAS DE MODAIS DO APP */
ion-modal.modalView::part(content){
 --height: 80%;
    position: absolute; 
    top: 10%;
    --width: 95%;
    display: block;
    border-radius: 10px;
}
.borderModalView{
    border: 2px solid #427aa1;
    border-radius: 10px;
}
.modalView span{
  color: #427aa1 !important;
  overflow: visible;
  font-weight: bold;
  font-size: 14px !important;
}
.modalView ion-label{
   overflow: visible !important;
   font-size: 18px !important;
}
.modalView #lblNome{
  font-weight: bold;
}
.modalView #lblTel{
  font-size: 14px !important;
  font-weight: bold;
}
.modalView #lblCargo{
  font-weight:bold;
  color: #eb445a;
  font-size: 16px !important; 
}
/*---------------------------------------------- */
/* ESTILO ALERTS DE AVISOS DE INFORMAÇÃO E SUCESSOS*/
.alertSelects .alert-title{
  text-align:  center;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 1px;
  color: #474747;
}
 .alert-info .alert-wrapper{
  border-radius: 18px;
}
.alert-info .alert-title {
  color: #ffffff;
  text-align: center ;
}
.alert-info .alert-head {
  background: #21c05e;
}
.alert-info .alert-message{
  padding-top: 20px !important; 
  font-size: 18px;
  text-align: center ;
  color: black;
}
  .alert-info .alert-button-group span{
     color:#21c05e;
     font-size: 18px;
     font-weight: bold;
  }
/* ESTILO ALERTS DE AVISOS DE CUIDADOS */
.alert-delete .alert-wrapper{
  border-radius: 18px;
}
.alert-delete .alert-title {
  color: #ffffff;
  text-align: center ;
}
.alert-delete .alert-head {
  background: #cf3c4f;
}
.alert-delete .alert-message{
  padding-top: 20px !important; 
  font-size: 18px;
  text-align: center;
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
/*ESTILOS GERAIS */
.tagAguardeLoader {
  color: #427aa1;
  margin: 15px;
}
.loaderTelaLogin{
  --background: #a2c6eb;
  --spinner-color: #fff;
  --backdrop-opacity: 0.6;
  color: #130f49;
  font-size: 16px;
}
.loaderTelaLogin div{
  border-radius: 15px !important;
}

.avatarFoto {
  border: 2px solid #427aa1;
  width: 80px;
  height: 80px;
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

.diferencaRadioBtn {
  --padding-start: 2px;
  --inner-padding-end: 2px;
}
ion-select {
  color: #427aa1 !important;
}
.tituloPagina{
  font-size: 22px;
  margin-left: 5px;
  color: #064789;
  font-weight: bold;
}
</style>