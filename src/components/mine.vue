<template>
    <div class="mine">
        <div class="header">
            <i class="el-icon-info"></i>
            <span>{{this.userInfo.name}}</span>
        </div>
        <div class="container">
            <ul class="menus">
                <li class="orange-item" @click="toAddress">
                    <i class="el-icon-location"></i>
                    <span>我的收货地址</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <!-- <li>
                    <i class="el-icon-goods"></i>
                    <span>我的商家</span>
                    <i class="el-icon-arrow-right"></i>
                </li> -->
                <li class="blue-item">
                    <i class="el-icon-mobile-phone"></i>
                    <span>关于软件</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="green-item">
                    <i class="el-icon-service"></i>
                    <span>关于我们</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
            <!-- <ul class="menus yellow-menus">
                <li>
                    <i class="el-icon-share"></i>
                    <span>把友购分享给朋友</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul> -->
            <ul class="menus red-menus">
                <li class="red-item">
                    <i class="el-icon-tickets"></i>
                    <span>服务与支付</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
// import {getComanyList} from './../service/getData'
import footGuide from './footGuide'
export default {
    name: 'mine',
    data () {
        return {
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    components: {
        footGuide
    },
    methods: {
        toAddress () {
            this.$router.push('/mine/myAddress')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.mine {
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 150px;
        padding-top: 30px;
        background-color: #62b1f5;
        i {
            @include sc(60px, $white);
        }
        span {
            margin-top: 10px;
            @include sc(14px, $white);
        }
    }
    .container {
        .menus {
            margin-top: 10px;
            background-color: $white;
            border-top: 1px solid #c8c7cc;
            border-bottom: 1px solid #c8c7cc;
            li {
                display: flex;
                align-items: center;
                height: 45px;
                position: relative;
                margin-left: 15px;
                padding-right: 15px;
                border-top: 1px solid #c8c7cc;
                border-bottom: 1px solid #c8c7cc;
                @include sc(14px, #999999);
                .el-icon-arrow-right {
                    position: absolute;
                    right: 10px;
                    color: #999999;
                }
                span {
                    margin-left: 5px;
                }
                &:first-child {
                    border: none;
                }
                &:last-child {
                    border: none;
                }
            }
        }
        .green-item {
            i {
                @include sc(19px, #a3c97e);
            }
        }
        .yellow-item {
            i {
                @include sc(19px, #f9d848);
            }
        }
        .blue-item {
            i {
                @include sc(19px, #62b1f5);
            }
        }
        .orange-item {
            i {
                @include sc(19px, orange);
            }
        }
        .red-item {
            i {
                @include sc(19px, #e77d69);
            }
        }
    }
}
</style>
