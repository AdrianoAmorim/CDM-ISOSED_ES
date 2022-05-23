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
.imgAvatar{
  max-width: 100%;
object-fit: contain ;
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
.titlePg{
  overflow:visible;
  color: slategray;
 text-align: left;
  padding: 5px; 
}
.loader{
  margin-left:15px;
  font-size:18px;
  font-weight: bold;
  font-style: italic;
 color: #053e79;
}

</style>