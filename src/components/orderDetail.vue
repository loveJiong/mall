<template>
    <div class="orderDetail">
        <div class="orderDetail-title">
            <router-link :to="{name: 'orderManagement' , params: { tabs: 1 }}" class="el-icon-arrow-left"></router-link>
            订单详情
        </div>
        <div class="container"  v-loading="loading">
            <div class="order">
                <div class="order-text">
                    <p class="order-bh">订单编号：{{order.bh}}</p>
                    <p class="order-time">订单时间：{{order.createTime}}</p>
                    <p class="order-num">数量：{{order.count}}</p>
                </div>
                <ul class="goods">
                    <li v-for="good in goods" :key="good.id">
                        <div class="good-item">
                            <img v-bind:src="good.url" alt="图片" width="100" height="75">
                            <div class="good-introduction">
                                <span class="good-name">{{good.name}}</span>
                                <span class="good-price">{{good.price}}€</span>
                                <span class="good-total-price">总价：{{good.totalPrice}}€</span>
                            </div>
                            <div class="good-num">
                                <span class="count">数量：{{good.count}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="order-detail">
                    <p class="order-bz">备注：{{order.bz}}</p>
                    <p>金额：<span class="order-price">{{order.hj}}€</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getOrderDetail} from './../service/getData'
export default {
	name: 'orderDetail',
	data () {
		return {
            goods: [],
            loading: false
		}
	},
	computed: {
        order () {
            return this.$route.params.order
        },
		activeCompany () {
			return this.$store.state.activeCompany
		},
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            this.loading = true
            let goodsRes = await getOrderDetail(this.userInfo.id, this.activeCompany.companyId, this.order.orderGuid)
            if (goodsRes.success) {
                this.goods = goodsRes.data
            }
            this.loading = false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
@include cartGood();
.orderDetail {
    height: 100%;
}
.orderDetail-title {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 100;
    text-align: center;
    border-bottom: 1px solid $borcd;
    color: $white;
    @include dtb();
    @include font(16px, 50px);
    a, i {
        position: absolute;
        top: 19px;
        color: $white;

    }
    .el-icon-arrow-left {
        left: 20px;
    }
}

.container {
    height: 100%;
    overflow: auto;
    padding-top: 50px;
}

.order {
    background: #ffffff;
    margin-bottom: 10px;
    padding: 10px;
    color: #666666;
}
.order-text {
    font-size: 14px;
    padding-bottom: 5px;
    border-bottom: 2px solid #f8f8f8;
    > p {
        padding: 2px 0;
    }
}
.order-detail {
    padding-top: 5px;
    font-size: 14px;
    > p {
        padding: 2px 0;
    }
}
.order-price {
    font-size: 14px;
    color: #ff0000;
    font-weight: bold;
}

.good-item {
    display: flex;
    height: 100px;
    padding: 10px;
    border-bottom: 1px solid #c8c7cc;
    font-size: 14px;
    background: $white;
    position: relative;
}

.good-num {
    border: none;
    width: auto;
    bottom: 8px;
}

</style>
