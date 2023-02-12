jQuery(window).load(function ($) {
  jQuery('#products-filter').change(function () {
    filtering_vergleiche();
  });

  filtering_vergleiche();

  function filtering_vergleiche() {
    var choosen_filter = [];
    jQuery('.product-item').removeClass('filter_hidden');
    jQuery('.filter_no_results').remove();

    jQuery('.products-filter select option:selected').each(function (index) {
      var current_filter_name = jQuery(this).attr('name');

      var current_filter_value = jQuery(this).attr('value');

      //Create object with all necessary info
      choosen_filter.push({
        name: current_filter_name,
        value: current_filter_value,
      });
    });
    count_item = 0;
    count_hidden = 0;
    jQuery('.product-item').each(function (index) {
      for (var i = 0; i < choosen_filter.length; ++i) {
        choosen_filter_item = choosen_filter[i];
        choosen_filter_name = choosen_filter_item.name;
        choosen_filter_value = choosen_filter_item.value;

        filter_value_on_product = jQuery(this).attr(
          'data-' + choosen_filter_name
        );

        if (choosen_filter_value != 'alle') {
          if (filter_value_on_product.indexOf(',') > -1) {
            let segments = filter_value_on_product
              .split(',')
              .map((element) => element.trim());
            if (!segments.includes(choosen_filter_value)) {
              jQuery(this).addClass('filter_hidden');
            }
          } else if (filter_value_on_product != choosen_filter_value) {
            jQuery(this).addClass('filter_hidden');
          } else if (choosen_filter_name == 'partnercard') {
            console.log('REACHED');
            jQuery('.post-38782').removeClass('filter_hidden');
          }
        }
      }
      count_item++;
    });

    jQuery('.product-item.filter_hidden').each(function (index) {
      count_hidden++;
    });

    //Nachricht anzeigen wenn keine Produkte gefunden wurden

    if (count_hidden == count_item) {
      jQuery(
        "<p class='filter_no_results'>Zu dieser Auswahl wurden leider keine Ergebnisse gefunden.<br>Bitte andere Kriterien auswählen.<p>"
      ).appendTo('.product-item-listing');
    }
  }
});
