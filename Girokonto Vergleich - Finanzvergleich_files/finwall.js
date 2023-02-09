function getFeatures(){
//set the features same width
    jQuery('.product-item .feature_wrap').each(function(){
        var $this = jQuery(this);

        var maxWidth = 0;
        $this.children("span").each(function(){
            if(this.offsetWidth > maxWidth)
                maxWidth = this.offsetWidth;
        });
        $this.children("span").width( maxWidth );

    });
}

jQuery(document).ready(function() {
    getFeatures();

});
/*

jQuery(document).ready(function ($) {


    assign_tooltips_to_parent();


    jQuery(".tipr").bind('click', function (e) {

        // test if the tooltip element has been clicked just now
        var check_if_tooltip_already_opened_by_user = jQuery(this).attr('tooltip_clicked');

        //get data to match tooltip with parent
        var tooltip_text = jQuery(this).attr('data-tip');
        var reference_text = jQuery(this).parent().text(); // might not be defined for all shortcodes
        var tooltip_parent_id = '#' + jQuery(this).attr('parent_id');
        var tooltip_parent_id_numerical = jQuery(this).attr('parent_id_numerical');
        var parent_item = jQuery(tooltip_parent_id);

        //set variable to check if prdouct details are open
        var details_already_opened = false;

        if (parent_item.find('.product-tabs').css('display') == 'block') {
            details_already_opened = true;
        }

        if (check_if_tooltip_already_opened_by_user == 'true'){
            parent_item.find('.tooltiptext').remove();
            parent_item.find('.tooltiptab').remove();
            jQuery(this).attr('tooltip_clicked', 'false');
            if (details_already_opened){

                parent_item.find('.toggle-tabs').click();

            }

        }else {

            jQuery(this).attr('tooltip_clicked', 'true');

            var tooltip_tab = '<li class="tab tooltiptab">Info</li>';

            var tooltip_tab_exists = parent_item.find('.tooltiptab').length;
            var tooltip_text_exists = parent_item.find('.tooltiptext').length;

            // get amount of existing tabs
            amount_tabs = 0;
            parent_item.find('.tab-content').each(function () {
                amount_tabs++;
            });

            if (!tooltip_tab_exists) {
                console.log('tooltip_tab_exists check');
                parent_item.find('.etabs').append(tooltip_tab);

            }


            if (!tooltip_text_exists) {
                console.log(parent_item.find('.tooltiptab').length);
                parent_item.find('.product-tabs').find('.tab-content').addClass('hide_details_field_for_tooltip_text');
                parent_item.find('.product-tabs').append('<div class="tab-content table-1 tooltiptext" id="tabs' + (amount_tabs + 1) + '-' + tooltip_parent_id_numerical + '" ><span class="reference_text"><b>' + reference_text + ': </b></span><span class="tooltip_text">' + tooltip_text + '</span></div>');

            } else {

                console.log('tooltip_text_exists else');

                current_tooltip_text = parent_item.find('.tooltiptext span').text();


                cross_check_tooltip_text = reference_text + ': ' + tooltip_text;

                if (current_tooltip_text != cross_check_tooltip_text) {

                    parent_item.find('.tooltiptext span.reference_text').text('');
                    parent_item.find('.tooltiptext span.reference_text').text('<b>' + reference_text + ': </b>');
                    parent_item.find('.tooltiptext span.tooltip_text').text('');
                    parent_item.find('.tooltiptext span.tooltip_text').text(tooltip_text);
                }

            }


            parent_item.find('.product-tabs').find('.tab-content.tooltiptext').css('display', 'block');


            // if tooltip is in table dont close table
            if ((!details_already_opened) && (!tooltip_tab_exists)) {
                console.log('already check');
                parent_item.find('.toggle-tabs').click();
                console.log(parent_item.find('.tooltiptab').length);
            }

            element_to_jump_to = jQuery('#' + 'tabs' + (amount_tabs + 1) + '-' + tooltip_parent_id_numerical);
                console.log(element_to_jump_to)
            jQuery("html, body").scrollTop(jQuery(element_to_jump_to).offset().top - ( jQuery('.fusion-header-wrapper').outerHeight() * 2 ));
                console.log(jQuery(element_to_jump_to).offset().top + jQuery('.fusion-header-wrapper').outerHeight());


            parent_item.find('.product-tabs').find('.active').removeClass('active');
            parent_item.find('.product-tabs').find('.tooltiptab').addClass('active');

            jQuery(".tab , .toggle-tabs").bind('click', function (e) {

                if (!jQuery(this).hasClass('tooltiptab') && check_if_tooltip_already_opened_by_user == 'false') {
                    parent_item.find('.tooltiptext').remove();
                    parent_item.find('.tooltiptab').remove();

                    parent_item.find('.product-tabs').find('.tab-content').removeClass('hide_details_field_for_tooltip_text');
                }
            });
        }
    });




});




function assign_tooltips_to_parent(){


    jQuery('.product-item').each(function(){

        var product_id = jQuery(this).attr('id');
        var parent_id_numerical = jQuery(this).attr('data-tracking-postid');

        jQuery(this).find(".tipr").each(function(){
            jQuery(this).attr('parent_id',product_id );
            jQuery(this).attr('parent_id_numerical',parent_id_numerical );
        });

    });
}
*/