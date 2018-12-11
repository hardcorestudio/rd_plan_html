<template>
	<div id='registrationForm'>
		<my-aside userRole="download" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="registrationFormContent">
			<div id="result_area" class="rf_bg">
				<el-row class="rf_formTitle">管理计划备案登记表</el-row>
				<el-row class="rf_title">备案编号：{{queryJson.TP_ID}}</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">单位名称</div>
					</el-col>
					<el-col :span="18" class="rf_columnBg">
						<div class="rf_column">{{rfData.compName}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">单位地址</div>
					</el-col>
					<el-col :span="18" class="rf_columnBg">
						<div class="rf_column">{{rfData.compAddr}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">法定代表人</div>
					</el-col>
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">{{rfData.legalPerson}}</div>
					</el-col>
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">行业类型</div>
					</el-col>
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">{{rfData.tradeType}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">联系人/方式</div>
					</el-col>
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">{{rfData.person}}</div>
					</el-col>
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">邮箱</div>
					</el-col>
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">{{rfData.mail}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">危险废物产生规模及数量</div>
					</el-col>
					<el-col :span="18" class="rf_columnBg">
						<div class="rf_column">{{rfData.plan}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="6" class="rf_columnBg"> 
						<div class="rf_column">危险废物名称及类别</div>
					</el-col>
					<el-col :span="18" class="rf_columnBg">
						<div class="rf_column">{{rfData.nameAndType}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="10" class="rf_columnBg">
						<div class="rf_column">计划委托利用/处置危险废物数量</div>
					</el-col>
					<el-col :span="14" class="rf_columnBg">
						<div class="rf_column">{{rfData.otherUse}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="10" class="rf_columnBg">
						<div class="rf_column">计划自行利用/处置危险废物数量</div>
					</el-col>
					<el-col :span="14" class="rf_columnBg">
						<div class="rf_column">{{rfData.selfUse}}</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="24" class="rf_columnBg">
						<div class="rf_column">
							<div class="rf_description">声明：所填写的管理计划内容是完整的、真实的和正确的。</div>
							<div class="rf_name">单位负责人/法定代表人签名：</div>
							<div class="rf_date">年 &nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;日（企业公章）</div>
						</div>
					</el-col>
				</el-row>
				<el-row class="rf_rowBg">
					<el-col :span="24" class="rf_columnBg">
						<div class="rf_column">
							<div class="rf_description">你单位上报的《危险废物管理计划》经形式审查，符合要求，予以备案。</div>
							<div class="rf_date">年 &nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;日（环保部门公章）</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<img id="result_canvasImg" src="">
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'registrationForm',
	data () {
		return {
			repaetClickTime: 2,
			repeatClickFlag: false,
			myTitleInfo: {
				title: "管理计划备案登记表",
				epName: "",
				textInfoList: []
			},
			userRole: '',
			queryJson: {},
			EP_ID: "",
			rfData: {
				compName: "", //单位名称
				compAddr: "", //单位地址
				legalPerson: "", //法人代表
				tradeType: "", //行业类别
				person: "", //联系人，方式
				mail: "", //邮箱
				plan: "", //危险废物产生规模及数量
				nameAndType: "", //危险废物名称及类别
				otherUse: "", //计划委托利用
				selfUse: "", //计划自行利用
			}
		}
	},
	components: {
		'my-aside': Aside,
	},
	mounted () {
		checkBrowser(() => {
			// this.$message({
			// 	showClose: true,
			// 	message: '您当前使用的浏览器不支持本模块功能，建议使用Chrome浏览器',
			// 	type: 'warning'
			// });
			// this.$router.push({ path: '/pageIncompatible' })
			window.location.href = "pageIncompatible.html";
		})
		this.repeatClickFlag = false
		this.queryJson = getQueryString()
		this.myTitleInfo.epName = this.queryJson.epName

		fetch({
			url: '/plan/previewPlan',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {
			// let res = {
			// 	"sepaName": "西青区",
			// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiZGh0T1haNXdlS1prOGVJM1MzZVFjWT0=",
			// 	"operatorId": "",
			// 	"status": "",
			// 	"ROLEID": "CSEP",
			// 	"empId": "",
			// 	"ifLogin": "0",
			// 	"epName": "天津市昱隆泰再生资源环保处理有限公司",
			// 	"epId": "EP201410280946090018",
			// 	"userType": "CSEP",
			// 	"newGuideFlag": "",
			// 	"belongQ": "",
			// 	"belongSepa": "XQQ",
			// 	"userPortrait": "",
			// 	"belongS": "",
			// 	"nickName": "天津市昱隆泰再生资源环保处理有限公司",
			// 	"orgCode": "",
			// 	"IWBSESSION": "BROWSER-20181023095500",
			// 	"userId": "EP201410280946090018",
			// 	"previewPlan": {
			// 		"handle": "废物名称1:10000.00吨;废物名称3:50.00吨;废物名称4:7000.00吨;废物名称5:9.00吨;废物名称2:300000.00个;",
			// 		"industryName": "环境治理业",
			// 		"handleSelf": "",
			// 		"overview": "废物名称1:HW01;废物名称2:HW01;废物名称3:HW02;废物名称4:HW05;废物名称5:HW06;",
			// 		"epAdress": "天津市西青区天津西青高端金属制品工业区19号",
			// 		"EP_NAME": "天津市昱隆泰再生资源环保处理有限公司",
			// 		"fr": "王富庆",
			// 		"LINKINFO": "李四/02223192611",
			// 		"output": "铲平名称一二三四五六七八九十一二:600.00吨;好的:8000000000.00个;",
			// 		"MAIL": "123@qq.com"
			// 	},
			// 	"userName": "",
			// 	"contextPath": "",
			// 	"realName": "",
			// 	"orgSeq": ""
			// }
			this.userRole = res.userType

			this.EP_ID = res.epId

			if(res.previewPlan){
				this.rfData.compName = res.previewPlan.EP_NAME
				this.rfData.compAddr = res.previewPlan.epAdress
				this.rfData.legalPerson = res.previewPlan.fr
				this.rfData.tradeType = res.previewPlan.industryName
				this.rfData.person = res.previewPlan.LINKINFO
				this.rfData.mail = res.previewPlan.MAIL
				this.rfData.plan = res.previewPlan.output
				this.rfData.nameAndType = res.previewPlan.overview
				this.rfData.otherUse = res.previewPlan.handle
				this.rfData.selfUse = res.previewPlan.handleSelf
			}
		})

	},
	methods: {
		doSubmit() {
			if(!this.repeatClickFlag){
				this.repeatClickFlag = true
				setTimeout(() => {
					this.repeatClickFlag = false
				}, this.repaetClickTime * 1000 );
			}else{
				this.$notify.error({
					title: '警告',
					message: this.repaetClickTime + "秒内不得重复提交"
				});
				return;
			}
			//下载图片
			var thisPage = document.getElementById("result_area");
			try{
				html2canvas(thisPage).then(function(canvas) {
					try {
						// document.getElementById('result_canvasImg').src = canvas.toDataURL("image/png")
						var a = document.createElement('a')  
						var event = new MouseEvent('click')  
							
						a.download = '管理计划备案登记表'  
						a.href = canvas.toDataURL("image/png")  
							
						a.dispatchEvent(event) 
					}
					catch(err) {
					} 
				});
			}catch(e){
				console.log("生成失败，如果不介意，我们再来一次");
			}
		}
	}
}
</script>
<style scoped>
#registrationForm {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#registrationFormContent {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
.rf_formTitle{
	width: 100%;
	height: 44px;
	line-height: 44px;
	font-size: 20px;
	box-sizing: border-box;
	text-align: center;
}
.rf_title{
	width: 100%;
	height: 32px;
	line-height: 32px;
	font-size: 16px;
	box-sizing: border-box;
	padding: 0 5px;
}
.rf_bg{
	width: 100%;
	max-width: 750px;
}
.rf_rowBg {
	border: 1px solid #a4a4a4;
	display: flex;
	background: #fff;
}
.rf_columnBg {
	display: flex;
}
.rf_column {
	padding: 10px;
	border: 1px solid #a4a4a4;
	font-size: 16px;
	display: flex;
	flex: 1;
	flex-direction: column;
} 
.rf_description{
	width: 100%;
	margin: 25px 0;
} 
.rf_name{
	width: 100%;
} 
.rf_date{
	width: 100%;
	text-align: right;
}
</style>