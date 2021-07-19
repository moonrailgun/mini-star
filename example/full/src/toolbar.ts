const toolbarEl = document.createElement('div');
document.body.appendChild(toolbarEl);

export function appendToolButton(text: string, callback: () => void) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.addEventListener('click', callback);
  toolbarEl.appendChild(btn);
}
