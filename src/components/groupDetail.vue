<template>
    <div class="group-detail">
        <div class="header" @click.stop="''">
            <router-link to="/productPictures" class="el-icon-arrow-left"></router-link>
            <div class="title" @click.stop="menuToggle">
                <span class="category-name">{{activeCategory.name}}</span>
                <span v-if="activeSecondary">{{activeSecondary.name}}</span>
                <i v-show="menuShow" class="el-icon-caret-top"></i>
                <i v-show="!menuShow" class="el-icon-caret-bottom"></i>
            </div>
            <div class="header-icons">
                <router-link to="/shoppingCart" class="el-icon-goods"></router-link>
                <i class="el-icon-search"></i>
            </div>
            <div class="header-menu" v-show="menuShow">
                <ul class="categoryList">
                    <li v-for="(category, index) in categoryList" v-bind:key="index" v-bind:class="{ active: category.isActive}" @click.stop="categoryChoose(category)">
                        <span>{{category.name}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                </ul>
                <ul class="secondaryList">
                    <li v-for="(secondary, index) in secondaryList" v-bind:key="index" @click.stop="secondaryChoose(secondary)">
                        <img v-bind:src="secondary.url" alt="图片">
                        <span>{{secondary.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <pull-to :bottom-load-method="refresh" :bottom-config="{failText: '没有更多', doneText: '', stayDistance: 0}" :bottom-block-height="0">
            <ul class="container">
                <li v-for="(good, index) in goods" v-bind:key="index">
                    <div class="good-num" v-if="good.num > 0">{{good.num}}</div>
                    <div class="good-no">REF:{{good.no}}</div>
                    <div class="good-img">
                        <img class="good-img-icon" v-bind:src="good.url" alt="图片">
                    </div>
                    <span>{{good.name}}</span>
                    <div>
                        <div class="good-detail">
                            <span class="good-count">库存：{{good.count}}</span>
                            <span class="good-pck">包装数：{{good.bagCount}}/{{good.bagCount}}</span>
                        </div>
                        <span v-if="good.zk == '0'" class="price">{{good.price}}€</span>
                        <div v-if="good.zk != '0'" class="have-zk">
                            <span class="zk-price">{{zkPrice(good.price, good.zk)}}€</span>
                            <span class="origin-price">{{good.price}}</span>
                            <span class="zk">(-{{good.zk}}%)</span>
                        </div>
                        <div class="add-remove">
                            <i class="el-icon-remove" @click="removeToCart(good)" v-if="good.num > 0"></i>
                            <i class="el-icon-circle-plus" @click="addToCart(good)"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </pull-to>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>

</template>

<script>
import {getGoods} from './../service/getData'
import PullTo from 'vue-pull-to'
export default {
    name: 'groupDetail',
    components: {
        PullTo
    },
    data () {
        return {
            tabPosition: 'left',
            menuShow: false,
            goods: [],
            activeSecondary: null,
            offset: 0,
            index: -1
        }
    },
    computed: {
        activeCategory () {
            return this.$store.state.activeCategory
        },
        categoryList () {
            return this.$store.state.categoryList.map((category) => {
                if (category.guid === this.activeCategory.guid) {
                    category.isActive = true
                } else {
                    category.isActive = false
                }
                return category
            })
        },
        secondaryList () {
            return this.activeCategory.secondaryList.filter((secondary) => {
                return secondary.level === 1
            })
        },
        activeCompany () {
            return this.$store.state.activeCompany
        },
        cart () {
            return this.$store.state.cart
        }
    },
    beforeDestroy () {
        document.querySelector('body').setAttribute('style', '')
        document.removeEventListener('click', this.menuHide)
    },
    mounted () {
        document.querySelector('body').setAttribute('style', 'background:#ffffff')
        document.addEventListener('click', this.menuHide)
        if (this.secondaryList.length > 0) {
            this.activeSecondary = this.secondaryList[0]
        }
        this.getGoods()
    },
    methods: {
        async getGoods () {
            if (this.activeSecondary) {
                let index = this.getSecondaryIndex(this.activeSecondary)
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeSecondary.guid)
                if (goodsRes.success && goodsRes.data.length > 0) {
                    this.setGood(goodsRes.data)
                    this.goods = goodsRes.data
                    console.log(this.goods)
                    this.offset = goodsRes.offset
                    this.index = index
                } else if (goodsRes.success) {
                    for (++index; index < this.activeCategory.secondaryList.length; index++) {
                        goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                        if (goodsRes.success && goodsRes.data.length > 0) {
                            this.setGood(goodsRes.data)
                            this.goods = goodsRes.data
                            this.offset = goodsRes.offset
                            this.index = index
                            break
                        }
                    }
                }
            } else {
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.guid)
                console.log(goodsRes)
                if (goodsRes.success) {
                    this.setGood(goodsRes.data)
                    this.goods = goodsRes.data
                    this.offset = goodsRes.offset
                    this.index = -1
                }
            }
        },
        setGood (goods) {
            let companyId = this.activeCompany.companyId
            goods.forEach(good => {
                if (this.cart[companyId] && this.cart[companyId][good.id]) good.num = this.cart[companyId][good.id].num
                else good.num = 0
            })
        },
        getSecondaryIndex (secondary) {
            return this.activeCategory.secondaryList.indexOf(secondary)
        },
        menuToggle () {
            this.menuShow = !this.menuShow
            if (this.menuShow) {
                document.querySelector('body').setAttribute('style', 'overflow:hidden;background:#ffffff')
            } else {
                document.querySelector('body').setAttribute('style', 'overflow:auto;background:#ffffff')
            }
        },
        menuHide () {
            if (this.menuShow) {
                this.menuShow = false
                document.querySelector('body').setAttribute('style', 'overflow:auto;background:#ffffff')
            }
        },
        preventTouchmove (event) {
            if (this.menuShow) {
                event.preventDefault()
            }
        },
        categoryChoose (category) {
            this.$store.commit('setActiveCategory', category)
            if (this.secondaryList.length > 0) {
                this.activeSecondary = this.secondaryList[0]
            } else {
                this.activeSecondary = null
            }
            this.getGoods()
        },
        secondaryChoose (secondary) {
            this.menuShow = false
            this.activeSecondary = secondary
            this.getGoods()
            document.querySelector('body').setAttribute('style', 'overflow:auto;background:#ffffff')
        },
        async refresh (loaded) {
            let index = this.index
            if (index >= 0) {
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid, this.offset)
                console.log(goodsRes)
                if (goodsRes.success && goodsRes.data.length > 0) {
                    this.setGood(goodsRes.data)
                    this.goods.push(...goodsRes.data)
                    this.offset = goodsRes.offset
                    loaded('done')
                } else if (goodsRes.success) {
                    for (++index; index < this.activeCategory.secondaryList.length; index++) {
                        goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                        if (goodsRes.success && goodsRes.data.length > 0) {
                            this.setGood(goodsRes.data)
                            this.goods.push(...goodsRes.data)
                            this.offset = goodsRes.offset
                            this.index = index
                            if (this.activeCategory.secondaryList[index].level === 1) {
                                this.activeSecondary = this.activeCategory.secondaryList[index]
                            }
                            break
                        }
                    }
                    loaded('done')
                } else {
                    loaded('fail')
                }
            } else {
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.guid, this.offset)
                console.log(goodsRes)
                if (goodsRes.success && goodsRes.data.length > 0) {
                    this.setGood(goodsRes.data)
                    this.goods.push(...goodsRes.data)
                    this.offset = goodsRes.offset
                    this.index = -1
                    loaded('done')
                } else {
                    loaded('fail')
                }
            }
        },
        addToCart (good) {
            good.num++
            this.$store.commit('addToCart', {company: this.activeCompany, good, categoryGUID: this.activeCategory.guid})
        },
        removeToCart (good) {
            good.num--
            this.$store.commit('removeToCart', {company: this.activeCompany, good})
        },
        zkPrice (price, zk) {
            let num = price * (100 - zk) / 100
            num = num.toFixed(2)
            return num
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.group-detail {
    padding-top: $headH;
    height: 100%;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        @include wh(100%, $headH);
        background-color: $white;
        border-bottom: 1px solid $borcd;
        position: absolute;
        top: 0;
        left: 0;
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
            .category-name {
                font-size: 14px;
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
            .categoryList {
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
            .secondaryList {
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
        padding: 0 2% 0 2%;
        li {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 49%;
            border: 1px solid #aaaaaa;
            border-radius: 5px;
            margin-top: 7px;
            padding: 15px 0 10px 0;
            span {
                @include sc(12px, #555555);
                padding: 0 5px;
            }
            .good-num {
                position: absolute;
                right: 5px;
                top: 2px;
                font-size: 12px;
                background: red;
                border-radius: 100px;
                color: white;
                z-index: 1;
                padding: 0 5px;
                height: 20px;
                line-height: 20px;
                text-align: center;
            }
            .good-no {
                position: absolute;
                left: 5px;
                top: 2px;
                font-size: 12px;
            }
            div {
                position: relative;
                .price {
                    @include sc(14px, #5eacf0);
                }
                .have-zk {
                    display: inline-block;
                    padding: 0 5px;
                    span {
                        padding: 0;
                    }
                    .zk-price {
                         @include sc(12px, #5eacf0);
                    }
                    .origin-price {
                        font-size: 12px;
                        text-decoration: line-through;
                    }
                    .zk {
                        color: #f56c6c;
                    }
                }
                .add-remove {
                    float: right;
                    top: 3px;
                    right: 5px;
                }
                .el-icon-remove {
                    @include sc(22px, #f56c6c);
                }
                .el-icon-circle-plus {
                    top: 3px;
                    @include sc(22px, #5eacf0);
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
    .good-img::before {
        content: "";
        display: inline-block;
        padding-bottom: 68%;
    }
    .good-img-icon {
		@include wh(100%, 100%);
    }
    .good-detail {
        display: flex;
        justify-content: space-between;
    }
}
</style>
