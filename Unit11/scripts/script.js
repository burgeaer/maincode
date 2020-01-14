$(document).ready(function() {
    $('#letter-a a').click(function(event) {
        event.preventDefault();

        $.ajaxSetup({
            url: 'Examplea.html',
            type: 'POST',
            dataType: 'html'
        });

        $.ajax({
            type: 'GET',
            success: function(data) {
                $('#dictionary').html(data);
            }
        });
    });

    $('#letter-b a').click(function(event) {
        event.preventDefault();
        $.getJSON('b.json', function(data) {
            var html = '';
            $.each(data, function(entryIndex, entry) {
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.term + '</h3>';
                html += '<div class="part">' + entry.part + '</div>';
                html += '<div class="definition">';
                html += entry.definition;
                if (entry.quote) {
                    html += '<div class="quote">';
                    $.each(entry.quote, function(lineIndex, line) {
                        html += '<div class="quote-line">' + line + '</div>';
                    });
                    if (entry.author) {
                        html += '<div class="quote-author">' + entry.author + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
            });
            $('#dictionary').html(html);
        });
    });

    $('#letter-c a').click(function(event) {
        event.preventDefault();
        $.getScript('scripts/c.js');
    });

    $('#letter-d a').click(function(event) {
        event.preventDefault();
        $.get('d.xml', function(data) {
            $('#dictionary').empty();
            $(data).find('entry').each(function() {
                var $entry = $(this);
                var html = '<div class="entry">';
                html += '<h3 class="term">' + $entry.attr('term');
                html += '</h3>';
                html += '<div class="part">' + $entry.attr('part');
                html += '</div>';
                html += '<div class="definition">';
                html += $entry.find('definition').text();
                var $quote = $entry.find('quote');
                if ($quote.length) {
                    html += '<div class="quote">';
                    $quote.find('line').each(function() {
                        html += '<div class="quote-line">';
                        html += $(this).text() + '</div>';
                    });
                    if ($quote.attr('author')) {
                        html += '<div class="quote-author">';
                        html += $quote.attr('author') + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
                $('#dictionary').append($(html));
            });
        });
    });

    $('#letter-e a').click(function(event) {
        event.preventDefault();
        var requestData = {term: $(this).text()};
        $.get('e.php', requestData, function(data) {
            $('#dictionary').html(data);
        }).fail(function(jqXHR) {
            $('#dictionary')
                .html('Sorry, but an error occurred: ' + jqXHR.status)
                .append(jqXHR.responseText);
        });
    });

    $('#letter-f form').submit(function(event) {
        event.preventDefault();
        var formValues = $(this).serialize();
        $.get('f.php', formValues, function(data) {
            $('#dictionary').html(data);
        });
    });

    var url = 'http://examples.learningjquery.com/jsonp/g.php';
    $('#letter-g a').click(function(event) {
        event.preventDefault();
        $.getJSON(url + '?callback=?', function(data) {
            var html = '';
            $.each(data, function(entryIndex, entry) {
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.term + '</h3>';
                html += '<div class="part">' + entry.part + '</div>';
                html += '<div class="definition">';
                html += entry.definition;
                if (entry.quote) {
                    html += '<div class="quote">';
                    $.each(entry.quote, function(lineIndex, line) {
                        html += '<div class="quote-line">' + line + '</div>';
                    });
                    if (entry.author) {
                        html += '<div class="quote-author">' + entry.author + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
            });
            $('#dictionary').html(html);
        });
    });

    $('#letter-h a').click(function(event) {
        event.preventDefault();
        $('#dictionary').load('h.html .entry');
    });

    var $loading = $('<div id="loading">Loading...</div>')
        .insertBefore('#dictionary');

    $(document).ajaxStart(function() {
        $loading.show();
    }).ajaxStop(function() {
        $loading.hide();
    });

    $('body').on('click', 'h3.term', function() {
        $(this).siblings('.definition').slideToggle();
    });
});
