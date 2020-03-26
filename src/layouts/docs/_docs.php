<section class="docs-sect container sect">
  <h2 class="docs-sect__title sect-title">Документы</h2>
  <?php
    $docs_sect_fields = get_field('docs_sect_fields');
    $sect_descr = $docs_sect_fields['sect_descr'];
    $docs = $docs_sect_fields['docs_repeater'];

    echo "<p class='docs-sect__descr'>$sect_descr</p>";

    ?>

  <div class="docs-block">

    <?php

    foreach ($docs as $doc) {
      $file = $doc['file'];

      echo
      "<a href='$file[url]' class='doc'>
        <img src='" . get_template_directory_uri() . "/img/icon-pdf.svg' alt='$doc[file_name]' class='doc__img'>
        <span class='doc__title'>{$doc[file_name]}.{$file[subtype]}</span>
       </a>";

    }

  ?>
  </div>
</section>