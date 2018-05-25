import {Zone} from "../zone/zone";
export class User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  userZones?: any;
  zones?: any;
}

export class UserZone {
  id: number;
  radius: number;
  threshold: number;
  zone: Zone;
  user: User;
}
