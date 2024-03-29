$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready( function () {

    $('#listVehicles').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: SITEURL + "/listVehicles",
            type: 'GET',
        },

        columns: [
            { data: 'id', name: 'id', 'visible': false},
            { data: 'plate', name: 'plate'},
            { data: 'category' },
            { data: 'mark' },
            { data: 'model' },
            { data: 'year' },
            { data: 'name' },
            { data: 'description' },
            { data: 'action' },
        ],
        order: [[0, 'desc']]
    });
        
    $('body').on('click', '.edit-vehicle', function () {
        var vehcile = $(this).data("id").split('/');
        var vehicle_id = vehcile[0];
        var vehicle_plate = vehcile[1];

        $.get('listVehicles/' + vehicle_id +'/edit', function (data) {
            
            $('#contentDanger').hide();
            $('#contentSuccess').hide();
            $('#btn-vehicle').val('edit');

            // Combo de categoria
            $('#Vehcategory').val('');
            $('#Vehcategory').empty();
            var categories=data.categories;
            var select=document.getElementsByName('Vehcategory')[0];

            for (value in categories) {
                var option=document.createElement("option");
                    option.value=categories[value]['id'];
                    option.text=categories[value]['description'];
                    select.add(option);
            }

            // Combo de marca
            $('#Vehmark').val('');
            $('#Vehmark').empty();
            var marks=data.marks;
            var select=document.getElementsByName('Vehmark')[0];
            
            for (value in marks) {
                var option=document.createElement("option");
                    option.value=marks[value]['id'];
                    option.text=marks[value]['description'];
                    select.add(option);
            }

            // Combo de modelo
            $('#Vehmodel').val('');
            $('#Vehmodel').empty();
            var models = data.models;
            var select = document.getElementsByName('Vehmodel')[0];
            
            for (value in models) {
             var option = document.createElement("option");
             option.value = models[value]['id'];
             option.text = models[value]['description'];
             select.add(option);
            }

           //Register data
            $('#Vehid').val(data.vehicles['id']);
            $('#Vehmark').val(data.vehicles['mark']);
            $('#Vehyear').val(data.vehicles['year']);
            $('#Vehplate').val(data.vehicles['plate']);
            $('#Vehmodel').val(data.vehicles['model']);
            $('#Vehmotor').val(data.vehicles['motor']);
            $('#Vehserie').val(data.vehicles['serie']);
            $('#Clientname').val(data.vehicles['name']);
            $('#Clienttype').val(data.vehicles['type']);
            $('#Vehstatus').val(data.vehicles['status']);
            $('#Vehcolour').val(data.vehicles['colour']);
            $('#Vehcolour').val(data.vehicles['colour']);
            $("#Clientid").val(data.vehicles['Clientid']);
            $("#ClientidNew").val(data.vehicles['Clientid']);
            $('#Vehcategory').val(data.vehicles['category']);
            $('#Vehmotor').val(data.vehicles['number_engine']);
            $('#Vehserie').val(data.vehicles['number_series']);
            $('#Clientdocument').val(data.vehicles['document']);
            $('#Vehobservations').val(data.vehicles['observations']);
            $('#Vehobservations').text(data.vehicles['observations']);
        })
    });

    $('body').on('click', '#delete-vehicle', function () {

        $('#contentDanger').hide();
        $('#contentSuccess').hide();

        var vehcile = $(this).data("id").split('/');
        var vehicle_id = vehcile[0];
        var vehicle_plate = vehcile[1];
      
        if(confirm("Está seguro que desea eliminar el registro con el NRO DE PLACA: "+vehicle_plate.toUpperCase()+" !")) {
            $.ajax({
                type: "get",
                url: SITEURL + "/listVehicles/delete/"+vehicle_id,
                success: function (data) {
                    $('#mensSuccess').text('El vehículos de placa '+vehicle_plate.toUpperCase()+' se eliminó correctamente...');
                    $('#contentSuccess').show();
                    getClearVehicles();
                },
                error: function (data) {
                    console.log('Error:', data);
                    $('#mensDanger').text('El vehículos de placa '+vehicle_plate.toUpperCase()+' no se ha podido eliminar, intentelo nuevamente...');
                    $('#contentDanger').show();
                }
            });
        }    
    });
    
    $('body').on('click', '#btn-vehicle', function () {
     
        if($("#btn-vehicle").val()=='edit') {

            var action='edit';
            var content='editó';
            var Vehmark=$("#Vehmark").val();
            var Vehyear=$("#Vehyear").val();
            var Clientid=$("#Clientid").val();
            var Vehplate=$("#Vehplate").val();
            var Vehmotor=$("#Vehmotor").val();
            var Vehserie=$("#Vehserie").val();
            var Vehmodel=$("#Vehmodel").val();
            var Vehcolour=$("#Vehcolour").val();
            var Vehstatus=$("#Vehstatus").val();
            var Clientname=$("#Clientname").val();
            var Vehcategory=$("#Vehcategory").val();
            var ClientidNew=$("#ClientidNew").val();
            var Clientdocument=$("#Clientdocument").val();
            var Vehobservations=$("#Vehobservations").val();

            if(Clientid!=ClientidNew) { 
                if(!confirm("Está seguro que desea cambiar el propietario del vehículo con el NRO DE PLACA: "+Vehplate.toUpperCase()+" !")) {
                    getClearVehicles();return;
                }
            } 

        } else {

            var ClientidNew='';
            var action='register';
            var content='Registro';
            var Vehmark=$("#Vehmarks").val();
            var Vehyear=$("#Vehyears").val();
            var Clientid=$("#Clientids").val();
            var Vehplate=$("#Vehplates").val();
            var Vehmotor=$("#Vehmotors").val();
            var Vehserie=$("#Vehseries").val();
            var Vehmodel=$("#Vehmodels").val();
            var Vehcolour=$("#Vehcolours").val();
            var Vehstatus=$("#Vehstatuss").val();
            var Clientname=$("#Clientnames").val();
            var Vehcategory=$("#Vehcategorys").val();
            var Clientdocument=$("#Clientdocuments").val();
            var Vehobservations=$("#Vehobservationss").val();
        }
        
        var yes=1;
        if(!Vehplate || !Vehcategory || !Vehmark || !Vehmodel || !Vehcolour || !Vehyear || !Vehmotor || !Vehserie || !Vehstatus || !Clientname || !Clientid) {
            yes=0;
        }    
      
        if(yes > 0) {
        
            $("#btn-vehicle").attr("disabled", true);

            $.ajax({
                data:{"action":action,"Vehid":$("#Vehid").val(),"Vehplate":Vehplate,"Vehcategory":Vehcategory,"Vehmark":Vehmark,"Vehmodel":Vehmodel,"Vehcolour":Vehcolour,"Vehyear":Vehyear,"Vehmotor":Vehmotor,"Vehserie":Vehserie,"Vehobservations":Vehobservations,"Vehstatus":Vehstatus,"Clientid":Clientid,"ClientidNew":ClientidNew},
                url: SITEURL + "/listVehicles/store",
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    $('#mensSuccess').text('El vehículos de placa '+Vehplate.toUpperCase()+' se '+content+' correctamente...');
                    $('#contentSuccess').show();
                    getClearVehicles();
                    getClearVehiclesNew();
                },
                error: function (data) {
                    console.log('Error:', data);
                    $('#mensDanger').text('El vehículos de placa '+Vehplate.toUpperCase()+' no se ha podido '+content+', intentelo nuevamente...');
                    $('#contentDanger').show();
                }
            });
        }  
    });   
});

function models(models,marks) {
    
    $('#'+models).val('');
    $('#'+models).empty();
    
    $("#"+marks+" option:selected").each(function () {
        id=$(this).val();
        $.post(SITEURL + "/models",{"id":id},function(data){
          
            if(data.length > 0) {
                
                var select=document.getElementsByName(models)[0];
                
                for (value in data) {
                    var option=document.createElement("option");
                        option.value=data[value]['id'];
                        option.text=data[value]['description'];
                        select.add(option);
                }
                
            } else {

                var select=document.getElementsByName(models)[0];
                var option=document.createElement("option");
                    option.value='0';
                    option.text='No hay registro';
                    select.add(option);
            }    
        });		
       
    });
}

function getClearVehicles() {

    $('#Vehid').val('');
    $('#Vehmark').val('');
    $('#Vehyear').val('');
    $('#Vehplate').val('');
    $('#Vehmodel').val('');
    $('#Vehmotor').val('');
    $('#Vehserie').val('');
    $("#Clientid").val('');
    $('#Vehcolour').val('');
    $('#Vehstatus').val('1');
    $('#Clientname').val('');
    $('#Vehcategory').val('');
    $("#ClientidNew").val('');
    $('#Clienttype').val('1');
    $('#Clientdocument').val('');
    $('#Vehobservations').empty();
    $('#Vehobservations').text('');
    $("#btn-vehicle").attr("disabled", false);

    // Modal
    $("body").removeAttr("style");
    $('.jquery-modal').fadeOut(500);
    $('#ListClientSearch tr').removeClass('highlighted');
    
    var oTable = $('.ListVehiclesRefres').dataTable();
    oTable.fnDraw(false);
}

function getClearVehiclesNew() {

    $('#Vehids').val('');
    $('#Vehmarks').val('');
    $('#Vehyears').val('');
    $('#Vehplates').val('');
    $('#Vehmodels').val('');
    $('#Vehmotors').val('');
    $('#Vehseries').val('');
    $("#Clientids").val('');
    $('#Vehcolours').val('');
    $('#Vehstatuss').val('1');
    $('#Clienttypes').val('1');
    $('#Clientnames').val('');
    $('#Vehcategorys').val('');
    $('#Clientdocuments').val('');
    $('#Vehobservationss').empty();
    $('#Vehobservationss').text('');
    $("#btn-vehicle").attr("disabled", false);

    // Modal
    $("body").removeAttr("style");
    $('.jquery-modal').fadeOut(500);
    $('#ListClientSearch tr').removeClass('highlighted');

    var oTable = $('.ListVehiclesRefres').dataTable();
    oTable.fnDraw(false);
}