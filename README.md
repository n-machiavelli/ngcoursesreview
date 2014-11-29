ngcoursesreview
===============

 app uses AngularJS, firebase to enable course reviews IT354
+To run the application, you need to enable rewrite module in apache. this is used for the api calls to redirect calls to api.php
+turn rewrite_module on via wamp\apache modules
+open apache's httpd.conf then change "AllowOverride None" to "AllowOverride All"
+You also need to install mongo and enable in your php.ini file
+Documentation is accessed using /documentation/classes/api.html