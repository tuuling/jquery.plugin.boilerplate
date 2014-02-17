(function(window, document, $, undefined){
    // First we set the name here and reference the variable everywhere else where we need the name
    var pluginName = 'gc_plugin';
    // The plugin is based on a constructor function that we call later on initialization.
    // The arguments passed are: the $element it was bound to and the options specified on initialization (if any)
    var gc_Plugin = function ($element, options) {
        // We set the pluginName as a parameter of the plugin object for debugging purposes
        this.name = pluginName;
// PLUGIN DEFAULT SETTINGS
        // This is the part where the plugin default settings are set and extended with the options passed on init.
        // We use the jQuery extend() method to merge two objects: the default settings with the passed options and then set merged options as a parameter of the plugin.
        this.settings = $.extend({
            // Define all your options and their default values here, you can also define methods here, for example callbacks
                setting1 : 'setting',
                callback : function () {}
        }, options);
        // Now we start defining the private variables.
 
        // First are the 3 boilerplate variables that should always be set.
        //  _self refers to the plugin object itself
        //  _element refers to the element that the plugin was bound to. is a jQuery element
        //  _settings refers to the plugins settings object
        var _self = this,
            _element = $element,
            _settings = this.settings,
// PRIVATE VARIABLES
            // Here we can define all the plugin specific private variables, as much as we need.
            _privateVar = 'privateValue',
// INIT METHOD
            // Next come the private methods
            // We start with the _init() method. This has to exist, but can left empty.
            _init = function () {
                // Write code here that needs to be run when the plugin is initalized.
                // for example binding the callback even to the plugin bound elements Click event
                // _element.on('click', _settings.callback);
            },
// PRIVATE METHODS
            // After that you can define as many plugin specific private methods as you want. Most of the plugin logic should be contained in these methods
            _privateMethod = function () {
                // console.log('private method called');
            };
        // Now we create the public methods that can be accessed via the plugin interface
        // We need to bind them plugin objects method property so they are accesible for the public interface
        _self.methods = {
// PUBLIC METHODS
            // This method would be avalible: $('div').gc_boilerplate('publicMethod1', var1, var2)
            // Variables are passed along also
            publicMethod1: function (var1, var2) {
                // Private method should include very little logic. Mostly just calling private methods if possible
            },
            publicMethod2: function() {
                // by default the plugin method would return the jQuery object that was selected enabling you to do something like this:
                // $('div').gc_boilerplate('publicMethod1').css('color', 'red');
                // But if you want to actually return a value with the method you just need to specify a return statment that returns something that is not undefined
                // $('div').gc_boilerplate('publicMethod2') would return the value of _priavetVar instead of the jQuery object
                return _privateVar;
            }
        };
        // Finally we call the _init() method
        _init();
    };
    // The rest of the code is pure boilerplate that does all the magic and should not be modified to be plugin specific
    $.fn[pluginName] = function(method) {
    var _arguments = arguments;
        var ret;
        this.each(function () {
            var element = $(this);
            var plugin = element.data(pluginName);
            if (!plugin) {
                plugin = new gc_Plugin($(this), method);
            }
            element.data(pluginName, plugin);
            if (plugin.methods[method]) {
                var response = plugin.methods[method].apply(this, Array.prototype.slice.call( _arguments, 1 ));
                if (ret === undefined && response !== undefined) {
                    ret = response;
                }
                ret = ret || response;
            } else if (typeof method === 'object' || ! method) {
                $.extend(plugin.settings, method);
            } else {
                $.error( 'Method ' +  method + ' does not exist on ' + pluginName);
            }
        });
        if (ret !== undefined) {return ret;} else {return this;}
    };
})(window, document, jQuery);
