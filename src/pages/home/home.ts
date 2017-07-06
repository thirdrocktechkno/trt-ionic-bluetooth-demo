import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  constructor(private bluetoothSerial: BluetoothSerial) {
    bluetoothSerial.enable();
    this.gettingDevices = true;

  }

  startScanning() {
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {
    this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);

  }

}
