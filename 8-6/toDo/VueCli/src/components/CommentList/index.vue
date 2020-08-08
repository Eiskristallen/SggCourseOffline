<template>
  <!-- 任务列表 -->
  <li>
    <label>
      <!--双向数据绑定,让checkbox能直接获取和修改state里面对应的item的done状态 -->
      <input type="checkbox" v-model="isChecked" />
      <span>{{ item.itemName }}</span>
    </label>
    <!-- deleteSingleItem 方法绑定单击事件,删除按钮显示隐藏根据是否选中决定 -->
    <button
      class="btn btn-danger"
      style="display:none"
      v-show="isChecked"
      @click="deleteSingleItem"
    >
      删除
    </button>
  </li>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    deleteSingleItem() {
      console.log(123);
      this.$store.dispatch("deleteSingleItem", this.item.id);
    },
  },
  computed: {
    //定义计算属性ischecked,get返回state里对应item的done状态,set则利用item的唯一id去修改items里对应该id的数据的done属性
    isChecked: {
      get() {
        return this.item.done;
      },
      set(isChecked) {
        this.$store.dispatch("changeDone", this.item.id);
      },
    },
  },
};
</script>
<style scoped></style>
