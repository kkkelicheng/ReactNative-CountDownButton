# ReactNative-CountDownButton
封装的一个倒计时按钮,仅仅使用`TouchableOpacity`和`Text`两个东西

为啥自己写一个? 感觉别人写的不好而已，而且功能不全.

有好的建议请给issue，有问题也可以提出。

有个RN的交流群397885169，我是click，加群也可以找到我

## 特点
* **容易自己改代码**

	仅仅使用`TouchableOpacity`和`Text`两个东西，样式你得自己写

* **接口多**

	回调什么的都有，可以见源码的`propTypes`有介绍
	
* **其他的2个优点**
	
	1. 不会因为进入后台而停止读秒
	2. 支持同个页面再次进入时，智能的判断读秒时间，显示是否继续计时
	
	
	
## 怎么使用
直接下载该js文件就行了，不需要npm xxx这东西

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
        let button = this.refs.LCCountDownButton;
        button.startCountDown();
    }

```


## 交给你做的事 
TouchableOpacity 和 Text 不同状态下的样式，在源文件里面已经写了（源文件styles摘要如下）。
当然你也可以自己改源文件，将这些样式作为属性传入。



```
    //禁用时候的Text样式
    disableTxtStyle:{
        color:'gray',
    },
    //可以点击时候的Text样式
    activeTxtStyle:{
        color:'black',
    }
    
    //禁用时候的TouchableOpacity样式
    disableButtonStyle:{
        backgroundColor:'red',
    },
    //可以点击时候的TouchableOpacity样式
    activeButtonStyle:{
        backgroundColor:'green',
    },
```

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