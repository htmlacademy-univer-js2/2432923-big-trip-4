import { createPointEditTemplate } from '../templates/point-edit-template.js';
import { DEFAULT_POINT } from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EditFormView extends AbstractView{
  #point = null;
  #offers = null;
  #destination = null;
  #onEditFormReset = null;
  #onEditFormSubmit = null;

  constructor({point = DEFAULT_POINT, offers = [], destination, onEditFormReset, onEditFormSubmit}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#onEditFormReset = onEditFormReset;
    this.#onEditFormSubmit = onEditFormSubmit;

    this.#addEditPointHandlers();
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#offers, this.#destination);
  }

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditFormReset();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditFormSubmit();
  };

  #addEditPointHandlers = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetClickHandler);

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#submitClickHandler);
  };
}
