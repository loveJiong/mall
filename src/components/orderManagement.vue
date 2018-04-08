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
            <ul class="orders" >
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
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
import {getOrder} from './../service/getData'
import footGuide from './footGuide'
export default {
    name: 'orderManagement',
    data () {
        return {
            active: {},
            menuShow: false,
            tabs: [
                {
                    name: '全部',
                    status: 0,
                    isActive: true
                },
                {
                    name: '处理中',
                    status: 1,
                    isActive: false
                },
                {
                    name: '已完成',
                    status: 2,
                    isActive: false
                }
            ],
            orders: []
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
            let orderRes = await getOrder(this.userInfo.id, this.activeCompany.companyId, status)
            if (orderRes.success) this.orders = orderRes.data
            console.log(this.orders)
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
            this.getOrder()
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
            width: 33.33%;
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
</style>
