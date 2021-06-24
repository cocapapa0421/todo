/**
 * @typedef {{status: string, data: TodoItem[], actionEl: string, idEdit: string, callback: function}} State
 * @typedef {{id: string, content: string, time: string, complete: boolean}} TodoItem
 **/

/**
 *
 * @param {Object} param
 * @param {State['status']} param.status
 * @param {State['idEdit']} param.idEdit
 * @returns {string}
 */
function renderForm({ status, idEdit }) {
  return `
    <form class="form jsForm" data-selector="form">
      <input
        type="text"
        class="form__input jsFormInput"
        placeholder="Add a new task ..."
        required
      />
      <button class="button form__button jsFormButton">
        <span class="form__button-text">${idEdit ? 'Edit' : 'Add'}</span>
        <span class="form__button-action action"></span>
      </button>
    </form>
  `;
}

/**
 *
 * @param {Object} param
 * @param {TodoItem['id']} param.id
 * @param {TodoItem['content']} param.content
 * @param {TodoItem['complete']} param.complete
 * @returns {string}
 */
function renderItem({ id, content, complete }) {
  return `
    <div class="item grid ${complete ? 'is-complete' : ''}">
      <div class="item__status">
        <button class="button button--complete jsComplete ${
          complete ? 'is-active' : ''
        }" data-id="${id}" data-complete="${complete}" data-selector="complete-${id}">
          <span class="button--complete-action action"></span>
        </button>
      </div>
      <div class="item__content">${content}</div>
      <div class="item__action">
        <button class="button button--edit jsEdit" data-id="${id}" data-selector="edit-${id}">
          <span class="button__content">Edit</span>
          <span class="button__action action">Edit</span>
        </button>
        <button class="button button--delete jsDelete" data-id="${id}" data-selector="delete-${id}">
          <span class="button__content">Delete</span>
          <span class="button__action action">Edit</span>
        </button>
      </div>
    </div>
  `;
}

/**
 *
 * @param {Object} param
 * @param {TodoItem[]} param.data
 */

function renderListItem({ data = [] }) {
  let html;
  if (data.length === 0) {
    html = '<p>No records, please add a new record!</p>';
  } else {
    html = data.map(renderItem).join(' ');
  }

  return html;
}

/**
 *
 * @param {HTMLDivElement} appElement
 * @param {State} state
 */
function renderApp(appElement, state) {
  const html = `
    <div class="todo-app jsTodo">
      ${renderForm(state)}
      <div class="todo-head jsTodoHead">
        <div class="grid">
          <div>Status</div>
          <div>Task Content</div>
          <div>Actions</div>
        </div>
      </div>
      ${renderListItem(state)}
    </div>
  `;

  appElement.innerHTML = html;
}

export { renderApp };
