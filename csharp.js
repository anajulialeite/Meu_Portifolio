function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'pt',
    includedLanguages: 'en,pt',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
