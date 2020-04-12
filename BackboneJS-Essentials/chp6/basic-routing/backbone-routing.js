const user = new Backbone.Model({isAdmin: true});

/*  Starting the Hash-based routing */
//Backbone.history.start();

/* Starting the Pushstate-based routing  */
//Backbone.history.start({pushState: true}); 

/*** Defining routers **/
/* Method 1: Creating an instance of Router */
/*
const router = new Backbone.Router({
    routes: {
        'admin': function() {
            // logic for '/admin' pr '#admin' route
        }
    }
});
Backbone.history.start();
*/

/* Method 2: Creating a router subclass */
/*
const AppRouter = Backbone.Router.extend({
    routes: {
        'admin': 'adminFunc'
    },
    adminFunc: function() {
        // handler for /admin route
    }
});
const appRouter = new AppRouter();
Backbone.history.start();
*/

/* Method 3: Using backbone route() method */
const WebRouter = Backbone.Router.extend({
    initialize: function() {
        this.route('books', 'booksRoute');
        // Regular expression route
        this.route(/^book\/(\d+)$/, 'bookRoute');
        if (user.get('isAdmin')) {
            this.addAdminRoutes();
        }
        this.route('*anything', 'pageNotFound');

        /* Adding router events listener */
        this.on('route:admin', () => {
          // check for authorization
        }); // You can also use the 'route' and 'all' event for all routes
    },
    booksRoute: function() {
       // handle /books route
    },
    bookRoute: function(id) {
        // handle  /book/:id route
    },
    pageNotFound: function() {
       // display 404 view
    },
    addAdminRoutes() {
        this.route('admin', 'adminHomeRoute');
        // Using Routing string with parameter
        this.route('admin/:userId', 'adminDetalsRoute');

        /*For optional parameter route */
        this.route('admin/settings/(:userId)', 'adminDetalsRoute');

        /* Using wildcard to match the remainder parts of a route */
        this.route('admin/others/*', 'adminDetalsRoute');
        // This will match any route with a prefix of /admin/others including /asmin/others/whatever/whoever
    },
    adminHomeRoute: function() {
        // hanlde /admin route
    },
    adminDetalsRoute: function(userId) {
        // handle /admin/:userId route
    }
});
Backbone.history.start();
// /* Method 3 allows you to easiler apply logic to your routes. 
//  * This good for something like authorization and authentication*/ 

/*** Redirects **/
/* Use regular links to navigate frrom page to page */
const link = `<a href="#/home">home</a>`;

const router = new WebRouter(); 
/* User the router navigate() function tp programtically navigate from one page to the other */
router.navigate('home', {trigger: true});
// Without the trigger argument property , Backbone will take the user to the route's URL but won't actually trigger the route's logic

router.navigate('payment', {trigger: true, replace: true});
// with the replace argument property set to true, Backbone will not add an entry to the browser history.

/* Listen for router events from the history */
Backbone.history.on('route', () => {
    // handler router even
});

/* Backbone allows multiple router */

const NormalRouter = Backbone.Router.extend({routes: {}});
const AdminRouter = Backbone.Router.extend({routes: {}});

const normalRouter = new NormalRouter();
if (user.get('isAdmin')) {
    const adminRouter = new AdminRouter();
}