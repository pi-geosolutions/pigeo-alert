export class Bassin {
  gid: number;
  maj_bas?: number;
  sub_bas?: number;
  maj_area?: number;
  sub_area?: number;
  to_subbas?: number;
  maj_name: string;
  sub_name: string;

  set the_geom(value) {
    this.the_geom = value;
  }
}
