/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "de9ffc72564cabc62d3d";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "background";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/background/index.js")(__webpack_require__.s = "./src/background/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js":
/*!**********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/define-property.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/define-property */ \"./node_modules/core-js/library/fn/object/define-property.js\"), __esModule: true };\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanM/NDg0OSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQkFBa0IiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/babel-runtime/core-js/object/define-property.js\n");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/classCallCheck.js":
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/classCallCheck.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nexports.default = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzPzg4MjciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/babel-runtime/helpers/classCallCheck.js\n");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/createClass.js":
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/createClass.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ \"./node_modules/babel-runtime/core-js/object/define-property.js\");\n\nvar _defineProperty2 = _interopRequireDefault(_defineProperty);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      (0, _defineProperty2.default)(target, descriptor.key, descriptor);\n    }\n  }\n\n  return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) defineProperties(Constructor, staticProps);\n    return Constructor;\n  };\n}();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzPzU3YmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/babel-runtime/helpers/createClass.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.define-property */ \"./node_modules/core-js/library/modules/es6.object.define-property.js\");\nvar $Object = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object;\nmodule.exports = function defineProperty(it, key, desc) {\n  return $Object.defineProperty(it, key, desc);\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanM/NDU0ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/fn/object/define-property.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanM/NzlhYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_a-function.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcz9lNGFlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_an-object.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var core = module.exports = { version: '2.5.7' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanM/NTg0YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsdUNBQXVDIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS43JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_core.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// optional / simple context binding\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcz9kODY0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_ctx.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzPzhlNjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLGlDQUFpQyxRQUFRLG1CQUFtQixVQUFVLEVBQUUsRUFBRTtBQUMxRSxDQUFDIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_descriptors.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nvar document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").document;\n// typeof document.createElement is 'object' in old IE\nvar is = isObject(document) && isObject(document.createElement);\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanM/MWVjOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_dom-create.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var IS_WRAP = type & $export.W;\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE];\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];\n  var key, own, out;\n  if (IS_GLOBAL) source = name;\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined;\n    if (own && has(exports, key)) continue;\n    // export native or passed\n    out = own ? target[key] : source[key];\n    // prevent global pollution for namespaces\n    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]\n    // bind timers to global for call from export context\n    : IS_BIND && own ? ctx(out, global)\n    // wrap global constructors for prevent change them in library\n    : IS_WRAP && target[key] == out ? (function (C) {\n      var F = function (a, b, c) {\n        if (this instanceof C) {\n          switch (arguments.length) {\n            case 0: return new C();\n            case 1: return new C(a);\n            case 2: return new C(a, b);\n          } return new C(a, b, c);\n        } return C.apply(this, arguments);\n      };\n      F[PROTOTYPE] = C[PROTOTYPE];\n      return F;\n    // make static versions for prototype methods\n    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;\n    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%\n    if (IS_PROTO) {\n      (exports.virtual || (exports.virtual = {}))[key] = out;\n      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%\n      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);\n    }\n  }\n};\n// type bitmap\n$export.F = 1;   // forced\n$export.G = 2;   // global\n$export.S = 4;   // static\n$export.P = 8;   // proto\n$export.B = 16;  // bind\n$export.W = 32;  // wrap\n$export.U = 64;  // safe\n$export.R = 128; // real proto method for `library`\nmodule.exports = $export;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcz82M2I2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBLGtGQUFrRjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_export.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzPzI5NGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_fails.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math\n  ? window : typeof self != 'undefined' && self.Math == Math ? self\n  // eslint-disable-next-line no-new-func\n  : Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcz9lNTNkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_global.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcz8wN2UzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_has.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanM/MzVlOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_hide.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") && !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/library/modules/_dom-create.js\")('div'), 'a', { get: function () { return 7; } }).a != 7;\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzPzc5NGIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSwrSUFBc0UsbUJBQW1CLFVBQVUsRUFBRSxFQUFFO0FBQ3ZHLENBQUMiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_ie8-dom-define.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcz9mNzcyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_is-object.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/library/modules/_ie8-dom-define.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\nvar dP = Object.defineProperty;\n\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcz9kOWY2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_object-dp.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanM/YWViZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_property-desc.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcz8xYmMzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/_to-primitive.js\n");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)\n$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f });\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanM/NDZhNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0EsaUpBQXVFLG9IQUE0QyIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/core-js/library/modules/es6.object.define-property.js\n");

/***/ }),

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _pptrActions = __webpack_require__(/*! ../code-generator/pptr-actions */ \"./src/code-generator/pptr-actions.js\");\n\nvar _pptrActions2 = _interopRequireDefault(_pptrActions);\n\nvar _extensionControlMessages = __webpack_require__(/*! ../models/extension-control-messages */ \"./src/models/extension-control-messages.js\");\n\nvar _extensionControlMessages2 = _interopRequireDefault(_extensionControlMessages);\n\nvar _extensionUiActions = __webpack_require__(/*! ../models/extension-ui-actions */ \"./src/models/extension-ui-actions.js\");\n\nvar _extensionUiActions2 = _interopRequireDefault(_extensionUiActions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RecordingController = function () {\n  function RecordingController() {\n    (0, _classCallCheck3.default)(this, RecordingController);\n\n    this.recordState = false;\n    this._recording = [];\n    this._boundedStartHandler = null;\n    this._boundedStopHandler = null;\n    this._boundedMessageHandler = null;\n    this._boundedNavigationHandler = null;\n    this._boundedWaitHandler = null;\n    this._boundedMenuHandler = null;\n    this._boundedKeyCommandHandler = null;\n    this._badgeState = '';\n    this._isPaused = false;\n\n    // Some events are sent double on page navigations to simplify the event recorder.\n    // We keep some simple state to disregard events if needed.\n    this._hasGoto = false;\n    this._hasViewPort = false;\n\n    this._menuId = 'PUPPETEER_RECORDER_CONTEXT_MENU';\n    this._menuOptions = {\n      SCREENSHOT: 'SCREENSHOT',\n      SCREENSHOT_CLIPPED: 'SCREENSHOT_CLIPPED'\n    };\n  }\n\n  (0, _createClass3.default)(RecordingController, [{\n    key: 'boot',\n    value: function boot() {\n      var _this = this;\n\n      chrome.extension.onConnect.addListener(function (port) {\n        console.log('listeners connected');\n        port.onMessage.addListener(function (msg) {\n          if (msg.action && msg.action === _extensionUiActions2.default.START) _this.start();\n          if (msg.action && msg.action === _extensionUiActions2.default.STOP) _this.stop();\n          if (msg.action && msg.action === _extensionUiActions2.default.CLEAN_UP) _this.cleanUp();\n          if (msg.action && msg.action === _extensionUiActions2.default.PAUSE) _this.pause();\n          if (msg.action && msg.action === _extensionUiActions2.default.UN_PAUSE) _this.unPause();\n        });\n      });\n\n      // chrome.browserAction.onClicked.addListener(function (tab) {\n      //   chrome.runtime.sendMessage()\n      //   chrome.tabs.executeScript({\n      //     code: `\n      //       console.log('HERE IS MY CODE')\n      //     `\n      //   })\n      // })\n    }\n  }, {\n    key: 'start',\n    value: function start() {\n      var _this2 = this;\n\n      console.debug('start recording');\n      this.cleanUp(function () {\n        _this2._badgeState = 'rec';\n\n        _this2._hasGoto = false;\n        _this2._hasViewPort = false;\n\n        _this2.injectScript();\n\n        _this2._boundedMessageHandler = _this2.handleMessage.bind(_this2);\n        _this2._boundedNavigationHandler = _this2.handleNavigation.bind(_this2);\n        _this2._boundedWaitHandler = _this2.handleWait.bind(_this2);\n\n        chrome.runtime.onMessage.addListener(_this2._boundedMessageHandler);\n        chrome.webNavigation.onCompleted.addListener(_this2._boundedNavigationHandler);\n        chrome.webNavigation.onBeforeNavigate.addListener(_this2._boundedWaitHandler);\n\n        chrome.browserAction.setIcon({ path: './images/icon-green.png' });\n        chrome.browserAction.setBadgeText({ text: _this2._badgeState });\n        chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });\n\n        /**\n         * Right click menu setup\n         */\n\n        chrome.contextMenus.removeAll();\n\n        // add the parent and its children\n\n        chrome.contextMenus.create({\n          id: _this2._menuId,\n          title: 'Puppeteer Recorder',\n          contexts: ['all']\n        });\n\n        chrome.contextMenus.create({\n          id: _this2._menuId + _this2._menuOptions.SCREENSHOT,\n          title: 'Take Screenshot (Ctrl+Shift+A)',\n          parentId: _this2._menuId,\n          contexts: ['all']\n        });\n\n        chrome.contextMenus.create({\n          id: _this2._menuId + _this2._menuOptions.SCREENSHOT_CLIPPED,\n          title: 'Take Screenshot Clipped (Ctrl+Shift+S)',\n          parentId: _this2._menuId,\n          contexts: ['all']\n        });\n\n        // add the handlers\n\n        _this2._boundedMenuHandler = _this2.handleMenuInteraction.bind(_this2);\n        chrome.contextMenus.onClicked.addListener(_this2._boundedMenuHandler);\n\n        _this2._boundedKeyCommandHandler = _this2.handleKeyCommands.bind(_this2);\n        chrome.commands.onCommand.addListener(_this2._boundedKeyCommandHandler);\n      });\n    }\n  }, {\n    key: 'stop',\n    value: function stop() {\n      console.debug('stop recording');\n      this._badgeState = this._recording.length > 0 ? '1' : '';\n\n      chrome.runtime.onMessage.removeListener(this._boundedMessageHandler);\n      chrome.webNavigation.onCompleted.removeListener(this._boundedNavigationHandler);\n      chrome.webNavigation.onBeforeNavigate.removeListener(this._boundedWaitHandler);\n      chrome.contextMenus.onClicked.removeListener(this._boundedMenuHandler);\n\n      chrome.browserAction.setIcon({ path: './images/icon-black.png' });\n      chrome.browserAction.setBadgeText({ text: this._badgeState });\n      chrome.browserAction.setBadgeBackgroundColor({ color: '#45C8F1' });\n\n      chrome.storage.local.set({ recording: this._recording }, function () {\n        console.debug('recording stored');\n      });\n    }\n  }, {\n    key: 'pause',\n    value: function pause() {\n      console.debug('pause');\n      this._badgeState = '❚❚';\n      chrome.browserAction.setBadgeText({ text: this._badgeState });\n      this._isPaused = true;\n    }\n  }, {\n    key: 'unPause',\n    value: function unPause() {\n      console.debug('unpause');\n      this._badgeState = 'rec';\n      chrome.browserAction.setBadgeText({ text: this._badgeState });\n      this._isPaused = false;\n    }\n  }, {\n    key: 'cleanUp',\n    value: function cleanUp(cb) {\n      console.debug('cleanup');\n      this._recording = [];\n      chrome.browserAction.setBadgeText({ text: '' });\n      chrome.storage.local.remove('recording', function () {\n        console.debug('stored recording cleared');\n        if (cb) cb();\n      });\n    }\n  }, {\n    key: 'recordCurrentUrl',\n    value: function recordCurrentUrl(href) {\n      if (!this._hasGoto) {\n        console.debug('recording goto* for:', href);\n        this.handleMessage({ selector: undefined, value: undefined, action: _pptrActions2.default.GOTO, href: href });\n        this._hasGoto = true;\n      }\n    }\n  }, {\n    key: 'recordCurrentViewportSize',\n    value: function recordCurrentViewportSize(value) {\n      if (!this._hasViewPort) {\n        this.handleMessage({ selector: undefined, value: value, action: _pptrActions2.default.VIEWPORT });\n        this._hasViewPort = true;\n      }\n    }\n  }, {\n    key: 'recordNavigation',\n    value: function recordNavigation() {\n      this.handleMessage({ selector: undefined, value: undefined, action: _pptrActions2.default.NAVIGATION });\n    }\n  }, {\n    key: 'recordScreenshot',\n    value: function recordScreenshot(value) {\n      this.handleMessage({ selector: undefined, value: value, action: _pptrActions2.default.SCREENSHOT });\n    }\n  }, {\n    key: 'handleMessage',\n    value: function handleMessage(msg, sender) {\n      if (msg.control) return this.handleControlMessage(msg, sender);\n\n      // to account for clicks etc. we need to record the frameId and url to later target the frame in playback\n      msg.frameId = sender ? sender.frameId : null;\n      msg.frameUrl = sender ? sender.url : null;\n\n      if (!this._isPaused) {\n        this._recording.push(msg);\n        chrome.storage.local.set({ recording: this._recording }, function () {\n          console.debug('stored recording updated');\n        });\n      }\n    }\n  }, {\n    key: 'handleControlMessage',\n    value: function handleControlMessage(msg, sender) {\n      if (msg.control === _extensionControlMessages2.default.EVENT_RECORDER_STARTED) chrome.browserAction.setBadgeText({ text: this._badgeState });\n      if (msg.control === _extensionControlMessages2.default.GET_VIEWPORT_SIZE) this.recordCurrentViewportSize(msg.coordinates);\n      if (msg.control === _extensionControlMessages2.default.GET_CURRENT_URL) this.recordCurrentUrl(msg.href);\n      if (msg.control === _extensionControlMessages2.default.GET_SCREENSHOT) this.recordScreenshot(msg.value);\n    }\n  }, {\n    key: 'handleNavigation',\n    value: function handleNavigation(_ref) {\n      var frameId = _ref.frameId;\n\n      console.debug('frameId is:', frameId);\n      this.injectScript();\n      if (frameId === 0) {\n        this.recordNavigation();\n      }\n    }\n  }, {\n    key: 'handleMenuInteraction',\n    value: function handleMenuInteraction(info, tab) {\n      console.debug('context menu clicked');\n      switch (info.menuItemId) {\n        case this._menuId + this._menuOptions.SCREENSHOT:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_MODE);\n          break;\n        case this._menuId + this._menuOptions.SCREENSHOT_CLIPPED:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_CLIPPED_MODE);\n          break;\n      }\n    }\n  }, {\n    key: 'handleKeyCommands',\n    value: function handleKeyCommands(command) {\n      switch (command) {\n        case _extensionUiActions2.default.TOGGLE_SCREENSHOT_MODE:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_MODE);\n          break;\n        case _extensionUiActions2.default.TOGGLE_SCREENSHOT_CLIPPED_MODE:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_CLIPPED_MODE);\n          break;\n      }\n    }\n  }, {\n    key: 'toggleScreenShotMode',\n    value: function toggleScreenShotMode(action) {\n      console.debug('toggling screenshot mode');\n      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {\n        chrome.tabs.sendMessage(tabs[0].id, { action: action });\n      });\n    }\n  }, {\n    key: 'handleWait',\n    value: function handleWait() {\n      chrome.browserAction.setBadgeText({ text: 'wait' });\n    }\n  }, {\n    key: 'injectScript',\n    value: function injectScript() {\n      chrome.tabs.executeScript({ file: 'content-script.js', allFrames: true });\n    }\n  }]);\n  return RecordingController;\n}();\n\nconsole.debug('booting recording controller');\nwindow.recordingController = new RecordingController();\nwindow.recordingController.boot();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9pbmRleC5qcz9hYzI4Il0sIm5hbWVzIjpbIlJlY29yZGluZ0NvbnRyb2xsZXIiLCJyZWNvcmRTdGF0ZSIsIl9yZWNvcmRpbmciLCJfYm91bmRlZFN0YXJ0SGFuZGxlciIsIl9ib3VuZGVkU3RvcEhhbmRsZXIiLCJfYm91bmRlZE1lc3NhZ2VIYW5kbGVyIiwiX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlciIsIl9ib3VuZGVkV2FpdEhhbmRsZXIiLCJfYm91bmRlZE1lbnVIYW5kbGVyIiwiX2JvdW5kZWRLZXlDb21tYW5kSGFuZGxlciIsIl9iYWRnZVN0YXRlIiwiX2lzUGF1c2VkIiwiX2hhc0dvdG8iLCJfaGFzVmlld1BvcnQiLCJfbWVudUlkIiwiX21lbnVPcHRpb25zIiwiU0NSRUVOU0hPVCIsIlNDUkVFTlNIT1RfQ0xJUFBFRCIsImNocm9tZSIsImV4dGVuc2lvbiIsIm9uQ29ubmVjdCIsImFkZExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInBvcnQiLCJvbk1lc3NhZ2UiLCJtc2ciLCJhY3Rpb24iLCJhY3Rpb25zIiwiU1RBUlQiLCJzdGFydCIsIlNUT1AiLCJzdG9wIiwiQ0xFQU5fVVAiLCJjbGVhblVwIiwiUEFVU0UiLCJwYXVzZSIsIlVOX1BBVVNFIiwidW5QYXVzZSIsImRlYnVnIiwiaW5qZWN0U2NyaXB0IiwiaGFuZGxlTWVzc2FnZSIsImJpbmQiLCJoYW5kbGVOYXZpZ2F0aW9uIiwiaGFuZGxlV2FpdCIsInJ1bnRpbWUiLCJ3ZWJOYXZpZ2F0aW9uIiwib25Db21wbGV0ZWQiLCJvbkJlZm9yZU5hdmlnYXRlIiwiYnJvd3NlckFjdGlvbiIsInNldEljb24iLCJwYXRoIiwic2V0QmFkZ2VUZXh0IiwidGV4dCIsInNldEJhZGdlQmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJjb250ZXh0TWVudXMiLCJyZW1vdmVBbGwiLCJjcmVhdGUiLCJpZCIsInRpdGxlIiwiY29udGV4dHMiLCJwYXJlbnRJZCIsImhhbmRsZU1lbnVJbnRlcmFjdGlvbiIsIm9uQ2xpY2tlZCIsImhhbmRsZUtleUNvbW1hbmRzIiwiY29tbWFuZHMiLCJvbkNvbW1hbmQiLCJsZW5ndGgiLCJyZW1vdmVMaXN0ZW5lciIsInN0b3JhZ2UiLCJsb2NhbCIsInNldCIsInJlY29yZGluZyIsImNiIiwicmVtb3ZlIiwiaHJlZiIsInNlbGVjdG9yIiwidW5kZWZpbmVkIiwidmFsdWUiLCJwcHRyQWN0aW9ucyIsIkdPVE8iLCJWSUVXUE9SVCIsIk5BVklHQVRJT04iLCJzZW5kZXIiLCJjb250cm9sIiwiaGFuZGxlQ29udHJvbE1lc3NhZ2UiLCJmcmFtZUlkIiwiZnJhbWVVcmwiLCJ1cmwiLCJwdXNoIiwiY3RybCIsIkVWRU5UX1JFQ09SREVSX1NUQVJURUQiLCJHRVRfVklFV1BPUlRfU0laRSIsInJlY29yZEN1cnJlbnRWaWV3cG9ydFNpemUiLCJjb29yZGluYXRlcyIsIkdFVF9DVVJSRU5UX1VSTCIsInJlY29yZEN1cnJlbnRVcmwiLCJHRVRfU0NSRUVOU0hPVCIsInJlY29yZFNjcmVlbnNob3QiLCJyZWNvcmROYXZpZ2F0aW9uIiwiaW5mbyIsInRhYiIsIm1lbnVJdGVtSWQiLCJ0b2dnbGVTY3JlZW5TaG90TW9kZSIsIlRPR0dMRV9TQ1JFRU5TSE9UX01PREUiLCJUT0dHTEVfU0NSRUVOU0hPVF9DTElQUEVEX01PREUiLCJjb21tYW5kIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsInNlbmRNZXNzYWdlIiwiZXhlY3V0ZVNjcmlwdCIsImZpbGUiLCJhbGxGcmFtZXMiLCJ3aW5kb3ciLCJyZWNvcmRpbmdDb250cm9sbGVyIiwiYm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLG1CO0FBQ0osaUNBQWU7QUFBQTs7QUFDYixTQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCLElB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Q0FBWUssYUFBWixDQUEwQixFQUFFQyxNQUFNLG1CQUFSLEVBQTZCQyxXQUFXLElBQXhDLEVBQTFCO0FBQ0Q7Ozs7O0FBR0g3RixRQUFRaUIsS0FBUixDQUFjLDhCQUFkO0FBQ0E2RSxPQUFPQyxtQkFBUCxHQUE2QixJQUFJckgsbUJBQUosRUFBN0I7QUFDQW9ILE9BQU9DLG1CQUFQLENBQTJCQyxJQUEzQiIsImZpbGUiOiIuL3NyYy9iYWNrZ3JvdW5kL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBwdHJBY3Rpb25zIGZyb20gJy4uL2NvZGUtZ2VuZXJhdG9yL3BwdHItYWN0aW9ucydcbmltcG9ydCBjdHJsIGZyb20gJy4uL21vZGVscy9leHRlbnNpb24tY29udHJvbC1tZXNzYWdlcydcbmltcG9ydCBhY3Rpb25zIGZyb20gJy4uL21vZGVscy9leHRlbnNpb24tdWktYWN0aW9ucydcblxuY2xhc3MgUmVjb3JkaW5nQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnJlY29yZFN0YXRlID0gZmFsc2VcbiAgICB0aGlzLl9yZWNvcmRpbmcgPSBbXVxuICAgIHRoaXMuX2JvdW5kZWRTdGFydEhhbmRsZXIgPSBudWxsXG4gICAgdGhpcy5fYm91bmRlZFN0b3BIYW5kbGVyID0gbnVsbFxuICAgIHRoaXMuX2JvdW5kZWRNZXNzYWdlSGFuZGxlciA9IG51bGxcbiAgICB0aGlzLl9ib3VuZGVkTmF2aWdhdGlvbkhhbmRsZXIgPSBudWxsXG4gICAgdGhpcy5fYm91bmRlZFdhaXRIYW5kbGVyID0gbnVsbFxuICAgIHRoaXMuX2JvdW5kZWRNZW51SGFuZGxlciA9IG51bGxcbiAgICB0aGlzLl9ib3VuZGVkS2V5Q29tbWFuZEhhbmRsZXIgPSBudWxsXG4gICAgdGhpcy5fYmFkZ2VTdGF0ZSA9ICcnXG4gICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZVxuXG4gICAgLy8gU29tZSBldmVudHMgYXJlIHNlbnQgZG91YmxlIG9uIHBhZ2UgbmF2aWdhdGlvbnMgdG8gc2ltcGxpZnkgdGhlIGV2ZW50IHJlY29yZGVyLlxuICAgIC8vIFdlIGtlZXAgc29tZSBzaW1wbGUgc3RhdGUgdG8gZGlzcmVnYXJkIGV2ZW50cyBpZiBuZWVkZWQuXG4gICAgdGhpcy5faGFzR290byA9IGZhbHNlXG4gICAgdGhpcy5faGFzVmlld1BvcnQgPSBmYWxzZVxuXG4gICAgdGhpcy5fbWVudUlkID0gJ1BVUFBFVEVFUl9SRUNPUkRFUl9DT05URVhUX01FTlUnXG4gICAgdGhpcy5fbWVudU9wdGlvbnMgPSB7XG4gICAgICBTQ1JFRU5TSE9UOiAnU0NSRUVOU0hPVCcsXG4gICAgICBTQ1JFRU5TSE9UX0NMSVBQRUQ6ICdTQ1JFRU5TSE9UX0NMSVBQRUQnXG4gICAgfVxuICB9XG5cbiAgYm9vdCAoKSB7XG4gICAgY2hyb21lLmV4dGVuc2lvbi5vbkNvbm5lY3QuYWRkTGlzdGVuZXIocG9ydCA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnbGlzdGVuZXJzIGNvbm5lY3RlZCcpXG4gICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtc2cgPT4ge1xuICAgICAgICBpZiAobXNnLmFjdGlvbiAmJiBtc2cuYWN0aW9uID09PSBhY3Rpb25zLlNUQVJUKSB0aGlzLnN0YXJ0KClcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gYWN0aW9ucy5TVE9QKSB0aGlzLnN0b3AoKVxuICAgICAgICBpZiAobXNnLmFjdGlvbiAmJiBtc2cuYWN0aW9uID09PSBhY3Rpb25zLkNMRUFOX1VQKSB0aGlzLmNsZWFuVXAoKVxuICAgICAgICBpZiAobXNnLmFjdGlvbiAmJiBtc2cuYWN0aW9uID09PSBhY3Rpb25zLlBBVVNFKSB0aGlzLnBhdXNlKClcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gYWN0aW9ucy5VTl9QQVVTRSkgdGhpcy51blBhdXNlKClcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAodGFiKSB7XG4gICAgLy8gICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgpXG4gICAgLy8gICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHtcbiAgICAvLyAgICAgY29kZTogYFxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdIRVJFIElTIE1ZIENPREUnKVxuICAgIC8vICAgICBgXG4gICAgLy8gICB9KVxuICAgIC8vIH0pXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgY29uc29sZS5kZWJ1Zygnc3RhcnQgcmVjb3JkaW5nJylcbiAgICB0aGlzLmNsZWFuVXAoKCkgPT4ge1xuICAgICAgdGhpcy5fYmFkZ2VTdGF0ZSA9ICdyZWMnXG5cbiAgICAgIHRoaXMuX2hhc0dvdG8gPSBmYWxzZVxuICAgICAgdGhpcy5faGFzVmlld1BvcnQgPSBmYWxzZVxuXG4gICAgICB0aGlzLmluamVjdFNjcmlwdCgpXG5cbiAgICAgIHRoaXMuX2JvdW5kZWRNZXNzYWdlSGFuZGxlciA9IHRoaXMuaGFuZGxlTWVzc2FnZS5iaW5kKHRoaXMpXG4gICAgICB0aGlzLl9ib3VuZGVkTmF2aWdhdGlvbkhhbmRsZXIgPSB0aGlzLmhhbmRsZU5hdmlnYXRpb24uYmluZCh0aGlzKVxuICAgICAgdGhpcy5fYm91bmRlZFdhaXRIYW5kbGVyID0gdGhpcy5oYW5kbGVXYWl0LmJpbmQodGhpcylcblxuICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKHRoaXMuX2JvdW5kZWRNZXNzYWdlSGFuZGxlcilcbiAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKHRoaXMuX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlcilcbiAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGUuYWRkTGlzdGVuZXIodGhpcy5fYm91bmRlZFdhaXRIYW5kbGVyKVxuXG4gICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHsgcGF0aDogJy4vaW1hZ2VzL2ljb24tZ3JlZW4ucG5nJyB9KVxuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGhpcy5fYmFkZ2VTdGF0ZSB9KVxuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogJyNGRjAwMDAnIH0pXG5cbiAgICAgIC8qKlxuICAgICAgICogUmlnaHQgY2xpY2sgbWVudSBzZXR1cFxuICAgICAgICovXG5cbiAgICAgIGNocm9tZS5jb250ZXh0TWVudXMucmVtb3ZlQWxsKClcblxuICAgICAgLy8gYWRkIHRoZSBwYXJlbnQgYW5kIGl0cyBjaGlsZHJlblxuXG4gICAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiB0aGlzLl9tZW51SWQsXG4gICAgICAgIHRpdGxlOiAnUHVwcGV0ZWVyIFJlY29yZGVyJyxcbiAgICAgICAgY29udGV4dHM6IFsnYWxsJ11cbiAgICAgIH0pXG5cbiAgICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IHRoaXMuX21lbnVJZCArIHRoaXMuX21lbnVPcHRpb25zLlNDUkVFTlNIT1QsXG4gICAgICAgIHRpdGxlOiAnVGFrZSBTY3JlZW5zaG90IChDdHJsK1NoaWZ0K0EpJyxcbiAgICAgICAgcGFyZW50SWQ6IHRoaXMuX21lbnVJZCxcbiAgICAgICAgY29udGV4dHM6IFsnYWxsJ11cbiAgICAgIH0pXG5cbiAgICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IHRoaXMuX21lbnVJZCArIHRoaXMuX21lbnVPcHRpb25zLlNDUkVFTlNIT1RfQ0xJUFBFRCxcbiAgICAgICAgdGl0bGU6ICdUYWtlIFNjcmVlbnNob3QgQ2xpcHBlZCAoQ3RybCtTaGlmdCtTKScsXG4gICAgICAgIHBhcmVudElkOiB0aGlzLl9tZW51SWQsXG4gICAgICAgIGNvbnRleHRzOiBbJ2FsbCddXG4gICAgICB9KVxuXG4gICAgICAvLyBhZGQgdGhlIGhhbmRsZXJzXG5cbiAgICAgIHRoaXMuX2JvdW5kZWRNZW51SGFuZGxlciA9IHRoaXMuaGFuZGxlTWVudUludGVyYWN0aW9uLmJpbmQodGhpcylcbiAgICAgIGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKHRoaXMuX2JvdW5kZWRNZW51SGFuZGxlcilcblxuICAgICAgdGhpcy5fYm91bmRlZEtleUNvbW1hbmRIYW5kbGVyID0gdGhpcy5oYW5kbGVLZXlDb21tYW5kcy5iaW5kKHRoaXMpXG4gICAgICBjaHJvbWUuY29tbWFuZHMub25Db21tYW5kLmFkZExpc3RlbmVyKHRoaXMuX2JvdW5kZWRLZXlDb21tYW5kSGFuZGxlcilcbiAgICB9KVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgY29uc29sZS5kZWJ1Zygnc3RvcCByZWNvcmRpbmcnKVxuICAgIHRoaXMuX2JhZGdlU3RhdGUgPSB0aGlzLl9yZWNvcmRpbmcubGVuZ3RoID4gMCA/ICcxJyA6ICcnXG5cbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIodGhpcy5fYm91bmRlZE1lc3NhZ2VIYW5kbGVyKVxuICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tcGxldGVkLnJlbW92ZUxpc3RlbmVyKHRoaXMuX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlcilcbiAgICBjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkJlZm9yZU5hdmlnYXRlLnJlbW92ZUxpc3RlbmVyKHRoaXMuX2JvdW5kZWRXYWl0SGFuZGxlcilcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9ib3VuZGVkTWVudUhhbmRsZXIpXG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHsgcGF0aDogJy4vaW1hZ2VzL2ljb24tYmxhY2sucG5nJyB9KVxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogdGhpcy5fYmFkZ2VTdGF0ZX0pXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3Ioe2NvbG9yOiAnIzQ1QzhGMSd9KVxuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgcmVjb3JkaW5nOiB0aGlzLl9yZWNvcmRpbmcgfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5kZWJ1ZygncmVjb3JkaW5nIHN0b3JlZCcpXG4gICAgfSlcbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdwYXVzZScpXG4gICAgdGhpcy5fYmFkZ2VTdGF0ZSA9ICfinZrinZonXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGhpcy5fYmFkZ2VTdGF0ZSB9KVxuICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZVxuICB9XG5cbiAgdW5QYXVzZSAoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygndW5wYXVzZScpXG4gICAgdGhpcy5fYmFkZ2VTdGF0ZSA9ICdyZWMnXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGhpcy5fYmFkZ2VTdGF0ZSB9KVxuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2VcbiAgfVxuXG4gIGNsZWFuVXAgKGNiKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnY2xlYW51cCcpXG4gICAgdGhpcy5fcmVjb3JkaW5nID0gW11cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiAnJyB9KVxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZSgncmVjb3JkaW5nJywgKCkgPT4ge1xuICAgICAgY29uc29sZS5kZWJ1Zygnc3RvcmVkIHJlY29yZGluZyBjbGVhcmVkJylcbiAgICAgIGlmIChjYikgY2IoKVxuICAgIH0pXG4gIH1cblxuICByZWNvcmRDdXJyZW50VXJsIChocmVmKSB7XG4gICAgaWYgKCF0aGlzLl9oYXNHb3RvKSB7XG4gICAgICBjb25zb2xlLmRlYnVnKCdyZWNvcmRpbmcgZ290byogZm9yOicsIGhyZWYpXG4gICAgICB0aGlzLmhhbmRsZU1lc3NhZ2Uoe3NlbGVjdG9yOiB1bmRlZmluZWQsIHZhbHVlOiB1bmRlZmluZWQsIGFjdGlvbjogcHB0ckFjdGlvbnMuR09UTywgaHJlZn0pXG4gICAgICB0aGlzLl9oYXNHb3RvID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHJlY29yZEN1cnJlbnRWaWV3cG9ydFNpemUgKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLl9oYXNWaWV3UG9ydCkge1xuICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKHtzZWxlY3RvcjogdW5kZWZpbmVkLCB2YWx1ZSwgYWN0aW9uOiBwcHRyQWN0aW9ucy5WSUVXUE9SVH0pXG4gICAgICB0aGlzLl9oYXNWaWV3UG9ydCA9IHRydWVcbiAgICB9XG4gIH1cblxuICByZWNvcmROYXZpZ2F0aW9uICgpIHtcbiAgICB0aGlzLmhhbmRsZU1lc3NhZ2UoeyBzZWxlY3RvcjogdW5kZWZpbmVkLCB2YWx1ZTogdW5kZWZpbmVkLCBhY3Rpb246IHBwdHJBY3Rpb25zLk5BVklHQVRJT04gfSlcbiAgfVxuXG4gIHJlY29yZFNjcmVlbnNob3QgKHZhbHVlKSB7XG4gICAgdGhpcy5oYW5kbGVNZXNzYWdlKHsgc2VsZWN0b3I6IHVuZGVmaW5lZCwgdmFsdWUsIGFjdGlvbjogcHB0ckFjdGlvbnMuU0NSRUVOU0hPVCB9KVxuICB9XG5cbiAgaGFuZGxlTWVzc2FnZSAobXNnLCBzZW5kZXIpIHtcbiAgICBpZiAobXNnLmNvbnRyb2wpIHJldHVybiB0aGlzLmhhbmRsZUNvbnRyb2xNZXNzYWdlKG1zZywgc2VuZGVyKVxuXG4gICAgLy8gdG8gYWNjb3VudCBmb3IgY2xpY2tzIGV0Yy4gd2UgbmVlZCB0byByZWNvcmQgdGhlIGZyYW1lSWQgYW5kIHVybCB0byBsYXRlciB0YXJnZXQgdGhlIGZyYW1lIGluIHBsYXliYWNrXG4gICAgbXNnLmZyYW1lSWQgPSBzZW5kZXIgPyBzZW5kZXIuZnJhbWVJZCA6IG51bGxcbiAgICBtc2cuZnJhbWVVcmwgPSBzZW5kZXIgPyBzZW5kZXIudXJsIDogbnVsbFxuXG4gICAgaWYgKCF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgdGhpcy5fcmVjb3JkaW5nLnB1c2gobXNnKVxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgcmVjb3JkaW5nOiB0aGlzLl9yZWNvcmRpbmcgfSwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmRlYnVnKCdzdG9yZWQgcmVjb3JkaW5nIHVwZGF0ZWQnKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDb250cm9sTWVzc2FnZSAobXNnLCBzZW5kZXIpIHtcbiAgICBpZiAobXNnLmNvbnRyb2wgPT09IGN0cmwuRVZFTlRfUkVDT1JERVJfU1RBUlRFRCkgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGhpcy5fYmFkZ2VTdGF0ZSB9KVxuICAgIGlmIChtc2cuY29udHJvbCA9PT0gY3RybC5HRVRfVklFV1BPUlRfU0laRSkgdGhpcy5yZWNvcmRDdXJyZW50Vmlld3BvcnRTaXplKG1zZy5jb29yZGluYXRlcylcbiAgICBpZiAobXNnLmNvbnRyb2wgPT09IGN0cmwuR0VUX0NVUlJFTlRfVVJMKSB0aGlzLnJlY29yZEN1cnJlbnRVcmwobXNnLmhyZWYpXG4gICAgaWYgKG1zZy5jb250cm9sID09PSBjdHJsLkdFVF9TQ1JFRU5TSE9UKSB0aGlzLnJlY29yZFNjcmVlbnNob3QobXNnLnZhbHVlKVxuICB9XG5cbiAgaGFuZGxlTmF2aWdhdGlvbiAoeyBmcmFtZUlkIH0pIHtcbiAgICBjb25zb2xlLmRlYnVnKCdmcmFtZUlkIGlzOicsIGZyYW1lSWQpXG4gICAgdGhpcy5pbmplY3RTY3JpcHQoKVxuICAgIGlmIChmcmFtZUlkID09PSAwKSB7XG4gICAgICB0aGlzLnJlY29yZE5hdmlnYXRpb24oKVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1lbnVJbnRlcmFjdGlvbiAoaW5mbywgdGFiKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnY29udGV4dCBtZW51IGNsaWNrZWQnKVxuICAgIHN3aXRjaCAoaW5mby5tZW51SXRlbUlkKSB7XG4gICAgICBjYXNlICh0aGlzLl9tZW51SWQgKyB0aGlzLl9tZW51T3B0aW9ucy5TQ1JFRU5TSE9UKTpcbiAgICAgICAgdGhpcy50b2dnbGVTY3JlZW5TaG90TW9kZShhY3Rpb25zLlRPR0dMRV9TQ1JFRU5TSE9UX01PREUpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICh0aGlzLl9tZW51SWQgKyB0aGlzLl9tZW51T3B0aW9ucy5TQ1JFRU5TSE9UX0NMSVBQRUQpOlxuICAgICAgICB0aGlzLnRvZ2dsZVNjcmVlblNob3RNb2RlKGFjdGlvbnMuVE9HR0xFX1NDUkVFTlNIT1RfQ0xJUFBFRF9NT0RFKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUtleUNvbW1hbmRzIChjb21tYW5kKSB7XG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX1NDUkVFTlNIT1RfTU9ERTpcbiAgICAgICAgdGhpcy50b2dnbGVTY3JlZW5TaG90TW9kZShhY3Rpb25zLlRPR0dMRV9TQ1JFRU5TSE9UX01PREUpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX1NDUkVFTlNIT1RfQ0xJUFBFRF9NT0RFOlxuICAgICAgICB0aGlzLnRvZ2dsZVNjcmVlblNob3RNb2RlKGFjdGlvbnMuVE9HR0xFX1NDUkVFTlNIT1RfQ0xJUFBFRF9NT0RFKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVNjcmVlblNob3RNb2RlIChhY3Rpb24pIHtcbiAgICBjb25zb2xlLmRlYnVnKCd0b2dnbGluZyBzY3JlZW5zaG90IG1vZGUnKVxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCB0YWJzID0+IHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uIH0pXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZVdhaXQgKCkge1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6ICd3YWl0JyB9KVxuICB9XG5cbiAgaW5qZWN0U2NyaXB0ICgpIHtcbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ2NvbnRlbnQtc2NyaXB0LmpzJywgYWxsRnJhbWVzOiB0cnVlIH0pXG4gIH1cbn1cblxuY29uc29sZS5kZWJ1ZygnYm9vdGluZyByZWNvcmRpbmcgY29udHJvbGxlcicpXG53aW5kb3cucmVjb3JkaW5nQ29udHJvbGxlciA9IG5ldyBSZWNvcmRpbmdDb250cm9sbGVyKClcbndpbmRvdy5yZWNvcmRpbmdDb250cm9sbGVyLmJvb3QoKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/background/index.js\n");

/***/ }),

/***/ "./src/code-generator/pptr-actions.js":
/*!********************************************!*\
  !*** ./src/code-generator/pptr-actions.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  GOTO: 'GOTO',\n  VIEWPORT: 'VIEWPORT',\n  WAITFORSELECTOR: 'WAITFORSELECTOR',\n  NAVIGATION: 'NAVIGATION',\n  NAVIGATION_PROMISE: 'NAVIGATION_PROMISE',\n  FRAME_SET: 'FRAME_SET',\n  SCREENSHOT: 'SCREENSHOT'\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zLmpzP2Y3NTUiXSwibmFtZXMiOlsiR09UTyIsIlZJRVdQT1JUIiwiV0FJVEZPUlNFTEVDVE9SIiwiTkFWSUdBVElPTiIsIk5BVklHQVRJT05fUFJPTUlTRSIsIkZSQU1FX1NFVCIsIlNDUkVFTlNIT1QiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUFlO0FBQ2JBLFFBQU0sTUFETztBQUViQyxZQUFVLFVBRkc7QUFHYkMsbUJBQWlCLGlCQUhKO0FBSWJDLGNBQVksWUFKQztBQUtiQyxzQkFBb0Isb0JBTFA7QUFNYkMsYUFBVyxXQU5FO0FBT2JDLGNBQVk7QUFQQyxDIiwiZmlsZSI6Ii4vc3JjL2NvZGUtZ2VuZXJhdG9yL3BwdHItYWN0aW9ucy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgR09UTzogJ0dPVE8nLFxuICBWSUVXUE9SVDogJ1ZJRVdQT1JUJyxcbiAgV0FJVEZPUlNFTEVDVE9SOiAnV0FJVEZPUlNFTEVDVE9SJyxcbiAgTkFWSUdBVElPTjogJ05BVklHQVRJT04nLFxuICBOQVZJR0FUSU9OX1BST01JU0U6ICdOQVZJR0FUSU9OX1BST01JU0UnLFxuICBGUkFNRV9TRVQ6ICdGUkFNRV9TRVQnLFxuICBTQ1JFRU5TSE9UOiAnU0NSRUVOU0hPVCdcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/code-generator/pptr-actions.js\n");

/***/ }),

/***/ "./src/models/extension-control-messages.js":
/*!**************************************************!*\
  !*** ./src/models/extension-control-messages.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  EVENT_RECORDER_STARTED: 'EVENT_RECORDER_STARTED',\n  GET_VIEWPORT_SIZE: 'GET_VIEWPORT_SIZE',\n  GET_CURRENT_URL: 'GET_CURRENT_URL',\n  GET_SCREENSHOT: 'GET_SCREENSHOT'\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL2V4dGVuc2lvbi1jb250cm9sLW1lc3NhZ2VzLmpzP2I0YjMiXSwibmFtZXMiOlsiRVZFTlRfUkVDT1JERVJfU1RBUlRFRCIsIkdFVF9WSUVXUE9SVF9TSVpFIiwiR0VUX0NVUlJFTlRfVVJMIiwiR0VUX1NDUkVFTlNIT1QiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUFlO0FBQ2JBLDBCQUF3Qix3QkFEWDtBQUViQyxxQkFBbUIsbUJBRk47QUFHYkMsbUJBQWlCLGlCQUhKO0FBSWJDLGtCQUFnQjtBQUpILEMiLCJmaWxlIjoiLi9zcmMvbW9kZWxzL2V4dGVuc2lvbi1jb250cm9sLW1lc3NhZ2VzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBFVkVOVF9SRUNPUkRFUl9TVEFSVEVEOiAnRVZFTlRfUkVDT1JERVJfU1RBUlRFRCcsXG4gIEdFVF9WSUVXUE9SVF9TSVpFOiAnR0VUX1ZJRVdQT1JUX1NJWkUnLFxuICBHRVRfQ1VSUkVOVF9VUkw6ICdHRVRfQ1VSUkVOVF9VUkwnLFxuICBHRVRfU0NSRUVOU0hPVDogJ0dFVF9TQ1JFRU5TSE9UJ1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/models/extension-control-messages.js\n");

/***/ }),

/***/ "./src/models/extension-ui-actions.js":
/*!********************************************!*\
  !*** ./src/models/extension-ui-actions.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  TOGGLE_SCREENSHOT_MODE: 'TOGGLE_SCREENSHOT_MODE',\n  TOGGLE_SCREENSHOT_CLIPPED_MODE: 'TOGGLE_SCREENSHOT_CLIPPED_MODE',\n  START: 'START',\n  STOP: 'STOP',\n  CLEAN_UP: 'CLEAN_UP',\n  PAUSE: 'PAUSE',\n  UN_PAUSE: 'UN_PAUSE'\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL2V4dGVuc2lvbi11aS1hY3Rpb25zLmpzPzZkMjIiXSwibmFtZXMiOlsiVE9HR0xFX1NDUkVFTlNIT1RfTU9ERSIsIlRPR0dMRV9TQ1JFRU5TSE9UX0NMSVBQRURfTU9ERSIsIlNUQVJUIiwiU1RPUCIsIkNMRUFOX1VQIiwiUEFVU0UiLCJVTl9QQVVTRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQWU7QUFDYkEsMEJBQXdCLHdCQURYO0FBRWJDLGtDQUFnQyxnQ0FGbkI7QUFHYkMsU0FBTyxPQUhNO0FBSWJDLFFBQU0sTUFKTztBQUtiQyxZQUFVLFVBTEc7QUFNYkMsU0FBTyxPQU5NO0FBT2JDLFlBQVU7QUFQRyxDIiwiZmlsZSI6Ii4vc3JjL21vZGVscy9leHRlbnNpb24tdWktYWN0aW9ucy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgVE9HR0xFX1NDUkVFTlNIT1RfTU9ERTogJ1RPR0dMRV9TQ1JFRU5TSE9UX01PREUnLFxuICBUT0dHTEVfU0NSRUVOU0hPVF9DTElQUEVEX01PREU6ICdUT0dHTEVfU0NSRUVOU0hPVF9DTElQUEVEX01PREUnLFxuICBTVEFSVDogJ1NUQVJUJyxcbiAgU1RPUDogJ1NUT1AnLFxuICBDTEVBTl9VUDogJ0NMRUFOX1VQJyxcbiAgUEFVU0U6ICdQQVVTRScsXG4gIFVOX1BBVVNFOiAnVU5fUEFVU0UnXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/models/extension-ui-actions.js\n");

/***/ })

/******/ });