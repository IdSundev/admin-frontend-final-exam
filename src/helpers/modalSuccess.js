exports.LoadScript = () => {
  const script = document.createElement("script");
  script.src = "/js/modalSuccessAddProduct.js";
  script.async = true;
  document.body.appendChild(script);
};
