$(function () {
    console.log('Extension chargée avec succès...');

    // https://ledenicheur.fr/_internal/session?search=AMD%20Ryzen%205%203600%20(3.6%20GHz)&sort=lowest_price%3Aasc

    // 
    $('.configomatic__content--left .configomatic__combos .configomatic__combo.hasProduct').css('height', '100%');
    $('.configomatic__product-label').each(function (index) {
        const label = $(this).text();
        const parentAppend = $(this).parent('.configomatic__product--desc');
        console.log(label);

        const denicheur = "https://ledenicheur.fr/_internal/graphql";

        const dataToSend = {
            "id": "search",
            "query": label,
            "sort": "lowest_price",
            "order": "desc",
            "offset": 0,
            "filters": [
                { "id": "category_id", "selected": [] },
                { "id": "brand_id", "selected": [] },
                { "id": "lowest_price" },
                { "id": "user_rating" }
            ],
            "productModes": [
                "product", "raw"
            ],
            "campaignId": 4,
            "personalizationClientId": "190815444.1594560336",
            "pulseEnvironmentId": "sdrn:schibsted:environment:undefined"
        };
        $.get(denicheur, {
            release: "2020-07-10T10:36:05.933Z| 3063ec94",
            main: "search",
            version: "5b554d",
            variables: JSON.stringify(dataToSend)

        }, function (deniche) {
            //console.log(deniche.data.search.resources.products);

            let html = '';
            html += '<div class="configomatic__product-sublabel"><ul>';

            var products = deniche.data.search.resources.products.nodes;
            for (p in products) {
                product = products[p];

                if (product.type !== 'Product') {
                    continue;
                }
                console.log(product);
                html += '<li>Trouvé sur le dénicheur (' + product.name + ') à : <b>' + product.priceSummary.regular + '€</b></li>';
            }

            html += '</ul></div>';
            parentAppend.append(html);
        }, 'json');
    });
});