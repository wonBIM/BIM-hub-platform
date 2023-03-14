/// import * as Autodesk from "@types/forge-viewer";
import "./extensions/LoggerExtension.js";
import "./extensions/SummaryExtension.js";
import "./extensions/HistogramExtension.js";
import "./extensions/DataGridExtension.js";
import "./extensions/EventsTutorial.js";
import "./extensions/ToolbarExtension.js";
import "./extensions/addgeom.js";
import "./extensions/Profile.js"; // 설정 커스텀 세팅
import "./extensions/HelloWorld.js"; // HelloWorld
import "./extensions/handleselectionextension.js";
//import "./extensions/PropertyDB.js";  //튜토리얼 속성 데이터베이스 쿼리(매스속성) - 로딩 안됨
//import "./extensions/SceneBuilderext.js"; // 잘 안됨

async function getAccessToken(callback) {
  try {
    const resp = await fetch("/api/auth/token");
    if (!resp.ok) throw new Error(await resp.text());
    const { access_token, expires_in } = await resp.json();
    callback(access_token, expires_in);
  } catch (err) {
    alert("Could not obtain access token. See the console for more details.");
    console.error(err);
  }
}

export function initViewer(container) {
  return new Promise(function (resolve, reject) {
    Autodesk.Viewing.Initializer({ getAccessToken }, async function () {
      const config = {
        extensions: [
          "LoggerExtension",
          "SummaryExtension",
          "HistogramExtension",
          "DataGridExtension",
          "EventsTutorial",
          "ToolbarExtension",
          "AddgeomExtension",
          "Profile",
          "Autodesk.VisualClusters", //기본 내장 라이브러리(재료별 펼쳐주는 기능)
          "Autodesk.DocumentBrowser", //기본 내장 라이브러리
          "HelloWorld",
          "HandleSelectionExtension",
          //"Autodesk.Snapping", //기본 내장 라이브러리
          //"Autodesk.SplitScreen", //기본 내장 라이브러리
          //"userFunction",
          //"SceneBuilder",
        ],
      };

      const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
      viewer.start();
      viewer.setTheme("light-theme");
      resolve(viewer);
    });
  });
}

export function loadModel(viewer, urn) {
  function onDocumentLoadSuccess(doc) {
    viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
  }
  function onDocumentLoadFailure(code, message) {
    alert("Could not load model. See console for more details.");
    console.error(message);
  }
  Autodesk.Viewing.Document.load(
    "urn:" + urn,
    onDocumentLoadSuccess,
    onDocumentLoadFailure
  );
}
