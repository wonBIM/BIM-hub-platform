//import { BaseExtension } from "./BaseExtension.js";

//class HandleSelectionExtension extends BaseExtension {
class HandleSelectionExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    //this.viewer = viewer;
    this.button1 = null;
    this.subToolbar = null;
  }

  load() {
    super.load();
    console.log("HandleSelectionExtension is loaded");

    return true;
  }

  unload() {
    super.unload();
    console.log("HandleSelectionExtension is unloaded");
    return true;
  }

  // HelloWorldjs 에서 만든 버튼 그룹에 추가
  onToolbarCreated() {
    // SubToolbar
    this.subToolbar = this.viewer.toolbar.getControl("my-Hello-toolbar");
    if (!this.subToolbar) {
      this.subToolbar = new Autodesk.Viewing.UI.ControlGroup(
        "my-Hello-toolbar"
      );
      this.viewer.toolbar.addControl(this.subToolbar);
    }

    this.button1 = new Autodesk.Viewing.UI.Button(
      "handleselectionextensionButton"
    );

    // 테스트 1 : 선택한 객체 isolated 함수 만들기(익명함수로 하니깐 해결됨)  () =>  ------------------
    this.button1.onClick = () => {
      const dbids = this.viewer.getSelection();
      this.viewer.isolate(dbids);
    };
    // --------------------------------------------------------------------------------------------

    // //ALT 2 : 버튼 클릭하면 대화창 뜨고 --> 오케이 confirm 하면 실행되는 함수
    // button1.onClick = () => {
    //   // alert("(주)삼우씨엠건축사사무소"); //기입한 내용 출력 테스트용 함수---------------------

    //   // 선택한 객체 isolated 함수 만들기-------------------------
    //   // const dbids = this.viewer.getSelection(); //선택한 항목의 아이디 가져오기 위한 객체 생성
    //   // this.viewer.clearSelection(); //선택한 객체 강조하기
    //   // // 선택한 객체를 isolate 시키기 함수
    //   // if (dbids.length > 0) {
    //   //   let isolated = []; //객체를 격리하기 위한 배열 만들기
    //   //   //선택한 객체 속성 가져오기, 속성이름과 외부아이디 추가
    //   //   //confirm(`Isolate ${props.name} (${props.externalId})?`)는 선택한 항목의 속성을 대화창으로 호출하는 함수
    //   //   // 확인 창에서 ok 누르면 isolated.push(dbid); 함수 실행됨
    //   //   for (const dbid of dbids) {
    //   //     this.viewer.getProperties(dbid, (props) => {
    //   //       if (confirm(`Isolate ${props.name} (${props.externalId})?`)) {
    //   //         isolated.push(dbid); //리스트에 추가
    //   //         this.viewer.isolate(isolated); //isolated 리스트 객체를 isolate 시키기
    //   //       }
    //   //     });
    //   //   }
    //   // }
    //   // //선택 항목이 비어있으면, 모든 격리된 항목이 제거됩니다.
    //   // else {
    //   //   this.viewer.isolate([]); //격리된 항목을 해제한다(비운다)
    //   // }
    // };

    this.button1.setToolTip("My Extention"); //마우스를 가리킬때 표시되는 문자
    this.button1.addClass("handleselectionextensionIcon"); //아이콘 추가하기 -> main.css에 추가
    this.subToolbar.addControl(this.button1);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "HandleSelectionExtension",
  HandleSelectionExtension
);
