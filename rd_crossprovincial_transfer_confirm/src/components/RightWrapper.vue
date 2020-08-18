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
    },
}
</script>