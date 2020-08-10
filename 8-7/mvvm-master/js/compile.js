//插值语法编译
function Compile(el, vm) {
  //把vm对象(MVVM实例对象)添加到Compile实例对象上面
  this.$vm = vm;
  //判断el是元素节点还是选择器字符串
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  //如果el存在,则将el里面的子节点拿出来放入文档碎片
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    //调用init方法编译插值语法
    this.init();
    //文档碎片append到el上
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  constructor: Compile,
  //原型上添加的方法,用于吧el上的子节点添加到文档碎片上
  //创建文档碎片和child(el的子元素)
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将el的原生子节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    //返回文档碎片(里面有el的直接子节点)
    return fragment;
  },
  //真正的编译文档碎片的方法,实际调用下面的compileElement
  init: function () {
    this.compileElement(this.$fragment);
  },
  ////
  compileElement: function (el) {
    //拿取el(文档碎片形式)里面第一层的子节点
    var childNodes = el.childNodes,
      // Compile实例对象
      me = this;
    //el第一层子节点伪数组转换真数组,遍历内部的元素
    [].slice.call(childNodes).forEach(function (node) {
      //text是每个子节点的文本内容
      var text = node.textContent;
      //创建用来匹配插值语法的双大括号表达式
      var reg = /\{\{(.*)\}\}/;
      //me.isElementNode判断该节点是否为元素节点
      if (me.isElementNode(node)) {
        //Compile方法处理元素节点
        me.compile(node);
        //如果该节点为文本节点,且符合双大括号表达式里面的正则
      } else if (me.isTextNode(node) && reg.test(text)) {
        //compileText编译该节点,RegExp.$1.trim()拿取去除首位空格后的双大括号里面的表达式
        //上面的elseif和上面的if二选一触发,下面的if必定触发
        me.compileText(node, RegExp.$1.trim());
      }
      //判断该节点(第一层)里面的节点是否有子节点,如果有子节点,则递归调用compileElement方法确保最终能找到使用了插值语法的文本节点
      //实际是一个树状的解析,从树根(el下的第一层子节点一直解析到有匹配双大括号的文档节点为止)
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },
  ///
  //Complile方法,当子节点为元素节点时调用该方法(以下子节点称为元素节点)
  compile: function (node) {
    //获取元素节点里面的属性
    var nodeAttrs = node.attributes,
      //保存Compile实例对象
      me = this;
    //元素节点属性伪数组转换成真数组,遍历其中的元素
    [].slice.call(nodeAttrs).forEach(function (attr) {
      //获取元素节点内部属性的属性名(v-xxx="",v-为属性名)
      var attrName = attr.name;
      /*
      判断属性名是否为v-开头
      function (attr) {
         return attr.indexOf("v-") == 0;
      } 
      如果返回true则为指令
       */
      if (me.isDirective(attrName)) {
        //获取指令属性(v-开头)
        var exp = attr.value;
        //获取v-后的字符串指令
        var dir = attrName.substring(2);
        // 事件指令(判断截取v-后的指令是否以on开头)
        if (me.isEventDirective(dir)) {
          //compileUtil.eventHandler处理该事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          //compileUtil处理普通指令(截取v-后不为on)(如果dir为model,或html,下面compileUtil有专门方法编译)
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        //从该元素节点中移除处理后的属性(已经解析完毕,所以需要移除,防止遗留在页面)
        node.removeAttribute(attrName);
      }
    });
  },

  //处理文本节点的方法
  compileText: function (node, exp) {
    //实际上是调用compilUtil.text方法处理
    compileUtil.text(node, this.$vm, exp);
  },
  //判断是否为指令
  isDirective: function (attr) {
    return attr.indexOf("v-") == 0;
  },
  //判断指令是否为事件指令
  isEventDirective: function (dir) {
    return dir.indexOf("on") === 0;
  },
  //判断节点是否是元素节点
  isElementNode: function (node) {
    return node.nodeType == 1;
  },
  //判断是否是文本节点
  isTextNode: function (node) {
    return node.nodeType == 3;
  },
};

// 指令处理集合
var compileUtil = {
  //当调用compileUtile时根据.后的方法不同,调用不同的处理方法(例如刚才的compileText实际上就是调用了这个对象里面的text方法,并传入参数)
  text: function (node, vm, exp) {
    //实际上最后调用的是bind方法(调用compileTextElement实际调用CompileUtil.text,实际上最终调用的是bind)
    // 参数是要处理的节点(根据调用方法不同节点类型也不同),vm(MVVM实例对象),exp为掐头去尾后的大括号内部表达式
    //最后text表示传入的是节点类型
    this.bind(node, vm, exp, "text");
  },
  //下面两个方法是处理属性里面传v-model和v-html时使用的
  //调用该方法处理v-html里面传的值
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, "html");
  },
  //调用该方法处理v-model里面传的值
  //exp为属性里面的value(也就是v-model写的值)
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, "model");
    //保存Compile实例对象
    var me = this,
      //定义一个value存储调用_getVMVal后返回的值
      //_getVMVal方法实际上就是根据传过来的exp去MVVM实例对象上找寻对应的值并且返回
      //例如表达式为person.name,该方法会先用.拆分为数组,用第一个去实例上找对象,第二个去对象里找属性
      val = this._getVMVal(vm, exp);
    //给v-model里面传入的值(双向数据绑定的那个数据变量,比如v-model="value",处理的就是(node写了v-model的节点)value)
    node.addEventListener("input", function (e) {
      // 给该node绑定输入事件监听属性,函数为对比输入的value和之前(对应属性里面的value)是否相等,如相等则不修改
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      //如果值不相等调用_setVMVal修改里面对应的值
      me._setVMVal(vm, exp, newValue);
      //最后把newVal赋值给val
      val = newValue;
    });
  },
  //调用该方法当指令为v-class时
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, "class");
  },

  //bind方法,实际上调用Complieutil方法里真正调用的方法
  //传入的参数为,被遍历的节点(不论元素还是文本),vm(MVVM实例对象),exp提取出来的表达式(插值语法或者指令),dir为指令的类型(v-text跟插值语法一样)
  bind: function (node, vm, exp, dir) {
    //该方法会根据传入的指令不同调用不同的updater方法
    var updaterFn = updater[dir + "Updater"];

    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    //调用new Watcher,生成了一个新的watcher实例对象,传入vm实例对象,要处理的表达式,和一个回调函数(里面有新值和旧值)
    //由于此watcher是在bind里面生成的的,所以任何被bind处理过得元素内部都有一个watcher
    new Watcher(vm, exp, function (value, oldValue) {
      //
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  //处理事件指令的函数
  //传参为有绑定事件指令的node元素,MVVM实例对象,exp为上面拆出来的node.attr.value(实际上就是v-on:click="handle")
  //的这个handle
  //dir为指令名字on:click部分(去掉v-)
  eventHandler: function (node, vm, exp, dir) {
    //拆分on:click,拿取数组的第二位元素(即on:后面的事件类型(click))
    var eventType = dir.split(":")[1],
      //fn为用exp(属性value,即上面的handle)去MVVM实例对象上methods对象里面寻找到的对应的函数
      fn = vm.$options.methods && vm.$options.methods[exp];
    //如果满足条件,既有处理函数也有事件类型
    if (eventType && fn) {
      //则给该node绑定事件处理函数,类型为上面获得的类型,回调函数为之前从methods里面拿到的回调函数,false为冒泡
      //fn.bind(vm)的意义在于把该函数的this强制绑定为MVVM实例对象(原来事件回调函数里面的this指向绑定该事件的dom)
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  //该方法是根据插值语法提取出来的表达式(person.name形式)拿去里面对应的value(而且只会拿到最后一个key里面真正的value,例如person.name.hehe,拿去到的会是hehe里面的内容)
  _getVMVal: function (vm, exp) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function (k) {
      //逐层解构对象
      val = val[k];
    });
    //返回最终的value
    return val;
  },

  //vm为MVVM实例对象,exp为拆分出来的表达式,value为想修改的值
  _setVMVal: function (vm, exp, value) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      //通过一直循环用后一位的key给val取值,确保最后赋值的是正确的属性
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        //数组最后一个key,用来接收传入的value
        val[k] = value;
      }
    });
  },
};

var updater = {
  textUpdater: function (node, value) {
    //bind方法实际调用的方法,
    /* 
    现根据上面传入的指令名字获取对应的updater函数,
    var updaterFn = updater[dir + "Updater"];
     如果函数存在的情况下调用getVMVal方法获取表达式里面的属性在配置对象里面的value
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    node是要更改的node,value为从MVVM对象里面获取到的值
    */
    //如果指令为text,则更改node.textContent的值
    node.textContent = typeof value == "undefined" ? "" : value;
  },

  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },
  //obsoleted
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, "").replace(/\s$/, "");

    var space = className && String(value) ? " " : "";

    node.className = className + space + value;
  },
  //未完成
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
};
