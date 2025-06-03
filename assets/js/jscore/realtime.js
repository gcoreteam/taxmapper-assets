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
            
            var table = $('#rtStrukTable').DataTable();
            var data = table.rows().data().toArray();
            var firstTenData = data.slice(0, 10);
            
            var textArr = firstTenData.map(item => item.no_struk);
            let text = textArr.join();
            
            $('#previousNoStruk').val(text);
            // console.log(text);

         }else{
            const delayBetweenEntries = 1000; // Delay in milliseconds
            let totalAddTax = 0;
            let totalAddDpp = 0;
            let totalAddOmzet = 0;
            let totalDelay = 0;
            
            result.data.forEach((entry, index) => {
                const tax = Number(entry.tax);
                const dpp = tax * 10;
                const omzet = dpp + tax;
                
                totalAddTax += tax;
                totalAddDpp += dpp;
                totalAddOmzet += omzet;
                totalDelay += delayBetweenEntries;
                
               setTimeout(() => {
                  addEntryWithAnimation(entry);
               }, index * delayBetweenEntries);
               
            });
            
            let currentDpp = Number($('#val_dpp_cur').val()) + totalAddDpp;
			let currentTax = Number($('#val_tax_cur').val()) + totalAddTax;
		    let currentOmzet = Number($('#val_total_cur').val()) + totalAddOmzet;
		    
		    let loadTime = 0;
		    if (totalDelay > 0) {
		        loadTime = totalDelay / (1000 * 60)
		    }
		    
		    animationNumber('dpp_cur', currentDpp, loadTime);
			animationNumber('tax_cur', currentTax, loadTime);
			animationNumber('total_cur', currentOmzet, loadTime);
			$('#val_dpp_cur').val(currentDpp);
			$('#val_tax_cur').val(currentTax);
			$('#val_total_cur').val(currentOmzet);
			
// 			var progress_cur = '<div class="progress" >' +
// 				'<span style="width: ' + parseFloat(result.nilai_prcnt_cur) + '%;" class="progress-bar progress-bar-success red">' +
// 				'</span>' +
// 				'</div>' +
// 				'<div class="status">' +
// 				'<div class="status-title"> Target </div>' +
// 				'<div class="status-number"> ' + parseFloat(result.nilai_prcnt_cur) + '% </div>' +
// 				'</div>';

// 			$('#progress_cur').html(progress_cur)
         }
      }
   });
}


var interval = (3*1000*60); //1000 = 1 detik
setInterval(realtimeStruk, interval);
// progressLoad('progressRealtimeStruk',10);

var totalAmount = 0;
function addEntryWithAnimation(entry) {
    var setAudio = $('#setAudio').val();
    if(setAudio == 1){
        var audio = $('#myAudio')[0]; // Ambil elemen audio
        audio.play();
    }
    showToast('Rp. '+Math.ceil(entry.tax).toLocaleString(['ban', 'id']),'No Struk <b>['+entry.no_struk+']</b><br/> Pajak Masuk dari <b>'+entry.nama_objek_pajak+'</b><br/>Pada Jam <b>'+entry.jam+'</b>');
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
    var typeOpData = $('#typeOpData').val();
   var table = $('#rtOPData').DataTable(
      
   {
       "destroy": true,
       "columnDefs": [
           { "type": "num-fmt", "targets": 1 } // Kolom pertama (indeks 0) dianggap sebagai data numerik
       ],
   });
   var namaObjekPajakDiv = $('<div style="color:green" onclick="detailOP(\''+entry.id_objek_pajak+'\',\''+entry.niop+'\',\''+entry.nama_objek_pajak+'\',\''+typeOpData+'\')">').text(entry.nama_objek_pajak);
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