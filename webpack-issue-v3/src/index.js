const ModuleA = import(/* webpackChunkName: "chunk1" */ "./ModuleA");

// Uncomment this line to see "chunk2" get lazy loaded, containing both ModuleB and ModuleC
// ModuleA.then(moduleA => moduleA.myFunction());

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = "Hello webpack";

    return element;
  }

  document.body.appendChild(component());