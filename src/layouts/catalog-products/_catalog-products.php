<!-- Все посты выводятся через _catalog.js -->

<section class="catalog-products container" data-term="<?php echo $that->term_id; ?>">
  <div class="catalog-products__wrap">
    <?php
      $posts = load_catalog( $that->term_id );
      if ( $posts['products'] ) : foreach ( $posts['products'] as $post ) :
    ?>
    <a href="<?php echo $post[link]; ?>" class="product" title="Перейти на страницу с <?php echo $post[title]; ?>">
      <img src="#" data-src="<?php echo $post[src]; ?>" alt="<?php echo $post[title]; ?>" title="<?php echo $post[title]; ?>" class="product__img lazy" />
      <strong class="product__title"><?php echo $post[title]; ?></strong>
      <p class="product__descr"><?php echo $post[descr]; ?></p>
    </a>
  <?php endforeach; else : echo "<p>В данной категории нет товаров</p>"; endif; ?>
  </div>
  <div class="loader ">
    <div class="loader__circle"></div>
  </div>
  <div class="catalog-products__counter-block"><span>Всего тоаров:&nbsp;</span><span class="catalog-products__counter"><?php echo $posts['length']; ?></span></div>
  <button type="button" class="catalog-products__more-btn">
    <span class="loader">
      <span class="loader__circle"></span>
    </span>
    <span>Загрузить еще...</span>
  </button>
  <div class="pagination catalog-products__pagination">
    <button type="button" class="pagination__prev disabled">
      <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="pagination__icon">
        <path d="M5 8L1 4.5L5 1" class="pagination__path"/>
      </svg>
    </button>
    <div class="pagination__numbers"></div>
    <button type="button" class="pagination__next">
      <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="pagination__icon">
        <path d="M1 1L5 4.5L1 8" class="pagination__path"/>
      </svg>
    </button>
  </div>
</section>