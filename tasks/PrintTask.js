// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/Deferred","dojo/has","../kernel","../lang","../layerUtils","../deferredUtils","../Color","../urlUtils","./Task","../geometry/Polygon","../renderers/SimpleRenderer","../geometry/scaleUtils","../symbols/FillSymbol","./Geoprocessor","./PrintTemplate","dojo/dom-attr","dojo/dom-construct","dojox/gfx/_base","dojox/gfx/canvas","dojox/json/query","dojo/has!extend-esri?./PrintParameters","dojo/has!extend-esri?./LegendLayer"],function(e,r,i,t,a,n,s,l,o,y,d,c,u,m,f,p,g,h,b,v,S,L,_,x){var I=e(u,{declaredClass:"esri.tasks.PrintTask",constructor:function(e,i){this.url=e,this.printGp=new h(this.url),this._handler=r.hitch(this,this._handler),i&&i.async&&(this.async=i.async),this._colorEvaluator=x("$..color")},_handler:function(e,i,t,a,n){try{var s;this.async?"esriJobSucceeded"===e.jobStatus&&this.printGp.getResultData(e.jobId,"Output_File",r.hitch(this,function(e){s=e.value,this._successHandler([s],"onComplete",t,n)})):(s=e[0].value,this._successHandler([s],"onComplete",t,n))}catch(l){this._errorHandler(l,a,n)}},execute:function(e,n,s){var o=this._handler,d=this._errorHandler,c=e.template||new b;c.hasOwnProperty("showLabels")||(c.showLabels=!0);var u,m=c.exportOptions;if(m){var f=m.width,p=m.height,g=m.dpi;u={outputSize:[f,p],dpi:g}}var h,v=c.layoutOptions,S=[];if(v){this.legendAll=!1,v.legendLayers?i.forEach(v.legendLayers,function(e){var r={};r.id=e.layerId,e.subLayerIds&&(r.subLayerIds=e.subLayerIds),S.push(r)}):this.legendAll=!0;var L,_;"Miles"===v.scalebarUnit||"Kilometers"===v.scalebarUnit?(L="esriKilometers",_="esriMiles"):("Meters"===v.scalebarUnit||"Feet"===v.scalebarUnit)&&(L="esriMeters",_="esriFeet");var x={esriMiles:"mi",esriKilometers:"km",esriFeet:"ft",esriMeters:"m"};h={titleText:v.titleText,authorText:v.authorText,copyrightText:v.copyrightText,customTextElements:v.customTextElements,scaleBarOptions:{metricUnit:L,metricLabel:x[L],nonMetricUnit:_,nonMetricLabel:x[_]},legendOptions:{operationalLayers:S}}}var I=e.map,D=this._getPrintDefinition(I,c);if(e.outSpatialReference&&(D.mapOptions.spatialReference=e.outSpatialReference.toJson()),e.template&&l.isDefined(e.template.showAttribution)&&(D.mapOptions.showAttribution=e.template.showAttribution),r.mixin(D,{exportOptions:u,layoutOptions:h}),this.allLayerslegend&&r.mixin(D.layoutOptions,{legendOptions:{operationalLayers:this.allLayerslegend}}),D.operationalLayers){var T,w,F,R,C=D.operationalLayers,k=function(e){return l.fixJson(r.mixin(e,{type:"esriSLS",cap:void 0,join:void 0,meterLimit:void 0}))};for(T=0;T<C.length;T++)if(C[T].featureCollection&&C[T].featureCollection.layers)for(w=0;w<C[T].featureCollection.layers.length;w++){var O=C[T].featureCollection.layers[w];if(O.layerDefinition&&O.layerDefinition.drawingInfo&&O.layerDefinition.drawingInfo.renderer&&O.layerDefinition.drawingInfo.renderer.symbol&&(R=O.layerDefinition.drawingInfo.renderer,"esriCLS"===R.symbol.type?R.symbol=k(R.symbol):R.symbol.outline&&"esriCLS"===R.symbol.outline.type&&(R.symbol.outline=k(R.symbol.outline))),O.featureSet&&O.featureSet.features)for(F=0;F<O.featureSet.features.length;F++)R=O.featureSet.features[F],R.symbol&&("esriCLS"===R.symbol.type?R.symbol=k(R.symbol):R.symbol.outline&&"esriCLS"===R.symbol.outline.type&&(R.symbol.outline=k(R.symbol.outline)))}}var M=t.toJson(l.fixJson(D)),P=c.format,j=c.layout,V={Web_Map_as_JSON:M,Format:P,Layout_Template:j};e.extraParameters&&(V=r.mixin(V,e.extraParameters));var E=new a(y._dfdCanceller),J=function(e,r){o(e,r,n,s,E)},B=function(e){d(e,s,E)};return this.async?E._pendingDfd=this.printGp.submitJob(V,J,null,B):E._pendingDfd=this.printGp.execute(V,J,B),E},onComplete:function(){},_createMultipointLayer:function(){return{layerDefinition:{name:"multipointLayer",geometryType:"esriGeometryMultipoint",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryMultipoint",features:[]}}},_createPolygonLayer:function(){return{layerDefinition:{name:"polygonLayer",geometryType:"esriGeometryPolygon",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPolygon",features:[]}}},_createPointLayer:function(){return{layerDefinition:{name:"pointLayer",geometryType:"esriGeometryPoint",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPoint",features:[]}}},_createPolylineLayer:function(){return{layerDefinition:{name:"polylineLayer",geometryType:"esriGeometryPolyline",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPolyline",features:[]}}},_convertSvgSymbol:function(e){if(!(n("ie")<=8||!e.path&&"image/svg+xml"!==e.contentType)){var r,i=_.createSurface(S.create("div"),1024,1024);r="image/svg+xml"===e.contentType?i.createObject(_.Image,{src:"data:image/svg+xml;base64,"+e.imageData,width:L.pt2px(e.width),height:L.pt2px(e.height),x:0,y:0}):i.createObject(_.Path,e.path).setFill(e.color).setStroke(e.outline),"pendingRender"in i&&i._render(!0);var t=i.rawNode.getContext("2d"),a=Math.ceil(r.getBoundingBox().width),s=Math.ceil(r.getBoundingBox().height),l=t.getImageData(r.getBoundingBox().x,r.getBoundingBox().y,a,s);t.canvas.width=a,t.canvas.height=s,t.putImageData(l,0,0);var o=t.canvas.toDataURL("image/png"),y={type:"esriPMS",imageData:o.substr(22,o.length),angle:e.angle,contentType:"image/png",height:e.size?e.size:L.px2pt(s),width:e.size?e.size*(a/s):L.px2pt(a),xoffset:e.xoffset,yoffset:e.yoffset};return i.destroy(),y}},_convertSvgRenderer:function(e){"simple"===e.type&&e.symbol&&(e.symbol.path||"image/svg+xml"===e.symbol.contentType)?e.symbol=this._convertSvgSymbol(e.symbol):"uniqueValue"===e.type?(e.defaultSymbol&&(e.defaultSymbol.path||"image/svg+xml"===e.defaultSymbol.contentType)&&(e.defaultSymbol=this._convertSvgSymbol(e.defaultSymbol)),e.uniqueValueInfos&&i.forEach(e.uniqueValueInfos,function(e){(e.symbol.path||"image/svg+xml"===e.symbol.contentType)&&(e.symbol=this._convertSvgSymbol(e.symbol))},this)):"classBreaks"===e.type&&(e.defaultSymbol&&(e.defaultSymbol.path||"image/svg+xml"===e.defaultSymbol.contentType)&&(e.defaultSymbol=this._convertSvgSymbol(e.defaultSymbol)),e.classBreakInfos&&i.forEach(e.classBreakInfos,function(e){(e.symbol.path||"image/svg+xml"===e.symbol.contentType)&&(e.symbol=this._convertSvgSymbol(e.symbol))},this))},_createFeatureCollection:function(e,t,a){var n=this._createPolygonLayer(),s=this._createPolylineLayer(),l=this._createPointLayer(),o=this._createMultipointLayer(),y=this._createPointLayer();if(y.layerDefinition.name="textLayer",delete y.layerDefinition.drawingInfo,("esri.layers.FeatureLayer"===e.declaredClass||"esri.layers.StreamLayer"===e.declaredClass)&&(n.layerDefinition.name=s.layerDefinition.name=l.layerDefinition.name=o.layerDefinition.name=r.getObject("arcgisProps.title",!1,e)||e.name||e.id),e.renderer&&!r.isFunction(e.renderer.attributeField)){var d=e.renderer.toJson();if("temporal"===d.type){var c={latestObservationRenderer:d.latestObservationRenderer,trackLinesRenderer:d.trackRenderer,observationAger:d.observationAger,renderer:d.observationRenderer},u={};e._trackIdField&&(u.trackIdField=e._trackIdField),e._startTimeField&&(u.startTimeField=e._startTimeField),e._endTimeField&&(u.endTimeField=e._endTimeField),n.layerDefinition.drawingInfo=c,n.layerDefinition.timeInfo=u,s.layerDefinition.drawingInfo=c,s.layerDefinition.timeInfo=u,l.layerDefinition.drawingInfo=c,l.layerDefinition.timeInfo=u,o.layerDefinition.drawingInfo=c,o.layerDefinition.timeInfo=u}else n.layerDefinition.drawingInfo.renderer=d,s.layerDefinition.drawingInfo.renderer=d,l.layerDefinition.drawingInfo.renderer=d,o.layerDefinition.drawingInfo.renderer=d}else delete n.layerDefinition.drawingInfo,delete s.layerDefinition.drawingInfo,delete l.layerDefinition.drawingInfo,delete o.layerDefinition.drawingInfo;var f=e.fields;f||!e.renderer||r.isFunction(e.renderer.attributeField)||("esri.renderer.ClassBreaksRenderer"===e.renderer.declaredClass?(f=[{name:e.renderer.attributeField,type:"esriFieldTypeDouble"}],e.renderer.normalizationField&&f.push({name:e.renderer.normalizationField,type:"esriFieldTypeDouble"})):"esri.renderer.UniqueValueRenderer"===e.renderer.declaredClass&&(f=[{name:e.renderer.attributeField,type:"esriFieldTypeString"}],e.renderer.attributeField2&&f.push({name:e.renderer.attributeField2,type:"esriFieldTypeString"}),e.renderer.attributeField3&&f.push({name:e.renderer.attributeField3,type:"esriFieldTypeString"}))),f&&(n.layerDefinition.fields=f,s.layerDefinition.fields=f,l.layerDefinition.fields=f,o.layerDefinition.fields=f);var p,g,h=e.graphics.length;for(g=0;h>g;g++){var b=e.graphics[g];if(b.visible!==!1&&b.geometry){if(p=b.toJson(),p.symbol&&p.symbol.outline&&p.symbol.outline.color&&p.symbol.outline.color[3]&&(p.symbol.outline.color[3]=255),e.renderer&&!p.symbol&&(r.isFunction(e.renderer.attributeField)||this._isFeatureCollectionRequired(e.renderer)||"esri.renderer.DotDensityRenderer"===e.renderer.declaredClass||a)){a=a||e.renderer;var v=a.getSymbol(b);if(!v)continue;p.symbol=v.toJson(),this._isFeatureCollectionRequired(a)&&this._applyVisualVariables(p.symbol,{renderer:a,graphic:b,symbol:v,mapResolution:t&&t.getResolutionInMeters(),mapScale:t&&t.getScale()})}switch(p.symbol&&(p.symbol.path||"image/svg+xml"===p.symbol.contentType?p.symbol=this._convertSvgSymbol(p.symbol):p.symbol.text&&delete p.attributes),b.geometry.type){case"polygon":n.featureSet.features.push(p);break;case"polyline":s.featureSet.features.push(p);break;case"point":p.symbol&&p.symbol.text?y.featureSet.features.push(p):l.featureSet.features.push(p);break;case"multipoint":o.featureSet.features.push(p);break;case"extent":p.geometry=m.fromExtent(b.geometry).toJson(),n.featureSet.features.push(p)}}}var S=[];n.featureSet.features.length>0&&S.push(n),s.featureSet.features.length>0&&S.push(s),o.featureSet.features.length>0&&S.push(o),l.featureSet.features.length>0&&S.push(l),y.featureSet.features.length>0&&S.push(y),i.forEach(S,function(e){if(e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer){var r=i.every(e.featureSet.features,function(e){return e.symbol});r&&delete e.layerDefinition.drawingInfo}}),i.forEach(S,function(e){e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&this._convertSvgRenderer(e.layerDefinition.drawingInfo.renderer)},this);var L={layers:S},_={id:e.id,opacity:e.opacity,minScale:e.minScale||0,maxScale:e.maxScale||0,featureCollection:L};return _},_getPrintDefinition:function(e,i){var t=this._createOperationalLayers(e,i),a={operationalLayers:t},n=e.extent,s=e.spatialReference;e.spatialReference._isWrappable()&&(n=n._normalize(!0),s=n.spatialReference);var l={mapOptions:{showAttribution:e.showAttribution,extent:n.toJson(),spatialReference:s.toJson()}};i.preserveScale&&r.mixin(l.mapOptions,{scale:i.outScale||p.getScale(e)}),e.timeExtent&&r.mixin(l.mapOptions,{time:[e.timeExtent.startTime.getTime(),e.timeExtent.endTime.getTime()]});var o={};return r.mixin(o,l,a),o},_createOperationalLayers:function(e,a){var n,s,l,y,d=[];this.legendAll?this.allLayerslegend=[]:this.allLayerslegend=null;var u=i.map(e.layerIds,e.getLayer,e);for(e._mapImageLyr&&u.push(e._mapImageLyr),n=0;n<u.length;n++)if(s=u[n],s.loaded&&s.visible)switch(l=s.declaredClass,y={id:s.id,title:r.getObject("arcgisProps.title",!1,s)||s.id,opacity:s.opacity,minScale:s.minScale||0,maxScale:s.maxScale||0},y=r.mixin(y,this._getUrlAndToken(s)),s.getNode()&&v.get(s.getNode(),"data-reference")&&(y._isRefLayer=!0),l){case"esri.layers.ArcGISDynamicMapServiceLayer":var m=[],p=!!s._params.layers;if(s._params.dynamicLayers){var g=t.fromJson(s._params.dynamicLayers);i.forEach(g,function(e){m.push({id:e.id,name:e.name,layerDefinition:e}),delete e.id,delete e.name,delete e.maxScale,delete e.minScale}),0===m.length&&(y.visibleLayers=[-1])}else if(s.supportsDynamicLayers){if(p||s.layerDefinitions||s.layerTimeOptions){var h=s.createDynamicLayerInfosFromLayerInfos(),b=null;p&&(b=s.visibleLayers),b=o._getVisibleLayers(h,b);var S=o._getLayersForScale(a.outScale||e.getScale(),h);i.forEach(h,function(e){if(!e.subLayerIds){var r=e.id;if(i.indexOf(b,r)>-1&&i.indexOf(S,r)>-1){var t={source:e.source.toJson()};s.layerDefinitions&&s.layerDefinitions[r]&&(t.definitionExpression=s.layerDefinitions[r]),s.layerTimeOptions&&s.layerTimeOptions[r]&&(t.layerTimeOptions=s.layerTimeOptions[r].toJson()),m.push({id:r,layerDefinition:t})}}}),0===m.length&&(y.visibleLayers=[-1])}}else i.forEach(s.layerInfos,function(e){var r={id:e.id,layerDefinition:{}};s.layerDefinitions&&s.layerDefinitions[e.id]&&(r.layerDefinition.definitionExpression=s.layerDefinitions[e.id]),s.layerTimeOptions&&s.layerTimeOptions[e.id]&&(r.layerDefinition.layerTimeOptions=s.layerTimeOptions[e.id].toJson()),(r.layerDefinition.definitionExpression||r.layerDefinition.layerTimeOptions)&&m.push(r)}),p&&(y.visibleLayers=s.visibleLayers);m.length&&(y.layers=m),d.push(y),this.allLayerslegend&&this.allLayerslegend.push({id:s.id,subLayerIds:s.visibleLayers});break;case"esri.layers.ArcGISImageServiceLayer":y=r.mixin(y,{url:s.url,bandIds:s.bandIds,compressionQuality:s.compressionQuality,format:s.format,interpolation:s.interpolation}),s.mosaicRule&&r.mixin(y,{mosaicRule:s.mosaicRule.toJson()}),s.renderingRule&&r.mixin(y,{renderingRule:s.renderingRule.toJson()}),d.push(y),this.allLayerslegend&&this.allLayerslegend.push({id:s.id});break;case"esri.layers.WMSLayer":y=r.mixin(y,{url:s.url,title:s.title,type:"wms",version:s.version,transparentBackground:s.imageTransparency,visibleLayers:s.visibleLayers}),d.push(y),this.allLayerslegend&&this.allLayerslegend.push({id:s.id,subLayerIds:s.visibleLayers});break;case"esri.virtualearth.VETiledLayer":var L=s.mapStyle;"aerialWithLabels"===L&&(L="Hybrid"),y=r.mixin(y,{visibility:s.visible,type:"BingMaps"+L,culture:s.culture,key:s.bingMapsKey}),d.push(y);break;case"esri.layers.OpenStreetMapLayer":y=r.mixin(y,{credits:s.copyright,type:"OpenStreetMap",url:c.getAbsoluteUrl(s.tileServers[0])}),d.push(y);break;case"esri.layers.WMTSLayer":y=r.mixin(y,{url:s.url,type:"wmts",layer:s._identifier,style:s._style,format:s.format,tileMatrixSet:s._tileMatrixSetId}),d.push(y);break;case"esri.layers.MapImageLayer":var _=s.getImages();i.forEach(_,function(e,r){e.href&&(y={id:s.id+"_image"+r,type:"image",title:s.id,minScale:s.minScale||0,maxScale:s.maxScale||0,opacity:s.opacity*e.opacity,extent:e.extent.toJson()},"data:image/png;base64,"===e.href.substr(0,22)?y.imageData=e.href.substr(22):y.url=e.href,d.push(y))});break;case"esri.layers.VectorTileLayer":var x=/^https?:\/\/basemaps(dev)?\.arcgis\.com(\/[^\/]+)?\/arcgis\/rest\/services\/World_Basemap\/VectorTileServer/i;!y._isRefLayer&&s.currentStyleInfo&&x.test(s.currentStyleInfo.serviceUrl)&&(y.url="http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",d.push(y));break;case"esri.layers.WebTiledLayer":var I=s.url.replace(/\$\{/g,"{");y=r.mixin(y,{type:"WebTiledLayer",urlTemplate:I,credits:s.copyright}),s.subDomains&&s.subDomains.length>0&&(y.subDomains=s.subDomains),s._wmtsInfo&&(y.wmtsInfo=s._wmtsInfo),delete y.url,d.push(y);break;default:(s.getTileUrl||s.getImageUrl)&&(y=r.mixin(y,{url:s.url}),d.push(y))}for(n=0;n<e.graphicsLayerIds.length;n++)if(s=e.getLayer(e.graphicsLayerIds[n]),s.loaded&&s.visible){l=s.declaredClass;var D;switch(l){case"esri.layers.FeatureLayer":case"esri.layers.LabelLayer":case"esri.layers.CSVLayer":case"esri.layers.StreamLayer":if("esri.layers.LabelLayer"===l&&!a.showLabels||s.renderer&&"esri.renderer.HeatmapRenderer"===s.renderer.declaredClass)continue;if(D=null,s.url&&s.renderer&&("esri.renderer.ScaleDependentRenderer"===s.renderer.declaredClass?"scale"===s.renderer.rangeType?D=s.renderer.getRendererInfoByScale(e.getScale())&&s.renderer.getRendererInfoByScale(e.getScale()).renderer:"zoom"===s.renderer.rangeType&&(D=s.renderer.getRendererInfoByZoom(e.getZoom())&&s.renderer.getRendererInfoByZoom(e.getZoom()).renderer):D=s.renderer),D&&("esri.renderer.SimpleRenderer"===D.declaredClass||"esri.renderer.TemporalRenderer"===D.declaredClass||r.isString(D.attributeField)&&s._getField(D.attributeField,!0))&&!this._isFeatureCollectionRequired(D)&&"esri.renderer.DotDensityRenderer"!==D.declaredClass&&"esri.layers.CSVLayer"!==s.declaredClass&&"esri.layers.StreamLayer"!==s.declaredClass){if(y={id:s.id,title:r.getObject("arcgisProps.title",!1,s)||s.id,opacity:s.opacity,minScale:s.minScale||0,maxScale:s.maxScale||0,layerDefinition:{drawingInfo:{renderer:D.toJson()}}},y=r.mixin(y,this._getUrlAndToken(s)),"esri.renderer.TemporalRenderer"===D.declaredClass){var T=y.layerDefinition.drawingInfo;T.latestObservationRenderer=T.renderer.latestObservationRenderer,T.trackLinesRenderer=T.renderer.trackRenderer,T.observationAger=T.renderer.observationAger,T.renderer=T.renderer.observationRenderer,s._trackIdField&&(y.layerDefinition.timeInfo={trackIdField:s._trackIdField})}if(this._convertSvgRenderer(y.layerDefinition.drawingInfo.renderer),s.opacity<1||"esri.renderer.TemporalRenderer"===D.declaredClass||this._updateLayerOpacity(y)){if(s._params.source){var w=s._params.source.toJson();r.mixin(y.layerDefinition,{source:w})}if(s.getDefinitionExpression()&&r.mixin(y.layerDefinition,{definitionExpression:s.getDefinitionExpression()}),2!==s.mode){if(s.getSelectedFeatures().length>0){var F=i.map(s.getSelectedFeatures(),function(e){return e.attributes[s.objectIdField]});F.length>0&&s.getSelectionSymbol()&&r.mixin(y,{selectionObjectIds:F,selectionSymbol:s.getSelectionSymbol().toJson()})}}else{var R=i.map(s.getSelectedFeatures(),function(e){return e.attributes[s.objectIdField]});if(0===R.length||!s._params.drawMode)break;r.mixin(y.layerDefinition,{objectIds:R});var C=null;s.getSelectionSymbol()&&(C=new f(s.getSelectionSymbol())),r.mixin(y.layerDefinition.drawingInfo,{renderer:C&&C.toJson()})}}else y=this._createFeatureCollection(s,e)}else y=D&&(this._isFeatureCollectionRequired(D)||"esri.renderer.DotDensityRenderer"===D.declaredClass)?this._createFeatureCollection(s,e,D):this._createFeatureCollection(s,e);d.push(y),this.allLayerslegend&&this.allLayerslegend.push({id:s.id});break;case"esri.layers.GraphicsLayer":case"esri.layers.WFSLayer":y=this._createFeatureCollection(s,e),d.push(y),this.allLayerslegend&&this.allLayerslegend.push({id:s.id})}}return e.graphics&&e.graphics.graphics.length>0&&(y=this._createFeatureCollection(e.graphics,e),d.push(y)),e._labels&&a.showLabels&&(y=this._createFeatureCollection(e._labels,e),d.push(y)),i.forEach(d,function(e,r,i){e._isRefLayer&&(delete e._isRefLayer,i.splice(r,1),i.push(e))}),d},_getUrlAndToken:function(e){return{token:e._getToken(),url:e._url?e._url.path:null}},_updateLayerOpacity:function(e){var t=this._colorEvaluator(e);t=i.filter(t,function(e){return r.isArray(e)&&4===e.length});var a=!0;if(t.length){var n,s=t[0][3];for(n=1;n<t.length;n++)if(s!==t[n][3]){a=!1;break}if(a)for(e.opacity=s/255,n=0;n<t.length;n++)t[n][3]=255}return a},_isFeatureCollectionRequired:function(e){return e.hasVisualVariables("sizeInfo")||e.hasVisualVariables("colorInfo")||e.hasVisualVariables("opacityInfo")},_getVariable:function(e,r,i){var t,a;return e&&(t=e.getVisualVariablesForType(r,i),a=t&&t[0]),a},_applyVisualVariables:function(e,r){var i=r.renderer,t=r.graphic,a=r.symbol,n=r.mapResolution,s=r.mapScale,l=a.type;if("textsymbol"!==l&&"shieldlabelsymbol"!==l){var o=this._getVariable(i,"sizeInfo",!1),y=this._getVariable(i,"colorInfo",!1),c=this._getVariable(i,"opacityInfo",!1);if(a instanceof g&&(o=this._getVariable(i,"sizeInfo","outline")||o),o){var u=i.getSize(t,{sizeInfo:o,shape:"simplemarkersymbol"===l?a.style:null,resolution:n,scale:s});null!=u&&("simplemarkersymbol"===l?e.size=L.px2pt(u):"picturemarkersymbol"===l?(e.width=L.px2pt(u),e.height=L.px2pt(u)):"simplelinesymbol"===l?e.width=L.px2pt(u):e.outline&&(e.outline.width=L.px2pt(u)))}if(y){var m=i.getColor(t,{colorInfo:y});m&&("simplemarkersymbol"===l||"simplelinesymbol"===l||"simplefillsymbol"===l)&&(e.color=d.toJsonColor(m))}if(c){var f=i.getOpacity(t,{opacityInfo:c});null!=f&&e.color&&(e.color[3]=Math.round(255*f))}}}});return n("extend-esri")&&r.setObject("tasks.PrintTask",I,s),I});