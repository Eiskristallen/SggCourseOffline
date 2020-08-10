//MVVM实现数据代理和双向数据绑定
//主要三件事,数据代理,数据劫持(observe),和模板解析(Compile)
function MVVM(options) {
  this.$options = options || {};
  var data = (this._data = this.$options.data);
  var me = this;

  // 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._proxyData(key);
  });

  this._initComputed();
  //数据劫持(监听) 把数据变成响应式
  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  constructor: MVVM,
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxyData: function (key, setter, getter) {
    var me = this;
    setter =
      setter ||
      Object.defineProperty(me, key, {
        configurable: false,
        enumerable: true,
        get: function proxyGetter() {
          return me._data[key];
        },
        set: function proxySetter(newVal) {
          me._data[key] = newVal;
        },
      });
  },

  _initComputed: function () {
    var me = this;
    var computed = this.$options.computed;
    if (typeof computed === "object") {
      Object.keys(computed).forEach(function (key) {
        Object.defineProperty(me, key, {
          get:
            typeof computed[key] === "function"
              ? computed[key]
              : computed[key].get,
          set: function () {
            computed[key].set;
          },
        });
      });
    }
  },
};
