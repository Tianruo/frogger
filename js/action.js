document.querySelector('.close').onclick=function(){
	document.querySelectorAll('.content').forEach((v)=>{
		v.style.top="400px";
		v.style.opacity="0";
	});
	this.style.display="none";
}

document.querySelector('.setting').onclick=function(){
	document.querySelector('.setting_content').style.top="150px";
	document.querySelector('.setting_content').style.opacity="1";
	document.querySelector('.close').style.display="block";
}

document.querySelector('.setting_content>div:first-child').onclick=function(){
	alert('被发现了吗~其实这个功能还没做啦^_^');
}

document.querySelector('.setting_content>div:last-child').onclick=function(){
	document.querySelector('.diff_content').style.top="150px";
	document.querySelector('.diff_content').style.opacity="1";
}

document.querySelector('.diff1').onclick=function(){
	var diff=document.querySelector('.diff2').textContent;
	diff>1&&diff--;
	diff>1?speed-=0.2:speed=speed;
	document.querySelector('.diff2').textContent=diff;
	document.querySelector('.info2>span').textContent=diff;
}

document.querySelector('.diff3').onclick=function(){
	var diff=document.querySelector('.diff2').textContent;
	diff<9&&diff++;
	diff<9?speed+=0.2:speed=speed;
	document.querySelector('.diff2').textContent=diff;
	document.querySelector('.info2>span').textContent=diff;
}

function time0(){
	time=0;
	document.querySelector('.info1').textContent='计时：00:00';
}

function time1(){
	time+=10;
	var miao=Math.floor(time/1000);
	miao=miao==0?'00':miao;
	var haom=Math.floor(time%1000/10);
	document.querySelector('.info1').textContent='计时：'+miao+':'+haom;
}

function over(){
	document.querySelector('.over_content').style.top="150px";
	document.querySelector('.over_content').style.opacity="1";
	var time1=document.querySelector('.info1').textContent.slice(3);
	document.querySelector('.over1').textContent=time1;
	var con='';
	var diff=document.querySelector('.diff2').textContent;
	if(diff<3){
		con='你挑战的难度的很低呢~真的只有这样的水平吗~';
	}else if(time>=12000){
		con='看来你对这些单词掌握的不是很好呢~';
	}else if(time>=7000&&time<12000){
		con='不错的手速~继续加油！';
	}else if(time<7000){
		con='无人能敌~炉火纯青！快去炫耀吧~';
	}
	document.querySelector('.over2').textContent=con;
}

document.querySelector('.over3').onclick=function(){
	document.querySelector('.close').click();
	state=0;
}