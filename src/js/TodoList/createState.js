/**
 * @typedef {{id: string, content: string, time: string, complete: boolean}} TodoItem
 * @typedef {{status: string, data: TodoItem[], actionEl: string, idEdit: string, callback: function}} State
 *
 **/

class Store {
  /**
   *
   * @param {State} state
   */
  constructor(state) {
    this._state = state;
    this._listeners = [];

    // Binding
    this.subscribe = this.subscribe.bind(this);
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
  }

  _handleListeners() {
    this._listeners.forEach(listener => {
      listener();
    });
  }

  /** @param {function} listener */
  subscribe(listener) {
    this._listeners.push(listener);
  }

  /** @param {function} listener */
  unSubScribe(listener) {
    this._listeners = this._listeners.filter(
      listener_ => listener_ !== listener
    );
  }

  /**
   * @param {function | State} newState
   * @param {string} action
   * @returns {function}
   **/
  setState(newState) {
    const prevState = this._state;
    if (typeof newState === 'function') {
      this._state = newState(prevState);
    } else {
      this._state = newState;
    }

    this._handleListeners();

    return actionName => {
      console.log(actionName, 'prevState', prevState);
      console.log(actionName, 'nextState', this._state);
    };
  }

  /** @returns {State} */
  getState() {
    return this._state;
  }
}

function createState() {
  const initialState = {
    data: [],
    status: 'idle',
    idEdit: '',
    actionEl: '',
  };
  const store = new Store(initialState);

  return store;
}

export default createState;
