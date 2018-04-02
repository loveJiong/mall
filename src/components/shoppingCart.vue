<template>
    <div class="shopping-cart">
        <div class="header">
            <div class="shopping-title" @click.stop="''">
                当前订单
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
                        <span class="company-price">{{company.price}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="no-goods" v-if="!haveGoods">
                <i class="el-icon-warning"></i>
                <span class="title">当前订单是空的</span>
                <span class="text">你目前没有订购任何产品，你可以点击左下角的产品图册进行选购！</span>
                <router-link to="/productPictures">去看看</router-link>
            </div>
            <div class="have-goods" v-if="haveGoods">
                <ul class="good-list">
                    <li class="good-item" v-for="(good, index) in goods" v-bind:key="index" v-if="good.num > 0">
                        <img v-bind:src="good.url" alt="图片" width="100" height="70">
                        <div class="good-introduction">
                            <span class="good-name">{{good.name}}</span>
                            <span class="good-price">{{good.price}}</span>
                        </div>
                        <div class="good-detail">
                            <span class="good-total-price">总价：{{good.totalPrice}}</span>
                            <div class="good-num">
                                <i class="el-icon-remove" @click="removeToCart(good)" v-if="good.num > 0"></i>
                                <span class="count" v-if="good.num > 0">{{good.num}}</span>
                                <i class="el-icon-circle-plus" @click="addToCart(good)"></i>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="commit-order">
                    <input type="text" class="order-bz" v-model="bz" placeholder="在这里写下您的订单备注">
                    <el-button type="primary" round @click="commitOrder">提交订单</el-button>
                </div>
            </div>
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
import {commitOrder} from './../service/getData'
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
        console.log(this.goods)
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
            good.num++
            this.$store.commit('addToCart', {company: this.activeCompany, good})
        },
        removeToCart (good) {
            good.num--
            this.$store.commit('removeToCart', {company: this.activeCompany, good})
            this.init()
        },
        async commitOrder () {
            let data = {
                companyId: this.activeCompany.companyId,
                customerId: this.userInfo.id,
                bz: this.bz,
                goods: this.goods
            }
            let commitRes = await commitOrder(data)
            if (commitRes.success) {
                this.$message.success('提交订单成功！')
                this.$store.commit('clearCart', this.activeCompany.companyId)
                this.init()
            }
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
    padding-bottom: 84px;
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
    position: absolute;
    bottom: 46px;
    width: 100%;
    justify-content: flex-end;
    background: #fff;
    align-items: center;
    padding: 5px 20px;
    border-top: 1px solid #c8c7cc;
    .order-bz {
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
</style>
