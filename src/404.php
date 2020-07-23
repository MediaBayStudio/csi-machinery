<?php 
  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
  $coords = get_option('contacts_coords');
  $zoom = get_option('contacts_zoom');
  $about_sect_fields = get_field('about_sect');
  get_header();
?>
<section class="p404 container">
  <img src="<?php echo get_template_directory_uri() . '/img/404-img.png'; ?>" alt="Морское судно" title="Морское судно" class="p404__img">
  <span class="p404__suptitle">404</span>
  <h1 class="p404__title">Страница не найдена</h1>
  <p class="p404__descr">Такой страницы на сайте не существует или она еще не создана.</p>
  <a href="/" class="p404__link btn">На главную</a>
</section>

<?php get_footer();