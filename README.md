# ReactNative-CountDownButton
封装的一个倒计时按钮,仅仅使用`TouchableOpacity`和`Text`两个东西


为啥自己写一个? 感觉别人写的不好而已

## 特点
* 容易自己改代码
* 接口多


## 怎么使用
直接下载该js文件就行了，不需要npm xxx这东西

**1. 初始化该组件**

```

// changeWithCount 是返回一个字符串表示button的title
// pressAction  按下按钮的事件，并不会触发倒计时
 <LCCountDownButton beginText = {'点击获取验证码'} 
                    endText = {'再次点击获取验证码'}
                    changeWithCount = {(count)=>count+'秒后获取'}
                    count = {5}
                    end = {()=>{console.log('读秒结束')}}
                    pressAction = {()=>{this._countDownButtonPressed()}}
                    ref = "LCCountDownButton"
                    frameStyle = {{width:200,height:40,position:'absolute',right:10,top:100}}

/>

```

**2.触发LCCountDownButton倒计时方法**

```
// 按下按钮触发
    _countDownButtonPressed(){
    		// 1s 后触发倒计时
        this.timer = setTimeout(this.triggerCount.bind(this),1000);
    }

// 拿到按钮，开始倒计时
    _triggerCount(){
        let button = this.refs.LCCountDownButton;
        button.startCountDown();
    }

```


## 交给你做的事 
TouchableOpacity 和 Text 不同状态下的样式，在源文件里面已经写了。
当然你也可以自己改源文件，将这些样式作为属性传入。

## 效果图
![效果图](https://github.com/kkkelicheng/ReactNative-CountDownButton/blob/master/countDownButton.gif)