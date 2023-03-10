// 뷰어에 3차원 객체 추가하는 기능 잘 안됨 ------------------------------

class SceneBuilder extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this.viewer = viewer;
    // this.sceneBuilder = null;
    // this.modelBuilder = null;
  }

  load() {
    this.viewer.loadExtension("Autodesk.Viewing.SceneBuilder").then(() => {
      this.sceneBuilder = this.viewer.getExtension(
        "Autodesk.Viewing.SceneBuilder"
      );

      this.sceneBuilder
        .addNewModel({
          conserveMemory: false,
          modelNameOverride: "My Model Name",
        })
        .then((modelBuilder) => {
          this.modelBuilder = modelBuilder;
          this.red = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 0, 0),
          });
          this.torus = new THREE.BufferGeometry().fromGeometry(
            new THREE.TorusGeometry(10, 2, 32, 32)
          );
          const transform = new THREE.Matrix4().compose(
            new THREE.Vector3(19, 0, 0),
            new THREE.Quaternion(0, 0, 0, 1),
            new THREE.Vector3(1, 1, 1)
          );
          this.modelBuilder.addFragment(this.torus, this.red, transform);
        });
    });

    return true;
  }

  unload() {
    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "SceneBuilder",
  SceneBuilder
);
