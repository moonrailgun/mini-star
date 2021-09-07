let _pluginComponent = null;

export function regPluginComponent(component) {
  _pluginComponent = component;
}

export function getPluginComponent() {
  return _pluginComponent;
}
