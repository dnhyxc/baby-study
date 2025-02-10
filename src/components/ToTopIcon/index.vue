<!--
 * 滚动置顶图标
 * @author: dnhyxc
 * @since: 2023-02-09
 * index.vue
-->
<template>
  <div class="back-top" @click="onScroll">
    <i class="icon iconfont icon-huojian" />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  onScrollTo: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  onScrollTo: () => {},
});

const onScroll = () => {
  props.onScrollTo();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.back-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  bottom: 80px;
  background-color: rgba(212, 210, 190, 0.8);
  box-shadow: 0 0 10px @bg;
  padding: 5px;
  cursor: pointer;
  z-index: 999;
  width: 30px;
  height: 30px;
  border-radius: 5px;

  .icon {
    font-size: 20px;
  }
}
</style>
