<template>
    <div class="orderDetail">
        <div class="orderDetail-title">
            <router-link :to="{name: 'orderManagement' , params: { tabs: 1 }}" class="el-icon-arrow-left"></router-link>
            订单详情
        </div>
        <div class="container"  v-loading="loading">
            <div class="order">
                <div class="order-text">
                    <p class="order-bh"><span class="order-title">订单编号：</span>{{order.bh}}</p>
                    <p class="order-bz"><span class="order-title">备注：</span>{{order.bz}}</p>
                </div>
                <ul class="goods">
                    <li v-for="good in goods" :key="good.id">
                        <div class="good-item">
                            <img v-bind:src="good.url" alt="图片" width="100" height="70">
                            <div class="good-introduction">
                                <span class="good-name">{{good.name}}</span>
                                <span class="good-price">单价：{{good.price}}€</span>
                            </div>
                            <div class="good-detail">
                                <span class="good-total-price">总价：{{good.totalPrice}}€</span>
                                <div class="good-num">
                                    <span class="count">数量：{{good.count}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="order-detail">
                    <div class="num-price">
                        <p class="order-num"><span class="order-title">数量：</span>{{order.count}}</p>
                        <p class="order-price"><span class="order-title">金额：</span>{{order.hj}}€</p>
                    </div>
                    <span class="order-time">{{order.createTime}}</span>
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
    background-color: #89c4f4;
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

.good-item {
    display: flex;
    height: 100px;
    padding: 10px;
    border-bottom: 1px solid #c8c7cc;
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
</style>
