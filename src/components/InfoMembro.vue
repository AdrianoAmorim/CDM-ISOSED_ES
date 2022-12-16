<template>
  <ion-header mode="ios">
    <ion-toolbar mode="ios">
      <ion-label class="tituloPagina" v-if="page == 'cadastro'"
        >Cadastrar</ion-label
      >
      <ion-label class="tituloPagina" v-else>Editar</ion-label>
      <ion-button
        v-if="page == 'editar'"
        :disabled="desativarBtnDelete"
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="danger"
        @click="confirmDelete()"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="closeCircle"
      /></ion-button>

      <ion-button
        :disabled="desativarBtnVoltar"
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="primary"
        router-link="/"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="arrowBackCircle"
      /></ion-button>

      <ion-button
        v-if="page == 'editar'"
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="success"
        :disabled="desativarBtnSalvar"
        @click="updateMembro(this.membro)"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="save"
      /></ion-button>

      <ion-button
        v-else
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="success"
        :disabled="desativarBtnSalvar"
        @click="setMembro(this.membro)"
      >
        <ion-icon slot="icon-only" class="iconToolbar" :icon="save"
      /></ion-button>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid v-if="!loader">
      <ion-row class="ion-justify-content-start">
        <ion-col size="12">
          <ion-row class="ion-justify-content-start ion-align-items-center">
            <ion-col size="3">
              <ion-avatar class="avatarFoto" @click="tirarFoto()">
                <ion-img
                  :class="membro.url_foto ? '' : 'fotoMembro'"
                  :src="membro.url_foto ? membro.url_foto : '/img/camera.png'"
                  alt="Avatar do Membro"
                />
              </ion-avatar>

              <ion-button
                class="iconDownload"
                v-if="page == 'editar'"
                fill="clear"
                color="secondary"
                @click="downloadFoto(membro.url_foto, membro.nome)"
                :disabled="membro.url_foto ? false : true"
              >
                <ion-icon slot="icon-only" :icon="download" />
              </ion-button>
            </ion-col>

            <ion-col size="9">
              <ion-row class="ion-justify-content-start">
                <ion-col size="12">
                  <ion-item mode="md">
                    <ion-label position="floating">NOME </ion-label>
                    <ion-input
                      style="font-weight: bold"
                      v-model="membro.nome"
                      color="secondary"
                      @ionChange="validarCampos()"
                    ></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col size="12">
                  <ion-item mode="md">
                    <ion-label position="stacked">CONGREGAÇÃO</ion-label>
                    <ion-select
                      color="secondary"
                      placeholder="CARREGANDO..."
                      v-if="!congregacoesLs"
                    >
                    </ion-select>
                    <ion-select
                      v-else
                      @ionChange="validarCampos()"
                      v-model="membro.id_congregacao"
                      color="secondary"
                      placeholder="Congregação"
                      cancel-text="CANCELAR"
                      ok-text="OK"
                      :interface-options="optSlcAlert"
                    >
                      <ion-select-option
                        v-for="Congregacao in congregacoesLs"
                        :key="Congregacao.id"
                        :value="Congregacao.id"
                        >{{ Congregacao.nome }}</ion-select-option
                      >
                    </ion-select>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col size="12">
          <ion-row class="ion-justify-content-start">
            <ion-col size="6">
              <ion-item mode="md">
                <ion-label position="floating">TELEFONE</ion-label>
                <ion-input
                  @ionChange="validarCampos()"
                  color="secondary"
                  v-model="membro.telefone"
                  type="text"
                  inputmode="numeric"
                  placeholder="(xx) xxxxx-xxxx"
                ></ion-input>
                <input
                  v-mask="['(##) #####-####', '(##) ####-####']"
                  v-model="membro.telefone"
                  style="display: none"
                />
              </ion-item>
            </ion-col>

            <ion-col size="6">
              <ion-item mode="md">
                <ion-label position="stacked">CARGO</ion-label>
                <ion-select
                  color="secondary"
                  placeholder="CARREGANDO..."
                  v-if="!cargosLs"
                >
                </ion-select>
                <ion-select
                  v-else
                  @ionChange="validarCampos()"
                  v-model="membro.id_cargo"
                  color="secondary"
                  placeholder="Cargo"
                  cancel-text="CANCELAR"
                  ok-text="OK"
                  :interface-options="optSlcAlert"
                >
                  <ion-select-option
                    v-for="Cargo in cargosLs"
                    :key="Cargo.id"
                    :value="Cargo.id"
                    >{{ Cargo.nome }}</ion-select-option
                  >
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size="8">
          <ion-item mode="md">
            <ion-label position="floating">ENDEREÇO </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.endereco"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="4">
          <ion-item mode="md">
            <ion-label position="floating">Nº </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.numero"
              type="number"
              inputmode="numeric"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size="6">
          <ion-item mode="md">
            <ion-label position="floating">BAIRRO </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.bairro"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="6">
          <ion-item mode="md">
            <ion-label position="floating">CIDADE </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.cidade"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-item mode="md">
            <ion-label position="floating">PAI </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.pai"
              type="text"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-item mode="md">
            <ion-label position="floating">MÃE </ion-label>
            <ion-input
              v-model="membro.mae"
              color="secondary"
              @ionChange="validarCampos()"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size="6">
          <ion-item mode="md">
            <ion-label style="overflow: visible" position="stacked"
              >DT NASCIMENTO
            </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.dtNascimento"
              type="date"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="6">
          <ion-item mode="md">
            <ion-label position="stacked">DT BATISMO </ion-label>
            <ion-input
              @ionChange="validarCampos()"
              v-model="membro.dtBatismo"
              type="date"
              color="secondary"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-list>
            <ion-radio-group
              @ionChange="validarCampos()"
              v-model="membro.estCivil"
              mode="md"
            >
              <ion-row class="ion-justify-content-start">
                <ion-label
                  style="margin-right: 3px"
                  class="ion-align-self-center"
                  >EST. CIVIL</ion-label
                >

                <ion-item class="diferencaRadioBtn" lines="none">
                  <ion-label>Casado</ion-label>
                  <ion-radio
                    color="secondary"
                    slot="start"
                    value="Casado"
                  ></ion-radio>
                </ion-item>

                <ion-item class="diferencaRadioBtn" lines="none">
                  <ion-label>Solteiro</ion-label>
                  <ion-radio
                    color="secondary"
                    slot="start"
                    value="Solteiro"
                  ></ion-radio>
                </ion-item>

                <ion-item class="diferencaRadioBtn" lines="none">
                  <ion-label>Viúvo(a)</ion-label>
                  <ion-radio
                    color="secondary"
                    slot="start"
                    value="Viúvo(a)"
                  ></ion-radio>
                </ion-item>
              </ion-row>
            </ion-radio-group>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-grid>
    <div v-else>
      <ion-progress-bar type="indeterminate"> </ion-progress-bar>
      <h3 class="tagAguardeLoader">Aguarde...</h3>
    </div>

    <ion-grid>
      <ion-row v-if="statusInfoSistema" class="ion-justify-content-start">
        <ion-col size="12" class="infoSistema">
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <span>{{ msgSistema }}</span>
            <ion-icon color="warning" :icon="checkmarkCircle" />
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import axios from "axios";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { mask } from "vue-the-mask";
import { defineComponent } from "vue";
import {
  download,
  camera,
  save,
  closeCircle,
  arrowBackCircle,
  checkmarkCircle,
} from "ionicons/icons";
import {
  IonAvatar,
  IonProgressBar,
  alertController,
  IonIcon,
  IonImg,
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonRadio,
  IonToolbar,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/vue";

export default defineComponent({
  name: "InfoMembro",
  directives: { mask },
  components: {
    IonProgressBar,
    IonHeader,
    IonIcon,
    IonAvatar,
    IonButton,
    IonImg,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonToolbar,
    IonItem,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonList,
    IonRadio,
    IonRadioGroup,
  },
  data() {
    return {
      urlServer: "http://192.168.18.4:4041",
      desativarBtnVoltar: true,
      desativarBtnDelete: true,
      desativarBtnSalvar: true,
      loader: true,
      optSlcAlert: {
        cssClass: "alertSelects",
      },
      msgSistema: null,
      statusInfoSistema: false,
      membro: {
        id: null,
        dtBatismo: null,
        dtNascimento: null,
        nome: null,
        pai: null,
        mae: null,
        estCivil: null,
        telefone: null,
        id_cargo: null,
        id_congregacao: null,
        id_logradouro: null,
        url_foto: null,
        endereco: null,
        numero: null,
        bairro: null,
        cidade: null,
      },
      download,
      save,
      camera,
      closeCircle,
      arrowBackCircle,
      checkmarkCircle,
    };
  },
  props: {
    congregacoesLs: null,
    cargosLs: null,
    membroEd: null,
    page: String,
  },
  methods: {
    downloadFoto(url, fileName) {
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${fileName}`;
      downloadLink.click();
    },
    async tirarFoto() {
      try {
        const image = await Camera.getPhoto({
          quality: 100,
          source: CameraSource.Camera,
          presentationStyle: "fullscreen",
          allowEditing: true,
          PermissionState: "camera",
          webUseInput: false,
          resultType: CameraResultType.DataUrl,
        });
        this.membro.url_foto = image.dataUrl;
      } catch (e) {
        this.alertInfoSistema("AVISO", "", "TIRAR FOTO CANCELADO!");
      }
    },
    retirarMascara(input) {
      if (input != null) {
        var val = input;
        val = val.replace("(", "");
        val = val.replace(")", "");
        val = val.replace(" ", "");
        val = val.replace("-", "");
        return val;
      }
    },
    limparCampos() {
      this.membro.nome = null;
      this.membro.telefone = null;
      this.membro.dtBatismo = null;
      this.membro.dtNascimento = null;
      this.membro.pai = null;
      this.membro.mae = null;
      this.membro.estCivil = null;
      this.membro.url_foto = "";
      this.membro.id_cargo = null;
      this.membro.endereco = null;
      this.membro.numero = null;
      this.membro.bairro = null;
      this.membro.cidade = null;
    },
    async alertInfoSistema(header, subHeader, message) {
      const alert = await alertController.create({
        cssClass: "alert-info",
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ["OK"],
      });
      await alert.present();
    },
    async confirmDelete() {
      const alert = await alertController.create({
        cssClass: "alert-delete",
        header: "DELETAR",
        message: "Deseja Deletar este Membro?",
        translucent: true,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "btn-delete",
            id: "cancel-button",
            handler: () => {},
          },
          {
            text: "OK",
            id: "confirm-button",
            cssClass: "btn-confirm",
            handler: () => {
              this.deleteMembro(this.membro.id, this.membro.id_logradouro);
            },
          },
        ],
      });
      return alert.present();
    },
    validarCampos() {
      if (
        (this.membro.nome == null) |
        (this.membro.nome == "") |
        (this.membro.dtBatismo == null) |
        (this.membro.dtBatismo == "") |
        (this.membro.dtNascimento == null) |
        (this.membro.dtNascimento == "") |
        (this.membro.pai == null) |
        (this.membro.pai == "") |
        (this.membro.mae == null) |
        (this.membro.mae == "") |
        (this.membro.estCivil == null) |
        (this.membro.estCivil == "") |
        (this.membro.id_cargo == null) |
        (this.membro.id_cargo == "") |
        (this.membro.id_congregacao == null) |
        (this.membro.id_congregacao == "") |
        (this.membro.endereco == null) |
        (this.membro.endereco == "") |
        (this.membro.numero == null) |
        (this.membro.numero == "") |
        (this.membro.bairro == null) |
        (this.membro.bairro == "") |
        (this.membro.cidade == null) |
        (this.membro.cidade == "")
      ) {
        return false;
      } else {
        return true;
      }
    },
    setDadosInp(membroEdit) {
      var dtNascimento = membroEdit.dtNascimento.substring(0, 10);
      var dtBatismo = membroEdit.dtBatismo.substring(0, 10);
      this.membro.id = membroEdit.id;
      this.membro.nome = membroEdit.nome;
      this.membro.pai = membroEdit.pai;
      this.membro.mae = membroEdit.mae;
      this.membro.telefone = membroEdit.telefone;
      this.membro.dtNascimento = dtNascimento;
      this.membro.dtBatismo = dtBatismo;
      this.membro.estCivil = membroEdit.estCivil;
      this.membro.url_foto = membroEdit.url_foto;
      this.membro.id_cargo = membroEdit.id_cargo;
      this.membro.id_congregacao = membroEdit.id_congregacao;
      this.membro.id_logradouro = membroEdit.id_logradouro;
      this.membro.endereco = membroEdit.logradouro.endereco;
      this.membro.bairro = membroEdit.logradouro.bairro;
      this.membro.cidade = membroEdit.logradouro.cidade;
      this.membro.numero = membroEdit.logradouro.numero;
    },

    async setMembro(membro) {
      const validar = this.validarCampos();
      const auth = sessionStorage.getItem("token");
      if (validar) {
        membro.telefone = this.retirarMascara(membro.telefone);
        membro.telefone = membro.telefone ?? "";
        this.desativarBtnSalvar = true;
        this.desativarBtnVoltar = true;
        this.loader = true;

        try {
          const response = await axios.post(
            `${this.urlServer}/cadastrar`,
            membro,
            {
              headers: {
                Authorization: `token ${auth}`,
              },
            }
          );
          if (response.data.id > 0) {
            this.limparCampos();
            this.msgSistema = "Membro Cadastrado com Sucesso!!";
            this.statusInfoSistema = true;
            setTimeout(() => {
              this.statusInfoSistema = false;
              this.$router.replace("/");
            }, 3000);
          } else if (response.data.error == true) {
            this.alertInfoSistema(
              "ERROR",
              "",
              "ERRO INTERNO NO SERVIDOR! " + response.data.msg
            );
            this.desativarBtnSalvar = false;
            this.desativarBtnVoltar = false;
            this.loader = false;
          }
        } catch (e) {
          this.alertInfoSistema(
            "ERROR",
            "",
            "HOUVE UM ERRO AO CADASTRAR: " + e.message
          );
          this.loader = false;
        }
      } else {
        this.alertInfoSistema(
          "AVISO",
          "",
          "FAVOR PREENCHER TODAS AS INFORMAÇÕES DO MEMBRO!!"
        );
      }
    },

    async updateMembro(membro) {
      const validar = this.validarCampos();
      const auth = sessionStorage.getItem("token");
      if (validar) {
        membro.telefone = this.retirarMascara(membro.telefone);
        membro.telefone = membro.telefone ?? "";
        this.desativarBtnSalvar = true;
        this.desativarBtnVoltar = true;
        this.desativarBtnDelete = true;
        this.loader = true;
        try {
          const response = await axios.put(
            `${this.urlServer}/atualizar`,
            membro,
            {
              headers: {
                Authorization: `token ${auth}`,
              },
            }
          );
          if (response.data.id > 0) {
            this.limparCampos();
            this.msgSistema = "Membro Atualizado com Sucesso!!";
            this.statusInfoSistema = true;
            setTimeout(() => {
              this.statusInfoSistema = false;
              this.$router.replace("/");
            }, 3000);
          } else if (response.data.error == true) {
            this.alertInfoSistema(
              "ERROR",
              "",
              "ERRO INTERNO NO SERVIDOR! " + response.data.msg
            );
            this.loader = false;
            this.desativarBtnSalvar = false;
            this.desativarBtnDelete = false;
            this.desativarBtnVoltar = false;
          }
        } catch (e) {
          this.alertInfoSistema(
            "ERROR",
            "",
            "ERRO AO ATUALIZAR O MEMBRO: " + e.message
          );
        }
      } else {
        this.alertInfoSistema(
          "AVISO",
          "",
          "FAVOR PREENCHER TODAS AS INFORMAÇÕES DO MEMBRO!!"
        );
      }
    },

    async deleteMembro(id_membro, id_logradouro) {
      this.desativarBtnSalvar = true;
      this.desativarBtnDelete = true;
      this.desativarBtnVoltar = true;
      this.loader = true;
      const auth = sessionStorage.getItem("token");
      const ids = {
        id_membro: id_membro,
        id_logradouro: id_logradouro,
      };
      try {
        const response = await axios.delete(`${this.urlServer}/deletar`, {
          data: ids,
          headers: {
            Authorization: `token ${auth}`,
          },
        });
        if (response.data.id > 0) {
          this.limparCampos();
          this.msgSistema = "Membro Deletado com Sucesso!!";
          this.statusInfoSistema = true;
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.replace("/");
          }, 3000);
        } else if (response.data.error == true) {
          this.alertInfoSistema(
            "ERROR",
            "",
            "ERRO INTERNO NO SERVIDOR! " + response.data.msg
          );
          this.desativarBtnSalvar = true;
          this.desativarBtnDelete = true;
          this.desativarBtnVoltar = true;
          this.loader = false;
        }
      } catch (e) {
        this.alertInfoSistem(
          "ERROR",
          "",
          "HOUVE UM ERRO AO DELETAR O MEMBRO: " + e.message
        );
      }
    },
  },
  watch: {
    cargosLs() {
      if (this.page == "cadastro") {
        this.desativarBtnVoltar = false;
        this.desativarBtnSalvar = false;
        this.loader = false;
      }
    },
    membroEd() {
      this.setDadosInp(this.membroEd);
      if (this.membroEd.nome != null) {
        this.desativarBtnVoltar = false;
        this.desativarBtnDelete = false;
        this.desativarBtnSalvar = false;
        this.loader = false;
      }
    },
  },
});
</script>

<style scoped>
.iconDownload {
  font-size: 20px;
  object-fit: fill;
}

ion-item ion-label {
  overflow: visible;
  font-weight: bold;
  font-size: 14px !important;
}
ion-radio {
  margin-left: 2px;
  margin-right: 1px;
}

/*ESTILO MSG DE SUCESSO DO CADASTRO E ATUALIZACAO DO MEMBRO */
.infoSistema {
  opacity: 0.8;
  border-radius: 15px;
  padding: 12px;
  background-color: #21c05e;
  color: white;
  font-style: italic;
  font-weight: bold;
}
.infoSistema ion-icon {
  font-size: 24px;
  object-fit: fill;
}
</style>