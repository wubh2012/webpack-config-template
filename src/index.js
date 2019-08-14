
function component() {
  let element = document.createElement('div');

  element.innerHTML = Array.prototype.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());