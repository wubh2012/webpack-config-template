import './style.css'
import './main.scss'

function component() {
  let element = document.createElement('div');
  element.className = 'hello';
  element.innerHTML = ['Hello', 'webpack'].join(' ');

  return element;
}

document.body.appendChild(component());