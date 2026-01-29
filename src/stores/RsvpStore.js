import { makeAutoObservable, runInAction } from 'mobx';
import { apiService } from '../services/ApiService';

class RsvpStore {
  rsvps = [];
  loading = false;
  error = null;
  submitting = false;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  async initialize() {
    await this.fetchRsvps();
  }

  async fetchRsvps() {
    this.loading = true;
    this.error = null;

    try {
      const response = await apiService.get('/api/rsvps');

      runInAction(() => {
        this.rsvps = response.data || [];
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  }

  async submitRsvp(rsvpData) {
    this.submitting = true;
    this.error = null;

    try {
      const response = await apiService.post('/api/rsvps', rsvpData);

      runInAction(() => {
        this.rsvps.push(response.data);
        this.submitting = false;
      });

      return { success: true };
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.submitting = false;
      });

      return { success: false, error: error.message };
    }
  }

  get totalRsvps() {
    return this.rsvps.length;
  }

  get attendingCount() {
    return this.rsvps.filter(rsvp => rsvp.attending).length;
  }

  get notAttendingCount() {
    return this.rsvps.filter(rsvp => !rsvp.attending).length;
  }
}

export const rsvpStore = new RsvpStore();
