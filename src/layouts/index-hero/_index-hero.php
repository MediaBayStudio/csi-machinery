<section class="index-hero container sect">
  <div class="index-hero__slider">
    <?php 
      $index_hero_fields = get_field('index_hero_fields');
      $index_hero_slides = $index_hero_fields['slides_repeater'];
      
      for ($i = 0; $i < count($index_hero_slides); $i++) { 
        $slide = $index_hero_slides[$i]['slide'];

        $heading = ($i === 0) ? 'h1' : 'h2';
        // $lazy_class = ($i === 0) ? ' lazy_fast' : ' lazy';
        $lazy_class = ' lazy';

        $logo = ($slide['logo']) ? "<img src='#' data-src='" . get_template_directory_uri() . "/img/logo-white.svg' alt='Логотип C.S.I. Machinery' class='index-hero__slide-logo lazy'>" : '';

        $img_320 = $slide['img_320']['url'];
        $img_1440 = $slide['img_1440']['url'];

        echo
          "<div class='index-hero__slide fxdc{$lazy_class}' data-src='url($img_320), url(" . get_template_directory_uri() . '/img/img-placeholder.svg' . ")' data-media='(min-width: 1023.98px) {url($img_1440), url(" . get_template_directory_uri() . '/img/img-placeholder.svg' . ")}'>
            $logo
            <$heading class='index-hero__slide-title'>$slide[title]</$heading>
          </div>";
      }
    ?>
  </div>
  <div class="index-hero__preview-catalog preview-catalog">
  <?php
    $index_hero_links = $index_hero_fields['links'];
    // var_dump($index_hero_links);

    foreach ( $index_hero_links as $term ) {
      $term_title = $term->name;
      $term_preview_img = get_field( 'category_img', $term );
      $src = $term_preview_img['url'];
      $alt = $term_preview_img['alt'];
      $link = get_category_link( $term->term_id );

      $title_words = wrap_words('<span class="u">', '</span>', $term_title);
      echo
      "
        <a href='$link' class='preview-catalog__link' data-id='$term_id' title='Перейти на страницу $alt'>
          <strong class='preview-catalog__link-title'>$title_words</strong>
          <img src='$src' alt='$alt' class='preview-catalog__link-img'>
        </a>
      ";
    }
  ?>
</div>
</section>