// When ready...
$(function() {
    var peer = new Peer({key: 'm5ps7rc443voyldi'});

    peer.on('open', function(id) {
      $('#local-peer-id').val(id);
    });

    var conn = peer.connect('id');

    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        console.log(data);
        $('#text-receiver').val(data);
      });
    });

    var openedConn = null;

    $('#send').on('click', function() {
        var text = $('#text-sender').val();
        openedConn.send(text);
    })

    $('#connect').on('click', function() {
        $('#send').prop('disabled', true);
        $('#error').text('');
        var id = $('#remote-peer-id').val();
        var conn = peer.connect(id);
        conn.on('open', function() {
            $('#send').prop('disabled', false);
            openedConn = conn;
        })
        conn.on('error', function(error) {
            $('#error').text(error)
        })
    })
});
