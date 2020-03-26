let form;

$('.field__inp').on('input', function() {
  if ($(this).val() !== '') {
    $(this).next('.field__text').addClass('focused');
  } else {
    $(this).next('.field__text').removeClass('focused');
  }
})