// JavaScript Document


window.onload=function(){
	var oDiv1=document.getElementById("div1");
	var oDiv2=document.getElementById("div2");
	
	var   aA=oDiv2.getElementsByTagName("a");
	var  aUl=oDiv1.getElementsByTagName("ul");
	
	for(var i=0; i<aA.length;i++){
		aA[i].index=i;
		aA[i].onmouseover=function(){
			for(var i=0; i<aA.length; i++){
				aA[i].className="";
				aUl[i].className="";
			
			}
			this.className="active";
			aUl[this.index].className="cur";
	}

	}
}