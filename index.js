import './src/scss/style.scss';
import { TodoWithData } from './src/js/app';

const appElement = document.getElementById('app');
new TodoWithData(appElement, {
  onChange(data) {
    console.log(data);
  },
});
