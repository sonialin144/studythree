//my code is disgusting im sory
var error_msg = new Vue({
    el: '#error',
    data: {
        title: 'error message',
    },
    methods: {
        play: function(){
            document.querySelector(".play-button").innerHTML = "no";
        },
        study: function(){
            document.querySelector(".error-container").style.display = "none";
            document.querySelector(".play-button").innerHTML = "play";
        }
    }
})
var water = new Vue({
    el: '#water',
    data: {
        title: 'water reminder',
        time_between: 30,
        max_water: 100,
        curr_water: 100,
    },
    created() {
        setInterval(() => {
            if (this.curr_water > 0) {
                this.curr_water -= 1;
            }
        }, (10000/this.time_between)*60)
    },
    methods:{
        drink: function(){
            this.curr_water = this.max_water;
        },
        remindWater: function(){
            if(this.curr_water == 0){
                // exclamattion mark in header (warning)
            }
        },
    }
})

var pomodoro = new Vue({
    el: '#timer',
    data: {
        title: 'timer',
        break_length: 5,
        session_length: 25,
        timer_on: false,
        time_left: 25*60,
        time_display: "",
        session_break_bool: true,
        pause_play: ">",
    },
    created() {
        setInterval(() => {
          this.update_display();
          this.update_timer();
        }, 1000)
    },
    methods: {
        increment_break_len: function(){
            if(this.break_length < 60 && !this.timer_on){
                this.break_length += 1;
                if(!this.session_break_bool){
                    this.time_left = this.break_length*60;
                }
            }
        },
        decrement_break_len: function(){
            if(this.break_length > 0 && !this.timer_on){
                this.break_length -= 1;
                if(!this.session_break_bool){
                    this.time_left = this.break_length*60;
                }
            }
        },
        increment_session_len: function(){
            if(this.session_length < 60 && !this.timer_on){
                this.session_length += 1;
                if(this.session_break_bool){
                    this.time_left = this.session_length*60;
                }
            }
        },
        decrement_session_len: function(){
            if(this.session_length > 0 && !this.timer_on){
                this.session_length -= 1;
                if(this.session_break_bool){
                    this.time_left = this.session_length*60;
                }
            }
        },
        update_display: function(){
            var min = "" + Math.floor(this.time_left/60);
            var sec = "" + (this.time_left%60);
            if(this.time_left/60 < 10){
                min = "0" + min;
            }
            if(this.time_left%60 < 10){
                sec = "0" + sec;
            }
            this.time_display = min + ":" + sec;
        },
        start_timer: function(){
            if(this.session_length != 0 && !this.timer_on){
                this.timer_on = true;
                this.pause_play = "||";
                this.time_left -= 1;
            }
            else{
                 this.timer_on = false;
                this.pause_play = ">";
            }
        },
        update_timer: function(){
            if(this.timer_on){
                this.time_left -= 1;
                if(this.time_left < 0 && this.session_break_bool){
                    this.time_left = this.break_length*60;
                    this.session_break_bool = false;
                }
                if(this.time_left < 0 && !this.session_break_bool){
                    this.time_left = this.session_length*60;
                    this.session_break_bool = true;
                }
            }
        },
        restart_timer: function(){
            if(this.session_break_bool){
                this.time_left = this.session_length*60;
            }
            else{
                this.time_left = this.break_length*60;
            }
        }
    }
})
var todo = new Vue({
    el: '#tasklist',
    data: {
        title: 'todo list',
        tasks: [
            // {name: 'task #1'},
        ]
    },
    created() {
        setInterval(() => {
          this.saveTasks();
        //   this.loadTasks();
          console.log("autosaved tasks");
        }, 1000)
    },
    methods: {
        newItem: function() {
            if(!this.tasks.name) {
                return
            }
            this.tasks.push ({
                name: this.tasks.name,
                del: '',
                checked: false
            });
            this.tasks.name = "";
        },
        deleteItem: function(task){
            this.tasks.splice(this.tasks.indexOf(task), 1);
        },
        saveTasks: function(){
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        loadTasks: function(){
            var savedTasks = JSON.parse(localStorage.getItem('tasks')) || '[]';   
            savedTasks.forEach(element => this.tasks.push({name: element.name, checked: element.checked}));
        },
    }
})

var about_button = document.querySelector("#about-button");
var about_info = document.querySelector("#about-info");

var windowss = document.querySelectorAll(".drag");

window.addEventListener("load", function() {
    about_info.style.visibility = 'hidden';
    document.querySelector("#image").style.display = "none";
    document.querySelector(".rick").style.display = "none";
    document.querySelector(".error-container").style.display = "none";
});

about_button.addEventListener("click", function(){
    if(about_info.style.visibility === 'hidden'){
        about_info.style.visibility = 'visible';
        about_button.style.background = 'beige';
        about_button.style.color = 'black';
        document.getElementById('about-info').className = 'anim';
    }
    else{
        setTimeout(function() {
            about_info.style.visibility = 'hidden';
          }, 1000);
        about_button.style.background = 'black';
        about_button.style.color = 'beige';
        document.getElementById('about-info').className = 'fade';
    }
});


document.querySelector(".memes").addEventListener("dblclick", function() {
    document.querySelector("#image").style.display = "block";

    var subreddit = 'meirl'; 
    var aRandomNum = Math.floor((Math.random() * 25) + 1); 
    
    $.getJSON('http://www.reddit.com/r/'+subreddit+'.json?jsonp=?&show=all&limit=25', function(data) {
        $.each(data.data.children, function(i,item){
            if (i == aRandomNum) {
                $(".meme").remove();
                $("<img class='meme'/>").attr("src", item.data.url).appendTo("#image");
                return false;
            }
        });
    });
    
});
document.querySelector(".secret").addEventListener("dblclick", function() {
    document.querySelector(".rick").style.display = "block";
});

setInterval(()=>{
    var now = new Date();
    var hours = now.getHours();
    if(hours > 12){
        hours -= 12;
    }
    var minutes = now.getMinutes();
    if(minutes < 10){
        minutes = "0" + now.getMinutes();
    }
    document.querySelector(".time").innerHTML = now.toLocaleDateString() + " " + hours + ":" + minutes;}, 1000); // 11/16/2015, 11:18:48 PM

// var dragList = document.querySelectorAll(".drag");
// var zIndexList = Array.from(Array(10).keys());

document.querySelector(".user-enter").addEventListener("click", function(){
    if(document.querySelector(".username").value != null && document.querySelector(".username").value.trim() !== ''){
        // console.log(document.querySelector(".username")[0].value);
        document.querySelector(".user-enter").parentNode.parentNode.style.display = "none";
        // localStorage.setItem('setName', "true");
        localStorage.setItem('name', document.querySelector(".username").value);
        document.querySelector("#name").innerHTML = localStorage.getItem('name');
    }
    else{
        document.querySelector(".username").value = '';
    }
})

window.addEventListener("load", function() {
    //loader 
    setTimeout(()=>document.querySelector(".loader").style.display="none",3000);

    if(localStorage.getItem('name') == ""){
        document.querySelector(".welcome").style.display = "flex";
    }
    else{
        document.querySelector(".welcome").style.display = "none";
        document.querySelector("#name").innerHTML = localStorage.getItem('name') + "'s workspace";
    }
    todo.loadTasks();
    loadWindowPosition();
});

//window position local storage 

function saveWindowPosition(){
    var windows_info = [];
    console.log(windowss);
    windowss.forEach(element => windows_info.push({x: element.style.left, y: element.style.top, display: element.style.display}));
    localStorage.setItem('windowPositions', JSON.stringify(windows_info));
    console.log(windows_info);
}

function loadWindowPosition(){
    var windows_info = JSON.parse(localStorage.getItem('windowPositions')) || '[]'; 
    windowss.forEach(element => {
        element.style.left = windows_info[[].indexOf.call(windowss, element)].x;
        element.style.top = windows_info[[].indexOf.call(windowss, element)].y;
        element.style.display = windows_info[[].indexOf.call(windowss, element)].display;
    });
}
setInterval(() => {
    saveWindowPosition();
    console.log("autosaved window position");
  }, 1000)
// loadTasks: function(){
//     var savedTasks = JSON.parse(localStorage.getItem('tasks')) || '[]';   
//     savedTasks.forEach(element => this.tasks.push({name: element.name, checked: element.checked}));
// },
