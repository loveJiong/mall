<template>
    <div class="order-management">
        <div class="header">
            <div class="order-title" @click.stop="''">
                订单管理
            </div>
            <div class="company-menu">
                <div class="company-active" @click.stop="menuToggle">
                    {{activeCompany.companyDisplayName}}
                    <i v-show="menuShow" class="el-icon-caret-top"></i>
                    <i v-show="!menuShow" class="el-icon-caret-bottom"></i>
                </div>
                <ul v-show="menuShow" class="companyList">
                    <li v-for="(company, index) in companyList" v-bind:key="index" v-bind:class="{ active: company.isActive}" @click.stop="companyChoose(company)">
                        <span class="company-name">{{company.companyDisplayName}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container" v-loading="loading">
            <ul class="tabs">
                <li v-for="(item, index) in tabs" v-bind:key="index" class="tab-item" v-bind:class="{ active: item.isActive}" @click="tabSwitch(item)">{{item.name}}</li>
            </ul>
            <ul class="orders" v-show="active.status === 0">
                <li class="order" v-for="(order, index) in orders" v-bind:key="index" >
                    <div class="order-text">
                        <p class="order-bh">订单编号：{{order.bh}}</p>
                        <p class="order-time">订单时间：{{order.createTime}}</p>
                        <p class="order-num">数量：{{order.count}}</p>
                        <p class="order-bz">备注：{{order.bz}}</p>
                        <p>金额：<span class="order-price">{{order.hj}}€</span></p>
                    </div>
                    <el-button class="detail-button" type="primary" round @click="toOrderDetail(order)">详情</el-button>
                </li>
            </ul>
            <ul class="unOrders" v-show="active.status === -1">
                <li class="unOrder" v-for="unOrder in unOrders" v-bind:key="unOrder.bh" >
                    <p class="unOrder-bh" @click="toggle(unOrder)"><span class="order-title">订单编号：</span>{{unOrder.bh}}</p>
                    <i v-show="unOrder.show" class="el-icon-caret-top"></i>
                    <i v-show="!unOrder.show" class="el-icon-caret-bottom"></i>
                    <transition name="fade">
                        <ul class="good-list" v-show="unOrder.show">
                            <li v-for="(good, index) in unOrder.goods" v-bind:key="index" v-bind:class="{ showDelete: good.showDelete, hideDelete: good.hideDelete }">
                                <v-touch v-on:swipeleft="showDelete(good)" v-on:swiperight="hideDelete(good)" v-bind:swipe-options="{ direction: 'horizontal'}">
                                <div v-if="good.showDelete" class="delete-button" @click="deleteGood(good, unOrder)">
                                    删除
                                </div>
                                <div class="good-item">
                                    <img v-bind:src="good.url" alt="图片" width="100" height="75">
                                    <div class="good-introduction">
                                        <span class="good-name">{{good.name}}</span>
                                        <span v-if="good.zk == '0' || good.zk == ''" class="good-price">{{good.price}}€</span>
                                        <div v-if="good.zk != '0' && good.zk != ''" class="have-zk">
                                            <span class="zk-price">{{zkPrice(good.price, good.zk)}}€</span>
                                            <span class="origin-price">{{good.price}}€</span>
                                            <span class="zk">-{{good.zk}}%</span>
                                        </div>
                                        <span class="good-total-price">总价：{{good.totalPrice}}€</span>
                                    </div>
                                    <div class="good-num">
                                        <span class="icon-plus" @click="removeToOrder(good, unOrder)">-</span>
                                        <span class="count">{{good.num}}</span>
                                        <span class="icon-add"  @click="addToOrder(good, unOrder)">+</span>
                                    </div>
                                </div>
                                </v-touch>
                            </li>
                        </ul>
                    </transition>
                    <div class="commit-unOrder">
                        <div>
                            <span class="unOrder-price">金额：<span class="order-title">{{unOrderPrice(unOrder)}}€</span></span>
                            <el-button class="shopping-continue" round size="mini" @click="toGroupDetail(unOrder)">继续点货</el-button>
                        </div>
                        <div>
                            <input type="text" class="unOrder-bz" v-model="unOrder.bz" placeholder="在这里写下您的订单备注">
                            <el-button class="delete-unOrder" type="danger" round @click="deleteUnOrder(unOrder)">删除</el-button>
                            <el-button class="commit-button" type="primary" round @click="commitUnOrder(unOrder)">上传</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
import {getOrder, commitOrder, getAddress} from './../service/getData'
import footGuide from './footGuide'
export default {
    name: 'orderManagement',
    data () {
        return {
            active: {},
            menuShow: false,
            tabs: [
                {
                    name: '未上传',
                    status: -1,
                    isActive: false
                },
                {
                    name: '已上传',
                    status: 0,
                    isActive: false
                }
            ],
            orders: [],
            unOrders: [],
            loading: false
        }
    },
    components: {
        footGuide
    },
    computed: {
		companyList () {
            return this.$store.state.companyList
        },
        userInfo () {
            return this.$store.state.userInfo
        },
		activeCompany () {
			return this.$store.state.activeCompany
		},
		upLoadOrders () {
			return this.$store.state.upLoadOrders
		}
    },
    mounted () {
        this.$store.commit('changeAddToOrder', '')
        this.$store.commit('setGroupDetailBackPath', '')
        if (this.companyList.length > 0) {
            this.active = this.$route.params.tabs ? this.tabs[this.$route.params.tabs] : this.tabs[0]
            this.active.isActive = true
            this.getOrder(this.active.status)
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
        async getOrder (status) {
            if (status === 0) {
                this.loading = true
                let orderRes = await getOrder(this.userInfo.id, this.activeCompany.companyId, status)
                if (orderRes.success) this.orders = orderRes.data
                this.loading = false
            } else {
                this.unOrders = this.upLoadOrders[this.activeCompany.companyId] || []
                this.unOrders.forEach(unOrder => {
                    unOrder.goods = this.getGoods(unOrder)
                    unOrder.show = false
                })
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
            this.tabSwitch(this.tabs[0])
            this.menuShow = false
        },
        preventTouchmove (event) {
            if (this.menuShow) {
                event.preventDefault()
            }
        },
        tabSwitch (tab) {
            this.active.isActive = false
            tab.isActive = true
            this.active = tab
            this.getOrder(this.active.status)
        },
        toggle (unOrder) {
            unOrder.show = !unOrder.show
            this.$forceUpdate()
        },
        zkPrice (price, zk) {
            let num = price * (100 - zk) / 100
            num = num.toFixed(2)
            return num
        },
        unOrderPrice (unOrder) {
            let price = 0
            unOrder.goods.forEach(good => {
                price += parseFloat(good.totalPrice)
            })
            return price.toFixed(2)
        },
        getGoods (unOrder) {
            let arr = Object.keys(unOrder)
            let goods = []
            arr.forEach(key => {
                if (key !== 'bh' && key !== 'bz' && key !== 'goods' && key !== 'show') {
                    unOrder[key].showDelete = false
                    unOrder[key].hideDelete = false
                    goods.push(unOrder[key])
                }
            })
            return goods
        },
        addToOrder (good, unOrder) {
            good.num += good.bagCount
            this.$store.commit('addToOrder', {
                company: this.activeCompany,
                good,
                unOrder
            })
        },
        removeToOrder (good, unOrder) {
            if (good.num - good.bagCount === 0) {
                this.$confirm('确认删除当前商品？', '删除确认', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    good.num -= good.bagCount
                    this.deleteGood(good, unOrder)
                }, () => {
                    console.log('cancel')
                })
            } else {
                good.num -= good.bagCount
                this.$store.commit('removeToOrder', {
                    company: this.activeCompany,
                    good,
                    unOrder
                })
            }
        },
        deleteGood (good, unOrder) {
            this.$store.commit('deleteGoodToOrder', {
                company: this.activeCompany,
                good,
                unOrder
            })
            this.$message.success('删除商品成功！')
            unOrder.goods = this.getGoods(unOrder)
            this.$forceUpdate()
        },
        showDelete (good) {
            good.showDelete = true
            good.hideDelete = false
        },
        hideDelete (good) {
            good.hideDelete = true
            setTimeout(() => {
                good.showDelete = false
            }, 500)
        },
        deleteUnOrder (unOrder) {
            this.$confirm('确认删除当前订单？', '删除确认', {
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('deleteOrder', {
                    company: this.activeCompany,
                    unOrder
                })
                this.$message.success('删除订单成功！')
            }, () => {
                console.log('cancel')
            })
        },
        commitUnOrder (unOrder) {
            let data = {
                companyId: this.activeCompany.companyId,
                customerId: this.userInfo.id,
                bz: unOrder.bz,
                goods: unOrder.goods
            }
            this.$confirm('确认上传当前订单？', '上传确认', {
                confirmButtonText: '确认上传',
                cancelButtonText: '取消',
                type: 'success'
            }).then(async () => {
                this.loading = true
                let addressRes = await getAddress(this.userInfo.id)
                if (addressRes.success && addressRes.data.length > 0 && addressRes.data[0].companyAddress && addressRes.data[0].companyName && addressRes.data[0].linkTelephone) {
                    let commitRes = await commitOrder(data)
                    if (commitRes.success) {
                        this.$message.success('上传订单成功！')
                        this.$store.commit('deleteOrder', {
                            company: this.activeCompany,
                            unOrder
                        })
                        this.getOrder(this.active.status)
                    }
                } else if (addressRes.success) {
                    this.alertAddAddress()
                }
                this.loading = false
            }, () => {
                console.log('cancel')
            })
        },
        alertAddAddress () {
            setTimeout(() => {
                this.$confirm('您当前没完善收货地址！', '提示', {
                    confirmButtonText: '前去完善',
                    cancelButtonText: '取消上传',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/mine/myAddress')
                }, () => {
                    console.log('cancel')
                })                
            }, 200);

        },
        toGroupDetail (unOrder) {
            this.$store.commit('changeAddToOrder', unOrder)
            this.$store.commit('setGroupDetailBackPath', '/orderManagement')
            if (this.$store.state.activeCategory.guid) {
                this.$router.push({name: 'groupDetail', params: { refresh: false }})
            } else {
                this.$router.push({name: 'productPictures', params: { toGroupDetail: true }})
            }
        },
        toOrderDetail (order) {
			this.$router.push({name: 'orderDetail', params: { order }})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
@include cartGood();
.order-management {
    height: 100%;
    .header {
        position: fixed;
        width: 100%;
        z-index: 100;
        top: 0;
        .order-title {
            position: relative;
            text-align: center;
            @include dtb();
            color: $white;
            @include font(16px, 49px);
        }
        .company-menu {
            position: relative;
            .company-active {
                position: relative;
                width: 100%;
                text-align: center;
                background-color: $white;
                @include sc(16px, $headfc);
                line-height: 40px;
                border-bottom: 1px solid #dbdbdb;
                i {
                    position: absolute;
                    right: 10px;
                    top: 12px;
					color: #007aff;
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
                        color: #007aff;
                    }
                }
            }
        }
    }
    .container {
        height: 100%;
        padding-top: 90px;
    }
    .tabs {
        display: flex;
        border-bottom: 1px solid #aaaaaa;
        height: 35px;
        font-size: 14px;
        .tab-item {
            width: 50%;
            height: 100%;
            line-height: 35px;
            text-align: center;
        }
        .active {
            color: $blue;
            border-bottom: 2px solid $blue;
        }
    }
    .orders {
        height: 100%;
        overflow: scroll;
        padding-bottom: 80px;
    }
    .order {
        position: relative;
        background: #ffffff;
        margin-bottom: 10px;
        padding: 10px;
        color: #666666;
    }
    .order-text {
        font-size: 14px;
        > p {
            padding: 2px 0;
        }
    }
    .order-price {
        color: #ff0000;
        font-weight: bold;
    }
    .detail-button {
        width: 60px;
        position: absolute;
        top: 40%;
        right: 15px;
        padding: 5px;
        @include dbb();
    }
}

.unOrders {
    height: 100%;
    overflow: scroll;
    padding-bottom: 80px;
}

.unOrder {
    position: relative;
    padding: 10px;
    background: #ffffff;
    margin-bottom: 10px;
    > i {
        position: absolute;
        right: 8px;
        top: 10px;
    }
}

.unOrder-bh {
    background-color: $white;
    height: 25px;
    border-bottom: 2px solid #f8f8f8;
    font-size: 14px;
    color: #666666;
}

.delete-button {
    background: red;
    width: 100px;
    height: 100px;
    position: absolute;
    right: -110px;
    z-index: 1;
    color: white;
    font-size: 24px;
    text-align: center;
    line-height: 95px;
}

.commit-unOrder {
    display: flex;
    flex-direction: column;
    bottom: 46px;
    width: 100%;
    background: #fff;
    padding-top: 10px;
    > div {
        padding: 3px 0;
    }
    .unOrder-price {
        margin-bottom: 5px;
        font-size: 14px;
        > .order-title {
            font-weight: bold;
            color: #ff0000;
        }
    }
    .commit-button, .shopping-continue {
        float: right;
    }
    .shopping-continue {
        color: #008eff;
        border-color: #008eff;
    }
    .unOrder-bz {
        width: calc(100% - 90px - 60px);
        border: 1px solid #cccccc;
        margin-right: 10px;
        height: 25px;
        padding: 0 5px;
    }
    .el-button.is-round {
        padding: 6px 16px;
    }
    .commit-button {
        @include dbb();
    }
}

.good-list {
    > li{
        position: relative;
        left: 0px;
    }
    > .showDelete {
        left: -100px;
        animation:showDelete 0.5s;
        -webkit-animation:showDelete 0.5s; /* Safari and Chrome */
    }
    > .hideDelete {
        left: 0px;
        animation:hideDelete 0.5s;
        -webkit-animation:hideDelete 0.5s; /* Safari and Chrome */
    }
    .good-item {
        padding: 10px 0;
    }
    .good-num {
        right: 0px;
    }
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
