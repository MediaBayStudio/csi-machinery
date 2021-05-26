<section class="contacts-sect container">
  <h2 class="contacts-sect__title sect-title">Контакты</h2>
  <div class="contacts-form-wrapper">
    <?php echo do_shortcode('[contact-form-7 id="5" title="Форма в секции Контакты" html_class="contacts-form contacts-sect__form"]'); ?>
  </div>
  <div class="contacts-sect__info contacts-info">
    <a href="tel:<?php echo $tel_dry; ?>" class="tel contacts-info__tel">
      <!-- <div class="tel__icon"></div> -->
      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" fill="none" class="tel__icon"><path class="tel-icon__path" d="M7.869 5.961c-.204-.226-.45-.347-.711-.347-.259 0-.507.119-.719.345l-.665.706-.162-.09-.208-.119c-.623-.421-1.188-.97-1.731-1.68-.263-.354-.44-.652-.568-.954.172-.168.332-.343.488-.511l.177-.19c.442-.47.442-1.08 0-1.55l-.574-.612-.196-.213-.395-.417c-.204-.215-.448-.329-.705-.329-.257 0-.505.114-.715.329l-.004.004-.715.768c-.269.287-.423.636-.456 1.042-.05.654.13 1.263.269 1.662.341.979.85 1.886 1.609 2.858.921 1.172 2.03 2.097 3.296 2.749.484.244 1.13.533 1.851.582l.133.004c.486 0 .894-.186 1.214-.556l.008-.011c.109-.141.236-.269.368-.405l.273-.289c.208-.231.318-.5.318-.775 0-.278-.111-.544-.324-.768l-1.155-1.234z" fill="#E5E5E5"/></svg>
      <span class="tel__number"><?php echo $tel; ?></span>
    </a>
    <a href="mailto:<?php echo $email; ?>" class="email contacts-info__email">
      <!-- <div class="email__icon"></div> -->
      <svg width="10" height="7" viewBox="0 0 10 7" xmlns="http://www.w3.org/2000/svg" fill="none" class="email__icon"><path class="email-icon__path" d="M9.121 0h-8.242c-.135 0-.262.029-.377.077l4.478 3.919 1.004-.844 3.513-3.075c-.115-.048-.241-.077-.377-.077zM9.912.44l-3.306 2.894 3.306 2.894c.055-.1.088-.211.088-.33v-5.128c0-.118-.033-.229-.088-.329zM.088.44c-.055.1-.088.211-.088.33v5.128c0 .118.033.229.088.329l3.306-2.894-3.306-2.894zM6.191 3.696l-1.004.844c-.057.05-.132.075-.207.075-.075 0-.15-.025-.207-.075l-.965-.844-3.306 2.894c.115.048.241.077.377.077h8.242c.135 0 .262-.029.377-.077l-3.306-2.894z" fill="#E5E5E5"/></svg>
      <span class="email__address"><?php echo $email; ?></span>
    </a>
    <div class="address contacts-info__address">
      <div class="address__icon"></div>
      <span class="address__text"><?php echo $address; ?></span>
    </div>
  </div>
  <div class="contacts-sect__map lazy" id="contacts-map" data-coords="<?php echo get_option( 'contacts_coords' ); ?>" data-zoom="<?php echo get_option( 'contacts_zoom' ); ?>" data-src="#"></div>
</section>
<script>
  var contactsMap;

  function ymapsOnload() {
    let mapBlockId = 'contacts-map',
      mapBlock = document.querySelector('#' + mapBlockId),
      mapAddress = document.querySelector('.address__text', mapBlock.parentElement).textContent,
      mapZoom = mapBlock.getAttribute('data-zoom'),
      dataCoords = mapBlock.getAttribute('data-coords').split(/, |,/),
      mapCoords = {
        a: dataCoords[0],
        b: dataCoords[1]
      };

    ymaps.ready(function() {
      contactsMap = new ymaps.Map(mapBlockId, {
        center: [mapCoords.a, mapCoords.b],
        zoom: mapZoom,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      });
      
      let geoIcon = new ymaps.Placemark(contactsMap.getCenter(), {
        iconCaption: 'CSI Machinery',
        hintContent: 'CSI Machinery',
        balloonContent: mapAddress
      }, {
        iconLayout: 'default#image',
        iconImageHref: '<?php echo get_template_directory_uri() ?>/img/placemark.svg',
        iconImageSize: [30, 30]
      });

      contactsMap.geoObjects.add(geoIcon);
    });
  }
</script>