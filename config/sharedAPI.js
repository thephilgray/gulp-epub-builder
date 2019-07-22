const fs = require("fs");
const constants = require("./constants");

class SharedAPI {
  constructor() {
    this.assets = {};
  }

  getPagesData() {
    return JSON.parse(fs.readFileSync(constants.PAGEDATA_PATH));
  }

  getBookData() {
    console.log("getBookData!!!");
    return JSON.parse(fs.readFileSync(constants.METADATA_PATH));
  }

  getBookAndPagesData() {
    return { book: this.getBookData(), pages: this.getPagesData() };
  }

  addAsset(assetId, assetHref) {
    const { mediaType } = constants.EXTENSIONS_MAP.find(
      ext => ext.name === assetHref.split(".").pop()
    );
    const pages = this.getPagesData();
    const currentPage = pages.find(p => p.id === assetId) || {};

    this.assets[assetId] = {
      href: assetHref,
      manifest: {
        "media-type": mediaType,
        ...currentPage.manifest
      }
    };
    return this.assets[assetId];
  }

  addProperty(assetId, property) {
    console.log(`add property ${property} to ${assetId}`);
    const asset = this.assets[assetId];
    if (!asset.manifest.properties) {
      this.assets[assetId].manifest.properties = [];
    }
    if (asset.manifest.properties.indexOf(property) < 0) {
      this.assets[assetId].manifest.properties.push(property);
    }
    return asset;
  }

  addDependency(assetId, dependency) {
    const asset = this.assets[assetId];
    if (!asset.dependencies) {
      asset.dependencies = [];
    }
    if (asset.dependencies.indexOf(dependency) < 0) {
      asset.dependencies.push(dependency);
      this.assets[assetId].dependencies = asset.dependencies;
    }
    const ext = dependency.split(".").pop();

    if (ext === "js") {
      this.addProperty(assetId, "scripted");
    }
    if (ext === "svg") {
      this.addProperty(assetId, "svg");
    }
    return asset;
  }

  getAllDependencies() {
    return Object.keys(this.assets).reduce((acc, curr) => {
      const asset = this.assets[curr];
      let deps = [];
      if (asset.dependencies) {
        deps = asset.dependencies.filter(dep => acc.indexOf(dep) === -1);
      }
      return [...acc, ...deps];
    }, []);
  }

  getAssetsArray() {
    return Object.keys(this.assets).map(key => ({
      id: key,
      ...this.assets[key]
    }));
  }

  getAssets() {
    return this.assets;
  }
}

module.exports = new SharedAPI();
