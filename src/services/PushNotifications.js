function onDeviceReady() {

  console.log('Cordova initialised, plugins are available')

  const push = PushNotification.init({
    android: {},
    ios: {
      alert: 'true',
      badge: true,
      sound: 'false'
    },
  });

  push.on('registration', data => {
    // store registration on server side
    console.log('registration id', data.registrationId);
    console.log('registration type', data.registrationType);
  });

  push.on('notification', data => {
    console.log(data.message);
    console.log(data.title);
    console.log(data.count);
    console.log(data.sound);
    console.log(data.image);
    console.log(data.additionalData);
    alert(JSON.stringify(data))
  });
}

console.log('PushNotifications')

document.addEventListener('deviceready', onDeviceReady, false);

export default {}