import { createTripInfoTemplate } from '../templates/trip-info-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class TripInfoView extends AbstractView{
  #points;

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
