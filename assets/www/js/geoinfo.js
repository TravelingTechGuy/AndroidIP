$(document).ready(function() {
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

function displayResult(data) {
    var items = [];
    if(data.Status == 'OK') {
        items.push('<li><strong>External IP</strong>:&nbsp;' + data.Ip + '</li>');
        if(data.City)
        items.push('<li><strong>City</strong>:&nbsp;' + data.City + '</li>');
        if(data.RegionName)
        items.push('<li><strong>Region</strong>:&nbsp;' + data.RegionName + '</li>');
        if(data.CountryName)
        items.push('<li><strong>Country</strong>:&nbsp;' + data.CountryName + '</li>');
        if(data.ZipPostalCode)
        items.push('<li><strong>Zip</strong>:&nbsp;' + data.ZipPostalCode + '</li>');
        if(data.Gmtoffset) {
            var offset = parseInt(data.Gmtoffset) / 3600;
            if(data.Isdst == '1')
            offset += (offset > 0) ? 1 : -1;
            items.push('<li><strong>GMT Offset</strong>:&nbsp;' + offset + '</li>');
        }
        if(data.Latitude && data.Longitude)
        items.push('<li><strong>Coordinates (Lat,Long)</strong>:&nbsp;(' + data.Latitude + ',' + data.Longitude + ')</li>');
        
        $("#result").html($('<ul/>', {
            'class': 'my-new-list',
            html: items.join('')
        }));
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