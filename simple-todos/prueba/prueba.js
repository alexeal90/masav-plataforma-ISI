if (Meteor.isClient) {


  /****
        
    Subscripcion de las lsitas o bases de datos creadas en el servidor
  */
   
   Meteor.subscribe("UsersNick"); //Usersnicks referido a la lista de los usarios registrados en la aplicacion
   Meteor.subscribe("")   
   
  Tracker.autorun(function(){
        var game = Session.get("game");
  
  Meteor.subscribe("messages_game", game); // Mensajes del chat del juego
  
  Meteor.subscribe("matches_game", game);  // Marcador de las partidas
      });
  
  
  /*** Aqui empieza la ejecución del juego: desde el momento en que se cree la partida
  
  */
 
 
 
 
 // counter starts at    0
 //
  Meteor.startup(function(){
      Session.set("game", "none");  
      
      $('#container').hide();
      $(document).on("click", ".alert .close", function(e) {
          //Crear partida
      });
  });
  
  
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
          
          //Parseamos la lista que tendremos con los jugadores en cola de inciar partida
          // deacuerdo a lo que establezcamos
          case 2:
                // Se inicia la partida con dos jugadores
          case 3:
                //
          case 4:

          case 5:
                
          default:
                // Mensaje "No puede iniciar partida de momento, intentelo mas tarde"
    }
  });
}

Template.input.events = {
    'keydown input#chat_messages' : function (event){
        if (event.which == 13){
            if(Meteor.userId()){    //Aqui tenemos que comprobar si el usuario esta autenticado
                var usr_id= Meteor.user()._id; //Aqui buscamos el id de usuario
                var message = $('#chat_message');
                if (message.value.length == 0){
                    message.val('');
                }else{
                    message.val('');
                    Messages.insert({
                        usr_id: usr_id,
                        message: message.val(), 
                        date: Date.now(),
                        game_id:session.get("game")
                        
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
