import './main.scss'

function component() {
  let element = document.createElement('div');
  element.className = 'hello';
  element.innerHTML = ['Hello', 'webpack'].join(' ');

  return element;
}
console.log('run')
document.body.appendChild(component());