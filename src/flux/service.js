// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2019 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localizes from './data/localizes.json';
const audio_source = Constants.settings.audio_source;
const alternative_audio_source = Constants.settings.alternative_audio_source;
const do_audio_source_alter = Constants.settings.do_audio_source_alter;




const copyToClipboard = str => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
}

const setCookie = (cname, cvalue, exdays)=> {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname)=> {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};



function Service(NoService, Dispatcher, DarkThemeState) {
  // [Loading Stage Forward]
  Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:10}});

  let Services = {
    NoTalk: null,
    gotoandPlay: null
  };

  let lang = getCookie('lang');
  let dark_theme = getCookie('dark_theme');
  if(!dark_theme) {
    dark_theme = Constants.settings.default_theme;
    setCookie('dark_theme', dark_theme, 360);
  }
  if(dark_theme==='true')
    dark_theme = true
  if(dark_theme==='false')
    dark_theme = false
  if(!lang) {
    lang = Constants.settings.default_lang;
    setCookie('lang', lang, 360);
  }

  let gotoandPlay_audio = new Audio(audio_source);
  let alter_gotoandPlay_audio = false;
  let gotoandPlay_audio_playing = false;
  let programs = {};
  let notalk_channel_id = '478aa4d1-8bcb-4d20-b661-f502e0026166';
  let refresh_interv_min = 0.8;
  let now_program = null;


  const update_program = ()=> {
    // let date = new Date('2019-10-28 21:00');
    let date = new Date();
    console.log('now program updated.');

    let date_string = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();;
    let todays_day = date.getDay();
    let todays_day_start_with_mon = todays_day===0?6:todays_day-1;
    // console.log([programs, todays_day_start_with_mon, todays_day]);

    if(programs.show_days&&programs.show_days[todays_day_start_with_mon]) {
      now_program = null;
      let now_segment = null;
      for(let segment in programs.segments) {
        let matches = /(\d{2}:\d{2}).*(\d{2}:\d{2})/g.exec(segment);
        // console.log([segment, matches]);
        if(date>=new Date(date_string+' '+matches[1]) && date<new Date(date_string+' '+matches[2])) {
          now_program = programs.segments[segment][todays_day_start_with_mon];
          now_segment = segment;
        }
      }
      if(now_program) {
        // console.log(now_program);
        Dispatcher.dispatch({type: 'updatePlayer', data: {
          type: "stream",
          title: now_program.description?(Localizes[lang].header_title+' - ['+now_program.title+'] '+now_program.description):(Localizes[lang].header_title+' - ['+now_program.title+']'),
          playing: gotoandPlay_audio_playing
        }});

        Dispatcher.dispatch({type: 'updateProgramNow', data: {
          segment: now_segment,
          title: now_program.title,
          day: todays_day_start_with_mon
        }});
        if(alter_gotoandPlay_audio) {
          gotoandPlay_audio = new Audio(audio_source);
        }
        alter_gotoandPlay_audio = false;
      }
      else {
        Dispatcher.dispatch({type: 'updatePlayer', data: {
          type: "stream",
          title: Localizes[lang].header_title+' Online Radio - '+Localizes[lang].no_program+' - '+alternative_audio_source,
          playing: gotoandPlay_audio_playing
        }});
        if(!alter_gotoandPlay_audio&&do_audio_source_alter) {
          gotoandPlay_audio = new Audio(alternative_audio_source);
          alter_gotoandPlay_audio = true;
        }
      }
    }
    else {
      Dispatcher.dispatch({type: 'updatePlayer', data: {
        type: "stream",
        title: Localizes[lang].header_title+' Online Radio - '+Localizes[lang].no_program+' - '+alternative_audio_source,
        playing: gotoandPlay_audio_playing
      }});
      if(!alter_gotoandPlay_audio&&do_audio_source_alter) {
        gotoandPlay_audio = new Audio(alternative_audio_source);
        alter_gotoandPlay_audio = true;
      }
    };
    // let today = ;
  };


  const update_program_recur = ()=> {
    if(gotoandPlay_audio_playing) {
      update_program();
      setTimeout(()=>{
        update_program_recur();
      }, refresh_interv_min*1000*60);
    }
    else {
      Dispatcher.dispatch({type: 'updatePlayer', data: {
        type: "stream",
        playing: gotoandPlay_audio_playing
      }});
    }
  };

  const NoTalkToChatWindow = (msg)=> {
    return { type: 'text', data:{text: (msg[0]?Localizes[lang].user+'('+msg[0].slice(0, 8)+'): ':''+Localizes[lang].guest+': ')+'\n'+msg[2]}};
  };

  const ChatWindowToNoTalk = (msg)=> {
    if(msg.data.text) {
      return [0, msg.data.text, null];
    }
    else if(msg.data.emoji) {
      return [0, msg.data.emoji, null];
    }
  };

  let setupOnline = ()=> {
    try {
      NoService.createActivitySocket('NoTalk', (err, NoTalk)=> {
        // [Loading Stage Forward]

        Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:20}});
        if(err) {
          console.log(err);
          setTimeout(setupOnline, 15*1000);
        }
        else {
          Services.NoTalk = NoTalk;
          NoService.createActivitySocket('gotoandPlay', (err, gotoandPlay)=> {
            // [Loading Stage Forward]

            Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:30}});
            if(err) {
              console.log(err);
              setTimeout(setupOnline, 15*1000);
            }
            else {
              Services.gotoandPlay = gotoandPlay;
              // this.enqueueSnackbar('Connected to noservice.', {variant: 'success'});
              // [Loading Stage Forward]
              Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:40}});
              // Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: false, show: false}});
              Services.gotoandPlay.on('close', ()=> {
                this.enqueueSnackbar('Connection closed!', {variant: 'error'});
                Dispatcher.dispatch({type: 'updateConnectionFail', data: true});
                Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: false, show: true}});
                Services.NoTalk = Services.gotoandPlay = null;
                setTimeout(setupOnline, 15*1000);
              });

              this.setupDispatchers();
              this.Actions.loadOnlineCount();
              this.Actions.loadPrograms();
              this.Actions.loadSuggestedInformationCards();

              // chat
              Services.gotoandPlay.call('getAboutUsInfoCardId', null, (err, about_us_info_card_id)=> {
                Dispatcher.dispatch({type: 'updateAboutUsInformationCardId', data: about_us_info_card_id});
                Services.gotoandPlay.call('getChatroomSettings', null, (err, chat_room_settings)=> {
                  // [Loading Stage Forward]
                  Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:75}});
                  Dispatcher.dispatch({type: 'updateChatroomSettings', data: chat_room_settings});
                  notalk_channel_id = chat_room_settings.channel_id;
                  Services.NoTalk.call('bindChs', {i: [notalk_channel_id]}, (err)=> {
                    Services.NoTalk.call('getChMeta', {c: notalk_channel_id}, (err, meta)=> {
                      if(err) {
                        console.log(err);
                      }
                      // [Loading Stage Forward]
                      Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:90}});
                      Dispatcher.dispatch({type: 'updateChatroomMeta', data: meta});
                      Services.NoTalk.call('getMsgs', {i: notalk_channel_id, r: 512}, (err, json)=> {
                        if(err) {
                          console.log(err);
                        }
                        // [Loading Stage Forward]
                        Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: true, progress_percent:95}});
                        let new_messeges = [];
                        for(let i in json.r) {
                          new_messeges.push(NoTalkToChatWindow(json.r[i]));
                        };

                        Dispatcher.dispatch({type: 'updateMessages', data: new_messeges});
                        Dispatcher.dispatch({type: 'updateLatestLine', data: parseInt(Object.keys(json.r)[Object.keys(json.r).length-1])});
                        Dispatcher.dispatch({type: 'readLatestLine'});
                        Dispatcher.dispatch({type: 'appendMessage', data: { type: 'text', data:{text: '['+Localizes[lang].welcome_message+'] \n'+chat_room_settings.welcome_message}}});
                        Dispatcher.dispatch({type: 'addLatestLine'});
                        // [Loading Stage Forward]
                        Dispatcher.dispatch({type: 'updateLoadingStatus', data: {determinate: true, show: false, progress_percent:100}});
                      });
                    });
                  });
                });
              });
            }
          });
        }
      });
    }
    catch (e) {
      setTimeout(setupOnline, 15*1000);
    }
  };

  this.Actions = {
    copyToClipboard: (title, content)=> {
      copyToClipboard(content);
      this.enqueueSnackbar(title);
    },
    sendMessage: (msg, callback)=> {
      // command support
      if(msg.data.text&&msg.data.text[0]==='/') {
        Dispatcher.dispatch({type: 'appendMessage', data: { type: 'text', data:{text: '[NoShell Client] \n'+msg.data.text.slice(1)}}});
        let op = ()=> {
          Services.NoShell.call('sendC', {c: msg.data.text.slice(1)}, (err, json)=>{
            Dispatcher.dispatch({type: 'appendMessage', data: { type: 'text', data:{text: '[NoShell] \n'+json.r}}});
          });
        };
        if(!Services.NoShell) {
          NoService.createActivitySocket('NoShell', (err, NoShell)=>{
            if(err) {
              console.log(err);
            }
            else {
              Services.NoShell=NoShell;
              op();
            }
          });
        }
        else {
          op();
        }
      }
      else if(Services.NoTalk&&notalk_channel_id)
        Services.NoTalk.call('sendMsg', {i: notalk_channel_id, c: ChatWindowToNoTalk(msg)}, (err, json)=> {
          if(callback)
            callback(err);
        });
    },
    readLine: ()=> {
      Dispatcher.dispatch({type: 'readLatestLine'});
      Dispatcher.dispatch({type: 'toggleChatRoom'});
    },
    relaunchNoService: ()=> {
      let op = ()=> {
        Services.NoShell.call('sendC', {c: 'daemon relaunch'}, (err, json)=>{
          this.enqueueSnackbar(Localizes[lang].relaunch+': '+json.r);
          setTimeout(setupOnline, 5*1000);
        });
      };
      if(!Services.NoShell) {
        NoService.createActivitySocket('NoShell', (err, NoShell)=>{
          if(err) {
            console.log(err);
          }
          else {
            Services.NoShell=NoShell;
            op();
          }
        });
      }
      else {
        op();
      }
    },
    logout: ()=> {
      NoService.logout();
    },
    importLocalizes: (data)=> {
      Dispatcher.dispatch({type: 'updateLocalizes', data: data});
    },
    updateNews: (data)=> {
      Dispatcher.dispatch({type: 'updateNews', data: data});
    },
    updateInfos: (data)=> {
      Dispatcher.dispatch({type: 'updateInfos', data: data});
    },
    updateInfomationCards: (data)=> {
      Dispatcher.dispatch({type: 'updateInfomationCards', data: data});
    },
    updateAlbumCards: (data)=> {
      Dispatcher.dispatch({type: 'updateAlbumCards', data: data});
    },
    updateAlbumDecks: (data)=> {
      Dispatcher.dispatch({type: 'updateAlbumDecks', data: data});
    },
    updateInformationCard: (data, callback)=> {
      if(data.CardId) {
        if(Services.gotoandPlay)
          Services.gotoandPlay.call('updateInfoCard', data, (err, result)=> {
            Dispatcher.dispatch({type: 'updateInformationCard', data: data, callback: callback});
            callback(err);
          });
      }
      else {
        if(Services.gotoandPlay)
          Services.gotoandPlay.call('createInfoCard', data, (err, result)=> {
            console.log(result);
            Dispatcher.dispatch({type: 'updateInformationCard', data: data, callback: callback});
            callback(err);
          });
      }

    },
    loadInformationCard: (CardId)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getInfoCard', CardId, (err, result)=> {
          if(!result) {
            result = {};
            result.CardId = CardId;
            result.Title = Localizes[lang].null;
            result.Description = Localizes[lang].info_cards+'('+CardId+') '+Localizes[lang].null;

          }
          Dispatcher.dispatch({type: 'updateInformationCard', data: result});
        });
    },
    updateLoadingStatus: (data)=> {
      setTimeout(()=>{Dispatcher.dispatch({type: 'updateLoadingStatus', data: data});}, 0);
    },
    toggleTheme: (data)=> {
      dark_theme =  (dark_theme===true?false:true);
      setCookie('dark_theme', dark_theme, 360);
      DarkThemeState[1](dark_theme);
    },
    loadSuggestedInformationCards: ()=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getSuggestedInfoCards', null, (err, result)=> {
          let op =  (CardId)=> {
            Services.gotoandPlay.call('getInfoCard', CardId, (err, result)=> {
              if(result)
                Dispatcher.dispatch({type: 'updateInformationCard', data: result});
            });
          };
          for(let i in result) {
            op(result[i]);
          };
          update_program();
          Dispatcher.dispatch({type: 'updateSuggestedInformationCards', data: result});
        });
    },
    updateSuggestedInformationCards: (data)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('updateSuggestedInfoCards', data, (err, result)=> {
          Dispatcher.dispatch({type: 'updateSuggestedInformationCards', data: result});
        });
    },
    updateAboutUsInfoCardId: (data)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('updateAboutUsInfoCardId', data, (err, result)=> {
          Dispatcher.dispatch({type: 'updateAboutUsInformationCardId', data: result});
        });
    },
    addSuggestedInformationCards: (data)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('addSuggestedInfoCards', data, (err, result)=> {
          Dispatcher.dispatch({type: 'addSuggestedInformationCards', data: data});
        });
    },
    deleteSuggestedInformationCards: (data)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('deleteSuggestedInfoCards', data, (err, result)=> {
          Dispatcher.dispatch({type: 'deleteSuggestedInformationCards', data: data});
        });
    },
    updateBackendReact: (callback)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('updateReact', null, (err, data)=> {
          // Dispatcher.dispatch({type: 'updatePrograms', data: data});
          callback(data);
        });
      // Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
    },
    updatePrograms: (data, callback)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('updatePrograms', data, (err, data)=> {
          // Dispatcher.dispatch({type: 'updatePrograms', data: data});
          callback(false);
        });
      // Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
    },
    updateChatroomSettings: (data, callback)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('updateChatroomSettings', data, (err)=> {
          // Dispatcher.dispatch({type: 'updatePrograms', data: data});
          Dispatcher.dispatch({type: 'updateChatroomSettings', data: data});
          callback(false);
        });
      // Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
    },
    emitSignin: ()=> {
      Dispatcher.dispatch({});
    },
    switchLang: ()=> {
      lang = (lang === "zh")? "en": "zh";
      setCookie('lang', lang, 360);
      this.enqueueSnackbar(Localizes[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    updateLang: (l)=> {
      lang = l
      setCookie('lang', lang, 360);
      this.enqueueSnackbar(Localizes[lang].switch_this_lang);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    initLang: (l)=> {
      lang = l
      setCookie('lang', lang, 360);
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    FastForwardAudio: ()=> {
      gotoandPlay_audio.currentTime += 5;
      // this.enqueueSnackbar(Localizes[lang].fast_forward+' 10s');
    },
    FastRewindAudio: ()=> {
      gotoandPlay_audio.currentTime -= 5;
      // this.enqueueSnackbar(Localizes[lang].fast_forward+' 10s');
    },
    switchMainStream: ()=> {
      if(gotoandPlay_audio_playing) {
        gotoandPlay_audio_playing = false;
        gotoandPlay_audio.pause();
        this.enqueueSnackbar(Localizes[lang].pause_playing);
      }
      else {
        gotoandPlay_audio_playing = true;
        gotoandPlay_audio.play();
        this.enqueueSnackbar(Localizes[lang].continue_playing);
      }

      update_program_recur();
    },
    pushNotification: (data)=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('pushNotification', data, (err, data)=> {
          this.enqueueSnackbar('Notification pushed.', {variant: 'succeess'});
        });
    },
    loadAllInformationCards: ()=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getAllInfoCards', null, (err, data)=> {
          let dict = {};
          for(let i in data) {
            dict[data[i].CardId] = data[i];
          }
          this.Actions.updateInfomationCards(dict);
        });
    },
    loadOnlineCount: ()=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getOnlineCount', null, (err, data)=> {
          Dispatcher.dispatch({type: 'updateOnlineCount', data: data});
        });
    },
    loadPrograms: ()=> {
      if(Services.gotoandPlay)
        Services.gotoandPlay.call('getPrograms', null, (err, data)=> {
          programs = data;
          Dispatcher.dispatch({type: 'updatePrograms', data: data});
        });
    }
  };

  this.setupDispatchers = ()=> {
    if(Services.NoTalk) {
      Services.NoTalk.onEvent('Message', (err, json)=> {
        Dispatcher.dispatch({type: 'appendMessage', data: NoTalkToChatWindow(json.r)});
        Dispatcher.dispatch({type: 'addLatestLine'});
        this.enqueueSnackbar(Localizes[lang].chat_room+': '+json.r[2], {variant: 'info'});
      });
      Services.NoTalk.onEvent('ChannelUpdated', (err, json)=> {
        Dispatcher.dispatch({type: 'updateChatroomMeta', data: json.r});
      });
    }
    if(Services.gotoandPlay) {
      Services.gotoandPlay.onEvent('Notification', (err, data)=> {
        this.enqueueSnackbar(data.content, {variant: data.variant});
      });
      Services.gotoandPlay.onEvent('OnlineCountChanged', (err, data)=> {
        Dispatcher.dispatch({type: 'updateOnlineCount', data: data});
      });
      Services.gotoandPlay.onEvent('ProgramsChanged', (err, data)=> {
        Dispatcher.dispatch({type: 'updateProgramsTable', data: data});
      });
    }
  };

  this.start = (next)=> {
    setupOnline();

    this.Actions.updateAlbumCards(require('./data/albumcards.json'));
    this.Actions.updateAlbumDecks(require('./data/albumdecks.json'));
    this.Actions.updateNews(require('./data/news.json'));

    this.Actions.initLang(lang);
    this.Actions.importLocalizes(Localizes);
    // Dispatcher.dispatch({type: 'updateDarktheme', data: dark_theme});
    DarkThemeState[1](dark_theme);
    Dispatcher.dispatch({type: 'updatePlayer', data: {
      type: "stream",
      title: Localizes[lang].header_title+' Online Radio',
      playing: gotoandPlay_audio_playing
    }});
    // if(lang === 'zh') {
    //   this.enqueueSnackbar('我們還在建構這個網站!', {variant: 'error'});
    // }
    // else {
    //   this.enqueueSnackbar('We are still constructing the site!', {variant: 'error'});
    // }

    next();
  };
}

export default Service;
