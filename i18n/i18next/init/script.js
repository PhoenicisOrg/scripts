i18next.init({
  lng: 'de',
  debug: true,
  resources: {
    en: {
      translation: {
        "Please enter the name of your application": "Please enter the name of your application."
      }
    },
    de: {
      translation: {
        "Please enter the name of your application": "Bitte geben Sie den Namen Ihrer Anwendung ein."
      }
    }
  }
}, function(err, t) {
    if (err) {
        print('Could not load translation', err);
    }
});
