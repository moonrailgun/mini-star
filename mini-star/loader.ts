export function loadPluginByUrl(url: string): Promise<Event> {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement('script');
    scriptDom.src = url;
    scriptDom.onload = (e) => {
      resolve(e);
    };
    scriptDom.onerror = (e) => {
      reject(e);
    };

    document.body.appendChild(scriptDom);
  });
}

export function loadPluginList(plugins: { name: string; url: string }[]) {
  // const allpromise = plugins.map((x) => {
  //   return new Promise((resolver) => {
  //     window.require([x], (b) => {
  //       resolver(b);
  //     });
  //   });
  // });
  // return Promise.all(allpromise);
}
