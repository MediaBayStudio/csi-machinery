<div class="categories-block container">
  <?php 
    $categories = get_terms([
      'taxonomy' => 'post_category',
      'hide_empty' => false
    ]);

    foreach ($categories as $category) {
      $id = $category->term_id;
      $type = 'post_category_' . $id;
      $title = $category->name;
      $img = get_field('category_img', $type);
      $img_url = $img['url'];
      $descr = get_field('category_p_repeater', $type);
      $link = get_permalink(164);
      $slug = preg_replace('/\_/', '-', $category->slug);
      echo
      "
        <a href='$link' class='category $slug' data-id='$id'>
          <img src='$img_url' alt='$title' class='category__img'>
          <strong class='category__title'>$title</strong>";
          foreach ($descr as $paragraph) {
            echo "<p class='category__descr'>$paragraph[p]</p>";
          }
      echo
        "<button type='button' class='category__btn btn'>Каталог</button>
        </a>";
    }
  ?>
</div>