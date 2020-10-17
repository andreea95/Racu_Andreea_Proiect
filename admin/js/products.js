/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/products/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
           + '<td class="spec_id">'+ (value.spec ? value.spec.id : value.spec_id) +'</td>'
            + '<td class="name">'+value.name+'</td>'
			+ '<td class="company">'+value.company+'</td>'
			+ '<td class="price">'+value.price+'</td>'
			+ '<td class="warranty">'+value.warranty+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#spec_id').val('');
    $('#company').val('');
    $('#name').val('');
    $('#price').val('');
    $('#warranty').val('');
    
    $('#myModalLabel').html('Add New Product');
}

function viewRecord(id) {
    var url = "/products/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#spec_id').val(data.spec_id);
        $('#name').val(data.name);
        $('#company').val(data.company);
        $('#price').val(data.price);
        $('#warranty').val(data.warranty);
        $('#id').val(id);
        $('#myModalLabel').html('Edit Product');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    //decide if it's an edit or create
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/products/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/products/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.spec_id').html(formData.spec_id);
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.company').html(formData.company);
            $('#row_id_'+formData.id+'>td.price').html(formData.price);
            $('#row_id_'+formData.id+'>td.warranty').html(formData.warranty);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/products/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}