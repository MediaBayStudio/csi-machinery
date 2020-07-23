<aside class="mobile-menu">
  <a href="/" class="mobile-menu__logo">
    <img src="<?php echo get_template_directory_uri() . '/img/logo-hdr.svg' ?>" alt="Логотип C.S.I. Machinery" class="mobile-menu__logo-img">
  </a>
  <?php 
    wp_nav_menu([
      'theme_location'  => 'mobile_menu',
      'container'       => 'nav',
      'container_class' => 'nav mobile-menu__nav',
      'menu_class'      => 'nav__list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ]);
  ?>
  <a href="tel:<?php echo $tel_dry; ?>" class="tel mobile-menu__tel">
    <div class="tel__icon"></div>
    <span class="tel__number"><?php echo $tel; ?></span>
  </a>
  <a href="mailto:<?php echo $email; ?>" class="email mobile-menu__email">
    <div class="email__icon"></div>
    <span class="email__address"><?php echo $email; ?></span>
  </a>
</aside>