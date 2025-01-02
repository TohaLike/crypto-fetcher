import { makeAutoObservable } from "mobx";

class Store {
  subState = false

  constructor() {
    makeAutoObservable(this);
  }

  subButton(bool: boolean) {
    this.subState = bool
  }
}

export const stateView = new Store();
