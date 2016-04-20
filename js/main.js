$(function(){
	var oBox = document.getElementById('box');//最外层盒子
	var oScreenBox = document.getElementById('screenBox');//分屏父级
	var oScreen = oScreenBox.children;//分屏
	var oHeaderOne = document.getElementById('header-one');//导航头
	var aHeaderOneLi = oHeaderOne.getElementsByTagName('li');//导航头的li
	var oSubnav = document.getElementById('subnav');//导航头
	var aSubnavLi = oSubnav.children[0].children;//导航头的li
	var oToggle = document.getElementById('toggle');//换屏剪头
	var oWrite = document.getElementById('writeword');//打字效果
	var oIntr = getByClass(oScreenBox,'introduce');//首屏文字
	var readyMove = true;
	var stepMove = document.getElementById('stepmove');//分步运动ul
	var stepLi = stepMove.children;
	var pageStep = document.getElementById('pagestep');
	
	/*remind*/
	var oShadow=document.getElementById('shadow');
	var oContent=document.getElementById('remind_content');
	var oClose=document.getElementById('close');
	var oCount=document.getElementById('count');
	var oRemind=document.getElementById('remind');
	
	function close(){
		oShadow.style.display='none';
		oContent.innerHTML='';
		move(oContent,{width:0, height:0, marginLeft:0,marginTop:0, opacity:0});
		oRemind.style.display='none';
	}
	
	oClose.onclick=function(){
		clearInterval(closeTimer);
		close();

	}
	var n=5;
	var closeTimer=setInterval(function(){
		n--;
		oCount.innerHTML=n+'秒后关闭';
		if(n==0){
			clearInterval(closeTimer);
			close();

		}
	},1000)

	var now = 0; //当前屏数
	var readyWheel = true; //滚轮初始运动
	var aHW = 0; //导航头的宽度
	var aSH = 0; //侧导航的初始高度

	//给每屏的高度自适应屏幕的高度
	for(var i=0;i<oScreen.length;i++){
		oScreen[i].style.height = document.documentElement.clientHeight+'px';
	}
	// 创建侧边导航li&&计算高度
	for(var i=0;i<aHeaderOneLi.length;i++){
		aHW += aHeaderOneLi[i].offsetWidth;
		var oSubnavLi = document.createElement('li');
		oSubnavLi.innerHTML = '<a href="javascript:;"></a>';
		oSubnav.children[0].appendChild(oSubnavLi);
	}
	oHeaderOne.style.width = aHW + 'px';
	oHeaderOne.style.marginLeft = -aHW/2+'px';
	oSubnav.style.marginTop = -aSubnavLi[0].offsetHeight*aSubnavLi.length/2+'px';
	// 给header设置宽度 && 点击换屏
	aSubnavLi[0].className = 'cur';
	for(var i=0;i<aSubnavLi.length;i++){
		(function(index){
			aHeaderOneLi[i].onclick = function(){
				screenTab(index);
			}
			aSubnavLi[i].onclick = function(){
				screenTab(index);
			}
		})(i);
	}
	
	//滚屏事件
	addMouseWheel(oBox,function(dir){
		if(!readyMove) return;
		if(dir){//下
			now++;
			if(now >= oScreen.length-1){
				now = oScreen.length-1;
			}
			screenTab(now);
		}else{//上
			now--;
			if(now<=0){
				now = 0;
			}
			screenTab(now);
		}
	});
	//换屏箭头
	(function(){
		var i = 0;
		var j = 0;
		setInterval(function(){
			i++;
			oToggle.style.top = i%25+'px';
		},30)
		oToggle.onclick  = function(){
			j++;
			j%=oScreen.length;
			screenTab(j);
		}
	})();
	//boom
	(function(){
		var oPrev=document.getElementById("prev");
		var oNext=document.getElementById("next");
	
		var oBottom=document.getElementById("bottom");
		var aAnchor=oBottom.getElementsByTagName("a");
		var oDiv = document.getElementById("div1");
		var R = 4;
		var C = 7;
		var len = R*C;
		
		oPrev.onmouseover=function(){
			clearInterval(timer);
			this.className="cur";
		};
		oPrev.onmouseout=function(){
			timer=setInterval(next,2000)
			oPrev.className="";
		};
		oNext.onmouseover=function(){
			clearInterval(timer);
			this.className="cur2";
		};
		oNext.onmouseout=function(){
			timer=setInterval(next,2000)
			this.className="";
		};
	
		
		
		for(var r = 0; r < R; r++){
			for(var c = 0; c < C; c++){
				var oSpan = document.createElement("span");
				oDiv.appendChild(oSpan);
				oSpan.style.width = oDiv.offsetWidth/C + "px";
				oSpan.style.height = oDiv.offsetHeight/R + "px";
				
				oSpan.style.left = oSpan.offsetWidth*c + "px";
				oSpan.style.top  = oSpan.offsetHeight*r + "px";
				
				oSpan.style.backgroundPosition = -oSpan.offsetLeft+"px -"+oSpan.offsetTop + "px";
			}
		}
		
		/*
			oDiv  显示新图
			oSpan 显示老图
		
		*/
		
		var iNow = 0;
		var aSpan = oDiv.children;
		var timer=null;
		clearInterval(timer);
		timer=setInterval(next,2000)
		oDiv.onclick = oNext.onclick = function(){
			next();			
		};
		oPrev.onclick=function(){
			prev();
		}
		for(var i=0;i<aAnchor.length;i++){
			aAnchor[i].index=i;
			aAnchor[i].onclick=function(){
				clearTimeout(timer);
				iNow=this.index;
				tab();
			}
		
		}
		
		
		function rnd(n,m){
			return Math.floor(Math.random()*(m-n)+n);
		}
		function tab(){
			for(var j=0;j<aAnchor.length;j++){
				aAnchor[j].className="";
				oDiv.style.backgroundImage = "";
			
			}
			aAnchor[iNow].className="active";
			for(var i = 0; i < len; i++){
				aSpan[i].style.transition = "none";	
				aSpan[i].style.opacity = "1";
				aSpan[i].style.transform = "translate(0px,0px) rotateX(0deg) rotateY(0deg)";
				aSpan[i].style.backgroundImage = "url(../html/img2/"+iNow%3+".jpg)";
			}
		
			//div换新图
			oDiv.style.backgroundImage = "url(../html/img2/"+(iNow+1)%3+".jpg)";
			var timer=null;
			clearTimeout(timer)
			timer=setTimeout(function(){
				for(var i = 0; i < len; i++){
					//算位置：span中心-oDiv中心
					aSpan[i].style.transition = "1s all ease";
					var x = aSpan[i].offsetLeft + aSpan[i].offsetWidth/2 - oDiv.offsetWidth/2;
					var y = aSpan[i].offsetTop + aSpan[i].offsetHeight/2 - oDiv.offsetHeight/2;
					
					aSpan[i].style.transform = "translate("+x+"px,"+y+"px) rotateX("+rnd(-180,180)+"deg) rotateY("+rnd(-180,180)+"deg)";
					
					aSpan[i].style.opacity = "0";
					
				}
			},0);	
		}
		function next(){
			iNow++;
			if(iNow==aAnchor.length){
				iNow=0;
			}
			tab();
		}
		function prev(){
			iNow--;
			if(iNow==-1){
				iNow=aAnchor.length-1;
			}
			tab();
		}
	
		
	
	
	})()
	

	//3d旋转环
	function r3d(){
		//旋转
		var oRot3D = document.getElementById('rotate3D');
		var aLi3D = oRot3D.children;
		var len = aLi3D.length;
		
		//角度：360/len*i
		for(var i = 0; i < len; i++){
			
			aLi3D[i].style.transition = "1s all ease " + (len - i)*200 +"ms";
			aLi3D[i].style.transform = "rotateY("+360/len*i+"deg) translateZ(400px)";
			
		}
	
	aLi3D[0].addEventListener("transitionend",function(){
		 
		for(var i = 0; i < len; i++){
			aLi3D[i].style.transition = "1s all ease";
			var d = 360/len*i;
			
			if(d>180){
				d = 360 - d;
			}
			d = 180 - d;
			
			var scale = d/180;
			
			scale < 0.3 && (scale = 0.3);
			aLi3D[i].style.opacity = scale; 	
		}
	},false);
	
	
	var y = 0;
	var x = 150;
	var speedX = 0;
	var speedY = 0;
	var lastX = 0;
	var lastY = 0;
	var timer = null;
	var count = 0;
	oRot3D.onmousedown = function(ev){
		clearInterval(timer);
		var disX = ev.clientX - y;
		var disY = ev.clientY - x;
		
		document.onmousemove = function(ev){
			
			y = ev.clientX - disX;
			x = ev.clientY - disY;
			
			if(x > 600){
				x = 600;
			} else if(x < -600){
				x = -600;	
			}
			
			speedX = x - lastX;
			speedY = y - lastY;
			lastX = x;
			lastY = y;		
			
			
			oRot3D.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)";
		};
		
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			
			clearInterval(timer);
			timer = setInterval(function(){
				
				x += speedX;
				y += speedY;
				
				speedX *= 0.95;
				speedY *= 0.95;
				
				//关定时器 判断速度
				if(Math.abs(speedX) < 1){
					speedX = 0;
				}
				if(Math.abs(speedY) < 1){
					speedY = 0;
				}
				
				if(speedX == 0&& speedY == 0){
					clearInterval(timer);
				}
				oRot3D.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)"
				
			},30);
			
			
		};
		
		return false;	
	};
	
	}
	// 分布运动
	(function(){
		var aPos = [];
		var ready = true;
		var count = 0;
		var textArr = ['捕鱼达人游戏','canvas屏保','jQuery拼图游戏','css3时钟','h5c3图片选择动画','3D照片墙','仿chrome商店拖拽','瀑布流'];
		var imgArr = ['w1','w12','w3','w7','w5','w6','w11','w8'];
		var hrefArr = ['fishing.html','canvas_desk.html','game.html','clock.html','selector.html','3dPhotoesWall.html','drag.html','Waterfall.html'];
		for(var i=0;i<stepLi.length;i++){
			aPos.push({
				left:stepLi[i].offsetLeft,
				top:stepLi[i].offsetTop,
				width:stepLi[i].offsetWidth,
				height:stepLi[i].offsetHeight,
				opacity:1
			})
			stepLi[i].style.left = aPos[i].left + 'px';
			stepLi[i].style.top = aPos[i].top + 'px';
		}
		for(var i=0;i<stepLi.length;i++){
			stepLi[i].style.position = 'absolute';
			stepLi[i].style.margin = 0;
			stepLi[i].innerHTML = '<img src="img/'+imgArr[i]+'.jpg" alt=""><a href="'+hrefArr[i]+'" target="_blank">'+textArr[i]+'</a>';
			
		}
		// 翻页，位置随机todo
		var pageA = pageStep.children[0];
		pageA.onclick = function(){
			if(!ready) return;
			ready=false;
			down();
		}
		function down(){
			var i=stepLi.length-1;

			var timer = setInterval(function(){
				(function(index){
					move(stepLi[i],{left:stepMove.offsetWidth/2,top:stepMove.offsetHeight,opacity:0,width:0,height:0},{complete:function(){
						if(index == 0){
							for(var i=0;i<stepLi.length;i++){
								stepLi[i].innerHTML='<img src="img/'+imgArr[i]+'.jpg" alt=""><a href="'+hrefArr[i]+'" target="_blank">'+textArr[i]+'</a>';	
							}
							up();
						}
					}});
				})(i);
				i--;
				if(i<0){
					clearInterval(timer);
				}
			}, 100)
		}
		
		function up(){
			var i = stepLi.length-1;
			var timer = setInterval(function(){
				
				(function(index){
					move(stepLi[i],aPos[i],{complete:function(){
						if(index == 0){
							ready = true;
						}
					}});
				})(i)
				i--;
				if(i<0){
					clearInterval(timer);
				}
			},100);
		}
		//判断方向
		for(var i=0;i<stepLi.length;i++){
			lagou(stepLi[i]);
		}
		
		function direction(obj,oEv){

			var x = oEv.clientX - getPos(obj).left - obj.offsetWidth/2;
			var y = obj.offsetHeight/2 + getPos(obj).top - oEv.clientY;
			// 弧度
			var a = Math.atan2(y,x);
			//换成角度，然后除以90度，得到4个方向，0 左  1下 2 右 3 上
			return Math.round((a*180/Math.PI + 180)/90)%4;
		}
		//拉钩鼠标跟随进入进出效果
		function lagou(obj){
			obj.onmouseover = function(ev){
				var oEv = ev || event;
				var oSrc = oEv.fromElement || oEv.relatedTarget;
				if(obj.contains(oSrc)){
					return;
				} 
				var oChild = this.children[1];
				var nd = direction(obj,oEv);
				// w:250px,h:180px
				switch(nd){
					case 0:// 0 左 
						oChild.style.left = "-250px";
						oChild.style.top = "0";
					break;
					case 1://  1下
						oChild.style.left = "0";
						oChild.style.top = "180px";
					break;
					case 2://  2 右 
						oChild.style.left = "250px";
						oChild.style.top = "0";
					break;
					case 3:// 3 上
						oChild.style.left = "0";
						oChild.style.top = "-180px";
					break;
				}
				move(oChild,{left:0,top:0});
			}
			obj.onmouseout = function(ev){
				var oEv = ev || event;
				var oSrc = oEv.toElement || oEv.relatedTarget;
				if(obj.contains(oSrc)) return;
				var oChild = this.children[1];
				var nd = direction(obj,oEv);
				// w:250px,h:180px
				switch(nd){
					case 0:// 0 左 
						move(oChild,{left:250,top:0});
					break;
					case 1://  1下
						move(oChild,{left:0,top:180});
					break;
					case 2://  2 右 
						move(oChild,{left:250,top:0});
					break;
					case 3:// 3 上
						move(oChild,{left:0,top:-180});
					break;
				}
				// move(oChild,{left:0,top:0});
			}
		}
		
	})();
	//项目经验
	(function(){
		var oPre = document.getElementById('progress');
		var aDiv = oPre.children;
		var n = 30;
		var timer = setInterval(function(){
			if(n>50){
				n-=10;
			}else{
				n+=10;
			}
			for(var i=0;i<aDiv.length;i++){
				aDiv[i].style.transition = '1s all ease';

			}
		},300)
		
	})()
	//封装切屏函数
	var oLogo = document.getElementById('sweet');
	function screenTab(index){
		//if(!readyMove) return; 
		readyMove = false;
		for(var i=0;i<aSubnavLi.length;i++){
			aHeaderOneLi[i].className = 'fl';
			aSubnavLi[i].className = '';
			var oIntrChild = oIntr[i].children;

			if(oIntrChild.length == 2){
				oIntrChild[0].style.animation = 'bg1 2s linear';
				oIntrChild[1].style.animation = 'bg 2s linear';
			}else if(oIntrChild[0].className == 'rotate3D'){
				r3d();
			}
				
			
		}
		oIntrChild = oIntr[index].children;
		for(var j=0;j<oIntrChild.length;j++){
			oIntrChild[j].style.animation = '';
		}
		aHeaderOneLi[index].className = 'active fl';
		aSubnavLi[index].className = 'cur';
		move(oScreenBox,{'top':-oScreen[0].offsetHeight*index},{complete:function(){
			readyMove = true;
		}});
	}

})


