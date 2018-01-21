function update_last_location() {
    localStorage.setItem("mish-masechet", $.masechet);
    localStorage.setItem("mish-chap", $.chap);
    localStorage.setItem("mish-mishna", $.mishna);

}

function load_text() {
    console.log("loading text", $.masechet, $.chap, $.mishna)
    $('.header-title').text(mishna_text[$.masechet].name + ' ' + ($.chap+1).toString() + ' ' + ($.mishna+1).toString())
    $('.subject').text(mishna_text[$.masechet].text[$.chap][$.mishna]);
    update_last_location();
}

function next_masechet() {
    if ($.masechet+1 == mishna_text.length) {
        $.masechet = 0;
    }
    else {
        $.masechet += 1;
    }
}

function prev_masechet() {
    if ($.masechet == 0) {
        $.masechet = mishna_text.length - 1;
    }
    else {
        $.masechet -= 1;
    }
}

function next_chapter() {
    if ($.chap+1 == mishna_text[$.masechet].text.length) {
        $.chap = 0;
        next_masechet();
    }
    else {
        $.chap += 1;
    }
}

function prev_chapter() {
    if ($.chap == 0) {
        prev_masechet();
        $.chap = mishna_text[$.masechet].text.length - 1;
    }
    else {
        $.chap -= 1;
    }
}

function next_mishna() {
    if ($.mishna+1 == mishna_text[$.masechet].text[$.chap].length) {
        $.mishna = 0;
        next_chapter();
    }
    else {
        $.mishna += 1;
    }
    load_text();
}

function prev_mishna() {
    if ($.mishna == 0) {
        prev_chapter();
        $.mishna = mishna_text[$.masechet].text[$.chap].length -1;
    }
    else {
        $.mishna -= 1;
    }
    load_text();
}

$( document ).ready(function() {
    console.log( "ready!" );
    if(!(localStorage.getItem("mish-set"))) {
        console.error( "loading new config" );
        localStorage.setItem("mish-masechet", 0);
        localStorage.setItem("mish-chap", 0);
        localStorage.setItem("mish-mishna", 0);
        localStorage.setItem("mish-set", 1);
    }
    $.masechet = parseInt(localStorage.getItem("mish-masechet"));
    $.chap = parseInt(localStorage.getItem("mish-chap"));
    $.mishna = parseInt(localStorage.getItem("mish-mishna"));
    load_text();
});