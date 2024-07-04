import { getRegionalCascadeAPI } from "@/api/common";
// import { getPositionByLngLatAPI } from "@/api/publicNet";
import { getCurrentLocation } from "@/utils/helper";
import { Cascader, CascaderOption, Popup } from "vant";
import { defineComponent, onMounted, ref, watch } from "vue";
import style from "./index.module.less";

const AreaSelectorProps = {
    show: {
        type: Boolean,
        default: false
    }
}


export default defineComponent({
    props: AreaSelectorProps,
    emits: ['update:show', 'finish'],
    setup(props, {
        emit
    }) {

        const show = ref(props.show)

        watch(() => props.show, (value) => {
            show.value = value
        })


        watch(show, (value) => {
            emit('update:show', value)
        })

        const areaData = ref([])



        const getAddressData = async () => {
            const res = await getRegionalCascadeAPI(4)
            areaData.value = res

        }

        const fieldName = {
            text: 'name',
            value: 'id',
        }

        onMounted(() => {
            getAddressData()
        })

        const onFinish = (data:{value: string | number, selectedOptions: CascaderOption[], tabIndex: number}) => {
            const {value, selectedOptions, tabIndex}= data;
            
            const position =  formatPostion(selectedOptions)
            
            show.value =false
            emit('finish', position)

        }

        const onClose = ()=>{
            show.value = false
        }

        // const onUseCurrentArea = async ()=>{
        //     const location = await getCurrentLocation()
        //     const {lng,lat} = location
        //    const position = await  getPositionByLngLatAPI(lng,lat)

        //    show.value =false
        //    emit('finish', position)
          
        // }

        const formatPostion = (data:any[])=>{
            const [province,city,area,street={}] = data
            return {
                "provinceCode": province.id,
                "provinceName": province.name,
                "cityCode":  city.id,
                "cityName": city.name,
                "areaCode": area.id,
                "areaName": area.name,
                "streetCode": street.id||'',
                "streetName": street.name||'',
            }

        }



        return () => (
            <Popup 
            v-model:show={show.value} 
            position="bottom"
            class={[style['area-selector'],' rounded-t-16  overflow-hidden']}
            
            >

                <Cascader
                    class={[style['cascader']]}
                    fieldNames={fieldName}
                    options={areaData.value}
                    onFinish={onFinish}
                    onClose={onClose}
                    
                    v-slots={{
                        title(){
                            return (
                                <div class={''}>
                              
                                <div class="font--t7 text-black">
                                    请选择所在地区
                                </div>
                                <div class={[style['header'],'flex--center--v px-10 font--t5 font-bold']}>
                                    <div class={['flex-1 text-black']}></div>
                                    <div 
                                    // onClick={onUseCurrentArea} 
                                    class={['text-blue']}>使用当前地区</div>
                                </div>
                               
                            </div>
                               
                            )
                        }
                    }}
                />
            </Popup>

        )
    }
});