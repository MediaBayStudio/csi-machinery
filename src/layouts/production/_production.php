<?php
  $production_sect = get_field('production_sect');

  if ($production_sect) {
    $sect_title = $production_sect['sect_title'];
    $sect_descr = $production_sect['p_repeater'];

?>

<section class="production-sect container sect">
  <img src="#" data-src="<?php echo get_template_directory_uri() . '/img/production-sect-img.jpg' ?>" alt="О производстве" class="production-sect__img lazy">
  <h2 class="production-sect__title sect-title"><?php echo $sect_title; ?></h2>
  <?php
      if (is_array($sect_descr)) {
        foreach ($sect_descr as $p) {
          echo "<p class='production-sect__descr'>$p[p]</p>";
        }
      }
    }
  ?>
</section>