//This functions enables the user to open the Bewertungs table when clicking on the Note
jQuery(document).ready(function() {

    jQuery('.product_note').click(function(){

        //identify the right product tab by its data attribute
        var $tabid = jQuery(this).attr('data-id');

        jQuery('.toggle-tabs').each(function(){

            var $loop_tabid = jQuery(this).attr('data-id');

                //if the data id of the clicked note is the same as the tab ones
                if ($loop_tabid == $tabid){
                    var $tab_identifier = '#tab-container-' + $tabid;

                    //check if the BEwertungs table even exists. otherwise do nothing
                    if ( jQuery($tab_identifier).find('.bewertungstab a').length ) {

                        //open both the produktdetails and further on the right tab
                        jQuery(this).click();
                        jQuery($tab_identifier).find('.bewertungstab a').click();
                    }
                }

        });

    });

});