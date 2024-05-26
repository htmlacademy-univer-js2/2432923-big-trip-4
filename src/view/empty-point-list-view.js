import AbstractView from '../framework/view/abstract-view.js';
import { createEmptyPointListTemplate } from '../templates/empty-point-list-template.js';


export default class EmptyPointListView extends AbstractView{
  constructor() {
    super();
  }

  get template() {
    return createEmptyPointListTemplate();
  }
}
