import { makeAutoObservable } from 'mobx';

class WeddingStore {
  weddingInfo = {
    coupleName: 'Bride & Groom',
    date: 'June 15, 2024',
    time: '4:00 PM',
    venue: 'Beautiful Garden Venue',
    address: '123 Wedding Lane, City, State 12345',
  };

  rsvpList = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateWeddingInfo(key, value) {
    this.weddingInfo[key] = value;
  }

  addRsvp(guest) {
    this.rsvpList.push(guest);
  }

  get totalGuests() {
    return this.rsvpList.length;
  }
}

export const weddingStore = new WeddingStore();
