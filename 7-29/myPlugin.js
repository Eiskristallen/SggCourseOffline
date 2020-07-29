myPlugin = function (Vue) {
  Vue.prototype.$method = function () {
    console.log("myMethod");
  };
  Vue.hahaha = function () {
    console.log("hahahah");
  };
  Vue.directive("touppercase", function (el, binding) {
    el.textContent = binding.value.toUpperCase();
  });
};
