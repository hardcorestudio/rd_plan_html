<template>
    <div :style="CompStyle">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="转移联单编号">
            <a-input v-model.trim="form.ksldbh" placeholder="一般情况联单号是G开头"/>
        </a-form-model-item>
        <a-form-model-item label="运输日期">
        <a-date-picker
            v-model="form.ysrq"
            show-time
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            format="YYYY-MM-DD HH:mm:ss"
            :locale="locale"
        />
        </a-form-model-item>
        <a-form-model-item label="运输车牌号">
            <a-input v-model.trim="form.yscph" placeholder="输入车牌号,例如:津ABC123" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-popconfirm
                title="一旦提交无法修改,确认提交么?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="onSubmit"
            >
                <a-button type="primary" >提交</a-button>
            </a-popconfirm>
        </a-form-model-item>
        </a-form-model>
        <hr>
        <div>修改联单形态和处置方式</div>
        <br>
        <div style="display:flex">
            <a-input v-model.trim="queryData.ksldbh" placeholder="一般情况联单号是G开头"/>
            <a-button type="primary" @click="getBill">提交</a-button>
        </div>
       <div v-for="item in form2.fwsz" :key="item.fwmc">
           <div style="display:flex;">
                <div>废物名称:{{item.fwmc}}</div>
                <div>形态:</div>
                <a-input style="width: 100px" v-model.trim="item.xt" placeholder="形态"/>
                <div>处置方式:</div>
                <a-input style="width: 100px" v-model.trim="item.lyczfs" placeholder="处置方式"/>
           </div>
        </div>
        <div>
            <a-button type="primary" @click="updateBill">修改联单信息</a-button>
        </div>
    </div>
</template>

<script>
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import {Http} from '@/kits/Http'
import moment from 'moment';

export default {
    name:"RightWrapper",
    props:{
        CompStyle:Object
    },
    data() {
        return {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
            locale,
            form: {
                ksldbh: '',
                ysrq: undefined,
                yscph: '',
            },
            queryData:{
                sxzqhdm:"120000",
                ksldbh:"G2020120100004996"
            },
            form2:{

            }
        };
    },
    methods: {
        async onSubmit() {
            this.form.ysrq = moment(this.form.ysrq).format("YYYY-MM-DD HH:mm:ss") 
            const res = await Http('/syncUpload/indexForCors',{
                "jsonParam":JSON.stringify(this.form),
                "method":"saveKsldYs",
                "url":"http://gfxt.mepscc.cn/edpgf_ws/servicesx/KSTranService?wsdl"
            })
            let message = ""
            let description = ""
            if (res.length < 10) {
                message = "失败"
                description = "返回错误代码为:"+res
            }else{
                message = "成功"
                description = "提交成功单号为:"+res
            }
            this.$notification.open({
                message,
                description,
            });
            console.log(res)
        },
        async getBill(){
            try {
                const res = await Http('/syncUpload/indexForCors',{
                    "jsonParam":JSON.stringify(this.queryData),
                    "method":"getYcKsld",
                    "url":"http://gfxt.mepscc.cn/edpgf_ws/servicesx/KSTranService?wsdl"
                })
                console.log(res)
                this.form2 = res[0]
                this.$notification.open({
                    message:"查询成功"
                });
            } catch (e) {
                this.$notification.open({
                    message:e
                });
            }
        },
        async updateBill(){
            if(this.form2.ksldbh == null || this.form2.ksldbh == "" ){
                this.$notification.open({
                    message:"请输入跨省联单号进行查询"
                });
                return 
            }
            try {
                const res = await Http('/syncUpload/indexForCors',{
                    "jsonParam":JSON.stringify(this.form2),
                    "method":"saveKsld",
                    "url":"http://gfxt.mepscc.cn/edpgf_ws/servicesx/KSTranService?wsdl"
                })
                console.log(res)
                let message = ""
                let description = ""
                if (res.length < 10) {
                    message = "失败"
                    description = "返回错误代码为:"+res
                }else{
                    message = "修改成功"
                    description = "提交成功单号为:"+res
                }
                this.$notification.open({
                    message,
                    description,
                });
            } catch (e) {
                this.$notification.open({
                    message:e
                });
            }
        },
        async del(){
            const arr = [
'2020120100030111',
'2019120100024476',
'2019120100027959',
'2020120100057225',
'2020120100057386',
'2020120100069258',
'2020120100069335',
            ]
            try {
                for(let item of arr){
                    const res = await Http('/syncUpload/indexForCors',{
                        "jsonParam":JSON.stringify({
                            ldbh:item,
                            zxyy:"作废"
                        }),
                        "method":"saveSnldZX",
                        "url":"http://gfxt.mepscc.cn/edpgf_ws/servicesx/TranService?wsdl"
                    })
                    console.log(res)
                }
                
                
            } catch (e) {
                console.log(e)
            }
        }
    },
    created(){
        // this.del()
    }
}
</script>