/**
 *Version 2.0 
 *
 * 列表遍历 对象
 * 
 * 注意：注册事件触发函数baronIterateList!!!
 * 注意：在同一个页面中只能存在一个需要遍历的列表!!!
 * 
 * (一)本js依赖keyControl.js以及jquery.mini.js,必须按以下顺序导入js文件
 * <script language="javascript" src="js/jquery.min.js"></script>
 * <script language="javascript" src="js/baron.keyControl-2.0.js"></script>	
 * <script language="javascript" src="js/baron.listIterator-2.0.js"></script>	
 * 
 * (二)html中注册事件baronIterateList，该事件是内置的，version 2.0版本中系统自动生成，名字不能更改，不可人工覆盖
 * 
 * (三)<a>标签中id编号必须从0开始编号，eg：id=0,version 2.0版本自动添加baronlist_Id属性代替原有1.0版本ID功能
 * //ul_id 为 list 的id 
 * <ul id="zy_list">
 *	 <s:iterator value="MovieListReverseOrder" status="rowstatus" id="item">
 *	 <li>
 *	    		<a id="<s:property value='#rowstatus.getIndex()'/>" title="left_baronIterateList*right_baronIterateList" href="vedioplay.jsp?id=<s:property value='id'/>&orderResult=0&playUrl=<s:property value='ftpServer'/>&assetID=<s:property value='assetID'/>&spCode=<s:property value='spCode'/>&targetSystemID=<s:property value='targetSystemID'/>&devicetype=<s:property value='devicetype'/>&nns_play_index=<s:property value='episodes'/>"> <span>第<s:property value='episodes'/>期：<s:property value='name'/>  </span><p><s:property value='creationDate'/></p><font>  更新</font></a>
 *	 </li>
 *	 </s:iterator>
 * </ul>
 * 
 * (四}导向箭头标签id示例
 * <a id='page_up' style="display:none"></a><a id='page_down' style="display:none"></a>
 * 
 * (五)调用主方法
 * 
 * 1、左右遍历，带箭头
 * var arrow = {
 * 	 display:true,            //是否出现导向箭头
 *   letfId:"page_up",        //左导向箭头id或者上导向箭头id
 * 	 rightId:"page_down"      //右导向箭头id或者下导向箭头id
 * }
 * ListIterator_OBJ.getInstance().init("zy_list",5,"lr",arrow);  //初始化
 * 
 * 2、左右遍历，不带箭头
 * ListIterator_OBJ.getInstance().init("zy_list",5,"lr");  //初始化
 * 
 * 3、上下遍历，带箭头
 * var arrow = {
 * 	 display:true,            //是否出现导向箭头
 *   letfId:"page_up",        //左导向箭头id或者上导向箭头id
 * 	 rightId:"page_down"      //右导向箭头id或者下导向箭头id
 * }
 * ListIterator_OBJ.getInstance().init("zy_list",5,"ud",arrow);  //初始化
 * 
 * 4、上下遍历，不带箭头
 * ListIterator_OBJ.getInstance().init("zy_list",9,"ud");
 * 或者ListIterator_OBJ.getInstance().init("zy_list",9);  //第三个参数默认为"ud"
 * 
 * 
 */


function ListIterator_OBJ()
{
	//需初始化变量
	this.inst=this;
	this.ul_id="";      //ul列表id
    this.width =0;      //窗口宽度
    this.derection ="ud"; //遍历方向 默认为上下；上下：ud,左右:lr
    this.arrow={
    	display:false,  //是否出现导向箭头
    	letfId:"",      //左导向箭头id或者上导向箭头id
    	rightId:""      //右导向箭头id或者下导向箭头id
    };
    
    //默认变量
    this.offset = 0;    //当前偏移值
  
}
ListIterator_OBJ.inst = new ListIterator_OBJ();

ListIterator_OBJ.getInstance=function(){
	return ListIterator_OBJ.inst;
}; 

ListIterator_OBJ.prototype.leftOrUp = function(){
	    var _inst = ListIterator_OBJ.inst;
        var vedioListLen = $("#"+_inst.ul_id).children().size();
		var first =  Number(_inst.offset) ;
		var last = Number(_inst.offset)+Number(_inst.width-1);
		var activeId = document.activeElement.id;
		var baronlist_Id=$("#"+activeId).attr("baronlist_Id");		
	  	if(baronlist_Id==first&&baronlist_Id!=0){     
		     _inst.offset = Number(_inst.offset)-Number(1);
		     _inst.iterate();
		     $("#"+_inst.ul_id+" [baronlist_Id='"+(Number(baronlist_Id)-Number(1))+"']").focus();
	    }    	 
} ;

ListIterator_OBJ.prototype.rightOrDown = function(){
	        var _inst = ListIterator_OBJ.inst;
	    	var vedioListLen = $("#"+_inst.ul_id).children().size();
			var first =  Number(_inst.offset) ;
		    var last = Number(_inst.offset)+Number(_inst.width-1);
		    var activeId = document.activeElement.id;
		    var baronlist_Id=$("#"+activeId).attr("baronlist_Id");		
		  	if(baronlist_Id==last){     
			     _inst.offset = Number(_inst.offset)+ Number(1);
			     _inst.iterate();
			     $("#"+_inst.ul_id+" [baronlist_Id='"+(Number(baronlist_Id)+Number(1))+"']").focus();
		   	 }  
};

/*初始化*/
ListIterator_OBJ.prototype.init = function(ul_id,width,derection,arrow)
{   
    ListIterator_OBJ.inst.ul_id = ul_id;
    ListIterator_OBJ.inst.width = width;
    ListIterator_OBJ.inst.arrow = arrow;    
    ListIterator_OBJ.inst.derection = derection;
	
    //初始化序列号
    $("#"+ul_id +" a").attr("baronlist_Id",function(i,oldid){
		return i;
    })
 
    //显示导向箭头
    var vedioListLen = $("#"+ul_id).children().size();
    if(vedioListLen>width&&typeof(arrow)!=undefined){
    	if(arrow.display) document.getElementById(arrow.rightId).style.display = "block";   	
    };
    /**
     * 注册键事件
     * @memberOf {TypeName} 
     */
    if(ListIterator_OBJ.inst.derection=="lr"){
    	//注册键控事件 
	    $("#"+ul_id +" a").attr("baronkeyCallback","left_baronIterateList*right_baronIterateList");
	    baronkey.left.baronIterateList=ListIterator_OBJ.inst.leftOrUp; 
	    baronkey.right.baronIterateList= ListIterator_OBJ.inst.rightOrDown;	
    }else {
        $("#"+ul_id +" a").attr("baronkeyCallback","up_baronIterateList*down_baronIterateList");
	    baronkey.up.baronIterateList=ListIterator_OBJ.inst.leftOrUp; 
		baronkey.down.baronIterateList=ListIterator_OBJ.inst.rightOrDown;
	}  
    
     //隐藏显示区域以外列表数据
     var _inst = ListIterator_OBJ.inst;
     _inst.offset = 0;
	 _inst.iterate();
};


/**
 * 遍历列表
 * @param {Object} ul_id  ul列表id
 * @param {Object} offset 当前偏移值
 * @param {Object} witch  窗口宽度
 */
ListIterator_OBJ.prototype.iterate = function(){
    var _inst = ListIterator_OBJ.inst;
	var first = _inst.offset;
	var last = Number(_inst.offset)+Number(_inst.width-1);
    var vedioListLen = $("#"+_inst.ul_id).children().size();
    var leftflag=false;
    var rightflag=false;
	for(var no=0;no<vedioListLen;no++){
	    if(no<first){
	        leftflag =true;	     	
	    }
	    if(no>last){
	    	rightflag=true;
	    }
		if(no<first||no>last) $("#"+_inst.ul_id).children().eq(no).css({"display":"none"});	
	    else $("#"+_inst.ul_id).children().eq(no).css({"display":"block"}); 
	}	
	if(_inst.arrow.display){
		if(leftflag)document.getElementById(_inst.arrow.letfId).style.display = "block";
		else document.getElementById(_inst.arrow.letfId).style.display = "none";
		if(rightflag)document.getElementById(_inst.arrow.rightId).style.display = "block";
		else document.getElementById(_inst.arrow.rightId).style.display = "none";
	}

};


/*
 * 调用示例
 */

//var arrow = {
//    	display:true,  //是否出现导向箭头
//    	letfId:"page_up",      //左导向箭头id或者上导向箭头id
//    	rightId:"page_down"      //右导向箭头id或者下导向箭头id
//}
//ListIterator_OBJ.getInstance().init("zy_list",5,"lr",arrow);

 
