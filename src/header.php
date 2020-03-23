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

    $tel = get_option('contacts_tel');
    $tel_dry = preg_replace('/\s/', '', $tel);
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
    <a href="tel:<?php echo $tel_dry; ?>" class="hdr__tel-block">
      <div class="hdr__tel-icon">
        <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" fill="none"><path class="tel-icon__path" d="M7.869 5.961c-.204-.226-.45-.347-.711-.347-.259 0-.507.119-.719.345l-.665.706-.162-.09-.208-.119c-.623-.421-1.188-.97-1.731-1.68-.263-.354-.44-.652-.568-.954.172-.168.332-.343.488-.511l.177-.19c.442-.47.442-1.08 0-1.55l-.574-.612-.196-.213-.395-.417c-.204-.215-.448-.329-.705-.329-.257 0-.505.114-.715.329l-.004.004-.715.768c-.269.287-.423.636-.456 1.042-.05.654.13 1.263.269 1.662.341.979.85 1.886 1.609 2.858.921 1.172 2.03 2.097 3.296 2.749.484.244 1.13.533 1.851.582l.133.004c.486 0 .894-.186 1.214-.556l.008-.011c.109-.141.236-.269.368-.405l.273-.289c.208-.231.318-.5.318-.775 0-.278-.111-.544-.324-.768l-1.155-1.234z" fill="#E5E5E5"/></svg>
      </div>
      <span class="hdr__tel-number"><?php echo $tel; ?></span>
    </a>
    <!-- <button type="button" class="burger">
      <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="burger__line top-line" d="M14.8828 3.34271C13.1213 2.76407 11.5478 2.24715 9.63884 2.25001C6.44683 2.25481 4.49909 3.00793 1.54662 4.14954C1.3229 4.23604 1.0934 4.32478 0.857162 4.41559L0 2.32431C0.248354 2.22884 0.491649 2.13457 0.730934 2.04185C3.6587 0.907353 5.9861 0.00549493 9.63524 1.42999e-05C11.9336 -0.00343751 13.8252 0.618661 15.5246 1.17755C15.5759 1.19444 15.6271 1.21127 15.6781 1.22802C17.4439 1.80803 19.0223 2.30293 20.9345 2.24549C22.7601 2.19065 23.9833 2.03125 25.1137 1.71681C26.2551 1.39932 27.356 0.909495 28.9413 0.123601L30 2.12643C28.3957 2.92179 27.1264 3.49795 25.7551 3.87938C24.3729 4.26386 22.9407 4.43631 21.0065 4.49441C18.6275 4.56588 16.6863 3.93509 14.9318 3.35879L14.8828 3.34271Z" fill="#16656A"/>
        <path class="burger__line middle-line" d="M14.8828 10.0928C13.1213 9.51413 11.5478 8.99721 9.63884 9.00008C6.44683 9.00487 4.49909 9.75799 1.54662 10.8996C1.3229 10.9861 1.0934 11.0748 0.857162 11.1657L0 9.07437C0.248354 8.9789 0.491649 8.88463 0.730934 8.79191C3.6587 7.65741 5.9861 6.75556 9.63524 6.75008C11.9336 6.74662 13.8252 7.36872 15.5246 7.92761C15.5759 7.9445 15.6271 7.96133 15.6781 7.97808C17.4439 8.55809 19.0223 9.05299 20.9345 8.99555C22.7601 8.94071 23.9833 8.78131 25.1137 8.46687C26.2551 8.14938 27.356 7.65956 28.9413 6.87366L30 8.87649C28.3957 9.67185 27.1264 10.248 25.7551 10.6294C24.3729 11.0139 22.9407 11.1864 21.0065 11.2445C18.6275 11.3159 16.6863 10.6852 14.9318 10.1089L14.8828 10.0928Z" fill="#16656A"/>
        <path class="burger__line bottom-line" d="M14.8828 16.8428C13.1213 16.2641 11.5478 15.7472 9.63884 15.7501C6.44683 15.7549 4.49909 16.508 1.54662 17.6496C1.3229 17.7361 1.0934 17.8248 0.857162 17.9157L0 15.8244C0.248354 15.7289 0.491649 15.6346 0.730934 15.5419C3.6587 14.4074 5.9861 13.5056 9.63524 13.5001C11.9336 13.4966 13.8252 14.1187 15.5246 14.6776C15.5759 14.6945 15.6271 14.7113 15.6781 14.7281C17.4439 15.3081 19.0223 15.803 20.9345 15.7456C22.7601 15.6907 23.9833 15.5313 25.1137 15.2169C26.2551 14.8994 27.356 14.4096 28.9413 13.6237L30 15.6265C28.3957 16.4218 27.1264 16.998 25.7551 17.3794C24.3729 17.7639 22.9407 17.9364 21.0065 17.9945C18.6275 18.0659 16.6863 17.4352 14.9318 16.8589L14.8828 16.8428Z" fill="#16656A"/>
      </svg>
    </button> -->
    <button type="button" class="burger">
      <svg width="32" height="17" viewBox="0 0 32 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger__svg">
        <path class="burger__line top-line" d="M1 15.4944C4.43001 14.0762 6.69983 13.0062 10.5122 13C14.9482 12.9928 17.7867 15.6376 22.2195 15.4944C26.1033 15.3689 27.7052 14.757 31 13" stroke="#16656A" stroke-width="2" stroke-linejoin="round"/>
        <path class="burger__line middle-line" d="M1 8.99439C4.43001 7.57617 6.69983 6.50617 10.5122 6.50001C14.9482 6.49285 17.7867 9.13762 22.2195 8.99439C26.1033 8.86889 27.7052 8.25696 31 6.50001" stroke="#16656A" stroke-width="2" stroke-linejoin="round"/>
        <path class="burger__line top-line" d="M1 3.49439C4.43001 2.07617 6.69983 1.00617 10.5122 1.00001C14.9482 0.992848 17.7867 3.63762 22.2195 3.49439C26.1033 3.36889 27.7052 2.75696 31 1.00001" stroke="#16656A" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </button>
  </header>