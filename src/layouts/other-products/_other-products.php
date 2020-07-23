<?php

if ( is_singular() ) {

  $post_ID = get_the_ID();
  $category = get_the_category();
  $cat_list = $category[0]->cat_ID;

  $related_posts = get_posts( [
    'category' => $cat_list,
    'posts_per_page' => 3,
    'orderby' => 'rand',
    'exclude' => $post_ID
  ] );

  if ( $related_posts ) {
    ?>
    <section class="other-products container sect">
      <div class="other-products__top">
        <h2 class="other-products__title">Другие товары категории</h2>
        <a href="/catalog/" class="other-products__link">Каталог</a>
      </div>
    <?php
    foreach( $related_posts as $post ) {
      setup_postdata( $post );

      $title = get_the_title();
      $descr = get_field( 'product_preview' );
      $src   = get_the_post_thumbnail_url();
      $link  = get_the_permalink();

      echo "<a href='$link' class='product' title='Перейти на страницу с $title'>
              <img src='#' data-src='$src' alt='$title' class='product__img lazy' />
              <strong class='product__title'>$title</strong>
              <p class='product__descr'>$descr</p>
            </a>";
    }

    wp_reset_postdata();
    ?>
    </section>
    <?php
  }
}
?>