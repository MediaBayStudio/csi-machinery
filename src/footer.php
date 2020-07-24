<footer class="ftr container">
  <div class="ftr__top">
    <a href="/" class="ftr__logo logo" title="На главную">
      <img src="#" data-src="<?php echo get_template_directory_uri() . '/img/logo-ftr.svg' ?>" alt="Логотип C.S.I. Machinery" class="logo__img lazy">
    </a>
    <div class="ftr__copyright copyright">
      <span class="copyright__text"><?php echo date('Y'); ?>&copy; C.S.I. Machinery</span>
      <a href="#" rel="noopener noreferrer nofollow" target="_blank" class="copyright__private-policy-link">Политика конфиденциальности</a>
    </div>
  </div>
  <div class="ftr__middle"> <?php 
    wp_nav_menu([
      'theme_location'  => 'footer_menu',
      'container'       => 'nav',
      'container_class' => 'nav ftr__nav',
      'menu_class'      => 'nav__list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ]) ?>
  </div>
  <div class="ftr__bottom"> <?php
    require 'layouts/_info.php' ?>
    <a href="tel:<?php echo $tel_dry; ?>" class="tel ftr__tel">
      <span class="tel__number"><?php echo $tel; ?></span>
    </a>
    <a href="mailto:<?php echo $email; ?>" class="email ftr__email">
      <span class="email__address"><?php echo $email; ?></span>
    </a>
    <div class="dev ftr__dev">
      <span class="dev__text">Разработка &mdash;</span>
      <a href="https://media-bay.ru/" rel="noopener noreferrer nofollow" target="_blank" class="dev__link" title="Перейти на сайт разработчика">media bay</a>
    </div>
  </div>
</footer> <?php
  require 'layouts/_overlay.php';
  require 'layouts/_thanks-popup.php';
  wp_footer() ?>
</body>

</html>