import Todo from './TodoList/Todo';
import axios from 'axios';
const config = {
  api: 'https://60d19ad65b017400178f3f89.mockapi.io/api/v1/todos',
};

function withData(Component) {
  class TodoWithData {
    constructor(appElement, props) {
      this._props = props;
      this._appElement = appElement;
      this._init();
    }

    async _getData() {
      const { data } = await axios.get(config.api);
      return data;
    }

    async _init() {
      const data = await this._getData();

      return new Component(this._appElement, {
        data,
        ...this._props,
      });
    }
  }

  return TodoWithData;
}

const TodoWithData = withData(Todo);

export { TodoWithData, config };
