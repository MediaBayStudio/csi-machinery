<section class="contacts-sect container sect">
  <h2 class="contacts-sect__title sect-title">Контакты</h2>
  <div class="contacts-form contacts-sect__form">
    <?php echo do_shortcode('[contact-form-7 id="5" title="Форма в секции Контакты"]'); ?>
  </div>
  <div class="contacts-sect__info contacts-info">
    <a href="tel:<?php echo $tel_dry; ?>" class="tel contacts-info__tel">
      <div class="tel__icon"></div>
      <span class="tel__number"><?php echo $tel; ?></span>
    </a>
    <a href="mailto:<?php echo $email; ?>" class="email contacts-info__email">
      <div class="email__icon"></div>
      <span class="email__address"><?php echo $email; ?></span>
    </a>
    <div class="address contacts-info__address">
      <div class="address__icon"></div>
      <span class="address__text"><?php echo $address; ?></span>
    </div>
  </div>
  <div class="contacts-sect__map"></div>
</section>