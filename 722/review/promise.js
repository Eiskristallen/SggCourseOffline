function Mypromise(executor) {
  const _this = this;
  _this.statu = "pending";
  _this.callback = {};
  function resolve(para) {
    if (_this.statu === "pending") {
      _this.statu = "resolved";
      setTimeout(() => {
        _this.callback.onResolved?.(para);
      });
    }
    return;
  }
  function reject(reason) {
    if (_this.statu === "pending") {
      _this.statu = "rejected";
      setTimeout(() => {
        _this.callback.onRejected?.(reason);
      });
    }
  }
  executor(resolve, reject);
}

Mypromise.prototype.then = function (full, fail) {
  const _this = this;
  return new Mypromise((res, rej) => {
    full = typeof full === "function" ? full : (para) => para;
    fail =
      typeof fail === "function"
        ? fail
        : (reason) => {
            throw reason;
          };
    _this.callback.onResolved = function (para) {
      try {
        let result = full(para);
        if (result instanceof Mypromise) {
          result.then(res, rej);
        } else {
          res(para);
        }
      } catch (error) {
        rej(error);
      }
    };
    _this.callback.onRejected = function (reason) {
      try {
        let result = full(para);
        if (result instanceof Mypromise) {
          result.then(res, rej);
        } else {
          res(para);
        }
      } catch (error) {
        rej(error);
      }
    };
  });
};
Mypromise.prototype.catch = function (fail) {
  return this.then(undefined, fail);
};
Mypromise.resolve = function (value) {
  if (value instanceof Mypromise) {
    return value;
  }
  return new Mypromise((res) => {
    res(value);
  });
};
Mypromise.reject = function (value) {
  return new Mypromise((res, rej) => {
    rej(value);
  });
};
Mypromise.prototype.finally = function (onDefault) {
  return this.then(
    (value) => {
      let result = onDefault();
      if (result instanceof Mypromise) {
        return result.then();
      }
      return value;
    },
    (value) => {
      let result = onDefault();
      if (result instanceof Mypromise) {
        throw result.then();
      }
      throw value;
    }
  );
};
Mypromise.all = function (arg) {
  const promises = arg.length;
  let achieveNum = 0;
  let arr = [];
  return new Mypromise((res, rej) => {
    for (let index = 0; index < arg.length; index++) {
      arg[index].then(
        (value) => {
          arr[index] = value;
          achieveNum++;
          if (achieveNum === promises) {
            res(arr);
          }
        },
        (reason) => {
          rej(reason);
        }
      );
    }
  });
};
Mypromise.allSettled = function (arg) {
  const proimises = arg.length;
  let achieveNum = 0;
  let arr = [];
  return new Mypromise((res, rej) => {
    arg.forEach((item, index) => {
      item.then(
        (value) => {
          achieveNum++;
          arr[index] = {
            status: item.statu,
            value,
          };
          if (achieveNum === proimises) {
            res(arr);
          }
        },
        (reason) => {
          achieveNum++;
          arr[index] = {
            status: item.statu,
            reason,
          };
          if (achieveNum === proimises) {
            rej(arr);
          }
        }
      );
    });
  });
};
