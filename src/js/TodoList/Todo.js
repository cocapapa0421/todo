import { renderApp } from './TodoView';
import {
  subscribe,
  getCurrentState,
  setCurrentState,
  setIdEdit,
  addItem,
  editItem,
  completeItem,
  deleteItem,
} from './TodoModel';

class Todo {
  constructor(appElement, props) {
    this._appElement = appElement;
    setCurrentState(props);
    this._update();
    subscribe(this._update.bind(this));
  }

  _handleBusinessLogic() {
    const { idEdit } = getCurrentState();

    /** @type {HTMLDivElement} */
    this._todoEl = document.querySelector('.jsTodo');
    /** @type {HTMLFormElement} */
    this._form = this._todoEl.querySelector('.jsForm');
    /** @type {HTMLIFrameElement} */
    this._inputEl = this._todoEl.querySelector('.jsFormInput');
    /** @type {HTMLButtonElement[]} */
    this._completeEls = this._todoEl.querySelectorAll('.jsComplete');
    /** @type {HTMLButtonElement[]} */
    this._editEls = this._todoEl.querySelectorAll('.jsEdit');
    /** @type {HTMLButtonElement[]} */
    this._deleteEls = this._todoEl.querySelectorAll('.jsDelete');

    // Attach handle event
    this._form &&
      this._form.addEventListener(
        'submit',
        idEdit
          ? this._handleEditItem.bind(this)
          : this._handleAddItem.bind(this)
      );

    this._completeEls &&
      this._completeEls.forEach(el =>
        el.addEventListener('click', this._completeItem.bind(this))
      );

    this._editEls &&
      this._editEls.forEach(el =>
        el.addEventListener('click', this._handleSetIdEdit.bind(this))
      );

    this._deleteEls &&
      this._deleteEls.forEach(el =>
        el.addEventListener('click', this._deleteItem.bind(this))
      );
  }

  _handleAddItem(e) {
    e.preventDefault();
    const { value: content } = this._inputEl;
    if (!content) {
      return;
    }
    const actionEl = this._getAttribute(e, 'data-selector');
    this._addItem(content, actionEl);
  }

  _handleEditItem(e) {
    e.preventDefault();
    const { value: content } = this._inputEl;
    const { idEdit: id } = getCurrentState();

    editItem(id, content);
  }

  _handleSetIdEdit(e) {
    const id = this._getAttribute(e, 'data-id');
    const actionEl = this._getAttribute(e, 'data-selector');

    setIdEdit({ idEdit: id, actionEl });
    this._focusField(this._inputEl);
  }

  /**
   *
   * @param {string} content
   * @param {string} actionEl
   */
  _addItem(content, actionEl) {
    const item = {
      content,
      complete: false,
      time: Date.now().toString(),
    };
    const props = { actionEl };
    addItem(item, props);
  }

  /** @param {MouseEvent} e */
  _completeItem(e) {
    const id = this._getAttribute(e, 'data-id');
    const actionEl = this._getAttribute(e, 'data-selector');
    let complete = this._getAttribute(e, 'data-complete');

    complete = complete === 'false' ? true : false;
    completeItem(id, complete, { actionEl });
  }

  /** @param {MouseEvent} e */
  _deleteItem(e) {
    const id = this._getAttribute(e, 'data-id');
    const actionEl = this._getAttribute(e, 'data-selector');

    deleteItem(id, { actionEl });
  }

  /**
   *
   * @param {MouseEvent} event
   * @param {string} attribute
   * @returns
   */
  _getAttribute(event, attribute) {
    return event.currentTarget.getAttribute(attribute);
  }

  /** @param {HTMLInputElement} field */
  _focusField(field) {
    field.focus();
  }

  /**
   * @param {Object} param
   * @param {string} param.actionEl
   * @param {string} param.status
   *
   */
  _triggerAction({ actionEl, status }) {
    if (!actionEl) {
      return;
    }

    /**
     * @constant
     * @type {HTMLElement}
     */

    const _actionEl = document.querySelector(`[data-selector='${actionEl}']`);

    if (status === 'request') {
      _actionEl.classList.remove('is-success');
      _actionEl.classList.add('is-loading');
    }
    if (status === 'success') {
      _actionEl.classList.remove('is-loading');
      _actionEl.classList.add('is-success');
    }
  }

  _update() {
    const state = getCurrentState();
    renderApp(this._appElement, state);
    this._handleBusinessLogic();
    this._triggerAction(state);
  }
}

export default Todo;
