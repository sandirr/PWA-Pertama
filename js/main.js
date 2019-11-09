$(document).ready(function () {
    var _url = "https://my-json-server.typicode.com/sandirr/pwaapi/products"

    var dataResults = ''
    var catResults = ''
    var categories = []

    $.get(_url, function (data) {

        $.each(data, function (key, items) {
            dataResults += "<div>" +
                "<h3>" + items.name + "</h3>" +
                "<p>" + items.category + "</p>"
            "</div>";

            if ($.inArray(items.category, categories) == -1) {
                categories.push(items.category)
                catResults += "<option value='" + items.category + "''>" + items
                    .category + "</option>"
            }
        });

        $('#products').html(dataResults)
        $('#cat_select').html("<option value='all'>All</option>" + catResults)


    });

    // filtering
    $('#cat_select').on('change', function () {
        updateProducts($(this).val())
    })

    function updateProducts(cat) {
        var dataResults = ''
        var _newUrl = _url
        if (cat != 'all') {
            _newUrl = _url + "?category=" + cat
        }
        $.get(_newUrl, function (data) {
            $.each(data, function (key, items) {
                dataResults += "<div>" +
                    "<h3>" + items.name + "</h3>" +
                    "<p>" + items.category + "</p>"
                "</div>";
            });

            $('#products').html(dataResults)



        });
    }

})



if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration
                .scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}