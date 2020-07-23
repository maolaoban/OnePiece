function $(id){
	return document.getElementById(id);
}
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

function animate(obj, json,speed,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current = 0;
		var step =0;
		var flag = true;
		for(var attr in json){
			if(attr == 'opacity'){
				if('opacity' in obj.style){
					current = getStyle(obj,attr) * 100;
					step = (json[attr] * 100 -current) / 10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					var target = (current + step) / 100;
					obj.style[attr] = target;
					if(target != json[attr]){
						flag = false;
					}
				}else{
					current = getStyle(obj,'filter');
					if(current == ''){
						current = 100;
					}else{
						var index = current.indexOf('=') + 1;
						current = parseInt(current,substr(index)); 
					}
					step = (json[attr] * 100 - current) / 10;
					var target = current + step;
					obj.style.filter = 'alpha(opacity='+ target +')';
					if(target != json[attr] * 100){
						flag = false;
					}
				}
			}else if(attr == 'z-index'){
				obj.style[attr] = json[attr];
			}else{
				current = parseInt(getStyle(obj, attr));
				step = (json[attr] - current) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				obj.style[attr] = current + step + 'px';
				if(current != json[attr]){
					flag = false;
				}
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(callback){
				callback();
			}
		}
	}, speed);
}
window.onload = function(){
	var lis = $('nav').getElementsByTagName('li');
	for (var i = 1; i < lis.length; i++) {
		lis[i].onmouseover = function(){
			this.className = 'select';
		}
		lis[i].onmouseout = function(){
			this.className = '';
		}
	}
	$('weixin').onmouseover = function(){
		$('downdiv').style.display = 'block';
	}
	$('weixin').onmouseout = function(){
		$('downdiv').style.display = 'none';
	}
	$('qq').onclick = function(){
		window.open('https://user.qzone.qq.com/1393867317');
	}
	$('baidu').onclick = function(){
		window.open('https://tieba.baidu.com/f?ie=utf-8&kw=%E8%88%AA%E6%B5%B7%E7%8E%8B%E5%90%AF%E8%88%AA');
	}
	var mv = $('video').children[1];
	$('play').onclick = function(){
		$('video').style.display = 'block';
		mv.currentTime = 0;
		mv.play();
	}
	$('close').onclick = function(){
		$('video').style.display = 'none';
		mv.currentTime = 30;
	}
	var timer;
	var key = 0;
	function autoplay(){
		key++;
		if(key >=$('box_ul').children.length){
			$('box_ul').style.left = 0;
			key = 1;
		}
		animate($('box_ul'),{'left':-600 * key},20);
		setNavCurrent();
	}
	if(timer){
		clearInterval(timer);
	}
	timer = setInterval(autoplay,3000);
	var imgCount = $('box_ul').getElementsByTagName('img').length;
	for(var i = 0;i < imgCount;i++){
		var li = document.createElement('li');
		if(i == 0){
			li.className = 'current';
		}
		li.setAttribute('index', i);
		li.onclick = function(){
			var plis = $('sc_nav').getElementsByTagName('li');
			for (var i = 0; i < plis.length; i++) {
				plis[i].className = '';
			}
			this.className = 'current';
			key = this.getAttribute('index');
			animate($('box_ul'),{'left':-600 * key},20);
		}
		$('sc_nav').appendChild(li);
	}
	function setNavCurrent(){
 		var lis = $('sc_nav').getElementsByTagName('li');
 		for (var i = 0; i < lis.length; i++) {
 			lis[i].className = '';
 		}
 		lis[key].className = 'current';
    }
	var news = $('tab').getElementsByTagName('li');
	var main = $('products').getElementsByTagName('div');
	for (var i = 0; i < news.length; i++) {
		news[i].setAttribute('index', i);
		news[i].onmouseover = function(){
			for (var i = 0; i < news.length; i++) {
				news[i].className = 'tab-item';
				main[i].className = 'main';
			}
			this.className = 'tab-item current';
			main[this.getAttribute('index')].className = 'main selected';
		}
	} 
	var roles = $('role').getElementsByTagName('li');
	var shows = $('role-p').getElementsByTagName('li');
	for (var i = 0; i < roles.length; i++) {
		var target = 0;
		roles[i].setAttribute('index', i);
		roles[i].onmouseover = function(){
			this.className = 'active';
		}
		roles[i].onmouseout = function(){
			this.className = '';
			roles[target].className = 'active'
		}
		roles[i].onclick = function(){
			for (var i = 0; i < shows.length; i++) {
				shows[i].className = '';
				roles[i].className = '';
				shows[i].style.opacity = 0;
			}
			target = this.getAttribute('index');
			animate(shows[target],{'opacity':1},50);
			shows[target].className = 'show';
			
		}
	}
	$('left').onclick = function(){
		animate($('role'),{'left':-440},50);
	}
	$('right').onclick = function(){
		animate($('role'),{'left':0},50);
	}
	var positions = [
		{   //  1
                "width":700,
                "left":50,
                "opacity":0,
                "z-index":2
            },
            {  // 2
                "width":750,
                "left":-300,
                "bottom":80,
                "opacity":0.4,
                "z-index":3,
            },
            {   // 3
                "width":883,
                "left":0,
                "bottom":40,
                "opacity":1,
                "z-index":4
            },
            {  // 4
                "width":750,
                "left":583,
                "bottom":80,
                "opacity":0.4,
                "z-index":3
            }, 
            {   //  5
                "width":700,
                "left":800,
                "opacity":0,
                "z-index":2
            }       
	];
	var slis = $('slider').getElementsByTagName('li');
	begin();
	function begin(){
		for (var i = 0; i < slis.length; i++) {
          	animate(slis[i],positions[i],20);
        }
	}
	function change(){
        for (var i = 0; i < slis.length; i++) {
          	animate(slis[i],positions[i],20);
   			if(getStyle(slis[i],'left')=='50px'){
   				slis[i].className = 'l-img';
   			}else if(getStyle(slis[i],'left')=='0px'){
   				slis[i].className = 'r-img';
   			}else{
   				slis[i].className = '';
   			}
        }
    }
    var timerL;
    if(timerL){
    	clearInterval(timerL);
    }
    timerL = setInterval(function(){
    	positions.push(positions.shift());
    	change();
    },3000); 

    $('libao').onmouseover = function(){
    	$('popc').style.display = 'block';
    } 
    $('cl').onclick = function(){
    	$('popc').style.display = 'none';
    }
}