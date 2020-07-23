<div class="partners-block container sect">
  <?php
    $partnersAdd = get_field('partners_add');

    if ($partnersAdd) {

      $partners = get_posts([
        'numberposts' => -1,
        'post_type'   => 'partners_company'
      ]);

      foreach ($partners as $partner) {
        $title = get_the_title($partner->ID);
        $logo_src = get_field('partners_logo', $partner->ID);
        echo "<figure class='partners-block__img-wrap'><img src='#' data-src='{$logo_src}' alt='{$title}' title='{$title}' class='partners-block__img lazy'></figure>";
      }
    }
  ?>
</div>