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
                        <span class="company-price">{{company.price}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <ul class="tabs">
                <li v-for="(item, index) in tabs" v-bind:key="index" class="tab-item" v-bind:class="{ active: item.isActive}" @click="tabSwitch(item)">{{item.name}}</li>
            </ul>
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
// import {getComanyList} from './../service/getData'
import footGuide from './footGuide'
export default {
    name: 'orderManagement',
    data () {
        return {
            activeName: 'all',
            menuShow: false,
            tabs: [
                {
                    name: '全部',
                    isActive: true
                },
                {
                    name: '处理中',
                    isActive: false
                },
                {
                    name: '已完成',
                    isActive: false
                }
            ]
        }
    },
    components: {
        footGuide
    },
    computed: {
		companyList () {
            return this.$store.state.companyList
        },
		activeCompany () {
			return this.$store.state.activeCompany
		}
	},
    mounted () {
        document.addEventListener('click', this.menuHide)
        this.active = this.tabs[0]
    },
    beforeDestroy () {
        document.removeEventListener('click', this.menuHide)
    },
    methods: {
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.order-management {
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
}
</style>
