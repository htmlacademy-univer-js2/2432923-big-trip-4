import { createSortTemplate } from '../templates/sort-template.js';
import AbstractRadioListView from './abstract-radio-list-view.js';

export default class SortView extends AbstractRadioListView{
  get template() {
    // console.log('100');
    return createSortTemplate({sorts: this.items});
  }
}
