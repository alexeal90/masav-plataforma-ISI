if (Meteor.isClient) {
    /****
    Subscripcion de las lsitas o bases de datos creadas en el servidor
    */
    Meteor.subscribe("usersNick"); //Usersnicks referido a la lista de los usarios registrados en la aplicacion
    Tracker.autorun(function(){
        var game = Session.get("game");
        Meteor.subscribe("messages_game", game); // Mensajes del chat del juego
        Meteor.subscribe("matches_game", game); // Marcador de las partidas
    });
    /*** Aqui empieza la ejecución del juego: desde el momento en que se cree la partida
    */
    // counter starts at 0
    //
    Meteor.startup(function(){
        Session.set("game", "none");
            $('#CarcassoneContainer').hide();
            $(document).on("click", ".alert .close", function(e) {
            $('#CarcassoneContainer').show();       
        });
    });
    Session.setDefault("counter", 0);
    Template.hello.helpers({
    counter: function () {
    return Session.get("counter");
    }
    });


    Template.create.events({
        'click button': function () {
            // Cuando hacen click aquí tenemos que crear una partida
            match_name= parse($('#nombre').val());
            num_players= parseInt($('#num_jugadores').val());
            difficulty= $('input[name=level]:checked', '#game_features').val();         
            $("#start_game").click(function() {
                    matches_game.insert({
                        match_name: match_name;
                        num_players: num_players;
                        difficulty: difficulty;
                        owner: Meteor.userId();                    
                        owner_name: Meteor.user().username;
                    });
            })        
        }
    });

    Template.body.events({
        // Cuando hacen click aquí tenemos que crear una partida
                
    });


    Template.input.events = {
        'keydown input#chat_messages' : function (event){
            if (event.which == 13){
                if(Meteor.us//Aqui tenemos que comprobar si el usuario esta autenticado
                    var usr_id= //Aqui buscamos el id de usuario
                    var message = $('#chat_message')
                    if (message.value.length == 0){
                        message.val('');
                    }else{
                        message.val('');
                        Messages.insert({
                            usr_id:
                            message:
                            date:
                            game_id:
                        });
                }else{
                    alert("Error de autenticación");        
                }
            }
        }
}






if (Meteor.isServer) {
    Meteor.publish("UsersNick", function() {
        // publish only the field username of every user
        return Meteor.users.find ({}, {fields: {username:1}});
    });
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
