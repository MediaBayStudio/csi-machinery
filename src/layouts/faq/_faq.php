<section class="faq-sect container sect">
  <h2 class="faq-sect__title sect-title">Вопрос-ответ</h2>
  <?php
    $faq_sect_fields = get_field('faq_sect_fields');
    $sect_descr = $faq_sect_fields['sect_descr'];
    $dropdown_blocks = $faq_sect_fields['dropdown_repeater'];

    echo "<p class='faq-sect__descr'>$sect_descr</p>";

    ?>

  <div class="faq__block">

    <?php

    foreach ($dropdown_blocks as $block) {

      echo
      "<div class='faq'>
        <button type='button' class='faq__symbol'></button>
        <div class='faq__text-block'>
          <button type='button' class='faq__question'>$block[question]</button>
          <p class='faq__answer'>$block[answer]</p>
        </div>
       </div>";

    }

  ?>
  </div>
</section>