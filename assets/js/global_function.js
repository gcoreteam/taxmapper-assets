function getCategory(){
    var _url = '../server/selected.php?act=get_Category';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '<option value="Choose Category">Choose Category</option>';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<option name="'+obj[i].name+'" value="'+obj[i].id+'">'+obj[i].name+'</option>';
            }
            $('#id_category').html(options);
        }
    });
}
function getSupplier(){
    var _url = '../server/selected.php?act=get_Supplier';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_supplier" id="id_supplier_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_supplier" id="count_supplier" value="'+i+'"/>';
            $('#id_supplier').html(options);
        }
    });
}


// teknisi
function getTeknisi(){
    var _url = '../server/selected.php?act=get_Teknisi';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_teknisi" id="id_teknisi_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_teknisi" id="count_teknisi" value="'+i+'"/>';
            $('#id_teknisi').html(options);
        }
    });
}

// alat ukur
function getAlatUkur(){
    var _url = '../server/selected.php?act=get_AlatUkur';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_alat_ukur" id="id_alat_ukur_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_alat_ukur" id="count_alat_ukur" value="'+i+'"/>';
            $('#id_alat_ukur').html(options);
        }
    });
}

// toolset
function getToolSet(){
    var _url = '../server/selected.php?act=get_ToolSet';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_toolset" id="id_toolset_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_toolset" id="count_toolset" value="'+i+'"/>';
            $('#id_toolset').html(options);
        }
    });
}

// kondisi fisik
function getKondisiFisik(){
    var _url = '../server/selected.php?act=get_KondisiFisik';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_pemeriksaan_kondisi_fisik" id="id_pemeriksaan_kondisi_fisik_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_pemeriksaan_kondisi_fisik" id="count_pemeriksaan_kondisi_fisik" value="'+i+'"/>';
            $('#id_pemeriksaan_kondisi_fisik').html(options);
        }
    });
}

// pengukuran keselamatan fisik
function getPengukuranKeselamatan(){
    var _url = '../server/selected.php?act=get_PengukuranKeselamatan';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_pemeriksaan_keselamatan" id="id_pemeriksaan_keselamatan_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_pemeriksaan_keselamatan" id="count_pemeriksaan_keselamatan" value="'+i+'"/>';
            $('#id_pemeriksaan_keselamatan').html(options);
        }
    });
}

function getPengukuranKinerja(){
    var _url = '../server/selected.php?act=get_PengukuranKinerja';
    $.ajax({
        url : _url,
        assync : false,
        success: function(data){
            var options = '';
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                options +=  '<label class="mt-checkbox mt-checkbox-outline" >'+
                                ''+obj[i].name+''+
                                '<input type="checkbox" value="'+obj[i].xid+'" name="id_pengukuran_kinerja" id="id_pengukuran_kinerja_'+i+'">'+
                                '<span></span>'+
                            '</label>';
                // console.log(data[i]);
            }
            options+='<input type="text" name="count_pengukuran_kinerja" id="count_pengukuran_kinerja" value="'+i+'"/>';
            $('#id_pengukuran_kinerja').html(options);
        }
    });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
        

function currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function lastDate() {
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var today = new Date();
    var yyyy = today.getFullYear();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var lastDay = new Date(y, m + 1, 0).getDate() + '/' + mm + '/' + yyyy;
    return lastDay;
}