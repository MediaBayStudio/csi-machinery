<section class="product-hero-sect container sect">
  <h1 class="product-hero-sect__title"><?php the_title(); ?></h1>
  <img src="#" data-src="<?php the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>" class="product-hero-sect__img lazy">
    <?php
      $properties = get_field( 'product_property_repeater' );
      $convert = get_field( 'convert' );
      if ( $properties ) {
        echo "<ul class='product__list'>";
        foreach ($properties as $prop) {
          $title = $prop['property_title'];
          $value = $prop['property_value'];
          if ( $value ) {
            if ( $convert ) {
              $converting = preg_match( '/кВт/', $value ) ? convertToHp( $value ) : '';
            }
            echo
            "<li class='product__list-item'>
              <strong class='product__list-property'>{$title}:</strong>
              <em class='product__list-value'>{$value}{$converting}</em>
            </li>";
          }
          
        }
        echo "</ul>";
      } else {
        echo "<p class='product__empty-descr'>Описание не добавлено</p>";
      }
    ?>
</section>