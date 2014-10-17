/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var _position;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();	
        
        setInterval(function(){
            app.getLocation();
            console.log('updated')
        }, 3000);
			
				
		
    },
    
    showPopup: function(position){
        console.log(position.coords.latitude, position.coords.longitude)
        app.resizeMap();
		var map = L.map('map-canvas').setView([position.coords.latitude, position.coords.longitude], 13);
                
		//this works, but is online:
		
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18
		}).addTo(map);
		
		
		//TODO build something to fall back to web if not found.
		/*L.tileLayer('img/mapTiles/{z}/{x}/{y}.png', {
			maxZoom: 17
		}).addTo(map);*/
        
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
			.bindPopup("<b>You are here!</b>").openPopup();

		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}

		map.on('click', onMapClick);
    },
    
    getLocation : function() {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
          // onSuccess Geolocation
        //
        function onSuccess(position) {
            app.showPopup(position);
        }
    
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	resizeMap: function() {
		 $("#map-canvas").height(Math.max(100,$(window).height()-90));// TODO set 
	}
	
	
};

	

	$(window).resize(function() {
		app.resizeMap();
	});
