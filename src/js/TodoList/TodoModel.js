/**
 * @typedef {{id: string, content: string, time: string, complete: boolean}} TodoItem
 * @typedef {{status: string, data: TodoItem[], actionEl: string, idEdit: string, callback: function}} State
 *
 **/

import createState from './createState';
import axios from 'axios';
import { config } from '../app';

const { subscribe, getState, setState } = createState();

/**
 * @constant
 * @type {object}
 */
const todoAction = {
  /**
   *
   * @param {string} [actionEl='']
   */
  request(props) {
    const defaultProps = { status: 'request' };
    setState(state => Object.assign({}, state, defaultProps, props));
  },
  async success(props) {
    const data = await getTodo();
    const defaultProps = { status: 'success', data };
    setState(state => Object.assign({}, state, defaultProps, props));
  },
  failure() {},
};

/** @returns {State}  */
function getCurrentState() {
  return getState();
}

function setCurrentState(props) {
  setState(state => Object.assign({}, state, props));
}

/** @returns {TodoItem[]} */
async function getTodo() {
  const { data } = await axios.get(config.api);
  return data;
}

function setIdEdit(props = {}) {
  setState(state => Object.assign({}, state, props));
  console.log(getCurrentState());
}

/**
 *
 * @param {TodoItem} item
 * @param {object} props
 */
async function addItem(item, props = {}) {
  todoAction.request(props);

  try {
    await axios.post(config.api, item);
    await todoAction.success(props);
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {TodoItem['id']} id
 * @param {TodoItem['content']} content
 */
async function editItem(id, content, props = {}) {
  todoAction.request(props);

  try {
    await axios({
      method: 'put',
      url: `${config.api}/${id}`,
      data: { content },
    });
    await todoAction.success({ actionEl: '', idEdit: '' });
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {TodoItem['id']} id
 * @param {TodoItem['complete']} complete
 */
async function completeItem(id, complete, props = {}) {
  todoAction.request(props);

  try {
    await axios({
      method: 'put',
      url: `${config.api}/${id}`,
      data: { complete },
    });
    await todoAction.success({ actionEl: '' });
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {TodoItem['id']}
 * @param {State} props
 **/
async function deleteItem(id, props) {
  console.log(id, props);
  todoAction.request(props);

  try {
    await axios({
      method: 'delete',
      url: `${config.api}/${id}`,
    });
    await todoAction.success({ actionEl: '' });
  } catch (err) {
    console.log(err);
  }
}

export {
  subscribe,
  setCurrentState,
  getCurrentState,
  setIdEdit,
  getTodo,
  addItem,
  editItem,
  completeItem,
  deleteItem,
};
