(function(callback) {
    var ready = false;

    var detach = function() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    };

    var completed = function() {
        if (!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback(document);
        }
    };

    if (document.readyState === "complete") {
        callback(document);
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    }
})(function(dom) {
    var urlCss = 'https://www.wkdb-siegel.de/css/wkdb_signets.min.css?revision=v002';
    if (urlCss !== '') {
        var $css = dom.createElement('link');

        $css.type = 'text/css';
        $css.rel  = 'stylesheet';
        $css.href = urlCss;

        dom.getElementsByTagName('head')[0].appendChild($css);
    }
    dom.getElementById('wkdb-widget').innerHTML = '<div class="banner-signet banner-signet--234-60 banner-signet__spacing--button-and-details"><div class="banner-signet__entry"><div class="banner-signet__entry-name" title="Finanzportal  Finanzvergleich.com">Finanzportal  Finanzvergleich.com</div><div class="banner-signet__entry-city">München</div></div><div class="banner-signet__score"><div class="banner-signet__score-stars"><span class="banner-signet__star banner-signet__star--full"></span><span class="banner-signet__star banner-signet__star--full"></span><span class="banner-signet__star banner-signet__star--full"></span><span class="banner-signet__star banner-signet__star--full"></span><span class="banner-signet__star banner-signet__star--full"></span></div><div class="banner-signet__score-text">Sehr gut</div></div><div class="banner-signet__date">02/2023</div><div class="banner-signet__rating-list"><div class="banner-signet__rating-list-wrapper"></div></div><div class="banner-signet__logo"><a href="https://www.werkenntdenbesten.de/e/B106677069/finanzberatung/muenchen/finanzportal-finanzvergleich-com-bewertungen.html?utm_source=referral_client_websites&utm_medium=widget&utm_campaign=wkdb_widget#ratings" target="_blank" class="banner-signet__logo-link"><img class="banner-signet__logo-image" src="https://www.wkdb-siegel.de/images/logo-full.svg" alt="WerkenntdenBESTEN - Logo"></a></div><a href="https://www.werkenntdenbesten.de/e/B106677069/finanzberatung/muenchen/finanzportal-finanzvergleich-com-bewertungen.html?utm_source=referral_client_websites&utm_medium=widget&utm_campaign=wkdb_widget#ratings" target="_blank" style="overflow: hidden; position: absolute; height: 10px; bottom: 10px; right: 0; left: auto; top: auto; width: 90px;" class="banner-signet__link" vocab="https://schema.org/" typeof="Product"><span property="name">Finanzportal  Finanzvergleich.com</span> hat <span property="aggregateRating" typeof="AggregateRating"><span property="ratingValue">5</span> von<span property="bestRating">5</span> Sternen | <span property="reviewCount">3</span></span><span property="brand" typeof="Brand"></span><span property="mpn" typeof="Text"></span><span property="sku" typeof="Text"></span><span property="description"></span><span property="review" typeof="Review"><span property="author" typeof="Person"><span property="name">Finanzportal  Finanzvergleich.com</span></span></span>Bewertungen auf werkenntdenBESTEN.de</a></div>';
});