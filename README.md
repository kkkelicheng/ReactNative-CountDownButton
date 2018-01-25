# ReactNative-CountDownButton
封装的一个倒计时按钮,仅仅使用`TouchableOpacity`和`Text`两个东西

为啥自己写一个? 感觉别人写的不好而已，而且功能不全.

有好的建议请给issue，有问题也可以提出。

## 安装
使用**npm**或者**手动**
* npm安装
执行以下`npm install react-native-countdownbutton -S`一下,
在需要用到的地方导入头文件`import LCCountDownButton from 'react-native-countdownbutton'`
* 手动安装
download这个LCCountDownButton.js文件就行,然后拖到你的项目中.

## 特点

* **接口多**

	回调什么的都有，可以见源码的`propTypes`有介绍
	
* **其他的2个优点**
	
	1. 不会因为进入后台而停止读秒
	2. 支持同个页面再次进入时，智能的判断读秒时间，显示是否继续计时


## 使用

**1. 初始化该组件**

不同的页面LCCountDownButton的属性id要设置不同，因为‘智能的判断读秒时间’需要id来识别


```

// changeWithCount 是返回一个字符串表示button的title
// pressAction  按下按钮的事件，并不会触发倒计时

<LCCountDownButton frameStyle={{top:44 * 3 + 4,right:10,width:120,height:36,position:'absolute'}}
                   beginText='获取验证码'
                   endText='再次获取验证码'
                   count={10}
                   pressAction={()=>{this.countDownButton.startCountDown()}}
                   changeWithCount={(count)=> count + 's后重新获取'}
                   id='register'   
                   ref={(e)=>{this.countDownButton=e}}
                   />

```

**2.触发LCCountDownButton倒计时方法**

要主动调用`startCountDown`这个方法，按钮才会读秒，
上面的`pressAction={()=>{this.countDownButton.startCountDown()}`是直接调用了读秒，而没有做任何其他的操作。

下面这个栗子是做网络等耗时处理。
`pressAction={()=>{this. _countDownButtonPressed()}`


```
// 这个方法就是上面pressAction触发
    _countDownButtonPressed(){
    		// 1s 后触发倒计时  例如做网络请求后的再读秒
        this.timer = setTimeout(this._triggerCount.bind(this),1000);
    }

// 拿到按钮，开始倒计时
    _triggerCount(){
        let button = this.countDownButton;
        button.startCountDown();
    }

```

---

综上所述，下面是一个完整的例子：

```
<LCCountDownButton frameStyle={{top:44 * 3 + 4,right:10,width:120,height:36,position:'absolute'}}
                   beginText='获取验证码'
                   endText='再次获取验证码'
                   count={10}
                   pressAction={_countDownButtonPressed}
                   changeWithCount={(count)=> count + 's后重新获取'}
                   id='register'   
                   ref={(e)=>{this.countDownButton=e}}
                   />
                   

_countDownButtonPressed(){
//触发倒计时
	this.countDownButton.startCountDown();
	
//请求发送验证码
	fetch('请求验证码')
	.then()
	.catch()
}
    


```



## 样式的属性
|props|discription|
|---|---|
|frameStyle        |     整个按钮初始化的位置大小   |
|disableStyle      |    按钮禁用的时候样式         |
|activeStyle       |    active情况下按钮样式       |
|disableTextStyle  |   按钮禁用的时候里面文字的样式  |
|activeTextStyle   |  active情况下按钮里面文字的样式|


关于按钮大小的设置：

```
<LCCountDownButton
 frameStyle={{top:44 * 3 + 4,right:10,width:120,height:36,position:'absolute'}}
...
/>
```
设置frame的width和height。

如果你宽度想自适应，那么不用设置width。

## 效果图
![效果图](https://github.com/kkkelicheng/ReactNative-CountDownButton/blob/master/countDownButton.gif)
