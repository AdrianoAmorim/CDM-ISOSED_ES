<template>
  <ion-toolbar>
    <ion-thumbnail slot="start">
      <ion-img  :src="imgLogo" alt="logomarca" />
    </ion-thumbnail>

    <ion-title>CDM - ISOSED ES</ion-title>
  </ion-toolbar>
</template>

<script>
import { defineComponent } from "vue";
import { IonToolbar, IonTitle, IonImg, IonThumbnail } from "@ionic/vue";

export default defineComponent({
  name: "nav-bar",
  components: {
    IonToolbar,
    IonTitle,
    IonImg,
    IonThumbnail,
  },
  data() {
    return {
      imgLogo: "/img/logo.png",
    };
  },
});
</script>

<style scoped>
ion-toolbar{
  --background: linear-gradient(90deg, #064789 0%, #276db4 50%, #2174c7 100%) ;
  color: #ffffff;
  font-family:CrispyFood;
}
ion-thumbnail {
  --size: 50px;
  margin: 10px;
}
ion-thumbnail ion-img{
  object-fit: contain;
}
ion-title {
  overflow:visible;
  font-size: 28px;
  letter-spacing:2px;
  font-weight: 400;
  margin-top:5px;
}
</style>