$(document).ready(function() {
  var channels = [
    "brunofin",
    "comster404 ",
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];

  var api = "https://wind-bow.gomix.me/twitch-api/streams/";

  /* Get Streams */
  for (var i = 0; i < channels.length; i++) {
    
    $.ajax({
      type: "GET",
      url: api + channels[i],
      dataType: 'jsonp',

      success: function(res) {
        var logo, name, status, url, streaming;
        name = res.display_name;
        logo = res.logo;

        if (logo === null) {
          logo =
            "https://s5.postimg.org/qeku3h3qv/no_logo.gif";
        }

        if (res.stream === null) {
          streaming = "Offline";
          status = "off";

          if (logo === null) {
            logo =
              "https://s5.postimg.org/qeku3h3qv/no_logo.gif";
          }
        } else {
          streaming = res.stream.game;
          status = "on";
        }

        /* Get Channels */
        var urlCh = res._links.channel;
        var re = /https\:\/\/api\.twitch\.tv\/kraken/;
        var str = urlCh;
        var newstr = str.replace(re, "https://wind-bow.gomix.me/twitch-api");

        $.ajax({
          type: "GET",
          url: newstr,
          dataType: 'jsonp',

          success: function(chRes) {
            logo = chRes.logo;
            name = chRes.display_name;
            url = chRes.url;

            if (logo === null) {
              logo =
                "https://s5.postimg.org/qeku3h3qv/no_logo.gif";
            }

            if (chRes.error) {
              logo =
                "https://s5.postimg.org/oo1t1zm7r/error-icon-4.png";
              name = '';
              status = "error";
              streaming = chRes.error;
              url = "#";
            }

            var content =
              '<a href="' + url + '" class="text-center" target="_blank" title="Visite ' + name + ' channel">' +
              '<div class="row ' +
              status +
              '">' +
              '<div class="col">' +
              '<img class="img-responsive center-block" width="100px" src="' +
              logo +
              '" alt=""/>' +
              "</div>" +
              '<div class="col">' +
              '<h5 class="text-center">' +
              name +
              "</h5>" +
              "</div>" +
              '<div class="col">' +
              "<h5>" +
              streaming +
              "</h5>" +
              "</div>" +
              "</div>" +
              "</a>";
            $("#container").prepend(content);
          }

        });
      }
    });
  }
});
