<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-button
          v-if="page == 'editar'"
          :disabled="ativarBtnDelete"
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
          :disabled="ativarBtnVoltar"
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

        <ion-button
          v-if="page == 'editar'"
          fill="clear"
          router-direction="back"
          slot="end"
          size="small"
          color="success"
          :disabled="ativarBtnSalvar"
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
          :disabled="ativarBtnSalvar"
          @click="setMembro(this.membro)"
        >
          <ion-icon slot="icon-only" class="iconToolbar" :icon="save"
        /></ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid v-if="!loader">
        <ion-row class="ion-justify-content-center ion-align-items-center">
          <ion-col size="7">
            <ion-row class="ion-justify-content-center">
              <ion-col size="7" class="ion-text-center">
                <ion-avatar class="avatarFoto" @click="tirarFoto()">
                  <ion-img
                    :class="membro.url_foto ? '' : 'fotoMembro'"
                    :src="membro.url_foto ? membro.url_foto : '/img/camera.png'"
                    alt="Avatar do Membro"
                  />
                </ion-avatar>
                <ion-button
                  v-if="page == 'editar'"
                  fill="clear"
                  color="secondary"
                  @click="downloadFoto(membro.url_foto, membro.nome)"
                  :disabled="membro.url_foto ? false : true"
                >
                  <ion-icon
                    slot="icon-only"
                    class="iconButton"
                    :icon="download"
                  />
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <form>
          <ion-row>
            <ion-col>
              <ion-item mode="md">
                <ion-label position="floating">Nome: </ion-label>
                <ion-input
                  v-model="membro.nome"
                  color="secondary"
                  @ionChange="validarCampos()"
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="8">
              <ion-item mode="md">
                <ion-label position="floating">Endereço: </ion-label>
                <ion-input
                  @ionChange="validarCampos()"
                  v-model="membro.endereco"
                  color="secondary"
                ></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="4">
              <ion-item mode="md">
                <ion-label position="floating">Nº: </ion-label>
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
                <ion-label position="floating">Bairro: </ion-label>
                <ion-input
                  @ionChange="validarCampos()"
                  v-model="membro.bairro"
                  color="secondary"
                ></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item mode="md">
                <ion-label position="floating">Cidade: </ion-label>
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
                <ion-label position="floating">Telefone: </ion-label>
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

            <ion-col>
              <ion-item mode="md">
                <ion-label position="stacked">Cargo: </ion-label>
                <ion-select
                  @ionChange="validarCampos()"
                  v-model="membro.id_cargo"
                  color="secondary"
                  placeholder="Selecione o Cargo"
                  cancel-text="CANCELAR"
                  ok-text="OK"
                >
                  <ion-select-option
                    v-for="Cargo in cargos"
                    :key="Cargo.id"
                    :value="Cargo.id"
                    >{{ Cargo.nome }}</ion-select-option
                  >
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-item mode="md">
                <ion-label position="floating">Pai: </ion-label>
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
                <ion-label position="floating">Mãe: </ion-label>
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
                  >Data de Nascimento:
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
                <ion-label position="stacked">Data de Batismo: </ion-label>
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
                      >Est. Civil:</ion-label
                    >

                    <ion-item class="diferencaRadioBtn">
                      <ion-label>Casado</ion-label>
                      <ion-radio
                        color="secondary"
                        slot="start"
                        value="Casado"
                      ></ion-radio>
                    </ion-item>

                    <ion-item class="diferencaRadioBtn">
                      <ion-label>Solteiro</ion-label>
                      <ion-radio
                        color="secondary"
                        slot="start"
                        value="Solteiro"
                      ></ion-radio>
                    </ion-item>

                    <ion-item class="diferencaRadioBtn">
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
        </form>
      </ion-grid>
      <ion-progress-bar v-else type="indeterminate"></ion-progress-bar>

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
  </ion-page>
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
  IonPage,
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
    IonPage,
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
      ativarBtnVoltar: false,
      ativarBtnDelete: false,
      ativarBtnSalvar: true,
      loader: true,
      msgSistema: null,
      statusInfoSistema: false,
      cargos: null,
      ids:{
        idMembro:null,
        idLogradouro:null
      },
      membro: {
        id:null,
        dtBatismo: null,
        dtNascimento: null,
        nome: null,
        pai: null,
        mae: null,
        estCivil: null,
        telefone: null,
        id_cargo: null,
        id_logradouro:null,
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
      const image = await Camera.getPhoto({
        quality: 100,
        source: CameraSource.CAMERA,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });
      this.membro.url_foto = image.dataUrl;
    },
    retirarMascara(input) {
      var val = input;
      val = val.replace("(", "");
      val = val.replace(")", "");
      val = val.replace(" ", "");
      val = val.replace("-", "");
      val = parseInt(val);
      return val;
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
              this.deleteMembro(this.membro.id,this.membro.id_logradouro);
              
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
        (this.membro.telefone == null) |
        (this.membro.telefone == "") |
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
        (this.membro.endereco == null) |
        (this.membro.endereco == "") |
        (this.membro.numero == null) |
        (this.membro.numero == "") |
        (this.membro.bairro == null) |
        (this.membro.bairro == "") |
        (this.membro.cidade == null) |
        (this.membro.cidade == "")
      ) {
        this.ativarBtnSalvar = true;
        return false;
      } else {
        this.ativarBtnSalvar = false;
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
      this.membro.id_logradouro = membroEdit.id_logradouro
      this.membro.endereco = membroEdit.logradouro.endereco;
      this.membro.bairro = membroEdit.logradouro.bairro;
      this.membro.cidade = membroEdit.logradouro.cidade;
      this.membro.numero = membroEdit.logradouro.numero;

    },

    async setMembro(membro) {
      const validar = this.validarCampos();
      if (validar) {
        membro.telefone = this.retirarMascara(membro.telefone);
        this.ativarBtnSalvar = true;
        this.ativarBtnVoltar = true;
        this.loader = true;
        const response = await axios.post("http://192.168.18.4:4041/cadastrar", membro);
        if (response.data.id > 0) {
          this.limparCampos();
          this.msgSistema = "Membro Cadastrado com Sucesso!!";
          this.statusInfoSistema = true;
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.replace("/");
          }, 3000);
        }else{
          alert("Houve Algum erro ao Inserir no banco !")
        }
      } else {
        alert("Favor Preencher todas as Informações do Membro!");
      }
    },

    async updateMembro(membro) {
        const validar = this.validarCampos();
      if (validar) {
        membro.telefone = this.retirarMascara(membro.telefone);
        this.ativarBtnSalvar = true;
        this.ativarBtnVoltar = true;
        this.ativarBtnDelete = true;
        this.loader = true;
        const response = await axios.put("http://192.168.18.4:4041/atualizar", membro);
        if (response.data.id > 0) {
          this.limparCampos();
          this.msgSistema = "Membro Atualizado com Sucesso!!";
          this.statusInfoSistema = true;
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.replace("/");
          }, 3000);
        }else{
          alert("Houve Algum erro ao Inserir no banco !")
        }
      } else {
        alert("Favor Preencher todas as Informações do Membro!");
      }
    },

    async deleteMembro(id_membro,id_logradouro) {
      this.ativarBtnSalvar = true;
      this.ativarBtnDelete = true;
      this.ativarBtnVoltar = true;
        this.loader = true;
      //this.ids.idMembro = id_membro;
      //this.ids.idLogradouro = id_logradouro
      //console.log(this.ids)
      const response = await axios.delete(`http://192.168.18.4:4041/deletar/?id_membro=${id_membro}&id_logradouro=${id_logradouro}`)
      //const response = await axios.delete("http://192.168.18.4:4041/deletar",this.ids)
      if(response.data.id > 0){
         this.limparCampos();
          this.msgSistema = "Membro Deletado com Sucesso!!";
          this.statusInfoSistema = true;
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.replace("/");
          }, 3000);
      }
      console.log (response);
    },
  },
  watch: {
    cargosLs() {
      this.cargos = this.cargosLs;
      if (this.page == "cadastro") {
        if (this.cargos != null) {
          this.loader = false;
        }
      }
      if (this.page == "editar") {
        if (this.membro != null && this.cargos != null) {
          this.loader = false;
        }
      }
    },
    membroEd() {
      this.setDadosInp(this.membroEd);
    },
  },
});
</script>

<style scoped>
.avatarFoto {
  border: 2px solid #427aa1;
  width: 100px;
  height: 100px;
}

.diferencaRadioBtn {
  --padding-start: 2px;
  --inner-padding-end: 2px;
}
ion-label {
  overflow: visible;
  font-weight: bold;
}
ion-radio {
  margin-left: 2px;
  margin-right: 1px;
}
ion-select-option {
  color: #427aa1;
}
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