export const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
};
