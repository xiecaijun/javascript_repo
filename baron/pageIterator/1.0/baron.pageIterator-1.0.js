function PageIterator_OBJ()
{
	//3行6列
	var id ="";
	var ul_id ="";
	var id_a_prefix="";
	var id_li_prefix="";
	var idMax=0;
	var jmax=10;
	var imax=Math.ceil(idMax/jmax);  
	var slideBoard = {
		offset:0,
		width:2,
		first:0,
		last:imax-1,
		slide:function(offset){
			this.end = (offset + this.width-1)>this.last?this.last:(offset + this.width-1);
			this.start = this.end-this.width+1;
		}	
	}
}

PageIterator_OBJ.inst = new PageIterator_OBJ();

PageIterator_OBJ.getInstance=function(){
	return PageIterator_OBJ.inst;
};

/*初始化*/
PageIterator_OBJ.prototype.init =function(idMax,jmax,ul_id,id_a_prefix,id_li_prefix){ 	 
	    var inst = PageIterator_OBJ.inst;
	    //inst.id = Id;
	    inst.ul_id = ul_id;
	    inst.id_li_prefix = id_li_prefix;
	    inst.id_a_prefix = id_a_prefix;
	    inst.jmax = jmax;
	    inst.imax=Math.ceil(idMax/jmax);
	    idMax=Number(idMax);
	    var imax = Number(inst.imax);
		var id=0;
		inst.map_button = new Array();
		var map = new Array();
		var id_array=new Array();
		for(var i=0;i<imax;i++ ){
		    id_array[i]=new Array();
			for(var j=0;j<jmax;j++){
				id++;
			    map[id]={"x":i,"y":j};
			    
				id_array[i][j]=id;
				if(id>inst.idMax){
					//map[id]={"x":i,"y":0};
					id_array[i][j]=id_array[i][0];
				}
			}
		}	
		
		inst.id_array = id_array;			
    	//获取邻居id 
		for(var i=0;i<imax;i++){
			for(var j=0;j<jmax;j++){
			    var id =id_array[i][j];		     
				var left_id = (id-1)>0?(id-1):1;
				var right_id = (id+1)<=imax*jmax?(id+1):(imax*jmax);
				var left_xy = map[left_id];
				var right_xy= map[right_id];
				var up_xy={"x":(i-1)>0?(i-1):0,"y":j};
				var down_xy ={"x":(i+1)<imax?(i+1):(imax-1),"y":j};
				//alert("id_"+id+",left("+left_xy.x+","+left_xy.y+")"+",right("+right_xy.x+","+right_xy.y+")"+",up("+up_xy.x+","+up_xy.y+")"+",down("+down_xy.x+","+down_xy.y+")");
				//alert("id_"+id+",left("+id_array[left_xy.x][left_xy.y]+")"+",right("+id_array[right_xy.x][right_xy.y]+")"+",up("+id_array[up_xy.x][up_xy.y]+")"+",down("+id_array[down_xy.x][down_xy.y]+")");
		        inst.map_button[id]={"l":id_array[left_xy.x][left_xy.y],"r":id_array[right_xy.x][right_xy.y],"u":id_array[up_xy.x][up_xy.y],"d":id_array[down_xy.x][down_xy.y]};	
			    //if(id>inst.idMax)inst.map_button[id]={"l":id_array[left_xy.x][left_xy.y],"r":id_array[right_xy.x][right_xy.y],"u":id_array[up_xy.x][up_xy.y],"d":id_array[down_xy.x][0]};
			}
		}
};

PageIterator_OBJ.prototype.upward=function(){
 
	   var inst = PageIterator_OBJ.getInstance();
	   //alert(document.activeElement.id);
	   //alert(inst.id_a_prefix);
	   //alert(inst.id_a_prefix.length);
	   var Id=document.activeElement.id.substring(inst.id_a_prefix.length);
	   //alert(Id);
	   inst.id = Id;
	   
	   var neigberid =inst.op_getNeigberIds();
	   var curTop = inst.offsetTop(); 
	   var downid = neigberid.u;
	   //alert(inst.id +":"+curTop+":"+downid);
	   inst.id = downid;
	   var downTop = inst.offsetTop();
	   var requiredMidlle =100;
	   var midlle =0.5*(curTop+downTop);
	   
	   //alert(inst.id +":"+midlle+":"+downid);
	   
	   var obj = document.getElementById(inst.ul_id);
	   var top_prim = $("#"+inst.ul_id).position().top;
	   var offTopX = top_prim+requiredMidlle-midlle;
	   offTopX = offTopX>0?0:offTopX;
	   obj.style.top = offTopX+"px";	 
	   //event.returnValue=false;
	   
	   if(downid!=Id){     
		    baronkey.disable();
	    	document.getElementById(inst.id_a_prefix+downid).focus();
	   }else{
	   		//document.getElementById("right_list").getElementsByTagName('li')[0].getElementsByTagName('a')[0].focus();
	   }
};
	
PageIterator_OBJ.prototype.downward=function(){
	  //alert("downward");
 	   var inst = PageIterator_OBJ.getInstance();
 
	   var Id=document.activeElement.id.substring(inst.id_a_prefix.length);
	   inst.id = Id;  
 
	   var neigberid =inst.op_getNeigberIds();
	   var curTop = inst.offsetTop(); 
	   var downid = neigberid.d;
	   inst.id = downid;
	 
	   var downTop = inst.offsetTop();
	   var requiredMidlle =100;
	   var midlle =0.5*(curTop+downTop);	   
	   //alert(inst.id +":"+curTop+":"+downid);
	   var obj = document.getElementById(inst.ul_id);
	   var top_prim = $("#"+inst.ul_id).position().top;
	   var offTopX = top_prim+requiredMidlle-midlle;
	   offTopX = offTopX>0?0:offTopX;
	   obj.style.top = offTopX+"px"; 	
	   baronkey.disable();  
	   document.getElementById(inst.id_a_prefix+downid).focus(); 
};

PageIterator_OBJ.prototype.leftward=function(){
	    
 	   var inst = PageIterator_OBJ.getInstance();
 
	   var Id=document.activeElement.id.substring(inst.id_a_prefix.length);
	   inst.id = Id;  
	   var neigberid =inst.op_getNeigberIds();
	   var curTop = inst.offsetTop(); 
	   var downid = neigberid.l;
	   inst.id = downid;
	   var downTop = inst.offsetTop();
    
	   if(curTop-downTop!=0){
		   var requiredMidlle =100;
		   var midlle =0.5*(curTop+downTop);	   
		   var obj = document.getElementById(inst.ul_id);
		   var top_prim = $("#"+inst.ul_id).position().top;
		   var offTopX = top_prim+requiredMidlle-midlle;
		   offTopX = offTopX>0?0:offTopX;
		   obj.style.top = offTopX+"px";      
	   }	   
	   
	   baronkey.disable();    
	   document.getElementById(inst.id_a_prefix+downid).focus(); 
};
	
PageIterator_OBJ.prototype.rightward=function(){
	 
 	   var inst = PageIterator_OBJ.getInstance();
 
	   var Id=document.activeElement.id.substring(inst.id_a_prefix.length);
	   inst.id = Id;  
	   var neigberid =inst.op_getNeigberIds();
	   var curTop = inst.offsetTop();  
	   var downid = neigberid.r;
	   inst.id = downid;
	   var downTop = inst.offsetTop();
	   
	   if(curTop-downTop!=0){
		   var requiredMidlle =100;
		   var midlle =0.5*(curTop+downTop);	   
		   var obj = document.getElementById(inst.ul_id);
		   var top_prim = $("#"+inst.ul_id).position().top;
		   var offTopX = top_prim+requiredMidlle-midlle;
		   offTopX = offTopX>0?0:offTopX;
		   obj.style.top = offTopX+"px";      
	   }
	   baronkey.disable();    
	   document.getElementById(inst.id_a_prefix+downid).focus(); 
};
	
PageIterator_OBJ.prototype.op_getNeigberIds=function(){
	    var inst = PageIterator_OBJ.inst;
        var nid =inst.map_button[this.id];
     	return nid;
};

PageIterator_OBJ.prototype.offsetTop=function(){    
	    var inst = PageIterator_OBJ.getInstance();
	    //alert(inst.ul_id);
        var listid=document.getElementById(inst.ul_id); 
		var olistop = listid.offsetTop;	
		var oTop = document.getElementById(inst.id_li_prefix+inst.id).offsetTop;
		//alert("dsj:"+olistop+",oTop:"+oTop);
		oTop+=olistop;
		oTop+=0.5*80;
        return oTop;
};

