
    /****
    Subscripcion de las listas o bases de datos creadas en el servidor
    **/
     Meteor.subscribe("all_games"); 
     Meteor.subscribe("users_data"); 
     
     var Busy = {OnlyBusy:false,Busy_playing:false};
     var match_name;
         
     Tracker.autorun(function(){
        var current_game = Session.get("current_game");
        Meteor.subscribe("messages_current_game", current_game); // Mensajes del chat del juego
        Meteor.subscribe("matches_game", current_game); // Marcador de las partidas
             
    });
    
    Meteor.startup(function(){
        Session.set("current_game", "none");
            $('#gamecontainer').hide();
    			$('#container').hide();
    			$('#gamecarcas').hide();
    			$('#waiting_matches').hide();
    			
            $(document).on("click", ".alert .close", function(e) {
            	$(this).parent().hide();       
        });
        $('#game_features').hide();
       // $('#waiting_for_players').hide();
        $('#display_match_started').hide();
    });

    var currentUser = null;
		Tracker.autorun(function(){
		console.log("current user: " + currentUser);
		currentUser = Meteor.userId();
		console.log("current user: " + currentUser);
	});


   Template.options.events({                 
        'click #start_game': function () {
		     match_name=$('#nombre').val();
		     var score= 0;
		     var status= 'Waiting';
		     var usuid = Meteor.userId();
		     var usu = Meteor.users.findOne(usuid);
             match_object_insert = Matches_games.findOne({match_name:match_name});
		     match_created = Matches_games.findOne({match_name:match_name});
		     console.log(match_created);
		     if (match_created != undefined){ 
		        alert("The name of the match is already used, please, try other.");
		     }else{
			    n_players= parseInt($('input[name=n_players]:checked', '#game_features').val());   
		        $('#game_features').hide();
		        $('#display_matches').hide();
		        Matches_games.insert({
				    id_user: usuid,
		            match_name: match_name,
		            num_players: n_players,
		                    //difficulty: difficulty,
		                    //owner: Meteor.userId(),                   
		                    //owner_name: Meteor.users().nick,
		                    //score: score,
		            status: status,
		                    //date: Date.now()                   
		        });
			    console.log(n_players);	
			    console.log(match_name);
			    Busy.OnlyBusy = true;
                $('waiting_for_players').show();
		                //Meteor.call('add_player',match_name);
             }
        },

        'click #close_options': function () {
                $('#game_features').hide();
                $('#display_matches').show();
                var game = Games.findOne({name:"Carcassonne"});
		     		 Session.set("current_game", game._id);
        },

	    'click #wait_cancel': function () {
                $('#waiting_for_players').hide();
                $('#display_matches').show();
                match_object = Matches_games.findOne({match_name:match_name});
        		console.log(match_object);
        		console.log(match_object._id);
		        Matches_games.remove(match_object._id)
                        alert("Su partida ha sido cancelada satisfactoriamente.");
		        Busy.OnlyBusy = false;
        },

        'click #wait_start': function () {
                $('#waiting_for_players').hide();
		        match_object2 = Matches_games.findOne({match_name:match_name});
		
		        console.log(match_object2);
	  	        console.log(match_object2._id);

                alert("Su partida ha comenzado.");
		        Busy.Busy_Playing = true;
		        Busy.OnlyBusy = false;
		        Matches_games.update(match_object2._id,{$set: {status: "Started"}});
		        $('#display_match_started').show();
	}
    });
                 
      

    Template.join_match.events({        
        'click button': function (){
            var array_players = [];
            $("#join_match").click(function() {
                            matches_game.insert({
                                 array_player_names: array_players.push({name_player:Meteor.userId()})         
                            });               
            })               
        }
    });


 //Nos falta la funcion que nos daran los de la i.a para enchufarles lo que se extraiga del array_player_names

    // Para unirse a un juego (carcassone, alliensInvasion...)
    // Template.join_game.events({
       
    //     'click button': function (){
    //         $("#join_game").click(function() {
    //                     games.insert({
    //                             id_game:id_game,   // obtener el valor de id_game   
    //                             game_type:game_type // obtener el game_type
    //                     });   
    //     			})
    // 			}      
    // });

Template.menu_bar.events = {
		 'click #AI_button': function () {
		     if(!Busy.OnlyBusy){
			     console.log("Template.menu_bar.events");
			     $('#container').show();
			     $('#gamecontainer').hide();
			     $('#gamecarcas').hide();
			     $('#waiting_matches').hide();
			     var game = Games.findOne({name:"AlienInvasion"});
			     Session.set("current_game", game._id);
		     }
		 },
		 'click #FW_button': function () {
		     if(!Busy.OnlyBusy){
			     $('#container').hide();
			     $('#gamecontainer').show();
			     $('#gamecarcas').hide();
			     $('#waiting_matches').hide();
			     var game = Games.findOne({name:"FrootWars"});
			     Session.set("current_game", game._id);
		     }
		 },
		 'click #CC_button': function () {
		     if(!Busy.OnlyBusy){
			     $('#container').hide();
			     $('#gamecontainer').hide();
			     $('#gamecarcas').hide();
			     $('#waiting_matches').show();
			     $('#display_matches').show();
			     $('#game_features').hide();
			     var game = Games.findOne({name:"Carcassonne"});
			     Session.set("current_game", game._id);
		     }
		 },
		
		 'click #New_G': function () {
             if(!Busy.OnlyBusy && !Busy.Busy_Playing){
                if(Meteor.userId()){
		           $('#container').hide();
		           $('#gamecontainer').hide();
		           $('#game_features').show();
		           $('#waiting_matches').show();
                   $('#display_matches').hide();
                   var game = Games.findOne({name:"Carcassonne"});
		           Session.set("current_game", game._id);            
	            }else{
                   alert("You must be logged in for create a match");
                }	
            }
         }
	}

	Template.chat.none = function (){
		 return Session.get("current_game") == "none";
	}



    Template.draw_matches.events= function(){   
                $('#display_matches').show();		     

                var game_id = $('<div>') ;
                game_id.attr("class" , "breadcrumb estilopartida");
                game_id.attr("id", usuario.id);
                $('#display_valeirano').append(game_id);

   
                var match_name = $('<span>') ;
                match_name.text(match_name);
                game_id.append(match_name);  



                var divider = $('<div>');
                game_id.append(divider) ;  
                var split_bar = $('<span>') ;
                user_name.text("|");
                game_id.append(split_bar);                                      
                game_id.append(divider) ;  


                var match_players = $('<span>') ;
                match_players.text(n_players);
                game_id.append(match_players);


                game_id.append(divider) ;  
                game_id.append(split_bar);                                      
                game_id.append(divider) ;  


                var match_owner = $('<span>') ;
                match_owner.text(usu);
                game_id.append(match_owner);


                var content_button = $('<button>') ; 
                content_button.attr("class", "glyphicon glyphicon-play play_button") ;
                content_button.attr("id","desplegar_us") ;
                game_id.append(play_button) ; 
                
    }


   Template.chat_messages.messages = function () {

		 var messagesColl =  Messages_games.find({}, { sort: { time: -1 }});
		 var messages = [];

		 messagesColl.forEach(function(m){
		 		console.log('traza1');
		     var userName = Meteor.users.findOne(m.user_id).username;
		     messages.push({name: userName , message: m.message});
		     console.log('traza2');
		 });

    	return messages;
	}
    
	Template.chat.gameName = function (){
		 var game_id = Session.get("current_game");         
		 if (game_id)
              var game_name = Games.findOne({_id: game_id}).name; 
         console.log("**************" + game_name);		 
         return game_name;
	}

    
    
   // Mostrar la puntuación de cada jugador, a partir de la base de datos de users_data
    // Template.players.players_points = function(){
      
    // 		 var users_data= Users_data.find ({}, {sort: {time:-1}});
    // 		 var list_players = [];
    // 		 users_data.forEach (function (u) {
    // 		     var user = Meteor.users.findOne({_id:partida.usr_id});
    // 		     if(user){
    // 		         list_players.push({puntos: u.usr_score, player:u.nick}) // El         
    // 		     }
    // 		 });
    
    // 	 return list_players;    
    //  }

	Template.input.events = {
		 'keydown input#message' : function (event) {
		     if (event.which == 13) {
		     console.log('has pulsado intro');
		         if (Meteor.userId()){
		             var user_id = Meteor.user()._id;
		             var message = $('#message');
		             if (message.value != '') {
		             	console.log('guardo el mensaje');
		                 Messages_games.insert({
		                     user_id: user_id,
		                     message: message.val(),
		                     time: Date.now(),
		                     game_id: Session.get("current_game")
		                 });
		                 message.val('')
		             }
		         }
		         else {
		             $("#login-error").show();
		         }
		     }
		 } 
	}
	
   Accounts.ui.config({
             passwordSignupFields: "USERNAME_ONLY"
   });
