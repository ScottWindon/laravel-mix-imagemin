const ManifestPlugin = require('./ManifestPlugin.js');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

class Imagemin {
    name() {
        return ['imagemin', 'images', 'img'];
    }

    dependencies() {
        this.requiresReload = `
            Imagemin's required plugins have been installed.
            Please run "npm run dev" again.
        `;

        return ['copy-webpack-plugin', 'imagemin-webpack-plugin'];
    }

    register(patterns, copyOptions = {}, imageminOptions = {}) {
        patterns = [].concat(patterns);
        copyOptions = copyOptions;
        imageminOptions = Object.assign({
            test: /\.(jpe?g|png|gif|svg)$/i,
        }, imageminOptions);

        this.tasks = this.tasks || [];

        this.tasks.push( new CopyWebpackPlugin(patterns, copyOptions) );
        this.tasks.push( new ImageminPlugin(imageminOptions) );
        this.tasks.push( new ManifestPlugin(patterns) );
    }

    webpackPlugins() {
        return this.tasks;
    }
}

module.exports = Imagemin;
