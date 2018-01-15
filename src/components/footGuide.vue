<template>
  <div class="foot-guide">
    <el-menu default-active="1" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-star-off"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-picture-outline"></i>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-goods"></i>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
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
<style scoped>
.foot-guide {
  position: absolute;
  bottom: 0px;
}

.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
}
</style>
