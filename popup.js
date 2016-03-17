/* Our Task Object */
var Timer = function() {
    /* Properties */
    this.stopped = false;
    this.paused = false;
    this.time_worked = {
        total: 0,
        hours: '00',
        minutes: '00',
        seconds: '00'
    };
    this.time_stopped = {
        total: 0,
        hours: '00',
        minutes: '00',
        seconds: '00'
    };
};

Timer.prototype = {
    toTimeString: function(time) {
        time.hours = (Math.floor(time.total/1000/60/60) % 24);
        time.minutes = (Math.floor(time.total/1000/60) % 60);
        time.seconds = (Math.floor(time.total/1000) % 60);
        for (uom in time) {
            if (uom == 'total') continue;
            if (time.hasOwnProperty(uom)) {
                if (time[uom].toString().length < 2) {
                    time[uom] = '0' + time[uom];
                }
            }
        }
        return time.hours + ':' + time.minutes + ':' + time.seconds;
    },
    reset: function() {
        if (confirm('Reset task timer?')) {
            this.play();
            this.resume();
            this.time_stopped.total = 0;
            this.time_worked.total = 0;
        }
    },
    interrupt: function() {
        if (this.paused) return;
        this.stopped = true;
        document.getElementById('interrupt').style.display = 'none';
        document.getElementById('resume').style.display = '';
    },
    resume: function() {
        if (this.paused) return;
        this.stopped = false;
        document.getElementById('resume').style.display = 'none';
        document.getElementById('interrupt').style.display = '';
    },
    pause: function() {
        this.paused = true;
        document.getElementById('play').style.display = '';
        document.getElementById('pause').style.display = 'none';
    },
    play: function() {
        this.paused = false;
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = '';
    },
    tick: function() {
        if (this.paused) {
            return;
        } else if (this.stopped) {
            this.time_stopped.total += 1000;
        } else {
            this.time_worked.total += 1000;
        }
        document.getElementById('time_worked').innerHTML = this.toTimeString(this.time_worked);
        document.getElementById('time_stopped').innerHTML = this.toTimeString(this.time_stopped);
    }
};

var task = new Timer();
var play = document.getElementById('play');
var pause = document.getElementById('pause');
var resume = document.getElementById('resume');
var interrupt = document.getElementById('interrupt');
var reset = document.getElementById('reset');

play.addEventListener('click', function() {
    task.play();
});
pause.addEventListener('click', function() {
    task.pause();
});
resume.addEventListener('click', function() {
    task.resume();
});
interrupt.addEventListener('click', function() {
    task.interrupt();
});
reset.addEventListener('click', function() {

    task.reset();
});

setInterval(function() {
    task.tick();
}, 1000);
