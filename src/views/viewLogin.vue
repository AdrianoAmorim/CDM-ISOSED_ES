<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div id="boxLogin">
          <div id="boxLoginAvatar">
            <ion-img src="/img/avatarBoxLogin.png" alt="Avatar Do Box Login" />
          </div>

          <div id="tituloBoxLogin">
            <ion-label>Login</ion-label>
          </div>

          <div id="inpBoxLogin">
            <ion-item mode="ios" id="inpLogin">
              <ion-icon :icon="person"/>
              <ion-input placeholder="Digite seu Login"></ion-input>
            </ion-item>

            <ion-item mode="ios" id="inpLogin">
              <ion-icon :icon="key"/>
              <ion-input type="password" placeholder="Digite sua Senha"></ion-input>
            </ion-item>
          </div>

          <div id="btnBoxLogin">
            <ion-button>
              ENTRAR
              </ion-button>
          </div>
        </div>
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {logIn,person,key} from 'ionicons/icons'
import {
  IonPage,
IonImg,
 IonIcon,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  name: "viewLogin",
  components: {
    IonPage,
    IonImg,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      logIn,
      person,
      key,
      
    };
  },
});
</script>
<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(90deg, #064789 0%, #276db4 50%, #2174c7 100%) ;
}
#boxLogin{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  background-color: #064789 ;
  height: auto;
  width: auto;
  border-radius: 25px;
  box-shadow: 3px 3px 15px 6px #f3f3f3;
}
#boxLogin #boxLoginAvatar{
  width: 90px;
  height: 90px;
  border-radius: 25px;
  margin-top: -40px;
  overflow: hidden;
  background: #064789;
  box-shadow: 0px -20px 15px -10px #f3f3f3;
}
#boxLogin #tituloBoxLogin{
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-top:2px;
}

#boxLogin #inpBoxLogin{
  margin: 15px 10px 20px 10px;
  
}

#boxLogin #inpBoxLogin #inpLogin{
    margin-bottom:10px;
  --background: #3e80c2;
  --border-radius: 10px;
  --inner-border-width: 0;
}

#boxLogin #inpBoxLogin ion-item ion-icon{
  color: #0d194d;
}
#boxLogin #inpBoxLogin ion-input{
  --placeholder-color: #061246 ;
--placeholder-opacity: .7;
    width: 235px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    
  border-radius: 10px;
}
#boxLogin #inpBoxLogin ion-item:hover{
  box-shadow: 0px 0px 5px 1px #23be5e;
  border-radius: 10px;
}

#boxLogin #btnBoxLogin ion-button{
  --background:#1da953;
    font-size: 20px;
    --padding-start:15px;
    --padding-end:15px;
    --border-radius: 10px;
    height: 46px;
    margin-bottom:20px;
}

</style>
