function MVVM(options) {
  //option是new调用的时候穿进去的配置参数

  this.$options = options || {};
  //options 原属性数据赋值给this_data,
  //   然后在下面给实例对象用define property从_data里面拿去数据并重新定意为实例对象上属性,并且重写getter和setter的方法,get就是返回_data代理后的属性
  var data = (this._data = this.$options.data);
  var me = this;
  Object.keys(data).forEach(function (key) {
    me._proxyData(key);
  });
  this_initComputed();
  observe(data, this);
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
}
function MVVM(options) {
  this.$options = options || {};
  var me = this;
  var data = (this._data = this.$options.data);
  Object.keys(data).forEach((item) => {
    me.proxyData(item);
  });
  function proxyData(me, key) {
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function () {
        return me._data[key];
      },
      set: function (newVal) {
        if (me._data[key] === newVal) return;
        me._data[key] = newVal;
      },
    });
    //$1就是正则匹配上的里面的数据,如果匹配上多个还有$2 3 ...
    RegExp.$1.trim();
  }
}
