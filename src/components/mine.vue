<template>
    <div class="mine">
        <div class="header">
            <i class="el-icon-info"></i>
            <span>{{id}}</span>
        </div>
        <div class="container">
            <ul class="menus green-menus">
                <li>
                    <i class="el-icon-location"></i>
                    <span>我的收货地址</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li>
                    <i class="el-icon-goods"></i>
                    <span>我的商家</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
            <ul class="menus yellow-menus">
                <li>
                    <i class="el-icon-share"></i>
                    <span>把友购分享给朋友</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
            <ul class="menus red-menus">
                <li>
                    <i class="el-icon-message"></i>
                    <span>意见反馈</span>
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
            id: '+3412321321321321'
        }
    },
    components: {
        footGuide
    },
    methods: {
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
                @include sc(14px, #999999);
                .el-icon-arrow-right {
                    position: absolute;
                    right: 10px;
                    color: #999999;
                }
                span {
                    margin-left: 5px;
                }
            }
        }
        .green-menus {
            i {
                @include sc(19px, #a3c97e);
            }
            li:first-child {
                border-bottom: 1px solid #c8c7cc;
            }
        }
        .yellow-menus {
            i {
                @include sc(19px, #f9d848);
            }
        }
        .red-menus {
            i {
                @include sc(19px, #e77d69);
            }
        }
    }
}
</style>
