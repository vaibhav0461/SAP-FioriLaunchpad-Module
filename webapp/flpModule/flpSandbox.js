sap.ui.define(
	["sap/base/util/ObjectPath", "sap/ui/thirdparty/datajs", "sap/ushell/services/Container"],
	function (ObjectPath, Odata) {
		"use strict";
		
		numberValue1: "",
		
		// define ushell config
		ObjectPath.set(["sap-ushell-config"], {
			defaultRenderer: "fiori2",
			bootstrapPlugins: {
				RuntimeAuthoringPlugin: {
					component: "sap.ushell.plugins.rta",
					config: {
						validateAppVersion: false
					}
				},
				PersonalizePlugin: {
					component: "sap.ushell.plugins.rta-personalize",
					config: {
						validateAppVersion: false
					}
				}
			},
			renderers: {
				fiori2: {
					componentData: {
						config: {
							enableSearch: false,
							rootIntent: "Shell-home"
						}
					}
				}
			},
			services: {
				LaunchPage: {
					adapter: {
						config: {
							groups: [{
								tiles: [{
									tileType: "sap.ushell.ui.tile.StaticTile",
									properties: {
										title: "Monitor Market Processes",
										targetURL: "#UtilsDataExchangeProcessing-displayProcess"
									}
								}]
							}]
						}
					}
				},
				ClientSideTargetResolution: {
					adapter: {
						config: {
							inbounds: {
								"UtilsDataExchangeProcessing-displayProcess": {
									semanticObject: "UtilsDataExchangeProcessing",
									action: "displayProcess",
									description: "Moniton Market Processes",
									title: "Moniton Market Processes",
									signature: {
										additionalParameters: "allowed",
										parameters: {}
									},
									resolutionResult: {
										applicationType: "URL",
										additionalInformation: "SAPUI5.Component=com.sap.cd.maco.monitor.ui.app.displayprocesses",
										url: sap.ui.require.toUrl(
											"com/sap/cd/maco/monitor/ui/app/displayprocesses"
										)
									}
								}
							}
						}
					}
				},
				NavTargetResolution: {
					config: {
						enableClientSideTargetResolution: true
					}
				}
			}
		});

		var oFlpSandbox = {
			/**
			 * Initializes the FLP sandbox
			 * @returns {Promise} a promise that is resolved when the sandbox bootstrap has finshed
			 */
			init: function () {
				// sandbox is a singleton, so we can start it only once
				if (!this._oBootstrapFinished) {
					this._oBootstrapFinished = sap.ushell.bootstrap("local");
					this._oBootstrapFinished.then(function () {
						sap.ushell.Container.createRenderer().placeAt("content");
					});
				}
				return this._oBootstrapFinished;
			}
		};

		return oFlpSandbox;
	});