export const setTrack = (track) => async (dispatch) => {
  // dispatch(getAudioAnalysis(track.id));
  dispatch({
    type: "SET_TRACK",
    payload: track,
  });
};
