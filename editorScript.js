let editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "text/x-csrc",
  theme: "dracula",
  lineNumbers: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
  doMatchTags: true,
  trailingspace: true,
  matchBrackets: true,
});

let width = window.innerWidth;
editor.setSize(0.7 * width, "500");

let option = document.getElementById("languageSelect");

option.addEventListener("change", function () {
  if (option.value == "Java") {
    editor.setOption("mode", "text/x-java");
  } else if (option.value == "Python") {
    editor.setOption("mode", "text/x-python");
  } else if (option.value == "C++") {
    editor.setOption("mode", "text/x-c++src");
  } else {
    editor.setOption("mode", "text/x-csrc");
  }
});

let inputData = document.getElementById("input-data");
let outputData = document.getElementById("output-data");
let runButton = document.getElementById("run-button");

let code;

runButton.addEventListener("click",  function (event) {
  
  event.preventDefault();

  let code = {
    code: editor.getValue(),
    input: inputData.value,
    lang: option.value,
  };

  try {

    console.log("Before fetch request");

    let oData =  fetch("http://localhost:8081/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    
    console.log("After fetch request");
  
    let response =  oData.json();
  
    console.log("Response:", response);
    console.log("Status:", oData.status); 
  
    if (response.error) {
      outputData.value = response.error;
    } else {
      outputData.value = response.output;
    }
    
  } catch (error) {
    console.error("Fetch error:", error);
  }

  // outputData.value = editor.getValue();

});
