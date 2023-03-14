// 확장기능 추가 및 아이콘버튼 추가 연습
//import { BaseExtension } from "./BaseExtension.js";  //기존 버튼그룹에 버튼추가 -잘 안됨
//import { SummaryPanel } from "./SummaryPanel.js";   //기존 버튼그룹에 버튼추가 -잘 안됨

class HelloWorld extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this.button1 = null;
    this.subToolbar = null;
  }

  load() {
    console.log("HelloWorld is loaded");
    return true;
  }

  unload() {
    console.log("HelloWorld is unloaded");
    return true;
  }
  // 별도 버튼 그룹으로 만들기
  onToolbarCreated() {
    //var viewer = this.viewer;
    // SubToolbar
    this.subToolbar = this.viewer.toolbar.getControl("my-Hello-toolbar");
    if (!this.subToolbar) {
      this.subToolbar = new Autodesk.Viewing.UI.ControlGroup(
        "my-Hello-toolbar"
      );
      this.viewer.toolbar.addControl(this.subToolbar);
    }

    var button1 = new Autodesk.Viewing.UI.Button("Hello-button");
    button1.onClick = () => {
      //To do
      alert("(주)삼우씨엠건축사사무소"); //기입한 내용 출력 됨---------------------
    };
    button1.setToolTip("My Extention"); //마우스를 가리킬때 표시되는 문자
    button1.addClass("Hello-buttonIcon"); //아이콘 추가하기 -> main.css에 추가
    this.subToolbar.addControl(button1);
  }

  //기존 버튼그룹에 추가 -잘 안됨
  // onToolbarCreated() {
  //   // this._panel = new SummaryPanel(
  //   //   this,
  //   //   "model-summary-panel",
  //   //   "Model Summary"
  //   // );

  //   this._button = this.createToolbarButton(
  //     "Hello-button",
  //     "https://img.icons8.com/material/24/null/hello.png",
  //     "Hello"
  //   );
  //   this._button.onClick = () => {
  //     // TODO
  //     alert("(주)삼우씨엠건축사사무소"); //기입한 내용 출력 됨---------------------
  //   };
  // }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "HelloWorld",
  HelloWorld
);
