import { createPointEditTemplate } from '../templates/point-edit-template.js';
import { DEFAULT_POINT } from '../consts.js';
import AbstractView from '../framework/view/abstract-view';

export default class PointEditView extends AbstractView{
  #point = null;
  #offersByPointType = null;
  #handleFormSubmit = null;
  #onResetClick = null;
  #onSubmitClick = null;

  constructor({point = DEFAULT_POINT, offersByPointType = [], onResetClick, onSubmitClick}) {
    super();
    this.#point = point;
    this.#offersByPointType = offersByPointType;
    this.#onResetClick = onResetClick;
    this.#onSubmitClick = onSubmitClick;

    this.#addEditPointHandlers();
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#offersByPointType);
  }

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick();
  };

  #addEditPointHandlers = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetClickHandler);

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitClickHandler);
  };


}
