const ModuleA = import(/* webpackChunkName: "chunk1" */ "./ModuleA");

// Uncomment this line to see "chunk2" get lazy loaded, containing only ModuleC
// ModuleA.then(moduleA => moduleA.myFunction());

function component() {
    const element = document.createElement('div');

    element.innerHTML = "Hello webpack";

    return element;
  }

  document.body.appendChild(component());