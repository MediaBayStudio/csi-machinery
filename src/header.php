<!DOCTYPE html>
<html lang="ru-RU">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
<?php 

  $fonts = [
    "Geometria.woff",
    "Geometria-Medium.woff",
    "Geometria-Bold.woff"
    // "SegoeUI-Bold.woff"
  ];

  foreach ($fonts as $font) : ?>
  <link rel="preload" href="<?php echo get_template_directory_uri() . "/fonts/{$font}" ?>" as="font" type="font/woff" crossorigin>
<?php endforeach;
  $bodyClass = is_404() ? ' class="page404"' : '';
?>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#16656A">
  <meta name="msapplication-TileColor" content="#16656A">
  <meta name="theme-color" content="#000000">
  <script id="page-utils">
    const DIR = "<?php echo get_template_directory_uri(); ?>",
      SITEURL = "<?php echo site_url(); ?>";
  </script>
  <?php
    wp_head();
    require 'layouts/_info.php';
  ?>
</head>

<body<?php echo $bodyClass ?>>
  <noscript>
    <!-- <noindex class="noscript"> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.
    <!-- </noindex> -->
  </noscript>
  <header class="hdr container flex">
    <a href="/" class="hdr__logo logo" title="На главную">
      <img src="#" data-src="<?php echo get_template_directory_uri() . '/img/logo-hdr.svg' ?>" alt="Логотип C.S.I. Machinery" class="logo__img lazy">
    </a>
    <?php 
      wp_nav_menu([
        'theme_location'  => 'header_menu',
        'container'       => 'nav',
        'container_class' => 'nav hdr__nav',
        'menu_class'      => 'nav__list',
        'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
      ]);
    ?>
    <a href="tel:<?php echo $tel_dry; ?>" class="tel hdr__tel">
      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" fill="none" class="tel__icon"><path class="tel-icon__path" d="M7.869 5.961c-.204-.226-.45-.347-.711-.347-.259 0-.507.119-.719.345l-.665.706-.162-.09-.208-.119c-.623-.421-1.188-.97-1.731-1.68-.263-.354-.44-.652-.568-.954.172-.168.332-.343.488-.511l.177-.19c.442-.47.442-1.08 0-1.55l-.574-.612-.196-.213-.395-.417c-.204-.215-.448-.329-.705-.329-.257 0-.505.114-.715.329l-.004.004-.715.768c-.269.287-.423.636-.456 1.042-.05.654.13 1.263.269 1.662.341.979.85 1.886 1.609 2.858.921 1.172 2.03 2.097 3.296 2.749.484.244 1.13.533 1.851.582l.133.004c.486 0 .894-.186 1.214-.556l.008-.011c.109-.141.236-.269.368-.405l.273-.289c.208-.231.318-.5.318-.775 0-.278-.111-.544-.324-.768l-1.155-1.234z" fill="#E5E5E5"/></svg>
      <span class="tel__number"><?php echo $tel; ?></span>
    </a>

    <?php require 'layouts/_mobile-menu.php'; ?>

    <button type="button" class="burger hdr__burger">
      <svg width="31" height="6" viewBox="0 0 31 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg top">
        <path d="M1 4.3C4.5498 2.9 6.57859 2.00555 10.5498 2C15.1413 2.24498 16.0498 3.90002 21.0501 4.30002C25.0498 4.40002 25.5498 3.90002 30.0501 2.15" class="burger__line"/>
      </svg>
      <svg width="31" height="6" viewBox="0 0 31 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg middle">
        <path d="M1 4.3C4.5498 2.9 6.57859 2.00555 10.5498 2C15.1413 2.24498 16.0498 3.90002 21.0501 4.30002C25.0498 4.40002 25.5498 3.90002 30.0501 2.15" class="burger__line"/>
      </svg>
      <svg width="31" height="6" viewBox="0 0 31 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg bottom">
        <path d="M1 4.3C4.5498 2.9 6.57859 2.00555 10.5498 2C15.1413 2.24498 16.0498 3.90002 21.0501 4.30002C25.0498 4.40002 25.5498 3.90002 30.0501 2.15" class="burger__line"/>
      </svg>
     <!--  <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg top">
        <path d="M1.11133 2.99551C4.28726 1.86094 6.38895 1.00494 9.91892 1.00001C14.0263 0.994281 16.6546 3.1101 20.759 2.99551C24.3551 2.89511 25.8383 2.40557 28.8891 1.00001" class="burger__line"/>
      </svg> -->
      <!-- <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg middle">
        <path d="M1.11133 2.99551C4.28726 1.86094 6.38895 1.00494 9.91892 1.00001C14.0263 0.994281 16.6546 3.1101 20.759 2.99551C24.3551 2.89511 25.8383 2.40557 28.8891 1.00001" class="burger__line"/>
      </svg> -->
      <!-- <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg bottom">
        <path d="M1.11133 2.99551C4.28726 1.86094 6.38895 1.00494 9.91892 1.00001C14.0263 0.994281 16.6546 3.1101 20.759 2.99551C24.3551 2.89511 25.8383 2.40557 28.8891 1.00001" class="burger__line"/>
      </svg> -->
    </button>
  </header>