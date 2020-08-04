<template>
  <!-- 任务列表 -->
  <li>
    <label>
      <input type="checkbox" v-model="ifChecked" />
      <span>{{ target.targetName }}</span>
    </label>
    <button
      class="btn btn-danger"
      style="display:none"
      v-show="isShow"
      @click="handleDelete"
    >
      删除
    </button>
  </li>
</template>
<script>
export default {
  props: ["target", "todelete", "setChecked"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    // onHanderl(e) {
    //   // this.showDel(this.target.id);
    //   console.log(e.target.checked, this.target.id);
    //   this.showButton = e.target.checked;
    //   // this.modifyList(this.target.id, e.target.checked);
    // },
    handleDelete() {
      this.todelete(this.target.id);
    },
  },
  computed: {
    ifChecked: {
      get: function() {
        this.isShow = this.target.whetherChecked;
        return this.target.whetherChecked;
      },
      set: function(ifChecked) {
        this.setChecked(this.target.id, ifChecked);
      },
    },
  },
};
</script>
<style scoped></style>
