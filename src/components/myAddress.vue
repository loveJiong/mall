<template>
    <div class="myAddress">
        <div class="myAddress-title">
            <router-link to="/mine" class="el-icon-arrow-left"></router-link>
            收货地址
            <router-link to="/mine/myAddress/add" class="el-icon-circle-plus-outline"></router-link>
        </div>
        <div class="container">
            <div class="no-address">
                <i class="el-icon-warning"></i>
                <span class="title">收货地址是空的</span>
                <span class="text">你目前没有任何收货地址，点击右上角[+]添加一个地址！</span>
                <router-link to="/mine/myAddress/add">添加一个</router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import {getComanyList} from './../service/getData'
export default {
    name: 'myAddress',
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.myAddress {
    .myAddress-title {
        position: fixed;
        width: 100%;
        top: 0px;
        z-index: 100;
        text-align: center;
        border-bottom: 1px solid $borcd;
        color: $white;
        background-color: #89c4f4;
        @include font(16px, 50px);
        a {
            position: absolute;
            top: 19px;
            color: $white;

        }
        .el-icon-arrow-left {
            left: 20px;
        }
        .el-icon-circle-plus-outline {
            right: 20px;
        }
    }
    .container {
        height: 100%;
        margin-top: 51px;
        .no-address {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 20px;
            padding-top: 50%;
            i {
                color: #888888;
                font-size: 60px;
            }
            span {
                text-align: center;
            }
            .title {
                margin-top: 10px;
                @include sc(16px, #000000);
            }
            .text {
                margin-top: 10px;
                @include sc(14px, #888888);
            }
            a {
                margin-top: 10px;
                @include sc(14px, $blue);
            }
        }
    }
}

</style>
