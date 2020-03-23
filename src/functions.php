<?php

// Отключаем разные стандартные скрипты и стили wp
add_action('init', function() {
  // Отключаем wp-emoji
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
  // Отключаем скрипты wp-embed
  remove_action('wp_head', 'wp_oembed_add_discovery_links');
  remove_action('wp_head', 'wp_oembed_add_host_js');
  // Отключаем гутенберг
  if ('disable_gutenberg') {
    add_filter('use_block_editor_for_post_type', '__return_false', 100);
    remove_action('wp_enqueue_scripts', 'wp_common_block_scripts_and_styles');
    add_action('admin_init', function() {
      remove_action('admin_notices', ['WP_Privacy_Policy_Content', 'notice']);
      add_action('edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice']);
    });
  }
});

function enqueue_style($style_name, $widths) {
  if (is_string($widths)) {
    wp_enqueue_style("{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null);
  } else {
    foreach ($widths as $width) {
      if ($width !== "0") {
        $media = $width - 0.02;
      wp_enqueue_style("{$style_name}-{$width}px", get_template_directory_uri() . "/css/{$style_name}.{$width}.css", [], null, "(min-width: {$media}px)");
      } else {
        wp_enqueue_style("{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null);
      }
    }
  }
}

// Подключаем свои стили и скрипты
add_action('wp_enqueue_scripts', function() {
  $screen_widths = ['0', '420', '576', '768', '1024', '1440'];
  wp_enqueue_style('theme-style', get_stylesheet_uri());
  enqueue_style('style', $screen_widths);

  // Подклчаем стили для разных страниц
  if (is_page_template('index.php')) {
    enqueue_style('index', $screen_widths);
  }
  if (is_page_template('about.php')) {
    enqueue_style('about', $screen_widths);
  }
  if (is_page_template('catalog.php') || is_page_template('marine-engines.php') || is_page_template('marine-generators.php') || is_page_template('ground-generators.php') || is_page_template('single.php')) {
    enqueue_style('catalog', $screen_widths);
  }

  enqueue_style('hover', '');

  // Подключаем скрипты
  $scripts = ['slick.min', 'jquery.validate.min', 'lazyload.min', 'simpleMenu.min', 'simplePopup.min', 'main'];
  foreach ($scripts as $script_name) {
    wp_enqueue_script("{$script_name}", get_template_directory_uri() . "/js/{$script_name}.js", [], null);
  }

  // Отключаем стандартные jquery, jquery-migrate
  wp_deregister_script('jquery-core');
  wp_deregister_script('jquery');

  // Подключаем jquery через cdn
  wp_register_script('jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', false, null, true);
  wp_register_script('jquery', false, array('jquery-core'), null, true);
  wp_enqueue_script('jquery');
});

// Убираем лишнее в тегах script
add_filter('script_loader_tag', function($html, $handle) {
  $scripts = ['slick.min', 'jquery.validate.min', 'lazyload.min', 'simpleMenu.min', 'simplePopup.min', 'main'];

  foreach($scripts as $script) {
    if ($script === $handle) {
      return str_replace(' src', ' defer="defer" src', $html);
    }
  }
  return $html;
}, 10, 2);

// Убираем лишнее в тегах style
add_filter('style_loader_tag', function($html, $handle) {
   return str_replace(" id='$handle-css' ", '', $html);
}, 10, 2);


add_theme_support('title-tag');

      /* Contact Form 7 */
// Отключаем весь css-файл CF7
  add_filter('wpcf7_load_css', '__return_false');

// Отключаем генерацию некоторых лишнех тегов
  add_filter('wpcf7_autop_or_not', '__return_false');

    /* Настройка контактов в панели настройки->общее */
// Создание нужных полей
  function contatcs_options() {
    add_settings_field('tel', 'Телефон', 'display_tel', 'general');
    register_setting('general', 'contacts_tel');

    add_settings_field('address', 'Адрес', 'display_address', 'general');
    register_setting('general', 'contacts_address');
    
    add_settings_field('email', 'E-mail', 'display_email', 'general');
    register_setting('general', 'contacts_email');

    add_settings_field('coords', 'Координаты маркера на карте', 'display_coords', 'general');
    register_setting('general', 'contacts_coords');

    add_settings_field('zoom', 'Увеличение карты', 'display_zoom', 'general');
    register_setting('general', 'contacts_zoom');
  }

// Функции вывода нужных полей
  function display_tel() {
    echo "<input type='text' name='contacts_tel' value='" . esc_attr(get_option('contacts_tel')) . "'>";
  }

  function display_address() {
    echo "<input type='text' name='contacts_address' value='" . esc_attr(get_option('contacts_address')) . "'>";  
  }

  function display_email() {
    echo "<input type='text' name='contacts_email' value='" . esc_attr(get_option('contacts_email')) . "'>";  
  }

  function display_coords() {
    echo "<input type='text' name='contacts_coords' value='" . esc_attr(get_option('contacts_coords')) . "'>";  
  }

  function display_zoom() {
    echo "<input type='text' name='contacts_zoom' value='" . esc_attr(get_option('contacts_zoom')) . "'>";  
  }


// Хук для создания опций
  add_action( 'admin_init','contatcs_options' );

  add_action('after_setup_theme', 'regiser_site_menu');

  function regiser_site_menu() {
    register_nav_menu('header_menu', 'Меню в шапке сайта');
    register_nav_menu('mobile_menu', 'Мобильное меню на сайте');
    register_nav_menu('footer_menu', 'Меню в подвале сайта');
  }

  add_filter('nav_menu_css_class', function($classes, $item, $args, $depth) {
    return ['nav__list-item'];
  }, 10, 4);

  add_filter('nav_menu_item_id', function($menu_id, $item, $args, $depth) {
    return '';
  }, 10, 4);

add_action('init', function() {
  remove_post_type_support('page', 'editor');
  remove_post_type_support('page', 'thumbnail');
  remove_post_type_support('page', 'revisions');
  remove_post_type_support('page', 'comments');
});

