import './main.scss'
import './test-es6'

function component() {
  let element = document.createElement('div');
  element.className = 'hello';
  element.innerHTML = ['Hello', 'webpack'].join(' ');
  element.addEventListener('click', ()=>{
    console.log('div click');
  })
  return element;
}
console.log('run')
document.body.appendChild(component());

