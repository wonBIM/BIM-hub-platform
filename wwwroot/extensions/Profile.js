// 뷰어에 속성창 접근 가능

class Profile extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this.viewer = viewer;
  }

  load() {
    const customProfileSettings = {
      settings: {
        reverseMouseZoomDir: true, // 마우스 줌 방향 반전
        reverseHorizontalLookDirection: true, // 수평방향 반전
        customSettingOne: true, // new preference
        customSettingTwo: 2, // new preference
        customSettingThree: "test", // new preference
      },
      extensions: {
        //unload: ["Autodesk.ViewCubeUi", "Autodesk.BimWalk"], //뷰큐브, 워크뷰 로드 안함
      },
    };
    const customProfile = new Autodesk.Viewing.Profile(customProfileSettings);
    // Updates viewer settings encapsulated witihn a Profile.
    // This method will also load and unload extensions referenced by the Profile.
    this.viewer.setProfile(customProfile);

    return true;
  }

  unload() {
    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension("Profile", Profile);
