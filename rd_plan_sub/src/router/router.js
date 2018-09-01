import Vue from 'vue'
import VueRouter from 'vue-router'
import productionSituation from '../components/content/page/productionSituation.vue'
import environmentalMonitoring from '../components/content/page/environmentalMonitoring.vue'
import decrementPlan from '../components/content/page/decrementPlan.vue'
import lastYearManagePlanRecord from '../components/content/page/lastYearManagePlanRecord.vue'
import baseInfo from '../components/content/page/baseInfo.vue'
import transferStuation from '../components/content/page/transferStuation.vue'
import selfDisposalMeasures from '../components/content/page/selfDisposalMeasures.vue'
import produceSituation from '../components/content/page/produceSituation.vue'
import entrustDisposalMeasures from '../components/content/page/entrustDisposalMeasures.vue'



// import Main from '../components/content/Main.vue';
// import Page404 from '../components/content/Page404.vue';
// import Menu1 from '../components/content/main/Menu1.vue';
// import Menu2 from '../components/content/main/Menu2.vue';
// import Menu3 from '../components/content/main/Menu3.vue';
// import Menu4 from '../components/content/main/Menu4.vue';
// import Menu5 from '../components/content/main/Menu5.vue';
// import Menu6 from '../components/content/main/Menu6.vue';
Vue.use(VueRouter);

const routes = [
	{
		path: '/productionSituation',
		component: productionSituation,
	},
	{
		path: '/environmentalMonitoring',
		component: environmentalMonitoring,
	},
	{
		path: '/decrementPlan',
		component: decrementPlan,
	},
	{
		path: '/lastYearManagePlanRecord',
		component: lastYearManagePlanRecord,
	},
	{
		path: '/baseInfo',
		component: baseInfo,
	},
	{
		path: '/transferStuation',
		component: transferStuation,
	},
	{
		path: '/selfDisposalMeasures',
		component: selfDisposalMeasures,
	},
	{
		path: '/produceSituation',
		component: produceSituation,
	},
	{
		path: '/entrustDisposalMeasures',
		component: entrustDisposalMeasures,
	}
	// {
	// 	path:'/',
	// 	component:Content,
	// 	children:[
	// 		{
	// 			path:'/main',
	// 			component:Main,
	// 			children:[
	// 				// {path:'menu1',component:Menu1},
	// 				// {path:'menu2',component:Menu2},
	// 				// {path:'menu3',component:Menu3},
	// 				// {path:'menu4',component:Menu4},
	// 				// {path:'menu5',component:Menu5},
	// 				// {path:'menu6',component:Menu6},
	// 			]
	// 		},
	// 	]
	// },
	// {
	// 	path:'/page404',
	// 	component:Page404
	// }

]

const router = new VueRouter({
	routes
})

export default router;