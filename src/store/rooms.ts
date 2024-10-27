import { makeAutoObservable } from "mobx";

class Rooms  {
  userId = "";

  constructor () {
    makeAutoObservable(this);
  }

  
  setUserId(userId: string) {
    this.userId = userId;
  }
}


export const stateRooms = new Rooms()