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
    console.log("CHANNEL -> " + api + channels[i]);
    $.ajax({
      type: "GET",
      url: api + channels[i],
      success: function(res) {
        console.log("res");
        console.log(res);

        var logo, name, status, url, streaming;

        name = res.display_name;

        logo = res.logo;

        if (logo === undefined) {
          logo =
            "https://www.innopinion.com/innopinion_01/static/images/no_logo.gif";
        }

        if (res.stream === null) {
          streaming = "Offline";
          status = "off";
        } else {
          streaming = res.stream.game;
          status = "on";
        }

        /* Get Channels */

        var urlCh = res._links.channel;
        var re = /https\:\/\/api\.twitch\.tv\/kraken/;
        var str = urlCh;
        var newstr = str.replace(re, "https://wind-bow.gomix.me/twitch-api");
        console.log("NEWSTR -> " + newstr);

        $.ajax({
          type: "GET",
          url: newstr,
          success: function(chRes) {
            console.log(chRes);
            logo = chRes.logo;
            name = chRes.display_name;
            url = chRes.url;
            // streaming = chRes.status;

            if (chRes.error) {
              logo =
                "http://cdn.maypalo.com/wp-content/uploads/2011/07/Error-logo1.png";
              name = "";
              status = "error";
              streaming = chRes.message;
              url = "#";
            }

            var content =
              '<a href="' +
              url +
              '" class="text-center" target="_blank" title="Visite ' +
              name +
              ' channel">' +
              '<div class="row ' +
              status +
              '">' +
              '<div class="col-md-3">' +
              '<img class="img-responsive center-block" width="100px" src="' +
              logo +
              '" alt=""/>' +
              "</div>" +
              '<div class="col-md-3">' +
              '<h5 class="text-center">' +
              name +
              "</h5>" +
              "</div>" +
              '<div class="col-md-6">' +
              "<h5>" +
              streaming +
              "</h5>" +
              "</div>" +
              "</div>" +
              "</a>";
            $("#container").prepend(content);
          },
          error: function() {
            // console.log("Error");
          }
        });

        /* ===== ==== */
      },
      error: function() {
        console.log("Error");
      }
    });
  }
});
