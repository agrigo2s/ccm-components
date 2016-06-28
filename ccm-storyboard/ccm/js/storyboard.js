ccm.component( {
    name: 'storyboard',
    config: {
        style: [ ccm.load, 'ccm/css/style.css' ],
        html:  [ ccm.store, { local: 'ccm/js/json/template.json' } ]  // Einbindung der HTML-Templates
    },
    Instance: function () {
        this.render = function(callback){
            var counter = 1;
            var self = this;
            var element = ccm.helper.element(this);

            var story = ccm.helper.find( self, 'story' );
            element.html( ccm.helper.html( this.html.get( 'main' ) ) );

            var app_wrap = ccm.helper.find( this, '.app_wrap' );
            app_wrap.append( ccm.helper.html( this.html.get( 'headline' ) ) );


            var headline = ccm.helper.find( this, '.headline' );
            headline.append( ccm.helper.html( "Storyboard" ) ) ;

            
            app_wrap.append( ccm.helper.html( this.html.get( 'input' ), { onsubmit: function () {


                if ( ccm.helper.find( self, '.story_inp_title' ).val() == "" )
                {
                    alert("Bitte geben Sie Ihren Namen ein!")
                }
                else if (ccm.helper.find( self, '.story_inp_text' ).val() == "")
                {
                    alert("Bitte einen Titel eingeben!")

                }
                else if (ccm.helper.find( self, '.story_inp_name' ).val() == "" )
                {
                    alert("Bitte einen Text eingeben!")
                }
                else {
                    app_wrap.append( ccm.helper.html( self.html.get( 'story'),{
                        id : "<b>ID: </b>"+ counter,
                        date : "<b>Datum: </b>"+ new Date(),
                        name : "<b>Name: </b>"+ ccm.helper.find( self, '.story_inp_name' ).val(),
                        title : "<b>Titel: </b>"+ ccm.helper.find( self, '.story_inp_title' ).val(),
                        text : "<b>Text: <br></b>"+ccm.helper.find( self, '.story_inp_text' ).val()
                    } ) );
                    counter ++;
                    $( "div.temp" ).toggleClass( "story"+counter );
                    $( "div.temp" ).toggleClass( "temp" );
                }
                return false;

            } } ) );
            app_wrap.append( ccm.helper.html( this.html.get( 'delete_div' ), { onclick: function () {
                if (counter > 1)
                {
                    $(".story"+counter).remove();
                    counter --;
                }


                return false;

            } } ) );

            if(callback) callback();
        }
    }
});