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
        :disabled ="ativarBtnVoltar"
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
          @click="updateMembro(this.membro, this.logradouro)"
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
          @click="setMembro(this.membro, this.logradouro)"
        >
          <ion-icon slot="icon-only" class="iconToolbar" :icon="save"
        /></ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid v-if="loader">
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
                <ion-button v-if="page == 'editar'" fill="clear" color="secondary" @click="downloadFoto(membro.url_foto,membro.nome)" :disabled="membro.url_foto?false:true">
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
                  v-model="logradouro.endereco"
                  color="secondary"
                ></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="4">
              <ion-item mode="md">
                <ion-label position="floating">Nº: </ion-label>
                <ion-input
                  @ionChange="validarCampos()"
                  v-model="logradouro.numero"
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
                  v-model="logradouro.bairro"
                  color="secondary"
                ></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item mode="md">
                <ion-label position="floating">Cidade: </ion-label>
                <ion-input
                  @ionChange="validarCampos()"
                  v-model="logradouro.cidade"
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
//import { Filesystem, Directory } from "@capacitor/filesystem";
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
      ativarBtnVoltar:false,
      ativarBtnDelete:false,
      ativarBtnSalvar: true,
      loader: false,
      msgSistema: null,
      statusInfoSistema: false,
      cargos: null,
      membro: {
        dtBatismo: null,
        dtNascimento: null,
        nome: null,
        pai: null,
        mae: null,
        estCivil: null,
        telefone: null,
        id_cargo: null,
        url_foto: "",
      },
      logradouro: {
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
    idMembro: null,
    cargosLs: null,
    membroEd: null,
    page: String,
  },
  methods: {
    downloadFoto(url,fileName) {
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
      this.logradouro.endereco = null;
      this.logradouro.numero = null;
      this.logradouro.bairro = null;
      this.logradouro.cidade = null;
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
              this.deleteMembro(this.idMembro);
              this.loader = false;
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
        (this.logradouro.endereco == null) |
        (this.logradouro.endereco == "") |
        (this.logradouro.numero == null) |
        (this.logradouro.numero == "") |
        (this.logradouro.bairro == null) |
        (this.logradouro.bairro == "") |
        (this.logradouro.cidade == null) |
        (this.logradouro.cidade == "")
      ) {
        console.log("dentro do vazio");
        this.ativarBtnSalvar = true;
        return false;
      } else {
        console.log("dentro do cheio");
        this.ativarBtnSalvar = false;
        return true;
      }
    },

    setDadosInp(membroEdit) {
      this.membro.nome = membroEdit.nome;
      this.membro.pai = membroEdit.pai;
      this.membro.mae = membroEdit.mae;
      this.membro.telefone = membroEdit.telefone;
      this.membro.dtNascimento = membroEdit.dtNascimento;
      this.membro.dtBatismo = membroEdit.dtBatismo;
      this.membro.estCivil = membroEdit.estCivil;
      this.membro.url_foto = membroEdit.url_foto;
      this.membro.id_cargo = membroEdit.cargo_membro.id;
      this.logradouro.endereco = membroEdit.logradouro_membro.endereco;
      this.logradouro.bairro = membroEdit.logradouro_membro.bairro;
      this.logradouro.cidade = membroEdit.logradouro_membro.cidade;
      this.logradouro.numero = membroEdit.logradouro_membro.numero;
    },

    async setMembro(membro, logradouro) {
      const validar = this.validarCampos();
      if (validar) {
        const telSemMask = this.retirarMascara(membro.telefone);
        this.ativarBtnSalvar = true;
        this.ativarBtnVoltar = true;
        this.loader = false;
        const response = await axios.post(
          "https://cdm-isosed.hasura.app/v1/graphql",
          {
            query: `mutation setMembro{
              insert_membros_one(object:{
                nome: "${membro.nome}",
                telefone: ${telSemMask},
                id_cargo: ${membro.id_cargo},
                pai: "${membro.pai}",
                mae: "${membro.mae}",
                dtNascimento: "${membro.dtNascimento}",
                dtBatismo: "${membro.dtBatismo}",
                estCivil: "${membro.estCivil}",
                url_foto: "${membro.url_foto}",
                logradouro_membro:{
                  data:{
                    endereco: "${logradouro.endereco}",
                    numero: ${logradouro.numero},
                    bairro: "${logradouro.bairro}",
                    cidade: "${logradouro.cidade}"
                  }
                }
            }){id}}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-hasura-admin-secret":
                "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
            },
          }
        );
        if (response.data.data.insert_membros_one.id > 0) {
          this.limparCampos();
          this.msgSistema = "Membro Cadastrado com Sucesso!!";
          this.statusInfoSistema = true;
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.replace("/");
          }, 3000);
        } else {
          this.msgSistema = "Erro ao Cadastrar novo Membro";
          this.statusInfoSistema = true;
        }
      } else {
        alert("Favor Preencher todas as Informações do Membro!");
      }
    },
    async updateMembro(membro, logradouro) {
      const validar = this.validarCampos();
      if (validar) {
        const telSemMask = this.retirarMascara(membro.telefone);
        this.ativarBtnSalvar = true;
        this.ativarBtnDelete = true;
        this.ativarBtnVoltar = true;
        this.loader = false;
        const response = await axios.post(
          "https://cdm-isosed.hasura.app/v1/graphql",
          {
            query: `mutation updateMembro {
                      update_membros(where: {id: {_eq:${this.idMembro}}}, _set: 
                        {  nome: "${membro.nome}",
                            url_foto: "${membro.url_foto}",
                            telefone: ${telSemMask},
                            id_cargo: ${membro.id_cargo},
                            pai: "${membro.pai}",
                            mae: "${membro.mae}",
                            dtNascimento: "${membro.dtNascimento}",
                            dtBatismo: "${membro.dtBatismo}",
                            estCivil: "${membro.estCivil}"}) {
                              affected_rows
                            }
                      update_logradouro(where: {id: {_eq:${this.idMembro} }}, _set: 
                        {endereco: "${logradouro.endereco}",
                          numero: ${logradouro.numero},
                          bairro: "${logradouro.bairro}",
                          cidade: "${logradouro.cidade}"}) {
                              affected_rows}}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-hasura-admin-secret":
                "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
            },
          }
        );
        if (response.data.data.update_membros.affected_rows > 0) {
          this.limparCampos();
          this.msgSistema = "Membro Atualizado com Sucesso!!";
          this.statusInfoSistema = true;
          setTimeout(() => {
            this.statusInfoSistema = false;
            this.$router.replace("/");
          }, 3000);
        } else {
          this.msgSistema = "Erro ao Atualizar o Membro";
          this.statusInfoSistema = true;
        }
      } else {
        alert("Favor Preencher todas as Informações");
      }
    },

    async deleteMembro(id) {
      const response = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: `mutation MyMutation {
                delete_membros(where: {id: {_eq: ${id}}}) {
                  affected_rows
                  returning {
                    logradouro_membro {
                      id
                    }
                  }
                }
              }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
          },
        }
      );
      const idLogradouro =
        response.data.data.delete_membros.returning[0].logradouro_membro.id;
      const response2 = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: `mutation MyMutation {
                  delete_logradouro(where: {id: {_eq: ${idLogradouro}}}) {
                    affected_rows
                  }
                }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
          },
        }
      );

      if (
        response.data.data.delete_membros.affected_rows &&
        response2.data.data.delete_logradouro.affected_rows > 0
      ) {
        this.$router.push("/");
      } else {
        alert("Ouve um erro ao Deletar o Membro");
      }
    },
  },
  watch: {
    cargosLs() {
      this.cargos = this.cargosLs;
      if (this.page == "cadastro") {
        if (this.cargos != null) {
          this.loader = true;
        }
      }
      if (this.page == "editar") {
        if (this.membro != null && this.cargos != null) {
          this.loader = true;
          console.log(this.membro);
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