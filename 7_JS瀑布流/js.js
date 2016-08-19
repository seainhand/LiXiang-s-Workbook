window.onload = function(){
	imgLocation("container","box");
	var imgData = {"data":[{"src":"2.jpg"},{"src":"1.jpg"},{"src":"3.jpg"},{"src":"9.jpg"},{"src":"8.jpg"},{"src":"5.png"},{"src":"6.png"},{"src":"10.jpg"},{"src":"9.jpg"},{"src":"8.jpg"},{"src":"2.jpg"},{"src":"7.png"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"8.jpg"}]};
	window.onscroll =  function (){
		if (checkFlag()) {
			var cparent = document.getElementById("container");	
			for (var i = 0; i < imgData.data.length; i++) {
				var ccontent = document.createElement("div");
				ccontent.className = "box";
				cparent.appendChild(ccontent);
				var boximg = document.createElement("div");
				boximg.className = "box_img";
				ccontent.appendChild(boximg);
				var img = document.createElement("img");
				img.src = imgData.data[i].src;
				boximg.appendChild(img);
			}
			imgLocation("container","box");
		}
	};
};

function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
	if (lastContentHeight<scrollTop+pageHeight) {
		return true;
	}
}

function imgLocation(parent,content){
	//将parent中的所有内容取出
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth = ccontent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);
	cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto";

	var boxHeightArr = [];
	for (var i = 0; i < ccontent.length; i++) {
		if (i<num) {
		boxHeightArr[i] = ccontent[i].offsetHeight;
		}else{
			var minheight = Math.min.apply(null,boxHeightArr);
			var minIndex = getminheightLocation(boxHeightArr,minheight);
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minheight+"px";
			ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
			boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
	}
}

function getminheightLocation(boxHeightArr,minheight){
	for (var i in boxHeightArr) {
		if(boxHeightArr[i]==minheight){
			return i;
		}
	}
}

function getChildElement(parent,content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for (var i = 0; i < allcontent.length; i++) {
		if(allcontent[i].className == content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}