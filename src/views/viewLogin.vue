<template>
  <ion-page>
    <ion-content>
      <div id="container" ref="container">
        <div id="boxLogin">
          <div id="boxLoginAvatar">
            <ion-img src="/img/avatarBoxLogin.png" alt="Avatar Do Box Login" />
          </div>

          <div id="tituloBoxLogin">
            <ion-label>Login</ion-label>
          </div>

          <div id="inpBoxLogin">
            <ion-item mode="ios" id="inpLogin">
              <ion-icon :icon="person" />
              <ion-input
                placeholder="Digite seu Login"
                v-model="nome"
              ></ion-input>
            </ion-item>

            <ion-item mode="ios" id="inpLogin">
              <ion-icon :icon="key" />
              <ion-input
                type="password"
                v-model="password"
                placeholder="Digite sua Senha"
              ></ion-input>
            </ion-item>
          </div>

          <div id="btnBoxLogin">
            <ion-button @click="efetuarLogin()"> ENTRAR </ion-button>
          </div>
        </div>

        <div id="creditos">
          <ion-icon :icon="logoLinkedin" />
          <ion-text
            >Criado por
            <a
              href="https://www.linkedin.com/in/dev-adriano-amorim"
              target="_blank"
              alt="Linkedin de Adriano Amorim"
              ><em> Adriano Amorim</em>
            </a>
          </ion-text>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { logIn, person, key, logoLinkedin } from "ionicons/icons";
import {
  IonPage,
  IonImg,
  IonText,
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
    IonText,
    IonLabel,
    IonInput,
    IonItem,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      urlServer: "http://192.168.18.4:4041",
      logIn,
      person,
      key,
      logoLinkedin,
      nome: null,
      password: null,
    };
  },
  methods: {
    async redirecionarUsuario(token){
      sessionStorage.setItem("token",token);
      this.$router.push("/");

    },

    async efetuarLogin() {
      const user = {
        nome: this.nome,
        password: this.password,
      };
      try {
        const response = await axios.post(`${this.urlServer}/login`, user);
        //
        if (response.data.aviso) {
          alert(response.data.msg);
        } else {
          if (response.data.error) {
            alert(response.data.msg);
          } else {
           this.redirecionarUsuario(response.data.token)
          }
        }
      } catch (e) {
        console.log(e.message)
      }
    },
  },
});
</script>
<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(90deg, #064789 0%, #276db4 50%, #2174c7 100%);
}
#creditos {
  margin-top: 50px;
  color: #f3f3f3;
  font-size: 14px;
  font-weight: 500;
}
#creditos ion-icon {
  margin-right: 5px;
}
#creditos ion-text a {
  color: #f3f3f3;
  text-decoration: none;
}
#creditos ion-text a:visited {
  color: #f3f3f3;
}
#creditos ion-text a:hover {
  color: #1da953;
  text-decoration: underline;
  font-weight: 800;
}

#boxLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #064789;
  height: auto;
  width: auto;
  border-radius: 25px;
  box-shadow: 3px 3px 16px 6px #f3f3f3;
  animation: movimentarSombra 1s infinite alternate;
}
#boxLogin #boxLoginAvatar {
  width: 90px;
  height: 90px;
  border-radius: 25px;
  margin-top: -40px;
  overflow: hidden;
  background: #064789;
  box-shadow: 0px -20px 15px -10px #f3f3f3;
  animation: movimentarSombraAv 1s infinite alternate;
}
#boxLogin #tituloBoxLogin {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-top: 2px;
}

#boxLogin #inpBoxLogin {
  margin: 15px 10px 20px 10px;
}

#boxLogin #inpBoxLogin #inpLogin {
  margin-bottom: 10px;
  --background: #3e80c2;
  --border-radius: 10px;
  --inner-border-width: 0;
}

#boxLogin #inpBoxLogin ion-item ion-icon {
  color: #0d194d;
  opacity: 0.7;
}
#boxLogin #inpBoxLogin ion-input {
  --placeholder-color: #061246;
  --placeholder-opacity: 0.7;
  width: 235px;
  font-size: 20px;
  color: #fff;
  text-align: center;
}

#boxLogin #inpBoxLogin ion-item:hover {
  box-shadow: 0px 0px 7px 1px #f3f3f3;
  border-radius: 10px;
}

#boxLogin #btnBoxLogin ion-button {
  --background: #1da953;
  font-size: 20px;
  --padding-start: 15px;
  --padding-end: 15px;
  --border-radius: 10px;
  height: 46px;
  margin-bottom: 20px;
}
@keyframes movimentarSombra {
  from {
    box-shadow: 3px 3px 16px 2px #fff;
  }
  to {
    box-shadow: 3px 3px 16px 6px #f3f3f3;
  }
}
@keyframes movimentarSombraAv {
  from {
    box-shadow: 0px -20px 18px -18px #fff;
  }
  to {
    box-shadow: 0px -20px 15px -10px #f3f3f3;
  }
}
@media screen and (max-width: 480px) {
  #boxLogin #inpBoxLogin ion-input {
    width: 215px;
  }
}
</style>
