$(document).ready(function () {
    getIP();
});

function getIP() {
    $("#result").html("");
    var result;
    var serviceUrl = "http://www.travelingtechguy.com/php/myip.php?type=jsonp&callback=?";
    $.mobile.pageLoading();
    $.ajax({
        url: serviceUrl,
        dataType: 'jsonp',
        success: function(data) {
            $.mobile.pageLoading(true);
            if(data) {
                displayResult(data);
                //saveResult(data);
				//dumpData(data);
            }
            else {
                displayError("Could not get IP address");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $.mobile.pageLoading(true);
            displayError(errorThrown);
        }	
    });
}

function displayError(error) {
    $("#result").html("<strong>Error occurred: " + error + "</strong>");
}

function saveResult(result) {
	var key = localStorage.length;
	result.Date = new Date();
	localStorage[key] = result;
}

function displayResult(data) {
    var items = [];
    if(data.Status == 'OK') {
        items.push('<li>External IP:<p class="ui-li-aside">' + data.Ip + '</p></li>');
        if(data.City)
        	items.push('<li>City:<p class="ui-li-aside">' + data.City + '</p></li>');
        if(data.RegionName)
        	items.push('<li>Region:<p class="ui-li-aside">' + data.RegionName + '</p></li>');
        if(data.CountryName)
        	items.push('<li>Country:<p class="ui-li-aside">' + data.CountryName + '</p></li>');
        if(data.ZipPostalCode)
        	items.push('<li>Zip:<p class="ui-li-aside">' + data.ZipPostalCode + '</p></li>');
        if(data.Gmtoffset) {
            var offset = parseInt(data.Gmtoffset) / 3600;
            if(data.Isdst == '1')
            offset += (offset > 0) ? 1 : -1;
            items.push('<li>GMT Offset:<p class="ui-li-aside">' + offset + '</p></li>');
        }
        if(data.Latitude && data.Longitude) {
			var coor = data.Latitude + ',' + data.Longitude;
			var gmapUrl = 'http://maps.google.com/maps?q=' + coor;
        	items.push('<li><a target="_blank" href="' + gmapUrl + 
				'">Coordinates (Lat, Long):<p class="ui-li-aside">(' + coor + ')</p></a></li>'
			);
		}
        
        //$("#result").html('<ul id="myList">' + items.join('') + '</ul>');
		$("ul").html(items.join(''));
		$("ul").listview('refresh');
    }
}

function dumpData(data) {
    var items = [];
    
    $.each(data, function(key, val) {
        items.push('<li><strong>' + key + '</strong>:&nbsp;' + val + '</li>');
    });
    
    $("#result").html($('<ul/>', {
        'class': 'my-new-list',
        html: items.join('')
    }));
}