'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting : {
    askFor: function () {
      var done = this.async();

      this.log(yosay('Create your own ' + chalk.red('Yeoman') + ' generator with superpowers!'));

      var prompts = [{
        name: 'widgetName',
        message: "What's the name your widget?",
        default: 'widgetName'
      }];

      this.prompt(prompts, function (props) {
        this.widgetName = props.widgetName;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      this.mkdir(this.widgetName);
      this.template("avalon.x.js.tpl",this.widgetName+"/avalon."+this.widgetName+".js");
      this.template("avalon.x.html.tpl",this.widgetName+"/avalon."+this.widgetName+".html");
      this.template("avalon.x.css.tpl",this.widgetName+"/avalon."+this.widgetName+".css");
      this.template("avalon.x.ext.html.tpl",this.widgetName+"/avalon."+this.widgetName+".ext.html");
      this.template("_bower.json","bower.json");
      this.template("_package.json","package.json");
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
