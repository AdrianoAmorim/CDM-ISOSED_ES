<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-label class="tituloPagina">Relatórios</ion-label>
        <ion-button
          fill="clear"
          router-direction="back"
          slot="end"
          size="small"
          color="primary"
          router-link="/"
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
        <ion-row class="ion-justify-content-start">
          <ion-col size="12">
            <ion-text color="secondary">
              <h5>Quantidade de Membros Cadastrados:</h5>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-start borderModalView">
          <ion-col size="12">
            <ion-radio-group mode="md">
              <ion-row class="ion-justify-content-center">
                <ion-col size="6" class="ion-align-items-center">
                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CARGO</ion-label>
                    <ion-radio
                      slot="start"
                      value="cargo"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>

                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CARGO e<br />CONGREGAÇÃO</ion-label>
                    <ion-radio
                      slot="start"
                      value="qtdCompleta"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>
                </ion-col>

                <ion-col size="6" class="ion-align-items-center">
                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CONGREGAÇÃO</ion-label>
                    <ion-radio
                      slot="start"
                      value="congregacao"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>

                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>TODOS</ion-label>
                    <ion-radio
                      slot="start"
                      value="todos"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-radio-group>
          </ion-col>

          <ion-col size="12">
            <ion-row class="ion-justify-content-start">
              <ion-col size="6">
                <ion-item mode="md">
                  <ion-label position="stacked">FILTRO 1 </ion-label>
                  <ion-select
                    color="secondary"
                    placeholder="Selecione"
                    cancel-text="CANCELAR"
                    ok-text="OK"
                  >
                    <ion-select-option>Missionario</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>

              <ion-col size="6">
                <ion-item mode="md">
                  <ion-label position="stacked">FILTRO 2 </ion-label>
                  <ion-select
                    color="secondary"
                    placeholder="Selecione"
                    cancel-text="CANCELAR"
                    ok-text="OK"
                  >
                    <ion-select-option>Rubem Braga</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-col>

          <ion-row class="ion-justify-content-center">
            <ion-col size="12">
              <ion-text color="success">
                <h5>
                  Total de
                  <ion-text id="textResultQtd" color="danger">00</ion-text>
                  Membros Cadastrados
                </h5>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-row>

        <ion-row class="ion-justify-content-start">
          <ion-col size="12">
            <ion-text color="secondary">
              <h5>Listagem de Membros Cadastrados:</h5>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-start borderModalView">
          <ion-col size="12">
            <ion-radio-group mode="md">
              <ion-row class="ion-justify-content-center">
                <ion-col size="6" class="ion-align-items-center">
                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CARGO</ion-label>
                    <ion-radio
                      slot="start"
                      value="cargo"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>

                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CARGO e<br />CONGREGAÇÃO</ion-label>
                    <ion-radio
                      slot="start"
                      value="qtdCompleta"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>
                </ion-col>

                <ion-col size="6" class="ion-align-items-center">
                  <ion-item lines="none" class="diferencaRadioBtn">
                    <ion-label>CONGREGAÇÃO</ion-label>
                    <ion-radio
                      slot="start"
                      value="congregacao"
                      color="secondary"
                    ></ion-radio>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-radio-group>
          </ion-col>

          <ion-col size="12">
            <ion-row class="ion-justify-content-start">
              <ion-col size="6">
                <ion-item mode="md">
                  <ion-label position="stacked">FILTRO 1 </ion-label>
                  <ion-select
                    color="secondary"
                    placeholder="Selecione"
                    cancel-text="CANCELAR"
                    ok-text="OK"
                  >
                    <ion-select-option>Missionario</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>

              <ion-col size="6">
                <ion-item mode="md">
                  <ion-label position="stacked">FILTRO 2 </ion-label>
                  <ion-select
                    color="secondary"
                    placeholder="Selecione"
                    cancel-text="CANCELAR"
                    ok-text="OK"
                  >
                    <ion-select-option>Rubem Braga</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { arrowBackCircle } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/vue";
export default defineComponent({
  name: "relatoriosPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonRadioGroup,
    IonRadio,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
  },
  data() {
    return {
      urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
    };
  },
});
</script>
<style scoped>
ion-label {
  overflow: visible;
  font-weight: bold;
}
h5 {
  overflow: visible;
  font-weight: bold;
}
#textResultQtd {
  font-size: 24px;
}
ion-radio {
  margin-left: 1px;
  margin-right: 3px;
}
</style>
