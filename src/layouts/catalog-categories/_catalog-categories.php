<div class="categories-block container">
  <?php 

    $that = get_category( get_query_var( 'cat' ), false );
    $categories = get_term_children( $that->term_id, 'category' );

    foreach ( $categories as $category_id ) {
      $term = get_term_by( 'id', $category_id, 'category' );
      $title = $term->name;
      $img = get_field( 'category_img', $term );
      $src = $img['url'];
      $descr = get_field( 'category_p_repeater', $term );
      $link = get_category_link( $category_id );
      $slug = preg_replace( '/\_/', '-', $term->slug );
      $title_attr = get_field( 'category_title_attr', $term );

      // заворачиваем каждое слово и пробел в отдельный span
        // чтобы при наведении можно было сделать равномерный border-bottom
      $title_words = explode( ' ', $title );
      $title_words = '<span class="u">' . implode( '</span><span class="u"> </span><span class="u">', $title_words ) . '</span>';

      echo
      "
        <a href='$link' class='category' title='$title_attr'>
          <img src='$src' alt='$title' class='category__img'>
          <strong class='category__title'>$title_words</strong>";
          if ( $descr ) {
            foreach ( $descr as $paragraph ) {
              echo "<p class='category__descr'>$paragraph[p]</p>";
            }
          }
      echo
        "<button type='button' class='category__btn btn'>Каталог</button>
        </a>";
    }
      
  ?>
</div>