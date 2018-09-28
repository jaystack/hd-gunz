export const playSound = sound => {
  const audio = new Audio(sound);
  audio.addEventListener(
    'error',
    function(error) {
      console.log(error);
    },
    false
  );

  audio.play();
};
