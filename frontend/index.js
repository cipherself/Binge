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
