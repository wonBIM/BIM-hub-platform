// Content for 'EventsTutorial.js'  // 확장탭 로드하는 함수
function EventsTutorial(viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);
}

EventsTutorial.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
EventsTutorial.prototype.constructor = EventsTutorial;

EventsTutorial.prototype.load = function () {
  alert("EventsTutorial is loaded!");
  return true;
};

EventsTutorial.prototype.unload = function () {
  alert("EventsTutorial is now unloaded!");
  return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension(
  "EventsTutorial",
  EventsTutorial
);

// Event hanlder for Autodesk.Viewing.SELECTION_CHANGED_EVENT #객체 선택하면 객체수 정보 얻는 이벤트 함수
EventsTutorial.prototype.onSelectionEvent = function (event) {
  var currSelection = this.viewer.getSelection();
  var domElem = document.getElementById("MySelectionValue");
  domElem.innerText = currSelection.length;
};

EventsTutorial.prototype.load = function () {
  this.onSelectionBinded = this.onSelectionEvent.bind(this);
  this.viewer.addEventListener(
    Autodesk.Viewing.SELECTION_CHANGED_EVENT,
    this.onSelectionBinded
  );
  return true;
};

EventsTutorial.prototype.unload = function () {
  this.viewer.removeEventListener(
    Autodesk.Viewing.SELECTION_CHANGED_EVENT,
    this.onSelectionBinded
  );
  this.onSelectionBinded = null;
  return true;
};
