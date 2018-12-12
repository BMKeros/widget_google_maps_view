odoo.define('widget_google_maps_view', function (require) {
    "use strict";

    var core = require('web.core');
    var Widget = require('web.Widget');
    var widgetRegistry = require('web.widget_registry');

    var GMapView = Widget.extend({
        template: "gmap_view",

        init: function() {
            this._super.apply(this, arguments);

            this.mode = arguments[0].mode || 'readonly';
        },

        start: function() {
            this._initMap();
            return this._super();
        },

        _initMap: function() {

            var self = this;

            const mapOptions = {
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 3,
                minZoom: 3,
                maxZoom: 20,
            };

            this.defaults = {
                position: { lat: 0, lng: 0 },
                zoom: 12,
            };

            this.map = new google.maps.Map(this.el, mapOptions);

            this.marker = new google.maps.Marker({
                position: mapOptions.center,
            });

            this.marker.setPosition(this.defaults.position);
            this.map.setCenter(this.defaults.position);

            this.map.setZoom(this.defaults.zoom);
            this.marker.setMap(this.map);


            // Listeners 
            this.map.addListener('click', function (e) {
                if (self.mode === 'edit') {
                    self.marker.setPosition(e.latLng);
                    self.marker.setMap(self.map);

                    $("input[name='latitude']").val(e.latLng.lat);
                    $("input[name='longitude']").val(e.latLng.lng);
                }
            });
        }

        /*init: function (view, record, node) {
            this._super(view, record, node);
            this.field_lat = 0;// node.attrs.lat;
            this.field_lng = 0; // node.attrs.lng;
            this.shown = $.Deferred();
            this.data = record.data;
            this.mode = view.mode || "readonly";
            this.record = record;
            this.view = view;
        },

        start: function () {
            var self = this;
            
            self.on_ready();

            return this._super();
        },

        on_ready: function () {
            var lat = this.data[this.field_lat];
            var lng = this.data[this.field_lng];

            var myLatlng = new google.maps.LatLng(lat, lng);
            //var bounds = new google.maps.LatLngBounds();

            var mapOptions = {
                zoom: 12,
                center: myLatlng,
                disableDefaultUI: true,
            };

            this.map = new google.maps.Map(this.el, mapOptions);

            this.marker = new google.maps.Marker({
                position: myLatlng,
                draggable: this.mode == 'edit' ? true : false,
            });

            this.marker.setPosition(myLatlng);
            this.map.setCenter(myLatlng);

            this.map.setZoom(12);
            this.marker.setMap(this.map);

            var my_self = this;

            google.maps.event.addListener(this.marker, 'dragend', function (NewPoint) {
                lat = NewPoint.latLng.lat();
                lng = NewPoint.latLng.lng();
                my_self.update_latlng(lat, lng);
            });

            this.view.on("field_changed:" + this.field_lat, this, this.display_result);
            this.view.on("field_changed:" + this.field_lng, this, this.display_result);

            google.maps.event.trigger(map, 'resize')
        },

        update_latlng: function (lat, lng) {

            this.data[this.field_lat] = lat;
            this.data[this.field_lng] = lng;


            var def = $.Deferred();
            var changes = {};
            changes[this.field_lat] = lat;
            changes[this.field_lng] = lng;

            this.trigger_up('field_changed', {
                dataPointID: this.record.id,
                changes: changes,
                onSuccess: def.resolve.bind(def),
                onFailure: def.reject.bind(def),
            });

        },

        display_result: function () {
            var lat = this.data[this.field_lat];
            var lng = this.data[this.field_lng];
            var myLatlng = new google.maps.LatLng(lat, lng);
            map.setCenter(myLatlng);
            this.marker.setPosition(myLatlng);
            google.maps.event.trigger(map, 'resize')
        },*/



    });

    core.form_custom_registry.add('gmap_view', GMapView);
    widgetRegistry.add('gmap_view', GMapView);

    return { gmap_view: GMapView };

});


