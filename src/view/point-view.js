import { createPointTemplate } from '../templates/point-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView{
  #point;
  #offersByPointType;

  constructor({point, offersByPointType}) {
    super();
    this.#point = point;
    this.#offersByPointType = offersByPointType;
  }

  get template() {
    return createPointTemplate(this.#point, this.#offersByPointType);
  }
}
