(function($){

	//定义Carousel类
	var Carousel = (function(){

		//定义Carousel的构造函数
		function Carousel(element,options){
			this.settings = $.extend(true,$.fn.Carousel.defaults,options||{});
			this.element = element;
			this.init();
		}

		//定义Carousel的方法
		Carousel.prototype = {
			/*说明：初始化插件*/
			init:function(){
				var me = this;
				me.poster = me.element;
				me.posterItemMain = me.poster.find("ul.poster-list");
				me.nextBtn = me.poster.find("div.poster-next-btn"); 
				me.prevBtn = me.poster.find("div.poster-prev-btn"); 
				me.posterItems = me.poster.find("li.poster-item");

				if(me.posterItems.size()%2 == 0){
					me.posterItemMain.append(me.posterItems.ep(0).clone());
					me.posterItems = me.posterItemMain.children;
				}
				
				me.posterFirstItem = me.posterItems.first();
				me.posterLastItem = me.posterItems.last();
				me.rotateFlag =true;

				//设置配置参数值
				me.setSettingValue();
				me.setPosterPost();

				me.nextBtn.click(function(){
					if(me.rotateFlag){
						me.rotateFlag = false;
						me.carouseRotate("left");
					};
				});

				me.prevBtn.click(function(){
					if(me.rotateFlag){
						me.rotateFlag = false;
						me.carouseRotate("right");
					};
				});

				//是否开启自动播放
				if(me.settings.autoPlay){
					me.autoPlay();
					me.poster.hover(function(){
						window.clearInterval(me.timer);
					},function(){
						me.autoPlay();
					});
				}
			},

			//自动播放方法
			autoPlay:function(){
				var me = this;
				me.timer = window.setInterval(function(){
					me.nextBtn.click();
				},me.settings.delay);
			},

			//旋转方法
			carouseRotate:function(dir){
				var me = this;
				var zIndexArr = [];
				if(dir === "left"){
					me.posterItems.each(function(){
						var self = $(this),
							prev = self.prev().get(0)?self.prev():me.posterLastItem,
							width = prev.width(),
							height = prev.height(),
							zIndex = prev.css("zIndex"),
							opacity = prev.css("opacity"),
							left = prev.css("left"),
							top = prev.css("top");
							zIndexArr.push(zIndex);
							self.animate({
									width:width,
									height:height,
									opacity:opacity,
									left:left,
									top:top
							},me.settings.speed,function(){
								me.rotateFlag = true;
							});
					});
					me.posterItems.each(function(i){
						$(this).css("zIndex",zIndexArr[i]);
						if(zIndexArr[i]==Math.floor(me.posterItems.length/2)){
							$(this).find(".poster-item-title").slideDown("slow");
						}else{
							$(this).find(".poster-item-title").hide();
						}
					})
				}else if(dir === "right"){
					me.posterItems.each(function(){
						var self = $(this),
							next = self.next().get(0)?self.next():me.posterFirstItem,
							width = next.width(),
							height = next.height(),
							zIndex = next.css("zIndex"),
							opacity = next.css("opacity"),
							left = next.css("left"),
							top = next.css("top");
							zIndexArr.push(zIndex);
							self.animate({
									width:width,
									height:height,
									opacity:opacity,
									left:left,
									top:top
							},me.settings.speed,function(){
								me.rotateFlag = true;
							});
					});
					me.posterItems.each(function(i){
						$(this).css("zIndex",zIndexArr[i]);
						if(zIndexArr[i]==Math.floor(me.posterItems.length/2)){
							$(this).find(".poster-item-title").slideDown("slow");
						}else{
							$(this).find(".poster-item-title").hide();
						}
					})
				}
			},

			//设置剩余的帧的位置关系
			setPosterPost:function(){
				var me = this;
				var sliceItems = me.posterItems.slice(1),
					sliceSize  = sliceItems.size()/2,
					rightSlice = sliceItems.slice(0,sliceSize),
					level      = Math.floor(me.posterItems.size()/2),
					leftSlice  = sliceItems.slice(sliceSize);

				//设置右边帧的位置关系和宽度、高度、top...
				var rw = me.settings.posterWidth,
					rh = me.settings.posterHeight,
					//((容器宽-帧宽)/2)/层级 190
					gap = ((me.settings.width-me.settings.posterWidth)/2)/level;

				var firstLeft = (me.settings.width-me.settings.posterWidth)/2;
				var fixOffsetLeft = firstLeft + rw;

				//设置右边的位置关系
				rightSlice.each(function(i){
					$(this).find(".poster-item-title").hide();
					level--;
					rw = rw*me.settings.scale;
					rh = rh*me.settings.scale;
					var j=i;
					$(this).css({
							zIndex:level,
							width:rw,
							height:rh,
							opacity:1/(++j),
							left:fixOffsetLeft+(++i)*gap-rw,
							top:me.setVertucalAlign(rh)
					});

				});

				//设置左边的位置关系
				var lw = rightSlice.last().width(),
					lh = rightSlice.last().height(),
					oloop = Math.floor(me.posterItems.size()/2);

				leftSlice.each(function(i){
					$(this).find(".poster-item-title").hide();
					$(this).css({
							zIndex:i,
							width:lw,
							height:lh,
							opacity:1/oloop,
							left:i*gap,
							top:me.setVertucalAlign(lh)
					});

					lw = lw/me.settings.scale;
					lh = lh/me.settings.scale;
					oloop--;
				});
			},

			//设置垂直排列对齐
			setVertucalAlign:function(height){
				var me = this;
				var verticalType = me.settings.verticalAlign,
					top = 0;

				if(verticalType === "middle"){
					top = (me.settings.height - height)/2;
				}else if(verticalType === "top"){
					top = 0;
				}else if(verticalType === "bottom"){
					top = me.settings.height - height;
				}else{
					top = (me.settings.height-height)/2;
				};

				return top;
			},

			//配置左右按钮和第一帧位置
			setSettingValue:function(){
				var me = this;
				me.poster.css({
					width:me.settings.width,
					height:me.settings.height
				});

				me.posterItemMain.css({
					width:me.settings.width,
					height:me.settings.height
				});

				//计算左右切换按钮的宽度
				var w = (me.settings.width-me.settings.posterWidth)/2;

				me.nextBtn.css({
					width:w,
					height:me.settings.height,
					zIndex:Math.ceil(me.posterItems.size()/2)
				});
				me.prevBtn.css({
					width:w,
					height:me.settings.height,
					zIndex:Math.ceil(me.posterItems.size()/2)
				});
				me.posterFirstItem.css({
					width:me.settings.posterWidth,
					height:me.settings.posterHeight,
					top: me.setVertucalAlign(me.settings.posterHeight),
					left:w,
					zIndex:Math.floor(me.posterItems.size()/2)
				});
			}
		};
		return Carousel;
	})();

	//单例模式,添加Carousel方法
	$.fn.Carousel = function(options){
		return this.each(function(){
			var me = $(this),
				instance = me.data("Carousel");
			if(!instance){
				instance = new Carousel(me,options);
				me.data("Carousel",instance);
			}
		});
	};

	//默认配置参数
	$.fn.Carousel.defaults = {
		"width":1000,		//幻灯片的宽度
		"height":519,		//幻灯片的高度
		"posterWidth":436,	//幻灯片第一帧的宽度
		"posterHeight":519, //幻灯片第一张的高度
		"scale":0.9,		//记录显示比例关系
		"speed":300,		//记录幻灯片滚动速度
		"autoPlay":true,	//是否开启自动播放
		"delay":2000,		//自动播放间隔
		"verticalAlign":"middle"	//图片对齐位置
	}


}(jQuery));

