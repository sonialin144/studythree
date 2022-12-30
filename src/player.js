new Vue({
    el: "#player",
    data() {
      return {
        audio: null,
        currentTime: null,
        isTimerPlaying: false,
        tracks: [
          {
            name: "a maid costume on my wardrobe",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
          },
          {
            name: "...and I will fall in concrete",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
          },
          {
            name: "dont hurt me anymore",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
          },
          {
            name: "the m show fanclub",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
          },
          {
            name: "assisted homicide at 9pm",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
          },
          {
            name: "i can see them, but you dont...",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
          },
          {
            name: "恋に落ちた時",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
          },
          {
            name: "hate me more",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          },
          {
            name: "dangerous loneliness",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          },
          {
            name: "おそるおそる",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          },
          {
            name: "friday night coffee",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          },
        ],
        currentTrack: null,
        currentTrackIndex: 0,
      };
    },
    methods: {
        play() {
            if (this.audio.paused) {
              this.audio.play();
              this.isTimerPlaying = true;
            } else {
              this.audio.pause();
              this.isTimerPlaying = false;
            }
          },
          prevTrack() {
            if (this.currentTrackIndex > 0) {
              this.currentTrackIndex--;
            } else {
              this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
          },
          nextTrack() {
            if (this.currentTrackIndex < this.tracks.length - 1) {
              this.currentTrackIndex++;
            } else {
              this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
          },
          resetPlayer() {
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
              if(this.isTimerPlaying) {
                this.audio.play();
              } else {
                this.audio.pause();
              }
            }, 300);
          },
        },
        created() {
          let vm = this;
          this.currentTrack = this.tracks[0];
          this.audio = new Audio();
          this.audio.src = this.currentTrack.source;
          this.audio.onended = function() {
            vm.nextTrack();
            this.isTimerPlaying = true;
          };
    
        }
})