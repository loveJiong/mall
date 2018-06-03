<template>
	<div class="product-pictures" v-loading="loading">
		<div class="company-switch">
			<div class="company-menu">
				<div class="company-active" @click.stop="menuToggle">
					<!-- <img class="company-img" v-bind:src="activeCompany.companyLogo" alt="icon"> -->
					<span>{{activeCompany.companyDisplayName}}</span>
					<i v-show="menuShow" class="el-icon-caret-top"></i>
					<i v-show="!menuShow" class="el-icon-caret-bottom"></i>
				</div>
				<ul v-show="menuShow" class="companyList">
					<li v-for="(company, index) in companyList" v-bind:key="index" v-bind:class="{ active: company.isActive}" @click.stop="companyChoose(company)">
						<img class="company-img" v-bind:src="company.companyLogo" alt="icon">
						<span class="company-name">{{company.companyDisplayName}}</span>
					</li>
				</ul>
			</div>
		</div>
		<ul class="container">
			<li v-for="category in categoryList" :key="category.guid" @click="gotoDeatile(category)">
				<img v-bind:src="category.url" alt="img">
				<span>{{category.name}}</span>
				<i class="el-icon-arrow-right"></i>
			</li>
		</ul>
		<foot-guide></foot-guide>
		<div class="box" v-show="menuShow" @touchmove="preventTouchmove"></div>
	</div>
</template>

<script>
import footGuide from './footGuide'
import {getCategoryList} from './../service/getData'
export default {
	name: 'productPictures',
	data () {
		return {
			categoryList: [
			],
			menuShow: false,
			loading: false
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
		if (this.companyList.length > 0) {
			this.getCategoryList()
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
        async getCategoryList () {
			this.loading = true
            let categoryListRes = await getCategoryList(this.activeCompany.companyId)
            if (categoryListRes.success) {
				this.$store.commit('setCategoryList', categoryListRes.data)
				this.categoryList = this.$store.state.categoryList
				if (this.$route.params.toGroupDetail) this.gotoDeatile(this.categoryList[0])
				console.log(this.categoryList)
            }
			this.loading = false
        },
		gotoDeatile (category) {
			this.$store.commit('setActiveCategory', category)
			this.$router.push({name: 'groupDetail', params: { refresh: true }})
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
			this.menuShow = false
			this.getCategoryList()
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
.product-pictures {
	height: 100%;
	padding-top: $headH;
	overflow: auto;
	.company-switch {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
		display: flex;
		@include wh(100%, $headH);
		align-items: center;
		background-color: $white;
		border-bottom: 1px solid $borcd;
		z-index: 100;
		.company-menu {
			width: 100%;
			.company-active {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				text-align: center;
				background-color: $white;
				@include sc(16px, $headfc);
				i {
					color: #007aff;
				}
			}
			.companyList {
				position: absolute;
				top: $headH;
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
				}
				.active {
					background-color: $white;
					// .company-name {
					// 	color: #007aff;
					// }
				}
			}
		}
	}
	.company-img {
		@include wh(25px, 25px);
	}
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		padding-top: 10px;
		padding-bottom: 45px;
		li {
			display: flex;
			position: relative;
			align-items: center;
			padding: 5px;
			background-color: $white;
			border-bottom: 1px solid #c8c7cc;
			img {
				@include wh(90px, 60px);
			}
			i {
				position: absolute;
				right: 20px;
				color: #333333;
			}
			span {
				margin-left: 10px;
				@include sc(16px, #333333);
			}
		}
	}
}
</style>
