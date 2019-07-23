
module.exports = {
    'getSceneName': function ( event ) {
        let ret = cc.director.getScene().name
        // debugger
        if ( event.reply ) {
            event.reply( null, ret );
        }
    }
};