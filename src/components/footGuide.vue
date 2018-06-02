<template>
    <div class="foot-guide">
        <el-menu :default-active="path" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/home">
                <img class="unActive-img" src="../../static/img/ico_gongsixinxi@2x.png" alt="home">
                <img class="active-img" src="../../static/img/ico_gongsixinxi_selected@2x.png" alt="home">
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/productPictures">
                <img class="unActive-img" src="../../static/img/ico_chanpintuce@2x.png" alt="productPictures">
                <img class="active-img" src="../../static/img/ico_chanpintuce_selected@2x.png" alt="productPictures">
                <span>产品图册</span>
            </el-menu-item>
            <el-menu-item index="/shoppingCart">
                <img class="unActive-img" src="../../static/img/ico_dangqiandingdan@2x.png" alt="shoppingCart">
                <img class="active-img" src="../../static/img/ico_dangqiandingdan_selected@2x.png" alt="shoppingCart">
                <span>当前订单</span>
            </el-menu-item>
            <el-menu-item index="/orderManagement">
                <img class="unActive-img" src="../../static/img/ico_dingdanguanli@2x.png" alt="orderManagement">
                <img class="active-img" src="../../static/img/ico_dingdanguanli_selected@2x.png" alt="orderManagement">
                <span>订单管理</span>
            </el-menu-item>
            <el-menu-item index="/mine">
                <img class="unActive-img" src="../../static/img/ico_xitongshezhi@2x.png" alt="mine">
                <img class="active-img" src="../../static/img/ico_xitongshezhi_selected@2x.png" alt="mine">
                <span>我的</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            path: this.$route.path
        }
    },
    methods: {
        handleSelect (index) {
            this.$router.push(index)
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
        padding-top: 5px;
        .el-menu-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0;
            @include font(12px, 20px);
            @include wh(100%, 40px);
            border-bottom: none;
            img {
                @include wh(18px, 18px);
                margin-right: 0px;
            }
            span {
                text-align: center;
                color: $fc;
            }
        }
        .is-active {
            border-bottom: none;
            span {
                color: #333333;
            }
            .active-img {
                display: flex;
            }
            .unActive-img {
                display: none;
            }
        }
    }
    .active-img {
        display: none;
    }
    .unActive-img {
        display: flex;
    }
}
</style>
