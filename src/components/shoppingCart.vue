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
            <div class="no-goods">
                <i class="el-icon-warning"></i>
                <span class="title">当前订单是空的</span>
                <span class="text">你目前没有订购任何产品，你可以点击左下角的产品图册进行选购！</span>
                <router-link to="/productPictures">去看看</router-link>
            </div>
        </div>
        <foot-guide></foot-guide>
        <div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
    </div>
</template>

<script>
// import {getComanyList} from './../service/getData'
import footGuide from './footGuide'
export default {
    name: 'shoppingCart',
    data () {
        return {
            menuShow: false
        }
    },
    computed: {
		companyList () {
            return this.$store.state.companyList
        },
		activeCompany () {
			return this.$store.state.activeCompany
		}
	},
    components: {
        footGuide
    },
    mounted () {
        document.addEventListener('click', this.menuHide)
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.shopping-cart {
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
</style>
