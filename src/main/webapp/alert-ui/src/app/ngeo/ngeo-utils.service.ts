import { Injectable } from '@angular/core';

@Injectable()
export class NgeoUtilsService {

  constructor() { }

  decorateInteration(interaction) {

    Object.defineProperty(interaction, 'active', {
      get: () => interaction.getActive(),
      set: (val) => {
        interaction.setActive(val);
      }
    })
  }
}
