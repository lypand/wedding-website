import { observable, action, computed, makeObservable } from 'mobx';

class WeddingStore {
  @observable accessor weddingInfo = {
    coupleName: 'The Wedding of Andrew Lyp and Gretchen Seibel!',
    date: 'August 15, 2026',
    time: '3:00PM',
    address: '903 Lake Forest Drive, Ronald, WA 98940',
  };

  @observable accessor rsvpList = [];

  constructor() {
    makeObservable(this);
  }

  @action
  updateWeddingInfo(key, value) {
    this.weddingInfo[key] = value;
  }

  @action
  addRsvp(guest) {
    this.rsvpList.push(guest);
  }

  @computed
  get totalGuests() {
    return this.rsvpList.length;
  }
}

export const weddingStore = new WeddingStore();
