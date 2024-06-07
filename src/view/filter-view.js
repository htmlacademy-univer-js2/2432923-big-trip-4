import { FilterType } from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from '../templates/filter-template.js';

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #items = [];
  #onItemChange = null;

  constructor({items, onItemChange, currentFilter}) {
    super();
    this.#items = items;
    this.#onItemChange = onItemChange;
    this.#currentFilter = currentFilter;

    this.element.addEventListener('change', this.#itemChangeHandler);
    this.#setFilterChangeHandler();

  }

  get template() {
    return createFilterTemplate({ filters: this.#items, currentFilter: this.#currentFilter });
  }

  #setFilterChangeHandler() {
    for (const filterName of Object.values(FilterType)) {
      const filterInput = this.element.querySelector(`#filter-${filterName.toLowerCase()}`);
      filterInput.addEventListener('change', this.#itemChangeHandler);
    }
  }

  #itemChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onItemChange?.(evt.target.value);
    this.#currentFilter = evt.target.value;
    return createFilterTemplate({ filters: this.#items, currentFilter: this.#currentFilter });
  };
}
