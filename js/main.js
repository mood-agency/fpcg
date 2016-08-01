$(document).ready(function () {
    //ACE Editor Init
    var editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/html");
    editor.getSession().setUseWrapMode(true);
    editor.renderer.setShowGutter(false);

    // ZeroClipboard Init
    var client = new ZeroClipboard(document.getElementById("copy-button"));
    ZeroClipboard.config({swfPath: "//cdn.jsdelivr.net/zeroclipboard/2.2.0/ZeroClipboard.swf"});
    client.on("ready", function (readyEvent) {
        // alert( "ZeroClipboard SWF is ready!" );

        client.on("aftercopy", function (event) {
            // `this` === `client`
            // `event.target` === the element that was clicked
            //event.target.style.display = "none";
            //alert("Copied text to clipboard: " + event.data["text/plain"]);
            //alert("Copied text to clipboard: " + event.data["text/plain"]);
            Materialize.toast('Copied text to clipboard!', 4000) // 4000 is the duration of the toast
        });
        client.on("beforecopy", function (event) {
            $('#copy-button').attr('data-clipboard-text', editor.getValue());
        });
    });

    //functions
    function rebuild() {

        if (typeof add == "undefined") add = "";
        var facebook_id = $('#facebook_id').val();

        code = "<!-- Facebook Pixel Code --> " + nl +
            "<script>!function (f, b, e, v, n, t, s) { " +
            "if (f.fbq)return;n = f.fbq = function () {n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)};" +
            "if (!f._fbq)f._fbq = n;n.push = n;n.loaded = !0;n.version = '2.0';n.queue = [];t = b.createElement(e);t.async = !0;t.src = v;s = b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t, s)}" +
            "(window,document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');" + nl +
            "fbq('init', '" + facebook_id + "');" + nl +
            add +
            "<\/script><noscript><img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=768181659980300&ev=PageView&noscript=1'/></noscript>" + nl +
            "<!-- End Facebook Pixel Code -->"

        $('#facebook_code').val(code);


        editor.setValue(code, 1) // moves cursor to the end
    }

    // Main
    var code = "";
    var nl = "\n";
    var add;
    rebuild();


    $('#facebook_id').keyup(function () {
        rebuild();
    });

    $('#options input').on('click', onInputClick);

    function onInputClick() {
        add = "";
        $('#options input').each(function () {
            if (this.checked) {
                params = eval($(this).attr('data-params'));
                add += "fbq('" + params[0] + "', '" + params[1] + "');" + "\n";
            }
        });
        rebuild();
    }





});

