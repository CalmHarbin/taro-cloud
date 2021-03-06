import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

//声明自定义组件
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'van-popup': {
                children?: Element
                show: boolean
                position: string
                onClose: () => void
                'onBefore-enter': () => void
            }
            'van-picker': {
                ref?: string
                title: string
                columns: string[]
                onConfirm: () => void
                onCancel: () => void
            }
        }
    }
}

//声明 props
type PropsType = {
    show: boolean
    title: string
    columns: string[]
    default_index: number
    onInput: (state: boolean) => void
    onConfirm: (value: boolean, index: number) => void
}

//声明 state
type StateType = {
    index: number
}

interface BaseActionsheet {
    props: PropsType
    state: StateType
}

class BaseActionsheet extends Component {
    static defaultProps = {
        show: false,
        title: '选择时间',
        columns: [],
        default_index: 0
    }

    config: Config = {
        usingComponents: {
            'van-popup': '../../wxcomponents/vant-weapp/popup/index',
            'van-picker': '../../wxcomponents/vant-weapp/picker/index'
        }
    }

    state = {
        index: 0
    }

    componentWillMount() {
        this.update()
    }
    update() {
        this.setState({
            index: this.props.default_index
        })
    }
    /**
     * 确定
     * @method onConfirm
     * @param { Date } value 选中的时间
     * @return { String } 格式化后的结果
     */
    onConfirm(event) {
        let { value, index } = event.detail
        //关闭弹出层
        this.props.onInput(false)
        this.props.onConfirm(value, index)
    }
    /**
     * 取消选择
     * @method cancel
     * @return { undefined }
     */
    cancel() {
        this.props.onInput(false)
    }

    Afterleave() {
        console.log('离开')
    }

    render() {
        return (
            <View className="DatetimePicker">
                <van-popup
                    show={this.props.show}
                    position="bottom"
                    onClose={this.cancel.bind(this)}
                    onBefore-enter={this.update}
                    onAfter-leave={this.Afterleave}
                >
                    <van-picker
                        ref="picker"
                        show-toolbar
                        title={this.props.title}
                        default-index={this.state.index}
                        columns={this.props.columns}
                        onConfirm={this.onConfirm.bind(this)}
                        onCancel={this.cancel.bind(this)}
                    />
                </van-popup>
            </View>
        )
    }
}

export default BaseActionsheet
