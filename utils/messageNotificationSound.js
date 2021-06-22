const messageNotificationSound = (senderName) => {
  const sound = new Audio('/notification.wav');
  sound && sound.play();
  if (senderName) {
    document.title = `New message from ${senderName}`;
    // means when the tab is open
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        document.title = 'Messages';
      }, 5000);
    }
  }
};

export default messageNotificationSound;
