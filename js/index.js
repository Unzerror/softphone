var ua;
var g711 = new (window.G711)();

var pers_journal_datepicker_config = {
    monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    showMonthsShort: true,
    today: 'Сегодня',
    clear: 'Очистить',
    close: 'OK',
    firstDay: 1,
    max: new Date(),
    format: 'mm dd yyyy',
    onClose: function () {
        localStorage.pers_journal_datepicker = $('#pers_journal_date_range').val();
        getPersJournal();
    }
};

var gkh_journal_datepicker_config = {
    monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    showMonthsShort: true,
    today: 'Сегодня',
    clear: 'Очистить',
    close: 'OK',
    firstDay: 1,
    max: new Date(),
    format: 'mm dd yyyy',
    onClose: function () {
        localStorage.gkh_journal_datepicker = $('#gkh_journal_date_range').val();
        getGKHJournal();
    }
};

var full_months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
var gkh_accounts_datepicker_config = {
    monthsFull: full_months,
    monthsShort: full_months,
    format: 'yyyy/mm',
    firstDay: 1,
    dateMax: true,
    close: 'OK',
    onClose: function () {
        var month_text = $('#gkh_accounts_month_page div.picker__month').text();
        var year_text = $('#gkh_accounts_month_page div.picker__year:first-child').text();
        var month = full_months.indexOf(month_text) + 1;
        if (month < 10)
            month = "0" + month;
        localStorage.gkh_accounts_datepicker = year_text + "/" + month;
        $("#gkh_accounts_month_input").val(localStorage.gkh_accounts_datepicker);
        getGKHAccounts();
    }
};

var gkh_meters_datepicker_config = {
    monthsFull: full_months,
    monthsShort: full_months,
    format: 'yyyy/mm',
    firstDay: 1,
    dateMax: true,
    close: 'OK',
    onClose: function () {
        var month_text = $('#gkh_meters_month_page div.picker__month').text();
        var year_text = $('#gkh_meters_month_page div.picker__year:first-child').text();
        var month = full_months.indexOf(month_text) + 1;
        if (month < 10)
            month = "0" + month;
        localStorage.gkh_meters_datepicker = year_text + "/" + month;
        $("#gkh_meters_month_input").val(localStorage.gkh_meters_datepicker);
        getGKHMeters();
    }
};

var gkh_autocall_datepicker_config = {
    monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    showMonthsShort: true,
    today: 'Сегодня',
    clear: 'Очистить',
    close: 'OK',
    firstDay: 1,
    max: new Date(),
    format: 'dd.mm.yy',

};

var cold_settings_service_datepicker_config = {
    monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    showMonthsShort: true,
    today: 'Сегодня',
    clear: 'Очистить',
    close: 'OK',
    firstDay: 1,
    max: new Date(),
    format: 'dd.mm.yy',

};

var cold_journal_datepicker_config = {
    monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    showMonthsShort: true,
    today: 'Сегодня',
    clear: 'Очистить',
    close: 'OK',
    firstDay: 1,
    max: new Date(),
    format: 'mm dd yyyy',
    onClose: function () {
        localStorage.cold_journal_datepicker = $('#cold_journal_date_range').val();
        getColdJournal();
    }
};

var holdedMode = false;
var allPersContactsSelected = false;
var allImportPersContactsSelected = false;
var allColdContactsSelected = false;
var allImportColdContactsSelected = false;
var allGKHAccountsSelected = false;
var allGKHMetersSelected = false;
var allPersPhonesSelected = false;
var allGKHPhonesSelected = false;
var scrollGKHAccounts = 1;
var scrollGKHMeters = 1;
var contacts = [];
var hist = [];

var elements = {
    //   configForm:      document.getElementById('config-form'),
    //   uaStatus:        document.getElementById('ua-status'),
    //   registerButton:  document.getElementById('ua-register'),
    //   newSessionForm:  document.getElementById('new-session-form'),
    //   inviteButton:    document.getElementById('ua-invite-submit'),
    //   messageButton:   document.getElementById('ua-message-submit'),
    //   uaVideo:         document.getElementById('ua-video'),
    uaURI: document.getElementById('telephone_number'),
    //   sessionList:     document.getElementById('session-list'),
    //   sessionTemplate: document.getElementById('session-template'),
    //   messageTemplate: document.getElementById('message-template')
};

var connect_settings = {};
var add_settings = {
    userAgentString: 'MARS-softphone-wrtc',
    traceSip: true,
    register: true,
    rel100: "none",
    mediaHandlerFactory: SIP.RTC.MediaHandler.defaultFactory,
};

function init() {
    if (localStorage.contacts)
        contacts = JSON.parse(localStorage.contacts);

    showMainPage();

    $('body').hammer().bind("swiperight", showSwipeRight);
    $('body').hammer().bind("swipeleft", showSwipeLeft);

    $("#add_cons_btn").on('click', showAddConsPage);
    $("#pers_contacts_add_btn").on('click', showAddPersContactsPage);
    $("#cold_contacts_add_btn").on('click', showAddColdContactsPage);
    $(".back-to-main").on('click', showMainPage);
    $(".back-to-pers").on('click', showCurrentPersPage);
    $(".back-to-pers-contacts").on('click', getPersContacts);
    $(".back-to-pers-journal").on('click', getPersJournal);
    $(".back-to-pers-settings").on('click', showPersSettingsPage);
    $(".back-to-pers-phones").on('click', getPersPhonesSettings);
    $(".back-to-gkh").on('click', showCurrentGKHPage);
    $(".back-to-gkh-accounts").on('click', getGKHAccounts);
    $(".back-to-gkh-meters").on('click', getGKHMeters);
    $(".back-to-gkh-journal").on('click', getGKHJournal);
    $(".back-to-gkh-settings").on('click', showGKHSettingsPage);
    $(".back-to-gkh-phones").on('click', getGKHPhonesSettings);
    $(".back-to-cold").on('click', showCurrentColdPage);
    $(".back-to-cold-contacts").on('click', getColdContacts);
    $(".back-to-cold-settings").on('click', showColdSettingsPage);
    $(".back-to-cold-journal").on('click', getColdJournal);
    $(".back-to-softphone-settings-page").on('click', showSPSettingsPage);
    $(".back-to-softphone-contacts-page").on('click', showSPContactsPage);
    $(".back-to-softphone-buttons-page").on('click', showSPButtonsPage);
    $(".back-to-softphone-last-page").on('click', showSPLastPage);

    $("#med_del_btn").on("click", delMedSettings);
    $("#pers_del_btn").on("click", delPersSettings);
    $("#gkh_del_btn").on("click", delGKHSettings);
    $("#cold_del_btn").on("click", delColdSettings);

    $("#auth_btn").on('click', getLastAction);

    $("#pers_contacts_choose").on('click', getPersContacts);
    $("#pers_journal_choose").on('click', getPersJournal);
    $("#pers_settings_choose").on('click', showPersSettingsPage);

    delete localStorage.pers_journal_datepicker;
    delete localStorage.pers_journal_count;
    delete localStorage.cold_journal_datepicker;
    delete localStorage.cold_journal_count;

    $('#pers_journal_date_range').pickadate(pers_journal_datepicker_config);
    $('#pers_journal_count').on('change', savePersJournalCount);

    $("#pers_contacts_del_btn").on("click", delPersContacts);
    $("#pers_contacts_selectall_btn").on("click", selectAllPersContacts);
    $("#pers_contacts_selectall_import_btn").on("click", selectAllPersContactsImport);
    $("#pers_contacts_save_edit_btn").on("click", saveEditPersContacts);
    $("#pers_contacts_save_add_btn").on("click", saveAddPersContacts);
    $("#pers_contacts_save_import_btn").on("click", saveImportPersContacts);

    $("#pers_settings_profile_choose").on("click", getPersProfile);
    $("#pers_settings_phones_choose").on("click", getPersPhonesSettings);
    $("#pers_phones_selectall_btn").on("click", selectAllPersPhones);
    $("#pers_phones_del_btn").on("click", delPersPhones);
    $("#pers_settings_service_choose").on("click", getPersServiceSettings);
    $('#pers_settings_service_jingle_play').on('click', playPersJingle);
    $('#save_service_settings_btn').on('click', savePersServiceSettings);
    $('#save_pers_phones_add_time_btn').on('click', savePersPhonesEdit);

    $("#pers_phone_service_toggle").on('click', togglePersPhoneService);
    $("#pers_phones_add_btn").on('click', addPersServicePhone);

    $("#gkh_accounts_choose").on('click', getGKHAccounts);
    $("#gkh_accounts_selectall_btn").on('click', selectAllGKHAccounts);
    $("#gkh_accounts_del_btn").on("click", delGKHAccounts);
    $("#gkh_accounts_save_edit_btn").on("click", saveEditGKHAccounts);
    $("#gkh_meters_choose").on('click', getGKHMeters);

    delete localStorage.gkh_accounts_datepicker;

    $("#gkh_accounts_month_input").pickadate(gkh_accounts_datepicker_config);
    $("#gkh_accounts_number_input").on("change", saveGKHAccountsNumber);
    $("#gkh_accounts_phone_input").on("change", saveGKHAccountsPhone);
    $("#gkh_clear_accounts_number").on("click", clearGKHAccountsNumber);
    $("#gkh_clear_accounts_phone").on("click", clearGKHAccountsPhone);
    $("#gkh_clear_accounts_month").on("click", clearGKHAccountsMonth);
    $("#gkh_meters_del_btn").on("click", delGKHMeters);
    $("#gkh_meters_selectall_btn").on("click", selectAllGKHMeters);
    $("#gkh_meters_save_edit_btn").on("click", saveEditGKHMeters);
    $("#gkh_meters_month_input").pickadate(gkh_meters_datepicker_config);
    $("#gkh_clear_meters_month").on("click", clearGKHMetersMonth);
    $("#gkh_journal_choose").on("click", getGKHJournal);
    $("#gkh_settings_choose").on("click", showGKHSettingsPage);
    $("#gkh_settings_profile_choose").on("click", getGKHProfile);
    $("#gkh_settings_phones_choose").on("click", getGKHPhonesSettings);
    $("#gkh_phones_add_btn").on("click", addGKHServicePhone);
    $("#gkh_phones_selectall_btn").on("click", selectAllGKHPhones);
    $("#gkh_phones_del_btn").on("click", delGKHPhones);

    delete localStorage.gkh_journal_datepicker;
    delete localStorage.gkh_journal_count;

    $('#gkh_journal_date_range').pickadate(gkh_journal_datepicker_config);
    $('#gkh_journal_count').on('change', saveGKHJournalCount);

    $("#gkh_phone_autocalls_toggle").on('click', toggleGKHPhoneAutocalls);
    $("#gkh_phone_accept_data_toggle").on('click', toggleGKHPhoneAcceptData);
    $("#gkh_settings_autocalls").on('click', getGKHAutocallsSettings);
    $("#gkh_autocall_settings_time_style").on("change", toggleGHKAutocallsStyleTime);
    $("#save_gkh_autocall_settings_btn").on("click", saveGKHAutocallSettings);
    $("#gkh_autocall_settings_start_date").pickadate(gkh_autocall_datepicker_config);
    $("#gkh_settings_accept_data").on("click", getGKHAcceptDataSettings);
    $("#save_gkh_accept_data_settings_btn").on("click", saveGKHAcceptDataSettings);

    $("#cold_settings_profile_choose").on("click", getColdProfile);
    $("#cold_contacts_choose").on('click', getColdContacts);
    $("#cold_contacts_selectall_import_btn").on("click", selectAllColdContactsImport);
    $("#cold_contacts_selectall_btn").on("click", selectAllColdContacts);
    $("#cold_contacts_save_import_btn").on("click", saveImportColdContacts);
    $("#cold_contacts_del_btn").on("click", delColdContacts);
    $("#cold_contacts_save_edit_btn").on("click", saveEditColdContacts);
    $("#cold_contacts_save_add_btn").on("click", saveAddColdContacts);
    $("#cold_settings_choose").on('click', showColdSettingsPage);
    $("#cold_settings_service_choose").on('click', getColdSettingsService);
    $("#save_cold_settings_service_btn").on("click", saveColdSettingsService);
    $("#cold_settings_service_time_style").on("change", toggleColdSettingsServiceStyleTime);
    $("#cold_settings_service_start_date").pickadate(cold_settings_service_datepicker_config);
    $('#cold_settings_service_jingle_play').on('click', playColdJingle);
    $('#cold_journal_date_range').pickadate(cold_journal_datepicker_config);
    $("#cold_journal_choose").on('click', getColdJournal);
    $('#cold_journal_count').on('change', saveColdJournalCount);

    delete localStorage.cold_journal_datepicker;
    delete localStorage.cold_journal_count;

    $(".unhold").on("click", normalIcons);

    $('#softphone_settings_connection_choose').on('click', showSPSettingsConnectionPage);
    $('#sp_contacts_add_btn').on('click', showSPAddContactsPage);
    $('#sp_save_cont_call').on('click', saveSPAddContact);
    $('#sp_add_avatar_icon').on('click', openChangeAvatarWindow);
    $('#sp_edit_avatar_icon').on('click', openEditChangeAvatarWindow);
    $('#sp_del_cont').on('click', softphoneDeleteContact);
    $('#sp_save_edit_cont_call').on('click', saveSPEditContact);
    $('#sp_check_connect_button').on('click', sipConnect);
    $("#last_tab").on("click", showSPLastPage);
    $("#contacts_tab").on("click", showSPContactsPage);
    $("#buttons_tab").on("click", showSPButtonsPage);
    $("#settings_tab").on("click", showSPSettingsPage);
    $("#call_btn").on("click", showSPCallPage);
    $("#chat_send_btn").on("click", sendSPMessage);
    $("#chat_send_btn_from_buttons_page i").on("click", sendMessageFromButtonsPage);
    $("#call_from_chat").on("click", showSPCallPageFromChat);
    $("#message_btn").on("click", showMessageField);

    
    // $("#out_mic_off").on('click', showOutDTMFpage);
    $("#out_dtmf").on('click', showOutDTMFpage);
    $("#inc_dtmf").on('click', showIncDTMFpage);

    // $("#out_volume_mute").on("click", sessionMute);
    // $("#out_mic_off").on("click", sessionMute);
    $("#inc_volume_mute").on("click", sessionMute);

    $("#save_softphone_settings_connection_btn").on("click", saveSettingsConnection);

    $("#but_1").on("click", pushBut1);
    $("#but_2").on("click", pushBut2);
    $("#but_3").on("click", pushBut3);
    $("#but_4").on("click", pushBut4);
    $("#but_5").on("click", pushBut5);
    $("#but_6").on("click", pushBut6);
    $("#but_7").on("click", pushBut7);
    $("#but_8").on("click", pushBut8);
    $("#but_9").on("click", pushBut9);
    $("#but_0").on("click", pushBut0);
    $("#but_star").on("click", pushButStar);
    $("#but_lettice").on("click", pushButLettice);

    $("#dtmf_but_1").on("click", pushDTMFBut1);
    $("#dtmf_but_2").on("click", pushDTMFBut2);
    $("#dtmf_but_3").on("click", pushDTMFBut3);
    $("#dtmf_but_4").on("click", pushDTMFBut4);
    $("#dtmf_but_5").on("click", pushDTMFBut5);
    $("#dtmf_but_6").on("click", pushDTMFBut6);
    $("#dtmf_but_7").on("click", pushDTMFBut7);
    $("#dtmf_but_8").on("click", pushDTMFBut8);
    $("#dtmf_but_9").on("click", pushDTMFBut9);
    $("#dtmf_but_0").on("click", pushDTMFBut0);
    $("#dtmf_but_star").on("click", pushDTMFButStar);
    $("#dtmf_but_lettice").on("click", pushDTMFButLettice);

    $("#inc_dtmf_but_1").on("click", pushIncomingDTMFBut1);
    $("#inc_dtmf_but_2").on("click", pushIncomingDTMFBut2);
    $("#inc_dtmf_but_3").on("click", pushIncomingDTMFBut3);
    $("#inc_dtmf_but_4").on("click", pushIncomingDTMFBut4);
    $("#inc_dtmf_but_5").on("click", pushIncomingDTMFBut5);
    $("#inc_dtmf_but_6").on("click", pushIncomingDTMFBut6);
    $("#inc_dtmf_but_7").on("click", pushIncomingDTMFBut7);
    $("#inc_dtmf_but_8").on("click", pushIncomingDTMFBut8);
    $("#inc_dtmf_but_9").on("click", pushIncomingDTMFBut9);
    $("#inc_dtmf_but_0").on("click", pushIncomingDTMFBut0);
    $("#inc_dtmf_but_star").on("click", pushIncomingDTMFButStar);
    $("#inc_dtmf_but_lettice").on("click", pushIncomingDTMFButLettice);


    $("#delnumbers").on("click", delNumbers);
    $("#delnumbers_dtmf").on("click", delNumbersDTMF);
    $("#inc_delnumbers_dtmf").on("click", delIncomingNumbersDTMF);
    $(".dialer").on("click", playButtonSound);

    $("#dtmf_collapse_btn").on("click", hideDTMFPage);
    $("#inc_dtmf_collapse_btn").on("click", hideIncomingDTMFPage);




    connectOnStart();
}

function hideAllPages() {
    normalIcons();
    allPersContactsSelected = false;
    allColdContactsSelected = false;
    allImportPersContactsSelected = false;
    allImportColdContactsSelected = false;
    allGKHAccountsSelected = false;
    allGKHMetersSelected = false;
    allPersPhonesSelected = false;
    allGKHPhonesSelected = false;
    scrollGKHAccounts = 1;
    scrollGKHMeters = 1;

    $("#main_softphone_page").hide();
    $("#main_page").hide();
    $("#add_cons_page").hide();
    $("#med_current_page").hide();
    $("#pers_current_page").hide();
    $("#cold_current_page").hide();
    $("#gkh_current_page").hide();
    $("#trusted_auth_page").hide();

    $("#pers_contacts_page").hide();
    $("#pers_contacts_edit_page").hide();
    $("#pers_contacts_add_page").hide();
    $("#pers_contacts_import_page").hide();

    $("#pers_settings_page").hide();
    $("#pers_journal_page").hide();
    $("#preloader_page").hide();
    $("#pers_journal_date_range_page").hide();
    $("#pers_journal_count_page").hide();
    $("#pers_profile_page").hide();
    $("#pers_service_settings_page").hide();
    $("#pers_phones_settings_page").hide();
    $("#pers_phones_edit_page").hide();

    $("#cold_contacts_page").hide();
    $("#cold_contacts_edit_page").hide();
    $("#cold_contacts_add_page").hide();
    $("#cold_contacts_import_page").hide();
    $("#cold_settings_page").hide();
    $("#cold_settings_service_page").hide();
    $("#cold_profile_page").hide();
    $("#cold_journal_date_range_page").hide();
    $("#cold_journal_count_page").hide();
    $("#cold_journal_page").hide();

    $("#gkh_accounts_page").hide();
    $("#gkh_accounts_edit_page").hide();
    $("#gkh_accounts_phone_page").hide();
    $("#gkh_accounts_number_page").hide();
    $("#gkh_accounts_month_page").hide();
    $("#gkh_meters_page").hide();
    $("#gkh_meters_edit_page").hide();
    $("#gkh_journal_page").hide();
    $("#gkh_journal_date_range_page").hide();
    $("#gkh_journal_count_page").hide();
    $("#gkh_settings_page").hide();
    $("#gkh_profile_page").hide();
    $("#gkh_phones_settings_page").hide();
    $("#gkh_phones_edit_page").hide();
    $("#gkh_autocall_settings_page").hide();
    $("#gkh_accept_data_settings_page").hide();
    $("#gkh_meters_month_page").hide();

    $("#softphone_settings_connection_page").hide();
    $("#softphone_add_contact_page").hide();
    $("#softphone_call_page").hide();
    $("#softphone_chat_page").hide();

}


function hideAllSoftphonePages() {

    $("#softphone_settings_connection_page").hide();
    $("#softphone_add_contact_page").hide();
    $("#softphone_last_page").hide();
    $("#softphone_contacts_page").hide();
    $("#softphone_buttons_page").hide();
    $("#softphone_settings_page").hide();
    $("#softphone_settings_connection_page").hide();
    $("#softphone_settings_contacts_page").hide();
    $("#softphone_add_contact_page").hide();
    $("#softphone_edit_contact_page").hide();
    $("#softphone_call_page").hide();
    $("#softphone_chat_page").hide();
    $("#softphone_incoming_call_page").hide();

}

function showOutDTMFpage() {
    $("#outgoingCall_Form").hide();
    $("#out_dtmf_page").show();
}
function showIncDTMFpage() {
    $("#incomingCall_Form").hide();
    $("#inc_dtmf_page").show();
}

function hideDTMFPage() {
    $(".dtmf-page").hide();
    $("#dtmf_number").val("");
    $("#outgoingCall_Form").show();

}
function hideIncomingDTMFPage() {
    $(".dtmf-page").hide();
    $("#inc_dtmf_number").val("");
    $("#incomingCall_Form").show();

}

function showSPCallPage() {
    if (!$("#telephone_number")[0].value) {
        Materialize.toast('Введите номер телефона', 3000, 'rounded');
        return;
    } else {
        hideAllSoftphonePages();
        hideAllPages();
        $("#softphone_call_page").show().removeClass("page");
        $("#statusCall").show();
        $('body').hammer().unbind("swiperight", showSwipeRight);
        $('body').hammer().unbind("swipeleft", showSwipeLeft);
        tel_numb = $("#telephone_number").val();
        var finded = false;
        for (var i = 0; i < contacts.length; i++) {
            var numbers = contacts[i].login;
            if (tel_numb == numbers) {
                finded = true;
                $("#outform_avatar").attr("src", contacts[i].avatar);
                $("#calledName").text(contacts[i].name);
            }
            if (!finded) {
                $("#calledName").text(tel_numb);
            }
        }
        inviteSubmit();
    }
}

function showSPCallPageFromChat() {
    hideAllSoftphonePages();
    hideAllPages();
    $("#softphone_call_page").show().removeClass("page");
    $("#statusCall").show();
    $('body').hammer().unbind("swiperight", showSwipeRight);
    $('body').hammer().unbind("swipeleft", showSwipeLeft);
    tel_numb = $("#softphone_chat_page").attr("data-uri");
    for (var i = 0; i < contacts.length; i++) {
        var numbers = contacts[i].login;
        var finded = false;
        if (tel_numb == numbers) {
            finded = true;
            $("#outform_avatar").attr("src", contacts[i].avatar);
            $("#calledName").text(contacts[i].name);
        }
        if (!finded) {
            $("#calledName").text(tel_numb);
        }
    }
    inviteSubmitFromChat();
}

function showSPIncomingCallPage() {
    hideAllPages();
    $("#softphone_incoming_call_page").removeClass("page").show();
    $("#incoming_statusCall").show();
    $('body').hammer().unbind("swiperight", showSwipeRight);
    $('body').hammer().unbind("swipeleft", showSwipeLeft);
}

function saveSettingsConnection() {
    connect_settings.authorizationUser = $("#SPNumber").val();
    connect_settings.displayName = $("#SPNumber").val();
    connect_settings.password = $("#SPPassword").val();
    connect_settings.host = $("#SPhost").val();
    connect_settings.uri = connect_settings.authorizationUser + "@" + connect_settings.host;
    connect_settings.wsServers = [];
    connect_settings.wsServers.push({
        sip_uri: "<sip:" + $("#SPhost").val() + ";transport=ws;lr>",

        weight: 0,
        status: 0,
        ws_uri: $("#softphoneWSServer").val(),
        scheme: "WS"
    });
    localStorage.connect_settings = JSON.stringify(connect_settings);
    showSPSettingsPage();
}

// Сохранение значений для кнопки "Подключиться"
function saveForBtnCon() {
    connect_settings.authorizationUser = $("#SPNumber").val();
    connect_settings.displayName = $("#SPNumber").val();
    connect_settings.password = $("#SPPassword").val();
    connect_settings.host = $("#SPhost").val();
    connect_settings.uri = connect_settings.authorizationUser + "@" + connect_settings.host;
    connect_settings.wsServers = [];
    connect_settings.wsServers.push({
        sip_uri: "<sip:" + $("#SPhost").val() + ";transport=ws;lr>",
        weight: 0,
        status: 0,
        ws_uri: $("#softphoneWSServer").val(),
        scheme: "WS"
    });
    localStorage.connect_settings = JSON.stringify(connect_settings);
}

function connectOnStart() {
    connect_settings = JSON.parse(localStorage.connect_settings);
    for (var prop in add_settings) {
        connect_settings[prop] = add_settings[prop];
    }
    if (ua && ua.unbind) {
        ua.unbind('connected');
        ua.unbind('disconnected');
        ua.unbind('registered');
        ua.unbind('unregistered');
        ua.unbind('invite');
        ua.unbind('message');
        delete ua;
        ua = null;
    }
    ua = new SIP.UA(connect_settings);
    ua.on('connected', function () {
        console.log("connected");
        $("#check_input").val("Подключено");
    });
    ua.on('disconnected', function () {
        $("#check_input").val("Ошибка");
    });
    ua.on('registered', function () {
        console.log("registered");
        $("#check_input").val("Зарегистрировано");
    });
    ua.on('unregistered', function () {
        console.log("unregistered");
        $("#check_input").val("Не зарегистрировано");
    });
    ua.on('invite', function (session) {
        createNewSessionUI(session.remoteIdentity.uri, session);
    });
    ua.on('message', onMessage);

    ua.on('dtmf', function (request, dtmf) {
        console.log(dtmf);
        console.log(request);
    })
}
function sipConnect() {
    connect_settings.authorizationUser = $("#SPNumber").val();
    connect_settings.displayName = $("#SPNumber").val();
    connect_settings.password = $("#SPPassword").val();
    connect_settings.host = $("#SPhost").val();
    connect_settings.uri = connect_settings.authorizationUser + "@" + connect_settings.host;
    connect_settings.wsServers = [];
    connect_settings.wsServers.push({
        sip_uri: "<sip:" + $("#SPhost").val() + ";transport=ws;lr>",
        weight: 0,
        status: 0,
        ws_uri: $("#softphoneWSServer").val(),
        scheme: "WS"
    });
    for (var prop in add_settings) {
        connect_settings[prop] = add_settings[prop];
    }
    saveForBtnCon();

    if (!$("#SPNumber").val()) {
        Materialize.toast('Введите SIP ID', 3000, 'rounded');
        return;
    }
    if (!$("#SPPassword").val()) {
        Materialize.toast('Введите пароль', 3000, 'rounded');
        return;
    }
    if (!$("#SPhost").val()) {
        Materialize.toast('Введите хост', 3000, 'rounded');
        return;
    }
    if (ua && ua.unbind) {
        ua.unbind('connected');
        ua.unbind('disconnected');
        ua.unbind('registered');
        ua.unbind('unregistered');
        ua.unbind('invite');
        ua.unbind('message');
        delete ua;
        ua = null;
    }
    ua = new SIP.UA(connect_settings);
    ua.on('connected', function () {
        console.log("connected");
        $("#check_input").val("Подключено");
    });
    ua.on('disconnected', function () {
        $("#check_input").val("Ошибка");
    });

    ua.on('registered', function () {
        console.log("registered");
        $("#check_input").val("Зарегистрировано");
    });

    ua.on('unregistered', function () {
        console.log("unregistered");
        $("#check_input").val("Не зарегистрировано");
    });

    ua.on('invite', function (session) {
        createNewSessionUI(session.remoteIdentity.uri, session);
    });

    ua.on('message', onMessage);

}

function inviteSubmit() {
    var uri = elements.uaURI.value;
    var ui = createNewSessionUI(uri);
}

function inviteSubmitFromChat() {
    var uri = $("#softphone_chat_page").attr("data-uri");
    var ui = createNewSessionUI(uri);
}

function sendSPMessage() {
    hist.push({
        message: $("#chat_input").val(),
        date: new Date().toISOString(),
        type: "chat_outgoing_message",
        name: $("#name_chat_page").text(),
        id: $("#softphone_chat_page").attr("data-uri"),
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
        }
    })
    localStorage.lastSPAction = JSON.stringify(hist);
    var chatlist = $(".histform_table table tbody");
    chatlist.append("<tr><td></td><td><div class='bubble right'><div class='content'>" + hist[hist.length - 1].message + "</div></div></td><td>" + formatDate(new Date()) + "</td></tr>")
    var send_target = $("#softphone_chat_page").attr("data-uri");
    var message = $("#chat_input").val();
    if (!send_target.includes("@")) {
        send_target += "@" + ua.configuration.hostportParams
    }
    ua.message(send_target, message);
    $('.histform_table').scrollTop(9999);
    $("#chat_input").val("");
}

function onMessage(message) {
    // if (!message.body.startsWith("P!Q")){
    $("#not_event").hide();
    var uri_obj = SIP.Utils.normalizeTarget(message.remoteIdentity.uri, ua.configuration.hostportParams);
    // console.log(uri_obj.user);
    var finded = false;
    for (var i = 0; i < contacts.length; i++) {
        // console.log(contacts);
        if (contacts[i].login == uri_obj.user) {
            finded = true;
            var eventsList = $('#softphone_last_page ul');

            $("#message_from_" + uri_obj.user).unbind("click");
            $("#message_from_" + uri_obj.user).remove();
            eventsList.prepend('<li id="message_from_' + contacts[i].login + '" class="collection-item avatar">\
                        <img src="'+ contacts[i].avatar + '" class="cont-avatar">\
                        <span class="title">'+ contacts[i].name + '</span>\
                        <p>'+ "<i class=" + 'material-icons' + ">mail_outline</i>" + '  ' + message.body.slice(0, 35) + '<br>' + formatDate(new Date()) + '</p></li>');
            var chatlist = $(".histform_table table tbody");
            chatlist.append("<tr><td class ='chat_incoming_message'><div class='circle1'>" + contacts[i].login + "</div></td><td><div class='bubble left'><div class='content'>" + message.body + "</div></div></td><td>" + formatDate(new Date()) + "</td></tr>");
            $('.histform_table').scrollTop(9999);
            $("#message_from_" + uri_obj.user).on("click", function (event) {
                var name = $(event.currentTarget).find(".title").text();
                hideAllSoftphonePages();
                $("#softphone_chat_page").show();
                var id = (event.currentTarget.id).substr((event.currentTarget.id).lastIndexOf("_") + 1);
                $("#softphone_chat_page").attr("data-uri", id);
                $("#name_chat_page").text(name);
            });
            hist.push({
                name: contacts[i].name,
                message: message.body,
                date: new Date().toISOString(),
                id: contacts[i].login,
                type: "chat_incoming_message",
                error: function (err) {
                    Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                }
            })
            localStorage.lastSPAction = JSON.stringify(hist);
        }
    }
    if (!finded) {
        var eventsList = $('#softphone_last_page ul');
        $("#message_from_" + uri_obj.user).unbind("click");
        $("#message_from_" + uri_obj.user).remove();
        eventsList.prepend('<li id="message_from_' + uri_obj.user + '" class="collection-item avatar">\
                            <img src="avatars/noavatar1.png"  class="cont-avatar">\
                            <span class="title">'+ uri_obj.user + '</span>\
                            <p>'+ '  ' + message.body.slice(0, 35) + '<br>' + formatDate(new Date()) + '</p></li>');
        var chatlist = $(".histform_table table tbody");
        chatlist.append("<tr><td class ='chat_incoming_message'><div class='circle1'>" + uri_obj.user + "</div></td><td><div class='bubble right'><div class='content'>" + message.body + "</div></div></td><td>" + formatDate(new Date()) + "</td></tr>");
        $('.histform_table').scrollTop(9999);
        $("#message_from_" + uri_obj.user).on("click", function (event) {
            var name = $(event.currentTarget).find(".title").text();
            hideAllSoftphonePages();
            $("#softphone_chat_page").show();
            $("#name_chat_page").text(name);
        });
        hist.push({
            name: uri_obj.user,
            message: message.body,
            date: new Date().toISOString(),
            id: uri_obj.user,
            type: "chat_incoming_message",
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
        localStorage.lastSPAction = JSON.stringify(hist);
    }
    // }
}

function createSPListHist() {
    if (localStorage.lastSPAction) {
        hist = JSON.parse(localStorage.lastSPAction);
        var eventsList = $('#softphone_last_page ul');
        eventsList.empty();
        var tmp_arr = [];
        for (var i = hist.length - 1; i >= 0; i--) {
            if (!tmp_arr.length) {
                tmp_arr.push(hist[i]);
            } else {
                var finded = false;
                for (var j = tmp_arr.length - 1; j >= 0; j--) {
                    if (hist[i].id == tmp_arr[j].id) {
                        finded = true;
                        if (hist[i].date > tmp_arr[j].date) {
                            tmp_arr.splice(j, 1);
                            tmp_arr.push(hist[i]);
                        }
                    }
                }
                if (!finded) {
                    tmp_arr.push(hist[i]);
                }
            }
        }
        for (var i = tmp_arr.length - 1; i >= 0; i--) {
            var avatar = "avatars/noavatar1.png";
            var name;
            var finded = false;
            for (var j = contacts.length - 1; j >= 0; j--) {
                if (tmp_arr[i].id == contacts[j].login) {
                    finded = true;
                    avatar = contacts[j].avatar;
                    name = contacts[j].name;
                };
                if (!finded) {
                    name = tmp_arr[i].id;
                }
            }
            if (tmp_arr[i].message) {
                $("#not_event").hide();
                eventsList.prepend('<li id="message_from_' + tmp_arr[i].id + '" class="collection-item avatar">\
            <img src="'+ avatar + '" alt="" class="cont-avatar">\
            <span class="title">'+ tmp_arr[i].name + '</span>\
            <p>'+ "<i class=" + 'material-icons' + ">mail_outline</i>" + ' ' + tmp_arr[i].message.slice(0, 35) + '<br>' + formatDate(tmp_arr[i].date) + '</p></li>');
            }
            if (!tmp_arr[i].message) {
                $("#not_event").hide();
                var finded = false;
                if (tmp_arr[i].type == "incoming_call" && tmp_arr[i].duration == "00:00") {
                    finded = true;
                    eventsList.prepend('<li id="message_from_' + tmp_arr[i].id + '" class="collection-item avatar">\
                <img src="'+ avatar + '" alt="" class="cont-avatar">\
                <span class="title">'+ name + '</span>\
                <p>'+ "<i class=" + 'material-icons' + ">call_missed_outgoing</i>" + ' ' + "Пропущенный вызов" + '<br>' + formatDate(tmp_arr[i].date) + '</p></li>');
                }
                if (!finded && tmp_arr[i].type == "incoming_call") {
                    eventsList.prepend('<li id="message_from_' + tmp_arr[i].id + '" class="collection-item avatar">\
                    <img src="'+ avatar + '" alt="" class="cont-avatar">\
                    <span class="title">'+ name + '</span>\
                    <p>'+ "<i class=" + 'material-icons' + ">call_made</i>" + ' ' + "Входящий звонок" + '<br>' + formatDate(tmp_arr[i].date) + '</p></li>');
                }

                if (tmp_arr[i].type == "outgoing_call") {
                    eventsList.prepend('<li id="message_from_' + tmp_arr[i].id + '" class="collection-item avatar">\
                <img src="'+ avatar + '" alt="" class="cont-avatar">\
                <span class="title">'+ name + '</span>\
                <p>'+ "<i class=" + 'material-icons' + ">call_received</i>" + ' ' + "Исходящий звонок" + '<br>' + formatDate(tmp_arr[i].date) + '</p></li>');
                }
            }
        }
    } if (!localStorage.lastSPAction) {
        $("#not_event").show();
        return;
    }
    renderChatList(tmp_arr);
}

function sessionMute(session) {
    console.log('function sessionMute');

    console.log('session ', session);
    console.log('session.mute ', session.mute);

    console.log('ua ', ua);
    console.log('ua.mute ', ua.mute);

    session = sessionUI.session = ua.mute({
        mediaConstraints: {
            audio: false,
            video: false
        }
    })
}

function renderChatList(tmp_arr) {
    hist = JSON.parse(localStorage.lastSPAction);
    for (var i = tmp_arr.length - 1; i >= 0; i--) {
        $('#message_from_' + tmp_arr[i].id).unbind('click');
        $("#message_from_" + tmp_arr[i].id).on("click", function (event) {
            var name = $(event.currentTarget).find(".title").text();
            hideAllSoftphonePages();
            $("#softphone_chat_page").show();
            var id = (event.currentTarget.id).substr((event.currentTarget.id).lastIndexOf("_") + 1);
            $("#softphone_chat_page").attr("data-uri", id);
            $("#name_chat_page").text(name);
            var chatlist = $(".histform_table table tbody");
            chatlist.empty();
            for (var i = hist.length - 1; i >= 0; i--) {
                if (hist[i].id == $("#softphone_chat_page").attr("data-uri")) {
                    var initials = "";
                    var who_text = hist[i].name;
                    if (who_text.indexOf(" ") + 1) {
                        initials = who_text[0] + who_text.substr(who_text.indexOf(" ") + 1, 1);
                    } else {
                        initials = who_text[0];
                    }
                    if (hist[i].type == "chat_incoming_message") {
                        chatlist.prepend("<tr><td><div class='circle1'>" + initials + "</div></td><td><div class='bubble left'><div class='content'>" + hist[i].message + "</div></div></td><td>" + formatDate(hist[i].date) + "</td></tr>")
                    }
                    if (hist[i].type == "chat_outgoing_message") {
                        chatlist.prepend("<tr><td></td><td><div class='bubble right'><div class='content'>" + hist[i].message + "</div></div></td><td>" + formatDate(hist[i].date) + "</td></tr>")
                    }
                    if (hist[i].type == "outgoing_call") {
                        chatlist.prepend("<tr><td></td><td><div class='bubble right'><div class='content'>" + "Исходящий звонок" + '<br>' + hist[i].duration + " сек" + "</div></div></td><td>" + formatDate(hist[i].date) + "</td></tr>")
                    }
                    var finded = false;
                    if (hist[i].type == "incoming_call" && hist[i].duration == "00:00") {
                        finded = true;
                        chatlist.prepend("<tr><td></td><td><div class='bubble left'><div class='content'>" + "Пропущенный вызов" + "</div></div></td><td>" + formatDate(hist[i].date) + "</td></tr>")
                    }
                    if (!finded && hist[i].type == "incoming_call") {
                        chatlist.prepend("<tr><td></td><td><div class='bubble left'><div class='content'>" + "Входящий звонок" + '<br>' + hist[i].duration + " сек" + "</div></div></td><td>" + formatDate(hist[i].date) + "</td></tr>")
                    }

                }
            }
            $('.histform_table').scrollTop(9999);
        });
    }
};

function formatDate(date) {
    var rez = new Date() - date;
    if (rez < 1000) return "только что";
    else if (rez < 1000 * 60) return Math.floor(rez / 1000) + " сек. назад";
    else if (rez < 1000 * 60 * 60) return Math.floor(rez / 1000 / 60) + " мин. назад";
    delete rez;
    date = new Date(date);
    var obj = {
        dat: date.getDate(),
        month: date.getMonth() + 1,
        hours: date.getHours(),
        minutes: date.getMinutes()
    };
    for (var key in obj) obj[key] < 10 ? obj[key] = '0' + obj[key] : obj[key];
    var str = obj.dat + '.' + obj.month + '.' + date.getFullYear() % 100 + ' ' + obj.hours + ':' + obj.minutes;
    delete str;
    return str;
}


function createNewSessionUI(uri, session, message) {
    
    var sessionUI = {};
    uri = session ?
        session.remoteIdentity.uri :
        SIP.Utils.normalizeTarget(uri, ua.configuration.hostportParams);
    var displayName = (session && session.remoteIdentity.displayName) || uri.user;
    if (!uri) {
        return;
    }

    $(".softphone-dtmf").on('click', function (e) {
        e.preventDefault();
        var value = e.target.text;
        if (value === '' || !session) return;
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'].indexOf(value) > -1) {
            if (value == "*" || value == "#") {
                session.dtmf(value);
            } else {
                session.dtmf(parseInt(value));
            }
        }
    });
    $(".inc_softphone-dtmf").on('click', function (e) {
        e.preventDefault();
        var value = e.target.text;
        if (value === '' || !session) return;
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'].indexOf(value) > -1) {
            if (value == "*" || value == "#") {
                session.dtmf(value);
            } else {
                session.dtmf(parseInt(value));
            }
        }
    });
    if (session) sessionUI.session = session;
    if (!session) {
        session = sessionUI.session = ua.invite(uri, {
            mediaConstraints: {
                audio: true,
                video: false
            }
        });
        session.on('bye', function () {
            delete sessionUI.session;
            showSPButtonsPage();
        });
        session.on('failed', function (e) {
            console.log(e);
            hist.push({
                duration: "00:00",
                date: new Date().toISOString(),
                type: "outgoing_call",
                id: session.remoteIdentity.uri.user,
                name: session.remoteIdentity.uri.user,
                error: function (err) {
                    Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                }
            })
            localStorage.lastSPAction = JSON.stringify(hist);
            console.log("session 'failed'");
            delete sessionUI.session;
            showSPButtonsPage();
        });
        session.on('cancel', function (data) {
        })
    } else {
        showSPIncomingCallPage();
        var abonent = session.remoteIdentity.uri.aor.substr(0, 1)
        var finded = false;
        for (var i = 0; i < contacts.length; i++) {
            if (abonent == contacts[i].login) {
                finded = true;
                $("#incoming_avatar").attr("src", contacts[i].avatar);
                $("#incoming_calledName").text(contacts[i].name);
            }
            if (!finded) {
                $("#incoming_calledName").text(abonent);
            }
        }
    }
    $("#incoming_call_on").unbind("click");
    $("#incoming_call_on").on("click", function () {
        $("#incoming_buttons_block").hide();
        $("#incoming_statusCall").hide();
        $("#buttons_on_accepted").show();


        var session = sessionUI.session;

        console.log('session ', session);

        if (!session) {
            session = sessionUI.session = ua.invite(uri, {
                mediaConstraints: {
                    audio: true,
                    video: false
                }
            });
        } else if (session.accept && !session.startTime) { // Incoming, not connected
            session.accept({
                mediaConstraints: {
                    audio: true,
                    video: false
                }
            });
        }
    });
    $("#incoming_call_end").unbind("click");
    $("#incoming_call_end").on("click", function () {
        $('body').hammer().bind("swiperight", showSwipeRight);
        $('body').hammer().bind("swipeleft", showSwipeLeft);
        var session = sessionUI.session;
        if (!session) {
            return;
        } else if (session.startTime) {
            // Connected
            session.bye();
        } else if (session.reject) {
            // Incoming
            hist.push({
                duration: "00:00",
                date: new Date().toISOString(),
                type: "incoming_call",
                id: session.remoteIdentity.uri.user,
                name: session.remoteIdentity.uri.user,
                error: function (err) {
                    Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                }
            })
            localStorage.lastSPAction = JSON.stringify(hist);
            session.reject();
        } else if (session.cancel) {
            // Outbound
            session.cancel();
        }
        hideAllSoftphonePages();
        showMainPage();
    });

    if (session) {
        session.on('dtmf', function (request, dtmf) {

        })
        session.on('accepted', function (data) {

            $("#statusCall").hide();
            pause();
            var stream = session.getRemoteStreams() || this.mediaHandler.getRemoteStreams()[0];
            var source = null;

            function download(filename, data) {
                var a = document.createElement('a');
                var blob = new Blob([data], { 'type': 'audio/wav' });
                a.href = window.URL.createObjectURL(blob);
                a.download = filename;
                if (document.createEvent) {
                    var event = document.createEvent('MouseEvents');
                    event.initEvent('click', true, true);
                    a.dispatchEvent(event);
                }
                else {
                    a.click();
                }
            }

            var playAudioData = new Float32Array(0);
            var sampleRate = 8000;
            var audioContext, context, audioInput, filter, recorder, recording;
            audioContext = window.AudioContext || window.webkitAudioContext;
            window.instanceAudioContext = window.instanceAudioContext || new audioContext();
            context = window.instanceAudioContext;
            // context = new audioContext();
            
            function Float32Concat(first, second) {
                var firstLength = first.length,
                    result = new Float32Array(firstLength + second.length);
                result.set(first);
                result.set(second, firstLength);
                return result;
            }

            function converPcmuToFloat32(buffer) {
                //var bufferView = new DataView(arrayBuffer);
                var l = buffer.length;
                var floatBuffer = new Float32Array(l);
            
                //pcmu => Float
                for (var i = 0; i < l; i++)
                    floatBuffer[i] = (g711.ulaw2linear(buffer[i])) / 0x7FFF;
                return floatBuffer;
            }

            var playAudioDataSize = 160 * 4; //(20 * 4) ms  

            function playBuffer(obj) {
                playAudioData = Float32Concat(playAudioData, obj);

                if (playAudioData.length < playAudioDataSize) {
                    // console.log('playAudioData.length ', playAudioData.length, ' < ', playAudioDataSize, ' playAudioDataSize');
                    return;
                }

                var playAudioBuffer = new Float32Array(playAudioData);
                playAudioData = new Float32Array(0);

                var audioBuffer = context.createBuffer(1, playAudioBuffer.length, sampleRate);
                audioBuffer.getChannelData(0).set(playAudioBuffer);
                var source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(context.destination);
                source.start();
            };

            stream.on("data", function (data) {
                var raw, buffer;
                raw = data;
                buffer = converPcmuToFloat32(raw)
                playBuffer(buffer);
            })

        });
        ua.on('mute', function (data) {
            console.log(121212121);
            console.log(data);
        })
        session.on('bye', function (data) {

            // $("#out_dtmf_page").hide();
            // $("#inc_dtmf_page").hide();

            if (data.from.uri.user == data.ruri.user) {
                hist.push({
                    duration: $("#call_timer").html(),
                    date: new Date().toISOString(),
                    type: "outgoing_call",
                    id: data.to.uri.user,
                    name: data.to.uri.user,
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                    }
                })
                localStorage.lastSPAction = JSON.stringify(hist);
            } else {
                hist.push({
                    duration: $("#incoming_call_timer").html(),
                    date: new Date().toISOString(),
                    type: "incoming_call",
                    id: data.ruri.user,
                    name: data.ruri.user,
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                    }
                })
                localStorage.lastSPAction = JSON.stringify(hist);
            }
            hideAllPages();
            showSPButtonsPage();
            clearClock();
            $("#outform_avatar").attr("src", "avatars/noavatar1.png");
        });
    }
    $(".out_call_end").unbind("click");
    $(".out_call_end").on("click", callEnd);
    function callEnd() {
        hideAllPages();
        showSPButtonsPage();
        $("#buttons_on_accepted").hide();
        $("#incoming_buttons_block").show();
        session.bye();
        clearClock();
        $("#outform_avatar").attr("src", "avatars/noavatar1.png");
    }
    // console.log('!!!!!!!!! session !!!!!!!!!!');
    // console.log(session);

    $("#out_mic_off").on("click", function() {
        if (window.isMuted == undefined) {
            window.isMuted = false;
        } else {
            window.isMuted = !window.isMuted;
        }

        if (window.isMuted) {
            console.log('Включаем микрофон');

            session.unmute({
                audio: true
            });
        } else {
            console.log('Выключаем микрофон');

            session.mute({
                audio: true
            });
        }
    });
}

function showMessageField() {

    $("#send_message_from_buttons_page").toggle();
    $("#call_btn").toggle();
}

function sendMessageFromButtonsPage() {
    console.log(1);
    var name;
    if (!$("#telephone_number").val()) {
        Materialize.toast('Введите номер абонента', 3000, 'rounded');
        return;
    }
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].login == $("#telephone_number").val()) {
            name = contacts[i].name;
        } else {
            name = $("#telephone_number").val();
        }
    }
    hist.push({
        message: $("#chat_input_from_buttons_page").val(),
        date: new Date().toISOString(),
        type: "chat_outgoing_message",
        name: name,
        id: $("#telephone_number").val(),
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
        }
    })
    localStorage.lastSPAction = JSON.stringify(hist);
    var send_target = $("#telephone_number").val();
    var message = $("#chat_input_from_buttons_page").val();
    if (!send_target.includes("@")) {
        send_target += "@" + ua.configuration.hostportParams
    }
    ua.message(send_target, message);

    $("#send_message_from_buttons_page").hide();
    $("#chat_input_from_buttons_page").val('');
    $("#call_btn").show();

    var chatlist = $(".histform_table table tbody");
    chatlist.append("<tr><td></td><td><div class='bubble right'><div class='content'>" + hist[hist.length - 1].message + "</div></div></td><td>" + formatDate(new Date()) + "</td></tr>")
    $('.histform_table').scrollTop(9999);
    $("#chat_input").val("");
    $("#not_event").hide();
}


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function saveSPAddContact() {

    if (!$("#sp_add_cont_name").val()) {
        Materialize.toast('Введите имя контакта', 3000, 'rounded');
        return;
    }
    if (!$("#sp_add_cont_login").val()) {
        Materialize.toast('Введите логин', 3000, 'rounded');
        return;
    }
    for (var i = 0; i < contacts.length; i++) {
        if ($("#sp_add_cont_login").val() == contacts[i].login) {
            Materialize.toast('Этот логин уже существует. Введите другой', 3000, 'rounded');
            return;
        }
    }
    var id = guid();
    contacts.push({
        id: id,
        avatar: $("#add_avatar").attr("src"),
        name: $("#sp_add_cont_name").val(),
        login: $("#sp_add_cont_login").val()
    })
    localStorage.contacts = JSON.stringify(contacts);
    $("#sp_add_cont_name").val("");
    $("#sp_add_cont_login").val("");
    $("#add_avatar").attr("src", "avatars/noavatar1.png");
    hideAllSoftphonePages();
    $("#contacts_tab").click();
}
function saveSPEditContact() {
    for (var i = 0; i < contacts.length; i++) {
        if ($("#sp_edit_cont_login").val() == contacts[i].login && $("#edit_avatar").attr("src") == contacts[i].avatar) {
            Materialize.toast('Этот логин уже существует. Введите другой', 3000, 'rounded');
            return;
        }
    }
    id = $("#softphone_edit_contact_page ul").attr("data-id");
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
            contacts[i].avatar = $("#edit_avatar").attr("src"),
                contacts[i].avatar = $("#edit_avatar").attr("src"),
                contacts[i].name = $("#sp_edit_cont_name").val(),
                contacts[i].login = $("#sp_edit_cont_login").val();
        }
    }
    localStorage.contacts = JSON.stringify(contacts);
    hideAllSoftphonePages();
    $("#contacts_tab").click();
    Materialize.toast('Контакт успешно отредактирован', 3000, 'rounded');
}

function createSPListContacts() {
    var listItemsContacts = $('#softphone_contacts_page ul');
    listItemsContacts.empty();
    if (contacts.length == 0) {
        listItemsContacts.append("<span id='contact_empty'>Список контактов пуст</span>");
    } else {
        for (var i = contacts.length - 1; i >= 0; i--) {
            listItemsContacts.append('<li class="collection-item avatar" id="cont_' + contacts[i].id + '">' + '<img src="' + contacts[i].avatar + '" alt="" class="cont-avatar">' + '<span class="title">' + contacts[i].name + '</span>' + '<p>' + contacts[i].login + '</li>');
            var cur_cont = contacts[i];
            $('#cont_' + cur_cont.id).unbind();
            $('#cont_' + cur_cont.id).on("click", function (e) {
                var id = ($(e.currentTarget).attr('id')).substr(5);
                var avatar = $(e.currentTarget).find("img").attr("src");
                var name = $(e.currentTarget).find("span").text();
                var login = $(e.currentTarget).find("p").text();
                showSPEditContactPage(id, avatar, name, login);
            })
        }
    }
}

function showSPEditContactPage(id, avatar, name, login) {
    hideAllSoftphonePages();
    $("#softphone_edit_contact_page").show();
    $("#softphone_edit_contact_page ul").attr("data-id", id);
    $("#edit_avatar").attr("src", avatar);
    $("#sp_edit_cont_name").val(name);
    $("#sp_edit_cont_login").val(login);
}

function showSPAddContactsPage() {
    hideAllSoftphonePages();
    $("#softphone_add_contact_page").show();
}

function openChangeAvatarWindow() {
    $("#photo_select").click();
}

function openEditChangeAvatarWindow() {
    $("#edit_photo_select").click();
}

function pushBut1() {
    $("#telephone_number").val($("#telephone_number").val() + "1")
}
function pushBut2() {
    $("#telephone_number").val($("#telephone_number").val() + "2")
}
function pushBut3() {
    $("#telephone_number").val($("#telephone_number").val() + "3")
}
function pushBut4() {
    $("#telephone_number").val($("#telephone_number").val() + "4")
}
function pushBut5() {
    $("#telephone_number").val($("#telephone_number").val() + "5")
}
function pushBut6() {
    $("#telephone_number").val($("#telephone_number").val() + "6")
}
function pushBut7() {
    $("#telephone_number").val($("#telephone_number").val() + "7")
}
function pushBut8() {
    $("#telephone_number").val($("#telephone_number").val() + "8")
}
function pushBut9() {
    $("#telephone_number").val($("#telephone_number").val() + "9")
}
function pushBut0() {
    $("#telephone_number").val($("#telephone_number").val() + "0")
}
function pushButStar() {
    $("#telephone_number").val($("#telephone_number").val() + "*")
}
function pushButLettice() {
    $("#telephone_number").val($("#telephone_number").val() + "#")
}


function pushDTMFBut1() {
    $("#dtmf_number").val($("#dtmf_number").val() + "1")
}
function pushDTMFBut2() {
    $("#dtmf_number").val($("#dtmf_number").val() + "2")
}
function pushDTMFBut3() {
    $("#dtmf_number").val($("#dtmf_number").val() + "3")
}
function pushDTMFBut4() {
    $("#dtmf_number").val($("#dtmf_number").val() + "4")
}
function pushDTMFBut5() {
    $("#dtmf_number").val($("#dtmf_number").val() + "5")
}
function pushDTMFBut6() {
    $("#dtmf_number").val($("#dtmf_number").val() + "6")
}
function pushDTMFBut7() {
    $("#dtmf_number").val($("#dtmf_number").val() + "7")
}
function pushDTMFBut8() {
    $("#dtmf_number").val($("#dtmf_number").val() + "8")
}
function pushDTMFBut9() {
    $("#dtmf_number").val($("#dtmf_number").val() + "9")
}
function pushDTMFBut0() {
    $("#dtmf_number").val($("#dtmf_number").val() + "0")
}
function pushDTMFButStar() {
    $("#dtmf_number").val($("#dtmf_number").val() + "*")
}
function pushDTMFButLettice() {
    $("#dtmf_number").val($("#dtmf_number").val() + "#")
}


function pushIncomingDTMFBut1() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "1")
}
function pushIncomingDTMFBut2() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "2")
}
function pushIncomingDTMFBut3() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "3")
}
function pushIncomingDTMFBut4() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "4")
}
function pushIncomingDTMFBut5() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "5")
}
function pushIncomingDTMFBut6() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "6")
}
function pushIncomingDTMFBut7() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "7")
}
function pushIncomingDTMFBut8() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "8")
}
function pushIncomingDTMFBut9() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "9")
}
function pushIncomingDTMFBut0() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "0")
}
function pushIncomingDTMFButStar() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "*")
}
function pushIncomingDTMFButLettice() {
    $("#inc_dtmf_number").val($("#inc_dtmf_number").val() + "#")
}




function delNumbers() {
    var val = $("#telephone_number").val().slice(0, -1);
    $("#telephone_number").val(val);
}
function delNumbersDTMF() {
    var val = $("#dtmf_number").val().slice(0, -1);
    $("#dtmf_number").val(val);
}
function delIncomingNumbersDTMF() {
    var val = $("#inc_dtmf_number").val().slice(0, -1);
    $("#inc_dtmf_number").val(val);
}

function showSPLastPage() {
    hideAllSoftphonePages();
    $("#softphone_last_page").show();
    createSPListHist();
}

function showSPContactsPage() {
    hideAllSoftphonePages();
    $("#softphone_contacts_page").show();
    createSPListContacts();
}

function showSPButtonsPage() {
    hideAllSoftphonePages();
    showSoftphonePage();
    $('body').hammer().bind("swiperight", showSwipeRight);
    $('body').hammer().bind("swipeleft", showSwipeLeft);
    $("#softphone_buttons_page").show();
}
function showSPSettingsPage() {
    hideAllSoftphonePages();
    $("#softphone_settings_page").show();
}
function showSPSettingsConnectionPage() {
    hideAllSoftphonePages();
    $("#softphone_settings_connection_page").show();
    var str = localStorage.connect_settings;
    var obj = JSON.parse(str);
    $("#SPNumber").val(obj.authorizationUser);
    $("#SPPassword").val(obj.password);
    $("#SPhost").val(obj.host);
    $("#softphoneWSServer").val(obj.wsServers[0].ws_uri);
}
function showSwipeLeft() {
    hideAllPages();
    hideAllSoftphonePages()
    $('#main_page').show();
}
function showSwipeRight() {
    hideAllPages();
    $('#main_softphone_page').show();
    $('#last_tab').click();


}
function playPersJingle() {
    $("#player").attr("src", "audio/" + $('#pers_service_settings_jingle').val());
    $("#player").trigger("play");
}

function playColdJingle() {
    $("#player").attr("src", "audio/" + $('#cold_settings_service_jingle').val());
    $("#player").trigger("play");
}

function isright(input) {
    var max = Number($(input).attr("max"));
    var min = Number($(input).attr("min"));
    var value = Number($(input).val());
    if (input.value > max)
        input.value = max;
    if (input.value < min)
        input.value = min;

}

function savePersJournalCount() {
    localStorage.pers_journal_count = $('#pers_journal_count').val();
    getPersJournal();
}

function exitApp() {
    var confirmed = false;
    if (navigator.notification) {
        navigator.notification.confirm('', confirmed, 'Вы уверены что хотите выйти?');
    } else {
        confirmed = confirm("Вы уверены что хотите выйти?");
    }
    if (confirmed) {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        } else {
            window.close();
        }
    }
}

function playButtonSound() {
    var sound_file;
    if ($(this).text() == "*")
        sound_file = "asterisk";
    else if ($(this).text() == "#")
        sound_file = "pound";
    else
        sound_file = $(this).text();
    $("#player").attr("src", "audio/sounds/dialpad/" + sound_file + ".ogg");
    $("#player").trigger("play");
}
; function showSoftphonePage() {
    hideAllPages();
    $("#main_softphone_page").show();
}

function showMainPage() {
    hideAllPages();
    $("#main_page").show();
    $("#med_current").unbind("click");
    $("#pers_current").unbind("click");
    $("#cold_current").unbind("click");
    $("#gkh_current").unbind("click");
    $("#main_page ul.collection").empty();
    if (localStorage.med_added) {
        $("#main_page ul.collection").append('<li id="med_current" class="collection-item valign-wrapper">\
            <i class="material-icons list-icon">local_hospital</i>\
            <span class="menu-list-name">Медицинский ассистент</span>\
            <i class="material-icons list-icon right-align">chevron_right</i>\
        </li>')
    }
    if (localStorage.pers_added) {
        $("#main_page ul.collection").append('<li  id="pers_current" class="collection-item valign-wrapper">\
            <i class="material-icons list-icon">contact_phone</i>\
            <span class="menu-list-name ">Персональный ассистент</span>\
            <i class="material-icons list-icon right-align">chevron_right</i>\
        </li>')
    }
    if (localStorage.cold_added) {
        $("#main_page ul.collection").append('<li  id="cold_current" class="collection-item valign-wrapper">\
            <i class="material-icons list-icon">call</i>\
            <span class="menu-list-name ">Холодные звонки</span>\
            <i class="material-icons list-icon right-align">chevron_right</i>\
        </li>')
    }
    if (localStorage.gkh_added) {
        $("#main_page ul.collection").append('<li id="gkh_current" class="collection-item valign-wrapper">\
            <i class="material-icons list-icon">home</i>\
            <span class="menu-list-name">ЖКХ ассистент</span>\
            <i class="material-icons list-icon right-align">chevron_right</i>\
        </li>')
    }
    if (!localStorage.med_added && !localStorage.pers_added && !localStorage.gkh_added && !localStorage.cold_added) {
        $("#main_page ul.collection").append('<li class="collection-item valign-wrapper">Нет созданных ассистентов</li>');
    }
    $("#med_current").on("click", showCurrentMedPage);
    $("#pers_current").on("click", showCurrentPersPage);
    $("#gkh_current").on("click", showCurrentGKHPage);
    $("#cold_current").on("click", showCurrentColdPage);
}

function showAddConsPage() {
    if (localStorage.med && localStorage.pers && localStorage.gkh) {
        Materialize.toast('Вы уже добавили всех возможных ассистентов', 3000, 'rounded');
    } else {
        hideAllPages();
        $("#add_cons_page").show();
        $("#med_choose").unbind("click");
        $("#pers_choose").unbind("click");
        $("#gkh_choose").unbind("click");
        $("#add_cons_page ul.collection").empty();
        if (!localStorage.med_added) {
            $("#add_cons_page ul.collection").append('<li id="med_choose" class="collection-item valign-wrapper">\
                <i class="material-icons list-icon">local_hospital</i>\
                <span class="menu-list-name">Медицинский ассистент</span>\
                <i class="material-icons list-icon right-align">chevron_right</i>\
            </li>')
        }
        if (!localStorage.pers_added) {
            $("#add_cons_page ul.collection").append('<li id="pers_choose" class="collection-item valign-wrapper">\
                <i class="material-icons list-icon">contact_phone</i>\
                <span class="menu-list-name ">Персональный ассистент</span>\
                <i class="material-icons list-icon right-align">chevron_right</i>\
            </li>')
        }
        if (!localStorage.gkh_added) {
            $("#add_cons_page ul.collection").append('<li id="gkh_choose" class="collection-item valign-wrapper">\
                <i class="material-icons list-icon">home</i>\
                <span class="menu-list-name">ЖКХ ассистент</span>\
                <i class="material-icons list-icon right-align">chevron_right</i>\
            </li>')
        }
        if (!localStorage.cold_added) {
            $("#add_cons_page ul.collection").append('<li id="cold_choose" class="collection-item valign-wrapper">\
                <i class="material-icons list-icon">call</i>\
                <span class="menu-list-name">"Холодные" звонки</span>\
                <i class="material-icons list-icon right-align">chevron_right</i>\
            </li>')
        }
        $("#med_choose").on("click", saveMedSettings);
        $("#pers_choose").on("click", savePersSettings);
        $("#gkh_choose").on("click", saveGKHSettings);
        $("#cold_choose").on("click", saveColdSettings);
    }
}

function saveMedSettings() {
    localStorage["med_added"] = true;
    Materialize.toast('Медицинский ассистент добавлен', 3000, 'rounded');
    showMainPage();
}

function savePersSettings() {
    localStorage["pers_added"] = true;
    Materialize.toast('Персональный ассистент добавлен', 3000, 'rounded');
    showMainPage();
}

function saveGKHSettings() {
    localStorage["gkh_added"] = true;
    Materialize.toast('ЖКХ ассистент добавлен', 3000, 'rounded');
    showMainPage();
}

function saveColdSettings() {
    localStorage["cold_added"] = true;
    Materialize.toast('Сервис "Холодные" звонки добавлен', 3000, 'rounded');
    showMainPage();
}

function delMedSettings() {
    delete localStorage["med_added"];
    delete localStorage["med_token"];
    Materialize.toast('Медицинский ассистент удалён', 3000, 'rounded');
    showMainPage();
}

function delPersSettings() {
    delete localStorage["pers_added"];
    delete localStorage["pers_token"];
    Materialize.toast('Персональный ассистент удалён', 3000, 'rounded');
    showMainPage();
}

function delGKHSettings() {
    delete localStorage["gkh_added"];
    delete localStorage["gkh_token"];
    Materialize.toast('ЖКХ ассистент удалён', 3000, 'rounded');
    showMainPage();
}

function delColdSettings() {
    delete localStorage["cold_added"];
    delete localStorage["cold_token"];
    Materialize.toast('Сервис "Холодные" звонки удалён', 3000, 'rounded');
    showMainPage();
}
function softphoneDeleteContact() {
    var id = $("#softphone_edit_contact_page ul").attr("data-id");
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
            contacts.splice(i, 1);
            localStorage.contacts = JSON.stringify(contacts);
        }
    }
    Materialize.toast('Контакт успешно удален', 3000, 'rounded');
    showSPContactsPage();
}

function showCurrentMedPage() {
    hideAllPages();
    $("#med_current_page").show();
    if (localStorage.med_token) { } else {
        localStorage.lastAction = "showMedPage";
        showTrustedAuthPage();
    }
}

function showCurrentPersPage() {
    hideAllPages();
    if (localStorage.pers_token) {
        $("#pers_current_page").show();
    } else {
        localStorage.lastAction = "showPersPage";
        showTrustedAuthPage();
    }
}

function showCurrentColdPage() {
    hideAllPages();
    if (localStorage.cold_token) {
        $("#cold_current_page").show();
    } else {
        localStorage.lastAction = "showColdPage";
        showTrustedAuthPage();
    }
}

function showCurrentGKHPage() {
    hideAllPages();
    if (localStorage.gkh_token) {
        $("#gkh_current_page").show();
    } else {
        localStorage.lastAction = "showGKHPage";
        showTrustedAuthPage();
    }
}

function showTrustedAuthPage() {
    hideAllPages();
    $("#trusted_auth_page").show();
}

function getLastAction() {
    var login = $("#auth_login").val();
    var password = $("#auth_password").val();
    if (login && password) {
        switch (localStorage.lastAction) {
            case "showMedPage":
                localStorage.med_token = btoa(login + ":" + password);
                showCurrentMedPage();
                break;
            case "showPersPage":
                localStorage.pers_token = btoa(login + ":" + password);
                showCurrentPersPage();
                break;
            case "showGKHPage":
                localStorage.gkh_token = btoa(login + ":" + password);
                showCurrentGKHPage();
                break;
            case "showColdPage":
                localStorage.cold_token = btoa(login + ":" + password);
                showCurrentColdPage();
                break;
            default:
                showMainPage()
        }
    } else {
        Materialize.toast('Логин и пароль должны быть указаны', 3000, 'rounded');
    }
}

function showPersContactsPage() {
    hideAllPages();
    $("#pers_contacts_page").show();
}

function showPersJournal() {
    hideAllPages();
    $("#pers_journal_page").show();
}

function showPersSettingsPage() {
    hideAllPages();
    $("#pers_settings_page").show();
}

function getPersContacts() {
    showPersContactsPage();
    normalIcons();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:4000/contacts",
        data: {
            token: localStorage.pers_token
        },
        success: function (contacts) {
            $("#pers_contacts_list").empty();
            if (contacts.length) {
                for (var i = 0; i < contacts.length; i++) {
                    $("#pers_contacts_list").append('<li id="pers_contact_' + contacts[i].id + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + contacts[i].name + '</span>\
                        <span class="list-name">' + contacts[i].phone + '</span>\
                        <i class="material-icons list-icon right-align">chevron_right</i>\
                    </li>');
                    $('#pers_contact_' + contacts[i].id).unbind("taphold");
                    $('#pers_contact_' + contacts[i].id).unbind("click");

                    $('#pers_contact_' + contacts[i].id).on("click", function () {
                        if (holdedMode) {
                            $(this).toggleClass("active");
                        } else {
                            var id = ($(this).attr("id")).replace("pers_contact_", "");
                            var name = $(this).children("span:nth-child(1)").text();
                            var phone = $(this).children("span:nth-child(2)").text();
                            showPersContactsEditPage({
                                id: id,
                                name: name,
                                phone: phone
                            });
                        }
                    });
                    $('#pers_contact_' + contacts[i].id).on("taphold", function () {
                        $(this).addClass("active");
                        holdedIcons();
                    });
                }
            } else {
                $("#pers_contacts_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">У Вас нет контактов</span></li>');
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function selectAllPersPhones() {
    if (!allPersPhonesSelected) {
        $("#pers_phones_list .collection-item").removeClass("active");
        $("#pers_phones_list .collection-item").addClass("active");
        allPersPhonesSelected = true;
    } else {
        $("#pers_phones_list .collection-item").removeClass("active");
        allPersPhonesSelected = false;
    }

}

function selectAllPersContacts() {
    if (!allPersContactsSelected) {
        $("#pers_contacts_list .collection-item").removeClass("active");
        $("#pers_contacts_list .collection-item").addClass("active");
        allPersContactsSelected = true;
    } else {
        $("#pers_contacts_list .collection-item").removeClass("active");
        allPersContactsSelected = false;
    }
}

function delPersPhones() {
    if ($("#pers_phones_list .collection-item.active").length) {
        $("#preloader_page").show();
        var selected_count = $("#pers_phones_list .collection-item.active").length;
        var counter = 0;
        var errors = "";
        function next_iteration() {
            counter++;
            if (counter == selected_count) {
                $("#preloader_page").hide();
                if (errors) {
                    Materialize.toast(errors, 3000, 'rounded')
                }
                getPersPhonesSettings();
            }
        }
        $("#pers_phones_list .collection-item.active").each(function () {
            var id = ($(this).attr("id")).replace("pers_phone_", "");
            var phone = $(this).children("span:nth-child(2)").text();
            $.ajax({
                url: "https://dev.kloud.one:4000/users/remove_phone",
                data: {
                    phone_id: id,
                    phone: phone,
                    token: pers_token
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных номеров", 3000, 'rounded')
    }

}

function delPersContacts() {
    if ($("#pers_contacts_list .collection-item.active").length) {
        $("#preloader_page").show();
        var selected_count = $("#pers_contacts_list .collection-item.active").length;
        var counter = 0;
        var errors = "";
        function next_iteration() {
            counter++;
            if (counter == selected_count) {
                $("#preloader_page").hide();
                if (errors) {
                    Materialize.toast(errors, 3000, 'rounded')
                }
                getPersContacts();
            }
        }
        $("#pers_contacts_list .collection-item.active").each(function () {
            var id = ($(this).attr("id")).replace("pers_contact_", "");
            $.ajax({
                url: "https://dev.kloud.one:4000/contacts/destroy/" + id,
                data: {
                    token: pers_token
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных контактов!", 3000, 'rounded')
    }
}

function showPersContactsEditPage(contact) {
    hideAllPages();
    $("#pers_contacts_edit_page").show();
    $("#pers_contacts_edit_list").attr("data-id", contact.id);
    $("#pers_contacts_edit_phone").val(contact.phone);
    $("#pers_contacts_edit_name").val(contact.name);
}

function showAddPersContactsPage(contact) {
    hideAllPages();
    $("#pers_contacts_add_phone").val("");
    $("#pers_contacts_add_name").val("");
    $("#pers_contacts_add_page").show();
}

function saveAddPersContacts() {
    var phone = $("#pers_contacts_add_phone").val();
    var name = $("#pers_contacts_add_name").val();
    if (phone && name) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:4000/contacts/create",
            data: {
                phone: phone,
                name: name,
                token: localStorage.pers_token,
            },
            success: function () {
                $("#preloader_page").hide();
                getPersContacts();
            },
            error: function (err) {
                $("#preloader_page").hide();
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
    } else {
        Materialize.toast("Телефон и имя должны быть заполнены!", 3000, 'rounded');
    }
}

function saveEditPersContacts() {
    var phone = $("#pers_contacts_edit_phone").val();
    var name = $("#pers_contacts_edit_name").val();
    var id = $("#pers_contacts_edit_list").attr("data-id");
    if (phone && name) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:4000/contacts/update/" + id,
            data: {
                phone: phone,
                name: name,
                token: localStorage.pers_token
            },
            success: function () {
                $("#preloader_page").hide();
                getPersContacts();
            },
            error: function (err) {
                $("#preloader_page").hide();
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
    } else {
        Materialize.toast("Телефон и имя должны быть заполнены!", 3000, 'rounded');
    }
}

function showPersContactsImport() {
    hideAllPages();
    $("#pers_contacts_import_page").show();
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "phoneNumbers"];

    navigator.contacts.find(fields, function (data) {

        // console.log(data);
        $("#pers_contacts_import_list").empty();
        for (var i = 0; i < data.length; i++) {
            if (data[i].displayName && data[i].phoneNumbers[0].value) {
                var phone = (data[i].phoneNumbers[0].value).replace(/\ /g, "");
                phone = phone.replace(/\+/g, "");
                phone = phone.replace(/\-/g, "");
                if (phone.length == 11) {
                    if (phone[0] == "8")
                        phone = "7" + phone.substr(1);
                    $("#pers_contacts_import_list").append('<li id="import_' + i + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + data[i].displayName + '</span>\
                        <span class="list-name">' + phone + '</span>\
                    </li>');
                    $('#import_' + i).unbind("click");
                    $('#import_' + i).on("click", function () {
                        $(this).toggleClass("active");
                    });
                }
            }
        }

    }, function (err) {
        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
    }, options);

}

function selectAllPersContactsImport() {
    if (!allImportPersContactsSelected) {
        $("#pers_contacts_import_list .collection-item").removeClass("active");
        $("#pers_contacts_import_list .collection-item").addClass("active");
        allImportPersContactsSelected = true;
    } else {
        $("#pers_contacts_import_list .collection-item").removeClass("active");
        allImportPersContactsSelected = false;
    }
}

function saveImportPersContacts() {
    $("#preloader_page").show();
    var selected_count = $("#cold_contacts_import_list .collection-item.active").length;
    var counter = 0;
    var errors = "";
    if (selected_count) {
        $("#preloader_page").show();
        $("#pers_contacts_import_list .collection-item.active").each(function () {
            var name = $(this).children("span:nth-child(1)").text();
            var phone = $(this).children("span:nth-child(2)").text();
            $.ajax({
                url: "https://dev.kloud.one:4000/contacts/create",
                data: {
                    phone: phone,
                    name: name
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных контактов!", 3000, 'rounded');
        $("#preloader_page").hide();
    }
    function next_iteration() {
        counter++;
        if (counter == selected_count) {
            $("#preloader_page").hide();
            if (errors) {
                Materialize.toast(errors, 3000, 'rounded');
            }
            getPersContacts();
        }
    }
}

function normalIcons() {
    holdedMode = false;
    $(".collection-item").removeClass("active");
    $(".normal-icon").show();
    $(".holded-icon").hide();
}

function holdedIcons() {
    holdedMode = true;
    $(".normal-icon").hide();
    $(".holded-icon").show();
}

function showPersJournalDateRange() {
    hideAllPages();
    $("#pers_journal_date_range_page").show();
}

function showPersJournalCountInput() {
    hideAllPages();
    $("#pers_journal_count_page").show();
}

function getPersJournal() {
    showPersJournal();
    var date;
    if (localStorage.pers_journal_datepicker) {
        date = new Date(localStorage.pers_journal_datepicker);
    } else {
        date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate() + 1;
    if (day < 10) {
        day = "0" + day;
    }
    var limit;
    if (localStorage.pers_journal_count) {
        limit = localStorage.pers_journal_count;
    } else {
        limit = 10;
    }
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:4000/users/calls/tableData/report",
        data: {
            page: 1,
            search: '{"gdate": "' + year + '.' + month + '.' + day + ' 00:00|' + year + '.' + month + '.' + day + ' 23:59"}',
            searchOption: "gdate",
            start: 0,
            limit: limit,
            token: localStorage.pers_token
        },
        success: function (data) {
            var calls = data.data;
            $("#pers_journal_list").empty();
            if (calls.length) {
                for (var i = 0; i < calls.length; i++) {
                    $("#pers_journal_list").append('<li id="pers_call_' + calls[i].session_id + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + calls[i].gdate + '</span>\
                        <span class="list-name">' + calls[i].type + '</span>\
                        <span class="list-name">' + calls[i].msisdn + '</span>\
                        <span class="list-name">' + calls[i].status + '</span>\
                        <audio class="rec list-audio" type="audio/wav" src="https://dev.kloud.one:4000/users/calls/' + calls[i].record + '" controls="" autobuffer=""></audio>\
                    </li>');
                }
            } else {
                $("#pers_journal_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">В этот день звонков не было</span></li>');
            }

        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function showPersProfilePage() {
    hideAllPages();
    $("#pers_profile_page").show();
}

function getPersProfile() {
    showPersProfilePage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:4000/users/get_profile",
        data: {
            token: localStorage.pers_token
        },
        success: function (profile) {
            if (profile.email) {
                $("#pers_profile_email").text(profile.email);
            }
            if (profile.login) {
                $("#pers_profile_login").text(profile.login);
            }
            if (profile.unallocated_time) {
                var totalSeconds = parseInt(profile.unallocated_time);
                var hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds % 60;
                if (minutes.toString().length == 1) {
                    minutes = "0" + minutes;
                }
                if (seconds.toString().length == 1) {
                    seconds = "0" + seconds;
                }
                $("#pers_profile_unallocated_time").text(hours + ":" + minutes + ":" + seconds);
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function showPersServiceSettingsPage() {
    hideAllPages();
    $("#pers_service_settings_page").show();
}

function getPersServiceSettings() {
    showPersServiceSettingsPage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:4000/users/get_profile",
        data: {
            token: localStorage.pers_token
        },
        success: function (profile) {
            $("#pers_service_settings_menu").attr("data-id", profile.id);
            var texts = [" сейчас не может ответить так как находится на совещании.", " сейчас не может ответить так как находится в отпуске.", " сейчас не может ответить потому, что ", " сейчас не может ответить.",];
            if (profile.sex == "m") {
                for (var i = 0; i < texts.length; i++) {
                    texts[i] = "Он" + texts[i];
                }
                texts[2] += "занят."
            } else {
                for (var i = 0; i < texts.length; i++) {
                    texts[i] = "Она" + texts[i];
                }
                texts[2] += "занята."
            }
            for (var i = 0; i < texts.length; i++) {
                $('#pers_service_settings_reason').append("<option value='" + texts[i] + "'>" + texts[i] + "</option>")
            }
            $('#pers_service_settings_self_phone').val(profile.self_phone);
            $('#pers_service_settings_name').val(profile.name);
            $('#pers_service_settings_sex').val(profile.sex);
            $('#pers_service_settings_voice').val(profile.voice);
            $('#pers_service_settings_jingle').val(profile.jingle);
            $("#pers_service_settings_reason").empty();
            if (profile.hello_text) {
                var flag = false;
                var options = $("#pers_service_settings_reason option").map(function () {
                    return this.value;
                }).get();
                for (var i = 0; i < options.length; i++) {
                    if (options[i] == profile.hello_text) {
                        flag = true;
                        $("#pers_service_settings_reason").val(profile.hello_text);
                    }
                }
                if (!flag) {
                    $("#pers_service_settings_reason_custom").val(profile.hello_text)
                }
            }

            $("#pers_service_settings_email").text(profile.email);
            var email_password = "";
            if (profile.encrypted_emailPassword) {
                email_password = atob(profile.encrypted_emailPassword)
            }
            ; $('#pers_service_settings_email_password').val(email_password);
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function savePersServiceSettings() {
    var obj = {};
    var id = $("#pers_service_settings_menu").attr("data-id");
    if ($('#pers_service_settings_self_phone').val()) {
        obj.self_phone = $('#pers_service_settings_self_phone').val();
    } else {
        Materialize.toast('Поле "Свой телефон" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#pers_service_settings_name').val()) {
        obj.name = $('#pers_service_settings_name').val();
    } else {
        Materialize.toast('Поле "Имя" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    obj.sex = $('#pers_service_settings_sex').val();
    obj.voice = $('#pers_service_settings_voice').val();
    obj.jingle = $('#pers_service_settings_jingle').val();
    if ($('#pers_service_settings_reason_custom').val()) {
        obj.hello_text = $('#pers_service_settings_reason_custom').val();
    } else {
        obj.hello_text = $('#pers_service_settings_reason').val();
    }
    if ($('#pers_service_settings_email_password').val()) {
        obj.email_password = $('#pers_service_settings_email_password').val();
    } else {
        Materialize.toast('Поле "Пароль к Email" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    obj.token = localStorage.pers_token;
    $.ajax({
        url: "https://dev.kloud.one:4000/users/update/" + id,
        data: obj,
        success: function (data) {
            Materialize.toast("Профиль успешно сохранён!", 3000, 'rounded');
            showPersSettingsPage();
        },
        error: function (err) {
            var msg = err.responseJSON.msg || "Произошла ошибка сохранения профиля"
            Materialize.toast(msg, 3000, 'rounded');
            showPersSettingsPage();
        }
    })
}

function showPersPhonesSettingsPage() {
    hideAllPages();
    $("#pers_phones_settings_page").show();
}

function getPersPhonesSettings() {
    showPersPhonesSettingsPage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:4000/users/get_profile",
        data: {
            token: localStorage.pers_token
        },
        success: function (profile) {
            $("#pers_phones_list").empty();
            if (profile.phones && profile.phones.length) {
                for (var i = 0; i < profile.phones.length; i++) {
                    var time = "0:00:00";
                    var availableTime = 0;
                    var unallocated_time = 0;
                    var phone = profile.phones[i].phone;
                    var service = profile.phones[i].service;
                    var service_text = "Выключен";
                    if (service) {
                        service_text = "Работает";
                    } else {
                        service_text = "Выключен";
                    }
                    if (profile.phones[i].availableTime) {
                        availableTime = profile.phones[i].availableTime;
                        var totalSeconds = parseInt(profile.phones[i].availableTime);
                        var hours = Math.floor(totalSeconds / 3600);
                        totalSeconds %= 3600;
                        var minutes = Math.floor(totalSeconds / 60);
                        var seconds = totalSeconds % 60;
                        if (minutes.toString().length == 1) {
                            minutes = "0" + minutes;
                        }
                        if (seconds.toString().length == 1) {
                            seconds = "0" + seconds;
                        }
                        time = hours + ":" + minutes + ":" + seconds;
                    }
                    if (profile.unallocated_time)
                        unallocated_time = profile.unallocated_time;

                    $("#pers_phones_list").append('<li id="pers_phone_' + profile.phones[i].id + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + phone + '</span>\
                        <span class="list-name" data-availableTime="' + availableTime + '">' + time + '</span>\
                        <span class="list-name">' + service_text + '</span>\
                        <i class="material-icons list-icon right-align">chevron_right</i>\
                    </li>');
                    $('#pers_phone_' + profile.phones[i].id).unbind("taphold");
                    $('#pers_phone_' + profile.phones[i].id).unbind("click");

                    $('#pers_phone_' + profile.phones[i].id).on("click", function () {
                        if (holdedMode) {
                            $(this).toggleClass("active");
                        } else {
                            var id = ($(this).attr("id")).replace("pers_phone_", "");
                            var time = $(this).children("span:nth-child(2)").attr("data-availableTime");
                            showPersPhonesEditPage({
                                id: id,
                                phone: phone,
                                unallocated_time: unallocated_time,
                                service: service
                            });
                        }
                    });
                    $('#pers_phone_' + profile.phones[i].id).on("taphold", function () {
                        $(this).addClass("active");
                        holdedIcons();
                    });
                }
            } else {
                $("#pers_phones_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">У Вас нет телефонов</span></li>')
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function showPersPhonesEditPage(data) {
    hideAllPages();
    $("#pers_phones_edit_page").show();
    $("#pers_phone_edit_phone").text(data.phone);
    if (data.service) {
        $("#pers_phone_service_toggle").attr("checked", "checked");
    } else {
        $("#pers_phone_service_toggle").removeAttr("checked");
    }

    $("#pers_add_time_input").attr("max", data.unallocated_time);
    $("#pers_add_time_input").val(0);
    $("#pers_phone_menu_list").attr("data-id", data.id);
}

function savePersPhonesEdit() {
    var id = $("#pers_phone_menu_list").attr("data-id");
    var time = $("#pers_add_time_input").val();
    if (time) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:4000/phones/add_time",
            data: {
                phone_id: id,
                add_time: time,
                token: localStorage.pers_token
            },
            success: function () {
                $("#preloader_page").hide();
                getPersPhonesSettings();
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#preloader_page").hide();
            }
        })
    } else {
        Materialize.toast("Поле 'Добавить секунд' должно быть заполнено!", 3000, 'rounded');
    }
}

function togglePersPhoneService() {
    var id = $("#pers_phone_menu_list").attr("data-id");
    if (!($("#pers_phone_service_toggle").is(":checked"))) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:4000/users/desactivation",
            data: {
                gateway_id: id,
                token: localStorage.pers_token
            },
            success: function () {
                $.ajax({
                    url: "https://dev.kloud.one:4000/phones/update_type",
                    data: {
                        phone_id: id,
                        service: false,
                        token: localStorage.pers_token
                    },
                    success: function () {
                        $("#preloader_page").hide();
                        Materialize.toast("Сервис деактивирован", 3000, 'rounded');
                    },
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                        $("#pers_phone_service_toggle").attr("checked", "checked");
                        $("#preloader_page").hide();
                    }
                })
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#pers_phone_service_toggle").attr("checked", "checked");
                $("#preloader_page").hide();
            }
        })
    } else {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:4000/users/activation",
            data: {
                gateway_id: id,
                token: localStorage.pers_token
            },
            success: function () {
                $.ajax({
                    url: "https://dev.kloud.one:4000/phones/update_type",
                    data: {
                        phone_id: id,
                        service: true,
                        token: localStorage.pers_token
                    },
                    success: function () {
                        $("#preloader_page").hide();
                        Materialize.toast("Сервис активирован", 3000, 'rounded');
                    },
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                        $("#pers_phone_service_toggle").attr("checked", "checked");
                        $("#preloader_page").hide();
                    }
                })
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#pers_phone_service_toggle").removeAttr("checked");
                $("#preloader_page").hide();
            }
        })
    }
}

function addPersServicePhone() {
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:4000/users/add_phone",
        data: {
            token: localStorage.pers_token
        },
        success: function () {
            $("#preloader_page").hide();
            getPersPhonesSettings();
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function showColdContactsPage() {
    hideAllPages();
    $("#cold_contacts_page").show();
}

function showColdJournal() {
    hideAllPages();
    $("#cold_journal_page").show();
}

function showColdSettingsPage() {
    hideAllPages();
    $("#cold_settings_page").show();
}

function showColdContactsEditPage(contact) {
    hideAllPages();
    $("#cold_contacts_edit_page").show();
    $("#cold_contacts_edit_list").attr("data-id", contact.id);
    $("#cold_contacts_edit_phone").val(contact.phone);
    $("#cold_contacts_edit_name").val(contact.name);
}

function getColdContacts() {
    showColdContactsPage();
    normalIcons();
    $("#preloader_page").show();
    $.ajax({
        url: "https://cc.kloud.one/contacts",
        data: {
            token: localStorage.cold_token
        },
        success: function (contacts) {
            $("#cold_contacts_list").empty();
            if (contacts.length) {
                // console.log(contacts);
                for (var i = 0; i < contacts.length; i++) {
                    $("#cold_contacts_list").append('<li id="cold_contact_' + contacts[i].id + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + contacts[i].name + '</span>\
                        <span class="list-name">' + contacts[i].phone + '</span>\
                        <i class="material-icons list-icon right-align">chevron_right</i>\
                    </li>');
                    $('#cold_contact_' + contacts[i].id).unbind("taphold");
                    $('#cold_contact_' + contacts[i].id).unbind("click");

                    $('#cold_contact_' + contacts[i].id).on("click", function () {
                        if (holdedMode) {
                            $(this).toggleClass("active");
                        } else {
                            var id = ($(this).attr("id")).replace("cold_contact_", "");
                            var name = $(this).children("span:nth-child(1)").text();
                            var phone = $(this).children("span:nth-child(2)").text();
                            showColdContactsEditPage({
                                id: id,
                                name: name,
                                phone: phone
                            });
                        }
                    });
                    $('#cold_contact_' + contacts[i].id).on("taphold", function () {
                        $(this).addClass("active");
                        holdedIcons();
                    });
                }
            } else {
                $("#cold_contacts_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">У Вас нет контактов</span></li>');
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function showColdContactsImport() {
    hideAllPages();
    $("#cold_contacts_import_page").show();
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "phoneNumbers"];
    navigator.contacts.find(fields, function (data) {
        // console.log(data);
        $("#cold_contacts_import_list").empty();
        for (var i = 0; i < data.length; i++) {
            if (data[i].displayName && data[i].phoneNumbers[0].value) {
                var phone = (data[i].phoneNumbers[0].value).replace(/\ /g, "");
                phone = phone.replace(/\+/g, "");
                phone = phone.replace(/\-/g, "");
                if (phone.length == 11) {
                    if (phone[0] == "8")
                        phone = "7" + phone.substr(1);
                    $("#cold_contacts_import_list").append('<li id="cold_import_' + i + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + data[i].displayName + '</span>\
                        <span class="list-name">' + phone + '</span>\
                    </li>');
                    $('#cold_import_' + i).unbind("click");
                    $('#cold_import_' + i).on("click", function () {
                        $(this).toggleClass("active");
                    });
                }
            }
        }

    }, function (err) {
        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
    }, options);
}

function selectAllColdContacts() {
    if (!allPersContactsSelected) {
        $("#cold_contacts_list .collection-item").removeClass("active");
        $("#cold_contacts_list .collection-item").addClass("active");
        allColdContactsSelected = true;
    } else {
        $("#pers_contacts_list .collection-item").removeClass("active");
        allColdContactsSelected = false;
    }
}

function selectAllColdContactsImport() {
    if (!allImportColdContactsSelected) {
        $("#cold_contacts_import_list .collection-item").removeClass("active");
        $("#cold_contacts_import_list .collection-item").addClass("active");
        allImportColdContactsSelected = true;
    } else {
        $("#cold_contacts_import_list .collection-item").removeClass("active");
        allImportColdContactsSelected = false;
    }
}

function saveImportColdContacts() {
    $("#preloader_page").show();
    var selected_count = $("#cold_contacts_import_list .collection-item.active").length;
    var counter = 0;
    var errors = "";
    if (selected_count) {
        $("#preloader_page").show();
        $("#cold_contacts_import_list .collection-item.active").each(function () {
            var name = $(this).children("span:nth-child(1)").text();
            var phone = $(this).children("span:nth-child(2)").text();
            $.ajax({
                url: "https://cc.kloud.one/contacts/create",
                data: {
                    phone: phone,
                    name: name
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных контактов!", 3000, 'rounded');
        $("#preloader_page").hide();
    }
    function next_iteration() {
        counter++;
        if (counter == selected_count) {
            $("#preloader_page").hide();
            if (errors) {
                Materialize.toast(errors, 3000, 'rounded');
            }
            getColdContacts();
        }
    }
}

function delColdContacts() {
    $("#preloader_page").show();
    if ($("#cold_contacts_list .collection-item.active").length) {
        var selected_count = $("#cold_contacts_list .collection-item.active").length;
        var counter = 0;
        var errors = "";
        $("#cold_contacts_list .collection-item.active").each(function () {
            var id = ($(this).attr("id")).replace("cold_contact_", "");
            $.ajax({
                url: "https://cc.kloud.one/contacts/destroy/" + id,
                data: {
                    token: localStorage.cold_token,
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных контактов!", 3000, 'rounded')
    }
    function next_iteration() {
        counter++;
        if (counter == selected_count) {
            $("#preloader_page").hide();
            if (errors) {
                Materialize.toast(errors, 3000, 'rounded');
            }
            getColdContacts();
        }
    }
}

function saveEditColdContacts() {
    var phone = $("#cold_contacts_edit_phone").val();
    var name = $("#cold_contacts_edit_name").val();
    var id = $("#cold_contacts_edit_list").attr("data-id");
    if (phone && name) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://cc.kloud.one/contacts/update/" + id,
            data: {
                phone: phone,
                name: name,
                token: localStorage.cold_token
            },
            success: function () {
                $("#preloader_page").hide();
                getColdContacts();
            },
            error: function (err) {
                $("#preloader_page").hide();
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
    } else {
        Materialize.toast("Телефон и имя должны быть заполнены!", 3000, 'rounded');
    }
}

function showAddColdContactsPage(contact) {
    hideAllPages();
    $("#cold_contacts_add_phone").val("");
    $("#cold_contacts_add_name").val("");
    $("#cold_contacts_add_page").show();
}

function saveAddColdContacts() {
    var phone = $("#cold_contacts_add_phone").val();
    var name = $("#cold_contacts_add_name").val();
    if (phone && name) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://cc.kloud.one/contacts/create",
            data: {
                phone: phone,
                name: name,
                token: localStorage.cold_token,
            },
            success: function () {
                $("#preloader_page").hide();
                getColdContacts();
            },
            error: function (err) {
                $("#preloader_page").hide();
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
    } else {
        Materialize.toast("Телефон и имя должны быть заполнены!", 3000, 'rounded');
    }
}

function getColdJournal() {
    showColdJournal();
    var date;
    if (localStorage.cold_journal_datepicker) {
        date = new Date(localStorage.cold_journal_datepicker);
    } else {
        date = new Date();
    }
    // console.log(date);
    var year = date.getFullYear();
    // console.log(year);
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate() + 1;
    if (day < 10) {
        day = "0" + day;
    }
    // console.log(day);
    var limit;
    if (localStorage.cold_journal_count) {
        limit = localStorage.cold_journal_count;
    } else {
        limit = 10;
    }
    $("#preloader_page").show();
    $.ajax({
        url: "https://cc.kloud.one/users/calls/tableData/report",
        data: {
            page: 1,
            search: '{"gdate": "' + year + '.' + month + '.' + day + ' 00:00|' + year + '.' + month + '.' + day + ' 23:59"}',
            searchOption: "gdate",
            start: 0,
            limit: limit,
            token: localStorage.cold_token
        },
        success: function (data) {
            // console.log(data);
            var calls = data.data;
            $("#cold_journal_list").empty();
            if (calls.length) {
                for (var i = 0; i < calls.length; i++) {
                    if (calls[i].record) {
                        console.log('https://cc.kloud.one/users/calls/' + calls[i].record);
                        $("#cold_journal_list").append('<li id="cold_call_' + calls[i].session_id + '" class="collection-item valign-wrapper">\
                            <span class="list-name">' + calls[i].gdate + '</span>\
                            <span class="list-name">' + calls[i].type + '</span>\
                            <span class="list-name">' + calls[i].msisdn + '</span>\
                            <span class="list-name">' + calls[i].status + '</span>\
                            <audio class="rec list-audio" type="audio/wav" src="https://cc.kloud.one/users/calls/' + calls[i].record + '" controls="" autobuffer=""></audio>\
                        </li>')
                    } else {
                        $("#cold_journal_list").append('<li id="cold_call_' + calls[i].session_id + '" class="collection-item valign-wrapper">\
                            <span class="list-name">' + calls[i].gdate + '</span>\
                            <span class="list-name">' + calls[i].type + '</span>\
                            <span class="list-name">' + calls[i].msisdn + '</span>\
                            <span class="list-name">' + calls[i].status + '</span>\
                        </li>')
                    }
                }
            } else {
                $("#cold_journal_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">В этот день звонков не было</span></li>');
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function saveColdJournalCount() {
    localStorage.cold_journal_count = $('#cold_journal_count').val();
    getColdJournal();
}
function showColdSettingsServicePage() {
    hideAllPages();
    $("#cold_settings_service_page").show();
}
function showColdJournalDateRange() {
    hideAllPages();
    $("#cold_journal_date_range_page").show();
}
function showColdJournalCountInput() {
    hideAllPages();
    $("#cold_journal_count_page").show();

}
function getColdSettingsService() {
    showColdSettingsServicePage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://cc.kloud.one/users/get_profile",
        data: {
            token: localStorage.cold_token
        },
        success: function (profile) {
            $("#preloader_page").hide();
            $("#cold_settings_service_menu").attr("data-id", profile.id);
            $('#cold_settings_service_start_time').val(profile.calltime);
            $('#cold_settings_service_retry_calls').val(profile.retrycalls);
            $('#cold_settings_service_reject_calls').val(profile.rejecttime);
            $('#cold_settings_service_text').val(profile.tasks_text);
            $('#cold_settings_service_voice').val(profile.voice);
            $('#cold_settings_service_time_style').val(profile.styletime);
            $('#cold_settings_service_start_date').val(profile.startDate);
            $('#cold_settings_service_week_days').val(profile.weekdays);
            $('#cold_settings_service_jingle').val(profile.jingle);
            $('#cold_settings_service_phone').val(profile.phone);
            $('#cold_settings_service_phone_password').val(profile.phone_password);

            var styleTime = profile.styletime;
            switch (styleTime) {
                case "0":
                    $('#cold_settings_service_start_date_li').show();
                    $('#cold_settings_service_week_days_li').hide();
                    break;
                case "1":
                    $('#cold_settings_service_start_date_li').hide();
                    $('#cold_settings_service_week_days_li').hide();
                    break;
                case "2":
                    $('#cold_settings_service_start_date_li').hide();
                    $('#cold_settings_service_week_days_li').show();
                    break;
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function toggleColdSettingsServiceStyleTime() {
    switch ($(this).val()) {
        case "0":
            $('#cold_settings_service_start_date_li').show();
            $('#cold_settings_service_week_days_li').hide();
            break;
        case "1":
            $('#cold_settings_service_start_date_li').hide();
            $('#cold_settings_service_week_days_li').hide();
            break;
        case "2":
            $('#cold_settings_service_start_date_li').hide();
            $('#cold_settings_service_week_days_li').show();
            break;
    }
}

function saveColdSettingsService() {
    var obj = {};
    var id = $("#cold_settings_service_menu").attr("data-id");
    if ($('#cold_settings_service_start_time').val()) {
        obj.calltime = $('#cold_settings_service_start_time').val();
    } else {
        Materialize.toast('Поле "Время начала" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#cold_settings_service_retry_calls').val()) {
        obj.retrycalls = $('#cold_settings_service_retry_calls').val();
    } else {
        Materialize.toast('Поле "Повторных звонков" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#cold_settings_service_reject_calls').val()) {
        obj.rejecttime = $('#cold_settings_service_reject_calls').val();
    } else {
        Materialize.toast('Поле "Прекратить обзвон" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#cold_settings_service_text').val()) {
        obj.tasks_text = $('#cold_settings_service_text').val();
    } else {
        Materialize.toast('Поле "Текст" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    obj.voice = $('#cold_settings_service_voice').val();
    obj.phone = $('#cold_settings_service_phone').val();
    obj.phone_password = $('#cold_settings_service_phone_password').val();
    obj.jingle = $('#cold_settings_service_jingle').val();
    obj.styleTime = $('#cold_settings_service_time_style').val();

    switch (obj.styleTime) {
        case "0":
            if ($('#cold_settings_service_start_date').val()) {
                obj.startDate = $('#cold_settings_service_start_date').val();
            } else {
                Materialize.toast('Поле "Выберите день" должно быть заполнено!', 3000, 'rounded');
                return;
            }
            break;
        case "1":
            break;
        case "2":
            if ($('#cold_settings_service_week_days').val()) {
                obj.weekdays = $('#cold_settings_service_week_days').val();
            } else {
                Materialize.toast('Поле "Дни недели" должно быть заполнено!', 3000, 'rounded');
                return;
            }
            break;
    }
    obj.token = localStorage.cold_token;
    $.ajax({
        url: "https://cc.kloud.one/users/update/" + id,
        data: obj,
        success: function (data) {
            Materialize.toast("Настройки успешно сохранены!", 3000, 'rounded');
            // console.log(data);
            showCurrentColdPage();
        },
        error: function (err) {
            var msg = err.responseJSON.msg || "Произошла ошибка сохранения настроек"
            Materialize.toast(msg, 3000, 'rounded');
            showColdSettingsServicePage();
        }
    })
}

function showColdProfilePage() {
    hideAllPages();
    $("#cold_profile_page").show();
}

function getColdProfile() {
    showColdProfilePage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://cc.kloud.one/users/get_profile",
        data: {
            token: localStorage.cold_token
        },
        success: function (profile) {
            if (profile.email) {
                $("#cold_profile_email").text(profile.email);
            }
            if (profile.login) {
                $("#cold_profile_login").text(profile.login);
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    }).done(function () {
        $("#preloader_page").hide();
    });
}

function showGKHAccountsPage() {
    hideAllPages();
    $("#gkh_accounts_page").show();
}

function getGKHAccounts() {
    showGKHAccountsPage();
    normalIcons();
    $("#preloader_page").show();
    scrollGKHAccounts = 1;
    $("#gkh_accounts_list").empty();
    function sendAjax() {
        var obj = {
            rows: 30,
            page: scrollGKHAccounts,
            auth_token: localStorage.gkh_token
        };
        if (localStorage.gkh_accounts_datepicker) {
            obj.search = '"' + localStorage.gkh_accounts_datepicker + '"';
            obj.searchOption = "period"
        }
        if (localStorage.gkh_accounts_phone) {
            obj.filter = JSON.stringify({
                "phone": {
                    "value": localStorage.gkh_accounts_phone,
                    "filterType": "input"
                }
            });
        }
        if (localStorage.gkh_accounts_number) {
            obj.filter = JSON.stringify({
                "number": {
                    "value": localStorage.gkh_accounts_number,
                    "filterType": "input"
                }
            });
        }
        $.ajax({
            url: "https://dev.kloud.one:1337/M_0001/list",
            data: obj,
            success: function (data) {
                var accounts = data.data;
                $("#preloader_page").hide();
                if (accounts.length) {
                    for (var i = 0; i < accounts.length; i++) {
                        var phone = accounts[i].phone || "";
                        var address = accounts[i].address || "";
                        if (accounts[i].address && accounts[i].address[0]) {
                            address = accounts[i].address[0].street + ",";
                            address += accounts[i].address[0].house + "-";
                            address += accounts[i].address[0].apartment + ",";
                            address += accounts[i].address[0].city;
                        }
                        var debt = "";
                        if (accounts[i].debt && accounts[i].debt[0] && accounts[i].debt[0].sum_of_debt) {
                            debt = accounts[i].debt[0].sum_of_debt + " руб.(" + accounts[i].debt[0].months_of_debt_count + "мес.)";
                        }
                        $("#gkh_accounts_list").append('<li id="gkh_account_' + accounts[i].id + '" data-debt="' + debt + '" data-address="' + address + '" class="collection-item valign-wrapper">\
                            <span class="list-name">' + accounts[i].number + '</span>\
                            <span class="list-name">' + phone + '</span>\
                            <span class="list-name">' + debt + '</span>\
                            <i class="material-icons list-icon right-align">chevron_right</i>\
                        </li>');
                        $('#gkh_account_' + accounts[i].id).unbind("taphold");
                        $('#gkh_account_' + accounts[i].id).unbind("click");

                        $('#gkh_account_' + accounts[i].id).on("click", function () {
                            if (holdedMode) {
                                $(this).toggleClass("active");
                            } else {
                                var id = ($(this).attr("id")).replace("gkh_account_", "");
                                var debt = $(this).attr("data-debt");
                                var address = $(this).attr("data-address");
                                var number = $(this).children("span:nth-child(1)").text();
                                var phone = $(this).children("span:nth-child(2)").text();
                                showGKHAccountsEditPage({
                                    id: id,
                                    number: number,
                                    phone: phone,
                                    debt: debt,
                                    address: address
                                });
                            }
                        });
                        $('#gkh_account_' + accounts[i].id).on("taphold", function () {
                            $(this).addClass("active");
                            holdedIcons();
                        });
                    }
                    if (accounts.length == 30) {
                        $(window).unbind("scroll");
                        $(window).scroll(function () {
                            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                                scrollGKHAccounts++;
                                $("#preloader_page").show();
                                sendAjax();
                            }
                        });
                    } else {
                        $(window).unbind("scroll");
                    }
                } else {
                    $(window).unbind("scroll");
                    $("#gkh_accounts_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">У Вас нет лицевых счетов</span></li>');
                }
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#preloader_page").hide();
            }
        })
    }
    sendAjax();
}

function selectAllGKHAccounts() {
    if (!allGKHAccountsSelected) {
        $("#gkh_accounts_list .collection-item").removeClass("active");
        $("#gkh_accounts_list .collection-item").addClass("active");
        allGKHAccountsSelected = true;
    } else {
        $("#gkh_accounts_list .collection-item").removeClass("active");
        allGKHAccountsSelected = false;
    }
}

function delGKHAccounts() {
    if ($("#gkh_accounts_list .collection-item.active").length) {
        $("#preloader_page").show();
        var selected_count = $("#gkh_accounts_list .collection-item.active").length;
        var counter = 0;
        var errors = "";
        function next_iteration() {
            counter++;
            if (counter == selected_count) {
                $("#preloader_page").hide();
                if (errors) {
                    Materialize.toast(errors, 3000, 'rounded')
                }
                getGKHAccounts();
            }
        }
        $("#gkh_accounts_list .collection-item.active").each(function () {
            var id = ($(this).attr("id")).replace("gkh_account_", "");
            $.ajax({
                url: "https://dev.kloud.one:1337/M_0001/destroy/" + id,
                data: {
                    auth_token: localStorage.gkh_token
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных лицевых счетов", 3000, 'rounded')
    }

}

function showGKHAccountsEditPage(account) {
    hideAllPages();
    $("#gkh_accounts_edit_page").show();
    $("#gkh_accounts_edit_list").attr("data-id", account.id);
    $("#gkh_accounts_edit_phone").val(account.phone);
    $("#gkh_accounts_edit_number").val(account.number);
    $("#gkh_accounts_edit_address").text(account.address);
    $("#gkh_accounts_edit_debt").text(account.debt);
}

function saveEditGKHAccounts() {
    var phone = $("#gkh_accounts_edit_phone").val();
    var number = $("#gkh_accounts_edit_number").val();
    var id = $("#gkh_accounts_edit_list").attr("data-id");
    if (phone && number) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:1337/M_0001/update/" + id,
            data: {
                phone: phone,
                number: number,
                auth_token: localStorage.gkh_token
            },
            success: function () {
                $("#preloader_page").hide();
                getGKHAccounts();
            },
            error: function (err) {
                $("#preloader_page").hide();
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
    } else {
        Materialize.toast("Телефон и номер л/с должны быть заполнены!", 3000, 'rounded');
    }
}

function showGKHAccountsNumber() {
    hideAllPages();
    $("#gkh_accounts_number_page").show();
}

function showGKHAccountsPhone() {
    hideAllPages();
    $("#gkh_accounts_phone_page").show();
}

function showGKHAccountsMonth() {
    hideAllPages();
    $("#gkh_accounts_month_page").show();
}

function clearGKHAccountsNumber() {
    delete localStorage.gkh_accounts_number;
    $("#gkh_accounts_number_input").val("");
    getGKHAccounts();
}

function clearGKHAccountsPhone() {
    delete localStorage.gkh_accounts_phone;
    $("#gkh_accounts_phone_input").val("");
    getGKHAccounts();
}

function clearGKHAccountsMonth() {
    delete localStorage.gkh_accounts_datepicker;
    $("#gkh_accounts_month_input").val("");
    getGKHAccounts();
}

function saveGKHAccountsNumber() {
    if ($("#gkh_accounts_number_input").val())
        localStorage.gkh_accounts_number = $("#gkh_accounts_number_input").val();
    getGKHAccounts();
}

function saveGKHAccountsPhone() {
    if ($("#gkh_accounts_phone_input").val())
        localStorage.gkh_accounts_phone = $("#gkh_accounts_phone_input").val();
    getGKHAccounts();
}

function showGKHMetersPage() {
    hideAllPages();
    $("#gkh_meters_page").show();
}

function getGKHMeters() {
    showGKHMetersPage();
    normalIcons();
    $("#preloader_page").show();
    scrollGKHMeters = 1;
    $("#gkh_meters_list").empty();
    function sendAjax() {
        var obj = {
            rows: 30,
            page: scrollGKHMeters,
            auth_token: localStorage.gkh_token
        };
        if (localStorage.gkh_meters_datepicker) {
            obj.search = '"' + localStorage.gkh_meters_datepicker + '"';
            obj.searchOption = "period"
        }
        if (localStorage.gkh_meters_name) {
            obj.filter = JSON.stringify({
                "name": {
                    "value": localStorage.gkh_meters_name,
                    "filterType": "input"
                }
            });
        }
        if (localStorage.gkh_meters_service) {
            obj.filter = JSON.stringify({
                "service": {
                    "value": localStorage.gkh_meters_service,
                    "filterType": "input"
                }
            });
        }
        $.ajax({
            url: "https://dev.kloud.one:1337/M_0002/list",
            data: obj,
            success: function (data) {
                var meters = data.data;
                $("#preloader_page").hide();
                if (meters.length) {
                    for (var i = 0; i < meters.length; i++) {
                        var val1 = 0;
                        if (meters[i].val1) {
                            val1 = meters[i].val1;
                        }
                        var val2 = 0;
                        if (meters[i].val2) {
                            val2 = meters[i].val2;
                        }
                        var val3 = 0;
                        if (meters[i].val3) {
                            val3 = meters[i].val3;
                        }
                        var name = meters[i].name || "";
                        var service = meters[i].service || "";
                        var values = meters[i].values || 1;
                        var capacity = meters[i].capacity || 6;
                        var date = meters[i].date || "";
                        $("#gkh_meters_list").append('<li id="gkh_meter_' + meters[i].id + '" data-name="' + name + '" \
                        data-service="' + service + '" data-values="' + values + '" data-capacity="' + capacity + '" \
                        data-date="' + date + '" data-val1="' + val1 + '" data-val2="' + val2 + '" data-val3="' + val3 + '" class="collection-item valign-wrapper">\
                            <span class="list-name">' + name + '</span>\
                            <span class="list-name">' + service + '</span>\
                            <span class="list-name">' + val1 + '</span>\
                            <span class="list-name">' + val2 + '</span>\
                            <span class="list-name">' + val3 + '</span>\
                            <i class="material-icons list-icon right-align">chevron_right</i>\
                        </li>');
                        $('#gkh_meter_' + meters[i].id).unbind("taphold");
                        $('#gkh_meter_' + meters[i].id).unbind("click");

                        $('#gkh_meter_' + meters[i].id).on("click", function () {
                            if (holdedMode) {
                                $(this).toggleClass("active");
                            } else {
                                var id = ($(this).attr("id")).replace("gkh_meter_", "");
                                var name = $(this).attr("data-name");
                                ; var service = $(this).attr("data-service");
                                var values = $(this).attr("data-values");
                                var capacity = $(this).attr("data-capacity");
                                var date = $(this).attr("data-date");
                                var val1 = $(this).attr("data-val1");
                                var val2 = $(this).attr("data-val2");
                                var val3 = $(this).attr("data-val3");
                                showGKHMetersEditPage({
                                    id: id,
                                    name: name,
                                    service: service,
                                    values: values,
                                    capacity: capacity,
                                    date: date,
                                    val1: val1,
                                    val2: val2,
                                    val3: val3
                                });
                            }
                        });
                        $('#gkh_meter_' + meters[i].id).on("taphold", function () {
                            $(this).addClass("active");
                            holdedIcons();
                        });
                    }
                    if (meters.length == 30) {
                        $(window).unbind("scroll");
                        $(window).scroll(function () {
                            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                                scrollGKHMeters++;
                                $("#preloader_page").show();
                                sendAjax();
                            }
                        });
                    } else {
                        $(window).unbind("scroll");
                    }
                } else {
                    $(window).unbind("scroll");
                    $("#gkh_meters_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">У Вас нет лицевых счетов</span></li>');
                }
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#preloader_page").hide();
            }
        })
    }
    sendAjax();
}

function selectAllGKHMeters() {
    if (!allGKHMetersSelected) {
        $("#gkh_meters_list .collection-item").removeClass("active");
        $("#gkh_meters_list .collection-item").addClass("active");
        allGKHMetersSelected = true;
    } else {
        $("#gkh_meters_list .collection-item").removeClass("active");
        allGKHMetersSelected = false;
    }
}

function delGKHMeters() {
    if ($("#gkh_meters_list .collection-item.active").length) {
        $("#preloader_page").show();
        var selected_count = $("#gkh_meters_list .collection-item.active").length;
        var counter = 0;
        var errors = "";
        function next_iteration() {
            counter++;
            if (counter == selected_count) {
                $("#preloader_page").hide();
                if (errors) {
                    Materialize.toast(errors, 3000, 'rounded')
                }
                getGKHMeters();
            }
        }
        $("#gkh_meters_list .collection-item.active").each(function () {
            var id = ($(this).attr("id")).replace("gkh_meter_", "");
            $.ajax({
                url: "https://dev.kloud.one:1337/M_0002/destroy/" + id,
                data: {
                    auth_token: localStorage.gkh_token
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных счётчиков", 3000, 'rounded')
    }

}

function showGKHMetersMonth() {
    hideAllPages();
    $("#gkh_meters_month_page").show();
}

function clearGKHMetersMonth() {
    delete localStorage.gkh_meters_datepicker;
    $("#gkh_meters_month_input").val("");
    getGKHAccounts();
}

function showGKHMetersEditPage(meter) {
    hideAllPages();
    $("#gkh_meters_edit_page").show();
    $("#gkh_meters_edit_list").attr("data-id", meter.id);
    $("#gkh_meters_edit_name").val(meter.name);
    $("#gkh_meters_edit_service").val(meter.service);
    $("#gkh_meters_edit_values").val(meter.values);
    $("#gkh_meters_edit_capacity").val(meter.capacity);
    $("#gkh_meters_edit_date").val(meter.date);
    $("#gkh_meters_edit_val1").val(meter.val1);
    $("#gkh_meters_edit_val2").val(meter.val2);
    $("#gkh_meters_edit_val3").val(meter.val3);
}

function saveEditGKHMeters() {
    var id = $("#gkh_meters_edit_list").attr("data-id");
    var name = $("#gkh_meters_edit_name").val();
    var service = $("#gkh_meters_edit_service").val();
    var values = $("#gkh_meters_edit_values").val();
    var capacity = $("#gkh_meters_edit_capacity").val();
    var date = $("#gkh_meters_edit_date").val();
    var val1 = $("#gkh_meters_edit_val1").val();
    var val2 = $("#gkh_meters_edit_val2").val();
    var val3 = $("#gkh_meters_edit_val3").val();
    if (id) {
        var obj = {};
        if (name)
            obj.name = name;
        if (service)
            obj.service = service;
        if (values)
            obj.values = values;
        if (capacity)
            obj.capacity = capacity;
        if (date)
            obj.date = date;
        if (val1)
            obj.val1 = val1;
        if (val2)
            obj.val2 = val2;
        if (val3)
            obj.val3 = val3;
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:1337/M_0002/update/" + id,
            data: obj,
            success: function () {
                $("#preloader_page").hide();
                getGKHMeters();
            },
            error: function (err) {
                $("#preloader_page").hide();
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            }
        })
    } else {
        Materialize.toast("У счётчика не определён id", 3000, 'rounded');
    }
}

function showGKHJournal() {
    hideAllPages();
    $("#gkh_journal_page").show();
}

function getGKHJournal() {
    showGKHJournal();
    var date;
    if (localStorage.gkh_journal_datepicker) {
        date = new Date(localStorage.gkh_journal_datepicker);
    } else {
        date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate() + 1;
    if (day < 10) {
        day = "0" + day;
    }
    var limit;
    if (localStorage.gkh_journal_count) {
        limit = localStorage.gkh_journal_count;
    } else {
        limit = 10;
    }
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:1337/m_0001/calls/tableData/report",
        data: {
            page: 1,
            search: '{"gdate": "' + year + '.' + month + '.' + day + ' 00:00|' + year + '.' + month + '.' + day + ' 23:59"}',
            searchOption: "gdate",
            start: 0,
            limit: limit,
            auth_token: localStorage.gkh_token
        },
        success: function (data) {
            $("#preloader_page").hide();
            var calls = data.data;
            $("#gkh_journal_list").empty();
            if (calls.length) {
                for (var i = 0; i < calls.length; i++) {
                    $("#gkh_journal_list").append('<li id="pers_call_' + calls[i].session_id + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + calls[i].gdate + '</span>\
                        <span class="list-name">' + calls[i].type + '</span>\
                        <span class="list-name">' + calls[i].msisdn + '</span>\
                        <span class="list-name">' + calls[i].status + '</span>\
                        <audio class="rec list-audio" type="audio/wav" src="https://dev.kloud.one:1337/m_0001/calls/' + calls[i].record + '" controls="" autobuffer=""></audio>\
                    </li>');
                }
            } else {
                $("#gkh_journal_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">В этот день звонков не было</span></li>');
            }

        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function saveGKHJournalCount() {
    localStorage.gkh_journal_count = $('#gkh_journal_count').val();
    getGKHJournal();
}

function showGKHJournalDateRange() {
    hideAllPages();
    $("#gkh_journal_date_range_page").show();
}

function showGKHJournalCountInput() {
    hideAllPages();
    $("#gkh_journal_count_page").show();
}

function showGKHSettingsPage() {
    hideAllPages();
    $("#gkh_settings_page").show();
}

function showGKHProfilePage() {
    hideAllPages();
    $("#gkh_profile_page").show();
}

function getGKHProfile() {
    showGKHProfilePage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:1337/users/get_profile",
        data: {
            auth_token: localStorage.gkh_token
        },
        success: function (profile) {
            $("#preloader_page").hide();
            if (profile.email) {
                $("#gkh_profile_email").text(profile.email);
            }
            if (profile.login) {
                $("#gkh_profile_login").text(profile.login);
            }
            if (profile.unallocated_time) {
                var totalSeconds = parseInt(profile.unallocated_time);
                var hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds % 60;
                if (minutes.toString().length == 1) {
                    minutes = "0" + minutes;
                }
                if (seconds.toString().length == 1) {
                    seconds = "0" + seconds;
                }
                $("#gkh_profile_unallocated_time").text(hours + ":" + minutes + ":" + seconds);
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function showGKHPhonesSettingsPage() {
    hideAllPages();
    $("#gkh_phones_settings_page").show();
}

function getGKHPhonesSettings() {
    showGKHPhonesSettingsPage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:1337/users/get_profile",
        data: {
            auth_token: localStorage.pers_token
        },
        success: function (profile) {
            $("#preloader_page").hide();
            $("#gkh_phones_list").empty();
            if (profile.phones && profile.phones.length) {
                for (var i = 0; i < profile.phones.length; i++) {
                    var time = "0:00:00";
                    var availableTime = 0;
                    var unallocated_time = 0;
                    var phone = profile.phones[i].phone;
                    var answers = profile.phones[i].answers;
                    var calls = profile.phones[i].calls;
                    var answers_text = "";
                    var calls_text = "";
                    if (answers) {
                        answers_text = "Автообзвон"
                    }
                    if (calls) {
                        calls_text = "Приём показаний"
                    }
                    if (profile.phones[i].availableTime) {
                        availableTime = profile.phones[i].availableTime;
                        var totalSeconds = parseInt(profile.phones[i].availableTime);
                        var hours = Math.floor(totalSeconds / 3600);
                        totalSeconds %= 3600;
                        var minutes = Math.floor(totalSeconds / 60);
                        var seconds = totalSeconds % 60;
                        if (minutes.toString().length == 1) {
                            minutes = "0" + minutes;
                        }
                        if (seconds.toString().length == 1) {
                            seconds = "0" + seconds;
                        }
                        time = hours + ":" + minutes + ":" + seconds;
                    }
                    if (profile.unallocated_time)
                        unallocated_time = profile.unallocated_time;

                    $("#gkh_phones_list").append('<li id="gkh_phone_' + profile.phones[i].id + '" class="collection-item valign-wrapper">\
                        <span class="list-name">' + phone + '</span>\
                        <span class="list-name" data-availableTime="' + availableTime + '">' + time + '</span>\
                        <span class="list-name">' + answers_text + '</span>\
                        <span class="list-name">' + calls_text + '</span>\
                        <i class="material-icons list-icon right-align">chevron_right</i>\
                    </li>');
                    $('#gkh_phone_' + profile.phones[i].id).unbind("taphold");
                    $('#gkh_phone_' + profile.phones[i].id).unbind("click");

                    $('#gkh_phone_' + profile.phones[i].id).on("click", function () {
                        if (holdedMode) {
                            $(this).toggleClass("active");
                        } else {
                            var id = ($(this).attr("id")).replace("gkh_phone_", "");
                            var time = $(this).children("span:nth-child(2)").attr("data-availableTime");
                            showGKHPhonesEditPage({
                                id: id,
                                phone: phone,
                                unallocated_time: unallocated_time,
                                answers: answers,
                                calls: calls
                            });
                        }
                    });
                    $('#gkh_phone_' + profile.phones[i].id).on("taphold", function () {
                        $(this).addClass("active");
                        holdedIcons();
                    });
                }
            } else {
                $("#gkh_phones_list").append('<li class="collection-item valign-wrapper"><span class="menu-list-name">У Вас нет телефонов</span></li>')
            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function addGKHServicePhone() {
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:1337/users/add_phone",
        data: {
            auth_token: localStorage.gkh_token
        },
        success: function () {
            $("#preloader_page").hide();
            getGKHPhonesSettings();
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function showGKHPhonesEditPage(data) {
    hideAllPages();
    $("#gkh_phones_edit_page").show();
    $("#gkh_phone_edit_phone").text(data.phone);
    if (data.calls) {
        $("#gkh_phone_autocalls_toggle").attr("checked", "checked");
    } else {
        $("#gkh_phone_autocalls_toggle").removeAttr("checked");
    }
    if (data.answers) {
        $("#gkh_phone_accept_data_toggle").attr("checked", "checked");
    } else {
        $("#gkh_phone_accept_data_toggle").removeAttr("checked");
    }

    $("#gkh_add_time_input").attr("max", data.unallocated_time);
    $("#gkh_add_time_input").val(0);
    $("#gkh_phone_menu_list").attr("data-id", data.id);
}

function selectAllGKHPhones() {
    if (!allGKHPhonesSelected) {
        $("#gkh_phones_list .collection-item").removeClass("active");
        $("#gkh_phones_list .collection-item").addClass("active");
        allGKHPhonesSelected = true;
    } else {
        $("#gkh_phones_list .collection-item").removeClass("active");
        allGKHPhonesSelected = false;
    }
}

function delGKHPhones() {
    if ($("#gkh_phones_list .collection-item.active").length) {
        $("#preloader_page").show();
        var selected_count = $("#gkh_phones_list .collection-item.active").length;
        var counter = 0;
        var errors = "";
        function next_iteration() {
            counter++;
            if (counter == selected_count) {
                $("#preloader_page").hide();
                if (errors) {
                    Materialize.toast(errors, 3000, 'rounded')
                }
                getGKHPhonesSettings();
            }
        }
        $("#gkh_phones_list .collection-item.active").each(function () {
            var id = ($(this).attr("id")).replace("gkh_phone_", "");
            var phone = $(this).children("span:first-child").text();
            $.ajax({
                url: "https://dev.kloud.one:1337/users/remove_phone",
                data: {
                    phone_id: id,
                    phone: phone,
                    auth_token: localStorage.gkh_token
                },
                success: function () {
                    next_iteration();
                },
                error: function (err) {
                    errors += JSON.stringify(err) + "\n";
                    next_iteration();
                }
            })
        })
    } else {
        Materialize.toast("Нет выбранных номеров", 3000, 'rounded')
    }
}

function toggleGKHPhoneAutocalls() {
    var id = $("#gkh_phone_menu_list").attr("data-id");
    if (!($("#gkh_phone_autocalls_toggle").is(":checked"))) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:1337/m_0001/tasks_off",
            data: {
                gateway_id: id,
                auth_token: localStorage.gkh_token
            },
            success: function () {
                $.ajax({
                    url: "https://dev.kloud.one:1337/phones/update_type",
                    data: {
                        phone_id: id,
                        calls: false,
                        auth_token: localStorage.gkh_token
                    },
                    success: function () {
                        $("#preloader_page").hide();
                        Materialize.toast("Сервис деактивирован", 3000, 'rounded');
                    },
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                        $("#gkh_phone_autocalls_toggle").attr("checked", "checked");
                        $("#preloader_page").hide();
                    }
                })
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#pers_phone_service_toggle").attr("checked", "checked");
                $("#preloader_page").hide();
            }
        })
    } else {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:1337/m_0001/tasks",
            data: {
                gateway_id: id,
                auth_token: localStorage.gkh_token
            },
            success: function () {
                $.ajax({
                    url: "https://dev.kloud.one:4000/phones/update_type",
                    data: {
                        phone_id: id,
                        calls: true,
                        token: localStorage.gkh_token
                    },
                    success: function () {
                        $("#preloader_page").hide();
                        Materialize.toast("Сервис активирован", 3000, 'rounded');
                    },
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                        $("#pers_phone_service_toggle").attr("checked", "checked");
                        $("#preloader_page").hide();
                    }
                })
            },
            error: function (err) {
                Materialize.toast("Необходимо заполнить настройки автообзвона!", 3000, 'rounded');
                $("#pers_phone_service_toggle").removeAttr("checked");
                $("#preloader_page").hide();
            }
        })
    }
}

function toggleGKHPhoneAcceptData() {
    var id = $("#gkh_phone_menu_list").attr("data-id");
    if (!($("#gkh_phone_accept_data_toggle").is(":checked"))) {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:1337/m_0001/getter_off",
            data: {
                gateway_id: id,
                auth_token: localStorage.gkh_token
            },
            success: function () {
                $.ajax({
                    url: "https://dev.kloud.one:1337/phones/update_type",
                    data: {
                        phone_id: id,
                        answers: false,
                        auth_token: localStorage.gkh_token
                    },
                    success: function () {
                        $("#preloader_page").hide();
                        Materialize.toast("Сервис деактивирован", 3000, 'rounded');
                    },
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                        $("#gkh_phone_accept_data_toggle").attr("checked", "checked");
                        $("#preloader_page").hide();
                    }
                })
            },
            error: function (err) {
                Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                $("#gkh_phone_accept_data_toggle").attr("checked", "checked");
                $("#preloader_page").hide();
            }
        })
    } else {
        $("#preloader_page").show();
        $.ajax({
            url: "https://dev.kloud.one:1337/m_0001/getter",
            data: {
                gateway_id: id,
                auth_token: localStorage.gkh_token
            },
            success: function () {
                $.ajax({
                    url: "https://dev.kloud.one:4000/phones/update_type",
                    data: {
                        phone_id: id,
                        answers: true,
                        token: localStorage.gkh_token
                    },
                    success: function () {
                        $("#preloader_page").hide();
                        Materialize.toast("Сервис активирован", 3000, 'rounded');
                    },
                    error: function (err) {
                        Materialize.toast(JSON.stringify(err), 3000, 'rounded');
                        $("#gkh_phone_accept_data_toggle").attr("checked", "checked");
                        $("#preloader_page").hide();
                    }
                })
            },
            error: function (err) {
                Materialize.toast("Необходимо заполнить настройки автообзвона!", 3000, 'rounded');
                $("#gkh_phone_accept_data_toggle").removeAttr("checked");
                $("#preloader_page").hide();
            }
        })
    }
}

function showGKHAutocallsSettingsPage() {
    hideAllPages();
    $("#gkh_autocall_settings_page").show();

}

function getGKHAutocallsSettings() {
    showGKHAutocallsSettingsPage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:1337/users/get_profile",
        data: {
            auth_token: localStorage.gkh_token
        },
        success: function (profile) {
            $("#preloader_page").hide();
            $("#gkh_autocall_settings_menu").attr("data-id", profile.id);
            $('#gkh_autocall_settings_start_time').val(profile.calltime);
            $('#gkh_autocall_settings_retry_calls').val(profile.retrycalls);
            $('#gkh_autocall_settings_reject_calls').val(profile.rejecttime);
            $('#gkh_autocall_settings_text').val(profile.tasks_text);
            $('#gkh_autocall_settings_voice').val(profile.voice);
            $('#gkh_autocall_settings_time_style').val(profile.styleTime);
            $('#gkh_autocall_settings_start_date').val(profile.startDate);
            $('#gkh_autocall_settings_week_days').val(profile.weekdays);
            var styleTime = profile.styleTime;
            switch (styleTime) {
                case "0":
                    $('#gkh_autocall_settings_start_date_li').show();
                    $('#gkh_autocall_settings_week_days_li').hide();
                    break;
                case "1":
                    $('#gkh_autocall_settings_start_date_li').hide();
                    $('#gkh_autocall_settings_week_days_li').hide();
                    break;
                case "2":
                    $('#gkh_autocall_settings_start_date_li').hide();
                    $('#gkh_autocall_settings_week_days_li').show();
                    break;

            }
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function toggleGHKAutocallsStyleTime() {
    switch ($(this).val()) {
        case "0":
            $('#gkh_autocall_settings_start_date_li').show();
            $('#gkh_autocall_settings_week_days_li').hide();
            break;
        case "1":
            $('#gkh_autocall_settings_start_date_li').hide();
            $('#gkh_autocall_settings_week_days_li').hide();
            break;
        case "2":
            $('#gkh_autocall_settings_start_date_li').hide();
            $('#gkh_autocall_settings_week_days_li').show();
            break;
    }
}

function saveGKHAutocallSettings() {
    var obj = {};
    if ($('#gkh_autocall_settings_start_time').val()) {
        obj.calltime = $('#gkh_autocall_settings_start_time').val();
    } else {
        Materialize.toast('Поле "Время начала" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#gkh_autocall_settings_retry_calls').val()) {
        obj.retrycalls = $('#gkh_autocall_settings_retry_calls').val();
    } else {
        Materialize.toast('Поле "Повторных звонков" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#gkh_autocall_settings_reject_calls').val()) {
        obj.rejecttime = $('#gkh_autocall_settings_reject_calls').val();
    } else {
        Materialize.toast('Поле "Прекратить обзвон" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#gkh_autocall_settings_text').val()) {
        obj.tasks_text = $('#gkh_autocall_settings_text').val();
    } else {
        Materialize.toast('Поле "Текст" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    obj.voice = $('#gkh_autocall_settings_voice').val();
    obj.styleTime = $('#gkh_autocall_settings_time_style').val();
    switch (obj.styleTime) {
        case "0":
            if ($('#gkh_autocall_settings_start_date').val()) {
                obj.startDate = $('#gkh_autocall_settings_start_date').val();
            } else {
                Materialize.toast('Поле "Выберите день" должно быть заполнено!', 3000, 'rounded');
                return;
            }
            break;
        case "1":
            break;
        case "2":
            if ($('#gkh_autocall_settings_week_days').val()) {
                obj.weekdays = $('#gkh_autocall_settings_week_days').val();
            } else {
                Materialize.toast('Поле "Дни недели" должно быть заполнено!', 3000, 'rounded');
                return;
            }
            break;
    }
    obj.auth_token = localStorage.gkh_token;
    $.ajax({
        url: "https://dev.kloud.one:1337/users/change_profile",
        data: obj,
        success: function (data) {
            Materialize.toast("Настройки успешно сохранены!", 3000, 'rounded');
            showGKHSettingsPage();
        },
        error: function (err) {
            var msg = err.responseJSON.msg || "Произошла ошибка сохранения настроек"
            Materialize.toast(msg, 3000, 'rounded');
            showGKHSettingsPage();
        }
    })
}

function showGKHAcceptDataSettingsPage() {
    hideAllPages();
    $("#gkh_accept_data_settings_page").show();
}

function getGKHAcceptDataSettings() {
    showGKHAcceptDataSettingsPage();
    $("#preloader_page").show();
    $.ajax({
        url: "https://dev.kloud.one:1337/users/get_profile",
        data: {
            auth_token: localStorage.gkh_token
        },
        success: function (profile) {
            $("#preloader_page").hide();
            $("#gkh_accept_data_settings_menu").attr("data-id", profile.id);
            $('#gkh_accept_data_settings_hello_text').val(profile.hello_text);
            $('#gkh_accept_data_settings_ls_message').val(profile.ls_message);
            $('#gkh_accept_data_settings_meter_message').val(profile.meter_message);
            $('#gkh_accept_data_settings_good_buy_text').val(profile.good_buy_text);
            $('#gkh_accept_data_settings_voice').val(profile.voice);
        },
        error: function (err) {
            Materialize.toast(JSON.stringify(err), 3000, 'rounded');
            $("#preloader_page").hide();
        }
    })
}

function saveGKHAcceptDataSettings() {
    var obj = {};
    if ($('#gkh_accept_data_settings_hello_text').val()) {
        obj.hello_text = $('#gkh_accept_data_settings_hello_text').val();
    } else {
        Materialize.toast('Поле "Приветствие" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#gkh_accept_data_settings_ls_message').val()) {
        obj.ls_message = $('#gkh_accept_data_settings_ls_message').val();
    } else {
        Materialize.toast('Поле "Ввод лицевого счёта" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#gkh_accept_data_settings_meter_message').val()) {
        obj.meter_message = $('#gkh_accept_data_settings_meter_message').val();
    } else {
        Materialize.toast('Поле "Ввод показаний" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    if ($('#gkh_accept_data_settings_good_buy_text').val()) {
        obj.good_buy_text = $('#gkh_accept_data_settings_good_buy_text').val();
    } else {
        Materialize.toast('Поле "Прощание" должно быть заполнено!', 3000, 'rounded');
        return;
    }
    obj.voice = $('#gkh_accept_data_settings_voice').val();
    obj.auth_token = localStorage.gkh_token;
    $.ajax({
        url: "https://dev.kloud.one:1337/users/change_profile",
        data: obj,
        success: function (data) {
            Materialize.toast("Настройки успешно сохранены!", 3000, 'rounded');
            showGKHSettingsPage();
        },
        error: function (err) {
            var msg = err.responseJSON.msg || "Произошла ошибка сохранения настроек"
            Materialize.toast(msg, 3000, 'rounded');
            showGKHSettingsPage();
        }
    });
}

function previewFile() {
    var file = document.querySelector('#photo_select').files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {
        html2canvas(e)
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}
function previewEditFile() {
    var file = document.querySelector('#edit_photo_select').files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {
        html2canvasEdit(e)
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}
function html2canvas(e) {

    var image = new Image();
    var type = e.target.result.substr(e.target.result.indexOf(":") + 1, e.target.result.indexOf(";") - e.target.result.indexOf(":") - 1);
    image.src = e.target.result;
    image.onload = function () {

        var canvas = document.createElement('canvas')
            , max_size = 225
            , width = image.width
            , height = image.height;
        if (width > height) {
            if (width > max_size) {
                height *= max_size / width;
                width = max_size;
            }
        } else {
            if (height > max_size) {
                width *= max_size / height;
                height = max_size;
            }
        }
        canvas.width = width;
        canvas.height = height;

        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        $(".sp-add-cont-avatar").attr("src", canvas.toDataURL(type));
    }
}; 
function html2canvasEdit(e) {

    var image = new Image();
    var type = e.target.result.substr(e.target.result.indexOf(":") + 1, e.target.result.indexOf(";") - e.target.result.indexOf(":") - 1);
    image.src = e.target.result;
    image.onload = function () {

        var canvas = document.createElement('canvas')
            , max_size = 225
            , width = image.width
            , height = image.height;
        if (width > height) {
            if (width > max_size) {
                height *= max_size / width;
                width = max_size;
            }
        } else {
            if (height > max_size) {
                width *= max_size / height;
                height = max_size;
            }
        }
        canvas.width = width;
        canvas.height = height;

        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        $(".sp-edit-cont-avatar").attr("src", canvas.toDataURL(type));
    }
}; 
window.onload = init();







// Рабочий пример захвата микрофона и его воспроизведение
/*
var playAudioData = new Float32Array(0);
var sampleRate = 8000;

var audioContext, context, audioInput, filter, recorder, recording;
var navigator = window.navigator;
navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

var micBufferSize = 1024 * 2;//~ 20ms

function converFloat32ToPcmu(buffer) {
    var l = buffer.length;
    var buf = [];//new Int8Array(l);
    while (l--) {
        buf[l] = g711.linear2ulaw(buffer[l] * 0xFFFF); //convert to pcmu
    }
    return buf;//.buffer
}

function converPcmuToFloat32(buffer) {
    //var bufferView = new DataView(arrayBuffer);
    var l = buffer.length;
    var floatBuffer = new Float32Array(l);

    //pcmu => Float
    for (var i = 0; i < l; i++)
        floatBuffer[i] = (g711.ulaw2linear(buffer[i])) / 0x7FFF;
    return floatBuffer;
}

function Float32Concat(first, second) {
    var firstLength = first.length,
        result = new Float32Array(firstLength + second.length);
    result.set(first);
    result.set(second, firstLength);
    return result;
}

function playBuffer(obj) {
    playAudioData = Float32Concat(playAudioData, obj);

    var audioBuffer = context.createBuffer(1, playAudioData.length, sampleRate);
    audioBuffer.getChannelData(0).set(obj);
    var source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
};




if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: true
    }, success, function (e) {
        alert('Error capturing audio.');
    });
} else {
    alert('getUserMedia not supported in this browser.');
}



function success(e) {
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();
    recording = false;
    filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = sampleRate;
    audioInput = context.createMediaStreamSource(e);
    recorder = context.createScriptProcessor(micBufferSize, 1, 1);

    var resamplerObj = new Resampler(context.sampleRate, sampleRate, 1, micBufferSize, false);
    recorder.onaudioprocess = function (audioEvents) {
        var micBuffer;
        var left = audioEvents.inputBuffer.getChannelData(0);
        micBuffer = resamplerObj.resampler(left);

        micBuffer = converFloat32ToPcmu(micBuffer);
        micBuffer = converPcmuToFloat32(micBuffer)

        console.log(micBuffer);

        playBuffer(micBuffer);
    }

    audioInput.connect(filter);
    filter.connect(recorder);
    recorder.connect(context.destination);
}
*/