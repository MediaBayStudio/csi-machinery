<?php
// $that передан перед require
  $paragraphs = get_field( 'category_p_repeater', $that );
  $hero_img = get_field ('category_hero_img', $that )['url'];
?>

<section class="catalog-hero-sect container lazy" data-src='<?php echo "url({$hero_img}), url(" . get_template_directory_uri() . "/img/logo-white.svg), linear-gradient(to top,#fff,#fff)" ?>'>
  <div class="catalog-hero-sect__wrap">
    <img src="#" data-src="<?php echo get_template_directory_uri() . '/img/logo-white.svg' ?>" alt="Логотип C.S.I. Machinery" class="catalog-hero-sect__logo lazy">
    <h1 class="catalog-hero-sect__title"><?php echo $that->name; ?></h1>

    <?php if ( $paragraphs ) : foreach ( $paragraphs as $p ) : ?>
      <p class="catalog-hero-sect__descr"><?php echo $p['p']; ?></p>
    <?php endforeach; endif; ?>

  </div>
</section>

<?php
  $other_terms = get_terms( [
    'taxonomy'    => 'category',
    'hide_empty'  => false,
    'childless'   => true,
    'exclude'     => $that->term_id
  ] );
?>

<div class="catalog-categories container">

  <?php $i = 0; if ( $other_terms ) : foreach ( $other_terms as $term ) : $class = ( $i === 0 ) ? 'prev' : 'next'; ?>
  <a href="<?php echo get_category_link( $term->term_id ); ?>" title="<?php the_field( 'category_title_attr', $term ); ?>" class="catalog-categories__link category-<?php echo $class; ?>"><span class="u"><?php echo $term->name; ?></span></a>
  <?php $i++; endforeach; endif; ?>

</div>