exports.LoadScript = () => {
  const script = document.createElement("script");
  script.src = "/js/modalFailedAddProduct.js";
  script.async = true;
  document.body.appendChild(script);
};
