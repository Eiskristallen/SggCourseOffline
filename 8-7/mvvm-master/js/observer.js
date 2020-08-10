//observer用来监视和给数据添加响应式
//调用observe方法实际上就是调用了Observer并传入data
//整个data都被调用过observe函数监视过
function Observer(data) {
  //在Observer对象上定义data,这个data会影响到mvvm实例对象上的data,因为只是给了地址值而已,实际上用的是同一个对象
  this.data = data;
  //给data调用walk方法(这个walk方法实际上会遍历data里面的key和value,然后给每个key和value都调用convert方法)
  //而convert方法会调用defineReactive方法给data和key和value,这个方法就是让数据变成响应式的关键
  this.walk(data);
}

Observer.prototype = {
  constructor: Observer,
  walk: function (data) {
    var me = this;
    Object.keys(data).forEach(function (key) {
      me.convert(key, data[key]);
    });
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function (data, key, val) {
    //每一个响应式属性(data中的数据),都通过闭包的形式,保存了一个dep

    var dep = new Dep();
    //通过递归遍历,把最内层的value(只要是对象,比如person.name:{})都变成响应式,先将里面的属性变成响应式,再把外面的变成响应式
    //这个遍历会遍历到最后一层直到传入的value不是对象为止,凡是对象属性都会变成响应式,observe方法会返回一个Observer的实例对象
    //上面有响应式的data
    var childObj = observe(val);
    //将data里面的数据重新定义,(后续传进来的data和keyvalue会是第二层的对象,如果第一层data里面的属性值是对象的话)把数据变为响应式
    //所以响应式化的过程是从内到外的

    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify();
      },
    });
  },
};

function observe(value, vm) {
  if (!value || typeof value !== "object") {
    return;
  }

  return new Observer(value);
}

var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};

Dep.target = null;
