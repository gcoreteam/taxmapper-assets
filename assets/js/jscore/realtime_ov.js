//STRUK
var  table = $('#rtStrukTable').dataTable();
function realtimeStruk() {
   var lastDateTrans = $('#lastDateTrans').val();
   var lastState = $('#lastState').val();
   if(lastDateTrans == lastState){
        // console.log('lastState');
        // return false;
   }
   $.ajax({
        url: "../server/svr_dashboard_ov.php?struk",
        method: 'post',
        data: {
            act: 'struk',
            lastDateTrans:lastDateTrans,
            lastState:lastState
        },
        success: function(result) {
         if(lastDateTrans == "first"){
            animationNumber('tot_tax_today_anim', result.tot_tax_today, 0.5);
            animationNumber('tot_trans_terjadi_anim', result.tot_trans_terjadi, 0.5);
            animationNumber('tax_cur', result.tax_cur, 0.8);
            animationNumber('jum_tax_resto',result.jum_tax_resto,0.8);
            animationNumber('jum_tax_hiburan',result.jum_tax_hiburan,0.8);
            animationNumber('jum_tax_hotel',result.jum_tax_hotel,0.8);
            animationNumber('jum_tax_parkir',result.jum_tax_parkir,0.8);
            $('#tot_tax_today').val(result.tot_tax_today);
            $('#tot_trans_terjadi').val(result.tot_trans_terjadi);
            $('#val_tax_cur').val(result.tax_cur);
            $('#val_jum_tax_resto').val(result.jum_tax_resto);
            $('#val_jum_tax_hiburan').val(result.jum_tax_hiburan);
            $('#val_jum_tax_hotel').val(result.jum_tax_hotel);
            $('#val_jum_tax_parkir').val(result.jum_tax_parkir);

            //LastMonth
            $('#monthBefore').text(result.monthBefore);
            animationNumber('tax_lm_total',result.tax_total_month,0.8);
            animationNumber('tax_lm_resto',result.tax_resto_month,0.8);
            animationNumber('tax_lm_parkir',result.tax_parkir_month,0.8);
            animationNumber('tax_lm_hotel',result.tax_hotel_month,0.8);
            animationNumber('tax_lm_hiburan',result.tax_hiburan_month,0.8);
            //Persentase
            var ptax_total_lm = parseFloat(parseFloat(result.tax_cur)/parseFloat(result.tax_total_month))*100;
            var ptax_resto_lm = parseFloat(parseFloat(result.jum_tax_resto)/parseFloat(result.tax_resto_month))*100;
            var ptax_parkir_lm = parseFloat(parseFloat(result.jum_tax_parkir)/parseFloat(result.tax_parkir_month))*100;
            var ptax_hotel_lm = parseFloat(parseFloat(result.jum_tax_hotel)/parseFloat(result.tax_hotel_month))*100;
            var ptax_hiburan_lm = parseFloat(parseFloat(result.jum_tax_hiburan)/parseFloat(result.tax_hiburan_month))*100;
            animationNumber('ptax_total_anim',ptax_total_lm,0.2);
            animationNumber('ptax_resto_anim',ptax_resto_lm,0.2);
            animationNumber('ptax_parkir_anim',ptax_parkir_lm,0.2);
            animationNumber('ptax_hotel_anim',ptax_hotel_lm,0.2);
            animationNumber('ptax_hiburan_anim',ptax_hiburan_lm,0.2);
            
            // fillProgressBar(progressBarId, duration, targetPercentage)
            fillProgressBar('persentase_total',14,ptax_total_lm);
            fillProgressBar('persentase_resto',14,ptax_resto_lm);
            fillProgressBar('persentase_parkir',14,ptax_parkir_lm);
            fillProgressBar('persentase_hotel',14,ptax_hotel_lm);
            fillProgressBar('persentase_hiburan',14,ptax_hiburan_lm);

            console.log('tax_cur '+result.tax_cur);
            console.log('jum_tax_resto '+result.jum_tax_resto);
            console.log('jum_tax_parkir '+result.jum_tax_parkir);
            console.log('jum_tax_hotel '+result.jum_tax_hotel);
            console.log('jum_tax_hiburan '+result.jum_tax_hiburan);

            console.log('tax_total_month '+result.tax_total_month);
            console.log('tax_resto_month '+result.tax_resto_month);
            console.log('tax_parkir_month '+result.tax_parkir_month);
            console.log('tax_hotel_month '+result.tax_hotel_month);
            console.log('tax_hiburan_month '+result.tax_hiburan_month);

            console.log('persentase_total '+ptax_total_lm);
            console.log('persentase_resto '+ptax_resto_lm);
            console.log('persentase_parkir '+ptax_parkir_lm);
            console.log('persentase_hotel '+ptax_hotel_lm);
            console.log('persentase_hiburan '+ptax_hiburan_lm);

            console.log('res1 '+result.tax_total_month); 
            var table = $('#rtStrukTable').DataTable({
                language: {
                        "emptyTable": "Memproses Data"
                },
                 data: result.data, 
                 searching: false,
                 paging: false, 
                 pageLength: 10, 
                 info: false,
                 columns: [
                     {
                        data: 'nama_objek_pajak', // Data diambil dari beberapa field
                        render: function (data, type, row) {
                            return `<div class="custom-layout"><div class="top-content">${row.jam} <i><b> Rp. ${row.tax} </b></i></div><div class="bottom-content">${row.nama_objek_pajak}  | ${row.no_struk}</div></div>`;
                        },
                    },
                     {
                        data: 'tax',
                        render: function(data, type, row) {
                          if (type === 'display' || type === 'filter') {
                            // Format 'tax' with commas for display and filtering
                            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          }
                          return data;
                        },
                        className: 'text-right' // Add this class for text-right alignment
                     },
                     { data: 'no_struk' },
                     { data: 'date_trans' },
                     { data: 'niop' },
                 ],
                 "destroy": true,
                  "order": [
                    [0, 'desc']
                  ],
             });
            // var lastItem = result.data[0].lastDateTrans;
            var lastItem = table.row(table.rows().count() - 1).data().lastDateTrans;
            console.log(lastItem.lastDateTrans);
            if(lastItem != undefined){
                $('#lastDateTrans').val(lastItem);

                $('#lastState').val(lastItem);
                
                // var totalTax = parseFloat($('#tot_pajak').val());
                // for (var i = 0; i < result.data.length; i++) {
                //   totalTax += parseInt(result.data[i].tax, 10);
                // }
                // $('#tot_pajak').val(totalTax);
                // $('.tot_pajak').text('Total Pajak Rp. '+parseFloat(totalTax).toLocaleString(['ban', 'id']));

            }
         }else{
         const delayBetweenEntries = 1000; // Delay in milliseconds
            result.data.forEach((entry, index) => {
               setTimeout(() => {
                  addEntryWithAnimation(entry);
               }, index * delayBetweenEntries);
            });
         }
      }
   });
}


var interval = (1000*5); //1000 = 1 detik
setInterval(realtimeStruk, interval);
// progressLoad('progressRealtimeStruk',10);



var totalAmount = 0;
function addEntryWithAnimation(entry) {
    var setAudio = $('#setAudio').val();
    if(setAudio == 1){
        var audio = $('#myAudio')[0]; // Ambil elemen audio
        // audio.play();
    }
    var table = $('#rtStrukTable').DataTable();
    if (table.rows().count() >= 3) {
        table.row(':last').remove(); // Menghapus baris terakhir
    }
    showToast('Rp. '+Math.ceil(entry.tax).toLocaleString(['ban', 'id']),'Pajak Masuk dari <b>'+entry.nama_objek_pajak+'</b><br/>Pada Jam <b>'+entry.jam+'</b>');
    // var totalTax = parseFloat($('#tot_pajak').val());
    var row = [entry];
    table.rows.add(row).draw();
    // console.log(entry);

    var lastDateTrans = row[0].lastDateTrans;

    var tot_tax_today = parseFloat($('#tot_tax_today').val())+parseFloat(entry.tax);
    $('#tot_tax_today').val(tot_tax_today);
    animationNumber('tot_tax_today_anim', tot_tax_today, 0.5);
    var tot_trans_terjadi = parseFloat($('#tot_trans_terjadi').val())+1;
    $('#tot_trans_terjadi').val(tot_trans_terjadi);
    animationNumber('tot_trans_terjadi_anim', tot_trans_terjadi, 0);
    var val_tax_cur = parseFloat($('#val_tax_cur').val())+parseFloat(entry.tax);
    $('#val_tax_cur').val(val_tax_cur);
    animationNumber('tax_cur', val_tax_cur, 0.8);
    if(entry.type == "Resto"){
        var jum_tax_resto = $('#val_jum_tax_resto').val();//input awal
        var val_jum_tax_resto = parseFloat(jum_tax_resto)+parseFloat(entry.tax);
        animationNumber('jum_tax_resto',val_jum_tax_resto,0.8);
        $('#val_jum_tax_resto').val(val_jum_tax_resto);
    }
    if(entry.type == "Hiburan"){
        var jum_tax_hiburan = $('#val_jum_tax_hiburan').val();//input awal
        var val_jum_tax_hiburan = parseFloat(jum_tax_hiburan)+parseFloat(entry.tax);
        animationNumber('jum_tax_hiburan',val_jum_tax_hiburan,0.8);
        $('#val_jum_tax_hiburan').val(val_jum_tax_hiburan);
    }
    if(entry.type == "Hotel"){
        var jum_tax_hotel = $('#val_jum_tax_hotel').val();//input awal
        var val_jum_tax_hotel = parseFloat(jum_tax_hotel)+parseFloat(entry.tax);
        animationNumber('jum_tax_hotel',val_jum_tax_hotel,0.8);
        $('#val_jum_tax_hotel').val(val_jum_tax_hotel);
    }
    if(entry.type == "Parkir"){
        var jum_tax_parkir = $('#val_jum_tax_parkir').val();//input awal
        var val_jum_tax_parkir = parseFloat(jum_tax_parkir)+parseFloat(entry.tax);
        animationNumber('jum_tax_parkir',val_jum_tax_parkir,0.5);
        $('#val_jum_tax_parkir').val(val_jum_tax_parkir);
    }
    // console.log(lastDateTrans)

// Mendapatkan nilai jam dari entri terakhir
    // var lastDateTrans = lastEntry.lastDateTrans;
    // console.log("entry "+entry);
    // console.log("elastDateTrans "+lastDateTrans);
    $('#lastDateTrans').val(lastDateTrans);
    // table.order([5, 'desc']).draw(false);
    // totalTax += parseFloat(entry.tax); // Assuming the second column contains numeric values
    // $('#tot_pajak').val(totalTax);
    // $('.tot_pajak').text('Total Pajak Rp. '+parseFloat(totalTax).toLocaleString(['ban', 'id']));
}

function setAudio() {
    var setAudio = $('#setAudio').val();
    if(setAudio == 1){
        $('#setAudio').val(0);
        $('#iconSetAudio').removeClass('icon-music-tone');
        $('#iconSetAudio').addClass('icon-clock');

    }else{
        $('#setAudio').val(1);

        $('#iconSetAudio').addClass('icon-music-tone');
        $('#iconSetAudio').removeClass('icon-clock');
    }
}

//OP DATA
rtOPData('today');
function rtOPData(type) {
    $(".opData").removeClass("blue");
    $("#"+type).addClass("blue");
    $('#typeOpData').val(type);
   var dataTable = $('#rtOPData').DataTable({
     "searching": false,
        "paging": false, // Menonaktifkan pagination
        "pageLength": 10, // Menampilkan 10 baris secara default
        "info": false,
   });
   dataTable.clear().draw();
   // dataTable.language.emptyTable = "Memproses Data";
   $.ajax({
        url: "../server/svr_dashboard_ov.php?OpData",
        method: 'post',
        data: {
            act: 'OpData',
            type:type
        },
        success: function(result) {
         let tdy = result.today;
         let ytd = result.yesterday;
         result.data.forEach((entry, index) => {
               addOpData(entry,tdy,ytd);
            });
      }});
   
   
    // $.ajax({
    //     url: "../server/svr_rekap.php?rekapOpData",
    //     // method: 'post',
    //     async:false,
    //     data: {
    //         act: 'rekapOpData',
    //     },
    //     success: function(result) {

    //     }
    // });
}
function addOpData(entry,tdy,ytd) {
   var table = $('#rtOPData').DataTable(
      
   {
        "destroy": true,
        "searching": false,
        "paging": false, // Menonaktifkan pagination
        "pageLength": 10, // Menampilkan 10 baris secara default
        "info": false,
        "columnDefs": [
           { "type": "num-fmt", "targets": 1 } // Kolom pertama (indeks 0) dianggap sebagai data numerik
       ],
   });
   var namaObjekPajakDiv = $('<div class="custom-layout" onclick="detailOP(\''+entry.id_objek_pajak+'\',\''+entry.niop+'\',\''+entry.nama_objek_pajak+'\',\''+ytd+'\',\''+tdy+'\')">').html('<div class="top-content">'+entry.last_data+' <i><b>Rp. '+ parseFloat(entry.tax).toLocaleString(['ban', 'id'])+'</b></i></div><div class="bottom-content">'+entry.nama_objek_pajak.substring(0, 20)+' | '+entry.jum_trx+' Trns</div>');
   // console.log(namaObjekPajakDiv);
   table.row.add([
      namaObjekPajakDiv.prop('outerHTML'),
      // parseFloat(entry.tax).toLocaleString(['ban', 'id']),
      entry.jum_trx,
      // entry.last_date,
      // entry.niop,
      // Add more columns as needed
   ]).draw(false).node();

   $(table).find('td:eq(1)').addClass('text-right');
   $(table).hide().fadeIn('slow');

   table.order([0, 'desc']).draw(true); 

   // $(table).find('td:eq(1)').addClass('text-right');
   // $(table).hide().fadeIn('slow');
   // $('#rtOPData').DataTable({
   //    "destroy": true,
   //    "columnDefs": [
   //        { "type": "num", "targets": [1] } // Replace [0] with the column index you want to sort as numbers
   //      ]
   // }).order([1, 'desc']).draw(false);
}

// progressLoad('progressOpData',10);


// function clearDatatable(){
//    var dataTable = $('#rtOPData').DataTable();
//    dataTable.clear().draw();
//    rtOPData();
// }

// var interval = ((1000*60)*30); //1000 = 1 detik
// setInterval(rtOPData, interval);
