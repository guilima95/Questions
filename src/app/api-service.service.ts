import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  KEY_QUESTIONARIOS = 'questionario-geral';
  KEY_QUESTIONARIOS_RESPONDIDOS = 'questionario-respondido';
  KEY_QUESTIONARIOS_RESPOSTAS = 'questionario-respostas';

  // tslint:disable-next-line:max-line-length
  constructor(public toastController: ToastController, public alertController: AlertController, public loadingController: LoadingController
  ) { }


  async save(key: string, questionario: any) {
    return await localStorage.setItem(key, questionario);
  }

  async presentToast(msg, cl) {
    const toast = await this.toastController.create({
      message: msg,
      color: cl,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading(msg, time) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: time,
      spinner: 'lines'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }

  async recuperar(key: string) {
    return await localStorage.getItem(key);
  }

  async presentAlertConfirm(h, m) {
    const alert = await this.alertController.create({
      header: h,
      message: m,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Ok',
          cssClass: 'success',
          handler: () => {
            this.presentToast('', 'success');
          }
        }
      ]
    });

    await alert.present();
  }
}
