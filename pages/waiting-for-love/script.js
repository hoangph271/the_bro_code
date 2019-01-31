const D_DAY = new Date(2019, 1, 10, 16, 0, 0);
const MISSES = [
  {
    id: 1,
    her: 'I miss your smell',
    me: 'I miss your breath...!',
    src: './A Thousand Years - Christina Perri (NhacPro.net).mp3',
    title: 'A thousand years - Christina Perri',
  },
  {
    id: 2,
    me: `I miss the way you turn away and cover your head when you're shy...!`,
  },
];
/* global Vue */
new Vue({
  el: '#app',
  data: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    paused: true,
    misses: MISSES,
    audio: new Audio(),
    srcId: 0,
    title: 'Back To You Countdown',
  },
  mounted: function() {
    this.updateTimer();
  },
  methods: {
    updateTimer: function() {
      const now = new Date();
      const timeLeft = this.getTimeLeft(now, D_DAY);
      this.days = timeLeft.days;
      this.hours = timeLeft.hours;
      this.minutes = timeLeft.minutes;
      this.seconds = timeLeft.seconds;
      if (now.getTime() < D_DAY.getTime()) {
        setTimeout(this.updateTimer, 1000);
      } else {
        // TODO: Set final text
      }
    },
    getTimeLeft: function (from, to) {
      const distance = to.getTime() - from.getTime();
      const days = this.paddedTwo(Math.floor(distance / (1000 * 60 * 60 * 24)));
      const hours = this.paddedTwo(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = this.paddedTwo(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = this.paddedTwo(Math.floor((distance % (1000 * 60)) / 1000));

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    },
    paddedTwo: function (number) {
      return String(number).padStart(2, '0');
    },
    toggleMusic: function({ id, src, title }) {
      if (!id || !src) return;

      if (id != this.srcId) {
        this.srcId = id;
        this.audio.src = src;
        this.audio.play();
        this.paused = false;
        this.title = title;
        return;
      }

      if (this.paused) {
        this.audio.play();
        this.paused = false;
        this.title = title;
      } else {
        this.audio.pause();
        this.paused = true;
        this.title = 'Back To You Countdown';
      }
    }
  }
});