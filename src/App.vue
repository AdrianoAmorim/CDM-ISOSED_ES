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
.fotoMembro{
  border-radius: 0px;
  display: block;
  margin:12px auto;
  object-fit: contain;
height: 65% ;
 width: 65% ;
}

.iconToolbar{
font-size:30px;
object-fit: fill;
}
.iconButton{
font-size:36px;
object-fit: fill;
}
.headerPg{
  padding:20px;
}



</style>