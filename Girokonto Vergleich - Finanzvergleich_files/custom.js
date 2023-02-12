jQuery(document).ready(function ($) {
  // Table of Content SlideToggle
  $('.ntoc_toggle').click(function (event) {
    $(this).text($(this).text() == 'Anzeigen' ? 'Verbergen' : 'Anzeigen');
    event.preventDefault();
    $('.ntoc_list').slideToggle();
  });
  $('.ntoc_list ul li a').click(function () {
    $('.ntoc_toggle').text('Anzeigen');
    $('.ntoc_list').slideUp();
  });
  // Check if the TOC is sticky
  function checkForClassChanges() {
    if ($('.ntoc').hasClass('fusion-sticky-transition')) {
      $('.ntoc_toggle').text('Anzeigen');
      $('.ntoc_list').slideUp();
    } else {
      setTimeout(checkForClassChanges, 500);
    }
  }
  $(checkForClassChanges);
  //Delete Sticky Header after scrolltop 100px
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $('.single-post .fusion-is-sticky').css('visibility', 'hidden');
    } else {
      $('.single-post .fusion-is-sticky').css('visibility', 'visible');
    }
  });

  $('.product-tabs').easytabs({
    animate: false,
    updateHash: false,
  });

  // MAKE SURE YOUR SELECTOR MATCHES SOMETHING IN YOUR HTML!!!
  let positionSettings = {
    my: 'bottom center',
    at: 'top center',
  };
  if ($(window).width() < 450) {
    positionSettings = {
      my: 'bottom left',
      viewport: $(window),
    };
  }

  $('.tipr').each(function () {
    $(this).qtip({
      content: {
        text: $(this).data('tip'),
      },
      position: positionSettings,
      style: {
        classes: 'qtip-bootstrap qtip-shadow',
      },
    });
  });

  $('.product-tabs').hide();

  $('.toggle-tabs').click(function () {
    var container = $('#tab-container-' + $(this).data('id'));

    $('.toggle-tabs').removeClass('toggle-active');
    $(this).addClass('toggle-active');
    $(this).parent().toggleClass('toggle-parent-active');
    $('i.icon-toggle').addClass('fa-chevron-circle-down');
    $('i.icon-toggle').removeClass('fa-times-circle');

    if (container.is(':visible')) {
      $('.product-tabs').slideUp();
      $(this).removeClass('toggle-active');
    } else {
      $('.product-tabs').slideUp();

      container.slideDown();

      $(this).find('i.icon-toggle').addClass('fa-times-circle');
      $(this).find('i.icon-toggle').removeClass('fa-chevron-circle-down');
    }
  });

  //This function allows the filter on mobile VErgleichseiten to be toggled and to switch the text
  $('#mobile_filter_toggle').click(function () {
    var $less_text = $('#mobile_filter_toggle').data('text-less');
    var $more_text = $('#mobile_filter_toggle').data('text-more');
    var $current_text = $('#mobile_filter_toggle .filter_text').text();

    $('#products-filter').slideToggle();
    $('#products-calculator').slideToggle();
    $('#product-sort-filter').slideToggle();

    if ($current_text == $less_text) {
      $('#mobile_filter_toggle .filter_text').text($more_text);
      $('#mobile_filter_toggle .icon-toggle').css('transform', 'rotate( 0deg)');
    }
    if ($current_text == $more_text) {
      $('#mobile_filter_toggle .filter_text').text($less_text);
      $('#mobile_filter_toggle .icon-toggle').css(
        'transform',
        'rotate( 180deg)'
      );
    }
  });

  var $checkboxes = $('.products-filter input[type="checkbox"]');
  var $boxes = $('.product-item');

  $checkboxes
    .on('change', function () {
      var selectedOptions = {};

      $checkboxes.filter(':checked').each(function () {
        if (typeof selectedOptions[this.name] == 'undefined') {
          selectedOptions[this.name] = [];
        }

        selectedOptions[this.name].push(this.value);
      });

      var $filtered = $boxes;

      $.each(selectedOptions, function (type, selectedOption) {
        $filtered = $filtered.filter(function () {
          var matched = false,
            currentFilters = $(this).data('filter').split(',');

          $.each(currentFilters, function (_, currentFilter) {
            if ($.inArray(currentFilter, selectedOption) != -1) {
              matched = true;
              return false;
            }
          });

          if (matched) {
            return true;
          }
        });
      });

      $boxes.hide().filter($filtered).fadeIn(450);
      $('span.product-count').text($('.product-item:visible').length);
    })
    .trigger('change');

  //Sort the products
  var $divssort = $('.product-item-listing');

  $('.sort_filter').click(function () {
    var $this = $(this);
    $('.' + $this.attr('class'))
      .parent()
      .removeClass('sort_active');
    $this.parent().addClass('sort_active');

    if ($(this).data('option') === 'desc') {
      //Sort desc
      $divssort
        .find('.product-item')
        .sort(function (a, b) {
          return (
            +$(b)
              .find('span.' + $this.data('val'))
              .data('val') -
            +$(a)
              .find('span.' + $this.data('val'))
              .data('val')
          );
        })
        .appendTo($divssort);
    } else {
      //Sort asc
      $divssort
        .find('.product-item')
        .sort(function (a, b) {
          return (
            +$(a)
              .find('span.' + $this.data('val'))
              .data('val') -
            +$(b)
              .find('span.' + $this.data('val'))
              .data('val')
          );
        })
        .appendTo($divssort);
    }
    $divssort.fadeOut(100).fadeIn(200);
  });

  //Zaehlung der Ergebnisse
  setTimeout(function () {
    $('span.product-count').text($('.product-item:visible').length);
  }, 500);

  /** Kreditvergleich Affix */
  if ($(window).width() >= 960) {
    var target = $('.fa_vgl_filter');
    target.after('<div class="affix" id="affix"></div>');

    var affix = $('.affix');
    affix.append(target.clone(true));

    //var header_height = $('.fusion-header-v1').outerHeight(true);

    // Show affix on scroll.
    var element = document.getElementById('affix');
    if (element !== null) {
      var position = target.offset();
      window.addEventListener('scroll', function () {
        var height = $(window).scrollTop();
        if (height > position.top) {
          target.css('visibility', 'hidden');
          affix.css('display', 'block');
          affix.css('top', $('.fusion-header-v1').outerHeight(true));
        } else {
          affix.css('display', 'none');
          target.css('visibility', 'visible');
        }
      });
    }
  }

  /**Kreditvergleich iFrame einfügen beim Klick**/
  $('.kreditvergleich-button').click(function (event) {
    event.preventDefault();
    var $this = $(this);

    if (
      window.location.href ===
        'https://finanzvergleich.com/kredit/kreditvergleich/' ||
      window.location.href ===
        'https://finanzvergleich.com/kredit/kreditvergleich'
    ) {
      window.location.href = $this.attr('href') + '&if=true';
      return;
    }
    iframe_container = $('#' + $this.data('id'));
    toggle_icon = $this.find('i.icon-toggle');

    //Hide all other open Containers
    //$(".product-iframe-container").hide();

    iframe_container.toggle();

    if (iframe_container.is(':visible')) {
      iframe_container.html(
        "<iframe frameborder='0' scrolling='auto' width='100%' height='100%' style='width:100%;height:100%;min-height:800px;border:1px solid #ccc;' src=" +
          $this.attr('href') +
          '></iframe>'
      );
      toggle_icon.addClass('fa-times-circle');
      toggle_icon.removeClass('fa-chevron-circle-down');

      $('html, body').animate(
        {
          scrollTop: iframe_container.offset().top - 250,
        },
        700
      );
    } else {
      iframe_container.html('');
      toggle_icon.addClass('fa-chevron-circle-down');
      toggle_icon.removeClass('fa-times-circle');
      iframe_container.html('');
    }
  });

  /**Show current Date for latest refresh of the comparison tables */
  /** Use html: Stand <span id="current_month_localized"></span> <span id="current_year"></span> */
  if (
    document.getElementById('current_month_localized') &&
    document.getElementById('current_year')
  ) {
    var date = new Date(),
      month = date.toLocaleString('de-de', {
        month: 'long',
      });

    document.getElementById('current_month_localized').innerHTML = month;
    document.getElementById('current_year').innerHTML = date.getFullYear();
  }

  if (jQuery(window).width() <= 882) {
    jQuery('.list-cards-component .products-listing-top').click(function () {
      if (jQuery(this).data('show') !== '1') {
        jQuery(this).data('show', '1');
        $('.list-cards-component .filter-header').slideDown();
      } else {
        jQuery(this).data('show', '0');
        $('.list-cards-component .filter_checkboxes:visible').slideUp();
        $('.list-cards-component .filter-header').slideUp();
      }
    });
    jQuery('.list-cards-component .filter-header').click(function () {
      jQuery(this).next().slideToggle();
    });
  }

  /**
   * postMessage Implementation for Finanzcheck comparison tables
   * The FC iFrame sends {"event":"ausblenden"} or {"event":"einblenden"}
   * Then, we can hide or show elements according to the funnel state
   */
  window.addEventListener('message', receiveFinanzcheckMessage);

  function receiveFinanzcheckMessage(event) {
    if (event.data == '{"event":"ausblenden"}') {
      document.getElementById('menu-main-menu').style = 'visibility:hidden';
      document.getElementById('title-vergleich-fc').style = 'display:none';
    } else if (event.data == '{"event":"einblenden"}') {
      document.getElementById('menu-main-menu').style = 'visibility:visible';
      document.getElementById('title-vergleich-fc').style = 'display:block';
    }
  }

  /**
   * Credit comparison -> send form when select changed
   */
  jQuery('#kreditvergleich_term, #kreditvergleich_purpose').change(function () {
    jQuery('#kreditvergleich_filter').trigger('submit');
  });

  /**
   * Kreditbrückenseite: Angebot "ausgrauen" bis das Formular eingestellt wurde
   */
  if (document.getElementById('credit_form_submitted') !== null) {
  } else if (document.getElementById('credit_form_not_submitted') !== null) {
  }
});

function pushParamToUrl(param, val) {
  var url = new URL(window.location.href);
  url.searchParams.set(param, val);

  // push result to URL
  history.replaceState({}, null, url.toString());
}

function getParamFromUrl(name) {
  var url = window.location.href;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : decodeURIComponent(results[1]);
}

//THis is a quick fix for the product details tabs. because they used an anchor, the user experienced a jump. after the script for the tabs loads itselfs and uses the anchors we remove them
jQuery(window).load(function ($) {
  jQuery('.etabs li.tab a').attr('href', '');
});

//Sha1 code helper
!(function () {
  'use strict';
  var root = 'object' == typeof window ? window : {},
    NODE_JS =
      !root.JS_SHA1_NO_NODE_JS &&
      'object' == typeof process &&
      process.versions &&
      process.versions.node;
  NODE_JS && (root = global);
  var COMMON_JS =
      !root.JS_SHA1_NO_COMMON_JS && 'object' == typeof module && module.exports,
    AMD = 'function' == typeof define && define.amd,
    HEX_CHARS = '0123456789abcdef'.split(''),
    EXTRA = [-2147483648, 8388608, 32768, 128],
    SHIFT = [24, 16, 8, 0],
    OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'],
    blocks = [],
    createOutputMethod = function (t) {
      return function (h) {
        return new Sha1(!0).update(h)[t]();
      };
    },
    createMethod = function () {
      var t = createOutputMethod('hex');
      NODE_JS && (t = nodeWrap(t)),
        (t.create = function () {
          return new Sha1();
        }),
        (t.update = function (h) {
          return t.create().update(h);
        });
      for (var h = 0; h < OUTPUT_TYPES.length; ++h) {
        var s = OUTPUT_TYPES[h];
        t[s] = createOutputMethod(s);
      }
      return t;
    },
    nodeWrap = function (method) {
      var crypto = eval("require('crypto')"),
        Buffer = eval("require('buffer').Buffer"),
        nodeMethod = function (t) {
          if ('string' == typeof t)
            return crypto.createHash('sha1').update(t, 'utf8').digest('hex');
          if (t.constructor === ArrayBuffer) t = new Uint8Array(t);
          else if (void 0 === t.length) return method(t);
          return crypto.createHash('sha1').update(new Buffer(t)).digest('hex');
        };
      return nodeMethod;
    };

  function Sha1(t) {
    t
      ? ((blocks[0] =
          blocks[16] =
          blocks[1] =
          blocks[2] =
          blocks[3] =
          blocks[4] =
          blocks[5] =
          blocks[6] =
          blocks[7] =
          blocks[8] =
          blocks[9] =
          blocks[10] =
          blocks[11] =
          blocks[12] =
          blocks[13] =
          blocks[14] =
          blocks[15] =
            0),
        (this.blocks = blocks))
      : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      (this.h0 = 1732584193),
      (this.h1 = 4023233417),
      (this.h2 = 2562383102),
      (this.h3 = 271733878),
      (this.h4 = 3285377520),
      (this.block = this.start = this.bytes = this.hBytes = 0),
      (this.finalized = this.hashed = !1),
      (this.first = !0);
  }

  (Sha1.prototype.update = function (t) {
    if (!this.finalized) {
      var h = 'string' != typeof t;
      h && t.constructor === root.ArrayBuffer && (t = new Uint8Array(t));
      for (var s, e, i = 0, r = t.length || 0, o = this.blocks; i < r; ) {
        if (
          (this.hashed &&
            ((this.hashed = !1),
            (o[0] = this.block),
            (o[16] =
              o[1] =
              o[2] =
              o[3] =
              o[4] =
              o[5] =
              o[6] =
              o[7] =
              o[8] =
              o[9] =
              o[10] =
              o[11] =
              o[12] =
              o[13] =
              o[14] =
              o[15] =
                0)),
          h)
        )
          for (e = this.start; i < r && e < 64; ++i)
            o[e >> 2] |= t[i] << SHIFT[3 & e++];
        else
          for (e = this.start; i < r && e < 64; ++i)
            (s = t.charCodeAt(i)) < 128
              ? (o[e >> 2] |= s << SHIFT[3 & e++])
              : s < 2048
              ? ((o[e >> 2] |= (192 | (s >> 6)) << SHIFT[3 & e++]),
                (o[e >> 2] |= (128 | (63 & s)) << SHIFT[3 & e++]))
              : s < 55296 || s >= 57344
              ? ((o[e >> 2] |= (224 | (s >> 12)) << SHIFT[3 & e++]),
                (o[e >> 2] |= (128 | ((s >> 6) & 63)) << SHIFT[3 & e++]),
                (o[e >> 2] |= (128 | (63 & s)) << SHIFT[3 & e++]))
              : ((s =
                  65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++i)))),
                (o[e >> 2] |= (240 | (s >> 18)) << SHIFT[3 & e++]),
                (o[e >> 2] |= (128 | ((s >> 12) & 63)) << SHIFT[3 & e++]),
                (o[e >> 2] |= (128 | ((s >> 6) & 63)) << SHIFT[3 & e++]),
                (o[e >> 2] |= (128 | (63 & s)) << SHIFT[3 & e++]));
        (this.lastByteIndex = e),
          (this.bytes += e - this.start),
          e >= 64
            ? ((this.block = o[16]),
              (this.start = e - 64),
              this.hash(),
              (this.hashed = !0))
            : (this.start = e);
      }
      return (
        this.bytes > 4294967295 &&
          ((this.hBytes += (this.bytes / 4294967296) << 0),
          (this.bytes = this.bytes % 4294967296)),
        this
      );
    }
  }),
    (Sha1.prototype.finalize = function () {
      if (!this.finalized) {
        this.finalized = !0;
        var t = this.blocks,
          h = this.lastByteIndex;
        (t[16] = this.block),
          (t[h >> 2] |= EXTRA[3 & h]),
          (this.block = t[16]),
          h >= 56 &&
            (this.hashed || this.hash(),
            (t[0] = this.block),
            (t[16] =
              t[1] =
              t[2] =
              t[3] =
              t[4] =
              t[5] =
              t[6] =
              t[7] =
              t[8] =
              t[9] =
              t[10] =
              t[11] =
              t[12] =
              t[13] =
              t[14] =
              t[15] =
                0)),
          (t[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
          (t[15] = this.bytes << 3),
          this.hash();
      }
    }),
    (Sha1.prototype.hash = function () {
      var t,
        h,
        s = this.h0,
        e = this.h1,
        i = this.h2,
        r = this.h3,
        o = this.h4,
        H = this.blocks;
      for (t = 16; t < 80; ++t)
        (h = H[t - 3] ^ H[t - 8] ^ H[t - 14] ^ H[t - 16]),
          (H[t] = (h << 1) | (h >>> 31));
      for (t = 0; t < 20; t += 5)
        (s =
          ((h =
            ((e =
              ((h =
                ((i =
                  ((h =
                    ((r =
                      ((h =
                        ((o =
                          ((h = (s << 5) | (s >>> 27)) +
                            ((e & i) | (~e & r)) +
                            o +
                            1518500249 +
                            H[t]) <<
                          0) <<
                          5) |
                        (o >>> 27)) +
                        ((s & (e = (e << 30) | (e >>> 2))) | (~s & i)) +
                        r +
                        1518500249 +
                        H[t + 1]) <<
                      0) <<
                      5) |
                    (r >>> 27)) +
                    ((o & (s = (s << 30) | (s >>> 2))) | (~o & e)) +
                    i +
                    1518500249 +
                    H[t + 2]) <<
                  0) <<
                  5) |
                (i >>> 27)) +
                ((r & (o = (o << 30) | (o >>> 2))) | (~r & s)) +
                e +
                1518500249 +
                H[t + 3]) <<
              0) <<
              5) |
            (e >>> 27)) +
            ((i & (r = (r << 30) | (r >>> 2))) | (~i & o)) +
            s +
            1518500249 +
            H[t + 4]) <<
          0),
          (i = (i << 30) | (i >>> 2));
      for (; t < 40; t += 5)
        (s =
          ((h =
            ((e =
              ((h =
                ((i =
                  ((h =
                    ((r =
                      ((h =
                        ((o =
                          ((h = (s << 5) | (s >>> 27)) +
                            (e ^ i ^ r) +
                            o +
                            1859775393 +
                            H[t]) <<
                          0) <<
                          5) |
                        (o >>> 27)) +
                        (s ^ (e = (e << 30) | (e >>> 2)) ^ i) +
                        r +
                        1859775393 +
                        H[t + 1]) <<
                      0) <<
                      5) |
                    (r >>> 27)) +
                    (o ^ (s = (s << 30) | (s >>> 2)) ^ e) +
                    i +
                    1859775393 +
                    H[t + 2]) <<
                  0) <<
                  5) |
                (i >>> 27)) +
                (r ^ (o = (o << 30) | (o >>> 2)) ^ s) +
                e +
                1859775393 +
                H[t + 3]) <<
              0) <<
              5) |
            (e >>> 27)) +
            (i ^ (r = (r << 30) | (r >>> 2)) ^ o) +
            s +
            1859775393 +
            H[t + 4]) <<
          0),
          (i = (i << 30) | (i >>> 2));
      for (; t < 60; t += 5)
        (s =
          ((h =
            ((e =
              ((h =
                ((i =
                  ((h =
                    ((r =
                      ((h =
                        ((o =
                          ((h = (s << 5) | (s >>> 27)) +
                            ((e & i) | (e & r) | (i & r)) +
                            o -
                            1894007588 +
                            H[t]) <<
                          0) <<
                          5) |
                        (o >>> 27)) +
                        ((s & (e = (e << 30) | (e >>> 2))) |
                          (s & i) |
                          (e & i)) +
                        r -
                        1894007588 +
                        H[t + 1]) <<
                      0) <<
                      5) |
                    (r >>> 27)) +
                    ((o & (s = (s << 30) | (s >>> 2))) | (o & e) | (s & e)) +
                    i -
                    1894007588 +
                    H[t + 2]) <<
                  0) <<
                  5) |
                (i >>> 27)) +
                ((r & (o = (o << 30) | (o >>> 2))) | (r & s) | (o & s)) +
                e -
                1894007588 +
                H[t + 3]) <<
              0) <<
              5) |
            (e >>> 27)) +
            ((i & (r = (r << 30) | (r >>> 2))) | (i & o) | (r & o)) +
            s -
            1894007588 +
            H[t + 4]) <<
          0),
          (i = (i << 30) | (i >>> 2));
      for (; t < 80; t += 5)
        (s =
          ((h =
            ((e =
              ((h =
                ((i =
                  ((h =
                    ((r =
                      ((h =
                        ((o =
                          ((h = (s << 5) | (s >>> 27)) +
                            (e ^ i ^ r) +
                            o -
                            899497514 +
                            H[t]) <<
                          0) <<
                          5) |
                        (o >>> 27)) +
                        (s ^ (e = (e << 30) | (e >>> 2)) ^ i) +
                        r -
                        899497514 +
                        H[t + 1]) <<
                      0) <<
                      5) |
                    (r >>> 27)) +
                    (o ^ (s = (s << 30) | (s >>> 2)) ^ e) +
                    i -
                    899497514 +
                    H[t + 2]) <<
                  0) <<
                  5) |
                (i >>> 27)) +
                (r ^ (o = (o << 30) | (o >>> 2)) ^ s) +
                e -
                899497514 +
                H[t + 3]) <<
              0) <<
              5) |
            (e >>> 27)) +
            (i ^ (r = (r << 30) | (r >>> 2)) ^ o) +
            s -
            899497514 +
            H[t + 4]) <<
          0),
          (i = (i << 30) | (i >>> 2));
      (this.h0 = (this.h0 + s) << 0),
        (this.h1 = (this.h1 + e) << 0),
        (this.h2 = (this.h2 + i) << 0),
        (this.h3 = (this.h3 + r) << 0),
        (this.h4 = (this.h4 + o) << 0);
    }),
    (Sha1.prototype.hex = function () {
      this.finalize();
      var t = this.h0,
        h = this.h1,
        s = this.h2,
        e = this.h3,
        i = this.h4;
      return (
        HEX_CHARS[(t >> 28) & 15] +
        HEX_CHARS[(t >> 24) & 15] +
        HEX_CHARS[(t >> 20) & 15] +
        HEX_CHARS[(t >> 16) & 15] +
        HEX_CHARS[(t >> 12) & 15] +
        HEX_CHARS[(t >> 8) & 15] +
        HEX_CHARS[(t >> 4) & 15] +
        HEX_CHARS[15 & t] +
        HEX_CHARS[(h >> 28) & 15] +
        HEX_CHARS[(h >> 24) & 15] +
        HEX_CHARS[(h >> 20) & 15] +
        HEX_CHARS[(h >> 16) & 15] +
        HEX_CHARS[(h >> 12) & 15] +
        HEX_CHARS[(h >> 8) & 15] +
        HEX_CHARS[(h >> 4) & 15] +
        HEX_CHARS[15 & h] +
        HEX_CHARS[(s >> 28) & 15] +
        HEX_CHARS[(s >> 24) & 15] +
        HEX_CHARS[(s >> 20) & 15] +
        HEX_CHARS[(s >> 16) & 15] +
        HEX_CHARS[(s >> 12) & 15] +
        HEX_CHARS[(s >> 8) & 15] +
        HEX_CHARS[(s >> 4) & 15] +
        HEX_CHARS[15 & s] +
        HEX_CHARS[(e >> 28) & 15] +
        HEX_CHARS[(e >> 24) & 15] +
        HEX_CHARS[(e >> 20) & 15] +
        HEX_CHARS[(e >> 16) & 15] +
        HEX_CHARS[(e >> 12) & 15] +
        HEX_CHARS[(e >> 8) & 15] +
        HEX_CHARS[(e >> 4) & 15] +
        HEX_CHARS[15 & e] +
        HEX_CHARS[(i >> 28) & 15] +
        HEX_CHARS[(i >> 24) & 15] +
        HEX_CHARS[(i >> 20) & 15] +
        HEX_CHARS[(i >> 16) & 15] +
        HEX_CHARS[(i >> 12) & 15] +
        HEX_CHARS[(i >> 8) & 15] +
        HEX_CHARS[(i >> 4) & 15] +
        HEX_CHARS[15 & i]
      );
    }),
    (Sha1.prototype.toString = Sha1.prototype.hex),
    (Sha1.prototype.digest = function () {
      this.finalize();
      var t = this.h0,
        h = this.h1,
        s = this.h2,
        e = this.h3,
        i = this.h4;
      return [
        (t >> 24) & 255,
        (t >> 16) & 255,
        (t >> 8) & 255,
        255 & t,
        (h >> 24) & 255,
        (h >> 16) & 255,
        (h >> 8) & 255,
        255 & h,
        (s >> 24) & 255,
        (s >> 16) & 255,
        (s >> 8) & 255,
        255 & s,
        (e >> 24) & 255,
        (e >> 16) & 255,
        (e >> 8) & 255,
        255 & e,
        (i >> 24) & 255,
        (i >> 16) & 255,
        (i >> 8) & 255,
        255 & i,
      ];
    }),
    (Sha1.prototype.array = Sha1.prototype.digest),
    (Sha1.prototype.arrayBuffer = function () {
      this.finalize();
      var t = new ArrayBuffer(20),
        h = new DataView(t);
      return (
        h.setUint32(0, this.h0),
        h.setUint32(4, this.h1),
        h.setUint32(8, this.h2),
        h.setUint32(12, this.h3),
        h.setUint32(16, this.h4),
        t
      );
    });
  var exports = createMethod();
  COMMON_JS
    ? (module.exports = exports)
    : ((root.sha1 = exports),
      AMD &&
        define(function () {
          return exports;
        }));
})();

//jQuery(window).load(function ($) {

/*

jQuery(window).scroll(function(){

    jQuery('.qtip').each(function(i, obj) {
        if(jQuery(this).css('left') == '0'){

            jQuery(this)[0].click();

        }
    });

});

//jQuery('body').addClass('init_qtip');
jQuery('.tipr').trigger('mouseover');
// setTimeout(function(){ jQuery('body').removeClass('init_qtip'); }, 1500);




var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            // element added to DOM
            [].some.call(mutation.addedNodes, function(el) {

               if(el.classList.contains('qtip')){
                   init_tooltip(el.id)
                   return el.id;

               }
            });

        }
    });
});

var config = {
    attributes: true,
    childList: true,
    characterData: true
};

observer.observe(document.body, config);


function init_tooltip(tooltip_id){

    var current_tooltip = jQuery('#' + tooltip_id);
    console.log('init_tooltip');

   close_tooltip(tooltip_id);
    reposition_tooltip(tooltip_id);
}

function close_tooltip(tooltip_id){

    var current_tooltip = jQuery('#' + tooltip_id);
   // console.log('close_tooltip');
    current_tooltip.css('opacity', '0').toggle();

}

function reposition_tooltip(tooltip_id){


    var current_tooltip = jQuery('#' + tooltip_id);


    var browserwidth = jQuery(window).width();
    var tooltip_width = current_tooltip.width();
    var calculated_offset = '-' + (tooltip_width + 50) + 'px' ;


        console.log(current_tooltip.css('left'));
       // console.log('reposition');
    setTimeout(function(){



        current_tooltip.css('left', 0);
        current_tooltip.css('min-width', browserwidth);

    }, 500);


}

*/

/*
TODO: better mobile detection. this is orobably firing for laptops with touchscreen
 */
jQuery(document).ready(function ($) {
  var browsermaxwidth = jQuery(window).width();

  if (browsermaxwidth < 668) {
    jQuery(document).one('touchmove', function () {
      /* hook into the css jquery function to get as close to the original code as psoible */
      (function () {
        orig = jQuery.fn.css;
        jQuery.fn.css = function () {
          var result = orig.apply(this, arguments);

          /*
           * arguments is the most important part here, by arguments we can filter for what css value was changed by the function
           * otherwise using css for our own ourposes later would trigger recursion
           *
           * the orig_code triggers overflow and postion the last so we look for them and then run our code
           */
          var possible_tooltip = false;
          if (arguments[0] == 'position' || arguments[0] == 'overflow') {
            possible_tooltip = true;
          }
          // lets find the current dom objects selector
          var element_id = jQuery(this).attr('id');
          // filter the right argument AND only on tooltips
          if (jQuery(this).hasClass('qtip-focus') && possible_tooltip == true) {
            //because we are still to fast for the other code we need to have a small timeout to be the 'last' function to modify the dom object
            // there is a little bit of css in finwall css to make up for the delay and make everything llok a bit smoother
            setTimeout(function () {
              current_tooltip = jQuery('#' + element_id);

              // get all necessary values and modify the element
              var browserwidth = jQuery(window).width();
              var element_width = browserwidth - 20;

              current_tooltip.css('max-width', element_width);
              current_tooltip.css('width', element_width);
              current_tooltip.css('left', 10);

              /* hide the small element which points to the tooltip origin */
              jQuery('#' + element_id + ' canvas').css('display', 'none');
            }, 500);
          }
          // reset argument indentifier
          possible_tooltip = false;
          return result;
        };
      })();
    });
  }
});
