var print_test_results = true;

var testmark = gamedonia.data.newEntity();

var d = new Date();
testmark.date = d.toString();
testmark.api = "users";

var query = "{}";
  
gamedonia.user.search( query, {
    success: function(res_search) {

                printTest("SEARCH", true);
                var res = res_search.get(0);
                res.profile.nickname = "termo";

                var newp = {};
                newp.campo = "ola";

                gamedonia.user.update( newp, {
                //gamedonia.user.update( res.profile, {
                //gamedonia.user.update( res, {

                    success: function(res_update) {

                        printTest("UPDATE", true);
                        get(res_update.id);
                        response.success();
                    },
                    error: function(error) {

                        printTest("UPDATE", false);
                        log.error(error.message);
                        response.error(error.message);
                    }
                });

            
            response.success();
    },
    error: function(error) {

            printTest("SEARCH", false);
            log.error(error.message);
            response.error(error.message);
    }
});

function get(id) {

    gamedonia.user.get(id, {

        success: function(res_get) {

            printTest("GET", true);
            count();
            response.success()
        },
        error: function(error) {

            printTest("GET", false);
            log.error(error.message);
            response.error(error.message);
        }
    });
}

function count() {

    gamedonia.user.count("{}", {

            success: function(res_count) {

                    printTest("COUNT", true);
                    log.info(res_count);
                    createMark(true);
                    
                    response.success();
            },
            error: function(error) {

                    printTest("COUNT", false);
                    log.error(error.message);
                    response.error(error.message);
            }
    });
}

function createMark(status) {

    if(status) testmark.status = "PASSED";
    else testmark.status = "ERROR";

    gamedonia.data.create("testsapi", testmark, {
    success: function(res_create) {

            response.success();
    },
    error: function(error) {

            log.error(error.message);
            response.error(error.message);
    }
});
}

function printTest(method, success) {
    if (print_test_results) {

        if( success ) {

            log.info( method+" OK" );
            testmark.put(method, "OK");

        } else {

            log.info( method+" FAIL" );
            testmark.put(method, "FAIL");
            createMark(false);

        }
    }
}