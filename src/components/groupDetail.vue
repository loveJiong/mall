<template>
  <div class="group-detail">
        <div class="header">
            <router-link to="/productPictures" class="el-icon-arrow-left"></router-link>
            <div class="title" v-on:click="menuToggle">
                <span class="bigGroup-name">{{bigGroupName}}</span>
                <span>{{smallGroupName}}</span>
                <i v-show="menuShow" class="el-icon-caret-top"></i>
                <i v-show="!menuShow" class="el-icon-caret-bottom"></i>
            </div>
            <div class="header-icons">
                <router-link to="/productPictures" class="el-icon-goods"></router-link>
                <i class="el-icon-search"></i>
            </div>
            <div class="header-menu" v-show="menuShow">
                <ul class="bigGroupList">
                    <li v-for="(bigGroup, index) in bigGroupList" v-bind:key="index" v-bind:class="{ active: bigGroup.isActive}">
                        <span>{{bigGroup.title}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                </ul>
                <ul class="smallGroupList">
                    <li v-for="(smallGroup, index) in smallGroupList" v-bind:key="index">
                        <img v-bind:src="smallGroup.imgSrc" alt="图片">
                        <span>{{smallGroup.title}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <ul class="container">
            <li v-for="(good, index) in goods" v-bind:key="index">
                <img v-bind:src="good.imgSrc" alt="图片">
                <span>{{good.title}}</span>
                <div>
                    <span class="price">{{good.price}}</span>
                    <i class="el-icon-circle-plus-outline"></i>
                </div>
            </li>
        </ul>
        <div class="box" v-show="menuShow"></div>
    </div>
</template>

<script>
// import {getComanyList} from './../service/getData'
export default {
    name: 'groupDetail',
    data () {
        return {
            tabPosition: 'left',
            bigGroupName: 'A-季节系列',
            smallGroupName: 'B01-电扇，灭蚊灯系列',
            menuShow: false,
            goods: [
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '2.38$'
                },
                {
                    imgSrc: '/static/img/bigGroup2.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '3.38$'
                },
                {
                    imgSrc: '/static/img/bigGroup3.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '3.38$'
                },
                {
                    imgSrc: '/static/img/bigGroup3.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '3.38$'
                },
                {
                    imgSrc: '/static/img/bigGroup3.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '3.38$'
                },
                {
                    imgSrc: '/static/img/bigGroup3.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '3.38$'
                },
                {
                    imgSrc: '/static/img/bigGroup3.jpg',
                    title: ' 灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯灭蚊灯',
                    price: '3.38$'
                }
            ],
            bigGroupList: [
                {
                    isActive: true,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                },
                {
                    isActive: false,
                    title: 'A-季节系列'
                }
            ],
            smallGroupList: [
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                },
                {
                    imgSrc: '/static/img/bigGroup1.jpg',
                    title: 'A-季节系列'
                }
            ]
        }
    },
    components: {
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background:#ffffff')
    },
    beforeDestroy () {
        document.querySelector('body').setAttribute('style', '')
    },
    created () {
    },
    methods: {
        menuToggle () {
            this.menuShow = !this.menuShow
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.group-detail {
    .box {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:#000;
        opacity:0.4;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        @include wh(100%, $headH);
        background-color: $white;
        border-bottom: 1px solid $borcd;
        position: fixed;
        z-index: 100;
        .title {
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            @include wh(200px, 40px);
            @include sc(12px, #555555);
            border: 1px solid #eb8677;
            border-radius: 5px;
            i {
                position: absolute;
                right: 10px;
            }
            .bigGroup-name {
                font-size: 14px;
            }
        }
        .header-icons {
            .el-icon-goods {
                color: #000000;
                margin-right: 5px;
            }
            .el-icon-goods:active {
                color: #000000;
            }
        }
        .header-menu {
            display: flex;
            position: absolute;
            background-color: #ffffff;
            width: 100%;
            height: 400px;
            top: 50px;
            padding-bottom: 10px;
            z-index: 100;
            .bigGroupList {
                height: 100%;
                background-color: #f8f8f8;
                width: 177px;
                overflow-x: hidden;
                overflow-y: auto;
                li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    @include wh(100%, 55px);
                    @include sc(14px, #000000);
                    padding-left: 17px;
                    padding-right: 5px;
                    border-bottom: 1px solid #c8c7cc;
                    span {
                        border-left: 4px solid #f8f8f8;
                        position: relative;
                        left: -10px;
                        padding-left: 6px;
                    }
                }
                .active {
                    background-color: #ffffff;
                    span {
                        border-left: 4px solid #ed706b;
                    }
                }
            }
            .smallGroupList {
                @include wh(100%, 100%);
                overflow-x: hidden;
                overflow-y: auto;
                li {
                    display: flex;
                    align-items: center;
                    @include wh(100%, 55px);
                    margin-left: 10px;
                    border-bottom: 1px solid #c8c7cc;
                    img {
                        @include wh(70px, 45px);
                    }
                    span {
                        @include sc(14px, #000000);
                        margin-left: 10px;
                    }
                }
            }
        }
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        padding: $headH 2% 0 2%;
        li {
            display: flex;
            flex-direction: column;
            width: 49%;
            border: 1px solid #aaaaaa;
            border-radius: 5px;
            margin-top: 7px;
            padding: 15px 0 10px 0;
            img {
                width: 100%;
            }
            span {
                @include sc(12px, #555555);
                margin-top: 15px;
                padding: 0 5px;
            }
            div {
                position: relative;
                .price {
                    @include sc(12px, #5eacf0);
                }
                i {
                    position: absolute;
                    right: 5px;
                    top: 3px;
                    @include sc(18px, #dad8d6);
                }
            }
        }
        li:nth-child(odd) {
            margin-right: 1%;
        }
        li:nth-child(even) {
            margin-left: 1%;
        }
    }
}
</style>
