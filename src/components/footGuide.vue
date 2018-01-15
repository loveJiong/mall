<template>
  <div class="foot-guide">
    <el-menu default-active="1" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-star-off"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-picture-outline"></i>
        <span>产品图册</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span>当前订单</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-goods"></i>
        <span>订单管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span>我的</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.foot-guide {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid $borcd;
  .el-menu--horizontal {
    display: flex;
    justify-content: space-around;
    border-bottom: none;
    margin-top: 5px;
    .el-menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include font(12px, 20px);
      @include wh(100%, 40px);
      border-bottom: none;
      i {
        @include wh(100%, 100%);
        margin-right: 0px;
      }
      span {
        color: $grey;
      }
    }
    .is-active {
      border-bottom: none;
      span {
        color: $blue;
      }
      i {
        color: $blue;
      }
    }
  }
}
</style>
