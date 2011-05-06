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
				data.Date = new Date();
				resultFromServer = displayResult(data);
                $("#result").html(resultFromServer);
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
    $("#result").attr('color', 'red').html("<strong>" + error + "</strong>");
}

function displayResult(data) {
    var items = [];
    if(data.Status == 'OK') {
		items.push('<h3>' + formatItem('Date', data.Date) + '</h3>');
		items.push('<p>');
        items.push(formatItem('External IP', data.Ip));
        if(data.City)
        	items.push(formatItem('City', data.City));
        if(data.RegionName)
        	items.push(formatItem('Region', data.RegionName));
        if(data.CountryName)
        	items.push(formatItem('Country', data.CountryName));
        if(data.ZipPostalCode)
        	items.push(formatItem('Zip', data.ZipPostalCode));
        if(data.Gmtoffset) {
            var offset = parseInt(data.Gmtoffset) / 3600;
            offset = (data.Isdst == '1') ? (offset + ((offset > 0) ? 1 : -1)) + " (DST)" : offset;
            items.push(formatItem('GMT Offset', offset));
        }
        if(data.Latitude && data.Longitude) {
			var coor = data.Latitude + ',' + data.Longitude;
			var gmapUrl = 'http://maps.google.com/maps?q=' + coor;
        	items.push(formatItem('Coordinates (Lat, Long)', '<a target="_blank" href="' + gmapUrl + '">(' + coor + ')</a>'));
		}
		items.push('</p>');
        return items.join('<br />');
    }
	else {
		return null;
	}
}

function formatItem(name, value) {
	result = "<strong>" + name + ":</strong>&nbsp;" + value;
	return result;
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