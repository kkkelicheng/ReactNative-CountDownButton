/**
 * Created by lichengke on 2017/6/6.
 */


import React, { Component ,PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

const LCCountDownButtonState = {
    LCCountDownButtonActive : 0,
    LCCountDownButtonDisable : 1,
}

var timeRecodes = [];  //以后用

export default class LCCountDownButton extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state={
             btnTitle:'默认'
          }
      }

    static propTypes = {
        id               :React.PropTypes.string,          //以后用
        beginText        :React.PropTypes.string,   //初始状态按钮title
        endText          :React.PropTypes.string,     //读秒结束后按钮的title
        count            :React.PropTypes.number,       //计时数
        pressAction      :React.PropTypes.func,   //按下按钮的事件,但是触发倒数需要你自己来调用方法
        changeWithCount  :React.PropTypes.func,   //读秒变化的函数,该函数带有一个参数count,表示当前的剩余事件
        end              :React.PropTypes.func,           //读秒完毕后的函数
        frameStyle       :View.propTypes.style    //初始化的位置大小
    }

    buttonState = LCCountDownButtonState.LCCountDownButtonActive;

    componentWillMount() {
        this.state = {
            btnTitle:this.props.beginText,
        }
    }

    clearTime(){
        this.interval && clearInterval(this.interval);
    }

    componentWillUnMount() {
        this.clearTime();
    }

    //外界调用
    startCountDown(){
        this.buttonState = LCCountDownButtonState.LCCountDownButtonDisable;
        const {changeWithCount,endText,count,end}= this.props;
        this.startTime = Date.now();
        this.interval = setInterval(()=>{
            let detalTime = Math.round((Date.now() - this.startTime)/1000);
            let content = changeWithCount(count - detalTime);
            if (detalTime >= count){
                content = endText;
                this.clearTime();
                end && end();
                this.buttonState = LCCountDownButtonState.LCCountDownButtonActive;
            }
            this.setState({
                btnTitle:content
            })
        },1000)
    }

    render(){
        let isDisable = this.buttonState == LCCountDownButtonState.LCCountDownButtonDisable
        const {frameStyle} = this.props

        return (
            <TouchableOpacity disabled={isDisable}
                              onPress={()=>{this.props.pressAction && this.props.pressAction()}}
                              style={[styles.buttonCommonStyle,isDisable?styles.disableButtonStyle:styles.activeButtonStyle,frameStyle]}
            >
                <Text style={[styles.txtCommonStyle,isDisable?styles.disableTxtStyle:styles.activeTxtStyle]}>
                    {this.state.btnTitle}
                </Text>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({

    buttonCommonStyle:{
        borderRadius:3,
        borderWidth:1,
        borderColor:'gray',
        paddingRight:15,
        paddingLeft:15,
        paddingTop:8,
        paddingBottom:8,
        justifyContent:'center',
        alignItems:'center'
    },
    //禁用时候的TouchableOpacity样式
    disableButtonStyle:{
        backgroundColor:'red',
    },
    //可以点击时候的TouchableOpacity样式
    activeButtonStyle:{
        backgroundColor:'green',
    },

    txtCommonStyle:{
        fontSize:14,
    },
    //禁用时候的Text样式
    disableTxtStyle:{
        color:'gray',
    },
    //可以点击时候的Text样式
    activeTxtStyle:{
        color:'black',
    }
});