$(function(){
    $.getJSON('./balance_sheet_data.json', function(info){
        var ParentData = info.filter(function(item){
            return item.parent === "";
        });
        console.log(ParentData);
        var tbody = $('#balance-sheet tbody');

        ParentData.forEach(function(ParentItem){
            var ParentRow = $('<tr>').addClass('parent').appendTo(tbody);
            // console.log(ParentRow);
            // $('<td>').append($('<span>').addClass('toggle-sign').text('+')).appendTo(ParentRow);
            $('<td>').text(ParentItem.particulars).append($('<span>').addClass('toggle-sign').text('+')).appendTo(ParentRow);
            $('<td>').text(ParentItem.cr).appendTo(ParentRow);
           

            var ChildData = info.filter(function(ChildItem){
                return ChildItem.parent === ParentItem.particulars;
            });
            // console.log(ChildData);

            if(ChildData.length > 0){
                var ChildContainer = $('<tbody>').addClass('child').appendTo(ParentRow);
                ChildData.forEach(function(ChildItem){
                    var ChildRow = $('<tr>').appendTo(ChildContainer);
                    $('<td>').text(ChildItem.particulars).appendTo(ChildRow);
                    $('<td>').text(ChildItem.cr).appendTo(ChildRow);

                    var SubChildData = info.filter(function(SubChildItem){
                        return SubChildItem.parent === ChildItem.particulars;
                    });

                    if(SubChildData.length > 0){
                        ChildRow.addClass('has-child');
                        $('<td>').addClass('toggle-sign').text('+').appendTo(ChildRow);

                        var SubChildContainer = $('<tbody>').addClass('sub-child').appendTo(ChildRow);
                        SubChildData.forEach(function(SubChildItem){
                            var SubChildRow = $('<tr>').appendTo(SubChildContainer);
                            $('<td>').text(SubChildItem.particulars).appendTo(SubChildRow);
                            $('<td>').text(SubChildItem.cr).appendTo(SubChildRow);
                            
                        });
                    }
                });
                

            }

            
        });

        $('#balance-sheet').on('click', '.parent', function () {
            $(this).toggleClass('open');
            $(this).find('.child').toggleClass('open');
            $(this).find('.toggle-sign').text(function () {
                return $(this).text() === '+' ? '-' : '+';
            });
        });
        
        $('#balance-sheet').on('click', '.has-child .toggle-sign', function(event){
            event.preventDefault();
            $(this).toggleClass('open');
            $(this).closest('.has-child').find('.sub-child').toggleClass('open');
            $(this).text(function () {
                return $(this).text() === '+' ? '-' : '+';
            });

        });


        
    });
});