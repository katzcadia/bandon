// Dynamic labels
var hideLabel = function(label){ label.labelObject.style.opacity = 0;};
var showLabel = function(label){ label.labelObject.style.opacity = 1;};
var labelEngine = new labelgun.default(hideLabel, showLabel);
var labels = [];

// Create Legend Contents in html format
var county_legend = '<i style="background: orange; opacity: 0.5"></i><p><b>Counties</b></p>';

$(document).ready(function () {
    $('#bandon-photos').hide();
    $('.valiant .valiant-progress-bar').hide();
});

// Make photos appear in story panel
function showPhoto (evt) {
    $('#creamery').hide();
    $('#bandon-photos').show();
    var photo = evt.layer.photo;
    $("section.viewing div.embedded-photo").empty().append("<img src='" + photo.url +"' class='img-responsive img-thumbnail text-center' /> <br/> <p class='text-center'> " +  photo.caption +" <p>");
}

// Create a Leaflet photo cluster layer with photos defined in data.js
var photoLayer1 = L.photo.cluster().on('mouseover', showPhoto);
photoLayer1.add(bandonPhotos);

// var photoLayer2 = L.photo.cluster().on('mouseover', showPhoto);
// photoLayer2.add(charlestonPhotos);

var layers = {
    satellite: {
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw', {
            id: 'mapbox.satellite'
        })
    },
    osu: {
        layer: L.geoJson.ajax('assets/osu.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'material-icons md-48 grad-marker',
                        html: 'school'
                    })
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.activity + "<br>June 15, 2018<br>" + feature.properties.name, {
                    sticky: true,
                    className: "feature-tooltip"
                });
            }
        })
    },
    bandon: {
        layer: L.geoJson.ajax('assets/bandon.geojson', {
            pointToLayer: function (feature, latlng) {
                var ico = "material-icons md-36";
                var ico_html = "bandon_icons_html";
                if (feature.properties.name === "Face Rock Creamery") { ico_html = "local_dining"; }
                else if (feature.properties.name === "Kronenberg Park") { ico_html = "beach_access"; }
                else if (feature.properties.name === "Face Rock State Park") { ico_html = "star"; }
                else if (feature.properties.name === "Bandon Bait") { ico_html = "restaurant"; }
                else if (feature.properties.name === "Old Town Farmers Market") { ico_html = "shopping_basket"; }
                else { ico_html = "local_cafe"} // "The Rolling Pin Bake & Brew"
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: ico + " bandon-marker",
                        html: ico_html
                    })
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.name + ":<br>" + feature.properties.activity, {
                    sticky: true,
                    className: "feature-tooltip"
                });
            }
        })
    },
    campground: {
        layer: L.geoJson.ajax('assets/campground.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: "material-icons md-48 camp-marker",
                        html: "nature_people"
                    })
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.name, {
                    sticky: true,
                    className: "feature-tooltip"
                });
            }
        })
    },
    charleston: {
        layer: L.geoJson.ajax('assets/charleston.geojson', {
            pointToLayer: function (feature, latlng) {
                var ico = "material-icons md-36";
                var ico_html = "charleston_icons_html";
                if (feature.properties.name === "Charleston Welcome Center") { ico_html = "store_mall_directory"; }
                else if (feature.properties.name === "Bayside Coffee") { ico_html = "local_cafe"; }
                else { ico_html = "directions_boat"} // "Dock B"
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: ico + " charleston-marker",
                        html: ico_html
                    })
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.name + ":<br>" + feature.properties.activity, {
                    sticky: true,
                    className: "feature-tooltip"
                });
            }
        })
    },
    umpqua: {
        layer: L.geoJson.ajax('assets/umpqua.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: "material-icons md-48 umpqua-marker",
                        html: "local_dining"
                    })
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.name + ":<br>" + feature.properties.activity, {
                    sticky: true,
                    className: "feature-tooltip"
                });
            }
        })
    },
    counties: {
        layer: L.geoJson.ajax('assets/counties.geojson', {
            color: 'orange',
            weight: 2,
            opacity: 0.3,
            onEachFeature: function (feature, label) {
                label.bindTooltip(feature.properties.NAME, {className: 'feature-label', permanent:true, direction: 'center'});
                labels.push(label);
            }
        }), legend: county_legend
    },
    recap: {
        layer: L.geoJson.ajax('assets/recap.geojson', {
            pointToLayer: function (feature, latlng) {
                var ico = "material-icons md-48";
                var ico_html = "recap_icons_html";
                if (feature.properties.name === "Corvallis") { ico_html = "looks_one"; }
                else if (feature.properties.name === "Bandon") { ico_html = "looks_two"; }
                else if (feature.properties.name === "Grassy Knob Wilderness") { ico_html = "looks_3"; }
                else if (feature.properties.name === "Cape Blanco") { ico_html = "looks_4"; }
                else if (feature.properties.name === "Charleston") { ico_html = "looks_5"; }
                else { ico_html = "looks_6"} // "Umpqua River"
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: ico + " recap-marker",
                        html: ico_html
                    })
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.name + ":<br>" + feature.properties.activity, {
                    sticky: true,
                    className: "feature-tooltip"
                });
            }
        })
    },
    bandonPhotos: {
        layer: photoLayer1
    }
    // photoLayer1,
    // photoLayer2,
    // photoLayer3
};

var scenes = {
    landing: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Landing', layers: [layers.satellite]},
    graduation: {lat: 44.565762, lng: -123.285, zoom: 16, name: 'Graduation', layers: [layers.satellite, layers.osu]},
    bandon: {lat: 43.1133, lng: -124.435, zoom: 15, name: 'Bandon', layers: [layers.satellite, layers.bandonPhotos, layers.bandon]},
    camping: {lat: 42.8, lng: -124.5, zoom: 10, name: 'Camping', layers: [layers.satellite, layers.campground]},
    crabbing: {lat: 43.343072, lng: -124.328, zoom: 15, name: 'Crabbing', layers: [layers.satellite, layers.charleston]},
    dinner: {lat: 43.677605, lng: -123.932951, zoom: 14, name: 'Picnic', layers: [layers.satellite, layers.umpqua]},
    recap: {lat: 43.4, lng: -124.5, zoom: 8, name: 'Recap', layers: [layers.satellite, layers.counties, layers.recap]},
    contact: {lat: 44.0000000, lng: -123.5000000, zoom: 7, name: 'Contact', layers: [layers.satellite]}
};

$('#storymap').storymap({
    scenes: scenes,
    baselayer: layers.satellite,
    legend: true, // if you do not want a legend feature, you can simply not define the createLegend function.
    credits: "Katzcadia Productions",
    loader: true,
    scalebar: false,
    flyo: true,
    navwidget: true,

    createMap: function () {
        // create a map in the "map" div, set the view to a given place and zoom
        var map = L.map($(".storymap-map")[0], {
            zoomControl: false, scrollWheelZoom: false, fadeAnimation: true,
            zoomAnimation: true
        }).setView([44, -120], 7);

        return map;
    }
});

// Valiant360 Options
// $('.valiantContainer').Valiant360({
//     crossOrigin: 'anonymous',	// valid keywords: 'anonymous' or 'use-credentials'
//     clickAndDrag: false,	// use click-and-drag camera controls
//     keyboardControls: true, // use keyboard controls (move by arrows)
//     flatProjection: false,	// map image to appear flat (often more distorted)
//     fov: 35, 				// initial field of view
//     fovMin: 3, 				// min field of view allowed
//     fovMax: 100, 			// max field of view allowed
//     hideControls: false,	// hide player controls
//     lon: 0, 				// initial lon for camera angle
//     lat: 0, 				// initial lat for camera angle
//     loop: "loop", 			// video loops by default
//     muted: true,			// video muted by default
//     volume: 0.5,			// video volume by default
//     autoplay: true			// video autoplays by default
// });

// Load 360 videos into containers
$('.valiant').Valiant360({
    clickAndDrag: true,
    fov: 40,
    fovMin: 40,
    fovMax: 40,
    hideControls: true,
    lon: -138,
    lat: 17
});

$('.valiant2').Valiant360({
    clickAndDrag: true,
    fov: 40,
    fovMin: 40,
    fovMax: 40,
    muted: false,
    loop: false,
    lon: -42,
    lat: 7
});

// $('.valiant3').Valiant360({
//     clickAndDrag: true,
//     fov: 40,
//     fovMin: 40,
//     fovMax: 40,
//     hideControls: true,
//     lon: -138,
//     lat: 17
// });
//
// $('.valiant4').Valiant360({
//     clickAndDrag: true,
//     fov: 40,
//     fovMin: 40,
//     fovMax: 40,
//     hideControls: true
// });