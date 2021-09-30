export const disableBodyScrollBar = () => {
  document.body.style.height = "100vh";
  document.body.style.overflowY = "hidden";
};

export const enableBodyScrollBar = () => {
  document.body.style.height = "maxContent";
  document.body.style.overflowY = "unset";
};
