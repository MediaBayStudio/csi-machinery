<?php 

  $tel = get_option( 'contacts_tel' );
  $tel_dry = preg_replace( '/\s/', '', $tel );

  $email = get_option( 'contacts_email' );

  $address = get_option( 'contacts_address' );

?>