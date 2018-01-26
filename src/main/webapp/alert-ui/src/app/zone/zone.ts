export class Zone {
  id: number;
  name: string;

  set geom(value) {
    this.geom = value;
    console.log('in GEOM')
  }
}
