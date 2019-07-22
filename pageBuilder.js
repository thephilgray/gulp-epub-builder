const path = require('path');
const fs = require('fs');
var glob = require('glob');
const constants = require('./config/constants.js');
/* an api for generating page data in pages.json */

/**
 * NOTE: incremental builds not implemented
 * all methods will require a full rebuild;
 * use sparingly with dev task, except when working with a small number of files,
 * or if you don't mind the poor performance
 */

class PageBuilder {
  constructor() {
    this.pages = this.getPages();
  }

  getPages() {
    this.pages = JSON.parse(fs.readFileSync(constants.PAGEDATA_PATH));
    return this.pages;
  }

  save() {
    fs.writeFileSync(constants.PAGEDATA_PATH, JSON.stringify(this.pages));
  }

  setPages() {
    this.pages = this.pages.map((page, i) => ({
      ...page,
      id: `${String(i).padStart(3, '0')}${
        page.name ? `_${page.name}` : ''
      }.xhtml`
    }));
    return this;
  }

  addPage({ name, template, data, spine, manifest }, index) {
    const pages = this.getPages();
    const page = {
      id: '',
      name,
      template,
      data,
      spine,
      manifest
    };
    index = Number.isInteger(index) ? index : pages.length;
    pages.splice(index, 0, page);
    return this.setPages();
  }

  useRemovePage(id) {
    const pages = this.getPages();
    const pageIndex = pages.findIndex(p => p.id === id);
    if (pageIndex > -1) {
      const [removedPage] = pages.splice(pageIndex, 1);
      return { removedPage, pages };
    } else {
      return false;
    }
  }

  removePage(id) {
    const { removedPage, pages } = this.useRemovePage(id);
    if (!removedPage) return this;
    this.pages = pages;
    return this.setPages();
  }

  movePage(id, index) {
    const { removedPage, pages } = this.useRemovePage(id);
    if (!removedPage) return this;
    return this.setPages().addPage(removedPage, index);
  }

  getPageTemplates() {
    return glob
      .sync(`${constants.PAGE_TEMPLATES_PATH}/**/*.pug`)
      .map(templatePath =>
        path
          .basename(templatePath)
          .split('.')
          .shift()
      );
  }
}

const pageBuilder = new PageBuilder();

// pageBuilder
//   .addPage({
//     name: 'Acknowledgements',
//     template: 'bodymatter',
//     data: {
//       title: 'Acknowledgements'
//     },
//     spine: {},
//     manifest: {}
//   })
//   .save();

pageBuilder.removePage('001_Acknowledgements.xhtml').save();
// pageBuilder.movePage('003_Acknowledgements.xhtml', 1).save();

console.log(pageBuilder.pages);
