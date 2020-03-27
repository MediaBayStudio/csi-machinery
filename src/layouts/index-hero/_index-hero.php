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

        $logo = ($slide['logo']) ? "<img src='" . get_template_directory_uri() . "/img/logo-white.svg' alt='Логотип C.S.I. Machinery' class='index-hero__slide-logo'>" : '';

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

    foreach ($index_hero_links as $link) {
      $term_id = $link->term_id;
      $term_title = $link->name;;
      $img = get_field('category_img', 'post_category_' . $term_id);
      $img_url = $img['url'];
      $img_alt = $term_title;

      echo
      "
        <a href='#' class='preview-catalog__link disabled' data-id='$term_id'>
          <strong class='preview-catalog__link-title'>$term_title</strong>
          <img src='#' data-src='$img_url' alt='$img_alt' class='preview-catalog__link-img lazy'>
        </a>
      ";
    }
  ?>
</div>
</section>