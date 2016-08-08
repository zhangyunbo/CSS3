
var ROW = 4,
	COL = 6,
	NUM = ROW * COL,
	BIG_IMG_WIDTH = 750,
	BIG_IMG_HEIGHT = 500,
	SMALL_IMG_WIDTH = 125,
	SMALL_IMG_HEIGHT = 125;
// 小图 开始
var count = 0;
for (var i = 0; i < NUM; i++) {
	var smallImg = new Image();
	smallImg.onload = function(){
		count++;
		if (count == NUM*2) {
			ready();
		}
	};
	smallImg.src = 'img/thumbs/'+(i + 1)+'.jpg';

	var bigImg = new Image();
	bigImg.onload = function(){
		count++;
		if (count == NUM*2) {
			ready();
		}
	};
	bigImg.src = 'img/'+(i + 1)+'.jpg';
}

var aImg = document.getElementsByClassName('img');
var oContainer = document.getElementById('container');
var index = 0;
var iColGap = (oContainer.offsetWidth - SMALL_IMG_WIDTH * COL) / (COL + 1);
var iRowGap = (oContainer.offsetHeight - SMALL_IMG_HEIGHT * ROW) / (ROW + 1);
function ready(){
	for (var i = 0; i < ROW; i++) {
		for (var j = 0; j < COL; j++) {
			index++;
		var oDiv = document.createElement('div');
		oDiv.className = 'img';
		oDiv.style.width = SMALL_IMG_WIDTH + 'px';
		oDiv.style.height = SMALL_IMG_HEIGHT + 'px';
		oDiv.innerHTML = '<span></span>';
		oDiv.style.backgroundImage = 'url(img/thumbs/' + index + '.jpg)';
		oDiv.index = index;
		oContainer.appendChild(oDiv);
		oDiv.pos = {
			row : i,
			col : j,
			left: j * (iColGap + SMALL_IMG_WIDTH) + iColGap,
			top : i * (iRowGap + SMALL_IMG_HEIGHT) + iRowGap
		};
		}
	}
}
var timer = setInterval(function(){
    aImg[--index].style.left = aImg[index].pos.left + 'px';
    aImg[index].style.top = aImg[index].pos.top + 'px';
    setStyle(aImg[index], 'transform', 'rotate('+ (Math.random() * 40 - 20 ) +'deg)');
    if(index == 0){
        clearInterval(timer);
    }
}, 100);
// 小图 结束

// 大图 开始
var bClick = false;
var nowIdx = 1;
oContainer.onclick = function(e){
    clearInterval(timer);
	var target = e.target;
	if(target != oContainer){
    if(bClick){
        for(var i=0; i<NUM; i++){
            aImg[i].style.left = aImg[i].pos.left + 'px';
            aImg[i].style.top = aImg[i].pos.top + 'px';
            setStyle(aImg[i], 'transform', 'rotate('+ (Math.random() * 40 - 20 ) +'deg)');
            aImg[i].style.borderWidth = '5px';
    		var oSpan = aImg[i].getElementsByTagName('span')[0];
            oSpan.style.opacity = 0;
		}

	}else{
        var bigImgPos = {
        left : (oContainer.offsetWidth - BIG_IMG_WIDTH) / 2 ,
        top:  (oContainer.offsetHeight - BIG_IMG_HEIGHT) / 2
    	};
		for(var i=0; i<NUM; i++){
	    	aImg[i].style.left = bigImgPos.left + (SMALL_IMG_WIDTH * aImg[i].pos.col) + 'px';
	    	aImg[i].style.top = bigImgPos.top + (SMALL_IMG_HEIGHT * aImg[i].pos.row) + 'px';
	    	aImg[i].style.borderWidth = '1px';
	    	setStyle(aImg[i], 'transform', 'rotate(0deg)');

			var oSpan = aImg[i].getElementsByTagName('span')[0];
	    	oSpan.style.opacity = 1;
	   	 	oSpan.style.backgroundImage = 'url(img/' + target.parentNode.index + '.jpg)';
	   	 	oSpan.style.backgroundPosition = -aImg[i].pos.col * SMALL_IMG_WIDTH + 'px '
	                                    + (-aImg[i].pos.row * SMALL_IMG_HEIGHT) + 'px';
			}
			nowIdx = target.parentNode.index;
			oPrev.style.display = oNext.style.display = 'block';
		}
		bClick = !bClick;
	}
};
// 大图 结束

// 左右开始
var oPrev = document.getElementById('prev'),
	oNext = document.getElementById('next');
oPrev.onclick = oNext.onclick = function(){
    if(this == oPrev){
        nowIdx--;
     if(nowIdx == 0){
        nowIdx = NUM;
    	}
 	}else{
        nowIdx++;
        if(nowIdx == NUM + 1){
            nowIdx = 1;
        }
    }

var arr = [];
    for(var i=0; i<NUM; i++){
        arr.push(i);
    }
    arr.sort(function(){
        return Math.random() - 0.5;
    });
var timer = setInterval(function(){
    var item = arr.pop();
    var oSpan = aImg[item].getElementsByTagName('span')[0];
    oSpan.style.backgroundImage = 'url(img/'+ nowIdx +'.jpg)';

    if(arr.length == 0){
        clearInterval(timer);
     }
    }, 30);
};
// 左右结束

function setStyle(elem, prop, val){
    ['Webkit', 'Moz', 'Ms', 'O', ''].forEach(function(prefix){
    elem.style[prefix + prop.charAt(0).toUpperCase() + prop.substring(1)] = val;
 	});
}