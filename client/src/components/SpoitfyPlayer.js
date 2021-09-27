// import React, { useEffect, useState } from "react";
// import { openPlayerIcon, playButton, pauseButton, forward } from "../icons";

// import { connect } from "react-redux";
// import { createPlayer, setTrack, getAudioAnalysis } from "../actions";

// const addPlayer = () => {
//   const script = document.createElement("script");
//   script.src = "https://sdk.scdn.co/spotify-player.js";
//   script.async = true;
//   document.body.appendChild(script);
// };

// const initTrack = {
//   name: "",
//   album: {
//     images: [{ url: "" }],
//   },
//   artists: [{ name: "" }],
// };

// const SpotifyPlayer = ({
//   token,
//   createPlayer,
//   player,
//   track,
//   setTrack,
//   getAudioAnalysis,
// }) => {
//   // const [track, setTrack] = useState(initTrack);
//   const [pause, setPaused] = useState(false);
//   // const [is_active, setActive] = useState(false);
//   const [isOpen, setIsOpen] = useState(true);

//   const playPause = () => {
//     if (!player) return;
//     player.togglePlay();
//   };

//   const next = () => {
//     if (!player) return;
//     player.nextTrack();
//   };

//   const back = () => {
//     if (!player) return;
//     player.previousTrack();
//   };

// useEffect(() => {
//   if (!token) return;
//   addPlayer();
//   window.onSpotifyWebPlaybackSDKReady = () => {
//     const plyr = new window.Spotify.Player({
//       name: "Audio Visualizer",
//       getOAuthToken: (cb) => cb(token),
//       volume: 0.5,
//     });

//     // createPlayer(plyr);
//     // console.log("running");

//     plyr.addListener("ready", ({ device_id }) => {
//       // console.log("READY");
//       // console.log(device_id);
//     });

//     plyr.addListener("not_ready", ({ device_id }) => {
//       console.log("NOT READY");
//     });

//     plyr.connect();

//     plyr.addListener("player_state_changed", (state) => {
//       if (!state) return;

//       setTrack(state.track_window.current_track);
//       setPaused(state.paused);
//       // getAudioAnalysis(state.track_window.current_track.id);

//       // plyr.getCurrentState().then((state) => {
//       //   !state ? setActive(false) : setActive(true);
//       // });
//     });
//   };

// return () => {
//   if (player) player.disconnect();
// };
// }, [createPlayer, token, setTrack]);

// this.player.connect();
// console.log(track);

//   return (
//     <div
//       style={
//         isOpen
//           ? { transform: "translateX(0)" }
//           : { transform: "translateX(100%)" }
//       }
//       id="player-wrap"
//     >
//       <div
//         style={
//           isOpen
//             ? { transform: "translateX(0)" }
//             : { transform: "translateX(-50px)" }
//         }
//         onClick={() => setIsOpen(!isOpen)}
//         id="player-toggle"
//       >
//         {isOpen ? "X" : openPlayerIcon}
//       </div>
//       <img alt="album-art" id="album-art" src={track.album.images[0].url} />
//       <div id="info">
//         <div id="name">{track.name}</div>
//         <div id="artist">{track.artists[0].name}</div>
//       </div>
//       <div id="controls">
//         <div onClick={back} id="backward">
//           {forward}
//         </div>
//         <div onClick={playPause}>{pause ? playButton : pauseButton}</div>
//         <div onClick={next}>{forward}</div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => state;

// export default connect(mapStateToProps, {
//   createPlayer,
//   setTrack,
//   getAudioAnalysis,
// })(SpotifyPlayer);

// const connectSpotify = () => {
//   const { accessToken } = this.state;

//   if (window.Spotify !== null) {
//     console.log("were good!");
//     this.player = new window.Spotify.Player({
//       name: "Audio Visualizer",
//       getOAuthToken: (cb) => cb(accessToken),
//     });
//   }

// const state = {
//   player: null,
//   accessToken: spotifyAccessToken,
// };
