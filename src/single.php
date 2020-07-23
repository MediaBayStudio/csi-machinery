<?php

  /*
    Template Name: Страница с товаром
  */
  
  get_header();

  the_breadcrumb([
    'container_start'     => '<div class="breadcrumbs container">',
    'container_end'       => '</div>',
    'link_class'          => 'breadcrumbs__link',
    'current_link_class'  => 'current'
  ]);

  the_post();

  require 'layouts/product-hero/_product-hero.php';
  require 'layouts/product-params/_product-params.php';
  require 'layouts/_info.php';
  require 'layouts/order/_order.php';
  require 'layouts/other-products/_other-products.php';

  get_footer();