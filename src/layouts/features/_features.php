<div class="feat-block container sect">
  <?php
    $features = get_field('features_blocks')['blocks_repeater'];

    foreach ($features as $feat) {
      $feat_title = $feat['title'];
      $feat_descr = $feat['descr'];
      $feat_img_url = $feat['img']['url'];

      echo 
      "
        <div class='feat'>
          <img src='#' data-src='$feat_img_url' alt='$feat_title' class='feat__img lazy'>
          <strong class='feat__title'>$feat_title</strong>
          <p class='feat__descr'>$feat_descr</p>
        </div>
      ";

    }
  ?>
</div>