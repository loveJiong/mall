<template>
    <div class="home">
        <div class="home-title">
            我的商家
            <router-link to="/addCompany">
                <el-button round type="primary">添加商家</el-button>
            </router-link>
        </div>
		<pull-to :top-load-method="refresh" :top-config="{failText: '刷新失败', doneText: '刷新完成'}" :top-block-height="0">
			<div class="companyList" v-if="!noCompany">
				<ul>
					<li class="company" v-for="(company, index) in companyList" :key="index" v-bind:class="{ active: company.isActive}" @click="toProductPictures(company)">
						<div class="information">
							<div class="icon">
								<span v-bind:class="colorObj(index)">{{company.companyDisplayName.substring(0,1)}}</span>
							</div>
							<div class="detail">
								<span class="name" v-bind:title="company.companyDisplayName">{{company.companyDisplayName}}</span>
								<span class="description">{{company.companyScope}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="no-company" v-if="noCompany">
				<i class="el-icon-warning"></i>
				<span class="title">当前没有商家</span>
				<span class="text">你目前没有添加任何商家，你可以点击左右上角的添加商家进行添加！</span>
				<router-link to="/addCompany">去添加</router-link>
			</div>
		</pull-to>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import footGuide from './footGuide'
import PullTo from 'vue-pull-to'
import {getCompanyList} from './../service/getData'
export default {
	name: 'home',
	data () {
		return {
		}
	},
	components: {
		footGuide,
		PullTo
	},
	computed: {
		noCompany () {
			return this.$store.state.companyList.length <= 0
		},
		companyList () {
            return this.$store.state.companyList
		},
		userInfo () {
            return this.$store.state.userInfo
		}
	},
	methods: {
		toProductPictures (company) {
			this.$store.commit('setActiveCompany', company)
			this.$router.push('/productPictures')
		},
		colorObj (index) {
			return {
				color1: index % 7 === 0,
				color2: index % 7 === 1,
				color3: index % 7 === 2,
				color4: index % 7 === 3,
				color5: index % 7 === 4,
				color6: index % 7 === 5,
				color7: index % 7 === 6
			}
		},
		async refresh (loaded) {
			let companyListRes = await getCompanyList(this.userInfo.id)
			if (companyListRes.success) {
				this.$store.commit('setCompanyList', companyListRes.data)
				loaded('done')
			} else {
				loaded('fail')
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.home {
	height: 100%;
	.home-title {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		text-align: center;
		border-bottom: 1px solid $borcd;
		color: $headfc;
		background-color: $white;
		@include font(16px, 49px);
		button {
			width: 70px;
			position: absolute;
			right: 20px;
			top: 14px;
			padding: 5px;
			@include sc(12px, $white);
            @include dbb();
		}
	}
	.companyList {
		height: 100%;
		overflow: auto;
		padding-top: 50px;
		padding-bottom: 90px;
	}
	.company {
		background-color: $white;
		margin: 10px;
		padding: 5px 5px 5px 5px;
		.information {
			display: flex;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				@include wh(50px,50px);
				margin-right: 20px;
				span {
					@include wh(40px,40px);
					line-height: 40px;
					text-align: center;
					color: $white;
					font-size: 30px;
				}
			}
			.detail {
				display: flex;
				flex-direction: column;
				height: 50px;
				.name {
					@include sc(16px, #333333);
					margin-top: 3px;
					margin-bottom: 5px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: auto;
				}
				.mobile {
					@include sc(12px, #aaaaaa);
				}
			}
		}
		.description {
			@include sc(12px, #999999);
			height: 16px;
			display: -webkit-box;               // 将对象作为弹性伸缩盒子模型显示 。
			text-overflow: ellipsis;            // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
			-webkit-box-orient: vertical;       // 设置或检索伸缩盒对象的子元素的排列方式 。
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
	}
	.active {
		border: 1px solid #007aff;
	}
}

.no-company {
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

.color1 {
	background-color: #ed386f;
}
.color2 {
	background-color: #ff7e00;
}
.color3 {
	background-color: #00a5a0;
}
.color4 {
	background-color: #007aff;
}
.color5 {
	background-color: #72b442;
}
.color6 {
	background-color: #ed4f25;
}
.color7 {
	background-color: #3d62db;
}

.vue-pull-to-wrapper .action-block {
	top: -60px !important;
}
</style>
