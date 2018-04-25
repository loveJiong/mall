<template>
    <div class="shopping-cart">
        <div class="header">
            <div class="shopping-title" @click.stop="''">
                当前订单
                <el-button class="shopping-continue" round size="mini" @click="toGroupDetail">继续点货</el-button>
            </div>
            <div class="company-menu">
                <div class="company-active" @click.stop="menuToggle">
                    {{activeCompany.companyDisplayName}}
                    <i v-show="menuShow" class="el-icon-caret-top"></i>
                    <i v-show="!menuShow" class="el-icon-caret-bottom"></i>
                </div>
                <ul v-show="menuShow" class="companyList">
                    <li v-for="(company, index) in companyList" v-bind:key="index" v-bind:class="{ active: company.isActive }" @click.stop="companyChoose(company)">
                        <span class="company-name">{{company.companyDisplayName}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="no-goods" v-if="!haveGoods">
                <i class="el-icon-warning"></i>
                <span class="title">当前订单是空的</span>
                <span class="text">你目前没有订购任何产品，你可以点击左下角的产品图册进行选购！</span>
                <a @click="toGroupDetail">去看看</a>
            </div>
            <div class="have-goods" v-if="haveGoods">
                <ul class="good-list">
                    <li v-for="(good, index) in goods" v-bind:key="index" v-bind:class="{ showDelete: good.showDelete, hideDelete: good.hideDelete }">
                        <v-touch v-on:swipeleft="showDelete(good)" v-on:swiperight="hideDelete(good)" v-bind:swipe-options="{ direction: 'horizontal'}">
                        <div class="delete-button" @click="deleteGood(good)">
                            删除
                        </div>
                        <div class="good-item">
                            <img v-bind:src="good.url" alt="图片" width="100" height="70">
                            <div class="good-introduction">
                                <span class="good-name">{{good.name}}</span>
                                <span v-if="good.zk == '0' || good.zk == ''" class="good-price">{{good.price}}€</span>
                                <div v-if="good.zk != '0' && good.zk != ''" class="have-zk">
                                    <span class="zk-price">{{zkPrice(good.price, good.zk)}}€</span>
                                    <span class="origin-price">{{good.price}}</span>
                                    <span class="zk">(-{{good.zk}}%)</span>
                                </div>
                            </div>
                            <div class="good-detail">
                                <span class="good-total-price">总价：{{good.totalPrice}}€</span>
                                <div class="good-num">
                                    <i class="el-icon-remove" @click="removeToCart(good)" v-if="good.num > 0"></i>
                                    <span class="count">{{good.num}}</span>
                                    <i class="el-icon-circle-plus" @click="addToCart(good)"></i>
                                </div>
                            </div>
                        </div>
                        </v-touch>
                    </li>
                </ul>
                <div class="commit-order">
                    <p class="order-price">金额：<span>{{orderPrice()}}€</span></p>
                    <div>
                        <input type="text" class="order-bz" v-model="bz" placeholder="在这里写下您的订单备注">
                        <el-button type="primary" round @click="commitOrder">生成订单</el-button>
                    </div>
                </div>
            </div>
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
import footGuide from './footGuide'
export default {
    name: 'shoppingCart',
    data () {
        return {
            menuShow: false,
            goods: [],
            haveGoods: false,
            bz: ''
        }
    },
    computed: {
		userInfo () {
            return this.$store.state.userInfo
        },
		companyList () {
            return this.$store.state.companyList
        },
		activeCompany () {
			return this.$store.state.activeCompany
        },
        cart () {
            return this.$store.state.cart
        }
	},
    components: {
        footGuide
    },
    mounted () {
        this.$store.commit('setGroupDetailBackPath', '')
        if (this.companyList.length > 0) {
            this.init()
		} else {
			this.$message.error('你当前没有添加商家，请先添加商家！')
			this.$router.push('/addCompany')
		}
        document.addEventListener('click', this.menuHide)
    },
    beforeDestroy () {
        document.removeEventListener('click', this.menuHide)
    },
    methods: {
        init () {
            this.haveGoods = false
            this.bz = ''
            this.goods = []
            if (this.cart[this.activeCompany.companyId]) {
                let arr = Object.keys(this.cart[this.activeCompany.companyId])
                this.goods = arr.map(key => {
                    this.cart[this.activeCompany.companyId][key].showDelete = false
                    this.cart[this.activeCompany.companyId][key].hideDelete = false
                    return this.cart[this.activeCompany.companyId][key]
                })
                this.haveGoods = arr.length > 0
            }
        },
        menuToggle () {
            this.menuShow = !this.menuShow
            if (this.menuShow) {
                document.querySelector('body').setAttribute('style', 'overflow:hidden')
            } else {
                document.querySelector('body').setAttribute('style', 'overflow:auto')
            }
        },
        menuHide () {
            if (this.menuShow) {
                this.menuShow = false
                document.querySelector('body').setAttribute('style', 'overflow:auto')
            }
        },
        companyChoose (company) {
            this.$store.commit('setActiveCompany', company)
            this.init()
            this.menuShow = false
        },
        preventTouchmove (event) {
            if (this.menuShow) {
                event.preventDefault()
            }
        },
        addToCart (good) {
            good.num += good.bagCount
            this.$store.commit('addToCart', {company: this.activeCompany, good})
        },
        removeToCart (good) {
            if (good.num - good.bagCount === 0) {
                this.$confirm('确认删除当前商品？', '删除确认', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteGood(good)
                }, () => {
                    console.log('cancel')
                })
            } else {
                good.num -= good.bagCount
                this.$store.commit('removeToCart', {company: this.activeCompany, good})
            }
        },
        deleteGood (good) {
            this.$store.commit('deleteGood', {company: this.activeCompany, good})
            this.$message.success('删除商品成功！')
            this.init()
        },
        commitOrder () {
            this.$confirm('确认生成当前订单？', '订单确认', {
                confirmButtonText: '确认生成',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.$store.commit('pushOrder', {
                    company: this.activeCompany,
                    order: this.cart[this.activeCompany.companyId],
                    bz: this.bz
                })
                this.$store.commit('clearCart', this.activeCompany.companyId)
                this.init()
                this.$message.success('生成订单成功！')
            }, () => {
                console.log('cancel')
            })
        },
        zkPrice (price, zk) {
            let num = price * (100 - zk) / 100
            num = num.toFixed(2)
            return num
        },
        orderPrice () {
            let price = 0
            this.goods.forEach(good => {
                price += parseFloat(good.totalPrice)
            })
            return price.toFixed(2)
        },
        toGroupDetail () {
            this.$store.commit('setGroupDetailBackPath', '/shoppingCart')
            if (this.$store.state.activeCategory.guid) {
                this.$router.push({name: 'groupDetail', params: { refresh: false }})
            } else {
                this.$router.push({name: 'productPictures', params: { toGroupDetail: true }})
            }
        },
        showDelete (good) {
            good.showDelete = true
            good.hideDelete = false
            this.$forceUpdate()
        },
        hideDelete (good) {
            good.hideDelete = true
            good.showDelete = false
            this.$forceUpdate()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.shopping-cart {
    height: 100%;
    overflow-y: auto;
    .header {
        position: fixed;
        width: 100%;
        z-index: 100;
        top: 0;
        .shopping-title {
            position: relative;
            text-align: center;
            background-color: #89c4f4;
            color: $white;
            @include font(16px, 49px);
            .shopping-continue {
                position: absolute;
                right: 10px;
                top: 12px;
            }
        }
        .company-menu {
            position: relative;
            .company-active {
                position: relative;
                width: 100%;
                text-align: center;
                background-color: $white;
                @include sc(14px, #e45c28);
                line-height: 40px;
                border-bottom: 1px solid #dbdbdb;
                i {
                    position: absolute;
                    right: 10px;
                    top: 12px;
                }
            }
            .companyList {
                position: absolute;
                width: 100%;
                background-color: $white;
                padding-bottom: 10px;
                li {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #dbdbdb;
                    font-size: 14px;
                    padding: 10px 20px;
                    background-color: #f5f5f5;
                    .company-name {
                        color: #333333;
                    }
                    .company-price {
                        color: #888888;
                    }
                }
                .active {
                    background-color: $white;
                    .company-name {
                        color: #e45c28;
                    }
                }
            }
        }
    }

    .container {
        height: 100%;
        padding-top: 90px;
        .no-goods {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 20px;
            padding-top: 40%;
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

.have-goods {
    padding-bottom: 105px;
}

.good-item {
    display: flex;
    height: 100px;
    padding: 10px;
    border-bottom: 1px solid #c8c7cc;
    font-size: 14px;
    background: $white;
}

.good-introduction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 150px;
}

.good-price {
    color: #5eacf0;
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

.good-detail {
    position: absolute;
    right: 20px;
    bottom: 25px;
    text-align: right;
    .el-icon-remove {
        @include sc(15px, #f56c6c);
    }
    .el-icon-circle-plus {
        top: 3px;
        @include sc(15px, #5eacf0);
    }
}

.commit-order {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 2;
    bottom: 46px;
    width: 100%;
    background: #fff;
    padding: 5px 20px;
    border-top: 1px solid #c8c7cc;
    .order-price {
        margin-bottom: 5px;
        font-size: 14px;
        > span {
            color: #5eacf0;
        }
    }
    .order-bz {
        width: calc(100% - 90px - 15px);
        border: 1px solid #409EFF;
        border-radius: 10px;
        margin-right: 10px;
        height: 25px;
        padding: 0 5px;
    }
    .el-button.is-round {
        padding: 6px 16px;
    }
}

.delete-button {
    background: red;
    width: 100px;
    height: 100px;
    position: absolute;
    right: -100px;
    z-index: 1;
    color: white;
    font-size: 24px;
    text-align: center;
    line-height: 95px;
}

.good-list > li{
    position: relative;
    left: 0px;
}

.good-list > .showDelete {
    left: -100px;
    animation:showDelete 0.5s;
	-webkit-animation:showDelete 0.5s; /* Safari and Chrome */
}

.good-list > .hideDelete {
    left: 0px;
    animation:hideDelete 0.5s;
	-webkit-animation:hideDelete 0.5s; /* Safari and Chrome */
}

@keyframes showDelete
{
	from {left: 0px;}
	to {left: -100px;}
}

@-webkit-keyframes showDelete /* Safari and Chrome */
{
	from {left: 0px;}
	to {left: -100px;}
}

@keyframes hideDelete
{
	from {left: -100px;}
	to {left: 0px;}
}

@-webkit-keyframes hideDelete /* Safari and Chrome */
{
	from {left: -100px;}
	to {left: -0px;}
}
</style>
