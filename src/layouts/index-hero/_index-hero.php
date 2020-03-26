<section class="index-hero container sect">
  <div class="index-hero__slider">
    <?php 
      $index_hero_fields = get_field('index_hero_fields');
      $index_hero_slides = $index_hero_fields['slides_repeater'];
      
      // var_dump($index_hero_fields);
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
    $index_hero_links = $index_hero_fields['links_repeater'];

    foreach ($index_hero_links as $page) {
      $page_id = $page['link']->ID;
      $page_title = get_the_title($page_id);
      $page_url = get_the_permalink($page_id);
      $img_url = get_the_post_thumbnail_url($page_id);
      $img_alt = $page_title;

      echo
      "
        <a href='$page_url' class='preview-catalog__link'>
          <strong class='preview-catalog__link-title'>$page_title</strong>
          <img src='#' data-src='$img_url' alt='$img_alt' class='preview-catalog__link-img lazy'>
        </a>
      ";
    }
  ?>
</div>
</section>