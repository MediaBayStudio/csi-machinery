<!DOCTYPE html>
<html lang="ru-RU">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <meta name="description" content="">
  <meta name="keywords" content="">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri() . "/apple-touch-icon.png" ?>">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri() . "/favicon-32x32.png "?>">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri() . "/favicon-16x16.png" ?>">
  <link rel="manifest" href="<?php echo get_template_directory_uri() . "/site.webmanifest" ?>">
  <link rel="mask-icon" href="<?php echo get_template_directory_uri() . "/safari-pinned-tab.svg" ?>" color="#16656A ">
  <meta name="msapplication-TileColor" content="#16656A">
  <meta name="theme-color" content="#000000">

  <?php
    wp_head();
    require 'layouts/_info.php';
  ?>
</head>

<body>
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
    <a href="tel:<?php echo $tel_dry; ?>" class="tel-block hdr__tel-block">
      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" fill="none" class="tel-block__icon"><path class="tel-icon__path" d="M7.869 5.961c-.204-.226-.45-.347-.711-.347-.259 0-.507.119-.719.345l-.665.706-.162-.09-.208-.119c-.623-.421-1.188-.97-1.731-1.68-.263-.354-.44-.652-.568-.954.172-.168.332-.343.488-.511l.177-.19c.442-.47.442-1.08 0-1.55l-.574-.612-.196-.213-.395-.417c-.204-.215-.448-.329-.705-.329-.257 0-.505.114-.715.329l-.004.004-.715.768c-.269.287-.423.636-.456 1.042-.05.654.13 1.263.269 1.662.341.979.85 1.886 1.609 2.858.921 1.172 2.03 2.097 3.296 2.749.484.244 1.13.533 1.851.582l.133.004c.486 0 .894-.186 1.214-.556l.008-.011c.109-.141.236-.269.368-.405l.273-.289c.208-.231.318-.5.318-.775 0-.278-.111-.544-.324-.768l-1.155-1.234z" fill="#E5E5E5"/></svg>
      <span class="tel-block__number"><?php echo $tel; ?></span>
    </a>

    <?php require 'layouts/_mobile-menu.php'; ?>

    <button type="button" class="burger">
      <svg width="32" height="17" viewBox="0 0 32 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg">
        <path class="burger__line top-line" d="M1 15.4944C4.43001 14.0762 6.69983 13.0062 10.5122 13C14.9482 12.9928 17.7867 15.6376 22.2195 15.4944C26.1033 15.3689 27.7052 14.757 31 13" stroke="#16656A" stroke-width="2" stroke-linejoin="round"/>
        <path class="burger__line middle-line" d="M1 8.99439C4.43001 7.57617 6.69983 6.50617 10.5122 6.50001C14.9482 6.49285 17.7867 9.13762 22.2195 8.99439C26.1033 8.86889 27.7052 8.25696 31 6.50001" stroke="#16656A" stroke-width="2" stroke-linejoin="round"/>
        <path class="burger__line top-line" d="M1 3.49439C4.43001 2.07617 6.69983 1.00617 10.5122 1.00001C14.9482 0.992848 17.7867 3.63762 22.2195 3.49439C26.1033 3.36889 27.7052 2.75696 31 1.00001" stroke="#16656A" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </button>
  </header>