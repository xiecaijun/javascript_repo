
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
*/


document.onkeypress = grabEvent;
var KEY_UP=38;
var KEY_DOWN=40;
var KEY_LEFT=37;
var KEY_RIGHT=39;
var KEY_ENTER=13;
var KEY_PAGE_DOWN=34;
var KEY_PAGE_UP=33;
var KEY_EXIT=114;
var KEY_RETURN=640;

var KEY_UP_1=28;
var KEY_DOWN_1=29;
var KEY_LEFT_1=30;
var KEY_RIGHT_1=31;
var KEY_PAGE_DOWN_1=121;
var KEY_PAGE_UP_1=120;
var KEY_RETURN_1=32;
  
var baronkey={
	disable:function(){event.returnValue=false;},
	up:{},
	down:{},
	left:{},
	right:{},
	pageup:{},
	pagedown:{}
};

var callback_key_up_map=baronkey.up;
var callback_key_down_map=baronkey.down;
var callback_key_left_map=baronkey.left;
var callback_key_right_map=baronkey.right;
var callback_key_pageup_map=baronkey.pageup;
var callback_key_pagedown_map=baronkey.pagedown;

function grabEvent(e) {
	//获取当前网址，如： http://localhost:8080/Tmall/index.jsp
	var curWwwPath=window.document.location.href;
	//获取主机地址之后的目录如：/Tmall/index.jsp
	var pathName=window.document.location.pathname;
	var pos=curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8080
	var localhostPaht=curWwwPath.substring(0,pos);
	//获取带"/"的项目名，如：/Tmall
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var homePath = localhostPaht+projectName;
	var activeElementAction = document.activeElement.title;
	var key_action = activeElementAction.split("*");
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
		    callback_key_up_map[map["up"]]();   			
	        break;
	    case KEY_DOWN:
		    callback_key_down_map[map["down"]](); 			
	        break;
	    case KEY_LEFT:       
		    callback_key_left_map[map["left"]]();  			
	        break;
	    case KEY_RIGHT:   
		    callback_key_right_map[map["right"]]();  			
	        break;
	    case KEY_PAGE_UP:        
            callback_key_pageup_map[map["pageup"]](); 
	        break;
	    case KEY_PAGE_DOWN:        
            callback_key_pagedown_map[map["pagedown"]](); 
	        break;
		case KEY_RETURN:   	 
			break;
			
	    case KEY_UP_1:
		    callback_key_up_map[map["up"]]();  		
	        break;
	    case KEY_DOWN_1:
		    callback_key_down_map[map["down"]]();  
	        break;
	    case KEY_LEFT_1:       
		    callback_key_left_map[map["left"]]();  			
	        break;
	    case KEY_RIGHT_1:      
		    callback_key_right_map[map["right"]]();  			
	        break;
	    case KEY_PAGE_UP_1:                 
 			callback_key_pageup_map[map["pageup"]](); 
	        break;
	    case KEY_PAGE_DOWN_1: 
 			callback_key_pagedown_map[map["pagedown"]](); 
	        break;
		case KEY_RETURN_1:   	 
			break;					        
        case KEY_EXIT: 
        	 window.location.href=homePath;
			break;
        default:
			break;
	}
}