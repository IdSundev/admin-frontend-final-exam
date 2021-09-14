exports.LoadScript = () => {
  const script = document.createElement("script");
  script.src = "/js/modalConfirmationDeleteProduct.js";
  script.async = true;
  document.body.appendChild(script);
};