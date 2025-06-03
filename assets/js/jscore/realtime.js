//STRUK
var  table = $('#rtStrukTable').dataTable();
function realtimeStruk() {
   var lastDateTrans = $('#lastDateTrans').val();
   var lastState = $('#lastState').val();
    // console.log(lastDateTrans);
    // console.log(lastState);
   if(lastDateTrans == lastState){
        // console.log('lastState');
        // return false;
   }
   $.ajax({
        url: "../server/svr_dashboard.php?struk",
        method: 'post',
        data: {
            act: 'struk',
            lastDateTrans:lastDateTrans,
            lastState:lastState
        },
        success: function(result) {
         if(lastDateTrans == "first"){
            
            var table = $('#rtStrukTable').DataTable({
                language: {
                        "emptyTable": "Memproses Data"
                },
                 data: result.data, // Provide the JSON data here
                 columns: [
                     { data: 'nama_objek_pajak' },
                     { data: 'jam' },
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
                     { data: 'niop' },
                     { data: 'date_trans' },
                     // { data: 'lastDateTrans' }
                 ],
                 "destroy": true,
                  "order": [
                    [5, 'desc']
                  ],
             });
            var lastItem = result.data[result.data.length - 1];
            // console.log("lastItem"+lastItem);
            if(lastItem != undefined){
                $('#lastDateTrans').val(lastItem.lastDateTrans);

                $('#lastState').val(lastItem.lastDateTrans);
                
                var totalTax = parseFloat($('#tot_pajak').val());
                for (var i = 0; i < result.data.length; i++) {
                  totalTax += parseInt(result.data[i].tax, 10);
                }
                $('#tot_pajak').val(totalTax);
                $('.tot_pajak').text('Total Pajak Rp. '+parseFloat(totalTax).toLocaleString(['ban', 'id']));

            }
         }else{
         const delayBetweenEntries = 1000; // Delay in milliseconds
            // const delayBetweenEntries = 500; // Delay in milliseconds

            result.data.forEach((entry, index) => {
               setTimeout(() => {
                  addEntryWithAnimation(entry);
               }, index * delayBetweenEntries);
            });
         }
      }
   });
}


var interval = (2*1000*60); //1000 = 1 detik
setInterval(realtimeStruk, interval);
// progressLoad('progressRealtimeStruk',10);

var totalAmount = 0;
function addEntryWithAnimation(entry) {
    var setAudio = $('#setAudio').val();
    if(setAudio == 1){
        var audio = $('#myAudio')[0]; // Ambil elemen audio
        audio.play();
    }
    showToast('Rp. '+Math.ceil(entry.tax).toLocaleString(['ban', 'id']),'Pajak Masuk dari <b>'+entry.nama_objek_pajak+'</b><br/>Pada Jam <b>'+entry.jam+'</b>');
    var table = $('#rtStrukTable').DataTable();
    var totalTax = parseFloat($('#tot_pajak').val());
    var row = [entry];
    table.rows.add(row).draw();

    var lastItem = entry.lastDateTrans;
    $('#lastDateTrans').val(lastItem);
    table.order([5, 'desc']).draw(false);
    totalTax += parseFloat(entry.tax); // Assuming the second column contains numeric values
    $('#tot_pajak').val(totalTax);
    $('.tot_pajak').text('Total Pajak Rp. '+parseFloat(totalTax).toLocaleString(['ban', 'id']));
   
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
function rtOPData(type) {
    $(".opData").removeClass("blue");
    $("#"+type).addClass("blue");
    $('#typeOpData').val(type);
   var dataTable = $('#rtOPData').DataTable();
   dataTable.clear().draw();
   // dataTable.language.emptyTable = "Memproses Data";
   $.ajax({
        url: "../server/svr_dashboard.php?OpData",
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
       "columnDefs": [
           { "type": "num-fmt", "targets": 1 } // Kolom pertama (indeks 0) dianggap sebagai data numerik
       ],
   });
   var namaObjekPajakDiv = $('<div style="color:green" onclick="detailOP(\''+entry.id_objek_pajak+'\',\''+entry.niop+'\',\''+entry.nama_objek_pajak+'\',\''+ytd+'\',\''+tdy+'\')">').text(entry.nama_objek_pajak);
   // console.log(namaObjekPajakDiv);
   table.row.add([
      namaObjekPajakDiv.prop('outerHTML'),
      parseFloat(entry.tax).toLocaleString(['ban', 'id']),
      entry.jum_trx,
      entry.last_date,
      entry.niop,
      // Add more columns as needed
   ]).draw(false).node();

   $(table).find('td:eq(1)').addClass('text-right');
   $(table).hide().fadeIn('slow');

   table.order([3, 'desc']).draw(true); 

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
