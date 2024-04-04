import { createPointEditTemplate } from '../templates/point-edit-template.js';
import { DEFAULT_POINT } from '../consts.js';
import AbstractView from '../framework/view/abstract-view';

export default class PointEditView extends AbstractView{
  #point = null;
  #offersByPointType = null;

  constructor({point = DEFAULT_POINT, offersByPointType = []}) {
    super();
    this.#point = point;
    this.#offersByPointType = offersByPointType;
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#offersByPointType);
  }
}
