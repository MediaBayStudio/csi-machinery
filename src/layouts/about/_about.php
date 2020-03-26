<section class="about-sect container sect">
  <h2 class="about-sect__title sect-title">О компании</h2>
  <div class="about-sect__content-wrap">
    <div class="about-sect__text-wrap">
      <?php
        $about = get_field('about_company_add');

        if ($about) {
          $about_paragraphs = get_field('about_company_p_repeater');

          foreach ($about_paragraphs as $p) {
            echo "<p class='about-sect__descr'>$p[p]</p>";
          }

          if (!is_page_template('about.php')) {
            $about_page_url = get_the_permalink(13);
            echo 
              "<div class='about-sect__link-wrap'>
                <a href='$about_page_url' class='about-sect__link'>Подробнее</a>
              </div>";
          }
        }
      ?>
    </div>
    <img src="#" alt="О компании" class="about-sect__img lazy" data-src="<?php echo get_template_directory_uri() . '/img/about-img.jpg' ?>">
  </div>
</section>