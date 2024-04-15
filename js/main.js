
$(document).ready( function() {
    init()
});

var accountArray = [];
var advertContainer = {};
var currentAccountName;

function init(){
    //Initialize buttons:
    $("#administratorViewButton").on("click", function(){
        $("#adminPanel").show();
        $("#customerPanel").hide();
    });
    $("#customerViewButton").on("click", function(){
        $("#adminPanel").hide();
        $("#customerPanel").show();
    });
    $("#addAccountButton").on("click", function(){
        createTemplateElement("account");
    });
    $("#createAdvertisementButton").on("click", function(){
        createTemplateElement("advertisement");
    });
    $("#accountNameInput").on('keypress',function(e) {
        if(e.which == 13) {
            createTemplateElement("account");
        }
    });
};

function createTemplateElement(type){
    if ("content" in document.createElement("template")) {
        var template, target, props;
        if(type === "account"){
            var accountName = $("#accountNameInput").val();
            //don't make dupe accounts
            for(var i = 0; i < accountArray.length; i++){
                if(accountArray[i] === accountName){
                    return;
                }
            }
            template = $('script[data-template="accountAccordian"]').text().split(/\$\{(.+?)\}/g);;
            target = $("#accountList");
            var listLength = target.length;
            //We're replacing these properties in our template
            props = {
                accountName: accountName,
                n: listLength
            };
            accountArray.push(accountName);
        }
        else if(type === "advertisement"){
            
            template = $('script[data-template="advertAccordian"]').text().split(/\$\{(.+?)\}/g);;
            target = $("#"+currentAccountName+"AdvertisementAccordian");
            var listLength = target.length;
            var keygen = token();
            props = {
                avertName:$("#advertisementNameInput").val(),
                advertText:$("#advertisementTextInput").val(),
                textColor:$("#advertTextColorPicker").val(),
                textSize:$("#textSizeSelect").val(),
                backgroundColor:$("#advertBackgroundColorPicker").val(),
                lookup: keygen,
                active: $("#activeToggle").val().toString(),
                n: advertContainer.length
            };
            advertContainer.currentAccountName = props;
            $("#advertisementModal").modal('hide');
        }
        var templateHTML = template.map(render(props)).join('');
        target.append(templateHTML);
      }
      else {
        // TODO: Support older browsers
      }
      attachButtonEvents(type, props);
};

function attachButtonEvents(type, props){
    if(type === "account"){
        const oldName = props.accountName;
        $("#" + oldName + "EditButton").on("click", function(){
            const newName = $("#" + oldName + "EditInput").val();
            editAccountName(oldName, newName, props.n-1);
        });
        $("#"+oldName+"EditInput").on('keypress',function(e) {
            if(e.which == 13) {
                const newName = $("#" + oldName + "EditInput").val();
                editAccountName(oldName, newName, props.n-1);
            }
        });
        $("#"+oldName+"AddAdvertisement").on("click", function(){
            currentAccountName = oldName;
        });
    }
    else if(type === "advertisement"){

    }
};

function editAccountName(oldName, newName, i){

    //don't make dupe accounts
    for(var i = 0; i < accountArray.length; i++){
        if(accountArray[i] === newName){
            //Add an error modal
            return;
        }
    }
    accountArray[i] = newName;
    $("#"+oldName+"-advertisements").prop("id", newName + "-advertisements");
    $("#"+oldName+"EditInput").prop("id", newName + "EditInput");
    $("#"+oldName+"EditButton").prop("id", newName + "EditButton");
    $("button:contains('"+oldName+"')").html(newName);
}

function render(props) {
    return function(subObj, i) { 
        //Every other line of our template is one of our escaped out variables.
        return (i % 2) ? props[subObj] : subObj; 
    };
  };

function roll(){
    return Math.random.toString(36).substring(2);
}

function token(){
    return (roll() + roll());
};