
var app = {};

app.letter = {};

app.atoz = 'abcdefghijklmnopqrstuvwxyz';

app.readString = app.atoz;

app.atoz.split('').forEach(
    function (x) {
        app.letter[x] = new Audio('audio/female/'+ x +'.mp3');
    }
);

app.say = function (x) {
    app.letter[x.toLowerCase()].play();
};

app.pause = 3000;

app.showTheString = function () {
    var str = '';
    app.readString.toUpperCase().split('').forEach(function (x) {
        str += '<span class="alphabet" aa-val="'+x+'">'+x+' </span>';
    });
    $('#theString').html(str);

    $('.alphabet').click(function (x) {
        var letter = this.attributes['aa-val'].value;
        app.say(letter);
        $(this).addClass('clicked');
    });
}

app.dictate = function (str) {
    var head = str[0];
    var tail = str.slice(1);

    if (head === undefined) {
        app.showTheString();
        return;
    }

    app.say(head);
    window.setTimeout(function () {
        app.dictate(tail);
    }, app.pause);
};


app.initialize = function () {
    $('#pause').html(app.pause);

    $('#faster').click(function () {
        var min = 700,
            step = 100;
        app.pause = app.pause - step < min ? min : app.pause - step;
        $('#pause').html(app.pause);
    });

    $('#slower').click(function () {
        var max = 5000
            step = 100;
        app.pause = app.pause + step > max ? max : app.pause + step;
        $('#pause').html(app.pause);
    });

    $('#dictate').click(function () {
        $('#theString').html('');
        app.readString = app.shuffle(app.atoz.slice(0));
        app.dictate(app.readString);
    });

    $('#randomize').click(function () {
        app.readString = app.shuffle(app.atoz.slice(0));
    });

    $('#show').click(function () {
        app.showTheString();
    });
};



/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
app.shuffle = function (str) {
    var a = str.split('');
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a.join('');
};
