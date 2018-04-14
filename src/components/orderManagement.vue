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
        <div class="container">
            <ul class="tabs">
                <li v-for="(item, index) in tabs" v-bind:key="index" class="tab-item" v-bind:class="{ active: item.isActive}" @click="tabSwitch(item)">{{item.name}}</li>
            </ul>
            <ul class="orders" v-show="active.status === 0">
                <li class="order" v-for="(order, index) in orders" v-bind:key="index">
                    <div class="order-text">
                        <p class="order-bh"><span class="order-title">订单编号：</span>{{order.bh}}</p>
                        <p class="order-bz"><span class="order-title">备注：</span>{{order.bz}}</p>
                    </div>
                    <div class="order-detail">
                        <div class="num-price">
                            <p class="order-num"><span class="order-title">数量：</span>{{order.count}}</p>
                            <p class="order-price"><span class="order-title">金额：</span>{{order.hj}}€</p>
                        </div>
                        <span class="order-time">{{order.createTime}}</span>
                    </div>
                </li>
            </ul>
            <ul class="unOrders" v-show="active.status === -1">
                <li class="unOrder" v-for="unOrder in unOrders" v-bind:key="unOrder.bh">
                    <p class="unOrder-bh"><span class="order-title">订单编号：</span>{{unOrder.bh}}</p>
                    <ul class="good-list">
                        <li v-for="(good, index) in unOrder.goods" v-bind:key="index" v-bind:class="{ showDelete: good.showDelete, hideDelete: good.hideDelete }">
                            <v-touch v-on:swipeleft="showDelete(good)" v-on:swiperight="hideDelete(good)">
                            <div class="delete-button" @click="deleteGood(good, unOrder)">
                                删除
                            </div>
                            <div class="good-item">
                                <img v-bind:src="good.url" alt="图片" width="100" height="70">
                                <div class="good-introduction">
                                    <span class="good-name">{{good.name}}</span>
                                    <span v-if="good.zk == '0'" class="good-price">{{good.price}}€</span>
                                    <div v-if="good.zk != '0'" class="have-zk">
                                        <span class="zk-price">{{zkPrice(good.price, good.zk)}}€</span>
                                        <span class="origin-price">{{good.price}}</span>
                                        <span class="zk">(-{{good.zk}}%)</span>
                                    </div>
                                </div>
                                <div class="good-detail">
                                    <span class="good-total-price">总价：{{good.totalPrice}}€</span>
                                    <div class="good-num">
                                        <i class="el-icon-remove" @click="removeToOrder(good, unOrder)" v-if="good.num > 0"></i>
                                        <span class="count">{{good.num}}</span>
                                        <i class="el-icon-circle-plus" @click="addToOrder(good, unOrder)"></i>
                                    </div>
                                </div>
                            </div>
                            </v-touch>
                        </li>
                    </ul>
                    <div class="commit-unOrder">
                        <input type="text" class="unOrder-bz" v-model="unOrder.bz" placeholder="在这里写下您的订单备注">
                        <el-button type="primary" round @click="commitUnOrder(unOrder)">上传订单</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
import {getOrder, commitOrder} from './../service/getData'
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
                    isActive: true
                },
                {
                    name: '已上传',
                    status: 0,
                    isActive: false
                }
            ],
            orders: [],
            unOrders: []
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
        if (this.companyList.length > 0) {
            this.active = this.tabs[0]
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
                let orderRes = await getOrder(this.userInfo.id, this.activeCompany.companyId, status)
                if (orderRes.success) this.orders = orderRes.data
            } else {
                this.unOrders = this.upLoadOrders[this.activeCompany.companyId] || []
                this.unOrders.forEach(unOrder => {
                    unOrder.goods = this.getGoods(unOrder)
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
        zkPrice (price, zk) {
            let num = price * (100 - zk) / 100
            num = num.toFixed(2)
            return num
        },
        getGoods (unOrder) {
            let arr = Object.keys(unOrder)
            let goods = []
            arr.forEach(key => {
                if (key !== 'bh' && key !== 'bz' && key !== 'goods') {
                    unOrder[key].showDelete = false
                    unOrder[key].hideDelete = false
                    goods.push(unOrder[key])
                }
            })
            // unOrder.goods = goods
            // console.log(goods)
            return goods
        },
        addToOrder (good, unOrder) {
            good.num++
            this.$store.commit('addToOrder', {
                company: this.activeCompany,
                good,
                unOrder
            })
        },
        removeToOrder (good, unOrder) {
            good.num--
            this.$store.commit('removeToOrder', {
                company: this.activeCompany,
                good,
                unOrder
            })
        },
        deleteGood (good, unOrder) {
            this.$store.commit('deleteGoodToOrder', {
                company: this.activeCompany,
                good,
                unOrder
            })
            this.$message.success('删除商品成功！')
            this.getOrder(this.active.status)
        },
        showDelete (good) {
            good.showDelete = true
            good.hideDelete = false
        },
        hideDelete (good) {
            good.hideDelete = true
            good.showDelete = false
        },
        async commitUnOrder (unOrder) {
            let data = {
                companyId: this.activeCompany.companyId,
                customerId: this.userInfo.id,
                bz: unOrder.bz,
                goods: unOrder.goods
            }
            let commitRes = await commitOrder(data)
            if (commitRes.success) {
                this.$message.success('上传订单成功！')
                this.$store.commit('deleteOrder', {
                    company: this.activeCompany,
                    unOrder
                })
                this.getOrder(this.active.status)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.order-management {
    height: 100%;
    .header {
        position: fixed;
        width: 100%;
        z-index: 100;
        top: 0;
        .order-title {
            text-align: center;
            background-color: #89c4f4;
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
            color: #5eacf0;
            border-bottom: 2px solid #5eacf0;
        }
    }
    .orders {
        height: 100%;
        overflow: scroll;
        padding-bottom: 80px;
    }
    .order {
        background: #ffffff;
        margin-bottom: 10px;
        padding: 10px;
    }
    .order-text {
        font-size: 14px;
        padding-bottom: 5px;
        border-bottom: 2px solid #f8f8f8;
    }
    .order-detail {
        padding-top: 5px;
        font-size: 12px;
    }
    .order-title {
        color: #888;
    }
    .order-price {
        color: #5eacf0;
    }
}

.unOrders {
    height: 100%;
    overflow: scroll;
    padding-bottom: 80px;
}

.unOrder {
    padding: 10px;
    background: #ffffff;
    margin-bottom: 10px;
}

.unOrder-bh {
    background-color: $white;
    height: 30px;
    line-height: 28px;
    border-bottom: 2px solid #f8f8f8;
    font-size: 14px;
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

.good-item {
    display: flex;
    height: 100px;
    padding: 10px;
    border-bottom: 2px solid #f8f8f8;
    font-size: 14px;
    background: $white;
    position: relative;
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

.commit-unOrder {
    display: flex;
    bottom: 46px;
    width: 100%;
    justify-content: flex-end;
    background: #fff;
    align-items: center;
    padding: 10px 20px 0 20px;
    border-top: 1px solid #c8c7cc;
    .unOrder-bz {
        width: calc(100% - 90px - 10px);
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
