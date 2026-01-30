import { observable, action, computed, makeObservable, runInAction } from 'mobx';
import { apiService } from '../services/ApiService';

class RsvpStore {
  @observable accessor rsvps = [];
  @observable accessor loading = false;
  @observable accessor error = null;
  @observable accessor submitting = false;

  constructor() {
    makeObservable(this);
    this.initialize();
  }

  @action
  async initialize() {
    await this.fetchRsvps();
  }

  @action
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

  @action
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

  @computed
  get totalRsvps() {
    return this.rsvps.length;
  }

  @computed
  get attendingCount() {
    return this.rsvps.filter(rsvp => rsvp.attending).length;
  }

  @computed
  get notAttendingCount() {
    return this.rsvps.filter(rsvp => !rsvp.attending).length;
  }
}

export const rsvpStore = new RsvpStore();
