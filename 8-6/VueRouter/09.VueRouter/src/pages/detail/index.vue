<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'hahaha', params: { id: detail.id } }">{{
          detail.id
        }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'heiheihei', params: { id: detail.id } }">{{
          detail.content
        }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //根据上级路由传过来的params(id)找到的对应的要显示的数据,写在data里面为了能够动态显示
      detail: {},
    };
  },
  //模拟请求数据
  created() {
    setTimeout(() => {
      //detail会根据params上的id来请求的数据中寻找对应的对象然后返回
      const messages = [
        { id: 1, content: "111111" },
        { id: 2, content: "111111" },
        { id: 3, content: "111111" },
      ];
      this.messages = messages;
      //params传过来的不是数字,转化为数字以便使用
      const id = +this.$route.params.id;
      //数组的find方法找寻并返回对应paramsid的对象元素
      const detail = messages.find((item) => item.id === id);
      //赋值给data里面的detail,渲染去页面
      this.detail = detail;
    }, 1000);
  },
  //监视传入的id params是否有改动,如果改动则重新传入对应的数据去detail然后在页面动态显示
  watch: {
    //当上级路切换访问地址,则会有新的地址和params传入给$route对象,监视该对象的改动,实时获取新传入的params以便于更新detail
    $route(newVal) {
      //获取新的ID
      const id = +newVal.params.id;
      //数组的find方法找寻并返回对应paramsid的对象元素
      const detail = this.messages.find((item) => item.id === id);
      //赋值给data里面的detail,渲染去页面
      this.detail = detail;
    },
  },
};
</script>

<style scoped></style>
