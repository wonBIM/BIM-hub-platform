// 뷰어에 3차원 객체 추가하는 기능 three.js 기능 활용 (https://threejs.org/)

class AddgeomExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this.viewer = viewer;
  }

  load() {
    var geom = new THREE.SphereGeometry(2, 8, 8); //구 크기, 가로 세그먼트, 세로 세그먼트
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //색상 레드
    var sphereMesh = new THREE.Mesh(geom, material);
    sphereMesh.position.set(1, 2, 3);
    if (!this.viewer.overlays.hasScene("custom-scene")) {
      this.viewer.overlays.addScene("custom-scene");
    }
    this.viewer.overlays.addMesh(sphereMesh, "custom-scene");

    // add grid
    //this.grid = new THREE.GridHelper(600, 40);
    //this.grid.material.opacity = 0.8;
    //this.grid.material.transparent = true;
    //this.grid.position.set (0, 0, 0);
    //if (!this.viewer.overlays.hasScene('grid')) {
    //this.viewer.overlays.addScene('grid');
    //}
    //this.viewer.overlays.addMesh(this.grid, 'grid');
    return true;
  }

  unload() {
    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "AddgeomExtension",
  AddgeomExtension
);
