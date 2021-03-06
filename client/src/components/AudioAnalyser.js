import React, { createRef } from "react";
import Canvas from "./Canvas";
import ProgressBar from "./ProgressBar";
import ThreeBall from "./ThreeBall";
import audioPackage from "../audio/index";
import { playButton, pauseButton, forward } from "../icons";

class AudioAnalyser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension: 2,
      audioData: new Uint8Array(0),
      playing: false,
      song: audioPackage[0],
      duration: 0,
      currentTime: 0,
      vis: this.props.vis,
    };
    this.audioRef = createRef();
    this.gesture = false;
    this.audioPackage = audioPackage;
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  stop() {
    this.audioRef.current.pause();
    this.setState({ ...this.state, playing: false });
    if (this.id) cancelAnimationFrame(this.id);
  }

  start() {
    if (this.id) cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(this.tick);
    this.audioRef.current.play();
    this.setState({ ...this.state, playing: true });
  }

  checkForGesture = () => {
    if (!this.gesture) {
      this.gesture = true;
      this.initAnalyser(this.audioRef);
    }
  };

  toggle = () => {
    this.checkForGesture();
    !this.state.playing ? this.start() : this.stop();
  };

  // setFftSize = () => {
  //   if (!this.analyser) return;
  //   if (this.props.vis === 3) this.analyser.fftSize = 1024;
  //   else this.analyser.fftSize = 64;
  // };

  initAnalyser = () => {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    ///////////

    ///////////
    this.analyser.fftSize = 64;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioCtx.createMediaElementSource(this.audioRef.current);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    ///////////////////////////

    ///////////////////////////
    this.id = window.requestAnimationFrame(this.tick);
    this.setState({
      ...this.state,
      duration: this.audioRef.current.duration,
      currentTime: this.audioRef.current.currentTime,
    });
  };

  tick() {
    if (!this.state.playing) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    if (this.audioRef.current) {
      this.setState({
        ...this.state,
        audioData: this.dataArray,
        currentTime: this.audioRef.current.currentTime,
        duration: this.audioRef.current.duration,
      });
    }
    this.id = window.requestAnimationFrame(this.tick);
  }

  getSongIndex = () => this.audioPackage.indexOf(this.state.song);

  next = async () => {
    if (this.id) cancelAnimationFrame(this.id);
    this.checkForGesture();
    let i = this.getSongIndex();
    i + 1 === audioPackage.length ? (i = 0) : (i += 1);
    await this.setState({
      ...this.state,
      song: audioPackage[i],
      duration: this.audioRef.current.duration,
    });
    this.start();
  };

  back = async () => {
    this.checkForGesture();
    let i = this.getSongIndex();
    i === 0 ? (i = this.audioPackage.length - 1) : (i -= 1);
    await this.setState({
      ...this.state,
      song: audioPackage[i],
      duration: this.audioRef.current.duration,
    });
    this.start();
  };

  disconnect = () => {
    if (this.id) window.cancelAnimationFrame(this.id);
    if (this.analyser) this.analyser.disconnect();
    if (this.source) this.source.disconnect();
  };

  componentWillUnmount() {
    this.disconnect();
  }

  render() {
    return (
      <>
        {this.props.vis !== 3 && (
          <Canvas vis={this.props.vis} audioData={this.state.audioData} />
        )}
        {this.props.vis === 3 && <ThreeBall audioData={this.state.audioData} />}
        <div id="audio-wrap">
          <ProgressBar
            next={this.next}
            currentTime={this.state.currentTime}
            duration={this.state.duration}
          />
          <div id="info">
            <div>Track: {this.state.song.name}</div>
            <div>Artist: {this.state.song.artist}</div>
          </div>
          <div id="controls">
            <div id="backward" onClick={this.back}>
              {forward}
            </div>
            <div onClick={this.toggle}>
              {!this.state.playing ? playButton : pauseButton}
            </div>
            <div onClick={this.next}>{forward}</div>
          </div>
          <audio ref={this.audioRef} src={this.state.song.mp3} controls="" />
        </div>
      </>
    );
  }
}

export default AudioAnalyser;
