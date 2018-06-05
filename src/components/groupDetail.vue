<template>
    <div class="group-detail">
        <div class="header" @click.stop="''">
            <a class="el-icon-arrow-left" @click="goBack"></a>
            <div class="title" @click.stop="menuToggle">
                <span class="category-name">{{activeCategory.name}}</span>
                <span class="secondar-name" v-if="activeSecondary">{{activeSecondary.name}}</span>
                <i v-show="menuShow" class="el-icon-caret-top"></i>
                <i v-show="!menuShow" class="el-icon-caret-bottom"></i>
            </div>
            <div class="header-icons">
                <a class="el-icon-ump-cart" @click="toShoppingCart"></a>
                <a class="el-icon-search" @click="toSearch"></a>
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
        <pull-to :bottom-load-method="nextRefresh" :bottom-config="{pullText: '上拉加载下一系列', failText: '没有更多', doneText: '', stayDistance: 0}" :bottom-block-height="0"
        :top-load-method="lastRefresh" :top-config="{pullText: '下拉加载上一系列', failText: '没有更多', doneText: '', stayDistance: 0}" v-loading="loading" element-loading-text="拼命加载中">
            <ul class="container">
                <li class="good-item" v-for="(good, index) in goods" v-bind:key="index">
                    <div class="good-num" v-if="good.num > 0">{{good.num}}</div>
                    <div class="good-no">REF:{{good.no}}</div>
                    <div class="good-img" @click="showImgDialog(good)">
                        <img class="good-img-icon" v-bind:src="good.url" alt="图片">
                    </div>
                    <span class="good-name">{{good.name}}</span>
                    <div>
                        <div class="good-detail">
                            <span class="good-count">库存:{{good.count}}</span>
                            <span class="good-pck">包装数:{{good.boxCount}}/{{good.bagCount}}</span>
                        </div>
                        <span v-if="good.zk == '0' || good.zk == ''" class="price">{{good.price}}€</span>
                        <div v-if="good.zk != '0' && good.zk != ''" class="have-zk">
                            <span class="zk-price">{{zkPrice(good.price, good.zk)}}€</span>
                            <span class="origin-price">{{good.price}}€</span>
                            <span class="zk">-{{good.zk}}%</span>
                        </div>
                        <div class="add-remove">
                            <span v-for="(tip, index) in good.tips" :key="index" class="add-remove-tips">{{tip}}</span>
                            <i class="el-icon-remove-outline" @click="removeToCart(good)" v-if="good.num > 0"></i>
                            <i class="el-icon-circle-plus" @click="addToCart(good)"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </pull-to>
        <el-dialog :visible.sync="imgDialog" width="100%">
            <span>{{activeGood.name}}</span>
            <v-touch v-on:swipeleft="nextGood(activeGood)" v-on:swiperight="lastGood(activeGood)">
            <img class="imgDialog-img" v-bind:src="activeGood.url" alt="图片">
            </v-touch>
            <div class="add-remove">
                <i class="el-icon-remove-outline" @click="removeToCart(activeGood)" v-if="activeGood.num > 0"></i>
                <span class="activeGood-num" v-if="activeGood.num > 0">{{activeGood.num}}</span>
                <i class="el-icon-circle-plus" @click="addToCart(activeGood)"></i>
            </div>
        </el-dialog>
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
            guid: null,
            secondaryIndex: -1,
            categoryIndex: -1,
            loading: false,
            imgDialog: false,
            activeGood: {}
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
            return this.$store.state.activeOrder || this.$store.state.cart
        },
        backPath () {
            return this.$store.state.groupDetailBackPath
        }
    },
    activated () {
        document.querySelector('body').setAttribute('style', 'background:#ffffff')
        document.addEventListener('click', this.menuHide)
        if (this.$route.params.refresh) {
            this.initData()
            if (this.$route.params.secondary) {
                this.activeSecondary = this.$route.params.secondary
            } else if (this.secondaryList.length > 0) {
                this.activeSecondary = this.secondaryList[0]
            }
            this.getGoods()
        } else {
            this.setGood(this.goods)
        }
    },
    deactivated () {
        document.querySelector('body').setAttribute('style', '')
        document.removeEventListener('click', this.menuHide)
    },
    methods: {
        async getGoods (isScroll, isNext) {
            this.loading = true
            if (this.activeSecondary) {
                let index = this.getSecondaryIndex(this.activeSecondary)
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeSecondary.guid)
                if (goodsRes.success && goodsRes.data.length > 0) {
                    this.setGood(goodsRes.data)
                    this.goods = goodsRes.data
                    this.secondaryIndex = index
                } else if (goodsRes.success) {
                    for (++index; index < this.activeCategory.secondaryList.length; index++) {
                        goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                        if (goodsRes.success && goodsRes.data.length > 0) {
                            this.setGood(goodsRes.data)
                            this.goods = goodsRes.data
                            this.secondaryIndex = index
                            break
                        }
                    }
                }
            } else {
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.guid)
                if (goodsRes.success) {
                    this.setGood(goodsRes.data)
                    this.goods = goodsRes.data
                    this.secondaryIndex = -1
                }
            }
            setTimeout(() => {
                this.loading = false
            }, 2000)
            if (!isScroll || isNext) {
                let scroll = document.getElementsByClassName('scroll-container')[0]
                scroll.scrollTop = 0
            } else {
                this.$nextTick(() => {
                    let scroll = document.getElementsByClassName('good-item')
                    scroll = scroll[scroll.length - 1]
                    scroll.scrollIntoView(false)
                })
            }
        },
        initData () {
            this.menuShow = false
            this.goods = []
            this.activeSecondary = null
            this.secondaryIndex = -1
        },
        setGood (goods) {
            let companyId = this.activeCompany.companyId
            goods.forEach(good => {
                if (this.cart[companyId] && this.cart[companyId][good.id]) good.num = this.cart[companyId][good.id].num
                else if (this.cart[good.id]) good.num = this.cart[good.id].num
                else good.num = 0
            })
        },
        getSecondaryIndex (secondary) {
            return this.activeCategory.secondaryList.indexOf(secondary)
        },
        getCategoryIndex (category) {
            return this.categoryList.indexOf(category)
        },
        getGoodIndex (good) {
            return this.goods.indexOf(good)
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
        categoryChoose (category, isScroll = false, isNext = true) {
            this.$store.commit('setActiveCategory', category)
            if (this.secondaryList.length > 0) {
                this.activeSecondary = this.secondaryList[isNext ? 0 : this.secondaryList.length - 1]
            } else {
                this.activeSecondary = null
            }
            this.getGoods(isScroll, isNext)
        },
        secondaryChoose (secondary) {
            this.menuShow = false
            this.activeSecondary = secondary
            this.getGoods()
            document.querySelector('body').setAttribute('style', 'overflow:auto;background:#ffffff')
        },
        async nextRefresh (loaded) {
            this.loading = true
            let index = this.secondaryIndex + 1
            let scroll = document.getElementsByClassName('scroll-container')[0]
            if (index >= 0 && index < this.activeCategory.secondaryList.length) {
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                if (goodsRes.success && goodsRes.data.length > 0) {
                    this.setGood(goodsRes.data)
                    this.goods = goodsRes.data
                    this.secondaryIndex = index
                    if (this.activeCategory.secondaryList[index].level === 1) {
                        this.activeSecondary = this.activeCategory.secondaryList[index]
                    }
                    loaded('done')
                    scroll.scrollTop = 0
                } else if (goodsRes.success) {
                    for (++index; index < this.activeCategory.secondaryList.length; index++) {
                        goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                        if (goodsRes.success && goodsRes.data.length > 0) {
                            this.setGood(goodsRes.data)
                            this.goods = goodsRes.data
                            this.secondaryIndex = index
                            if (this.activeCategory.secondaryList[index].level === 1) {
                                this.activeSecondary = this.activeCategory.secondaryList[index]
                            }
                            break
                        }
                    }
                    loaded('done')
                    scroll.scrollTop = 0
                } else {
                    loaded('fail')
                    this.$message.error('没有更多！')
                }
            } else {
                let categoryIndex = this.getCategoryIndex(this.activeCategory) + 1
                if (categoryIndex < this.categoryList.length) {
                    this.categoryChoose(this.categoryList[categoryIndex], true)
                    loaded('done')
                } else {
                    loaded('fail')
                    this.$message.error('没有更多！')
                }
            }
            setTimeout(() => {
                this.loading = false
            }, 2000)
        },
        async lastRefresh (loaded) {
            this.loading = true
            let index = this.secondaryIndex - 1
            if (index >= 0 && index < this.activeCategory.secondaryList.length) {
                let goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                if (goodsRes.success && goodsRes.data.length > 0) {
                    this.setGood(goodsRes.data)
                    this.goods = goodsRes.data
                    this.secondaryIndex = index - 1
                    if (this.activeCategory.secondaryList[index].level === 1) {
                        this.activeSecondary = this.activeCategory.secondaryList[index]
                    }
                    loaded('done')
                    this.$nextTick(() => {
                        let scroll = document.getElementsByClassName('good-item')
                        scroll = scroll[scroll.length - 1]
                        scroll.scrollIntoView(false)
                        console.log(scroll)
                    })
                } else if (goodsRes.success) {
                    for (--index; index >= 0; index--) {
                        goodsRes = await getGoods(this.activeCompany.companyId, this.activeCategory.secondaryList[index].guid)
                        if (goodsRes.success && goodsRes.data.length > 0) {
                            this.setGood(goodsRes.data)
                            this.goods = goodsRes.data
                            this.secondaryIndex = index - 1
                            if (this.activeCategory.secondaryList[index].level === 1) {
                                this.activeSecondary = this.activeCategory.secondaryList[index]
                            }
                            break
                        }
                    }
                    loaded('done')
                    this.$nextTick(() => {
                        let scroll = document.getElementsByClassName('good-item')
                        scroll = scroll[scroll.length - 1]
                        scroll.scrollIntoView(false)
                    })
                } else {
                    loaded('fail')
                    this.$message.error('没有更多！')
                }
            } else {
                let categoryIndex = this.getCategoryIndex(this.activeCategory) - 1
                if (categoryIndex >= 0) {
                    this.categoryChoose(this.categoryList[categoryIndex], true, false)
                    loaded('done')
                } else {
                    loaded('fail')
                    this.$message.error('没有更多！')
                }
            }
            setTimeout(() => {
                this.loading = false
            }, 2000)
        },
        addToCart (good) {
            good.num += good.bagCount
            good.tips || (good.tips = [])
            good.tips.push(`+${good.bagCount}`)
            if (this.$store.state.activeOrder) {
                this.$store.commit('addToOrder', {
                    company: this.activeCompany,
                    good,
                    unOrder: this.$store.state.activeOrder
                })
            } else {
                this.$store.commit('addToCart', {company: this.activeCompany, good})
            }
        },
        removeToCart (good) {
            good.tips || (good.tips = [])
            if (good.num - good.bagCount === 0) {
                this.$confirm('确认删除当前商品？', '删除确认', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    good.num -= good.bagCount
                    good.tips.push(`-${good.bagCount}`)
                    if (this.$store.state.activeOrder) {
                        this.$store.commit('deleteGoodToOrder', {
                            company: this.activeCompany,
                            good,
                            unOrder: this.$store.state.activeOrder
                        })
                    } else {
                        this.$store.commit('deleteGood', {company: this.activeCompany, good})
                    }
                    this.$message.success('删除商品成功！')
                }, () => {
                    console.log('cancel')
                })
            } else {
                good.num -= good.bagCount
                good.tips.push(`-${good.bagCount}`)
                if (this.$store.state.activeOrder) {
                    this.$store.commit('removeToOrder', {
                        company: this.activeCompany,
                        good,
                        unOrder: this.$store.state.activeOrder
                    })
                } else {
                    this.$store.commit('removeToCart', {company: this.activeCompany, good})
                }
            }
        },
        zkPrice (price, zk) {
            let num = price * (100 - zk) / 100
            num = num.toFixed(2)
            return num
        },
        toShoppingCart () {
            if (this.backPath) {
                this.$router.push(this.backPath)
            } else {
                this.$router.push('/shoppingCart')
            }
        },
        toSearch () {
            this.$router.push('/productPictures/search')
        },
        goBack () {
            if (this.backPath) {
                this.$router.push(this.backPath)
            } else {
                this.$router.push('/productPictures')
            }
        },
        showImgDialog (good) {
            this.imgDialog = true
            this.activeGood = good
        },
        nextGood (good) {
            let index = this.getGoodIndex(good)
            if (index < this.goods.length - 1) this.activeGood = this.goods[index + 1]
        },
        lastGood (good) {
            let index = this.getGoodIndex(good)
            if (index > 0) this.activeGood = this.goods[index - 1]
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
            @include wh(150px, 40px);
            @include sc(12px, $headfc);
            border: 1px solid #007aff;
            border-radius: 5px;
            i {
                position: absolute;
                right: 10px;
                color: #007aff;
            }
            .category-name {
                font-size: 14px;
            }
            .category-name,
            .secondar-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                padding: 0 10px;
                text-align: center;
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
                    position: relative;
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
                        border-left: 4px solid #007aff;
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
        .el-icon-search {
            margin-left: 10px;
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
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            margin-top: 7px;
            padding: 15px 0 0 0;
            span {
                @include sc(12px, #666666);
                padding: 0 5px;
            }
            .add-remove-tips {
                color: #ff0000;
                font-size: 14px;
            }
            .good-num {
                position: absolute;
                right: 5px;
                top: 2px;
                font-size: 12px;
                background: #ff0000;
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
                top: 0px;
                font-size: 12px;
                color: #666666;
            }
            .good-name {
                @include sc(14px, #333333);
            }
            > div {
                position: relative;
                margin: 1px 0;
                .price {
                    @include sc(14px, #ff0000);
                    font-weight: bold;
                }
                .have-zk {
                    display: inline-block;
                    padding: 0 5px;
                    span {
                        padding: 0;
                    }
                    .zk-price {
                         @include sc(14px, #ff0000);
                        font-weight: bold;
                    }
                    .origin-price {
                        @include sc(12px, #333333);
                        text-decoration: line-through;
                    }
                    .zk {
                        color: $white;
                        background-color: #ff0000;
                    }
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
        flex-direction: column;
        justify-content: space-between;
    }
}

.imgDialog-img {
    width: 100%
}

.activeGood-num {
    position: relative;
    top: -2px;
    font-size: 22px;
}

.add-remove {
    position: absolute;
    bottom: -2px;
    right: 0px;
}

.add-remove-tips {
    position: absolute;
    width: 35px;
    text-align: center;
    right: 12px;
    top: -18px;
    opacity: 0;
    animation:showTips 1s;
    -webkit-animation:showTips 1s; /* Safari and Chrome */
}

@keyframes showTips
{
	from {top: -18px;opacity: 1;}
	to {top: -40px;opacity: 0;}
}

@-webkit-keyframes showTips /* Safari and Chrome */
{
	from {top: -18px;opacity: 1;}
	to {top: -40px;opacity: 0;}
}

.el-icon-remove-outline {
    @include sc(26px, #009fff);
}
.el-icon-circle-plus {
    top: 3px;
    @include sc(26px, #009fff);
}
</style>
