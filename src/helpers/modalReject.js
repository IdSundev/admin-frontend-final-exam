exports.LoadScript = () => {
  const script = document.createElement("script");
  script.src = "/js/modalRequestinReject.js";
  script.async = true;
  document.body.appendChild(script);
};
