<template>
    <div class="home">
        <div class="home-title">
            我的商家
            <router-link to="/addCompany">
                <el-button type="primary">添加商家</el-button>
            </router-link>
        </div>
        <div class="companyList">
            <ul>
                <li class="company" v-for="(company, index) in companyList" :key="index" v-bind:class="{ active: company.isActive}" @click="toProductPictures(company)">
                    <div class="information">
                        <div class="icon">
							<span v-bind:class="colorObj(index)">{{company.companyDisplayName.substring(0,1)}}</span>
                        </div>
                        <div class="detail">
                            <span class="name" v-bind:title="company.companyDisplayName">{{company.companyDisplayName}}</span>
                            <!-- <span class="mobile">电话：{{company.mobile}}</span> -->
                        </div>
                    </div>
                    <div class="description">
                        <span>{{company.companyScope}}</span>
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
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import footGuide from './footGuide'
export default {
	name: 'home',
	data () {
		return {
		}
	},
	components: {
		footGuide
	},
	computed: {
		noCompany () {
			return this.$store.state.companyList.length <= 0
		},
		companyList () {
			console.log(this.$store.state.companyList)
            return this.$store.state.companyList
		}
	},
	methods: {
		toProductPictures (company) {
			this.$store.commit('setActiveCompany', company)
			this.$router.push('/productPictures')
		},
		colorObj (index) {
			return {
				pink: index % 4 === 0,
				orange: index % 4 === 1,
				blue: index % 4 === 2,
				red: index % 4 === 3
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.home {
	.home-title {
		position: relative;
		text-align: center;
		border-bottom: 1px solid $borcd;
		color: $fc;
		background-color: $white;
		@include font(16px, 49px);
		button {
			position: absolute;
			right: 20px;
			top: 14px;
			padding: 5px;
			@include sc(12px, $white);
			border-radius: 5px;
			background-color: $blue;
		}
	}

	.company {
		background-color: $white;
		margin: 10px;
		padding: 10px 5px 10px 5px;
		border-radius: 10px;
		.information {
			display: flex;
			border-bottom: 1px solid #efeff4;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				@include wh(50px,50px);
				margin-right: 20px;
				background-color: $bc;
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
				align-items: center;
				height: 50px;
				.name {
					@include sc(16px, #000000);
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
			@include sc(12px, #575757);
			padding: 5px;
			span {
				height: 42px;
				line-height: 14px;
				display: -webkit-box;               // 将对象作为弹性伸缩盒子模型显示 。
				text-overflow: ellipsis;            // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
				-webkit-box-orient: vertical;       // 设置或检索伸缩盒对象的子元素的排列方式 。
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
		}
	}
	.active {
		border: 1px solid #e45c28;
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

.red {
	background-color: red;
}
.orange {
	background-color: orange;
}
.blue {
	background-color: blue;
}
.pink {
	background-color: pink;
}

</style>
