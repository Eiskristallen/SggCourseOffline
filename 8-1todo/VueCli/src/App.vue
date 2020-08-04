<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <CommentAdd :addTarget="addTarget" />
      <ul class="todo-main">
        <CommentList
          v-for="target of targets"
          :key="target.id"
          :target="target"
          :todelete="todelete"
          :setChecked="setChecked"
        />
      </ul>
      <div class="todo-footer">
        <CommentDel
          :checkAll="checkAll"
          :targets="targets"
          :deleteAllDone="deleteAllDone"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CommentList from "./components/CommentList";
import CommentDel from "./components/CommentDel";
import CommentAdd from "./components/CommentAdd";

export default {
  data() {
    // const targets = JSON.parse(localStorage.getItem("targets") || []);
    return {
      id: Date.now(),
      targets: [],
    };
  },
  methods: {
    deleteAllDone() {
      this.targets = this.targets.filter((item) => item.whetherChecked != true);
    },
    checkAll(val) {
      this.targets.forEach((item, index) => {
        item.whetherChecked = val;
      });
      console.log(this.targets);
    },
    todelete(itemID) {
      this.targets = this.targets.filter((item, index) => {
        return item.id != itemID;
      });
    },
    // modifyList(targetID, checked) {
    //   this.targets.filter((item, index) => {
    //     if (item.id === targetID) {
    //       item.whetherChecked = checked;
    //     }
    //   });
    //   console.log(this.targets);
    // },
    addTarget({ content }) {
      this.targets.push({
        id: Date.now(),
        targetName: content,
        whetherChecked: false,
      });
    },
    setChecked(id, whetherChecked) {
      this.targets = this.targets.map((item) => {
        if (item.id === id) {
          return { ...item, whetherChecked };
        }
        return item;
      });
    },
  },
  watch: {
    //每当targets变化时,存进local storage,防止刷新充值
    targets: function(newVal) {
      localStorage.setItem("targes", JSON.stringify(newVal));
    },
  },
  components: {
    CommentList,
    CommentDel,
    CommentAdd,
  },
};
</script>
<style scoped></style>
