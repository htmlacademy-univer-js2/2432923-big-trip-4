import { createPointTemplate } from '../templates/point-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView{
  #point;
  #offersByPointType;
  #onEditClick;

  constructor({point, offersByPointType, onEditClick}) {
    super();
    this.#point = point;
    this.#offersByPointType = offersByPointType;
    this.#onEditClick = onEditClick;

    this.#addPointHandlers();
  }

  get template() {
    return createPointTemplate(this.#point, this.#offersByPointType);
  }

  #addPointHandlers = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };
}
