if (!document.getElementById("figgy-dashboard")) {
  const container = document.createElement("div");

  container.id = "figgy-dashboard";
  container.innerHTML = `<div id="figgy-dashboard"></div>`;
  document.body.appendChild(container);

  const script = document.createElement("script");

  script.type = "module";
  script.src = chrome.runtime.getURL("figgy-dashboard.js");
  document.body.appendChild(script);
}
