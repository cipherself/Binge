(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! Sortable 1.2.0 - MIT | git://github.com/rubaxa/Sortable.git */
!function(a){"use strict";"function"==typeof define&&define.amd?define(a):"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=a():"undefined"!=typeof Package?Sortable=a():window.Sortable=a()}(function(){"use strict";function a(a,b){this.el=a,this.options=b=q({},b),a[H]=this;var d={group:Math.random(),sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(a.nodeName)?"li":">*",ghostClass:"sortable-ghost",ignore:"a, img",filter:null,animation:0,setData:function(a,b){a.setData("Text",b.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0};for(var e in d)!(e in b)&&(b[e]=d[e]);var g=b.group;g&&"object"==typeof g||(g=b.group={name:g}),["pull","put"].forEach(function(a){a in g||(g[a]=!0)}),b.groups=" "+g.name+(g.put.join?" "+g.put.join(" "):"")+" ";for(var h in this)"_"===h.charAt(0)&&(this[h]=c(this,this[h]));f(a,"mousedown",this._onTapStart),f(a,"touchstart",this._onTapStart),f(a,"dragover",this),f(a,"dragenter",this),Q.push(this._onDragOver),b.store&&this.sort(b.store.get(this))}function b(a){t&&t.state!==a&&(i(t,"display",a?"none":""),!a&&t.state&&u.insertBefore(t,r),t.state=a)}function c(a,b){var c=P.call(arguments,2);return b.bind?b.bind.apply(b,[a].concat(c)):function(){return b.apply(a,c.concat(P.call(arguments)))}}function d(a,b,c){if(a){c=c||J,b=b.split(".");var d=b.shift().toUpperCase(),e=new RegExp("\\s("+b.join("|")+")\\s","g");do if(">*"===d&&a.parentNode===c||(""===d||a.nodeName.toUpperCase()==d)&&(!b.length||((" "+a.className+" ").match(e)||[]).length==b.length))return a;while(a!==c&&(a=a.parentNode))}return null}function e(a){a.dataTransfer.dropEffect="move",a.preventDefault()}function f(a,b,c){a.addEventListener(b,c,!1)}function g(a,b,c){a.removeEventListener(b,c,!1)}function h(a,b,c){if(a)if(a.classList)a.classList[c?"add":"remove"](b);else{var d=(" "+a.className+" ").replace(G," ").replace(" "+b+" "," ");a.className=(d+(c?" "+b:"")).replace(G," ")}}function i(a,b,c){var d=a&&a.style;if(d){if(void 0===c)return J.defaultView&&J.defaultView.getComputedStyle?c=J.defaultView.getComputedStyle(a,""):a.currentStyle&&(c=a.currentStyle),void 0===b?c:c[b];b in d||(b="-webkit-"+b),d[b]=c+("string"==typeof c?"":"px")}}function j(a,b,c){if(a){var d=a.getElementsByTagName(b),e=0,f=d.length;if(c)for(;f>e;e++)c(d[e],e);return d}return[]}function k(a){a.draggable=!1}function l(){M=!1}function m(a,b){var c=a.lastElementChild,d=c.getBoundingClientRect();return b.clientY-(d.top+d.height)>5&&c}function n(a){for(var b=a.tagName+a.className+a.src+a.href+a.textContent,c=b.length,d=0;c--;)d+=b.charCodeAt(c);return d.toString(36)}function o(a){for(var b=0;a&&(a=a.previousElementSibling);)"TEMPLATE"!==a.nodeName.toUpperCase()&&b++;return b}function p(a,b){var c,d;return function(){void 0===c&&(c=arguments,d=this,setTimeout(function(){1===c.length?a.call(d,c[0]):a.apply(d,c),c=void 0},b))}}function q(a,b){if(a&&b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}var r,s,t,u,v,w,x,y,z,A,B,C,D,E,F={},G=/\s+/g,H="Sortable"+(new Date).getTime(),I=window,J=I.document,K=I.parseInt,L=!!("draggable"in J.createElement("div")),M=!1,N=function(a,b,c,d,e,f,g){var h=J.createEvent("Event"),i=(a||b[H]).options,j="on"+c.charAt(0).toUpperCase()+c.substr(1);h.initEvent(c,!0,!0),h.item=d||b,h.from=e||b,h.clone=t,h.oldIndex=f,h.newIndex=g,i[j]&&i[j].call(a,h),b.dispatchEvent(h)},O=Math.abs,P=[].slice,Q=[],R=p(function(a,b,c){if(c&&b.scroll){var d,e,f,g,h=b.scrollSensitivity,i=b.scrollSpeed,j=a.clientX,k=a.clientY,l=window.innerWidth,m=window.innerHeight;if(x!==c&&(w=b.scroll,x=c,w===!0)){w=c;do if(w.offsetWidth<w.scrollWidth||w.offsetHeight<w.scrollHeight)break;while(w=w.parentNode)}w&&(d=w,e=w.getBoundingClientRect(),f=(O(e.right-j)<=h)-(O(e.left-j)<=h),g=(O(e.bottom-k)<=h)-(O(e.top-k)<=h)),f||g||(f=(h>=l-j)-(h>=j),g=(h>=m-k)-(h>=k),(f||g)&&(d=I)),(F.vx!==f||F.vy!==g||F.el!==d)&&(F.el=d,F.vx=f,F.vy=g,clearInterval(F.pid),d&&(F.pid=setInterval(function(){d===I?I.scrollTo(I.pageXOffset+f*i,I.pageYOffset+g*i):(g&&(d.scrollTop+=g*i),f&&(d.scrollLeft+=f*i))},24)))}},30);return a.prototype={constructor:a,_onTapStart:function(a){var b=this,c=this.el,e=this.options,f=a.type,g=a.touches&&a.touches[0],h=(g||a).target,i=h,j=e.filter;if(!("mousedown"===f&&0!==a.button||e.disabled)&&(h=d(h,e.draggable,c))){if(A=o(h),"function"==typeof j){if(j.call(this,a,h,this))return N(b,i,"filter",h,c,A),void a.preventDefault()}else if(j&&(j=j.split(",").some(function(a){return a=d(i,a.trim(),c),a?(N(b,a,"filter",h,c,A),!0):void 0})))return void a.preventDefault();(!e.handle||d(i,e.handle,c))&&this._prepareDragStart(a,g,h)}},_prepareDragStart:function(a,b,c){var d,e=this,g=e.el,h=e.options,i=g.ownerDocument;c&&!r&&c.parentNode===g&&(D=a,u=g,r=c,v=r.nextSibling,C=h.group,d=function(){e._disableDelayedDrag(),r.draggable=!0,h.ignore.split(",").forEach(function(a){j(r,a.trim(),k)}),e._triggerDragStart(b)},f(i,"mouseup",e._onDrop),f(i,"touchend",e._onDrop),f(i,"touchcancel",e._onDrop),h.delay?(f(i,"mousemove",e._disableDelayedDrag),f(i,"touchmove",e._disableDelayedDrag),e._dragStartTimer=setTimeout(d,h.delay)):d())},_disableDelayedDrag:function(){var a=this.el.ownerDocument;clearTimeout(this._dragStartTimer),g(a,"mousemove",this._disableDelayedDrag),g(a,"touchmove",this._disableDelayedDrag)},_triggerDragStart:function(a){a?(D={target:r,clientX:a.clientX,clientY:a.clientY},this._onDragStart(D,"touch")):L?(f(r,"dragend",this),f(u,"dragstart",this._onDragStart)):this._onDragStart(D,!0);try{J.selection?J.selection.empty():window.getSelection().removeAllRanges()}catch(b){}},_dragStarted:function(){u&&r&&(h(r,this.options.ghostClass,!0),a.active=this,N(this,u,"start",r,u,A))},_emulateDragOver:function(){if(E){i(s,"display","none");var a=J.elementFromPoint(E.clientX,E.clientY),b=a,c=" "+this.options.group.name,d=Q.length;if(b)do{if(b[H]&&b[H].options.groups.indexOf(c)>-1){for(;d--;)Q[d]({clientX:E.clientX,clientY:E.clientY,target:a,rootEl:b});break}a=b}while(b=b.parentNode);i(s,"display","")}},_onTouchMove:function(a){if(D){var b=a.touches?a.touches[0]:a,c=b.clientX-D.clientX,d=b.clientY-D.clientY,e=a.touches?"translate3d("+c+"px,"+d+"px,0)":"translate("+c+"px,"+d+"px)";E=b,i(s,"webkitTransform",e),i(s,"mozTransform",e),i(s,"msTransform",e),i(s,"transform",e),a.preventDefault()}},_onDragStart:function(a,b){var c=a.dataTransfer,d=this.options;if(this._offUpEvents(),"clone"==C.pull&&(t=r.cloneNode(!0),i(t,"display","none"),u.insertBefore(t,r)),b){var e,g=r.getBoundingClientRect(),h=i(r);s=r.cloneNode(!0),i(s,"top",g.top-K(h.marginTop,10)),i(s,"left",g.left-K(h.marginLeft,10)),i(s,"width",g.width),i(s,"height",g.height),i(s,"opacity","0.8"),i(s,"position","fixed"),i(s,"zIndex","100000"),u.appendChild(s),e=s.getBoundingClientRect(),i(s,"width",2*g.width-e.width),i(s,"height",2*g.height-e.height),"touch"===b?(f(J,"touchmove",this._onTouchMove),f(J,"touchend",this._onDrop),f(J,"touchcancel",this._onDrop)):(f(J,"mousemove",this._onTouchMove),f(J,"mouseup",this._onDrop)),this._loopId=setInterval(this._emulateDragOver,150)}else c&&(c.effectAllowed="move",d.setData&&d.setData.call(this,c,r)),f(J,"drop",this);setTimeout(this._dragStarted,0)},_onDragOver:function(a){var c,e,f,g=this.el,h=this.options,j=h.group,k=j.put,n=C===j,o=h.sort;if(void 0!==a.preventDefault&&(a.preventDefault(),!h.dragoverBubble&&a.stopPropagation()),C&&!h.disabled&&(n?o||(f=!u.contains(r)):C.pull&&k&&(C.name===j.name||k.indexOf&&~k.indexOf(C.name)))&&(void 0===a.rootEl||a.rootEl===this.el)){if(R(a,h,this.el),M)return;if(c=d(a.target,h.draggable,g),e=r.getBoundingClientRect(),f)return b(!0),void(t||v?u.insertBefore(r,t||v):o||u.appendChild(r));if(0===g.children.length||g.children[0]===s||g===a.target&&(c=m(g,a))){if(c){if(c.animated)return;q=c.getBoundingClientRect()}b(n),g.appendChild(r),this._animate(e,r),c&&this._animate(q,c)}else if(c&&!c.animated&&c!==r&&void 0!==c.parentNode[H]){y!==c&&(y=c,z=i(c));var p,q=c.getBoundingClientRect(),w=q.right-q.left,x=q.bottom-q.top,A=/left|right|inline/.test(z.cssFloat+z.display),B=c.offsetWidth>r.offsetWidth,D=c.offsetHeight>r.offsetHeight,E=(A?(a.clientX-q.left)/w:(a.clientY-q.top)/x)>.5,F=c.nextElementSibling;M=!0,setTimeout(l,30),b(n),p=A?c.previousElementSibling===r&&!B||E&&B:F!==r&&!D||E&&D,p&&!F?g.appendChild(r):c.parentNode.insertBefore(r,p?F:c),this._animate(e,r),this._animate(q,c)}}},_animate:function(a,b){var c=this.options.animation;if(c){var d=b.getBoundingClientRect();i(b,"transition","none"),i(b,"transform","translate3d("+(a.left-d.left)+"px,"+(a.top-d.top)+"px,0)"),b.offsetWidth,i(b,"transition","all "+c+"ms"),i(b,"transform","translate3d(0,0,0)"),clearTimeout(b.animated),b.animated=setTimeout(function(){i(b,"transition",""),i(b,"transform",""),b.animated=!1},c)}},_offUpEvents:function(){var a=this.el.ownerDocument;g(J,"touchmove",this._onTouchMove),g(a,"mouseup",this._onDrop),g(a,"touchend",this._onDrop),g(a,"touchcancel",this._onDrop)},_onDrop:function(b){var c=this.el,d=this.options;clearInterval(this._loopId),clearInterval(F.pid),clearTimeout(this.dragStartTimer),g(J,"drop",this),g(J,"mousemove",this._onTouchMove),g(c,"dragstart",this._onDragStart),this._offUpEvents(),b&&(b.preventDefault(),!d.dropBubble&&b.stopPropagation(),s&&s.parentNode.removeChild(s),r&&(g(r,"dragend",this),k(r),h(r,this.options.ghostClass,!1),u!==r.parentNode?(B=o(r),N(null,r.parentNode,"sort",r,u,A,B),N(this,u,"sort",r,u,A,B),N(null,r.parentNode,"add",r,u,A,B),N(this,u,"remove",r,u,A,B)):(t&&t.parentNode.removeChild(t),r.nextSibling!==v&&(B=o(r),N(this,u,"update",r,u,A,B),N(this,u,"sort",r,u,A,B))),a.active&&N(this,u,"end",r,u,A,B)),u=r=s=v=t=w=x=D=E=y=z=C=a.active=null,this.save())},handleEvent:function(a){var b=a.type;"dragover"===b||"dragenter"===b?r&&(this._onDragOver(a),e(a)):("drop"===b||"dragend"===b)&&this._onDrop(a)},toArray:function(){for(var a,b=[],c=this.el.children,e=0,f=c.length,g=this.options;f>e;e++)a=c[e],d(a,g.draggable,this.el)&&b.push(a.getAttribute(g.dataIdAttr)||n(a));return b},sort:function(a){var b={},c=this.el;this.toArray().forEach(function(a,e){var f=c.children[e];d(f,this.options.draggable,c)&&(b[a]=f)},this),a.forEach(function(a){b[a]&&(c.removeChild(b[a]),c.appendChild(b[a]))})},save:function(){var a=this.options.store;a&&a.set(this)},closest:function(a,b){return d(a,b||this.options.draggable,this.el)},option:function(a,b){var c=this.options;return void 0===b?c[a]:void(c[a]=b)},destroy:function(){var a=this.el;a[H]=null,g(a,"mousedown",this._onTapStart),g(a,"touchstart",this._onTapStart),g(a,"dragover",this),g(a,"dragenter",this),Array.prototype.forEach.call(a.querySelectorAll("[draggable]"),function(a){a.removeAttribute("draggable")}),Q.splice(Q.indexOf(this._onDragOver),1),this._onDrop(),this.el=a=null}},a.utils={on:f,off:g,css:i,find:j,bind:c,is:function(a,b){return!!d(a,b,a)},extend:q,throttle:p,closest:d,toggleClass:h,index:o},a.version="1.2.0",a.create=function(b,c){return new a(b,c)},a});
},{}],2:[function(require,module,exports){
var sortable = require('./Sortable.min');

var to_watch_ul = document.getElementById('to-watch-ul');
var watched_ul = document.getElementById('watched-ul');
var subscribed_ul = document.getElementById('subscribed-ul');
var to_watch_search = document.getElementById('to-watch-search');
var watched_search = document.getElementById('watched-search');

var to_watch_sortable = sortable.create(to_watch_ul, {group: "movable", scroll: true, onAdd: endAdd});
var watched_sortable = sortable.create(watched_ul, {group: "movable", scroll: true, onAdd: endAdd});

var trakt_api_key = ''
var trakt_api_version = 2;

function endAdd(evt) {
    var data = {
	'name': evt.item.innerHTML,
	'trakt_id': evt.item.getAttribute("trakt_id"),
	'bucket': evt.item.parentNode.parentNode.children[0].innerHTML.toLowerCase().split(/\</g)[0].trim().replace(/\s/g, "_")
    };
    var json_data = JSON.stringify(data);
    commit(json_data);
}

// Commit to the DB
function commit (json_data) {
    var req = new XMLHttpRequest();
    var url = '/add_element';
    if (req) {
	req.open('POST', url, true);
	// req.onreadystatechage = handler;
	req.setRequestHeader('content-type', 'application/json');
	req.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
	req.send(json_data);
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i].trim();
	    if (cookie.substring(0, name.length + 1) === (name + '=')) {
		cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		break;
	    }
	}
    }
    return cookieValue;
}

function constructReq (slug) {
    var req = new XMLHttpRequest();
    if (req) {
	var url = 'https://api-v2launch.trakt.tv/shows/' + slug + '/seasons?extended=episodes';
	req.open('GET', url, true);
	req.onreadystatechange = __add;
	req.setRequestHeader('Content-type', 'application/json');
	req.setRequestHeader('trakt-api-key', trakt_api_key);
	req.setRequestHeader('trakt-api-version', trakt_api_version);
	req.send();
    }
}

var mylist = "minimize-button";
minimizeList(mylist);
var nav_button = "nav-button";
maximizeList(nav_button);
var list_input = "list-input";
search(list_input);

// Minimizes a list when its close button is clicked.
function minimizeList(button_class) {
    var buttons = document.getElementsByClassName(button_class);

    for (var button = 0; button < buttons.length; button++) {
	if (buttons[button]) {
	    buttons[button].addEventListener("click", _minimize);
	}
    }

    function _minimize(event) {
	// button -> h2 -> div.list
	var el = event.currentTarget.parentNode.parentNode;
	el.style.display = 'none';

	var nav_buttons = document.getElementsByClassName('nav-button');
	for (var nav_button = 0; nav_button < nav_buttons.length; nav_button++) {
	    var test_phrase = nav_buttons[nav_button].innerHTML.toLowerCase().replace(/\s/g, "-");
	    if (test_phrase === el.id) {
		nav_buttons[nav_button].style.display = "inline";
	    }
	}

	var row_children = el.parentNode.children;
	for (var i = 0; i < row_children.length; i++){
	    if(row_children[i].firstElementChild.innerHTML !== el.firstElementChild.innerHTML) {
		row_children[i].classList.remove('one-half');
	    }
	}

    }
}

// Shows a list when its navbar button is clicked.
function maximizeList(button_class) {
    var buttons = document.getElementsByClassName(button_class);

    for (var button = 0; button < buttons.length; button++) {
	if (buttons[button]) {
	    buttons[button].addEventListener("click", _maximize);
	}
    }

    function _maximize(event) {
	var el = event.currentTarget;
	event.currentTarget.style.display = 'none';
	var list_id = event.currentTarget.innerHTML.toLowerCase().replace(/\s/g, '-');
	var list_elem = document.getElementById(list_id);
	list_elem.style.display = 'inline';
	var lists = list_elem.parentNode.children;

	for (var list = 0; list < lists.length; list++) {
	    if (lists[list].id !== list_elem.id) {
		lists[list].classList.add("one-half");
	    }
	}
    }
}

// XXX: This is dirty and ugly.
var input_ul = null;

function search(input_class) {
    var inputs = document.getElementsByClassName(input_class);

    for (var input = 0; input < inputs.length; input++) {
	if (inputs[input]) {
	    inputs[input].addEventListener("keyup", _timerFunc);
	}
    }

    var timer = 0;
    function _timerFunc(event) {
	var input_element = event.currentTarget;
	timer && clearTimeout(timer);
	timer = setTimeout(_search, 150, input_element);
    }

    function _search(input_element) {
	var query_string = input_element.value;
	var req  = new XMLHttpRequest();
	var url = 'https://api-v2launch.trakt.tv/search?query=' + query_string + '&type=movie,show';
	input_ul = input_element.nextElementSibling;

	if (query_string === ''){
	    input_ul.innerHTML = '';
	    return;
	}
	
	if (req) {
	    req.open('GET', url, true);
	    req.onreadystatechange = _populate;
	    req.setRequestHeader('Content-type', 'application/json');
	    req.setRequestHeader('trakt-api-key', trakt_api_key);
	    req.setRequestHeader('trakt-api-version', trakt_api_version);
	    req.send();
	}
	
    }
}

function _populate(e) {
    var req = e.currentTarget;
    if (req.readyState !== 4 && req.status !== 200) {
	return;
    }
    var response = JSON.parse(req.response);
    var li_el = null;
    var type = '';

    if (!input_ul) {
	console.log("ul variable is empty, yo!");
	return;
    }
    input_ul.innerHTML = '';
    
    for (var item = 0; item < response.length; item++) {
	type = response[item].type;

	switch(type) {
	case "movie":
	    li_el = '<li><div class="row">' + response[item].movie.title +
		'</div><div class="trakt-id">' + response[item].movie.ids.trakt +
		'</div><div class="row"><div class="type">' + type +
		'</div><div class="year">' + response[item].movie.year +
		'</div></div></li>';
	    break;
	    
	case "show":
	    li_el = '<li><div class="row">' + response[item].show.title +
		'</div><div class="trakt-id">' + response[item].show.ids.trakt +
		'</div><div class="row"><div class="type">' + type +
		'</div><div class="year">' + response[item].show.year +
		'</div></div></li>';
	    break;
	    
	default:
	    console.log("Weird type: " + type);			
	}
	input_ul.innerHTML += li_el;
    }
    
    input_ul.addEventListener("click", _liClick);
    // TODO: Display description on hover
    // ul.addEventListener("hover", _liHover);
}

function _liClick (e) {
    var target = e.target;
    var parent = target.parentNode;
    var new_el = document.createElement('li');

    switch (target.nodeName) {
    case "LI":
	if (target.children.length >= 3)
	    var type = target.children[2].children[0].innerHTML;
	if (type === "show") {
	    constructReq(target.children[1].innerHTML);
	    input_ul.innerHTML = '<h3 class="show-h3">' + target.children[0].innerHTML + '</h3>';
	}

	else {
	    var data = {
		'name': target.children[0].innerHTML,
		'trakt_id': target.children[1].innerHTML,
		'bucket': parent.parentNode.children[0].innerHTML.toLowerCase().split(/\</g)[0].trim().replace(/\s/g, "_")
	    };
	    var json_data = JSON.stringify(data);
	    commit(json_data);

	    new_el.innerHTML = target.children[0].innerHTML;
	    parent.nextElementSibling.appendChild(new_el);
	    parent.removeChild(target);
	}
	break;
	
    case "DIV":
	if (target.className === "row") {
	    if (parent.children.length >= 3)
		var type = parent.children[2].children[0].innerHTML;
	    if (type === "show") {
		constructReq(parent.children[1].innerHTML);
		input_ul.innerHTML = '<h3 class="show-h3">' + parent.children[0].innerHTML + '</h3>';
	    }
	    
	    else {
		var data = {
		    'name': parent.children[0].innerHTML,
		    'trakt_id': parent.children[1].innerHTML,
		    'bucket': parent.parentNode.parentNode.children[0].innerHTML.toLowerCase().split(/\</g)[0].trim().replace(/\s/g, "_")
		};
		var json_data = JSON.stringify(data);
		commit(json_data);

		new_el.innerHTML = parent.children[0].innerHTML;
		parent.parentNode.nextElementSibling.appendChild(new_el);
		parent.parentNode.removeChild(parent);
	    }
	}
	else if (target.className === "type" || target.className === "year") {
	    if (parent.parentNode.children.length >= 3)
		var type = parent.parentNode.children[2].children[0].innerHTML;
	    if (type === "show") {
		constructReq(parent.parentNode.children[2].innerHTML);
		input_ul.innerHTML = '<h3 class="show-h3">' + parent.parentNode.children[0].innerHTML + '</h3>';		
	    }

	    else {
		var data = {
		    'name': parent.parentNode.children[0].innerHTML,
		    'trakt_id': parent.parentNode.children[2].innerHTML,
		    'bucket': parent.parentNode.parentNode.children[0].innerHTML.toLowerCase().split(/\</g)[0].trim().replace(/\s/g, "_")
		};
		var json_data = JSON.stringify(data);
		commit(json_data);
		
		// TODO: Handle cases where year === null
		// TODO: Disallow the addition of duplicates
		new_el.innerHTML = parent.parentNode.children[0].innerHTML;
		parent.parentNode.parentNode.nextElementSibling.appendChild(new_el);
		parent.parentNode.parentNode.removeChild(parent.parentNode);
	    }
	}
	break;
	
    default:
	break;
    }


}

function __add (e) {
    var req = e.currentTarget;
    if (req.readyState !== 4 && req.status !== 200) {
	return;
    }

    var response = JSON.parse(req.response);
    for (var i = 0; i < response.length; i++) {
	var season = response[i].episodes;
	var li_el = null;
	for (var ep = 0; ep < season.length; ep++) {
	    li_el = '<li><div class="row">'+ input_ul.children[0].innerHTML  + ' - Season ' + season[ep].season +
		' Episode ' + season[ep].number + ' - ' + season[ep].title +
		'</div><div class="trakt-id">' + season[ep].ids.trakt + '</div></li>';
	    input_ul.innerHTML += li_el;
	}
    }
}

},{"./Sortable.min":1}]},{},[2]);
