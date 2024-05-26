import Observable from '../framework/observable.js';
import {FilterType} from '../consts.js';

export default class FilterModel extends Observable {
  #currentFilter = FilterType.EVERYTHING;

  getFilter () {
    //console.log(this.#currentFilter);
    return this.#currentFilter;
  }

  set (updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
