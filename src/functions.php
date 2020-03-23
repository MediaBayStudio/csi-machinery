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
  wp_enqueue_style('style', get_stylesheet_uri());
  enqueue_style('style', $screen_widths);

  // Подклчаем стили для разных страниц
  if (is_page_template('index')) {
    enqueue_style('index', $screen_widths);
  }
  if (is_page_template('about')) {
    enqueue_style('about', $screen_widths);
  }
  if (is_page_template('catalog') || is_page_template('marine-engines') || is_page_template('marine-generators') || is_page_template('ground-generators') || is_page_template('single')) {
    enqueue_style('catalog', $screen_widths);
  }

  enqueue_style('hover', '');

  // Подключаем скрипты
  $scripts = ['slick.min', 'jquery.validate.min', 'lazyload.min', 'simpleMenu.min', 'simplePopup.min', 'main'];
  foreach ($scripts as $script_name) {
    wp_enqueue_script("{$script_name}-script", get_template_directory_uri() . "./js/{$script_name}.js", [], null);
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
   return str_replace(" id='$handle-css'", '', $html);
}, 10, 2);