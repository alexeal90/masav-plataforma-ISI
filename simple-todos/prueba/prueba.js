if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // Cuando hacen click aquí tenemos que crear una partida
      switch(startgame.num_players){
          case 2:

          case 3:

          case 4:

          case 5:

    }
  });
}

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
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
