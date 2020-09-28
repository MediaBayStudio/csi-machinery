<?php


// заворачиваем каждое слово и пробел в отдельный span
  // чтобы при наведении можно было сделать равномерный border-bottom
function wrap_words( $start, $end, $text ) {
  return $start . implode( "{$end}{$start} {$end}{$start}", explode( ' ', $text ) ) . $end;
}

// конвертация кВт в лс
function convertToHp( $input ) {
  $converting = preg_replace( '/кВт/', 'л.с.', $input );

  $converting = preg_replace_callback( '/\d+/', function( $matches ) {
    return round( (int) $matches[0] * 1.36 );
  }, $converting );

  $converting = ' (' . $converting . ')';

  return $converting;
}

// Загрузка товаров категории каталога
function load_catalog( $term_id, $post_offset=0, $posts_per_page=12 ) {
  if ( $_POST ) {
    $term_id = $_POST['termId'];
    $post_offset = $_POST['postOffset'];
    $posts_per_page = $_POST['postsPerPage'];
  }


    $request = ['length' => get_category( $term_id )->category_count];  // общее кол-во постов категории

  if ( $term_id ) {
    $products = get_posts( [
      'cat'            => $term_id,
      'offset'         => $post_offset,
      'posts_per_page' => $posts_per_page
    ] );

    if ( $products ) {

      $arr = [];

      foreach ( $products as $product ) {
        $elem = [
          'title' => get_the_title( $product ),
          'descr' => get_field( 'product_preview', $product ),
          'src'   => get_the_post_thumbnail_url( $product ),
          'link'  => get_the_permalink( $product )
        ];

        $arr[] = $elem;
      }

      $request['products'] = $arr;
    } else {
      $request['error'] = 'На сервере произошла какая-то ошибка, перезагрузите страницу';
      $request['errorText'] = 'Не удалось получить данные постов';
    }
  } else {
    $request['error'] = 'На сервере произошла какая-то ошибка, перезагрузите страницу';
    $request['errorText'] = 'Не удалось получить данные категории';
  }

  if ( $_POST ) {
    echo json_encode( $request );
  } else {
    return $request;
  }

  die();
}

function the_breadcrumb( $settings ) {

   // получаем номер текущей страницы
  $pageNum = ( get_query_var('paged') ) ? get_query_var('paged') : 1;

   $separator = ' / ';

  // создаем все переменые-аргументы
  $container_start = $settings['container_start'];
  $container_end = $settings['container_end'];
  $links_after = $settings['links_after'];
  $links_before = $settings['links_before'];
  $link_after = $settings['link_after'];
  $link_before = $settings['link_before'];
  $link_class = $settings['link_class'];
  $current_link_class = $settings['current_link_class'];
  $after_links = $settings['after_links'];       //  внутри контейнера и после ссылок
    // container > links + after_links

  if ( $link_class ) {
    $class = 'class="' . $link_class . '"';
  }


  // если главная страница сайта, то ничего не делаем
  if ( is_front_page() ) {
    return;

  } else { // если не главная страница, то создаем конейнер и т.д.

    // выводим начало тега общего контейнера для хлебных крошек
    if ( $container_start ) {
      echo $container_start;
    }
    // выводим начало тега контейнера только для списка крошек
    if ( $links_before ) {
      echo $links_before;
    }

    // выводим ссылку на главную страницу
    echo "{$link_before}<a href=' " . site_url() . " ' {$class}><span class='breadcrumbs__text'>Главная</span></a>{$link_after}";
    echo $separator;

    if (  is_single() ) { // если страница с сзаписью, то ищем ее категории
      $current_category = get_the_category()[0];
      $parent_category = get_term( $current_category->parent );

      // выводим оодительскую категорию
      if ( $parent_category ) {
        echo "{$link_before}<a href=' " . get_category_link( $parent_category ) . " ' {$class}><span class='breadcrumbs__text'>{$parent_category->name}</span></a>{$link_after}";
        echo $separator;
      }

      // выводим категорию
      echo "{$link_before}<a href=' " . get_category_link( $current_category ) . " ' {$class}><span class='breadcrumbs__text'>{$current_category->name}</span></a>{$link_after}";
      echo $separator;

      // выводим название статьи
      $class = 'class="' . $link_class . ' current"';
      echo "{$link_before}<a href='#' {$class}><span class='breadcrumbs__text'>" . get_the_title() . "</span></a>{$link_after}";

      // выводим закрывающий тег обертки-ссылок
      if ($links_after) {
        echo $links_after;
      }

      // выводим еще какой-то элемент
      if ( $after_links ) {
        echo $after_links;
      }

            // выводим закрывающий тег обертки
      if ( $container_end ) {
        echo $container_end;
      }

     } elseif ( is_page() ) { // если страница
      $current_page_id = get_post(0)->ID;
      $current_page_parents = get_ancestors( $current_page_id, 'page' );

      if ( $current_page_parents ) {  // если есть родительские страницы, то будем их выводить (кроме главной)
        foreach ( $current_page_parents as $parent_page_id ) {

          $page = get_post( $parent_page_id );
          $page_name = $page->post_name;  // index

          if ( $page_name !== 'index' ) {
            $page_title = $page->post_title;
            $page_link = get_permalink( $parent_page_id );

            echo "{$link_before}<a href='{$page_link}' $class>$page_title</a>{$link_after}";
          }

                  }
      }

      if ( $current_link_class ) {
        $class = 'class="' . $link_class . ' ' . $current_link_class . '"';
      }

      echo "{$link_before}<a href='#' {$class}>" . get_the_title() . "</a>{$link_after}"; // выводим текущую страницу

      // выводим закрывающий тег обертки-ссылок
      if ( $links_after ) {
        echo $links_after;
      }

      // выводим еще какой-то элемент
      if ( $after_links ) {
        echo $after_links;
      }

      // выводим закрывающий тег обертки
      if ( $container_end ) {
        echo $container_end;
      }

     } elseif ( is_category() ) {  // если страница категории
      $current_category = get_category( get_query_var('cat') );
      $parent_category = get_term( $current_category->parent );

      // выводим категорию-родитель
      if ( ! is_wp_error( $parent_category ) ) {
        if ( is_category($parent_category) ) {
          $class = 'class="' . $link_class . ' current"';
        }
        echo "{$link_before}<a href='" . get_category_link( $parent_category ) . "' {$class}><span class='breadcrumbs__text'>{$parent_category->name}</span></a>{$link_after}";
      }

      // выводим категорию
      if ( is_wp_error( $parent_category ) || ! is_category($parent_category) ) {
        $class = 'class="' . $link_class . ' current"';
        echo "{$link_before}<a href='" . get_category_link( $current_category ) . "' {$class}><span class='breadcrumbs__text'>{$current_category->name}</span></a>{$link_after}";
      }

      // выводим закрывающий тег обертки-ссылок
      if ($links_after) {
        echo $links_after;
      }

      // выводим еще какой-то элемент
      if ($after_links) {
        echo $after_links;
      }

      // выводим закрывающий тег обертки
      if ($container_end) {
        echo $container_end;
      }
    }
  }
}

add_action( 'wp_ajax_nopriv_loadcatalog', 'load_catalog' ); 
add_action( 'wp_ajax_loadcatalog', 'load_catalog' );

// Отключаем разные стандартные скрипты и стили wp
add_action( 'init', function() {
  // Отключаем wp-emoji
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  // Отключаем скрипты wp-embed
  remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
  remove_action( 'wp_head', 'wp_oembed_add_host_js' );
  // Отключаем гутенберг
  if ( 'disable_gutenberg' ) {
    add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
    remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );
    add_action( 'admin_init', function() {
      remove_action( 'admin_notices', ['WP_Privacy_Policy_Content', 'notice'] );
      add_action( 'edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice'] );
    } );
  }
} );

// Функция подключения стилей
function enqueue_style( $style_name, $widths ) {
  if ( is_string( $widths ) ) {
    if ( $style_name === 'hover' ) {
      wp_enqueue_style( "{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null, "(hover), (min-width:1024px)" );
    } else {
      wp_enqueue_style( "{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null );
    }
  } else {
    foreach ( $widths as $width ) {
      if ( $width !== "0" ) {
        $media = $width - 0.02;
        // если размер файла равен 0, то не подключаем его
        if (filesize(get_template_directory() . '/css/' . $style_name . '.' . $width . '.css') === 0) {
          continue;
        }
        wp_enqueue_style( "{$style_name}-{$width}px", get_template_directory_uri() . "/css/{$style_name}.{$width}.css", [], null, "(min-width: {$media}px)" );
      } else {
        wp_enqueue_style( "{$style_name}-page", get_template_directory_uri() . "/css/{$style_name}.css", [], null );
      }
    }
  }
}

// Подключаем свои стили и скрипты
add_action( 'wp_enqueue_scripts', function() {
  $screen_widths = ['0', '420', '576', '768', '1024', '1440'];  // на каких экранах подключать css
  wp_enqueue_style( 'theme-style', get_stylesheet_uri() );        // подключить стиль темы (default)

  // подключаем стили с помощью своей функции
  enqueue_style( 'style', $screen_widths );

  // Подклчаем стили для разных страниц
  if ( is_page_template( 'index.php' ) ) {
    enqueue_style( 'index', $screen_widths );
  }
  if ( is_page_template( 'about.php' ) ) {
    enqueue_style( 'about', $screen_widths );
  }
  if ( is_category() || is_single() ) { // в каталое и товаре грузим их стили
    enqueue_style( 'catalog', $screen_widths );
  }

  enqueue_style( 'hover', '' ); // подключаем стили для эффектов при наведении

  // Подключаем скрипты циклом
  $scripts = [
    'slick.min',
    'jquery.validate.min',
    'lazy.min',
    'simpleMenu.min',
    // 'simplePopup.min',
    // 'jquery-settings',
    'main'
  ];

  foreach ( $scripts as $script_name ) {
    if ( ( $script_name === 'slick.min' || $script_name === 'jquery.validate.min' || $script_name === 'jquery-settings' ) && is_category() ) {
      continue;
    }

    if ( $script_name === 'slick.min' && is_single() ) {
      continue;
    }
    wp_enqueue_script( "{$script_name}", get_template_directory_uri() . "/js/{$script_name}.js", [], null );
  }

  // Отключаем стандартные jquery, jquery-migrate
  wp_deregister_script( 'jquery-core' );
  wp_deregister_script( 'jquery' );

  // Подключаем jquery через cdn
  wp_register_script( 'jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', false, null, true );
  wp_register_script( 'jquery', false, ['jquery-core'], null, true );
  wp_enqueue_script( 'jquery' );
} );

// Убираем id и type в тегах script, добавляем нужным атрибут defer
  add_filter('script_loader_tag',   function( $html, $handle ) {

    $defer_scripts = [
      'slick.min',
      'jquery.validate.min',
      'lazy.min',
      'simpleMenu.min',
      // 'simplePopup.min',
      // 'jquery-settings',
      'main'
    ];

    foreach( $defer_scripts as $id ) {
      if ( $id === $handle ) {
        $html = str_replace( ' src', ' defer src', $html );
      }
    }

    $html = str_replace( " id='$handle-js' ", '', $html );
    $html = str_replace( " type='text/javascript'", '', $html );

     return $html;
  }, 10, 2);

// Убираем id и type в тегах style
  add_filter( 'style_loader_tag', function( $html, $handle ) {
    $html = str_replace( " id='$handle-css' ", '', $html );
    $html = str_replace( " type='text/css'", '', $html );
    return $html;
  }, 10, 2 );

// необходимые поддержки темой
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );

  // удаление ненужных миниатюр
add_filter( 'intermediate_image_sizes', function ( $sizes ){
  // размеры которые нужно удалить
  return array_diff( $sizes, [
    'thumbnail',
    'medium',
    'medium_large',
    'large',
    '1536x1536',
    '2048x2048',
  ] );
} );

      /* Contact Form 7 */
// Отключаем весь css-файл CF7
  add_filter( 'wpcf7_load_css', '__return_false' );

// Отключаем генерацию некоторых лишнех тегов
  add_filter( 'wpcf7_autop_or_not', '__return_false' );

    /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    echo "<input type='text' name='{$id}' value='" . esc_attr( get_option( $id ) ) . "'>";
  }

  add_action( 'admin_init', function() {
    $options = [
      'tel'     =>  'Телефон',
      'address' =>  'Адрес',
      'email'   =>  'E-mail',
      'coords'  =>  'Координаты маркера на карте',
      'zoom'    =>  'Увеличение карты'
    ];

    foreach ($options as $id => $name) {
      $my_id = "contacts_{$id}";

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );

// Меню на сайте
  add_action( 'after_setup_theme', function() {
    register_nav_menus( [
      'header_menu' =>  'Меню в шапке сайта',
      'mobile_menu' =>  'Мобильное меню на сайте',
      'footer_menu' =>  'Меню в подвале сайта'
    ] );
  } );

// добавить класс для ссылки в меню (a)
  add_filter( 'nav_menu_link_attributes', function( $atts, $item ) {
    $atts['class'] = 'nav__link';
    $item->title = wrap_words( '<span class="u">', '</span>', $item->title );
    return $atts;
  }, 10, 2);  

// задать свои классы для пунктов меню (li)
  add_filter( 'nav_menu_css_class', function( $classes, $item, $args, $depth ) {
    $classesArray = ['nav__list-item'];

    foreach ( $classes as $class ) {
      if ( $class === 'current-menu-item' ) {
        $classesArray[] = 'current';
      }
    }
    return $classesArray;
  }, 10, 4);

// убрать id у пунктов меню
  add_filter( 'nav_menu_item_id', function( $menu_id, $item, $args, $depth ) {
    return '';
  }, 10, 4);


// убрать описание для таксономий в админке
  add_action( 'admin_head', function() {
    print
    '<style>
      .term-description-wrap {display:none}
    </style>';
  } );



add_action( 'init', function() {
  remove_post_type_support( 'page', 'editor' );
  // add_post_type_support( 'page', 'thumbnail' );
  remove_post_type_support( 'page', 'revisions' );
  remove_post_type_support( 'page', 'comments' );

  remove_post_type_support( 'post', 'editor' );

  register_taxonomy( 'post_tag', ['post'], [
    'public'=> false,
  ] );

  register_taxonomy( 'about_company', ['page'], [
    'label'                 => '', // определяется параметром $labels->name
    'labels'                => [
      'name'              => 'О компании',
      'singular_name'     => 'О компании',
      'search_items'      => 'Найти',
      'all_items'         => 'Все',
      'view_item '        => 'Показать',
      'parent_item'       => 'Родитель',
      'parent_item_colon' => 'Родитель:',
      'edit_item'         => 'Изменить',
      'update_item'       => 'Обносить',
      'add_new_item'      => 'Добавить',
      'new_item_name'     => 'Добавить',
      'menu_name'         => 'О компании',
    ],
    'hierarchical'          => false,
    'meta_box_cb'           => false
  ] );

  register_post_type( 'partners_company', [
    'label'  => null,
    'labels' => [
      'name'               => 'Партнеры',
      'singular_name'      => 'Партнер',
      'add_new'            => 'Добавить партнера',
      'add_new_item'       => 'Добавление партнера',
      'edit_item'          => 'Редактирование партнера',
      'new_item'           => 'Новый партнер',
      'view_item'          => 'Смотреть партнера',
      'search_items'       => 'Искать партнера',
      'not_found'          => 'Не найдено',
      'not_found_in_trash' => 'Не найдено в корзине',
      'parent_item_colon'  => '',
      'menu_name'          => 'Партнеры',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => null,
    'rest_base'           => null,
    'menu_position'       => null,
    'menu_icon'           => null, 
    'hierarchical'        => false,
    'supports'            => ['title'],
    'taxonomies'          => [],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true,
  ] );

} );


add_filter( 'taxonomy_labels_'.'category', 'change_labels_category' );
function change_labels_category( $labels ) {

  // Запишем лейблы для изменения в виде массива для удобства
  $my_labels = [
    'name'                  => 'Категории',
    'singular_name'         => 'Категория',
    'search_items'          => 'Поиск категорий',
    'all_items'             => 'Все категории',
    'parent_item'           => 'Родительская категория',
    'parent_item_colon'     => 'Родительская категория:',
    'edit_item'             => 'Изменить категорию',
    'view_item'             => 'Просмотреть категорию',
    'update_item'           => 'Обновить категорию',
    'add_new_item'          => 'Добавить новую категорию',
    'new_item_name'         => 'Название новой категории',
    'not_found'             => 'Категории не найдены',
    'no_terms'              => 'Категорий нет',
    'items_list_navigation' => 'Навигация по списку категорий',
    'items_list'            => 'Список категорий',
    'back_to_items'         => '← Назад к категориям',
    'menu_name'             => 'Категории',
  ];

  return $my_labels;
}

// Переименовываем записи
add_filter( 'post_type_labels_post', 'rename_posts_labels' );
function rename_posts_labels( $labels ){

  $new = [
    'name'                  => 'Товары',
    'singular_name'         => 'Товары',
    'add_new'               => 'Добавить товар',
    'add_new_item'          => 'Добавить товар',
    'edit_item'             => 'Редактировать товар',
    'new_item'              => 'Новый товар',
    'view_item'             => 'Просмотреть товар',
    'search_items'          => 'Поиск товаров',
    'not_found'             => 'Товаров не найдено.',
    'not_found_in_trash'    => 'Товаров в корзине не найдено.',
    'parent_item_colon'     => '',
    'all_items'             => 'Все товары',
    'archives'              => 'Архивы товаров',
    'insert_into_item'      => 'Вставить в товар',
    'uploaded_to_this_item' => 'Загруженные для этого товара',
    'featured_image'        => 'Миниатюра товара',
    'filter_items_list'     => 'Фильтровать список товаров',
    'items_list_navigation' => 'Навигация по списку товаров',
    'items_list'            => 'Список товаров',
    'menu_name'             => 'Товары',
    'name_admin_bar'        => 'Товар', // пункте "добавить"
  ];

  return (object) array_merge( (array) $labels, $new );
}

// Создание полей по умолчанию в повторителе acf (характеристики товара)
add_filter( 'acf/load_value/key=field_5e7cd0fadd700',  function( $value, $post_id, $field ) {
  if ( get_post_status( $post_id ) === 'auto-draft' ) {

              $props = [
      'Номинальная мощность',
      'Тип двигателя',
      'Цилиндры',
      'Диаметр цилиндра × длина хода',
      'Обороты двигателя',
      'Коэффициент сжатия',
      'Расход топлива',
      'Расход смазочного масла',
      'Выбросы NOx',
      'Высота подъема поршня',
      'Частоты',
      'Среднее эффективное давление',
      'Тепловая эффективность двигателя',
      'Расход дизеля',
      'Расход газа',
      'Давление подачи газа',
      'Коэффицент замещения',
      'Топливо'
    ];

  $value  = [];

    foreach ( $props as $prop ) {
      $value[] = ['field_5e7cd125dd701' => $prop];
    }

  }

  return $value;
}, 10, 3 );


// Создаем новые столбцы с миниатюрами товаров на странице с товарами
add_filter( 'manage_posts_columns', function( $columns ) {
  $num = 2; // после какой по счету колонки вставлять новые

  $new_columns = [
    'img'   => 'Миниатюра'
  ];

  return array_slice( $columns, 0, $num ) + $new_columns + array_slice( $columns, $num );
}, 4 );

// Что будем показывать в новом столбце
add_action( 'manage_posts_custom_column', function( $colname, $post_id ) {
  $fields = get_field( 'post_category', $id );

  if ( $colname === 'img' ) {
    echo get_the_post_thumbnail( $id, [75,75] );
  }
}, 5, 2 );