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
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/1.mp3?raw=true",
          },
          {
            name: "...and I will fall in concrete",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/2.mp3?raw=true",
          },
          {
            name: "dont hurt me anymore",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/3.mp3?raw=true",
          },
          {
            name: "the m show fanclub",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/4.mp3?raw=true",
          },
          {
            name: "assisted homicide at 9pm",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/5.mp3?raw=true",
          },
          {
            name: "i can see them, but you dont...",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/6.mp3?raw=true",
          },
          {
            name: "恋に落ちた時",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/7.mp3?raw=true",
          },
          {
            name: "hate me more",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/8.mp3?raw=true",
          },
          {
            name: "dangerous loneliness",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/9.mp3?raw=true",
          },
          {
            name: "おそるおそる",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/10.mp3?raw=true",
          },
          {
            name: "friday night coffee",
            source: "https://github.com/sonialin144/studythree/blob/9e6a2ace2e42140c62f2f30c8c519160bdf6f486/playlist/11.mp3?raw=true",
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