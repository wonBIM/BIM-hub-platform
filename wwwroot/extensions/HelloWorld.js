// 확장기능 추가 및 아이콘버튼 추가 연습

class HelloWorld extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }

  load() {
    console.log("HelloWorld is loaded");
    return true;
  }

  unload() {
    console.log("HelloWorld is unloaded");
    return true;
  }

  onToolbarCreated(toolbar) {
    var viewer = this.viewer;

    var button1 = new Autodesk.Viewing.UI.Button("Hello-button");
    button1.onClick = function (e) {
      alert("(주)삼우씨엠건축사사무소"); //기입한 내용 출력 됨---------------------
    };
    button1.addClass("Hello-button"); //아이콘 추가하기 -> main.css에 추가, index.html에도 이미지 추가
    button1.setToolTip("Hello"); //마우스를 가리킬때 표시되는 문자

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup("my-Hello-toolbar");
    this.subToolbar.addControl(button1);

    toolbar.addControl(this.subToolbar);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "HelloWorld",
  HelloWorld
);
