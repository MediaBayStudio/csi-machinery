<?php
  
  get_header();
  
  $that = get_category( get_query_var( 'cat' ), false );
  require 'layouts/catalog-hero/_catalog-hero.php';
  require 'layouts/catalog-products/_catalog-products.php';

  get_footer();