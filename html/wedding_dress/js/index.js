// JavaScript Document
/* search*/
window.onload=function(){
	var oDiv1=document.getElementById('content');
	var aImg=oDiv1.getElementsByTagName('img');
	var oDiv2=document.getElementById('lunfan');
	var aSpan=oDiv2.getElementsByTagName('span');
	var now=0;
	var timer1=null;	
	var timer2=null;
	for(var i=0;i<aSpan.length;i++){
		aSpan[i].index=i;
		aSpan[i].onmouseover=function(){
			clearInterval(timer1);
			now=this.index;
			tag();
		};
		aSpan[i].onmouseout=function(){
			timer1=setInterval(function(){
				next();
			},1000)
		};			
	}
	function tag(){
		for(var i=0;i<aSpan.length;i++){
			aSpan[i].className='lunfan1';
			aImg[i].className='';
		}
		aSpan[now].className='cur';
		aImg[now].className='active';		
	};
	
	var next=function(){
		now++;
		if(now>=aImg.length){
			now=0;
		}
		tag();
	};
	timer1=setInterval(function(){
		next();
	},1000);
	
	var oDiv3=document.getElementById('picture-1');
	var aImg2=oDiv3.getElementsByTagName('img');
	var oText=document.getElementById('picture-1-text');
	var arr=[
		'婚纱展示',
		'场馆包间',
		'场馆男装展示',
	];
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var now2=0;
	oPrev.onclick=function(){
		now2--;
		if(now2<0){
			now2=aImg2.length-1;
		}
		tag2();
	};
	oNext.onclick=function(){
		now2++;
		if(now2>=aImg2.length){
			now2=0
		}
		tag2();
	};	

	function tag2(){
		for(var i=0;i<aImg2.length;i++){
			aImg2[i].className='';
		}
		aImg2[now2].className='active';
		oText.innerHTML=arr[now2];		
	};	
	
	var next2=function(){
		now2++;
		if(now2>=aImg2.length){
			now2=0;
		}
		tag2()
	};
	timer2=setInterval(function(){
		next2();
	},2000);
/**/	
	var oDiv4=document.getElementById('picture-2');
	var aImg3=oDiv4.getElementsByTagName('img');
	var oPrev2=document.getElementById('prev2');
	var oNext2=document.getElementById('next2');
	var oText2=document.getElementById('picture-2-text');
	var now3=0;
	oPrev2.onclick=function(){
		now3--;
		if(now3<0){
			now3=aImg3.length-1;
		}
		tag2();
	};
	oNext2.onclick=function(){
		now3++;
		if(now3>=aImg3.length){
			now3=0
		}
		tag3();
	};	

	function tag3(){
		for(var i=0;i<aImg3.length;i++){
			aImg3[i].className='';
		}
		aImg3[now3].className='active';
		oText2.innerHTML=arr[now3];		
	};	
	
	var next3=function(){
		now3++;
		if(now3>=aImg3.length){
			now3=0;
		}
		tag3()
	};
	timer3=setInterval(function(){
		next3();
	},2000);	
}




























