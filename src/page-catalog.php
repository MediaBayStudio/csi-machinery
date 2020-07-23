<?php

  /*
    Template Name: catalog
  */
  
  get_header();

  // $categories = get_categories();
  // // var_dump($categories);
  // foreach ($categories as $category) {
  //   $src = get_category_link( $category->term_id );
  //   echo "<a href='$src'>$category->name</a>";
  //   echo "<br>";
  // }

  require 'layouts/catalog-hero/_catalog-hero.php';
  require 'layouts/catalog-products/_catalog-products.php';

  get_footer();