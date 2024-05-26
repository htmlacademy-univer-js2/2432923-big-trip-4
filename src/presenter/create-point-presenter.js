import { RenderPosition, render } from '../framework/render';
import EditFormView from '../view/edit-form-view';
import { UserAction, UpdateType } from '../consts';
import { remove } from '../framework/render';
import { EditType } from '../consts';

// точки дублируются


export default class CreatePointPresenter {
  #container = null;
  #createPointComponent = null;

  #destinationModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor ({container, destinationModel, offersModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init = () => {
    if (!this.#createPointComponent) {
      this.#createPointComponent = new EditFormView({
        offers: this.#offersModel.get(),
        destinations: this.#destinationModel.get(),
        onEditFormReset: this.#handleFormClose,
        onEditFormSubmit: this.#handleEditFormSubmit,
        editFormType: EditType.CREATING,
      });
    }

    render(this.#createPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);

  };

  destroy = ({isCanceled = true} = {}) => {
    if (!this.#createPointComponent) {
      return;
    }

    remove(this.#createPointComponent);
    this.#createPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#handleDestroy({isCanceled});
  };

  #handleEditFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );

    this.destroy({ isCanceled: false });
  };

  #handleFormClose = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
