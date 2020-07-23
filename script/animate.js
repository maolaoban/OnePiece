function animate(obj,target,step){
	//根据target与当前盒子的位置关系，判断step正负值
	var absStep = Math.abs(step);
	step = target > obj.offsetLeft ? absStep : -absStep;
	if(obj.timer){
		clearInterval(obj.timer);
	}
	obj.timer = setInterval(function(){
		obj.style.left = obj.offsetLeft + step + 'px';
		var distance = target - obj.offsetLeft;
		if(Math.abs(distance) < absStep){
			clearInterval(obj.timer);
			obj.style.left = target + 'px';
		} 
	},10)
}