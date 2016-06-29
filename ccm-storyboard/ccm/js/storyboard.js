ccm.component( {
    name: 'storyboard',
    config: {
        style: [ ccm.load, 'ccm/css/style.css' ],
        key: 'storyBoard',
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'agrigo2s_storyBoard' } ],
        html:  [ ccm.store, { local: 'http://www2.inf.fh-bonn-rhein-sieg.de/~agrigo2s/ccm/js/json/template.json' }], // Einbindung der HTML-Templates
        user:  [ ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user2.js' ]
    },
    Instance: function () {
        var self = this;
        this.init = function ( callback ) {
            self.store.onChange = function () {
                self.render();
            };

            callback();

        };
        self.render = function (callback) {
            var element = ccm.helper.element(self);
            element.html(ccm.helper.html(self.html.get('main')));

            self.store.get(self.key, function (dataset) {

                if (dataset === null)
                    self.store.set({key: self.key, userStorys: []}, proceed);
                else
                    proceed(dataset);

                function proceed(dataset) {

                    var main = ccm.helper.find(self, '.main');

                    var story = ccm.helper.find(self, 'story');
                    var app_wrap = ccm.helper.find(self, '.app_wrap');
                    app_wrap.append(ccm.helper.html(self.html.get('headline')));


                    var headline = ccm.helper.find(self, '.headline');
                    headline.append(ccm.helper.html("Storyboard"));

                    app_wrap.append( ccm.helper.html( self.html.get( 'input' ), { onsubmit: function () {
                            if (ccm.helper.find(self, '.story_inp_title').val() == "") {
                                alert("Bitte geben Sie Ihren Namen ein!")
                            }
                            else if (ccm.helper.find(self, '.story_inp_text').val() == "") {
                                alert("Bitte einen Titel eingeben!")

                            }
                            else if (ccm.helper.find(self, '.story_inp_name').val() == "") {
                                alert("Bitte einen Text eingeben!")
                            }
                            else {
                                var iTitle = "<b>Titel: </b>" + ccm.helper.find(self, '.story_inp_title').val();
                                var iText = "<b>Text: <br></b>" + ccm.helper.find(self, '.story_inp_text').val();

                                self.user.login( function () {

                                    dataset.userStorys.push({
                                        date: "<b>Datum: </b>"+ new Date(),
                                        title: iTitle,
                                        text: iText,
                                        name: "<b>Name: </b>"+ self.user.data().key
                                    });

                                    self.store.set(dataset, function () {
                                        self.render();
                                    });
                                });

                                app_wrap.append(ccm.helper.html(self.html.get('story'), {
                                    date: "<b>Datum: </b>" + new Date(),
                                    name: "<b>Name: </b>" + ccm.helper.find(self, '.story_inp_name').val(),
                                    title: iTitle,
                                    text: iText
                                }));
                                $("div.temp").toggleClass("story" );
                                $("div.temp").toggleClass("temp");
                            }
                            return false;

                        }
                    }));
                    app_wrap.append(ccm.helper.html(self.html.get('delete_div'), {
                        onclick: function () {

                            self.user.login( function () {

                                dataset.userStorys.pop();

                                self.store.set(dataset, function () {
                                    self.render();
                                });
                            });


                        }
                    }));

                    for (var i = 0; i < dataset.userStorys.length; i++) {

                        var userStory = dataset.userStorys[i];

                        app_wrap.append(ccm.helper.html(self.html.get('story'), {
                            date: ccm.helper.val(userStory.date),
                            name: ccm.helper.val(userStory.name),
                            title:ccm.helper.val(userStory.title),
                            text: ccm.helper.val(userStory.text)
                        }));
                    }

                    if (callback) callback();}
            })
        }
    }

});