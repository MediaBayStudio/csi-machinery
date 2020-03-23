<?php

  /*
    Template Name: Главная
  */
  
  get_header();

  require 'layouts/index-hero/_index-hero.php';
  require 'layouts/about/_about.php';
  require 'layouts/features/_features.php';
  require 'layouts/faq/_faq.php';
  require 'layouts/docs/_docs.php';
  require 'layouts/partners/_partners.php';
  require 'layouts/contacts/_contacts.php';
  require 'layouts/_overlay.php';
  require 'layouts/_thanks-popup.php';

  get_footer();
  
 ?>