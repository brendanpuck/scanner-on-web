    var socket = io.connect();
    socket.on('connected', function(data) {
      console.log('Connected, this is what I received : ');
    });
    // when you get a receiveSerial event, do this
    socket.on('receiveSerial', function(data) {
      console.log(data);

      $("#serialDisplay").val(data);

      //Split out RF data
      if (data.indexOf("RF") >= 0) {
        freq = data.substring(data.indexOf("RF") + 2);
        $("#frequency").val(freq.split(" ")[0]);
      };

      //Split out Level and Mute data
      if (data.indexOf("LM") >= 0) {
        levelData = data.substring(data.indexOf("LM") + 2);
        level = levelData.substring(0, 3);
        mute = levelData.substring(3, 4);
        $("#level").val(level.split(" ")[0] * -1);
      }

      //Split out and determine receiver mode
      if (data.indexOf("MD") >= 0) {
        modeData = data.substring(data.indexOf("MD") + 2);
        modeCode = modeData.split(" ")[0];
        $("#mode").val(modeCode.split(" ")[0]);
      }

      //Split out step rate
      if (data.indexOf("ST") >= 0) {
        step = data.substring(data.indexOf("ST") + 2);
        $("#step").val(step.split(" ")[0]);
      }


    });
