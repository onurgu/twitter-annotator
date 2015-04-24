
//try {
//    jQuery(function ($) {
//        try {
//            $('body').annotator();
//        } catch (e) {
//            console.log('annotator is not yet loaded.');
//            console.log(e);
//        }
//    });
//} catch (e) {
//    console.log('jQuery is not yet loaded.');
//    console.log(e);
//}

jQuery(function ($) {

    console.log('annotator init');

    if ($('body').data('annotator')) {
        console.log('annotator is already loaded.')
    } else {
    $('body')
        //.annotator('addPlugin', 'Permissions')
        .annotator('addPlugin', 'Markdown')
        //.annotator('addPlugin', 'Tags')
        .annotator('addPlugin', 'Filter')
        .annotator('addPlugin', 'Objects')
        .annotator('addPlugin', 'Store')
        .annotator();
    }
});