<template>
    <div class="addAddress">
        <div class="addAddress-title">
            <router-link to="/mine/myAddress" class="el-icon-arrow-left"></router-link>
            新增地址
            <i class="el-icon-check"></i>
        </div>
        <form class="form">
            <p class="form-item">
                <span>公司名称</span>
                <input type="text" v-model="form.companyName" placeholder="点击这里输入公司名称">
            </p>
        </form>
    </div>
</template>

<script>
export default {
  name: 'addAddress',
  data () {
    return {
        form: {
            companyName: ''
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.addAddress-title {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 100;
    text-align: center;
    border-bottom: 1px solid $borcd;
    color: $white;
    background-color: #89c4f4;
    @include font(16px, 50px);
    a, i {
        position: absolute;
        top: 19px;
        color: $white;

    }
    .el-icon-arrow-left {
        left: 20px;
    }
    .el-icon-check {
        right: 20px;
    }
}
.form {
    margin-top: 51px;
    background-color: $white;
}
.form-item {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c8c7cc;
    margin-left: 20px;
    input {
        margin-left: 20px;
        width: calc(100% - 64px - 20px - 20px);
    }
}
</style>
