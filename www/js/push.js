function init_register () {
    modalLogin.hide();
	var pushNotification = window.plugins.pushNotification;
    //alert("entro a register");
    //if (isAndroidDevice()) {
    if (true) {
        //alert("pushNotofication "+pushNotification);
        pushNotification.register(function(result) {
            //alert('Status: ' + result);
        }, function(result) {
            ons.notification.alert({title: 'Error',message: result});
        }, {
            "senderID": "171795816401", /* Google developers project number */
            "ecb" : "onNotificationGCM" /* Function name to handle notifications */
        });
    } else {
        ons.notification.alert({title: 'Error', message:'Your device platform is not Android!!!'});
    }
}

function onNotificationGCM(e) {
    //alert("e"+e);
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                var registrationId = e.regid;
                localStorage["user.deviceRegID"] = e.regid;
                registerOn3rdPartyServer(registrationId);
            }
            break;
 
        case 'message':
            // handle notification message
            if (e.foreground) {
                //app abierto
                ons.notification.alert({title: 'Tiene mensaje en cola ',message: e.message.split('||')[1]});
                if (document.getElementById('listMisNotificaciones')  !== undefined) {
                    navi.popPage ();
                    navi.pushPage('MisNotificaciones.html', {animation: 'lift'});
                    //ons.ready();

                };
            } else if (e.coldstart) {

                ons.notification.alert({title: 'Tiene mensaje en cola ',message: e.message.split('||')[1]});
                
            } else {
               
                ons.notification.alert({title: 'Tiene mensaje en cola ',message:e.message.split('||')[1]});
            }
            break;
 
        case 'error':
            // handle error
            break;
 
        default:
            // handle default
            break;
    }
}
function registerOn3rdPartyServer(registrationId) {
    //alert("registerOn3rdPartyServer : "+registrationId);
    //modalLogin.show();
    user.deviceRegID = registrationId;
    localStorage["user.deviceRegID"] = registrationId;
    var request = $.ajax({
        url: serviceLoginUrl + 'registerDevice',
        method: "POST",
        data: {iduser: user.idUser, deviceRegID: registrationId},
        dataType: "JSON"
    });

    request.done(function (msg) {
        localStorage["user.deviceRegID"] = registrationId;
    });

    request.fail(function (jqXHR, textStatus) {
        ons.notification.alert({title: 'x ',message: textStatus});
    });
}