function findClass(parent,classname){//封装一个函数，功能是找到父标签下的所有的 某个名字的子标签	
    var alltag = parent.getElementsByTagName('*');
	var boxArr = new Array();//用来存储获取到的所有名称为classname的元素
	for(var i=0;i<alltag.length;i++){
		if(alltag[i].className==classname){
			boxArr.push(alltag[i]);
		}
	}
	return boxArr;
}
function waterfall(parent,classname){
	//将main下的所有class为box的元素取出来
	var parent1=document.getElementById(parent);//这里传进来的参数是’main‘所以不需要再加上“”
	var allBox = findClass(parent1,classname);
	console.log(allBox.length);
	//计算整个页面显示的列数
	var Bwidth = allBox[0].offsetWidth;
	var cols = Math.floor(document.body.clientWidth/Bwidth);
	// console.log(cols);
	// var cols = document.documentElement.clientWidth;
	// var cols1 = document.body.clientWidth;这两种都可以获得屏幕宽度，上面是标准模式，下面是混杂模式
	//为了在窗口变小时，图片列数不变，所以要固定main的宽度。获取main的宽度为屏幕大小
	var mainW = document.body.clientWidth ||document.documentElement.clientWidth;
	parent1.style.cssText='width:'+mainW+'px;margin:0 auto';
	//这里开始对每一个box定位，for循环，如果在第一行只需要存入高度即可。如果不是第一行，就要判断
	//它上面的几行最短的那一列，并取得最短那一列的位置
	var height =[];
	for(var i=0;i<allBox.length;i++){
		if(i<cols){
		var Bheight = allBox[i].offsetHeight;//获取第一行每列的高度 
		height.push(Bheight);
		}else{
			var hmin = Math.min.apply(null,height);
			for(var k in height){//这里是k哦
				if(height[k]==hmin){
					allBox[i].style.position="absolute";
					allBox[i].style.top=hmin+'px';
					allBox[i].style.left=Bwidth*k+'px';//这里是k哦
					height[k]+=allBox[i].offsetHeight;
					break;
				}

			}
		}
	}
	
}
function scrollAdd(){
	var parent1=document.getElementById('main');
	var allBox = findClass(parent1,'box');
	// console.log(allBox.length);
	var lastboxtop = allBox[allBox.length-1].offsetTop+Math.floor(allBox[allBox.length-1].offsetHeight/2);
	var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
	console.log(scrolltop);
	var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
	console.log(screenHeight);
	if(lastboxtop < scrollTop+screenHeight){
		return true;
	}else{
		return false;
	}
}
function XXX(cols,allBox){//第二步找每行最矮的那个图片，所以要有一个数组来存高度，并且定位下一行每块的位置
	var height =[];
	for(var i=0;i<allBox.length;i++){
		if(i<cols){
		var Bheight = allBox[i].offsetHeight;//获取第一行每列的高度 
		// console.log(Bheight);
		height.push(Bheight);
		}else{
			var hmin = Math.min.apply(null,height);
		}
	}
	return height;
}

window.onload=function(){//页面加载时就执行
	//var main ='main';
	waterfall('main','box');
	var data1 = {"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},
				{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},
				{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'},
				{"src":'18.jpg'},{"src":'21.jpg'},{"src":'20.jpg'},{"src":'22.jpg'},{"src":'23.jpg'}]};
	window.onscroll = function(){//必须用onscroll触发这个事件，window下的对象触发
		if(scrollAdd){
			var divname = document.getElementById('main');
			//将数据块添加的页面的尾部
			for(var i=0;i<data1.data.length;i++){
				var newbox = document.createElement('div');
				newbox.className = 'box';
				divname.appendChild(newbox);
				var newpic = document.createElement('div');
				newpic.className='pic';
				newbox.appendChild(newpic);
				var newImg = document.createElement('img');
				newImg.src="images/"+data1.data[i].src;
				newpic.appendChild(newImg);
			}
			waterfall('main','box');
		}
	}
	
	

}