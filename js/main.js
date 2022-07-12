var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

//定义：常量值
const AllWidth=800;
const AllHeight=600;
const HeWidth=164;
const HeHeight=64;
const H1=200;
const H2=290;
const H3=380;
const H4=450;
const WaWidth=59;
const WaHeight=42;
const BgSrc="./imgs/bg.png";
const HeSrc="./imgs/1.png";
const WaSrc="./imgs/0.png";

//定义：控制变量
var speed=1;
var state=0;
var index=-1;
var lastIndex=-1;
var data=[
	['tellme','whoing','hellp'],
	['monday','firday','tuesday'],
	['interesting','tellphone','namesoking']
];
var finalldata='canyoufinall';
var time=0;


//---------------------------------------------------------------------------------------------------------
//类：背景
class Bg{
	constructor(){
		this.img=new Image();
		this.img.src=BgSrc;
	}
	paint(){
		ctx.drawImage(this.img,0,0);
	}
}


//类：对岸
class Side{
	constructor(x,y,width,height){
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.data='';
		this.wordnow='';
	}
	paint(){
		ctx.fillStyle='rgb(255,255,255)';
		ctx.strokeStyle='rgb(200,100,200)';
		ctx.lineWidth=2;
		ctx.font='16px Arial bold';
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.strokeRect(this.x,this.y,this.width,this.height);
		ctx.fillStyle='rgb(0,0,0)';
		ctx.fillText(this.data,this.x+this.width*0.03,this.y+this.height*0.85);
		ctx.fillStyle='rgb(200,10,10)';
		ctx.fillText(this.wordnow,this.x+this.width*0.03,this.y+this.height*0.85);
	}
}


//类：荷叶
class He{
	constructor(img,x,y,width,height){
		this.img=img;
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.img.src=HeSrc;
		this.data='';
		this.wordnow='';
	}
	paint(){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
		ctx.fillStyle='rgb(255,255,255)';
		ctx.strokeStyle='#333';
		ctx.lineWidth=2;
		ctx.font='16px Arial bold';
		ctx.fillRect(this.x+this.width*0.16,this.y+this.height*0.45,this.width*0.7,this.height*0.4);
		ctx.strokeRect(this.x+this.width*0.16,this.y+this.height*0.45,this.width*0.7,this.height*0.4);
		ctx.fillStyle='rgb(0,0,0)';
		ctx.fillText(this.data,this.x+this.width*0.18,this.y+this.height*0.8);
		ctx.fillStyle='rgb(200,10,10)';
		ctx.fillText(this.wordnow,this.x+this.width*0.18,this.y+this.height*0.8);
	}
}


//类：青蛙
class Wa{
	constructor(img,x,y,width,height){
		this.img=img;
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.img.src=WaSrc;
	}
	paint(){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
	}
}


//--------------------------------------------------------------------------------------------------------
//对象：背景图
var bgstatic=new Bg();


//对象：对岸
var sidestatic=new Side(AllWidth/2,H1/2,HeWidth*0.7,HeHeight*0.4);
sidestatic.data=finalldata;


//对象：荷叶
var he=[[],[],[]];
he[0][0]=new He(new Image(),0,H1,HeWidth,HeHeight);
he[0][1]=new He(new Image(),(AllWidth-HeWidth)/2,H1,HeWidth,HeHeight);	
he[0][2]=new He(new Image(),AllWidth-HeWidth,H1,HeWidth,HeHeight);
he[1][0]=new He(new Image(),-HeWidth,H2,HeWidth,HeHeight);
he[1][1]=new He(new Image(),(AllWidth-HeWidth*2)/3,H2,HeWidth,HeHeight);	
he[1][2]=new He(new Image(),(AllWidth+HeWidth)/3*2-HeWidth,H2,HeWidth,HeHeight);
he[2][0]=new He(new Image(),0,H3,HeWidth,HeHeight);
he[2][1]=new He(new Image(),(AllWidth-HeWidth)/2,H3,HeWidth,HeHeight);	
he[2][2]=new He(new Image(),AllWidth-HeWidth,H3,HeWidth,HeHeight);
he.forEach((v,i)=>{v.forEach((z,j)=>{z.data=data[i][j]})});


//对象：青蛙
var wa=new Wa(new Image(),AllWidth/2,H4,WaWidth,WaHeight);


//----------------------------------------------------------------------------------------------------------
//执行：荷叶运动
function actionHe(){
	he[0].forEach((v)=>{
		v.x<-HeWidth?v.wordnow='':v=v;
		state!=3?sidestatic.wordnow='':v=v;
		v.x<-HeWidth?v.x=AllWidth:v.x-=speed;
	});
	he[1].forEach((v)=>{
		v.x>AllWidth?v.wordnow='':v=v;
		v.x>AllWidth?v.x=-HeWidth:v.x+=speed;
	});
	he[2].forEach((v)=>{
		v.x<-HeWidth?v.wordnow='':v=v;
		v.x<-HeWidth?v.x=AllWidth:v.x-=speed;
	});
}


//执行：青蛙运动
function actionWa(){
	switch (state){
		case 0:
			wa.x=AllWidth/2;
			wa.y=H4;
			break;
		case 1:
			wa.x=he[2][lastIndex].x;
			wa.y=he[2][lastIndex].y;
			break;
		case 2:
			wa.x=he[1][lastIndex].x;
			wa.y=he[1][lastIndex].y;
			break;
		case 3:
			wa.x=he[0][lastIndex].x;
			wa.y=he[0][lastIndex].y;
			break;
		case 4:
			wa.x=AllWidth/4;
			wa.y=H1/2;
			over();
			break;
	}
	wa.x<0-HeWidth||wa.x>AllWidth?state--:state=state;
}


//执行：计时功能
function checkTime(){
	switch (state){
		case 0:
			time0();
			break;
		case 4:
			time=time;
			break;
		default:
			time1();
	}
}


//执行：全体重绘
function paintAll(){
	ctx.clearRect(0,0,AllWidth,AllHeight);
	bgstatic.paint();
	sidestatic.paint();
	he.forEach((v)=>{
		v.forEach((z)=>{
			z.paint();
		});
	});
	wa.paint();
}


//最高检查官
window.onkeydown=function(e){
	if(index==-1&&state<3){
		data[data.length-1-state].forEach((v,i)=>{
			var n=he[data.length-1-state][i].wordnow;
			if(e.key==v[n.length]){
				n+=e.key;
				index=i;
			}
			he[data.length-1-state][i].wordnow=n;
		});
	}else if(index!=-1&&state<3){
		var n=he[data.length-1-state][index].wordnow;
		if(e.key==data[data.length-1-state][index][n.length]){
			he[data.length-1-state][index].wordnow+=e.key;
			if(he[data.length-1-state][index].wordnow==data[data.length-1-state][index]){
				he[data.length-1-state][index].wordnow='';
				lastIndex=index;
				index=-1;
				state++;
			}	
		}else{
			he[data.length-1-state][index].wordnow='';
			index=-1;
		}
	}else if(state==3){
		e.key==sidestatic.data[sidestatic.wordnow.length]?
		sidestatic.wordnow+=e.key:sidestatic.wordnow='';
		if(sidestatic.wordnow==sidestatic.data){
			sidestatic.wordnow='';
			state=4;
		}
	}
}


//最高执行官
setInterval(function(){
	actionHe();
	actionWa();
	paintAll();
	checkTime();
},10);
