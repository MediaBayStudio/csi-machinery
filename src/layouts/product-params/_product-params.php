<?php

  $tables = get_field('product_tables_repeater');
  $schemes = get_field('product_schemes_repeater');

  if ($tables || $schemes) {

  ?>
  
  <section class="product-params-sect container">
    <h2 class="product-params-sect__title">Основные параметры</h2>

<?php
    if ($tables) {
      echo "<div class='product-params__tables'>";
      foreach ($tables as $table) {
        if ($table['title']) {
          echo "<h3 class='product-params__table-title'>$table[title]</h3>";
        }
        echo "<div class='product__table-wrap'>" . do_shortcode($table['shortcode']) . "</div>";
      }
      echo "</div>";
    }

    

    if ($schemes) {
      echo "<div class='product-params__schemes'>";
      foreach ($schemes as $scheme) {
        if ($scheme['title']) {
          echo "<h3 class='product-params__scheme-title'>$scheme[title]</h3>";
        }
        $src = $scheme['img']['url'];
        $alt = $scheme['img']['alt'] ? $scheme['img']['alt'] : $scheme['title'];

        echo "<img src='#' data-src='$src' alt='$alt' title='$alt' class='product-params__scheme-img lazy'>";
      }
      echo "</div>";
    }

?>
  </section>
<?php
  } // end if
?>
