<section class="order-sect container sect">
  <h2 class="order-sect__title sect-title">Заявка на товар</h2>
  <div class="order-form-wrapper">
    <?php echo do_shortcode('[contact-form-7 id="210" title="Форма заявка на товар" html_class="order-form order-sect__form"]'); ?>
  </div>
  <div class="contacts-info order-sect__contacts-info">
    <a href="tel:<?php echo $tel_dry; ?>" class="tel contacts-info__tel">
      <div class="tel__icon"></div>
      <span class="tel__number"><?php echo $tel; ?></span>
    </a>
    <a href="mailto:<?php echo $email; ?>" class="email contacts-info__email">
      <div class="email__icon"></div>
      <span class="email__address"><?php echo $email; ?></span>
    </a>
  </div>
</section>