const { withAndroidManifest } = require("expo/config-plugins");

module.exports = function withARCoreOptional(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const application = androidManifest.manifest.application[0];

    // Make ARCore optional instead of required
    const arMetadata = {
      $: {
        "android:name": "com.google.ar.core",
        "android:value": "optional",
      },
    };

    if (!application["meta-data"]) {
      application["meta-data"] = [];
    }

    // Remove existing ARCore metadata if present
    application["meta-data"] = application["meta-data"].filter(
      (meta) => meta.$["android:name"] !== "com.google.ar.core",
    );

    // Add ARCore as optional
    application["meta-data"].push(arMetadata);

    return config;
  });
};
