<template>
  <div class="wrap">
    <el-container>
      <div class="content">
        <RouterView />
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;

  .el-main {
    background-color: @bg;
    padding: 60px 0 10px 10px;
  }

  .content {
    box-sizing: border-box;
    flex: 1;
  }

  .footer {
    height: 50px;
  }
}
</style>
