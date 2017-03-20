
/*API示例
 * 
 * <body>
 * <div>
 * <a id="test1" title="up_uptest1*down_downtest1*right_righttest1*left_lefttest1" href="http://www.baidu.com"> 56543654 </a>
 * <a id="test" title="up_uptest*down_downtest*right_righttest*left_lefttest" href="http://www.baidu.com"> hfdjsahfkjdsa </a>
 * </div>
 * </body>
 * 
 * 
 * 注册事件
<script type="text/javascript" src="keyControl.js"></script>
<script>
  
	baronkey.up.uptest=function(){
		alert("up");
		baronkey.disable();
	}
	baronkey.down.downtest=function(){
	    alert("down");
	    baronkey.disable();
	}
    baronkey.right.righttest=function(){
    	alert("right");
    	baronkey.disable();
    }
    baronkey.left.lefttest=function(){
    	alert("left");
    	baronkey.disable();
    }
    
   	baronkey.up.uptest1=function(){
		alert("up1");
		baronkey.disable();
	}
	baronkey.down.downtest1=function(){
	    alert("down1");
	    baronkey.disable();
	}
    baronkey.right.righttest1=function(){
    	alert("right1");
    	baronkey.disable();
    }
    baronkey.left.lefttest1=function(){
    	alert("left1");
    	baronkey.disable();
    } 
</script>
* 
* 退出键默认跳转至首页
* 
* 可以设置默认跳转动作
* 方法
* baronkey.exit.init = function(){	
*   alert("fdsafds");
*	baronkey.disable(); 
*};
* baronkey.left.init = function(){	
*   alert("fdsafds");
*	baronkey.disable(); 
*};
* 
*/


//document.onkeypress = grabEvent;
document.onkeydown = grabEvent;
var KEY_UP=38;
var KEY_DOWN=40;
var KEY_LEFT=37;
var KEY_RIGHT=39;
var KEY_ENTER=13;
var KEY_PAGE_DOWN=34;
var KEY_PAGE_UP=33;
var KEY_EXIT=114;
var KEY_RETURN=640;

//兼容键值
var KEY_UP_1=28;
var KEY_DOWN_1=29;
var KEY_LEFT_1=30;
var KEY_RIGHT_1=31;
var KEY_PAGE_DOWN_1=121;
var KEY_PAGE_UP_1=120;
var KEY_RETURN_1=32;

//获取首页地址homePath
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPaht=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var homePath = localhostPaht+projectName;

			 
var baronkey={
	disable:function(){event.preventDefault();},//event.returnValue=false;
	up:{},
	down:{},
	left:{},
	right:{},
	pageup:{},
	pagedown:{},
	goback:{},
	enter:{},
	exit:{}
};

var callback_key_up_map=baronkey.up;
var callback_key_down_map=baronkey.down;
var callback_key_left_map=baronkey.left;
var callback_key_right_map=baronkey.right;
var callback_key_pageup_map=baronkey.pageup;
var callback_key_pagedown_map=baronkey.pagedown;
var callback_key_enter_map=baronkey.enter;
var callback_key_return_map=baronkey.goback;
var callback_key_exit_map=baronkey.exit;

//默认函数
baronkey.exit.init = function(){	
	baronkey.disable();
	window.location.href = homePath;  //默认退出至首页	
};

function grabEvent(e) {
	var activeElementAction = document.activeElement.getAttribute("baronkeyCallback");
	var key_action ={};
	if(activeElementAction!=null)key_action = activeElementAction.split("*");
	var key="";
	var action="";	
	var map = {};
	for(var cntIndex=0;cntIndex<key_action.length;cntIndex++){
		var pp = key_action[cntIndex].split("_");
		if(pp.length>1){
			key=pp[0];
			action=pp[1];
			map[key]=action;
		}		
	}	
	var keycode = e.which || e.keyCode;	
	switch (keycode) {
	    case KEY_UP: 
			if(map["up"]!=null){
        		callback_key_up_map[map["up"]]();   		 
        	}else{
        		baronkey.up.init();
        	}
            break;
	    case KEY_DOWN:
			if(map["down"]!=null){
        		callback_key_down_map[map["down"]]();  		 
        	}else{
        		baronkey.down.init();
        	}
            break;
	    case KEY_LEFT:       
			if(map["left"]!=null){
        		callback_key_left_map[map["left"]]();  		 
        	}else{
        		baronkey.left.init();
        	}
            break;
	    case KEY_RIGHT:   
			if(map["right"]!=null){
        		callback_key_right_map[map["right"]]();  
        	}else{
        		baronkey.right.init();
        	}
            break;
	    case KEY_PAGE_UP:        
			if(map["pagedown"]!=null){
        		 callback_key_pageup_map[map["pageup"]](); 
        	}else{
        		baronkey.pageup.init();
        	}
            break;
	    case KEY_PAGE_DOWN:        
			if(map["pagedown"]!=null){
        		 callback_key_pagedown_map[map["pagedown"]](); 
        	}else{
        		baronkey.pagedown.init();
        	}
            break;
		case 640: 
			if(map["goback"]!=null){
        		 callback_key_return_map[map["goback"]](); //兼容TVOS
        	}else{
        		baronkey.goback.init();
        	}
            break;
        
	    //兼容其他
	    case KEY_UP_1: 		
			if(map["up"]!=null){
        		callback_key_up_map[map["up"]]();   		 
        	}else{
        		baronkey.up.init();
        	}
            break;
	    case KEY_DOWN_1:		    
			if(map["down"]!=null){
        		callback_key_down_map[map["down"]]();  		 
        	}else{
        		baronkey.down.init();
        	}
            break;
	    case KEY_LEFT_1:       		    	
			if(map["left"]!=null){
        		callback_key_left_map[map["left"]]();  		 
        	}else{
        		baronkey.left.init();
        	}
            break;
	    case KEY_RIGHT_1:      		
			if(map["right"]!=null){
        		callback_key_right_map[map["right"]]();  
        	}else{
        		baronkey.right.init();
        	}
            break;
	    case KEY_PAGE_UP_1:                 
			if(map["pagedown"]!=null){
        		 callback_key_pageup_map[map["pageup"]](); 
        	}else{
        		baronkey.pageup.init();
        	}
            break;
	    case KEY_PAGE_DOWN_1: 			
			if(map["pagedown"]!=null){
        		 callback_key_pagedown_map[map["pagedown"]](); 
        	}else{
        		baronkey.pagedown.init();
        	}
            break;
		case KEY_RETURN_1:  
			if(map["goback"]!=null){
        		 callback_key_return_map[map["goback"]](); //兼容TVOS
        	}else{
        		baronkey.goback.init();
        	}
            break;
 		
	    case KEY_ENTER:      
            if(map["enter"]!=null){
        		 callback_key_enter_map[map["enter"]]();
        	}else{
        		baronkey.enter.init();
        	}
            break;
        case KEY_EXIT: 
        	if(map["exit"]!=null){
        		callback_key_exit_map[map["exit"]]();
        	}else{
        		baronkey.exit.init();
        	}
            break;
        default:
			break;
	}
}