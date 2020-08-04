<template>
  <!-- 任务列表 -->
  <div>
    <!-- 遍历数组,生成复数个li用来展示数据,给li设置鼠标移入移出事件控制isShow属性,让删除按钮变为可见和不可见,并且修改class属性 -->
    <li
      v-for="item of items"
      :key="item.id"
      :class="{ 'item-bg': isShow }"
      @mouseenter="isShow=true"
      @mouseleave="isShow=false"
    >
      <label>
        <input type="checkbox" v-model="item.done" />
        <span>{{ 1 }}</span>
      </label>
      <button
        class="btn btn-danger"
        style="display:none"
        v-show="isShow"
        @click="handelDeleteSingle(item.id)"
      >删除</button>
    </li>
  </div>
</template>
<script>
export default {
  mounted() {
    //全局总线事件的绑定和解绑
    this.$bus.items = this.items;
    this.$bus.$on("addItems", this.addItems);
  },
  beforeDestroy() {
    this.$bus.$off("addItems", this.addItems);
  },
  data() {
    return {
      items: [],
      isShow: false,
    };
  },
  methods: {
    //添加的方法
    addItems(val) {
      this.items.push(val);
    },
    handelDeleteSingle(id) {
      console.log(id);
      this.items = this.items.filter((item) => {
        return item.id !== id;
      });
    },
  },
  computed: {
    dynamicItems: {
      get() {
        return this.items;
      },
      set() {},
    },
  },
};
</script>
<style scoped>
.item-bg {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
