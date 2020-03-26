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
  <a href="tel:<?php echo $tel_dry; ?>" class="tel-block mobile-menu__tel-block">
    <div class="tel-block__icon"></div>
    <span class="tel-block__number"><?php echo $tel; ?></span>
  </a>
  <a href="mailto:<?php echo $email; ?>" class="email-block mobile-menu__email-block">
    <div class="email-block__icon"></div>
    <span class="email-block__address"><?php echo $email; ?></span>
  </a>
</aside>